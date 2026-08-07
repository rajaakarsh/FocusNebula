"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Radio,
  Clock,
  Sun,
  Quote,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Sliders,
} from "lucide-react";
import { spaceAudio } from "@/lib/space-audio";

interface RightWidgetsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedTheme: "deep-space" | "solar-gold" | "hyperdrive-cyan";
  onThemeChange: (theme: "deep-space" | "solar-gold" | "hyperdrive-cyan") => void;
}

export const RightWidgetsPanel: React.FC<RightWidgetsPanelProps> = ({
  isOpen,
  onToggle,
  selectedTheme,
  onThemeChange,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentPreset, setCurrentPreset] = useState<string>("cosmic-drone");
  const [volume, setVolume] = useState<number>(0.5);
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setUtcTime(d.toUTCString().slice(17, 25) + " UTC");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      spaceAudio.stop();
      setIsPlayingAudio(false);
    } else {
      spaceAudio.play(currentPreset);
      spaceAudio.setVolume(volume);
      setIsPlayingAudio(true);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    setCurrentPreset(presetId);
    if (isPlayingAudio) {
      spaceAudio.play(presetId);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    spaceAudio.setVolume(val);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-24 right-4 z-40 p-2.5 rounded-2xl bg-[#060913]/90 border border-white/10 text-white/80 hover:text-white shadow-lg backdrop-blur-md transition-all hover:border-[#F4A940]/50"
        title="Toggle Widgets (Shortcut: W)"
      >
        {isOpen ? <ChevronRight className="w-5 h-5" /> : <Radio className="w-5 h-5 text-[#F4A940]" />}
      </button>

      {/* Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-20 right-0 bottom-0 z-30 w-80 sm:w-96 bg-[#030712]/95 border-l border-white/10 backdrop-blur-xl p-6 flex flex-col space-y-6 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pt-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-sans text-xl font-light text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-[#F4A940]" />
                  Space Telemetry
                </h3>
                <p className="font-mono text-xs text-white/50">
                  REALTIME WIDGETS & AUDIO
                </p>
              </div>
            </div>

            {/* Widget 1: Space Audio Synthesizer */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#F4A940] uppercase tracking-widest flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Space Synthesizer
                </span>
                <button
                  onClick={handleToggleAudio}
                  className={`p-2 rounded-xl border transition-all ${
                    isPlayingAudio
                      ? "bg-[#3CCBFF] text-black border-[#3CCBFF] shadow-[0_0_16px_rgba(60,203,255,0.5)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:text-white"
                  }`}
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* Soundscape Presets */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "cosmic-drone", name: "Cosmic Drone" },
                  { id: "solar-wind", name: "Solar Wind" },
                  { id: "deep-rain", name: "Orbital Rain" },
                  { id: "nebula-synth", name: "Nebula Synth" },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`px-3 py-2 rounded-xl font-mono text-xs border text-left transition-all ${
                      currentPreset === preset.id
                        ? "bg-[#F4A940]/20 border-[#F4A940] text-[#F4A940] font-semibold"
                        : "bg-white/[0.02] border-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Volume Slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[11px] text-white/40">
                  <span>Volume</span>
                  <span>{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#3CCBFF] bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Widget 2: Galaxy Theme Selector */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <span className="font-mono text-xs text-[#3CCBFF] uppercase tracking-widest block">
                Galaxy Visual Theme
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "deep-space", name: "Deep Space" },
                  { id: "solar-gold", name: "Solar Gold" },
                  { id: "hyperdrive-cyan", name: "Hyper Cyan" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t.id as any)}
                    className={`px-2 py-2 rounded-xl font-mono text-[11px] border text-center transition-all ${
                      selectedTheme === t.id
                        ? "bg-[#3CCBFF]/20 border-[#3CCBFF] text-[#3CCBFF] font-semibold"
                        : "bg-white/[0.02] border-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Widget 3: UTC Space Clock */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#3CCBFF]" />
                <div>
                  <div className="font-mono text-sm font-semibold text-white">
                    {utcTime || "00:00:00 UTC"}
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase">
                    Universal Mission Clock
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 4: Solar Weather */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-5 h-5 text-[#F4A940]" />
                <div>
                  <div className="font-mono text-xs font-semibold text-white">
                    Solar Radiation Nominal
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase">
                    Atmospheric Ion Level: 1.2 GW
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 5: Space Quote */}
            <div className="p-5 rounded-2xl bg-[#3CCBFF]/5 border border-[#3CCBFF]/20 text-xs text-white/80 leading-relaxed space-y-2">
              <Quote className="w-4 h-4 text-[#3CCBFF]" />
              <p className="italic">
                &ldquo;Somewhere, something incredible is waiting to be known.&rdquo;
              </p>
              <div className="font-mono text-[10px] text-[#3CCBFF] text-right">
                — Carl Sagan
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
