import { db } from "@/db";
import { workspaceMembers, workspaces } from "@/db/schema/workspace";
import { getCurrentUser } from "@/lib/helperfunctions/auth-helper";
import { getUserWorkspace } from "@/lib/helperfunctions/get-workspace";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  //first we will check if the user is authenticated or not we are using the helper fucntion here, it will redirect to /login if user is not authenticated.
  const user = await getCurrentUser();

  // get the workspace for the user
  const workspace = await getUserWorkspace(user.id);

  if (!workspace) {
    return NextResponse.json({ workspace: null }, { status: 200 });
  }

  return NextResponse.json({ workspace }, { status: 200 });
}

export async function POST(req: NextRequest) {
  //first we will check if the user is authenticated or not we are using the helper fucntion here, it will redirect to /login if user is not authenticated.
  const user = await getCurrentUser();

  // now here we are taking the name of the worksapce that we are going to create also we will check if the name is given and it is given in the correct format.
  const { name } = await req.json();

  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  /**
   * SQL transaction is a grouping of one or more SQL statements that interact with a database. A transaction in its entirety can commit to a database as a single logical unit or rollback (become undone) as a single logical unit.
   */
  const [workspace] = await db.transaction(async (tx) => {
    // Generate a unique API key for the workspace
    const apiKey = `ws_${crypto.randomBytes(32).toString("hex")}`;
    // Hash the API key before storing (using SHA-256)
    const apiKeyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

    const [newWorkspace] = await tx
      .insert(workspaces)
      .values({ name, apiKeyHash })
      .returning();

    await tx.insert(workspaceMembers).values({
      userId: user.id,
      workspaceId: newWorkspace.id,
      role: "owner",
    });

    return [newWorkspace];
  });
  return NextResponse.json({ workspace }, { status: 201 });
}
