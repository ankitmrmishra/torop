# Workspace Analytics Dashboard - Complete Setup

This document describes the complete implementation of the multi-tenant SaaS analytics workspace dashboard with full API integration.

## Overview

The workspace dashboard provides a comprehensive analytics interface with:

- Real-time event tracking
- Team member management
- Workspace settings and API key management
- Role-based access control (owner/member)

## Architecture

### API Endpoint

**GET** `/api/workspace/[workspaceid]`

Returns comprehensive workspace data including:

- Workspace basic info (id, name, created/updated dates, member count, event count, user role)
- All workspace members with user details
- Event statistics (total events, unique users, average events per day)
- Top 10 most frequent events
- Recent 10 events
- Events over time (30-day daily aggregation)

#### Authentication

- Requires active user session via Better Auth
- Automatically checks if user has access to the requested workspace
- Returns user's role in the workspace (owner/member)

#### Response Schema

```typescript
{
  workspace: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    memberCount: number;
    eventCount: number;
    userRole: "owner" | "member";
  }
  members: Array<{
    id: string;
    userId: string;
    name: string;
    email: string;
    avatar: string;
    role: "owner" | "member";
    joinedAt: Date;
  }>;
  stats: {
    totalEvents: number;
    uniqueUsers: number;
    avgEventsPerDay: number;
    eventsChange: string; // e.g., "+12.3%"
    usersChange: string;
    avgEventsChange: string;
  }
  topEvents: Array<{
    eventName: string;
    count: number;
  }>;
  recentEvents: Array<{
    id: string;
    eventName: string;
    properties: Record<string, any>;
    timestamp: Date;
    receivedAt: Date;
  }>;
  eventsOverTime: Array<{
    date: string; // YYYY-MM-DD format
    count: number;
  }>;
}
```

### Database Schema

The API queries three main tables:

1. **workspaces** - Stores workspace information
   - id (uuid, primary key)
   - name (text)
   - apiKeyHash (text, unique)
   - createdAt, updatedAt (timestamps)

2. **workspaceMembers** - Stores workspace membership
   - id (uuid, primary key)
   - userId (references user.id)
   - workspaceId (references workspace.id)
   - role (enum: "owner" | "member")
   - joinedAt, updatedAt (timestamps)

3. **events** - Stores analytics events
   - id (uuid, primary key)
   - workspaceId (references workspace.id)
   - eventName (text)
   - properties (jsonb)
   - timestamp (when event occurred)
   - receivedAt (when server received it)

## Frontend Components

### Page Component

**Location:** `/app/workspace/[workspaceId]/page.tsx`

- Client-side rendered page
- Uses `useWorkspaceDetails` hook to fetch data
- Manages tab navigation state
- Handles loading and error states

### Tab Components

All tab components are located in `/components/workspace/`:

1. **WorkspaceSidebar**
   - Dark-themed sidebar with workspace avatar
   - Navigation tabs with active state
   - User dropdown menu

2. **OverviewTab**
   - Shows empty state if no events exist
   - Displays stats cards with trend indicators
   - Chart placeholders for time-series and top events
   - Recent activity feed (last 5 events)

3. **EventsTab**
   - Filterable table of events
   - Search by event name
   - Date range filters
   - Pagination controls

4. **MembersTab**
   - Table of all workspace members
   - Invite dialog (owner only)
   - Member role management (owner only)
   - Shows join date and avatar

5. **SettingsTab**
   - Workspace name editing (owner only)
   - API key display and regeneration (owner only)
   - Danger zone with delete workspace (owner only)

### Helper Functions

**Location:** `/lib/helperfunctions/`

- `fetch-workspace-details.ts` - Fetches workspace data from API
- `useWorkspaceDetails` hook - React hook with loading/error states
- `get-workspace.ts` - Server-side function to get user's workspace

### Type Definitions

**Location:** `/lib/types/workspace.ts`

Complete TypeScript interfaces for all workspace-related data structures.

## Role-Based Access Control

### Owner Role

- Full access to all features
- Can invite/remove members
- Can edit workspace settings
- Can generate/regenerate API keys
- Can delete workspace

### Member Role

- Read-only access to workspace data
- Can view all tabs
- Cannot edit settings
- Cannot manage members
- Cannot delete workspace

## Usage

### Accessing a Workspace

Navigate to `/workspace/[workspaceId]` where workspaceId is the UUID of the workspace.

The page will:

1. Authenticate the user
2. Fetch workspace data from API
3. Verify user has access
4. Display appropriate UI based on user role

### Error States

- **401 Unauthorized** - User not logged in → Redirect to sign-in
- **403 Forbidden** - User doesn't have access to workspace
- **404 Not Found** - Workspace doesn't exist
- **500 Internal Error** - Server error

## Security Features

✅ **Authentication Required** - All endpoints require active session
✅ **Authorization Check** - Verifies user is workspace member
✅ **Role-Based UI** - Shows/hides features based on user role
✅ **SQL Injection Protection** - Uses Drizzle ORM parameterized queries
✅ **API Key Masking** - Partial display of sensitive keys

## Performance Optimizations

- **Indexed Queries** - Events table has composite index on (workspaceId, eventName, timestamp)
- **Limited Results** - Recent events limited to 10, top events to 10
- **Aggregated Stats** - Pre-calculated statistics
- **Client-side Pagination** - Reduces initial data transfer

## Future Enhancements

### Recommended Next Steps

1. **Real-time Updates** - WebSocket integration for live event streaming
2. **Chart Implementation** - Replace placeholders with Recharts visualizations
3. **Advanced Filtering** - Date range selector, event name filter for stats
4. **Export Functionality** - CSV/JSON export of events
5. **Webhooks** - Notify external services of events
6. **Rate Limiting** - API endpoint throttling per workspace
7. **Caching** - Redis cache for stats to reduce DB load
8. **Historical Comparison** - Calculate real percentage changes vs previous period
9. **Member Invitations** - Email invitation system with tokens
10. **Audit Log** - Track all workspace changes

## Testing

### Test the API Endpoint

```bash
# Using curl (replace workspaceId and auth token)
curl -X GET "http://localhost:3000/api/workspace/YOUR_WORKSPACE_ID" \
  -H "Cookie: better-auth.session_token=YOUR_SESSION_TOKEN"
```

### Mock Data for Development

To test with mock data, you can temporarily set `eventCount: 0` in the mock workspace object to see the empty state, or set it to a positive number to see the full dashboard.

## Environment Variables

Ensure these are set in `.env`:

```env
DATABASE_URL=your_postgres_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

## Database Migrations

The schema uses Drizzle ORM. To apply migrations:

```bash
pnpm db:generate  # Generate migration files
pnpm db:push      # Apply to database
```

## Questions & Support

For issues or questions about this implementation, refer to:

- `/components/workspace/README.md` - Component documentation
- Database schema in `/db/schema/workspace.ts`
- API route in `/app/api/workspace/[workspaceid]/route.ts`
