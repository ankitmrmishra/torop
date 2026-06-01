import {
  pgTable,
  text,
  timestamp,
  uuid,
    uniqueIndex,
    index,
  jsonb
} from "drizzle-orm/pg-core";
import { user } from "./auth";


export const workspaces = pgTable("workspace", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  apiKeyHash: text("apiKeyHash").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const workspaceMembers = pgTable(
  "workspace_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["owner", "member"] })
      .default("member")
      .notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => ({
    // Each user can only be in a workspace once
    uniqueMember: uniqueIndex("unique_workspace_member").on(
      table.userId,
      table.workspaceId,
    ),
  }),
);

//
export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    eventName: text("event_name").notNull(),
    properties: jsonb("properties").default({}).notNull(),
    timestamp: timestamp("timestamp").defaultNow().notNull(), // when the event occurred (provided by sender)
    receivedAt: timestamp("received_at").defaultNow().notNull(), // server receipt time
  },
  (table) => ({
    // Critical index for time-series queries filtered by workspace and event name
    eventsQueryIdx: index("events_query_idx").on(
      table.workspaceId,
      table.eventName,
      table.timestamp,
    ),
  }),
);