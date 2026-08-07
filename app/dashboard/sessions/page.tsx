import { Suspense } from "react";
import { SessionsManager } from "@/components/dashboard/sessions-manager";
import { DashboardSkeleton } from "@/components/dashboard/loading-skeleton";

export default function SessionsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <SessionsManager />
    </Suspense>
  );
}
