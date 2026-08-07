"use client";

import React, { useState } from "react";
import { Radio, Wind, CloudRain, Music, Play, Pause, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SOUNDSCAPES } from "@/lib/constants";

export const SoundscapesDemo: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const iconMap: Record<string, React.ElementType> = {
    Radio,
    Wind,
    CloudRain,
    Music,
  };

  const handleToggleSound = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section id="soundscapes" className="py-28 px-4 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="purple" className="px-4 py-1">
          Ambient Audio Engine
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Tune your focus frequency.
        </h2>
        <p className="text-base text-textMuted">
          Built-in ambient drone, pink noise, and lo-fi beats designed to isolate white noise without leaving the application.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SOUNDSCAPES.map((sound) => {
          const Icon = iconMap[sound.icon] || Music;
          const isPlaying = playingId === sound.id;

          return (
            <Card
              key={sound.id}
              variant={isPlaying ? "glow" : "glass"}
              className="p-6 flex flex-col justify-between space-y-6 relative group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-colors ${
                      isPlaying
                        ? "border-secondary bg-secondary/10 text-secondary shadow-[0_0_16px_rgba(76,201,240,0.3)]"
                        : "border-white/10 bg-white/5 text-textMuted"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-textMuted px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    {sound.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-sans text-lg font-medium text-white mb-1">
                    {sound.name}
                  </h3>
                  <p className="text-xs text-textMuted leading-relaxed">
                    {sound.description}
                  </p>
                </div>
              </div>

              {/* Play Trigger */}
              <button
                onClick={() => handleToggleSound(sound.id)}
                className={`w-full py-2.5 px-4 rounded-full font-mono text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 border transition-all duration-300 ${
                  isPlaying
                    ? "bg-secondary text-black border-secondary shadow-[0_0_20px_rgba(76,201,240,0.4)]"
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Playing Sound
                    <Volume2 className="w-3.5 h-3.5 ml-1 animate-pulse" />
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" /> Preview Track
                  </>
                )}
              </button>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
