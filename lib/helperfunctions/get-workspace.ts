import { db } from "@/db";
import { workspaceMembers, workspaces } from "@/db/schema/workspace";
import { eq } from "drizzle-orm";

export async function getUserWorkspace(userId: string) {
  const workspace = await db
    .select({
      id: workspaces.id,
      name: workspaces.name,
      apiKeyHash: workspaces.apiKeyHash,
      createdAt: workspaces.createdAt,
      updatedAt: workspaces.updatedAt,
      role: workspaceMembers.role,
    })
    .from(workspaceMembers)
    .innerJoin(workspaces, eq(workspaceMembers.workspaceId, workspaces.id))
    .where(eq(workspaceMembers.userId, userId))
    .limit(1);

  return workspace[0] || null;
}
