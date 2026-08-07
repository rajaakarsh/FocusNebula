import { Suspense } from "react";
import { CrewDashboard } from "@/components/team/crew-dashboard";
import { DashboardSkeleton } from "@/components/dashboard/loading-skeleton";

export default function TeamPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <CrewDashboard />
    </Suspense>
  );
}
