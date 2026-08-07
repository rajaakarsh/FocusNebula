"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const studyDays = [3, 5, 7, 10, 12, 15, 18, 20, 22, 25, 28];

export function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = monthStart.getDay();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base">Study Calendar</CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[120px] text-center text-sm font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startPadding }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {days.map((day) => {
            const studied = studyDays.includes(day.getDate()) && isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-lg text-xs transition-colors",
                  studied && "bg-primary/20 font-semibold text-primary",
                  isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                  !studied && "text-muted-foreground hover:bg-muted"
                )}
              >
                {format(day, "d")}
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Highlighted days had study sessions this month.
        </p>
      </CardContent>
    </Card>
  );
}
