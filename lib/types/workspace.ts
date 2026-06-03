// Type definitions for workspace API responses

export interface WorkspaceMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "member";
  joinedAt: Date | string;
}

export interface WorkspaceStats {
  totalEvents: number;
  uniqueUsers: number;
  avgEventsPerDay: number;
  eventsChange: string;
  usersChange: string;
  avgEventsChange: string;
}

export interface TopEvent {
  eventName: string;
  count: number;
}

export interface Event {
  id: string;
  eventName: string;
  properties: Record<string, any>;
  timestamp: Date | string;
  receivedAt: Date | string;
}

export interface EventsOverTime {
  date: string;
  count: number;
}

export interface WorkspaceDetails {
  workspace: {
    id: string;
    name: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    memberCount: number;
    eventCount: number;
    userRole: "owner" | "member";
  };
  members: WorkspaceMember[];
  stats: WorkspaceStats;
  topEvents: TopEvent[];
  recentEvents: Event[];
  eventsOverTime: EventsOverTime[];
}

export interface WorkspaceApiResponse extends WorkspaceDetails {}
