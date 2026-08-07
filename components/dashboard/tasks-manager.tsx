"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle2, Circle, Clock, LayoutGrid } from "lucide-react";
import { TasksWidget } from "@/components/dashboard/tasks-widget";

const MOCK_TASKS = [
  { id: "1", title: "Review Chapter 4 Physics", subject: "Physics", completed: false, tag: "Study", priority: "high" as const, timeEstimate: "45m" },
  { id: "2", title: "Complete Algorithm Assignment", subject: "Computer Science", completed: true, tag: "Homework", priority: "medium" as const, timeEstimate: "1h 30m" },
  { id: "3", title: "Read Literature Paper", subject: "Literature", completed: false, tag: "Reading", priority: "low" as const, timeEstimate: "30m" },
  { id: "4", title: "Prepare for Math Quiz", subject: "Mathematics", completed: false, tag: "Exam Prep", priority: "high" as const, timeEstimate: "2h" },
];

export function TasksManager() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mission Blueprints (Tasks)</h2>
          <p className="text-muted-foreground">
            Plan your study sessions and track your objective completion.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <LayoutGrid className="h-4 w-4" /> Board View
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Blueprint
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Blueprints</CardTitle>
                <CardDescription>Tasks scheduled for this week</CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>2/8 Completed</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Add a new task..." className="flex-1" />
                  <Button>Add</Button>
                </div>
                
                <div className="divide-y divide-border">
                  {MOCK_TASKS.map((task) => (
                    <div key={task.id} className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4 ${task.completed ? 'opacity-60' : ''}`}>
                      <div className="flex items-start sm:items-center gap-3">
                        <button className="mt-0.5 sm:mt-0 text-muted-foreground hover:text-primary transition-colors">
                          {task.completed ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5" />}
                        </button>
                        <div>
                          <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px]">{task.tag}</Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" /> {task.timeEstimate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Time Est.</span>
                <span className="font-medium">4h 45m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High Priority</span>
                <span className="font-medium text-destructive">2 Tasks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium text-primary">25%</span>
              </div>
            </CardContent>
          </Card>
          
          <TasksWidget tasks={MOCK_TASKS} />
        </div>
      </div>
    </div>
  );
}
