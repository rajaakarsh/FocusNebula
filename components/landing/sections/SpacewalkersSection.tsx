"use client";

import { useEffect, useRef } from "react";
import { GlowText } from "@/components/landing/GlowText";

/* Celestial arc planet points data */
const PLANET_POINTS = [
  { label: "Mercury",    color: "rgba(255,255,255,0.7)",    glow: "rgba(255,255,255,0.5)",   y:  14, dot: false },
  { label: "Earth",      color: "#E8E4FF",                  glow: "rgba(200,184,255,0.5)",   y:  -4, dot: false },
  { label: "Jupiter",    color: "#fff",                     glow: "rgba(255,255,255,0.85)",  y: -16, dot: true  },
  { label: "Pluto",      color: "#C7B8FF",                  glow: "rgba(199,184,255,0.6)",   y:  -4, dot: false },
  { label: "Deep Space", color: "#0b0b14",                  glow: "transparent",             y:  14, dot: false, border: true },
];

/* Rank data */
const RANKS = [
  {
    name: "Trainee",
    active: false,
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 6 L18 14 L26 16 L18 18 L16 26 L14 18 L6 16 L14 14 Z" fill="currentColor" fillOpacity="0.18"/>
      </svg>
    ),
  },
  {
    name: "Astronaut",
    active: false,
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="16" cy="16" rx="13" ry="4.5" transform="rotate(-20 16 16)"/>
        <circle cx="16" cy="16" r="5.5" fill="currentColor" fillOpacity="0.18"/>
      </svg>
    ),
  },
  {
    name: "Explorer",
    active: true,
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(-25 16 16)" opacity="0.55"/>
        <circle cx="16" cy="16" r="6" fill="currentColor" fillOpacity="0.22"/>
        <circle cx="27" cy="9" r="1.8" fill="currentColor"/>
      </svg>
    ),
  },
  {
    name: "Cosmonaut",
    active: false,
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="16" cy="16" rx="13" ry="4.5" transform="rotate(-18 16 16)"/>
        <ellipse cx="16" cy="16" rx="13" ry="4.5" transform="rotate(22 16 16)" opacity="0.6"/>
        <circle cx="16" cy="16" r="5" fill="currentColor" fillOpacity="0.22"/>
      </svg>
    ),
  },
  {
    name: "Starwalker",
    active: false,
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse cx="16" cy="17" rx="13" ry="3.5"/>
        <ellipse cx="16" cy="17" rx="10" ry="2.5" opacity="0.6"/>
        <circle cx="16" cy="17" r="3" fill="currentColor"/>
        <path d="M16 6 L17 10 M16 6 L15 10 M10 8 L12 11 M22 8 L20 11" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const MILESTONES = [
  { time: "25m", xp: "+10 XP", c: "255,255,255" },
  { time: "45m", xp: "+20 XP", c: "199,184,255" },
  { time: "90m", xp: "+50 XP", c: "255,255,255" },
];

interface SpacewalkersSectionProps {
  onNavigate?: (id: string) => void;
  isActive: boolean;
}

export function SpacewalkersSection({ onNavigate, isActive }: SpacewalkersSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Scroll reveal within this section */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, root: section }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      id="section-spacewalkers"
      className={`page-section info-scroll${isActive ? " active" : ""}`}
      ref={sectionRef}
      style={{
        "--info-accent": "#C7B8FF",
        "--info-accent-rgb": "199,184,255",
      } as React.CSSProperties}
    >
      <div className="info-container">

        {/* ── Info Hero ── */}
        <div className="info-hero">
          <div className="info-eyebrow">Faction · Cosmic Lineage</div>
          <h1 className="info-title">
            The <GlowText text="Spacewalkers" />
          </h1>
          <p className="info-tagline">Push beyond the limits of the known</p>
          <p className="info-desc">
            Fearless explorers who venture into the unknown. Spacewalkers
            conquer the hardest subjects and emerge as legends of the cosmos.
          </p>
        </div>

        {/* ── Visual Mockup — placeholder video panel ── */}
        <div className="info-visual" id="svVisual" aria-label="Spacewalkers focus environment preview">
          {/* Placeholder space environment since we can't use the copyrighted video */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 50%, #13131c 0%, #09090f 70%, #05050a 100%)",
            }}
          />
          {/* Stars */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.7,
              backgroundImage: `
                radial-gradient(1px 1px at 8% 18%, #fff, transparent),
                radial-gradient(1px 1px at 22% 62%, #fff, transparent),
                radial-gradient(1px 1px at 38% 28%, #C7B8FF, transparent),
                radial-gradient(1px 1px at 55% 12%, #fff, transparent),
                radial-gradient(1px 1px at 68% 55%, #fff, transparent),
                radial-gradient(1px 1px at 82% 28%, #C7B8FF, transparent),
                radial-gradient(1px 1px at 92% 62%, #fff, transparent),
                radial-gradient(1.5px 1.5px at 48% 72%, #fff, transparent),
                radial-gradient(1px 1px at 15% 42%, #fff, transparent),
                radial-gradient(1px 1px at 75% 38%, #fff, transparent)
              `,
            }}
            aria-hidden="true"
          />
          {/* Planet */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 88,
              height: 88,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle at 32% 30%, #1a2c40 0%, #0a1422 55%, #050810 100%)",
              boxShadow: "inset -16px -10px 28px rgba(0,0,0,0.6), inset 14px 12px 22px rgba(159,232,255,0.08), 0 0 60px rgba(159,232,255,0.10)",
            }}
            aria-hidden="true"
          />
          {/* Orbital ring */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 280,
              height: 280,
              border: "1px solid rgba(159,232,255,0.10)",
              borderRadius: "50%",
              transform: "translate(-50%, -45%)",
              boxShadow: "inset 0 0 60px rgba(159,232,255,0.04)",
            }}
            aria-hidden="true"
          />
          {/* Orbiting dot */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#9FE8FF",
              boxShadow: "0 0 12px #9FE8FF, 0 0 24px rgba(159,232,255,0.5)",
              transformOrigin: "0 0",
              animation: "fpOrbit 26s linear infinite",
            }}
            aria-hidden="true"
          />
          {/* HUD overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 18,
              pointerEvents: "none",
              zIndex: 6,
            }}
          >
            <div
              style={{
                background: "rgba(12,13,17,0.72)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "10px 22px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <div style={{ fontSize: 8, fontWeight: 600, color: "#A0AABF", letterSpacing: 2, textTransform: "uppercase" }}>
                Focus Session
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 300,
                  color: "#fff",
                  letterSpacing: 1,
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: "var(--font-space-grotesk), monospace",
                }}
              >
                01:42:08
              </div>
              <div style={{ fontSize: 8, color: "#A0AABF" }}>Deep Space · Active</div>
            </div>
          </div>
        </div>

        {/* ── Premium Glass Sections ── */}
        <div className="premium-sections" id="section-spacewalkers-sections">

          {/* Progression System */}
          <section className="ps-block reveal" aria-labelledby="sw-progression-heading">
            <div className="ps-eyebrow">The Progression System</div>
            <h2 id="sw-progression-heading" className="ps-subtitle">Every hour is a new world</h2>
            <p className="ps-text">
              Your study session is a voyage across the solar system. The timer is your propulsion — every hour of
              focus carries you to the next celestial body. From Mercury to the Black Hole and into Deep Space,
              the further you push, the more your XP grows.
            </p>
          </section>

          {/* Celestial Bodies arc */}
          <section className="ps-glass reveal" aria-labelledby="sw-celestials-heading">
            <div className="ps-eyebrow">Celestial Bodies</div>
            <h3 id="sw-celestials-heading" className="ps-subtitle">Eleven destinations. One trajectory.</h3>
            <div className="ps-arc">
              <svg viewBox="0 0 800 100" preserveAspectRatio="none" className="ps-arc-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="psArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity={0} />
                    <stop offset="50%"  stopColor="#C7B8FF" stopOpacity={1} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path d="M0 80 Q 400 -20 800 80" fill="none" stroke="url(#psArcGrad)" strokeWidth="1" strokeDasharray="4 5"/>
              </svg>
              <div className="ps-arc-points" aria-label="Celestial progression from Mercury to Deep Space">
                {PLANET_POINTS.map((p, i) => (
                  <div key={i} className="ps-pt" style={{ transform: `translateY(${p.y}px)` }}>
                    <span
                      className={`ps-dot${p.dot ? " ps-dot-lg" : ""}`}
                      style={{
                        background: p.color,
                        boxShadow: `0 0 ${p.dot ? "14" : "10"}px ${p.glow}`,
                        ...(p.border ? { border: "1px solid rgba(255,255,255,0.25)" } : {}),
                      }}
                      aria-hidden="true"
                    />
                    <em style={p.dot ? { color: "#fff" } : {}}>{p.label}</em>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Orbit Counter + Milestones grid */}
          <div className="ps-grid reveal">
            <section className="ps-block" aria-labelledby="sw-orbit-heading">
              <div className="ps-eyebrow">Orbit Counter</div>
              <h3 id="sw-orbit-heading" className="ps-subtitle">One orbit every five minutes</h3>
              <p className="ps-text">
                As you focus, your orbit counter ticks upward — one full orbit for every five minutes of sustained study.
              </p>
            </section>

            <section className="ps-block" aria-labelledby="sw-milestones-heading">
              <div className="ps-eyebrow">Milestones</div>
              <h3 id="sw-milestones-heading" className="ps-subtitle">Bonus XP for endurance</h3>
              <div className="ps-chips" role="list" aria-label="XP milestones">
                {MILESTONES.map((m, i) => (
                  <div
                    key={i}
                    className="ps-chip"
                    style={{ "--c": m.c } as React.CSSProperties}
                    role="listitem"
                  >
                    <b>{m.time}</b>
                    <span>{m.xp}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Rank Progression */}
          <section className="ps-block ps-divider reveal" aria-labelledby="sw-ranks-heading">
            <div className="ps-eyebrow">Progression</div>
            <h3 id="sw-ranks-heading" className="ps-subtitle">Five ranks from Trainee to Starwalker</h3>
            <div className="ps-ranks" role="list" aria-label="Rank progression">
              <div className="ps-ranks-rail" aria-hidden="true" />
              {RANKS.map((rank, i) => (
                <div key={i} className={`ps-rank${rank.active ? " active" : ""}`} role="listitem">
                  <div className="ps-rank-tile" aria-hidden="true">
                    <div className="ps-rank-emblem">{rank.icon}</div>
                  </div>
                  <p>{rank.name}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Hidden legacy containers for JS compatibility */}
        <div id="spaceTimeline" style={{ display: "none" }}><div className="info-timeline-track" /></div>
        <div id="spaceRanks"    style={{ display: "none" }}><div className="ir-track" /></div>

        {/* ── CTA ── */}
        <div className="info-cta">
          <button
            className="btn-primary"
            style={{ width: "auto", padding: "14px 32px" }}
            aria-label="Enlist as Spacewalker"
          >
            Enlist as Spacewalker
          </button>
        </div>

      </div>
    </div>
  );
}
