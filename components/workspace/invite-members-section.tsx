"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InviteMemberForm } from "./invite-member-form";
import { InvitationsList } from "./invitations-list";
import { RiUserAddLine, RiMailLine } from "@remixicon/react";

interface InviteMembersSectionProps {
  workspaceId: string;
}

export function InviteMembersSection({
  workspaceId,
}: InviteMembersSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleInvitationSuccess = () => {
    // Trigger refresh of invitations list
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RiUserAddLine className="h-5 w-5" />
          Invite Members
        </CardTitle>
        <CardDescription>
          Send invitations to collaborate in this workspace
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="invite" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="invite">
              <RiUserAddLine className="h-4 w-4 mr-2" />
              Send Invitation
            </TabsTrigger>
            <TabsTrigger value="pending">
              <RiMailLine className="h-4 w-4 mr-2" />
              Pending Invitations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invite" className="space-y-4 mt-4">
            <InviteMemberForm
              workspaceId={workspaceId}
              onSuccess={handleInvitationSuccess}
            />
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <InvitationsList
              workspaceId={workspaceId}
              refreshTrigger={refreshTrigger}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
