"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";

export function CalendarManager() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mission Schedule (Calendar)</h2>
          <p className="text-muted-foreground">
            View your upcoming focus blocks and coordinate with your crew.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[500px]">
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-border rounded-xl">
                <div className="text-center space-y-4">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">No sessions scheduled</h3>
                    <p className="text-sm text-muted-foreground">Click anywhere on the calendar to block out focus time.</p>
                  </div>
                  <Button>Schedule Session</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <div className="xl:col-span-1">
             <CalendarWidget />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Today</CardTitle>
              <CardDescription>Your next scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Deep Work Block</h4>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 14:00 - 16:00
                    </p>
                    <Badge variant="outline" className="mt-2 text-[10px]">Physics</Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-orange-500" />
                  <div>
                    <h4 className="font-medium text-sm">Crew Check-in</h4>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 16:30 - 17:00
                    </p>
                    <Badge variant="outline" className="mt-2 text-[10px]">Social</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
