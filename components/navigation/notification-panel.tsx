"use client";

import { CheckCheck } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDashboardStore } from "@/store/dashboard-store";
import { notifications } from "@/services/analytics-data";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const typeStyles = {
  info: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  achievement: "bg-accent/10 text-accent",
};

export function NotificationPanel() {
  const { notificationsOpen, setNotificationsOpen } = useDashboardStore();

  return (
    <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between pr-8">
            <SheetTitle>Notifications</SheetTitle>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </Button>
          </div>
        </SheetHeader>
        <ScrollArea className="mt-6 h-[calc(100vh-120px)]">
          <div className="space-y-2 pr-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "group rounded-2xl border border-border p-4 transition-colors hover:bg-muted/50",
                  !notification.read && "border-primary/20 bg-primary/5"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatRelativeTime(notification.timestamp)}
                    </p>
                  </div>
                  <Badge variant="secondary" className={cn("shrink-0 capitalize", typeStyles[notification.type])}>
                    {notification.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
