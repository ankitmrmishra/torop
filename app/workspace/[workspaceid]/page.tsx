"use client";

import { use, useState } from "react";
import { WorkspaceAppSidebar } from "@/components/workspace/app-sidebar";
import { OverviewTab } from "@/components/workspace/overview-tab";
import { EventsTab } from "@/components/workspace/events-tab";
import { MembersTab } from "@/components/workspace/members-tab";
import { useWorkspaceDetails } from "@/lib/helperfunctions/fetch-workspace-details";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading workspace...</div>
      </div>
    );
  }

  if (error || !workspace) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">{error ?? "Workspace not found"}</p>
          <button
            onClick={() => void refetch()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tabTitles = {
    overview: "Overview",
    events: "Events",
    members: "Members",
    settings: "Settings",
  };

  return (
    <SidebarProvider>
      <WorkspaceAppSidebar
        workspaceName={workspace.workspace.name}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={{
          name: workspace.members[0]?.name ?? "Unknown",
          email: workspace.members[0]?.email ?? "",
          avatar: workspace.members[0]?.avatar ?? "U",
          avatarUrl: workspace.members[0]?.avatarUrl,
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/workspace">Workspaces</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={`/workspace/${workspaceid}`}>
                    {workspace.workspace.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{tabTitles[activeTab]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
