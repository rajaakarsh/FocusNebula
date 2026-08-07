"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Orbit, Rocket, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CELESTIAL_BODIES, RANK_TIERS } from "@/lib/constants";
import { PlanetIcon } from "@/components/ui/planet-icon";

export const CelestialsProgression: React.FC = () => {
  const [selectedBody, setSelectedBody] = useState(CELESTIAL_BODIES[2]);

  const rankIcons = [Sparkles, Compass, Orbit, Rocket, Crown];

  return (
    <section id="progression" className="py-28 px-4 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="purple" className="px-4 py-1">
          Trajectory Explorer
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Every hour is a new checkpoint.
        </h2>
        <p className="text-base text-textMuted">
          Your study session is an orbital trajectory. The longer your focus streak, the deeper your navigation.
        </p>
      </div>

      {/* Trajectory Explorer Card */}
      <Card variant="glow" className="p-8 sm:p-10 space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Solar Checkpoints
          </span>
          <span className="font-mono text-xs text-textMuted">
            {CELESTIAL_BODIES.length} Checkpoints
          </span>
        </div>

        {/* Timeline Bar */}
        <div className="relative py-6 overflow-x-auto">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/10 via-primary/40 to-secondary/40 -translate-y-1/2 -z-0 min-w-[1000px]" />
          
          <div className="flex justify-between items-center relative z-10 min-w-[1000px] px-4 gap-4">
            {CELESTIAL_BODIES.map((body) => {
              const isSelected = selectedBody.id === body.id;
              return (
                <button
                  key={body.id}
                  onClick={() => setSelectedBody(body)}
                  className="flex flex-col items-center gap-3 group focus:outline-none"
                >
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-1 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? "scale-125 ring-2 ring-primary ring-offset-2 ring-offset-[#0B1020] shadow-[0_0_24px_rgba(124,92,255,0.6)]"
                        : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <PlanetIcon id={body.id} className="w-10 h-10 drop-shadow-lg" />
                  </motion.div>
                  <span
                    className={`font-mono text-xs tracking-wider transition-colors ${
                      isSelected ? "text-white font-bold" : "text-textMuted group-hover:text-white"
                    }`}
                  >
                    {body.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Body Inspector */}
        <motion.div
          key={selectedBody.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
        >
          <div>
            <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest mb-1">
              CHECKPOINT
            </div>
            <div className="font-sans text-2xl font-light text-white flex items-center gap-3">
              <PlanetIcon id={selectedBody.id} className="w-8 h-8" />
              {selectedBody.name}
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest mb-1">
              FOCUS REQUIREMENT
            </div>
            <div className="font-mono text-lg text-secondary font-medium">
              {selectedBody.hoursRequired} Hours Logged
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest mb-1">
              RANK XP MULTIPLIER
            </div>
            <div className="font-mono text-lg text-accent font-medium">
              +{selectedBody.xpBonus} Bonus XP
            </div>
          </div>

          <div className="md:col-span-3 pt-3 text-xs text-textMuted border-t border-white/5 leading-relaxed">
            {selectedBody.description}
          </div>
        </motion.div>
      </Card>

      {/* Rank Hierarchy */}
      <div className="space-y-6">
        <h3 className="font-sans text-2xl font-light text-white text-center">
          Five Ranks: From Trainee to Starwalker
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {RANK_TIERS.map((rank, i) => {
            const Icon = rankIcons[i];
            const isHighest = i === 4;
            return (
              <Card
                key={rank.id}
                variant={isHighest ? "glow" : "glass"}
                className="p-5 flex flex-col items-center text-center space-y-3"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${
                    isHighest
                      ? "border-accent bg-primary/20 text-accent shadow-[0_0_16px_rgba(124,92,255,0.3)]"
                      : "border-white/10 bg-white/5 text-textMuted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <div className="font-sans text-sm font-medium text-white">
                    {rank.name}
                  </div>
                  <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest">
                    TIER 0{rank.tierNumber}
                  </div>
                </div>

                <div className="font-mono text-xs text-secondary pt-2 border-t border-white/5 w-full">
                  {rank.xpRequired} XP
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
