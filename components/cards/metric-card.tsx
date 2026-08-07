"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Clock, Target, Timer, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { MetricStat } from "@/types/dashboard";
import { cn, calculateTrend, formatDuration, formatNumber } from "@/lib/utils";

const iconMap = {
  clock: Clock,
  zap: Zap,
  target: Target,
  timer: Timer,
};

function AnimatedNumber({ value, format }: { value: number; format: MetricStat["format"] }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v) => {
    const rounded = Math.round(v);
    switch (format) {
      case "duration":
        return formatDuration(rounded);
      case "percent":
        return `${rounded}%`;
      case "currency":
        return `$${rounded}`;
      default:
        return formatNumber(rounded);
    }
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

interface MetricCardProps {
  stat: MetricStat;
  index?: number;
}

export function MetricCard({ stat, index = 0 }: MetricCardProps) {
  const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? Clock;
  const trend = calculateTrend(stat.value, stat.previousValue);
  const isPositive = stat.trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="group relative overflow-hidden border-border/60 bg-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-semibold tracking-tight">
                <AnimatedNumber value={stat.value} format={stat.format} />
              </p>
              <div className="flex items-center gap-1.5">
                {isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    isPositive ? "text-success" : "text-destructive"
                  )}
                >
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
