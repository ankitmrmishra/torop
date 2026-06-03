import * as React from "react";
import { WorkspaceApiResponse } from "@/lib/types/workspace";

/**
 * Fetches comprehensive workspace details including members, events, and statistics
 */
export async function fetchWorkspaceDetails(
  workspaceid: string,
): Promise<WorkspaceApiResponse | null> {
  try {
    console.log("[fetchWorkspaceDetails] Fetching workspace:", workspaceid);

    const response = await fetch(`/api/workspace/${workspaceid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("[fetchWorkspaceDetails] Response status:", response.status);

    if (!response.ok) {
      console.error("[fetchWorkspaceDetails] Request failed:", response.status);

      if (response.status === 401) {
        console.error("Unauthorized: User not authenticated");
        return null;
      }

      if (response.status === 403) {
        console.error("Forbidden: User doesn't have access to this workspace");
        return null;
      }

      if (response.status === 404) {
        console.error("Workspace not found");
        return null;
      }

      const errorText = await response.text();
      console.error("[fetchWorkspaceDetails] Error response:", errorText);

      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WorkspaceApiResponse = await response.json();

    console.log("[fetchWorkspaceDetails] Parsed response:", data);

    return data;
  } catch (error) {
    console.error(
      "[fetchWorkspaceDetails] Error fetching workspace details:",
      error,
    );
    return null;
  }
}

/**
 * Client-side hook for fetching workspace details with loading state
 */
export function useWorkspaceDetails(workspaceid: string) {
  const [data, setData] = React.useState<WorkspaceApiResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    console.log(
      "[useWorkspaceDetails] Effect triggered. workspaceid:",
      workspaceid,
    );

    async function loadWorkspace() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchWorkspaceDetails(workspaceid);

        console.log("[useWorkspaceDetails] Fetch result:", result);

        if (isMounted) {
          if (result) {
            console.log("[useWorkspaceDetails] Setting workspace data");

            setData(result);
          } else {
            console.error("[useWorkspaceDetails] Result is null");

            setError("Failed to load workspace");
          }
        }
      } catch (err) {
        console.error("[useWorkspaceDetails] Unexpected error:", err);

        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) {
          setLoading(false);

          console.log("[useWorkspaceDetails] Loading finished");
        }
      }
    }

    loadWorkspace();

    return () => {
      isMounted = false;
    };
  }, [workspaceid]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchWorkspaceDetails(workspaceid),
  };
}
