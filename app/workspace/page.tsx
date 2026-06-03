"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Workspace = {
  id: string;
  name: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [workspaceLoading, setWorkspaceLoading] = useState(true);
  const [workspaceName, setWorkspaceName] = useState("");
  const [creatingWorkspace, setCreatingWorkspace] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [session, isPending, router]);

  const fetchWorkspace = useCallback(async () => {
    try {
      setWorkspaceLoading(true);

      const response = await fetch("/api/workspace");

      if (!response.ok) {
        throw new Error("Failed to fetch workspace");
      }

      const data = await response.json();

      setWorkspace(data.workspace);
    } catch (error) {
      console.error(error);
    } finally {
      setWorkspaceLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      fetchWorkspace();
    }
  }, [session?.user?.id, fetchWorkspace]);

  const handleCreateWorkspace = async () => {
    const name = workspaceName.trim();

    if (!name) return;

    try {
      setCreatingWorkspace(true);

      const response = await fetch("/api/workspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create workspace");
      }

      setWorkspace(data.workspace);
      setWorkspaceName("");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error ? error.message : "Failed to create workspace",
      );
    } finally {
      setCreatingWorkspace(false);
    }
  };

  if (isPending || workspaceLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        Loading...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Welcome to your Dashboard</CardTitle>
          <CardDescription>You are successfully signed in</CardDescription>
        </CardHeader>

        <CardContent>
          {!workspace ? (
            <div className="space-y-4">
              <div className="rounded-lg border border-dashed p-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  You don't have a workspace yet. Create one to get started.
                </p>

                <div className="flex gap-2">
                  <Input
                    placeholder="Workspace name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !creatingWorkspace) {
                        handleCreateWorkspace();
                      }
                    }}
                  />

                  <Button
                    onClick={handleCreateWorkspace}
                    disabled={creatingWorkspace || !workspaceName.trim()}
                  >
                    {creatingWorkspace ? "Creating..." : "Create Workspace"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="font-medium text-sm">Workspace Information</p>

              <div className="rounded-lg border p-4 space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {workspace.name}
                </p>

                <p>
                  <span className="font-medium">ID:</span> {workspace.id}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
