"use client";

import { Timer, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";

interface FocusTimerWidgetProps {
  seconds?: number;
  currentOrbit?: string;
  nextOrbit?: string;
}

export function FocusTimerWidget({
  seconds = 0,
  currentOrbit = "Mercury",
  nextOrbit = "Venus",
}: FocusTimerWidgetProps) {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-surface to-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Timer className="h-4 w-4 text-primary" />
            Focus Timer
          </CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            Ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="font-mono text-5xl font-semibold tracking-tight tabular-nums">
            {formatTime(seconds)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Total study time today</p>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface/80 p-4">
          <div>
            <p className="text-xs text-muted-foreground">Current</p>
            <p className="font-medium">{currentOrbit}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next milestone</p>
            <p className="font-medium">{nextOrbit}</p>
          </div>
        </div>
        <Button asChild className="w-full" size="lg">
          <Link href="/focus">Start Session</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

interface QuickActionsProps {
  className?: string;
}

export function QuickActions({ className }: QuickActionsProps) {
  const actions = [
    { label: "Start Focus", href: "/focus", primary: true },
    { label: "Add Task", href: "/dashboard/tasks" },
    { label: "Join Crew", href: "/dashboard/team/crew" },
    { label: "View Stats", href: "/dashboard/analytics" },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.primary ? "default" : "outline"}
            className="h-auto py-3"
            asChild
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
