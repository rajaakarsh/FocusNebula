import { Suspense } from "react";
import { CalendarManager } from "@/components/dashboard/calendar-manager";
import { DashboardSkeleton } from "@/components/dashboard/loading-skeleton";

export default function CalendarPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <CalendarManager />
    </Suspense>
  );
}
