"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Lock, Info, X, ChevronRight, Rocket, Compass, Radio } from "lucide-react";
import { CELESTIAL_BODIES } from "@/lib/constants";
import { CelestialBody } from "@/types";
import { PlanetIcon } from "@/components/ui/planet-icon";

interface SolarSystemViewProps {
  completedSeconds: number; // Seconds focused in current session or total lifetime
  onSelectPlanet?: (body: CelestialBody) => void;
}

export const SolarSystemView: React.FC<SolarSystemViewProps> = ({
  completedSeconds,
}) => {
  const [inspectedPlanet, setInspectedPlanet] = useState<CelestialBody | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Convert completedSeconds to total hours (e.g., 25 min session = 0.416 hours; fallback simulated baseline 6.5 hours for demo)
  const totalHoursLogged = Math.max(6.5, completedSeconds / 3600);

  // Determine current planet index based on hours required
  let currentIndex = 0;
  for (let i = 0; i < CELESTIAL_BODIES.length; i++) {
    if (totalHoursLogged >= CELESTIAL_BODIES[i].hoursRequired) {
      currentIndex = i;
    }
  }

  const currentPlanet = CELESTIAL_BODIES[currentIndex];
  const nextPlanet = CELESTIAL_BODIES[Math.min(currentIndex + 1, CELESTIAL_BODIES.length - 1)];

  // Progress percentage between current and next planet
  const currentReq = currentPlanet.hoursRequired;
  const nextReq = nextPlanet.hoursRequired;
  const progressRatio =
    nextReq > currentReq
      ? Math.min(1, Math.max(0, (totalHoursLogged - currentReq) / (nextReq - currentReq)))
      : 1;

  // Spacecraft x position calculation:
  // Each planet card is spaced ~180px apart along the 11-stop timeline
  const planetWidth = 180;
  const spacecraftX = currentIndex * planetWidth + progressRatio * planetWidth + 50;

  // Scroll to active position on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollPos = spacecraftX - scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, scrollPos),
        behavior: "smooth",
      });
    }
  }, [spacecraftX]);

  return (
    <div className="relative w-full py-10">
      {/* Scrollable Solar Trajectory Container */}
      <div
        ref={scrollContainerRef}
        className="relative overflow-x-auto no-scrollbar py-16 px-12"
      >
        <div className="relative min-w-[2100px] flex items-center justify-between">
          {/* Main Orbital Rail / Flight Path Line */}
          <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-[#F4A940]/40 via-[#3CCBFF]/40 to-white/10 -translate-y-1/2 z-0" />

          {/* Active Flight Rail Segment */}
          <div
            className="absolute top-1/2 left-10 h-[2px] bg-gradient-to-r from-[#F4A940] to-[#3CCBFF] -translate-y-1/2 z-0 shadow-[0_0_12px_rgba(60,203,255,0.8)] transition-all duration-700"
            style={{ width: `${spacecraftX}px` }}
          />

          {/* SPACECRAFT MODEL & "YOU ARE HERE" HUD */}
          <div
            className="absolute top-1/2 z-30 transition-all duration-700 -translate-y-1/2 pointer-events-none"
            style={{ left: `${spacecraftX}px` }}
          >
            {/* Floating Spacecraft */}
            <motion.div
              animate={{
                y: [-4, 4, -4],
                rotate: [0, 1.5, -1.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center"
            >
              {/* Engine Particle Flame Trail */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center gap-1 pr-1">
                <span className="w-6 h-1 rounded-full bg-gradient-to-l from-[#3CCBFF] to-transparent animate-pulse" />
                <span className="w-3 h-0.5 rounded-full bg-gradient-to-l from-[#F4A940] to-transparent animate-ping" />
              </div>

              {/* Spacecraft Body Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#030712]/90 border border-[#3CCBFF] flex items-center justify-center text-[#3CCBFF] shadow-[0_0_24px_rgba(60,203,255,0.6)] backdrop-blur-md">
                <Rocket className="w-6 h-6 transform rotate-45 text-[#3CCBFF]" />
              </div>

              {/* "YOU ARE HERE" Leader Line Callout */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 flex flex-col items-center pointer-events-auto">
                <div className="px-3 py-1 rounded-full bg-[#060913]/90 border border-[#3CCBFF]/60 shadow-[0_0_16px_rgba(60,203,255,0.4)] backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#3CCBFF] animate-ping" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#3CCBFF] font-semibold">
                    YOU ARE HERE
                  </span>
                </div>
                {/* Glowing Leader Line */}
                <div className="w-[1px] h-4 bg-gradient-to-b from-[#3CCBFF] to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* PLANETS TIMELINE STOPS */}
          {CELESTIAL_BODIES.map((body, index) => {
            const isCompleted = totalHoursLogged >= body.hoursRequired && index < currentIndex;
            const isCurrent = index === currentIndex;
            const isNext = index === currentIndex + 1;
            const isLocked = totalHoursLogged < body.hoursRequired && !isCurrent;

            return (
              <button
                key={body.id}
                onClick={() => setInspectedPlanet(body)}
                className="relative z-10 flex flex-col items-center gap-4 group focus:outline-none"
              >
                {/* Planet Container */}
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? "scale-125 ring-2 ring-[#F4A940] ring-offset-4 ring-offset-[#020305] shadow-[0_0_36px_rgba(244,169,64,0.6)]"
                      : isCompleted
                      ? "ring-1 ring-[#3CCBFF]/60 shadow-[0_0_20px_rgba(60,203,255,0.3)]"
                      : "opacity-40 group-hover:opacity-100"
                  }`}
                >
                  {/* Pulsing Beacon Ring for Current Destination */}
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full border border-[#F4A940] animate-ping opacity-60 pointer-events-none" />
                  )}

                  {/* Planet Icon SVG */}
                  <PlanetIcon
                    id={body.id}
                    className={`w-12 h-12 transition-all duration-300 drop-shadow-xl ${
                      isLocked ? "grayscale-[50%]" : ""
                    }`}
                  />

                  {/* Status Badge Overlays */}
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0083EE] text-white flex items-center justify-center text-[10px] shadow-md border border-white/20">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F4A940] text-black flex items-center justify-center text-[10px] font-bold shadow-md animate-pulse">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>

                {/* Labels */}
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors ${
                      isCurrent
                        ? "text-[#F4A940] font-bold"
                        : isCompleted
                        ? "text-[#3CCBFF] font-medium"
                        : "text-white/40 group-hover:text-white"
                    }`}
                  >
                    {body.name}
                  </span>
                  <span className="font-mono text-[10px] text-white/40">
                    {body.hoursRequired} hrs
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PLANET INSPECTION MODAL */}
      <AnimatePresence>
        {inspectedPlanet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-[#060913]/95 border border-white/10 shadow-[0_0_50px_rgba(60,203,255,0.2)] text-white space-y-6 overflow-hidden"
            >
              {/* Subtle background glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: inspectedPlanet.color }}
              />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <PlanetIcon id={inspectedPlanet.id} className="w-10 h-10" />
                  <div>
                    <h3 className="font-sans text-2xl font-light text-white">
                      {inspectedPlanet.name}
                    </h3>
                    <div className="font-mono text-xs text-[#3CCBFF] uppercase tracking-widest">
                      SOLAR CHECKPOINT
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setInspectedPlanet(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Planet Details */}
              <div className="space-y-4 text-sm text-white/80">
                <p className="leading-relaxed">{inspectedPlanet.description}</p>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block mb-1 uppercase tracking-wider">
                      Required Focus
                    </span>
                    <span className="text-lg text-white font-semibold">
                      {inspectedPlanet.hoursRequired} Hours
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-1 uppercase tracking-wider">
                      XP Reward
                    </span>
                    <span className="text-lg text-[#F4A940] font-semibold">
                      +{inspectedPlanet.xpBonus} XP
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-1 uppercase tracking-wider">
                      Atmosphere
                    </span>
                    <span className="text-white font-medium">
                      {inspectedPlanet.atmosphere || "Vacuum"}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-1 uppercase tracking-wider">
                      Distance from Sun
                    </span>
                    <span className="text-white font-medium">
                      {inspectedPlanet.distanceFromSun || "Orbital"}
                    </span>
                  </div>
                </div>

                {inspectedPlanet.funFact && (
                  <div className="p-4 rounded-2xl bg-[#3CCBFF]/10 border border-[#3CCBFF]/20 text-xs text-[#3CCBFF] leading-relaxed flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{inspectedPlanet.funFact}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setInspectedPlanet(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#3CCBFF] text-black font-semibold text-sm hover:bg-[#6BD3F3] transition-colors shadow-lg"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
