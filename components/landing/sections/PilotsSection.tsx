"use client";

import { GlowText } from "@/components/landing/GlowText";

interface PilotsSectionProps {
  onNavigate: (id: string) => void;
  isActive: boolean;
}

export function PilotsSection({ onNavigate, isActive }: PilotsSectionProps) {
  return (
    <div
      id="section-pilots"
      className={`page-section${isActive ? " active" : ""}`}
      style={{
        "--info-accent": "#00D4FF",
        "--info-accent-rgb": "0,212,255",
        background: "#000",
        justifyContent: "center",
      } as React.CSSProperties}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          padding: "0 24px",
          textAlign: "center",
          maxWidth: 560,
        }}
      >
        {/* Faction Locked badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.03)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}
          role="status"
          aria-label="Faction Locked"
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00D4FF",
              boxShadow: "0 0 8px #00D4FF",
              display: "inline-block",
            }}
            aria-hidden="true"
          />
          Faction Locked
        </div>

        {/* Lock icon */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M17 11V7a5 5 0 0 0-10 0v4M5 11h14v10H5z" />
        </svg>

        <h1 className="info-title" style={{ fontSize: 48, margin: 0 }}>
          The <GlowText text="Pilots" />
        </h1>

        <p className="info-desc" style={{ margin: 0 }}>
          The Pilots faction is currently under development. The 2D blueprint
          focus mode — radar map, paper jet, rigid Pomodoro blocks and the
          checklist task tracker — will unlock in a future release.
        </p>

        <button
          className="btn-primary"
          style={{ width: "auto", padding: "14px 32px", marginTop: 8 }}
          onClick={() => onNavigate("spacewalkers")}
          aria-label="Explore Spacewalkers instead"
        >
          Explore Spacewalkers instead
        </button>
      </div>
    </div>
  );
}
