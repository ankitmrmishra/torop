"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Calendar,
} from "lucide-react";
import type {
  WorkspaceStats,
  Event,
  TopEvent,
  EventsOverTime,
} from "@/lib/types/workspace";

interface OverviewTabProps {
  eventsExist: boolean;
  stats?: WorkspaceStats;
  recentEvents?: Event[];
  topEvents?: TopEvent[];
  eventsOverTime?: EventsOverTime[];
}

export function OverviewTab({
  eventsExist,
  stats,
  recentEvents,
  topEvents,
  eventsOverTime,
}: OverviewTabProps) {
  // Helper function to calculate time ago
  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} sec ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  if (!eventsExist) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 pb-6 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                <BarChart3 className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                No events yet
              </h3>
              <p className="text-slate-600">
                Send your first event to start seeing analytics.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline">View Documentation</Button>
              <Button>Generate API Key</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Format numbers with commas
  const formatNumber = (num: number) => num.toLocaleString();

  // Map real stats data
  const statsCards = [
    {
      title: "Total Events",
      value: formatNumber(stats?.totalEvents || 0),
      change: stats?.eventsChange || "+0%",
      trend: stats?.eventsChange?.startsWith("-") ? "down" : "up",
      icon: Activity,
    },
    {
      title: "Unique Users",
      value: formatNumber(stats?.uniqueUsers || 0),
      change: stats?.usersChange || "+0%",
      trend: stats?.usersChange?.startsWith("-") ? "down" : "up",
      icon: Users,
    },
    {
      title: "Avg Events/Day",
      value: formatNumber(stats?.avgEventsPerDay || 0),
      change: stats?.avgEventsChange || "+0%",
      trend: stats?.avgEventsChange?.startsWith("-") ? "down" : "up",
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Overview</h2>
        <p className="text-slate-600 mt-1">
          Your workspace analytics at a glance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          const trendColor =
            stat.trend === "up" ? "text-green-600" : "text-red-600";

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className={`flex items-center gap-1 mt-1 ${trendColor}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{stat.change}</span>
                  <span className="text-xs text-slate-500 ml-1">
                    vs last period
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Over Time Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Events Over Time</CardTitle>
              <Tabs defaultValue="daily" className="w-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-center space-y-2">
                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm text-slate-500">
                  Chart Placeholder – Recharts will be here
                </p>
                <p className="text-xs text-muted-foreground">Line chart view</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Events Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Top Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-center space-y-2">
                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm text-slate-500">
                  Chart Placeholder – Recharts will be here
                </p>
                <p className="text-xs text-muted-foreground">Bar chart view</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvents && recentEvents.length > 0 ? (
              recentEvents.slice(0, 5).map((event) => {
                const eventDate = new Date(event.timestamp);
                const timeAgo = getTimeAgo(eventDate);

                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {event.eventName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {event.properties.userId &&
                            `User ID: ${event.properties.userId}`}
                          {!event.properties.userId &&
                            Object.keys(event.properties).length > 0 &&
                            `${Object.keys(event.properties).length} properties`}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500">{timeAgo}</div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-500">
                No recent events
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
