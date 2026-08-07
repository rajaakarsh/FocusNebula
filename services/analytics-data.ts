import type {
  ActivityItem,
  ChartDataPoint,
  HeatmapCell,
  MetricStat,
  NotificationItem,
  ProjectItem,
  StudySession,
  SubjectBreakdown,
  SystemHealthMetric,
  TaskItem,
} from "@/types/dashboard";

export const metricStats: MetricStat[] = [
  {
    id: "study-time",
    label: "Study Time",
    value: 284,
    previousValue: 241,
    format: "duration",
    trend: "up",
    icon: "clock",
  },
  {
    id: "xp-earned",
    label: "XP Earned",
    value: 1840,
    previousValue: 1620,
    format: "number",
    trend: "up",
    icon: "zap",
  },
  {
    id: "sessions",
    label: "Sessions",
    value: 12,
    previousValue: 10,
    format: "number",
    trend: "up",
    icon: "target",
  },
  {
    id: "avg-session",
    label: "Avg Session",
    value: 24,
    previousValue: 26,
    format: "duration",
    trend: "down",
    icon: "timer",
  },
];

export const subjectBreakdown: SubjectBreakdown[] = [
  { name: "Mathematics", minutes: 98, color: "#818cf8", percentage: 34 },
  { name: "Physics", minutes: 72, color: "#a78bfa", percentage: 25 },
  { name: "Chemistry", minutes: 54, color: "#22d3ee", percentage: 19 },
  { name: "Biology", minutes: 38, color: "#4ade80", percentage: 13 },
  { name: "English", minutes: 22, color: "#fbbf24", percentage: 9 },
];

export const weeklyChartData: ChartDataPoint[] = [
  { date: "Mon", minutes: 45, sessions: 2, xp: 180 },
  { date: "Tue", minutes: 62, sessions: 3, xp: 248 },
  { date: "Wed", minutes: 38, sessions: 1, xp: 152 },
  { date: "Thu", minutes: 71, sessions: 3, xp: 284 },
  { date: "Fri", minutes: 55, sessions: 2, xp: 220 },
  { date: "Sat", minutes: 89, sessions: 4, xp: 356 },
  { date: "Sun", minutes: 42, sessions: 2, xp: 168 },
];

export const monthlyGrowthData: ChartDataPoint[] = Array.from(
  { length: 30 },
  (_, i) => ({
    date: `${i + 1}`,
    minutes: Math.floor(Math.random() * 80) + 20,
    sessions: Math.floor(Math.random() * 4) + 1,
    xp: Math.floor(Math.random() * 300) + 100,
  })
);

export const heatmapData: HeatmapCell[] = Array.from({ length: 7 * 24 }, (_, i) => ({
  day: Math.floor(i / 24),
  hour: i % 24,
  value: Math.random() > 0.6 ? Math.floor(Math.random() * 60) : 0,
}));

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    title: "Completed focus session",
    description: "Mathematics — Calculus II",
    timestamp: "2026-08-03T14:30:00Z",
    type: "session",
    duration: 45,
  },
  {
    id: "2",
    title: "7-day streak achieved",
    description: "Consistency milestone unlocked",
    timestamp: "2026-08-03T12:00:00Z",
    type: "achievement",
  },
  {
    id: "3",
    title: "Team session started",
    description: "Study Crew Alpha joined live room",
    timestamp: "2026-08-03T10:15:00Z",
    type: "team",
  },
  {
    id: "4",
    title: "Weekly goal reached",
    description: "Exceeded 4h study target",
    timestamp: "2026-08-02T20:00:00Z",
    type: "achievement",
  },
  {
    id: "5",
    title: "Completed focus session",
    description: "Physics — Thermodynamics",
    timestamp: "2026-08-02T16:45:00Z",
    type: "session",
    duration: 32,
  },
];

export const recentSessions: StudySession[] = [
  { id: "1", subject: "Mathematics", duration: 45, xp: 180, completedAt: "2026-08-03T14:30:00Z" },
  { id: "2", subject: "Physics", duration: 32, xp: 128, completedAt: "2026-08-02T16:45:00Z" },
  { id: "3", subject: "Chemistry", duration: 28, xp: 112, completedAt: "2026-08-02T11:20:00Z" },
  { id: "4", subject: "Biology", duration: 55, xp: 220, completedAt: "2026-08-01T19:00:00Z" },
];

export const tasks: TaskItem[] = [
  { id: "1", title: "Review calculus derivatives", subject: "Mathematics", completed: false, priority: "high", dueDate: "2026-08-04" },
  { id: "2", title: "Complete physics problem set", subject: "Physics", completed: false, priority: "medium", dueDate: "2026-08-05" },
  { id: "3", title: "Read chemistry chapter 8", subject: "Chemistry", completed: true, priority: "low" },
  { id: "4", title: "Practice essay outline", subject: "English", completed: false, priority: "medium", dueDate: "2026-08-06" },
  { id: "5", title: "Flashcard review — biology", subject: "Biology", completed: false, priority: "low" },
];

export const notifications: NotificationItem[] = [
  { id: "1", title: "Session complete", message: "Great work! You earned 180 XP from your Mathematics session.", timestamp: "2026-08-03T14:30:00Z", read: false, type: "success" },
  { id: "2", title: "Crew invitation", message: "Alex invited you to join Study Crew Alpha.", timestamp: "2026-08-03T11:00:00Z", read: false, type: "info" },
  { id: "3", title: "Weekly report ready", message: "Your study analytics for last week are available.", timestamp: "2026-08-02T09:00:00Z", read: true, type: "info" },
  { id: "4", title: "Rank promotion", message: "Congratulations! You've been promoted to Specialist.", timestamp: "2026-08-01T18:00:00Z", read: true, type: "achievement" },
];

export const projects: ProjectItem[] = [
  { id: "1", name: "Calculus II Prep", subject: "Mathematics", progress: 68, lastStudied: "2026-08-03T14:30:00Z", totalMinutes: 420 },
  { id: "2", name: "Thermodynamics Unit", subject: "Physics", progress: 45, lastStudied: "2026-08-02T16:45:00Z", totalMinutes: 280 },
  { id: "3", name: "Organic Chemistry", subject: "Chemistry", progress: 32, lastStudied: "2026-08-02T11:20:00Z", totalMinutes: 190 },
  { id: "4", name: "Cell Biology Review", subject: "Biology", progress: 78, lastStudied: "2026-08-01T19:00:00Z", totalMinutes: 340 },
];

export const systemHealth: SystemHealthMetric[] = [
  { id: "sync", label: "Cloud Sync", status: "healthy", value: "Connected", description: "Last synced 2 min ago" },
  { id: "storage", label: "Local Storage", status: "healthy", value: "12%", description: "48 MB of 400 MB used" },
  { id: "performance", label: "Performance", status: "healthy", value: "Optimal", description: "60 FPS, low memory usage" },
  { id: "backup", label: "Backup", status: "warning", value: "Pending", description: "Last backup 3 days ago" },
];

export async function fetchDashboardData() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    metrics: metricStats,
    subjects: subjectBreakdown,
    weeklyChart: weeklyChartData,
    monthlyGrowth: monthlyGrowthData,
    heatmap: heatmapData,
    activity: recentActivity,
    sessions: recentSessions,
    tasks,
    notifications,
    projects,
    systemHealth,
    streak: 7,
    weeklyGoalProgress: 72,
    focusTimerSeconds: 0,
    currentOrbit: "Mercury",
    nextOrbit: "Venus",
  };
}

export type DashboardData = Awaited<ReturnType<typeof fetchDashboardData>>;
