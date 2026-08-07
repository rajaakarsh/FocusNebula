"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChartWidget, BarChartWidget, DonutChartWidget, StudyHeatmap, Sparkline } from "@/components/charts/study-charts";

const MOCK_ANALYTICS_DATA = {
  weeklyChart: [
    { date: "Mon", minutes: 120, sessions: 2, xp: 250 },
    { date: "Tue", minutes: 150, sessions: 3, xp: 300 },
    { date: "Wed", minutes: 180, sessions: 3, xp: 400 },
    { date: "Thu", minutes: 90, sessions: 1, xp: 200 },
    { date: "Fri", minutes: 240, sessions: 4, xp: 600 },
    { date: "Sat", minutes: 60, sessions: 1, xp: 100 },
    { date: "Sun", minutes: 0, sessions: 0, xp: 0 },
  ],
  subjects: [
    { name: "Mathematics", minutes: 450, color: "#3CCBFF", percentage: 45 },
    { name: "Computer Science", minutes: 300, color: "#F4A940", percentage: 30 },
    { name: "Physics", minutes: 150, color: "#8B5CF6", percentage: 15 },
    { name: "Literature", minutes: 100, color: "#10B981", percentage: 10 },
  ],
  heatmap: [
    { day: 1, hour: 9, value: 5 },
    { day: 2, hour: 10, value: 15 },
    { day: 3, hour: 14, value: 25 },
    { day: 4, hour: 16, value: 35 },
    { day: 5, hour: 20, value: 50 },
  ],
  metrics: [
    { id: "1", label: "Focus Score", value: 85, previousValue: 70 },
    { id: "2", label: "Completion Rate", value: 92, previousValue: 88 },
    { id: "3", label: "Deep Work Hours", value: 42, previousValue: 35 },
  ]
};

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
        <p className="text-muted-foreground">
          Deep dive into your focus metrics, XP growth, and study patterns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Focus Volume (Last 30 Days)</CardTitle>
            <CardDescription>Daily minutes spent in deep work mode</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartWidget data={MOCK_ANALYTICS_DATA.weeklyChart} height={350} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Distribution</CardTitle>
            <CardDescription>Time spent per subject</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChartWidget data={MOCK_ANALYTICS_DATA.subjects} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>XP Generation Rate</CardTitle>
            <CardDescription>Experience points earned per day</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartWidget data={MOCK_ANALYTICS_DATA.weeklyChart} dataKey="xp" height={250} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Historical Heatmap</CardTitle>
            <CardDescription>Intensity of study sessions by time and day</CardDescription>
          </CardHeader>
          <CardContent>
            <StudyHeatmap data={MOCK_ANALYTICS_DATA.heatmap} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {MOCK_ANALYTICS_DATA.metrics.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-2 rounded-xl border border-border p-4 bg-surface/30">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-green-500">+{stat.value - stat.previousValue}</span>
                </div>
                <Sparkline data={[stat.previousValue, stat.value * 0.8, stat.value * 1.2, stat.value]} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
