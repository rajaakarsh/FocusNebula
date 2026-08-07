"use client";

import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifiers: { meta?: boolean; ctrl?: boolean; shift?: boolean } = { meta: true }
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const metaMatch = modifiers.meta ? e.metaKey || e.ctrlKey : true;
      const shiftMatch = modifiers.shift ? e.shiftKey : !e.shiftKey;
      if (e.key.toLowerCase() === key.toLowerCase() && metaMatch && shiftMatch) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback, modifiers.meta, modifiers.shift]);
}

export function useMediaQuery(query: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}
