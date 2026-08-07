"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Trophy,
  Flame,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeftMissionPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const LeftMissionPanel: React.FC<LeftMissionPanelProps> = ({
  isOpen,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState<"missions" | "streak" | "crew">(
    "missions"
  );

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-24 left-4 z-40 p-2.5 rounded-2xl bg-[#060913]/90 border border-white/10 text-white/80 hover:text-white shadow-lg backdrop-blur-md transition-all hover:border-[#3CCBFF]/50"
        title="Toggle Mission Log (Shortcut: M)"
      >
        {isOpen ? <ChevronLeft className="w-5 h-5" /> : <Compass className="w-5 h-5 text-[#3CCBFF]" />}
      </button>

      {/* Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-20 left-0 bottom-0 z-30 w-80 sm:w-96 bg-[#030712]/95 border-r border-white/10 backdrop-blur-xl p-6 flex flex-col space-y-6 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pt-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-sans text-xl font-light text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#3CCBFF]" />
                  Mission Control
                </h3>
                <p className="font-mono text-xs text-white/50">
                  DEEP FOCUS TELEMETRY
                </p>
              </div>
              <Badge variant="cyan">ACT-01</Badge>
            </div>

            {/* Tab Navigation */}
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs">
              <button
                onClick={() => setActiveTab("missions")}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  activeTab === "missions"
                    ? "bg-[#3CCBFF] text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Missions
              </button>
              <button
                onClick={() => setActiveTab("streak")}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  activeTab === "streak"
                    ? "bg-[#3CCBFF] text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Streak
              </button>
              <button
                onClick={() => setActiveTab("crew")}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  activeTab === "crew"
                    ? "bg-[#3CCBFF] text-black font-semibold"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Crew
              </button>
            </div>

            {/* Tab 1: Missions & Logs */}
            {activeTab === "missions" && (
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-[#3CCBFF]">
                  Today&apos;s Focus Log
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        Computer Science Deep Work
                      </span>
                      <span className="font-mono text-[#F4A940]">50 min</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-white/40 font-mono">
                      <span>Orbit Checkpoint: Venus</span>
                      <span className="text-[#3CCBFF]">+120 XP</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">
                        Algorithmic System Design
                      </span>
                      <span className="font-mono text-[#F4A940]">25 min</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-white/40 font-mono">
                      <span>Orbit Checkpoint: Mercury</span>
                      <span className="text-[#3CCBFF]">+60 XP</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#F4A940]">
                    Active Achievements
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                    <Trophy className="w-6 h-6 text-[#F4A940]" />
                    <div>
                      <div className="text-xs font-medium text-white">
                        Orbital Pioneer
                      </div>
                      <div className="text-[11px] text-white/50">
                        Complete 5 hours in single orbit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Daily Streak */}
            {activeTab === "streak" && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F4A940]/20 to-transparent border border-[#F4A940]/30 space-y-3 text-center">
                  <Flame className="w-10 h-10 text-[#F4A940] mx-auto animate-bounce" />
                  <div className="font-mono text-3xl font-light text-white">
                    7 Day Streak
                  </div>
                  <p className="text-xs text-white/60">
                    You have maintained deep focus without breaking orbital momentum.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="font-mono text-xs text-white/40 uppercase tracking-widest">
                    Weekly Progress
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-xl flex items-center justify-center font-mono text-xs ${
                          i < 5
                            ? "bg-[#3CCBFF] text-black font-bold"
                            : "bg-white/5 text-white/40"
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Crew Members */}
            {activeTab === "crew" && (
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-[#3CCBFF]">
                  Active Telemetry Crew
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Astronaut Sarah", status: "Focusing (Jupiter Orbit)", color: "#3CCBFF" },
                    { name: "Cosmonaut Leo", status: "Focusing (Mars Sprint)", color: "#F4A940" },
                    { name: "Explorer Elena", status: "Idle Capsule", color: "#94A3B8" },
                  ].map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold text-black"
                        style={{ backgroundColor: member.color }}
                      >
                        {member.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">
                          {member.name}
                        </div>
                        <div className="text-[11px] text-white/50">
                          {member.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
