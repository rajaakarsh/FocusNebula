"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFocusStore } from '@/store/useFocusStore';
import { Settings, BarChart2, Volume2, ChevronLeft, ChevronRight, Map } from 'lucide-react';
import { formatTime } from '@/utils/time';

export function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'audio'>('stats');
  const { stats, audio, setGlobalVolume } = useFocusStore();

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 left-4 -translate-y-1/2 z-50 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-screen w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 z-40 p-6 pt-20 flex flex-col gap-6 overflow-y-auto"
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl font-jetbrains font-light text-white tracking-tighter">
                Command Center
              </h2>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => setActiveTab('stats')}
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-all ${activeTab === 'stats' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  <BarChart2 size={16} /> Stats
                </button>
                <button 
                  onClick={() => setActiveTab('audio')}
                  className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-all ${activeTab === 'audio' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  <Volume2 size={16} /> Audio
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'stats' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                <StatBox label="Today's Focus" value={`${stats.todayFocusMinutes} min`} />
                <StatBox label="Lifetime Journey" value={`${stats.lifetimeFocusHours.toFixed(1)} hrs`} highlight />
                <div className="grid grid-cols-2 gap-4">
                  <StatBox label="Current Streak" value={`${stats.currentStreakDays} days`} />
                  <StatBox label="Longest Session" value={`${stats.longestSessionMinutes} min`} />
                </div>
              </motion.div>
            )}

            {activeTab === 'audio' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block font-jetbrains">
                    Master Volume
                  </label>
                  <input 
                    type="range" 
                    min="0" max="1" step="0.01" 
                    value={audio.globalVolume}
                    onChange={(e) => setGlobalVolume(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-xs uppercase tracking-widest text-white/50 font-jetbrains">Ambience Mixer</h3>
                  <p className="text-sm text-white/40 italic">Note: Ambient tracks will be implemented in Phase 5.</p>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function StatBox({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${highlight ? 'bg-cyan-950/30 border-cyan-500/30 shadow-[0_0_15px_rgba(159,232,255,0.1)]' : 'bg-white/5 border-white/10'}`}>
      <div className="text-xs uppercase tracking-widest text-white/50 mb-1 font-jetbrains">{label}</div>
      <div className={`text-2xl font-light font-jetbrains ${highlight ? 'text-cyan-300' : 'text-white'}`}>{value}</div>
    </div>
  );
}
