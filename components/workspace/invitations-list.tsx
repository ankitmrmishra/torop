"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  RiLoader4Line,
  RiMailLine,
  RiTimeLine,
  RiCheckLine,
  RiCloseLine,
} from "@remixicon/react";

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  expiresAt: string;
  createdAt: string;
  acceptedAt: string | null;
}

interface InvitationsListProps {
  workspaceId: string;
  refreshTrigger?: number;
}

export function InvitationsList({
  workspaceId,
  refreshTrigger,
}: InvitationsListProps) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInvitations();
  }, [workspaceId, refreshTrigger]);

  const fetchInvitations = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/workspace/${workspaceId}/invite`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setInvitations(data.invitations);
      }
    } catch (err) {
      setError("Failed to load invitations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Invitation["status"]) => {
    const variants: Record<
      Invitation["status"],
      { variant: any; icon: React.ReactNode; label: string }
    > = {
      pending: {
        variant: "default",
        icon: <RiTimeLine className="h-3 w-3" />,
        label: "Pending",
      },
      accepted: {
        variant: "default",
        icon: <RiCheckLine className="h-3 w-3" />,
        label: "Accepted",
      },
      expired: {
        variant: "secondary",
        icon: <RiCloseLine className="h-3 w-3" />,
        label: "Expired",
      },
      revoked: {
        variant: "destructive",
        icon: <RiCloseLine className="h-3 w-3" />,
        label: "Revoked",
      },
    };

    const config = variants[status];

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RiLoader4Line className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (invitations.length === 0) {
    return (
      <div className="text-center py-8">
        <RiMailLine className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No invitations sent yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invitations.map((invitation) => (
        <div
          key={invitation.id}
          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <p className="text-sm font-medium truncate">{invitation.email}</p>
              {getStatusBadge(invitation.status)}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="capitalize">{invitation.role}</span>
              <span>•</span>
              <span>Sent {formatDate(invitation.createdAt)}</span>
              {invitation.status === "pending" && (
                <>
                  <span>•</span>
                  <span>Expires {formatDate(invitation.expiresAt)}</span>
                </>
              )}
              {invitation.status === "accepted" && invitation.acceptedAt && (
                <>
                  <span>•</span>
                  <span>Accepted {formatDate(invitation.acceptedAt)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
