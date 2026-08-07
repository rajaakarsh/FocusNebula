import { Suspense } from "react";
import { SettingsContent } from "@/components/settings/settings-content";
import { DashboardSkeleton } from "@/components/dashboard/loading-skeleton";

export default function SettingsPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <SettingsContent />
    </Suspense>
  );
}
