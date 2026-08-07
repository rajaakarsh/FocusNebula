"use client";

import { ErrorState } from "@/components/dashboard/error-state";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Failed to load dashboard"
      message="We encountered an error while loading your dashboard data."
      onRetry={reset}
    />
  );
}
