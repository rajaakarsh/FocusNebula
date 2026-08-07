import { Suspense } from "react";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";
import { DashboardSkeleton } from "@/components/dashboard/loading-skeleton";

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AnalyticsDashboard />
    </Suspense>
  );
}
