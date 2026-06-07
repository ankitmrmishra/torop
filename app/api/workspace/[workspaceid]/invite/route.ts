import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import {
  workspaceMembers,
  workspaces,
  invitaions,
} from "@/db/schema/workspace";
import { user } from "@/db/schema/auth";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { sendInvitationEmail } from "@/lib/helperfunctions/send-invitation-email";
import crypto from "crypto";

// POST /api/workspace/[workspaceid]/invite - Send invitation email
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceid: string }> },
) {
  try {
    const { workspaceid } = await params;

    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get request body
    const body = await request.json();
    const { email, role = "member" } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Validate role
    if (!["owner", "member"].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be "owner" or "member"' },
        { status: 400 },
      );
    }

    // Check if user is owner of the workspace
    const membership = await db
      .select()
      .from(workspaceMembers)
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceid),
          eq(workspaceMembers.userId, userId),
          eq(workspaceMembers.role, "owner"),
        ),
      )
      .limit(1);

    if (membership.length === 0) {
      return NextResponse.json(
        { error: "Only workspace owners can send invitations" },
        { status: 403 },
      );
    }

    // Get workspace details
    const workspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, workspaceid))
      .limit(1);

    if (workspace.length === 0) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 },
      );
    }

    // Check if a user with this email exists and is already a member
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      // User exists, check if they're already a member of this workspace
      const existingMembership = await db
        .select()
        .from(workspaceMembers)
        .where(
          and(
            eq(workspaceMembers.workspaceId, workspaceid),
            eq(workspaceMembers.userId, existingUser[0].id),
          ),
        )
        .limit(1);

      if (existingMembership.length > 0) {
        return NextResponse.json(
          { error: "User is already a member of this workspace" },
          { status: 400 },
        );
      }
    }

    // Check for existing pending invitation
    const existingInvitation = await db
      .select()
      .from(invitaions)
      .where(
        and(
          eq(invitaions.workspaceId, workspaceid),
          eq(invitaions.email, email),
          eq(invitaions.status, "pending"),
        ),
      )
      .limit(1);

    if (existingInvitation.length > 0) {
      return NextResponse.json(
        { error: "A pending invitation already exists for this email" },
        { status: 400 },
      );
    }

    // Generate invitation token
    const token = crypto.randomBytes(32).toString("hex");

    // Set expiration (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Create invitation record
    const [invitation] = await db
      .insert(invitaions)
      .values({
        workspaceId: workspaceid,
        email: email,
        role: role,
        token: token,
        status: "pending",
        expiresAt: expiresAt,
        invitedBy: userId,
      })
      .returning();

    // Send invitation email
    try {
      await sendInvitationEmail({
        to: email,
        inviterName: session.user.name || session.user.email,
        workspaceName: workspace[0].name,
        invitationToken: token,
        expiresAt: expiresAt,
      });
    } catch (emailError) {
      console.error("Failed to send invitation email:", emailError);

      // Optionally, delete the invitation if email fails
      await db.delete(invitaions).where(eq(invitaions.id, invitation.id));

      return NextResponse.json(
        { error: "Failed to send invitation email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Invitation sent successfully",
        invitation: {
          id: invitation.id,
          email: invitation.email,
          role: invitation.role,
          expiresAt: invitation.expiresAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error sending invitation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET /api/workspace/[workspaceid]/invite - List all invitations for a workspace
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceid: string }> },
) {
  try {
    const { workspaceid } = await params;

    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if user is a member of the workspace
    const membership = await db
      .select()
      .from(workspaceMembers)
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceid),
          eq(workspaceMembers.userId, userId),
        ),
      )
      .limit(1);

    if (membership.length === 0) {
      return NextResponse.json(
        { error: "You are not a member of this workspace" },
        { status: 403 },
      );
    }

    // Get all invitations for the workspace
    const invitations = await db
      .select()
      .from(invitaions)
      .where(eq(invitaions.workspaceId, workspaceid));

    return NextResponse.json({
      success: true,
      invitations: invitations.map((inv) => ({
        id: inv.id,
        email: inv.email,
        role: inv.role,
        status: inv.status,
        expiresAt: inv.expiresAt,
        createdAt: inv.createdAt,
        acceptedAt: inv.acceptedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
