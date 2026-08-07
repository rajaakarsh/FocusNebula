"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/cards/metric-card";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { ActivityTimeline } from "@/components/dashboard/dashboard-hero";
import { TasksWidget } from "@/components/dashboard/tasks-widget";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { SystemHealth } from "@/components/dashboard/system-health";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";
import { FocusTimerWidget, QuickActions } from "@/components/dashboard/focus-timer-widget";
import { DashboardSkeleton } from "@/components/dashboard/loading-skeleton";
import { ErrorState } from "@/components/dashboard/error-state";
import {
  AreaChartWidget,
  BarChartWidget,
  DonutChartWidget,
  StudyHeatmap,
  Sparkline,
} from "@/components/charts/study-charts";
import { fetchDashboardData } from "@/services/analytics-data";
import { useDashboardStore } from "@/store/dashboard-store";

export function DashboardContent() {
  const { timeRange, setTimeRange } = useDashboardStore();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard", timeRange],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <DashboardHero
        streak={data.streak}
        weeklyGoalProgress={data.weeklyGoalProgress}
      />

      <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as typeof timeRange)}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={timeRange} className="mt-6 space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((stat, index) => (
              <MetricCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Study Time Trends</CardTitle>
                <CardDescription>Your focused minutes over the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChartWidget data={data.weeklyChart} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Subject Breakdown</CardTitle>
                <CardDescription>Time distribution by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChartWidget data={data.subjects} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <FocusTimerWidget
              currentOrbit={data.currentOrbit}
              nextOrbit={data.nextOrbit}
            />
            <QuickActions />
            <Card>
              <CardHeader>
                <CardTitle className="text-base">XP Growth</CardTitle>
                <CardDescription>Experience points earned</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartWidget data={data.weeklyChart} dataKey="xp" height={200} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Study Heatmap</CardTitle>
                <CardDescription>When you study most — by day and hour</CardDescription>
              </CardHeader>
              <CardContent>
                <StudyHeatmap data={data.heatmap} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Performance Sparklines</CardTitle>
                  <CardDescription>Quick trend indicators</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.metrics.map((stat) => (
                  <div key={stat.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <Sparkline data={[stat.previousValue, stat.value, stat.value * 1.1, stat.value * 0.9, stat.value]} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>Latest events from your study journey</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityTimeline items={data.activity} />
              </CardContent>
            </Card>

            <div className="space-y-6 xl:col-span-1">
              <TasksWidget tasks={data.tasks} />
            </div>

            <div className="space-y-6 xl:col-span-1">
              <CalendarWidget />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <RecentProjects projects={data.projects} />
            <SystemHealth metrics={data.systemHealth} />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
