"use client";

import { Activity, Cloud, Database, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SystemHealthMetric } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const statusStyles = {
  healthy: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  critical: "bg-destructive/10 text-destructive border-destructive/20",
};

const iconMap = {
  sync: Cloud,
  storage: Database,
  performance: Gauge,
  backup: Activity,
};

interface SystemHealthProps {
  metrics: SystemHealthMetric[];
}

export function SystemHealth({ metrics }: SystemHealthProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">System Health</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => {
          const Icon = iconMap[metric.id as keyof typeof iconMap] ?? Activity;
          return (
            <div
              key={metric.id}
              className="flex items-start gap-3 rounded-xl border border-border p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{metric.label}</p>
                  <Badge variant="outline" className={cn("text-xs capitalize", statusStyles[metric.status])}>
                    {metric.status}
                  </Badge>
                </div>
                <p className="mt-0.5 text-sm font-semibold">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
