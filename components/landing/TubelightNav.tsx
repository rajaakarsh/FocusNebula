"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const NAV_ITEMS = [
  { id: "home",         label: "Home" },
  { id: "about",        label: "About" },
  { id: "pilots",       label: "Pilots" },
  { id: "spacewalkers", label: "Spacewalkers" },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["id"];

interface TubelightNavProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function TubelightNav({ activeSection, onNavigate }: TubelightNavProps) {
  const navRef   = useRef<HTMLDivElement>(null);
  const lampRef  = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const updateLamp = useCallback((id: string) => {
    const el   = itemRefs.current.get(id);
    const lamp = lampRef.current;
    if (!el || !lamp) return;
    /* Batch reads before writes to avoid layout thrash */
    const w = el.offsetWidth;
    const l = el.offsetLeft;
    lamp.style.width = w + "px";
    lamp.style.left  = l + "px";
  }, []);

  /* Init lamp position after mount */
  useEffect(() => {
    const t = setTimeout(() => updateLamp(activeSection), 50);
    return () => clearTimeout(t);
  }, [activeSection, updateLamp]);

  return (
    <nav
      className="tubelight-nav"
      id="tubelightNav"
      ref={navRef}
      aria-label="Main navigation"
    >
      <div className="nav-lamp" id="navLamp" ref={lampRef} aria-hidden="true" />
      {NAV_ITEMS.map(({ id, label }) => (
        <div
          key={id}
          className={`nav-item${activeSection === id ? " active" : ""}`}
          role="button"
          tabIndex={0}
          aria-current={activeSection === id ? "page" : undefined}
          ref={(el) => { if (el) itemRefs.current.set(id, el); }}
          onClick={() => onNavigate(id)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNavigate(id); }}
        >
          {label}
        </div>
      ))}
    </nav>
  );
}

export type { SectionId };
