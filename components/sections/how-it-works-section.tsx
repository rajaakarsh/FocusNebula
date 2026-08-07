"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Sliders, PlayCircle, ShieldOff, BellOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      eyebrow: "Onboard",
      title: "Set your identity",
      description:
        "Select your study track, specify target examinations or projects, and lock in the subjects you need to conquer.",
      icon: UserCheck,
    },
    {
      num: "02",
      eyebrow: "Faction",
      title: "Pick a focus mode",
      description:
        "Spacewalkers for continuous deep-work sessions. Pilots for rigid Pomodoro sprints. Your surface shapes your workflow.",
      icon: Sliders,
    },
    {
      num: "03",
      eyebrow: "Focus",
      title: "Start the session",
      description:
        "Timer runs, distractions vanish, telemetry is logged. Earn rank XP for sustained focus, not superficial clicks.",
      icon: PlayCircle,
    },
  ];

  const principles = [
    {
      title: "No Dashboards by Default",
      description:
        "The screen center is strictly reserved for the task at hand. Detailed statistics live in slide-out drawers you open only when desired.",
      icon: ShieldOff,
    },
    {
      title: "Zero Intrusive Notifications",
      description:
        "Nothing pings, pops up, or demands attention. The only element in motion is the subtle timer and orbital progress track.",
      icon: BellOff,
    },
  ];

  return (
    <section className="py-28 px-4 max-w-6xl mx-auto space-y-20">
      {/* Stepper Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <Badge variant="outline" className="px-4 py-1">
          Simple Workflow
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Three steps. Zero noise.
        </h2>
      </div>

      {/* 3-Step Stepper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card variant="glass" className="h-full p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-accent bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {step.num}
                  </span>
                  <Icon className="w-5 h-5 text-secondary" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-textMuted">
                    {step.eyebrow}
                  </span>
                  <h3 className="font-sans text-xl font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-textMuted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Design Principles Block */}
      <div className="pt-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Design Philosophy
          </span>
          <h3 className="font-sans text-2xl sm:text-3xl font-light text-white">
            Minimal by default. Technical by intent.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <Card key={i} variant="solid" className="p-6 flex gap-4 items-start">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-sans text-lg font-medium text-white">
                    {p.title}
                  </h4>
                  <p className="text-sm text-textMuted leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
