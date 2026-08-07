"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, Compass, CheckCircle2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FACTIONS } from "@/lib/constants";

export const FactionsSection: React.FC = () => {
  return (
    <section id="factions" className="py-28 px-4 max-w-6xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="purple" className="px-4 py-1">
          Two Focus Environments
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Engineered for how deep workers concentrate.
        </h2>
        <p className="text-base sm:text-lg text-textMuted font-normal">
          Same commitment to quiet productivity, two refined atmospheres.
        </p>
      </div>

      {/* Factions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FACTIONS.map((faction, idx) => {
          const isActive = faction.status === "active";
          return (
            <motion.div
              key={faction.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Card
                variant={isActive ? "glow" : "glass"}
                className={`h-full flex flex-col justify-between p-8 sm:p-10 relative ${
                  !isActive ? "opacity-75" : ""
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant={isActive ? "purple" : "locked"} pulse={isActive}>
                      {isActive ? "Active Surface" : "Unlocks v1.2"}
                    </Badge>
                    {!isActive && (
                      <div className="flex items-center gap-1.5 text-xs text-textMuted font-mono">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </div>
                    )}
                  </div>

                  {/* Clean Visual Preview Container */}
                  <div className="relative h-44 rounded-2xl bg-[#070A18] border border-white/10 overflow-hidden mb-6 flex items-center justify-center group">
                    {isActive ? (
                      <>
                        <div className="absolute inset-0 bg-radial-gradient from-primary/15 to-transparent opacity-60 group-hover:scale-105 transition-transform duration-700" />
                        <div className="relative z-10 text-center space-y-2">
                          <div className="w-14 h-14 mx-auto rounded-2xl border border-primary/30 flex items-center justify-center bg-primary/10 shadow-[0_0_20px_rgba(124,92,255,0.25)]">
                            <Sparkles className="w-6 h-6 text-accent" />
                          </div>
                          <div className="font-mono text-[10px] text-secondary tracking-widest uppercase">
                            Cosmic Surface Active
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                        <div className="relative z-10 text-center space-y-2">
                          <div className="w-14 h-14 mx-auto rounded-2xl border border-white/10 flex items-center justify-center bg-white/5">
                            <Compass className="w-6 h-6 text-textMuted" />
                          </div>
                          <div className="font-mono text-[10px] text-textMuted tracking-widest uppercase">
                            Blueprint Pomodoro Radar
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Faction Metadata */}
                  <h3 className="font-sans text-2xl font-medium text-white mb-1.5">
                    {faction.name}
                  </h3>
                  <div className="font-mono text-xs text-accent mb-4 tracking-wide">
                    {faction.tagline}
                  </div>
                  <p className="text-sm text-textMuted leading-relaxed mb-6">
                    {faction.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {faction.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-textMuted">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isActive ? "text-secondary" : "text-textMuted"
                          }`}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Trigger */}
                <div>
                  <Button
                    variant={isActive ? "primary" : "ghost"}
                    size="md"
                    className="w-full justify-between"
                    disabled={!isActive}
                    onClick={() => {
                      const el = document.getElementById("timer-demo");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span>{isActive ? "Launch Spacewalkers" : "Join Waiting List"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
