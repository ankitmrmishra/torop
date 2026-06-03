"use client";

import { use, useState } from "react";
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { OverviewTab } from "@/components/workspace/overview-tab";
import { EventsTab } from "@/components/workspace/events-tab";
import { MembersTab } from "@/components/workspace/members-tab";
import { useWorkspaceDetails } from "@/lib/helperfunctions/fetch-workspace-details";

interface WorkspacePageProps {
  params: Promise<{
    workspaceid: string;
  }>;
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceid } = use(params);

  const [activeTab, setActiveTab] = useState<
    "overview" | "events" | "members" | "settings"
  >("overview");

  const {
    data: workspace,
    loading,
    error,
    refetch,
  } = useWorkspaceDetails(workspaceid);

  if (loading) {
    return <div>Loading workspace...</div>;
  }

  if (error || !workspace) {
    return (
      <div>
        <p>{error ?? "Workspace not found"}</p>
        <button onClick={() => void refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <WorkspaceSidebar
        workspaceName={workspace.workspace.name}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={{
          name: workspace.members[0]?.name ?? "Unknown",
          email: workspace.members[0]?.email ?? "",
          avatar: workspace.members[0]?.avatar ?? "U",
        }}
      />

      <main className="flex-1 overflow-auto p-6">
        {activeTab === "overview" && (
          <OverviewTab
            eventsExist={workspace.stats.totalEvents > 0}
            stats={workspace.stats}
            recentEvents={workspace.recentEvents}
            topEvents={workspace.topEvents}
            eventsOverTime={workspace.eventsOverTime}
          />
        )}

        {activeTab === "events" && (
          <EventsTab
            events={workspace.recentEvents}
            totalCount={workspace.stats.totalEvents}
          />
        )}

        {activeTab === "members" && (
          <MembersTab
            members={workspace.members}
            userRole={workspace.workspace.userRole}
          />
        )}
      </main>
    </div>
  );
}
