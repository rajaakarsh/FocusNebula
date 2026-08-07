import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TimeRange } from "@/types/dashboard";

interface SidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
  pinnedItems: string[];
  recentItems: string[];
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
  toggleMobileOpen: () => void;
  addRecentItem: (id: string) => void;
  togglePinnedItem: (id: string) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      mobileOpen: false,
      pinnedItems: ["dashboard", "analytics"],
      recentItems: ["dashboard", "sessions", "tasks"],
      toggleCollapsed: () => set({ collapsed: !get().collapsed }),
      setMobileOpen: (open) => set({ mobileOpen: open }),
      toggleMobileOpen: () => set({ mobileOpen: !get().mobileOpen }),
      addRecentItem: (id) =>
        set({
          recentItems: [id, ...get().recentItems.filter((item) => item !== id)].slice(0, 5),
        }),
      togglePinnedItem: (id) => {
        const pinned = get().pinnedItems;
        set({
          pinnedItems: pinned.includes(id)
            ? pinned.filter((item) => item !== id)
            : [...pinned, id],
        });
      },
    }),
    { name: "sidebar-storage" }
  )
);

interface DashboardState {
  timeRange: TimeRange;
  commandOpen: boolean;
  notificationsOpen: boolean;
  setTimeRange: (range: TimeRange) => void;
  setCommandOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  timeRange: "today",
  commandOpen: false,
  notificationsOpen: false,
  setTimeRange: (range) => set({ timeRange: range }),
  setCommandOpen: (open) => set({ commandOpen: open }),
  setNotificationsOpen: (open) => set({ notificationsOpen: open }),
}));
