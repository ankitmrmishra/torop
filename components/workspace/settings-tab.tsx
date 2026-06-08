"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Eye, EyeOff, Key, AlertTriangle } from "lucide-react";

interface SettingsTabProps {
  workspace: {
    id: string;
    name: string;
  };
  onWorkspaceUpdate: (workspace: any) => void;
  userRole: "owner" | "member";
}

export function SettingsTab({
  workspace,
  onWorkspaceUpdate,
  userRole,
}: SettingsTabProps) {
  const [workspaceName, setWorkspaceName] = useState(workspace.name);
  const [apiKey, setApiKey] = useState<string | null>(
    "sk_live_abc123def456ghi789",
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleSaveWorkspace = () => {
    onWorkspaceUpdate({ ...workspace, name: workspaceName });
    // Mock save logic
    console.log("Saving workspace:", workspaceName);
  };

  const handleGenerateApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    console.log("Generated API key:", newKey);
  };

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      console.log("Copied API key to clipboard");
    }
  };

  const handleDeleteWorkspace = () => {
    if (deleteConfirmation === workspace.name) {
      console.log("Deleting workspace:", workspace.id);
      setIsDeleteDialogOpen(false);
      setDeleteConfirmation("");
    }
  };

  const maskApiKey = (key: string) => {
    if (key.length < 12) return key;
    return `${key.substring(0, 12)}${"*".repeat(key.length - 12)}`;
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your workspace settings and preferences
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>
            Update your workspace name and basic information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Workspace Name
            </label>
            <Input
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Enter workspace name"
              disabled={userRole !== "owner"}
            />
          </div>
          {userRole === "owner" && (
            <Button onClick={handleSaveWorkspace}>Save Changes</Button>
          )}
        </CardContent>
      </Card>

      {/* API Key Section */}
      <Card>
        <CardHeader>
          <CardTitle>API Key</CardTitle>
          <CardDescription>
            Manage your API key for programmatic access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {apiKey ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Your API Key
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={showApiKey ? apiKey : maskApiKey(apiKey)}
                      readOnly
                      className="font-mono pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={handleCopyApiKey}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Keep your API key secure and never share it publicly.
                </p>
              </div>
              {userRole === "owner" && (
                <Button variant="outline" onClick={handleGenerateApiKey}>
                  <Key className="w-4 h-4 mr-2" />
                  Regenerate API Key
                </Button>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate an API key to start sending events programmatically.
              </p>
              {userRole === "owner" && (
                <Button onClick={handleGenerateApiKey}>
                  <Key className="w-4 h-4 mr-2" />
                  Generate API Key
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      {userRole === "owner" && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions that affect your workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <h3 className="font-medium text-foreground">
                    Delete Workspace
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Once deleted, all data will be permanently removed.
                </p>
              </div>
              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete Workspace</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Workspace</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your workspace and remove all associated data.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Type <span className="font-mono">{workspace.name}</span>{" "}
                        to confirm
                      </label>
                      <Input
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="Enter workspace name"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsDeleteDialogOpen(false);
                        setDeleteConfirmation("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteWorkspace}
                      disabled={deleteConfirmation !== workspace.name}
                    >
                      Delete Workspace
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
