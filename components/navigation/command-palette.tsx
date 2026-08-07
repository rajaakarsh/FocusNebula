"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckSquare,
  HelpCircle,
  History,
  LayoutDashboard,
  Moon,
  Play,
  Plus,
  Settings,
  Sun,
  Timer,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { commandActions, mainNavItems, secondaryNavItems } from "@/constants/navigation";
import { useDashboardStore } from "@/store/dashboard-store";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "layout-dashboard": LayoutDashboard,
  timer: Timer,
  "bar-chart-3": BarChart3,
  history: History,
  "check-square": CheckSquare,
  calendar: Calendar,
  users: Users,
  "user-plus": UserPlus,
  trophy: Trophy,
  "book-open": BookOpen,
  award: Award,
  settings: Settings,
  "help-circle": HelpCircle,
  play: Play,
  plus: Plus,
  moon: Moon,
};

export function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { commandOpen, setCommandOpen } = useDashboardStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandOpen, setCommandOpen]);

  const runCommand = (action: () => void) => {
    setCommandOpen(false);
    action();
  };

  const allNav = [...mainNavItems, ...secondaryNavItems.flatMap((item) => item.children ?? [item])];

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Search commands, pages, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Actions">
          {commandActions.map((action) => {
            const Icon = iconMap[action.icon] ?? Play;
            return (
              <CommandItem
                key={action.id}
                onSelect={() => {
                  if (action.id === "toggle-theme") {
                    runCommand(() => setTheme(theme === "dark" ? "light" : "dark"));
                  } else if (action.id === "start-focus") {
                    runCommand(() => router.push("/focus"));
                  } else if (action.id === "open-settings") {
                    runCommand(() => router.push("/dashboard/settings"));
                  } else if (action.id === "view-analytics") {
                    runCommand(() => router.push("/dashboard/analytics"));
                  } else {
                    runCommand(() => toast.info(`${action.label} triggered`));
                  }
                }}
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{action.label}</span>
                {action.shortcut && <CommandShortcut>{action.shortcut}</CommandShortcut>}
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Navigation">
          {allNav.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            return (
              <CommandItem
                key={item.id}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
                {item.shortcut && <CommandShortcut>⌘{item.shortcut}</CommandShortcut>}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
