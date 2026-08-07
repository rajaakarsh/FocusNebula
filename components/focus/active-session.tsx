"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Users,
  LogOut,
  Orbit,
  Zap,
  Award,
  Compass,
  Radio,
  Sliders,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import { SolarSystemView } from "./solar-system-view";
import { LeftMissionPanel } from "./left-mission-panel";
import { RightWidgetsPanel } from "./right-widgets-panel";

interface ActiveSessionProps {
  config: {
    duration: number;
    subject: string;
    faction: string;
    soundscape: string;
  };
  onOpenManifest: () => void;
  onOpenExitModal: () => void;
  onSessionComplete: (stats: { orbits: number; xp: number }) => void;
  onThemeChange?: (theme: "deep-space" | "solar-gold" | "hyperdrive-cyan") => void;
}

export const ActiveSession: React.FC<ActiveSessionProps> = ({
  config,
  onOpenManifest,
  onOpenExitModal,
  onSessionComplete,
  onThemeChange,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(config.duration);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [orbits, setOrbits] = useState<number>(1);
  const [xp, setXp] = useState<number>(20);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState<boolean>(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<
    "deep-space" | "solar-gold" | "hyperdrive-cyan"
  >("deep-space");

  const initialDuration = config.duration;
  const elapsedSeconds = initialDuration - timeLeft;
  const progressPercentage = (elapsedSeconds / initialDuration) * 100;

  // Timer countdown hook
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1;
          const elapsed = initialDuration - next;
          setOrbits(Math.max(1, Math.floor(elapsed / 300) + 1));
          setXp(Math.floor(elapsed / 300) * 15 + 20);
          return next;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      onSessionComplete({ orbits, xp });
    }
    return () => clearInterval(timer);
  }, [isPaused, timeLeft, initialDuration, orbits, xp, onSessionComplete]);

  // Global Keyboard Shortcuts (Space, R, Esc, M, W)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setTimeLeft(initialDuration);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onOpenExitModal();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setIsLeftPanelOpen((prev) => !prev);
      } else if (e.key === "w" || e.key === "W") {
        e.preventDefault();
        setIsRightPanelOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [initialDuration, onOpenExitModal]);

  const handleReset = () => {
    setTimeLeft(initialDuration);
  };

  const handleSkip = () => {
    onSessionComplete({ orbits, xp });
  };

  const handleThemeSwitch = (theme: "deep-space" | "solar-gold" | "hyperdrive-cyan") => {
    setSelectedTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto flex flex-col justify-between z-10 space-y-8">
      {/* Top Mission HUD Navigation */}
      <div className="w-full flex items-center justify-between p-4 rounded-3xl bg-[#060913]/90 border border-white/10 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#3CCBFF] animate-pulse shadow-[0_0_12px_#3CCBFF]" />
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              MISSION TELEMETRY
            </div>
            <div className="font-sans text-sm font-medium text-white flex items-center gap-2">
              <span>{config.subject}</span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-xs text-[#3CCBFF]">{config.faction.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Telemetry Stats */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <Orbit className="w-3.5 h-3.5 text-[#3CCBFF]" />
            <span className="text-white/50">ORBIT:</span>
            <span className="text-white font-bold">{orbits}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <Award className="w-3.5 h-3.5 text-[#F4A940]" />
            <span className="text-white/50">XP:</span>
            <span className="text-[#F4A940] font-bold">+{xp} XP</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenManifest}
            className="text-xs font-mono py-1.5 px-3 border border-white/10 rounded-xl hover:bg-white/10"
          >
            <Users className="w-3.5 h-3.5 mr-1.5 text-[#3CCBFF]" />
            <span className="hidden sm:inline">Crew Manifest</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenExitModal}
            className="text-xs font-mono text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 rounded-xl"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            <span>Abort</span>
          </Button>
        </div>
      </div>

      {/* SOLAR SYSTEM TRAJECTORY TRACK & SPACECRAFT */}
      <div className="w-full">
        <SolarSystemView completedSeconds={elapsedSeconds + 23400} />
      </div>

      {/* CENTERED FLOATING GLASS TIMER PANEL (28px rounded) */}
      <div className="mx-auto my-auto flex flex-col items-center justify-center space-y-6 z-20">
        {/* Floating Controls Row */}
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-[#060913]/90 border border-white/10 shadow-[0_0_30px_rgba(60,203,255,0.15)] backdrop-blur-xl">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isPaused
                ? "bg-[#3CCBFF] text-black shadow-[0_0_20px_rgba(60,203,255,0.5)]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title="Toggle Play/Pause (Space)"
          >
            {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
          </button>

          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            title="Reset Timer (R)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleSkip}
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            title="Complete Session"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Glass Timer Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg p-8 sm:p-10 rounded-[28px] bg-[#060913]/85 border border-white/10 shadow-[0_0_50px_rgba(2,3,5,0.8)] backdrop-blur-2xl text-center space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#3CCBFF]">
              DEEP FOCUS
            </span>
            <span className="font-mono text-xs text-white/40">
              ORBITAL TIMER
            </span>
          </div>

          {/* Digital Clock Display */}
          <div className="py-2">
            <div className="font-mono text-6xl sm:text-7xl font-light text-white tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              {formatTime(timeLeft)}
            </div>
            <div className="font-mono text-xs text-[#F4A940] mt-2 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4A940]" />
              <span>ORBIT {orbits.toString().padStart(2, "0")} IN PROGRESS</span>
            </div>
          </div>

          {/* Mission Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs text-white/50">
              <span>Session Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#3CCBFF] to-[#F4A940] transition-all duration-1000 shadow-[0_0_12px_#3CCBFF]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Collapsible Left & Right Panels */}
      <LeftMissionPanel
        isOpen={isLeftPanelOpen}
        onToggle={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
      />

      <RightWidgetsPanel
        isOpen={isRightPanelOpen}
        onToggle={() => setIsRightPanelOpen(!isRightPanelOpen)}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeSwitch}
      />

      {/* Keyboard Shortcut Hints Footer */}
      <div className="w-full text-center font-mono text-[11px] text-white/40 flex items-center justify-center gap-4 py-2">
        <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">Space</kbd> Pause/Resume</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">R</kbd> Reset</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">Esc</kbd> Abort</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">M</kbd> Missions</span>
        <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">W</kbd> Widgets</span>
      </div>
    </div>
  );
};
