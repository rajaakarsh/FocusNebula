"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDataPoint, HeatmapCell, SubjectBreakdown } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  contentStyle: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    fontSize: "12px",
    boxShadow: "var(--shadow-md)",
  },
  labelStyle: { color: "var(--muted-foreground)" },
};

interface AreaChartWidgetProps {
  data: ChartDataPoint[];
  dataKey?: keyof ChartDataPoint;
  height?: number;
  className?: string;
}

export function AreaChartWidget({
  data,
  dataKey = "minutes",
  height = 280,
  className,
}: AreaChartWidgetProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <Tooltip {...tooltipStyle} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="var(--chart-1)"
            strokeWidth={2}
            fill="url(#areaGradient)"
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChartWidget({
  data,
  dataKey = "xp",
  height = 200,
  className,
}: AreaChartWidgetProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} hide />
          <Tooltip {...tooltipStyle} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="var(--chart-2)"
            strokeWidth={2}
            dot={false}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarChartWidget({
  data,
  dataKey = "minutes",
  height = 280,
  className,
}: AreaChartWidgetProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
          <Tooltip {...tooltipStyle} />
          <Bar dataKey={dataKey} fill="var(--chart-1)" radius={[6, 6, 0, 0]} animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface DonutChartProps {
  data: SubjectBreakdown[];
  height?: number;
  className?: string;
}

export function DonutChartWidget({ data, height = 240, className }: DonutChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="minutes"
            nameKey="name"
            animationDuration={800}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface HeatmapProps {
  data: HeatmapCell[];
  className?: string;
}

export function StudyHeatmap({ data, className }: HeatmapProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="inline-grid min-w-full gap-1" style={{ gridTemplateColumns: "auto repeat(24, 1fr)" }}>
        <div />
        {Array.from({ length: 24 }, (_, h) => (
          <div key={h} className="text-center text-[10px] text-muted-foreground">
            {h % 6 === 0 ? h : ""}
          </div>
        ))}
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="contents">
            <div className="flex items-center pr-2 text-xs text-muted-foreground">
              {day}
            </div>
            {Array.from({ length: 24 }, (_, hour) => {
              const cell = data.find((d) => d.day === dayIndex && d.hour === hour);
              const intensity = (cell?.value ?? 0) / maxValue;
              return (
                <div
                  key={`${dayIndex}-${hour}`}
                  className="aspect-square min-w-[12px] rounded-sm transition-colors"
                  style={{
                    background: intensity > 0
                      ? `color-mix(in srgb, var(--chart-1) ${Math.round(intensity * 100)}%, transparent)`
                      : "var(--muted)",
                  }}
                  title={`${day} ${hour}:00 — ${cell?.value ?? 0}m`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const chartData = data.map((value, i) => ({ i, value }));
  return (
    <div className={cn("h-8 w-20", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
