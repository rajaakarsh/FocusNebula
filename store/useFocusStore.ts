import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FocusStats {
  todayFocusMinutes: number;
  weeklyFocusMinutes: number;
  monthlyFocusMinutes: number;
  lifetimeFocusHours: number;
  longestSessionMinutes: number;
  currentStreakDays: number;
  longestStreakDays: number;
  lastSessionDate: string | null;
}

interface AudioState {
  globalVolume: number;
  activeTracks: { [trackId: string]: number }; // trackId to volume (0-1)
}

interface FocusState {
  // Timer State
  isRunning: boolean;
  isPaused: boolean;
  timeLeft: number;
  initialDuration: number;
  currentSubject: string;
  
  // Timer Actions
  startTimer: (duration: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
  tickTimer: (delta: number) => void; // delta in seconds
  completeSession: () => void;
  setSubject: (subject: string) => void;

  // Stats
  stats: FocusStats;
  
  // Audio
  audio: AudioState;
  setGlobalVolume: (volume: number) => void;
  setTrackVolume: (trackId: string, volume: number) => void;
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      isPaused: false,
      timeLeft: 0,
      initialDuration: 0,
      currentSubject: 'Deep Focus',

      startTimer: (duration) => set({ 
        isRunning: true, 
        isPaused: false, 
        timeLeft: duration, 
        initialDuration: duration 
      }),
      
      pauseTimer: () => set({ isPaused: true }),
      
      resumeTimer: () => set({ isPaused: false }),
      
      stopTimer: () => set({ isRunning: false, isPaused: false, timeLeft: 0 }),
      
      tickTimer: (delta) => set((state) => {
        if (!state.isRunning || state.isPaused) return state;
        const newTime = Math.max(0, state.timeLeft - delta);
        
        if (newTime === 0) {
          // Timer finished
          setTimeout(() => get().completeSession(), 0);
          return { timeLeft: 0, isRunning: false, isPaused: false };
        }
        
        return { timeLeft: newTime };
      }),

      completeSession: () => set((state) => {
        const sessionMinutes = Math.floor(state.initialDuration / 60);
        const sessionHours = sessionMinutes / 60;
        const now = new Date().toISOString().split('T')[0];
        
        const newStats = { ...state.stats };
        newStats.todayFocusMinutes += sessionMinutes;
        newStats.weeklyFocusMinutes += sessionMinutes;
        newStats.monthlyFocusMinutes += sessionMinutes;
        newStats.lifetimeFocusHours += sessionHours;
        
        if (sessionMinutes > newStats.longestSessionMinutes) {
          newStats.longestSessionMinutes = sessionMinutes;
        }

        if (newStats.lastSessionDate !== now) {
          // Check streak logic (simplified: if last session was yesterday, increment)
          const today = new Date(now);
          const last = newStats.lastSessionDate ? new Date(newStats.lastSessionDate) : null;
          
          if (last) {
            const diffDays = Math.floor((today.getTime() - last.getTime()) / (1000 * 3600 * 24));
            if (diffDays === 1) {
              newStats.currentStreakDays += 1;
            } else if (diffDays > 1) {
              newStats.currentStreakDays = 1;
            }
          } else {
            newStats.currentStreakDays = 1;
          }
          newStats.lastSessionDate = now;
        }

        if (newStats.currentStreakDays > newStats.longestStreakDays) {
          newStats.longestStreakDays = newStats.currentStreakDays;
        }

        return {
          isRunning: false,
          isPaused: false,
          timeLeft: 0,
          stats: newStats,
        };
      }),

      setSubject: (subject) => set({ currentSubject: subject }),

      stats: {
        todayFocusMinutes: 0,
        weeklyFocusMinutes: 0,
        monthlyFocusMinutes: 0,
        lifetimeFocusHours: 0,
        longestSessionMinutes: 0,
        currentStreakDays: 0,
        longestStreakDays: 0,
        lastSessionDate: null,
      },

      audio: {
        globalVolume: 1,
        activeTracks: {},
      },

      setGlobalVolume: (volume) => set((state) => ({
        audio: { ...state.audio, globalVolume: volume }
      })),

      setTrackVolume: (trackId, volume) => set((state) => ({
        audio: { 
          ...state.audio, 
          activeTracks: { ...state.audio.activeTracks, [trackId]: volume } 
        }
      }))
    }),
    {
      name: 'focus-nebula-storage',
      partialize: (state) => ({ stats: state.stats, audio: state.audio }),
    }
  )
);
