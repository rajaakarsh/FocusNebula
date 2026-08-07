import type { NavItem, Workspace } from "@/types/dashboard";

export const workspaces: Workspace[] = [
  { id: "personal", name: "Personal Study", plan: "Pro", avatar: "PS" },
  { id: "exam-prep", name: "Exam Prep 2026", plan: "Team", avatar: "EP" },
  { id: "research", name: "Research Lab", plan: "Free", avatar: "RL" },
];

export const mainNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "layout-dashboard", shortcut: "D" },
  { id: "focus", label: "Focus Timer", href: "/focus", icon: "timer", shortcut: "F" },
  { id: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: "bar-chart-3", shortcut: "A" },
  { id: "sessions", label: "Sessions", href: "/dashboard/sessions", icon: "history" },
  { id: "tasks", label: "Tasks", href: "/dashboard/tasks", icon: "check-square", badge: 3 },
  { id: "calendar", label: "Calendar", href: "/dashboard/calendar", icon: "calendar" },
];

export const secondaryNavItems: NavItem[] = [
  {
    id: "team",
    label: "Team",
    href: "/dashboard/team",
    icon: "users",
  },
  { id: "subjects", label: "Subjects", href: "/dashboard/subjects", icon: "book-open" },
  { id: "achievements", label: "Achievements", href: "/dashboard/achievements", icon: "award" },
];

export const bottomNavItems: NavItem[] = [
  { id: "settings", label: "Settings", href: "/dashboard/settings", icon: "settings", shortcut: "," },
  { id: "help", label: "Help & Support", href: "/dashboard/help", icon: "help-circle" },
];

export const commandActions = [
  { id: "start-focus", label: "Start Focus Session", icon: "play", shortcut: "⌘⇧F" },
  { id: "add-task", label: "Add Task", icon: "plus", shortcut: "⌘⇧T" },
  { id: "view-analytics", label: "View Analytics", icon: "bar-chart-3", shortcut: "⌘⇧A" },
  { id: "toggle-theme", label: "Toggle Theme", icon: "moon", shortcut: "⌘⇧L" },
  { id: "open-settings", label: "Open Settings", icon: "settings", shortcut: "⌘," },
];

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_COLLAPSED_WIDTH = 72;
