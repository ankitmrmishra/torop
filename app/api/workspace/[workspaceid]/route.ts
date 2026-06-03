import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { workspaces, workspaceMembers, events } from "@/db/schema/workspace";
import { user } from "@/db/schema/auth";
import { eq, and, desc, count, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ workspaceid: string }> },
) {
  try {
    // Authenticate the user
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workspaceId = (await params).workspaceid;

    // Verify user has access to this workspace
    const memberCheck = await db
      .select()
      .from(workspaceMembers)
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, session.user.id),
        ),
      )
      .limit(1);

    if (memberCheck.length === 0) {
      return NextResponse.json(
        { error: "Forbidden: You don't have access to this workspace" },
        { status: 403 },
      );
    }

    const userRole = memberCheck[0].role;

    // 1. Get workspace basic info
    const workspaceData = await db
      .select({
        id: workspaces.id,
        name: workspaces.name,
        createdAt: workspaces.createdAt,
        updatedAt: workspaces.updatedAt,
      })
      .from(workspaces)
      .where(eq(workspaces.id, workspaceId))
      .limit(1);

    if (workspaceData.length === 0) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 },
      );
    }

    const workspace = workspaceData[0];

    // 2. Get all workspace members with user details
    const members = await db
      .select({
        id: workspaceMembers.id,
        userId: workspaceMembers.userId,
        role: workspaceMembers.role,
        joinedAt: workspaceMembers.joinedAt,
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
      })
      .from(workspaceMembers)
      .innerJoin(user, eq(workspaceMembers.userId, user.id))
      .where(eq(workspaceMembers.workspaceId, workspaceId))
      .orderBy(desc(workspaceMembers.joinedAt));

    // 3. Get event statistics
    const eventStats = await db
      .select({
        totalEvents: count(),
      })
      .from(events)
      .where(eq(events.workspaceId, workspaceId));

    const totalEvents = eventStats[0]?.totalEvents || 0;

    // 4. Get unique event names count (top events)
    const topEvents = await db
      .select({
        eventName: events.eventName,
        count: count(),
      })
      .from(events)
      .where(eq(events.workspaceId, workspaceId))
      .groupBy(events.eventName)
      .orderBy(desc(count()))
      .limit(10);

    // 5. Get recent events (last 10)
    const recentEvents = await db
      .select({
        id: events.id,
        eventName: events.eventName,
        properties: events.properties,
        timestamp: events.timestamp,
        receivedAt: events.receivedAt,
      })
      .from(events)
      .where(eq(events.workspaceId, workspaceId))
      .orderBy(desc(events.timestamp))
      .limit(10);

    // 6. Get events over time (last 30 days daily aggregation)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const eventsOverTime = await db
      .select({
        date: sql<string>`DATE(${events.timestamp})`.as("date"),
        count: count(),
      })
      .from(events)
      .where(
        and(
          eq(events.workspaceId, workspaceId),
          sql`${events.timestamp} >= ${thirtyDaysAgo.toISOString()}`,
        ),
      )
      .groupBy(sql`DATE(${events.timestamp})`)
      .orderBy(sql`DATE(${events.timestamp})`);

    // 7. Calculate average events per day
    const avgEventsPerDay =
      eventsOverTime.length > 0
        ? Math.round(totalEvents / Math.max(eventsOverTime.length, 1))
        : 0;

    // 8. Get unique user count from event properties (if userId is tracked)
    // This assumes events might have a userId in properties
    const uniqueUsersResult = await db
      .select({
        uniqueUsers: sql<number>`COUNT(DISTINCT (properties->>'userId'))`.as(
          "uniqueUsers",
        ),
      })
      .from(events)
      .where(
        and(
          eq(events.workspaceId, workspaceId),
          sql`properties->>'userId' IS NOT NULL`,
        ),
      );

    const uniqueUsers = uniqueUsersResult[0]?.uniqueUsers || 0;

    // 9. Calculate percentage changes (mock for now, would need historical comparison)
    // In production, you'd compare current period with previous period
    const eventsChange = "+12.3%"; // Mock - calculate based on previous period
    const usersChange = "+8.7%"; // Mock
    const avgEventsChange = "-2.1%"; // Mock

    // Construct comprehensive response
    const response = {
      workspace: {
        id: workspace.id,
        name: workspace.name,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
        memberCount: members.length,
        eventCount: totalEvents,
        userRole: userRole,
      },
      members: members.map((member) => ({
        id: member.id,
        userId: member.userId,
        name: member.userName,
        email: member.userEmail,
        avatar: member.userImage || member.userName.charAt(0).toUpperCase(),
        role: member.role,
        joinedAt: member.joinedAt,
      })),
      stats: {
        totalEvents,
        uniqueUsers,
        avgEventsPerDay,
        eventsChange,
        usersChange,
        avgEventsChange,
      },
      topEvents: topEvents.map((event) => ({
        eventName: event.eventName,
        count: event.count,
      })),
      recentEvents: recentEvents.map((event) => ({
        id: event.id,
        eventName: event.eventName,
        properties: event.properties,
        timestamp: event.timestamp,
        receivedAt: event.receivedAt,
      })),
      eventsOverTime: eventsOverTime.map((item) => ({
        date: item.date,
        count: item.count,
      })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching workspace details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
