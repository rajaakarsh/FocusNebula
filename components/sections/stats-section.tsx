"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card as GlassCard } from "@/components/ui/card";
import { Users, Clock, Flame } from "lucide-react";

export const StatsSection: React.FC = () => {
  const [sessionsCount, setSessionsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setSessionsCount(Math.floor(progress * 14820));
      setUsersCount(Math.floor(progress * 3450));
      setActiveCount(Math.floor(progress * 412));

      if (step >= steps) {
        clearInterval(timer);
        setSessionsCount(14820);
        setUsersCount(3450);
        setActiveCount(412);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: "sessions",
      label: "Sessions Completed",
      value: sessionsCount.toLocaleString(),
      suffix: "+",
      description: "Focus sessions logged this month",
      icon: Clock,
      color: "text-secondary",
    },
    {
      id: "users",
      label: "Total Learners",
      value: usersCount.toLocaleString(),
      suffix: "+",
      description: "Learners building focus habits with us",
      icon: Users,
      color: "text-accent",
    },
    {
      id: "active",
      label: "Active Learners",
      value: activeCount.toLocaleString(),
      suffix: " live",
      description: "Studying right now across both factions",
      icon: Flame,
      color: "text-emerald-400",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard variant="glass" className="h-full p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-medium tracking-widest text-textMuted uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_#7C5CFF]" />
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>

                <div className="font-mono text-4xl sm:text-5xl font-light text-white tracking-tight flex items-baseline gap-1">
                  <span>{stat.value}</span>
                  <span className="text-xs font-sans font-normal text-textMuted">
                    {stat.suffix}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-textMuted leading-relaxed">
                  {stat.description}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
