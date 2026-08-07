"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Orbit, CheckCircle2, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompleteSessionProps {
  stats: {
    orbits: number;
    xp: number;
  };
  onRestart: () => void;
  onHome: () => void;
}

export const CompleteSession: React.FC<CompleteSessionProps> = ({
  stats,
  onRestart,
  onHome,
}) => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-3xl mx-auto flex flex-col justify-center space-y-8 relative z-10 text-center">
      {/* Trophy Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 mx-auto rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(124,92,255,0.4)]"
      >
        <CheckCircle2 className="w-10 h-10 text-accent" />
      </motion.div>

      {/* Header */}
      <div className="space-y-3">
        <Badge variant="purple" pulse className="px-4 py-1">
          Session Accomplished
        </Badge>
        <h1 className="font-sans text-4xl sm:text-6xl font-light text-white tracking-tight">
          Orbit Checkpoint Reached
        </h1>
        <p className="text-sm sm:text-base text-textMuted max-w-lg mx-auto">
          Your deep work telemetry has been encrypted and logged to your rank progression.
        </p>
      </div>

      {/* Stats Summary Cards */}
      <Card variant="glow" className="p-8 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center space-y-2">
            <Orbit className="w-6 h-6 text-primary" />
            <div className="font-mono text-xs uppercase tracking-widest text-textMuted">
              ORBITS COMPLETED
            </div>
            <div className="font-mono text-4xl font-light text-white">
              {stats.orbits}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center space-y-2">
            <Award className="w-6 h-6 text-accent" />
            <div className="font-mono text-xs uppercase tracking-widest text-textMuted">
              RANK XP GAINED
            </div>
            <div className="font-mono text-4xl font-light text-accent">
              +{stats.xp} XP
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-textMuted font-mono">
          🎉 Streak bonus multiplier active for your next focus session!
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button variant="primary" size="lg" onClick={onRestart} className="px-8">
            <RotateCcw className="w-4 h-4 mr-2" />
            <span>Start Another Session</span>
          </Button>

          <Button variant="ghost" size="lg" onClick={onHome} className="px-8">
            <Home className="w-4 h-4 mr-2" />
            <span>Return Home</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
