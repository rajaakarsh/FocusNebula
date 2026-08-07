"use client";

import { useEffect } from "react";
import { useFocusStore } from "@/store/useFocusStore";
import { formatTime } from "@/utils/time";

export function TimerCard() {
  const { 
    timeLeft, 
    initialDuration, 
    isRunning, 
    isPaused,
    startTimer, 
    pauseTimer, 
    resumeTimer, 
    stopTimer 
  } = useFocusStore();

  const progress = initialDuration > 0 ? ((initialDuration - timeLeft) / initialDuration) * 100 : 0;

  const handleStart = () => {
    startTimer(25 * 60);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isRunning) {
          handleStart();
        } else if (isPaused) {
          resumeTimer();
        } else {
          pauseTimer();
        }
      } else if (e.code === 'Escape') {
        e.preventDefault();
        stopTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, isPaused, startTimer, resumeTimer, pauseTimer, stopTimer]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-sm">
      <div className="glass-panel p-8 rounded-2xl flex flex-col items-center gap-6 shadow-glow">
        <h2 className="text-sm uppercase tracking-[0.2em] text-cyan-300 font-jetbrains">
          Deep Focus
        </h2>
        
        <div className="text-6xl font-light font-jetbrains tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {formatTime(timeLeft)}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(159,232,255,0.8)]"
            style={{ width: `${progress}%`, transition: 'width 1s linear' }}
          />
        </div>

        {/* Controls */}
        <div className="flex gap-4 w-full">
          {!isRunning ? (
            <button 
              onClick={handleStart}
              className="flex-1 py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium transition-all hover:scale-105 active:scale-95"
            >
              Start Session
            </button>
          ) : (
            <>
              <button 
                onClick={isPaused ? resumeTimer : pauseTimer}
                className="flex-1 py-3 px-6 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-100 font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(159,232,255,0.2)]"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
              <button 
                onClick={stopTimer}
                className="flex-1 py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
