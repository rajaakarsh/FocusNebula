"use client";

import { motion } from "framer-motion";
import { Check, Circle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TaskItem } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const priorityStyles = {
  low: "text-muted-foreground",
  medium: "text-warning",
  high: "text-destructive",
};

interface TasksWidgetProps {
  tasks: TaskItem[];
}

export function TasksWidget({ tasks }: TasksWidgetProps) {
  const openCount = tasks.filter((t) => !t.completed).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-base">Tasks</CardTitle>
          <p className="text-sm text-muted-foreground">{openCount} open</p>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="Add task">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className={cn(
              "flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/50",
              task.completed && "opacity-60"
            )}
          >
            <button
              type="button"
              className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-primary"
              aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
            >
              {task.completed ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm font-medium", task.completed && "line-through")}>
                {task.title}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {task.subject}
                </Badge>
                <span className={cn("text-xs capitalize", priorityStyles[task.priority])}>
                  {task.priority}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
