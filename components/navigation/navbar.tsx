"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggleButton } from "@/components/navigation/command-palette";
import { NotificationPanel } from "@/components/navigation/notification-panel";
import { WorkspaceSwitcher } from "@/components/navigation/workspace-switcher";
import { useDashboardStore, useSidebarStore } from "@/store/dashboard-store";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import { logout } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

const breadcrumbLabels: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  sessions: "Sessions",
  tasks: "Tasks",
  calendar: "Calendar",
  team: "Team",
  settings: "Settings",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-sm md:flex">
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const label = breadcrumbLabels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={href} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="text-muted-foreground transition-colors hover:text-foreground">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function DashboardNavbar() {
  const { toggleMobileOpen } = useSidebarStore();
  const { setCommandOpen, setNotificationsOpen, notificationsOpen } = useDashboardStore();
  const { user } = useAuth();
  const router = useRouter();
  const unreadCount = 2;

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <Button
        variant="ghost"
        size="icon-sm"
        className="md:hidden"
        onClick={toggleMobileOpen}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Breadcrumbs />

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className={cn(
            "hidden h-9 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex",
            "min-w-[200px] lg:min-w-[280px]"
          )}
          aria-label="Open command palette"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
        </button>

        <ThemeToggleButton />

        <Button
          variant="ghost"
          size="icon-sm"
          className="relative"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>

        <NotificationPanel />

        <WorkspaceSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="User menu"
            >
              <Avatar className="h-8 w-8">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                    {user?.displayName ? user.displayName.substring(0, 2).toUpperCase() : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.displayName || "Anonymous User"}</span>
                <span className="text-xs font-normal text-muted-foreground">{user?.email || "No email"}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Preferences</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
