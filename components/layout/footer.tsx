"use client";

import React from "react";
import { Github, Twitter, Disc as Discord } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#030712] py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-white">
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#7C5CFF]" />
            <span className="font-mono text-sm font-semibold tracking-tight">
              FOCUS<span className="text-accent">NEBULA</span>
            </span>
          </div>
          <p className="text-xs text-textMuted leading-relaxed">
            An atmospheric deep work surface engineered for concentration without noise. Infinite focus, local encrypted privacy.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-medium uppercase tracking-widest text-textPrimary">
            Navigation
          </div>
          <ul className="space-y-2 text-xs text-textMuted">
            <li><a href="#hero" className="hover:text-white transition-colors">Overview</a></li>
            <li><a href="#factions" className="hover:text-white transition-colors">Factions</a></li>
            <li><a href="#timer-demo" className="hover:text-white transition-colors">Timer Surface</a></li>
            <li><a href="#progression" className="hover:text-white transition-colors">Trajectory</a></li>
            <li><a href="#soundscapes" className="hover:text-white transition-colors">Soundscapes</a></li>
          </ul>
        </div>

        {/* Factions */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-medium uppercase tracking-widest text-textPrimary">
            Surfaces
          </div>
          <ul className="space-y-2 text-xs text-textMuted">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <a href="#factions" className="hover:text-white transition-colors">Spacewalkers (Active)</a>
            </li>
            <li className="flex items-center gap-2 text-textMuted/60">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Pilots (Unlocks v1.2)</span>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <div className="font-mono text-xs font-medium uppercase tracking-widest text-textPrimary">
            Community & Security
          </div>
          <p className="text-xs text-textMuted leading-relaxed">
            Encrypted local session storage. Zero third-party tracker cookies.
          </p>
          <div className="flex items-center gap-4 text-textMuted pt-2">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Discord">
              <Discord className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-textMuted gap-4 font-sans">
        <div>
          © {new Date().getFullYear()} FocusNebula. Redesigned with Next.js 15 & React 19.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Beta Guidelines</a>
        </div>
      </div>
    </footer>
  );
};
