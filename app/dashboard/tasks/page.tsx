import { Suspense } from "react";
import { TasksManager } from "@/components/dashboard/tasks-manager";
import { DashboardSkeleton } from "@/components/dashboard/loading-skeleton";

export default function TasksPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <TasksManager />
    </Suspense>
  );
}
