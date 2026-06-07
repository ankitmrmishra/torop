import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { workspaceMembers, invitaions } from "@/db/schema/workspace";
import { eq, and, gt } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// POST /api/workspace/accept-invite - Accept a workspace invitation
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    // Get request body
    const body = await request.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Invitation token is required" },
        { status: 400 },
      );
    }

    // Find the invitation
    const [invitation] = await db
      .select()
      .from(invitaions)
      .where(eq(invitaions.token, token))
      .limit(1);

    if (!invitation) {
      return NextResponse.json(
        { error: "Invalid invitation token" },
        { status: 404 },
      );
    }

    // Check if invitation is for this user's email
    if (invitation.email !== userEmail) {
      return NextResponse.json(
        { error: "This invitation is not for your email address" },
        { status: 403 },
      );
    }

    // Check invitation status
    if (invitation.status !== "pending") {
      return NextResponse.json(
        { error: `Invitation has already been ${invitation.status}` },
        { status: 400 },
      );
    }

    // Check if invitation is expired
    if (new Date() > invitation.expiresAt) {
      // Update status to expired
      await db
        .update(invitaions)
        .set({ status: "expired" })
        .where(eq(invitaions.id, invitation.id));

      return NextResponse.json(
        { error: "Invitation has expired" },
        { status: 400 },
      );
    }

    // Check if user is already a member
    const existingMembership = await db
      .select()
      .from(workspaceMembers)
      .where(
        and(
          eq(workspaceMembers.workspaceId, invitation.workspaceId),
          eq(workspaceMembers.userId, userId),
        ),
      )
      .limit(1);

    if (existingMembership.length > 0) {
      // Update invitation status
      await db
        .update(invitaions)
        .set({
          status: "accepted",
          acceptedAt: new Date(),
        })
        .where(eq(invitaions.id, invitation.id));

      return NextResponse.json(
        { error: "You are already a member of this workspace" },
        { status: 400 },
      );
    }

    // Add user to workspace
    const [newMember] = await db
      .insert(workspaceMembers)
      .values({
        userId: userId,
        workspaceId: invitation.workspaceId,
        role: invitation.role,
      })
      .returning();

    // Update invitation status
    await db
      .update(invitaions)
      .set({
        status: "accepted",
        acceptedAt: new Date(),
      })
      .where(eq(invitaions.id, invitation.id));

    return NextResponse.json({
      success: true,
      message: "Invitation accepted successfully",
      workspace: {
        id: invitation.workspaceId,
        role: newMember.role,
      },
    });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET /api/workspace/accept-invite?token=xxx - Verify invitation before accepting
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Invitation token is required" },
        { status: 400 },
      );
    }

    // Find the invitation
    const [invitation] = await db
      .select({
        id: invitaions.id,
        email: invitaions.email,
        role: invitaions.role,
        status: invitaions.status,
        expiresAt: invitaions.expiresAt,
        workspaceId: invitaions.workspaceId,
      })
      .from(invitaions)
      .where(eq(invitaions.token, token))
      .limit(1);

    if (!invitation) {
      return NextResponse.json(
        { error: "Invalid invitation token" },
        { status: 404 },
      );
    }

    // Check if expired
    const isExpired = new Date() > invitation.expiresAt;
    if (isExpired && invitation.status === "pending") {
      await db
        .update(invitaions)
        .set({ status: "expired" })
        .where(eq(invitaions.id, invitation.id));
    }

    return NextResponse.json({
      success: true,
      invitation: {
        email: invitation.email,
        role: invitation.role,
        status: isExpired ? "expired" : invitation.status,
        expiresAt: invitation.expiresAt,
        workspaceId: invitation.workspaceId,
      },
    });
  } catch (error) {
    console.error("Error verifying invitation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
