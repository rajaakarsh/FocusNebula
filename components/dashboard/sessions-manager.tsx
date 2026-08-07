"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivityTimeline } from "@/components/dashboard/dashboard-hero";
import { Filter, Download, Calendar as CalendarIcon } from "lucide-react";

const MOCK_ACTIVITY = [
  { id: "1", title: "Deep Work Masterclass", timestamp: "2026-08-03T10:00:00Z", type: "achievement" as const, description: "Reached Jupiter Checkpoint (60hrs)" },
  { id: "2", title: "Algorithm Sprint", timestamp: "2026-08-03T08:00:00Z", type: "session" as const, description: "Focused for 120 minutes" },
  { id: "3", title: "Crew Level Up", timestamp: "2026-08-02T14:00:00Z", type: "team" as const, description: "Your crew reached Level 12" },
  { id: "4", title: "Physics Review", timestamp: "2026-08-02T11:00:00Z", type: "session" as const, description: "Focused for 45 minutes" },
  { id: "5", title: "Literature Reading", timestamp: "2026-08-01T15:00:00Z", type: "session" as const, description: "Focused for 90 minutes" },
];

export function SessionsManager() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Session Log</h2>
          <p className="text-muted-foreground">
            A complete history of your focus sessions and cosmic milestones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>Chronological log of your progress.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> This Week</span>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            
            <ActivityTimeline items={MOCK_ACTIVITY} />
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
              <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> Last Week</span>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            
            <div className="opacity-70">
              <ActivityTimeline items={[
                { id: "6", title: "Weekly Goal Met", timestamp: "2026-07-27T10:00:00Z", type: "achievement" as const, description: "15 hours of deep work logged" },
                { id: "7", title: "Math Assignment", timestamp: "2026-07-26T14:00:00Z", type: "session" as const, description: "Focused for 180 minutes" }
              ]} />
            </div>
            
            <div className="flex justify-center pt-4">
              <Button variant="ghost" size="sm">Load More</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
