export type TimeRange = "today" | "week" | "month";

export interface MetricStat {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  format: "number" | "duration" | "percent" | "currency";
  trend: "up" | "down" | "neutral";
  icon: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "session" | "achievement" | "team" | "system";
  duration?: number;
}

export interface SubjectBreakdown {
  name: string;
  minutes: number;
  color: string;
  percentage: number;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  xp: number;
  completedAt: string;
}

export interface TaskItem {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "achievement";
}

export interface ChartDataPoint {
  date: string;
  minutes: number;
  sessions: number;
  xp: number;
}

export interface HeatmapCell {
  day: number;
  hour: number;
  value: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  subject: string;
  progress: number;
  lastStudied: string;
  totalMinutes: number;
}

export interface SystemHealthMetric {
  id: string;
  label: string;
  status: "healthy" | "warning" | "critical";
  value: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  shortcut?: string;
  badge?: string | number;
  children?: NavItem[];
  pinned?: boolean;
}

export interface Workspace {
  id: string;
  name: string;
  plan: string;
  avatar: string;
}
