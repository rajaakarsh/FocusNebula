"use client";

import { useEffect, useRef } from "react";
import { useFocusStore } from "@/store/useFocusStore";

export function FocusTimer() {
  const { isRunning, isPaused, tickTimer } = useFocusStore();
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isRunning || isPaused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
      return;
    }

    const loop = (time: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = (time - lastTimeRef.current) / 1000;
        // Limit delta to 1 second maximum to avoid huge jumps if tab was suspended for long
        // Wait, for background persistence we actually WANT to process large deltas,
        // but we should just pass the delta to the store. The store subtracts it.
        tickTimer(delta);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isRunning, isPaused, tickTimer]);

  // Background persistence
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const leaveTimeStr = localStorage.getItem('focus_leave_time');
        if (leaveTimeStr && isRunning && !isPaused) {
          const leaveTime = parseInt(leaveTimeStr, 10);
          const now = Date.now();
          const elapsedSeconds = (now - leaveTime) / 1000;
          if (elapsedSeconds > 0) {
            tickTimer(elapsedSeconds);
          }
        }
      } else {
        if (isRunning && !isPaused) {
          localStorage.setItem('focus_leave_time', Date.now().toString());
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRunning, isPaused, tickTimer]);

  return null; // This is a logic-only component
}
