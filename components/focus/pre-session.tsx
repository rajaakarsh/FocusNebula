"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Orbit, Sliders, Volume2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PreSessionProps {
  onStartSession: (config: {
    duration: number;
    subject: string;
    faction: string;
    soundscape: string;
  }) => void;
  onBack: () => void;
}

export const PreSession: React.FC<PreSessionProps> = ({
  onStartSession,
  onBack,
}) => {
  const [duration, setDuration] = useState<number>(25 * 60);
  const [subject, setSubject] = useState<string>("Computer Science");
  const [faction, setFaction] = useState<string>("spacewalkers");
  const [soundscape, setSoundscape] = useState<string>("cosmic-drone");

  const durations = [
    { label: "15m", seconds: 15 * 60 },
    { label: "25m", seconds: 25 * 60 },
    { label: "45m", seconds: 45 * 60 },
    { label: "90m", seconds: 90 * 60 },
  ];

  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Medicine",
    "Architecture",
    "Custom Work",
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-4xl mx-auto flex flex-col justify-center space-y-8 relative z-10">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono text-textMuted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Overview</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="purple" pulse className="px-4 py-1">
          Session Configuration
        </Badge>
        <h1 className="font-sans text-4xl sm:text-6xl font-light text-white tracking-tight">
          Initialize Focus Surface
        </h1>
        <p className="text-sm sm:text-base text-textMuted max-w-lg mx-auto">
          Configure your target duration, focus track, and atmosphere before stepping into the orbit.
        </p>
      </div>

      {/* Main Glass Configuration Card */}
      <Card variant="glow" className="p-8 sm:p-12 space-y-8">
        {/* 1. Target Duration Selector */}
        <div className="space-y-3">
          <label className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
            <Orbit className="w-4 h-4 text-primary" /> Target Focus Duration
          </label>
          <div className="grid grid-cols-4 gap-3">
            {durations.map((d) => (
              <button
                key={d.seconds}
                onClick={() => setDuration(d.seconds)}
                className={`py-3 rounded-2xl font-mono text-sm font-medium transition-all ${
                  duration === d.seconds
                    ? "bg-primary text-white border border-primary/50 shadow-[0_0_20px_rgba(124,92,255,0.4)]"
                    : "bg-white/5 text-textMuted border border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Subject Track Selector */}
        <div className="space-y-3">
          <label className="font-mono text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
            <Sliders className="w-4 h-4 text-secondary" /> Study / Work Track
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSubject(sub)}
                className={`py-2.5 px-4 rounded-xl text-xs font-medium transition-all text-left truncate ${
                  subject === sub
                    ? "bg-secondary/15 text-white border border-secondary/40 shadow-[0_0_16px_rgba(76,201,240,0.25)]"
                    : "bg-white/5 text-textMuted border border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Surface Faction */}
        <div className="space-y-3">
          <label className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" /> Focus Surface Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setFaction("spacewalkers")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                faction === "spacewalkers"
                  ? "bg-primary/10 border-primary text-white shadow-[0_0_20px_rgba(124,92,255,0.25)]"
                  : "bg-white/5 border-white/10 text-textMuted hover:border-white/20"
              }`}
            >
              <div className="font-sans text-base font-medium text-white mb-1">
                Spacewalkers Surface
              </div>
              <div className="text-xs text-textMuted leading-relaxed">
                Immersive deep-space telemetry with orbital checkpoint progress tracking.
              </div>
            </button>

            <button
              onClick={() => setFaction("pilots")}
              className={`p-4 rounded-2xl border text-left transition-all opacity-60 cursor-not-allowed ${
                faction === "pilots"
                  ? "bg-secondary/10 border-secondary text-white"
                  : "bg-white/5 border-white/10 text-textMuted"
              }`}
            >
              <div className="font-sans text-base font-medium text-white mb-1 flex items-center justify-between">
                <span>Pilots Surface</span>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/10">
                  v1.2 Soon
                </span>
              </div>
              <div className="text-xs text-textMuted leading-relaxed">
                Blueprint radar Pomodoro surface with rigid time blocks.
              </div>
            </button>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4">
          <Button
            variant="primary"
            size="lg"
            className="w-full py-4 text-base font-medium"
            onClick={() =>
              onStartSession({ duration, subject, faction, soundscape })
            }
          >
            <Play className="w-5 h-5 mr-2" />
            <span>Engage Focus Session</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
