"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Award, Orbit, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";

export const InteractiveTimerDemo: React.FC = () => {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [orbitsCompleted, setOrbitsCompleted] = useState<number>(3);
  const [xpEarned, setXpEarned] = useState<number>(45);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  const initialTime = mode === "focus" ? 25 * 60 : 5 * 60;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (mode === "focus") {
        setOrbitsCompleted((prev) => prev + 1);
        setXpEarned((prev) => prev + 15);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const handleSwitchMode = (newMode: "focus" | "break") => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
  };

  const progressPercentage = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <section id="timer-demo" className="py-28 px-4 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="purple" pulse className="px-4 py-1">
          Interactive Live Surface
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Experience the Quiet HUD
        </h2>
        <p className="text-base text-textMuted">
          Test the noise-free focus surface. No popups, no distracting notifications.
        </p>
      </div>

      <Card variant="glow" className="p-8 sm:p-12 relative overflow-hidden">
        {/* Soft Background Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Timer Surface */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center text-center space-y-8">
            {/* Mode Switcher Pills */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <button
                onClick={() => handleSwitchMode("focus")}
                className={`px-5 py-2 rounded-full font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                  mode === "focus"
                    ? "bg-primary text-white shadow-[0_0_16px_rgba(124,92,255,0.4)]"
                    : "text-textMuted hover:text-white"
                }`}
              >
                Deep Focus (25m)
              </button>
              <button
                onClick={() => handleSwitchMode("break")}
                className={`px-5 py-2 rounded-full font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                  mode === "break"
                    ? "bg-secondary text-black shadow-[0_0_16px_rgba(76,201,240,0.4)]"
                    : "text-textMuted hover:text-white"
                }`}
              >
                Rest Orbit (5m)
              </button>
            </div>

            {/* Circular Clock Track */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  className="stroke-white/10"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="110"
                  className="stroke-primary transition-all duration-1000"
                  strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 110}
                  strokeDashoffset={
                    2 * Math.PI * 110 * (1 - progressPercentage / 100)
                  }
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center space-y-1">
                <div className="font-mono text-5xl font-light text-white tracking-widest">
                  {formatTime(timeLeft)}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {isRunning ? "ORBITING DEEP WORK" : "STANDBY SURFACE"}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant={isRunning ? "ghost" : "primary"}
                size="lg"
                onClick={handleToggleTimer}
                className="w-36 py-3"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" /> Start
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={handleReset}
                className="px-4"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className="px-4 text-textMuted hover:text-accent"
                title={isAudioMuted ? "Unmute cosmic audio" : "Mute audio"}
              >
                {isAudioMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4 text-accent animate-pulse" />
                )}
              </Button>
            </div>
          </div>

          {/* Right Column: Telemetry */}
          <div className="lg:col-span-5 space-y-6 bg-white/[0.02] p-6 rounded-3xl border border-white/10">
            <h3 className="font-sans text-xl font-medium text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-secondary" />
              Telemetry
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5">
                <span className="text-textMuted flex items-center gap-2">
                  <Orbit className="w-4 h-4 text-primary" /> Orbits Completed
                </span>
                <span className="text-white text-sm font-semibold">{orbitsCompleted}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5">
                <span className="text-textMuted flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" /> Rank XP Accrued
                </span>
                <span className="text-accent text-sm font-semibold">+{xpEarned} XP</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 space-y-2">
                <div className="flex justify-between text-textMuted">
                  <span>PROGRESS TRACK</span>
                  <span className="text-secondary">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 text-xs text-textMuted leading-relaxed">
              💡 <b>Quiet telemetry:</b> Every 5 minutes of focused study advances your satellite trajectory without interrupting your concentration flow.
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
