"use client";

import { useEffect, useRef, useState } from "react";
import { GlowText } from "@/components/landing/GlowText";
import { useAuth } from "@/components/providers/auth-provider";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

/* Google OAuth icon */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* Spacewalker orbital glyph SVG */
function SpacewalkerGlyph() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <circle cx="20" cy="20" r="2.2" fill="currentColor" stroke="none"/>
      <ellipse cx="20" cy="20" rx="15" ry="6" />
      <ellipse cx="20" cy="20" rx="15" ry="6" transform="rotate(60 20 20)"/>
      <ellipse cx="20" cy="20" rx="15" ry="6" transform="rotate(120 20 20)"/>
    </svg>
  );
}

/* Pilots lock glyph */
function PilotsGlyph() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <rect x="11" y="18" width="18" height="14" rx="1.5"/>
      <path d="M15 18v-4a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

/* Orbit preview SVG for Spacewalkers faction card */
function OrbitPreview() {
  return (
    <div className="mf-preview" aria-hidden="true">
      <div className="mf-preview-stars" />
      <svg className="mf-preview-svg" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
        <ellipse className="mf-orbit" cx="150" cy="75" rx="120" ry="50" />
        <ellipse className="mf-orbit-glow" cx="150" cy="75" rx="80" ry="33" />
        <circle className="mf-planet" cx="150" cy="75" r="18" />
        <g className="mf-orbit-node">
          <circle cx="270" cy="75" r="4" className="mf-node" />
        </g>
      </svg>
      <div className="mf-preview-hud">Live session</div>
      <div className="mf-preview-timer">01:42:08</div>
      <div className="mf-preview-bar" />
    </div>
  );
}

/* Stat card component */
interface StatCardProps {
  label: string;
  id: string;
  description: string;
}

function StatCard({ label, id, description }: StatCardProps) {
  return (
    <div className="stat-card" role="figure" aria-label={label}>
      <div className="stat-label">{label}</div>
      <div className="stat-number">
        <span className="count" id={id} data-to="0">0</span>
      </div>
      <div className="stat-foot">{description}</div>
    </div>
  );
}

interface HomeSectionProps {
  onNavigate: (id: string) => void;
  isActive: boolean;
}

