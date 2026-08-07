"use client";

import { Sidebar, MobileSidebar } from "@/components/navigation/sidebar";
import { DashboardNavbar } from "@/components/navigation/navbar";
import { CommandPalette } from "@/components/navigation/command-palette";
import { TooltipProvider } from "@/components/ui/tooltip";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <MobileSidebar />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <DashboardNavbar />
          <main
            id="main-content"
            className="flex-1 overflow-y-auto gradient-mesh"
            tabIndex={-1}
          >
            <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-6 md:py-8 lg:px-8">
              {children}
            </div>
          </main>
        </div>
        <CommandPalette />
      </div>
    </TooltipProvider>
  );
}
