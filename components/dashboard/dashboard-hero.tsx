"use client";

import { motion } from "framer-motion";
import { Award, Clock, Flame, Play, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDuration, formatRelativeTime } from "@/lib/utils";
import type { ActivityItem } from "@/types/dashboard";

const typeIcons = {
  session: Clock,
  achievement: Award,
  team: Users,
  system: Flame,
};

interface DashboardHeroProps {
  streak: number;
  weeklyGoalProgress: number;
  userName?: string;
}

export function DashboardHero({ streak, weeklyGoalProgress, userName = "Alex" }: DashboardHeroProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-surface to-primary/5 p-6 md:p-8"
    >
      <div className="gradient-mesh absolute inset-0 opacity-60" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Flame className="h-3 w-3 text-warning" />
              {streak} day streak
            </Badge>
            <Badge variant="outline">Weekly goal {weeklyGoalProgress}%</Badge>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {greeting}, {userName}
            </h1>
            <p className="mt-2 max-w-lg text-muted-foreground">
              You&apos;re on track this week. Start a focus session to keep your momentum going.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="/focus">
                <Play className="h-4 w-4" />
                Start Focus Session
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard/analytics">View Analytics</Link>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-xs space-y-3 rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Weekly goal</span>
            <span className="font-semibold">{weeklyGoalProgress}%</span>
          </div>
          <Progress value={weeklyGoalProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {formatDuration(Math.round(284 * weeklyGoalProgress / 100))} of 4h target completed
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface ActivityTimelineProps {
  items: ActivityItem[];
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const Icon = typeIcons[item.type];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1 border-b border-border pb-4 last:border-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatRelativeTime(item.timestamp)}
                </span>
              </div>
              {item.duration && (
                <Badge variant="secondary" className="mt-2">
                  {formatDuration(item.duration)}
                </Badge>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
