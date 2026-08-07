"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  History,
  LayoutDashboard,
  Pin,
  Settings,
  Timer,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  bottomNavItems,
  mainNavItems,
  secondaryNavItems,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from "@/constants/navigation";
import { useSidebarStore } from "@/store/dashboard-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

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
};

function SidebarLink({
  href,
  label,
  icon,
  badge,
  shortcut,
  collapsed,
  active,
  pinned,
}: {
  href: string;
  label: string;
  icon: string;
  badge?: string | number;
  shortcut?: string;
  collapsed: boolean;
  active: boolean;
  pinned?: boolean;
}) {
  const Icon = iconMap[icon] ?? LayoutDashboard;

  const content = (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-2"
      )}
      aria-current={active ? "page" : undefined}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-xl bg-primary/10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <Icon className={cn("relative h-[18px] w-[18px] shrink-0", active && "text-primary")} />
      {!collapsed && (
        <>
          <span className="relative flex-1 truncate">{label}</span>
          {pinned && <Pin className="relative h-3 w-3 text-muted-foreground" />}
          {badge !== undefined && (
            <span className="relative rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
              {badge}
            </span>
          )}
          {shortcut && (
            <kbd className="relative hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground lg:inline">
              {shortcut}
            </kbd>
          )}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {label}
          {shortcut && <span className="ml-2 text-muted-foreground">⌘{shortcut}</span>}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

function NavSection({
  title,
  items,
  collapsed,
  pathname,
  pinnedItems,
}: {
  title?: string;
  items: typeof mainNavItems;
  collapsed: boolean;
  pathname: string;
  pinnedItems: string[];
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-1">
      {title && !collapsed && (
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      )}
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const isExpanded = expanded[item.id] ?? isActive;

        if (hasChildren) {
          const Icon = iconMap[item.icon] ?? LayoutDashboard;
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => setExpanded((prev) => ({ ...prev, [item.id]: !isExpanded }))}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")}
                    />
                  </>
                )}
              </button>
              <AnimatePresence>
                {isExpanded && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-4 mt-1 space-y-1 overflow-hidden border-l border-border pl-3"
                  >
                    {item.children!.map((child) => (
                      <SidebarLink
                        key={child.id}
                        href={child.href}
                        label={child.label}
                        icon={child.icon}
                        collapsed={collapsed}
                        active={pathname === child.href}
                        pinned={pinnedItems.includes(child.id)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }

        return (
          <SidebarLink
            key={item.id}
            href={item.href}
            label={item.label}
            icon={item.icon}
            badge={item.badge}
            shortcut={item.shortcut}
            collapsed={collapsed}
            active={isActive}
            pinned={pinnedItems.includes(item.id)}
          />
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed, pinnedItems } = useSidebarStore();

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="relative hidden h-full shrink-0 flex-col border-r border-border bg-surface/80 backdrop-blur-xl md:flex"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-primary-foreground shadow-glow">
            O
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-w-0 flex-1"
            >
              <p className="truncate text-sm font-semibold">Orbit</p>
              <p className="truncate text-xs text-muted-foreground">Study Workspace</p>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto p-3">
          <NavSection items={mainNavItems} collapsed={collapsed} pathname={pathname} pinnedItems={pinnedItems} />
          <NavSection
            title="Workspace"
            items={secondaryNavItems}
            collapsed={collapsed}
            pathname={pathname}
            pinnedItems={pinnedItems}
          />
        </nav>

        <div className="space-y-1 border-t border-border p-3">
          <NavSection items={bottomNavItems} collapsed={collapsed} pathname={pathname} pinnedItems={pinnedItems} />
          <button
            type="button"
            onClick={toggleCollapsed}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen, pinnedItems } = useSidebarStore();

  if (!mobileOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <motion.aside
        initial={{ x: -SIDEBAR_WIDTH }}
        animate={{ x: 0 }}
        exit={{ x: -SIDEBAR_WIDTH }}
        className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-border bg-surface md:hidden"
      >
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-primary-foreground">
            O
          </div>
          <div>
            <p className="text-sm font-semibold">Orbit</p>
            <p className="text-xs text-muted-foreground">Study Workspace</p>
          </div>
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto p-3">
          <NavSection items={mainNavItems} collapsed={false} pathname={pathname} pinnedItems={pinnedItems} />
          <NavSection title="Workspace" items={secondaryNavItems} collapsed={false} pathname={pathname} pinnedItems={pinnedItems} />
        </nav>
      </motion.aside>
    </>
  );
}