export function HomeSection({ onNavigate, isActive }: HomeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleAuth = async () => {
    if (user) {
      router.push("/focus");
      return;
    }
    
    setIsLoggingIn(true);
    try {
      const loggedInUser = await signInWithGoogle();
      if (loggedInUser) {
        router.push("/focus");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  /* Scroll reveal */
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
      { threshold: 0.15, root: section }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Count-up animation */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function formatStatNumber(num: number) {
      if (num < 100) return num.toString();
      if (num < 1000) return Math.floor(num / 100) * 100 + "+";
      return (Math.floor(num / 100) / 10).toFixed(1).replace(".0", "") + "K+";
    }

    function animate(node: Element, to: number) {
      const dur = 1600;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(to * eased);
        if (p === 1) {
          node.textContent = formatStatNumber(to);
        } else {
          node.textContent = val.toLocaleString("en-US");
        }
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    /* Try to fetch live stats */
    async function fetchStats() {
      const nodes = [
        { el: document.getElementById("stat-sessions"), key: "total_sessions" },
        { el: document.getElementById("stat-users"),    key: "total_users" },
        { el: document.getElementById("stat-active"),   key: "active_users" },
      ];

      try {
        // @ts-ignore — supabase loaded from CDN in production
        const supa = window.supabase?.createClient?.(
          "https://vzrhwljsxgljtjmsykmu.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cmh3bGpzeGdsanRqbXN5a211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MzgwNDksImV4cCI6MjA5ODExNDA0OX0.Zzvao6eMpELWnhe8toeQQLiqlTycyCOEXyTTYpmV24k"
        );
        if (supa) {
          const { data } = await supa.rpc("get_platform_stats");
          if (data && data.length > 0) {
            const stats = data[0];
            nodes[0].el && (nodes[0].el.dataset.to = stats.total_sessions || 0);
            nodes[1].el && (nodes[1].el.dataset.to = stats.total_users || 0);
            nodes[2].el && (nodes[2].el.dataset.to = stats.active_users || 0);
          }
        }
      } catch {
        /* silently ignore — show zeroes */
      }

      if (!("IntersectionObserver" in window)) {
        nodes.forEach(({ el }) => el && animate(el, parseInt(el.dataset.to || "0", 10)));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              animate(el, parseInt(el.dataset.to || "0", 10));
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.4, root: section }
      );
      nodes.forEach(({ el }) => el && io.observe(el));
    }

    fetchStats();
  }, []);

  return (
    <div
      id="section-home"
      className={`page-section info-scroll${isActive ? " active" : ""}`}
      style={{ "--info-accent": "#9FE8FF", "--info-accent-rgb": "159,232,255" } as React.CSSProperties}
      ref={sectionRef}
    >
      <div className="info-container" style={{ maxWidth: 980 }}>

        {/* ── Hero ── */}
        <section className="hero-premium reveal">
          <div className="hero-particles" aria-hidden="true">
            <span /><span /><span /><span /><span /><span />
          </div>

          <div className="hero-eyebrow">Beta &middot; v1.0</div>

          <h1 className="hero-title">
            Make focusing&nbsp;
            <GlowText text="immersive." />
          </h1>

          <p className="hero-sub">
            Choose an environment, set your target, and disappear into a focused session built around how you work.
          </p>

          <div className="hero-cta">
            <button
              className="btn-pill primary"
              aria-label={user ? "Launch Focus Nebula" : "Continue with Google to sign in"}
              onClick={handleAuth}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Authenticating..." : user ? "Launch Focus Nebula" : "Continue with Google"}
              {!user && <GoogleIcon />}
            </button>
            <button
              className="btn-pill ghost"
              onClick={() => onNavigate("pilots")}
              aria-label="Explore the factions"
            >
              Explore the factions
            </button>
          </div>
        </section>

        {/* ── Stat Cards ── */}
        <div className="stat-grid reveal">
          <StatCard label="Sessions completed" id="stat-sessions" description="Focus sessions logged this month" />
          <StatCard label="Total users"        id="stat-users"    description="Learners building focus habits with us" />
          <StatCard label="Active learners"    id="stat-active"   description="Studying right now across both factions" />
        </div>

        {/* ── Two Focus Modes ── */}
        <div className="reveal">
          <div className="section-head">
            <div className="ps-eyebrow ps-eyebrow-white" style={{ justifyContent: "center" }}>
              <span className="ps-rule" />
              <span>Two Focus Modes</span>
            </div>
            <h2 style={{ color: "#fff", fontWeight: 300, letterSpacing: "-0.01em" }}>
              Choose the environment that matches how you work.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)" }}>Same goal, different atmosphere.</p>
          </div>

          <div className="mini-factions">
            {/* Spacewalkers */}
            <div className="mini-faction" role="article">
              <div className="mf-glyph" aria-hidden="true"><SpacewalkerGlyph /></div>
              <div className="mf-label">Active</div>
              <OrbitPreview />
              <h3>Spacewalkers</h3>
              <p>An immersive deep-space focus surface. A slow-rotating planet at the center and a quiet orbital rail tracking your session.</p>
              <div className="mf-meta">
                <span>Immersive</span><span className="sep">·</span>
                <span>Deep Work</span><span className="sep">·</span>
                <span>Cinematic HUD</span>
              </div>
            </div>

            {/* Pilots – locked */}
            <div className="mini-faction locked" role="article" aria-label="Pilots faction — coming soon">
              <div className="mf-glyph" aria-hidden="true"><PilotsGlyph /></div>
              <div className="mf-label">Soon</div>
              <div className="mf-preview locked" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="mf-lock-label">Coming Soon</span>
              </div>
              <h3>Pilots</h3>
              <p>A structured blueprint workspace for sharp, scheduled study. Rigid Pomodoro blocks and a flight-itinerary progress rail.</p>
              <div className="mf-meta">
                <span>Structured</span><span className="sep">·</span>
                <span>Pomodoro</span><span className="sep">·</span>
                <span>Blueprint</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 80 }} />

        {/* ── How It Works + Principles ── */}
        <div className="premium-sections" style={{ maxWidth: 860 }}>

          <section className="ps-block" aria-labelledby="how-it-works-heading">
            <div className="ps-eyebrow"><span className="ps-rule" /><span>How It Works</span></div>
            <h2 id="how-it-works-heading" className="ps-title">Three steps. No noise.</h2>
          </section>

          <div className="ps-flow" role="list">
            {/* Step 01 */}
            <div className="ps-step" role="listitem">
              <div className="ps-step-head">
                <div className="ps-step-num">01</div>
                <svg className="ps-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5"/>
                </svg>
              </div>
              <div className="ps-step-body">
                <div className="ps-step-eyebrow">Onboard</div>
                <h3>Set your identity</h3>
                <p>Pick a name, choose your examination or work track, and lock in the subjects you actually need to study.</p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="ps-step" role="listitem">
              <div className="ps-step-head">
                <div className="ps-step-num">02</div>
                <svg className="ps-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="8"/><path d="M12 4v4M12 16v4M4 12h4M16 12h4"/>
                </svg>
              </div>
              <div className="ps-step-body">
                <div className="ps-step-eyebrow">Faction</div>
                <h3>Pick a focus mode</h3>
                <p>Spacewalkers for immersive deep work. Pilots for structured Pomodoro sprints. Your faction defines your study screen.</p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="ps-step" role="listitem">
              <div className="ps-step-head">
                <div className="ps-step-num">03</div>
                <svg className="ps-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>
                </svg>
              </div>
              <div className="ps-step-body">
                <div className="ps-step-eyebrow">Focus</div>
                <h3>Start the session</h3>
                <p>Timer runs, distractions disappear, progress is tracked. Earn rank XP for sustained focus, not for clicks.</p>
              </div>
            </div>
          </div>

          {/* Design Principles */}
          <section className="ps-block" aria-labelledby="principles-heading">
            <div className="ps-eyebrow"><span>Design Principles</span></div>
            <h3 id="principles-heading" className="ps-subtitle ps-subtitle-lg">Minimal by default. Technical by intent.</h3>
            <div className="ps-principles">
              <div className="ps-principle">
                <svg className="ps-principle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M8 4v6"/>
                </svg>
                <h4>No dashboards</h4>
                <p>The center of the screen is reserved for the work, not for charts. Stats live in slide-out drawers you only open when you want them.</p>
              </div>
              <div className="ps-principle">
                <svg className="ps-principle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 8a6 6 0 0 1 12 0v5l1.5 3h-15L6 13z"/><path d="M10 19a2 2 0 0 0 4 0"/><path d="M4 4l16 16" opacity="0.7"/>
                </svg>
                <h4>No notifications</h4>
                <p>Nothing pings, nothing pops. The only thing that moves during a session is the timer and the progress rail.</p>
              </div>
            </div>
          </section>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="info-cta"
          style={{ paddingTop: 40, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >
          <button
            className="btn-primary"
            aria-label={user ? "Launch Focus Nebula" : "Continue with Google to sign in"}
            onClick={handleAuth}
            disabled={isLoggingIn}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {isLoggingIn ? "Authenticating..." : user ? "Launch Focus Nebula" : "Continue with Google"}
            {!user && <GoogleIcon />}
          </button>
          <div className="privacy-note">Closed beta. Your progress is encrypted and stored locally.</div>
        </div>

      </div>
    </div>
  );
}
