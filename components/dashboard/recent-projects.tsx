"use client";

import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { ProjectItem } from "@/types/dashboard";
import { formatDuration, formatRelativeTime } from "@/lib/utils";

interface RecentProjectsProps {
  projects: ProjectItem[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Recent Projects</CardTitle>
        <Link href="/dashboard/subjects" className="text-xs text-primary hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/dashboard/subjects/${project.id}`}
              className="group flex items-center gap-4 rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-muted/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{project.name}</p>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Progress value={project.progress} className="h-1.5 flex-1" />
                  <span className="text-xs font-medium text-muted-foreground">{project.progress}%</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{project.subject}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(project.totalMinutes)} · {formatRelativeTime(project.lastStudied)}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
