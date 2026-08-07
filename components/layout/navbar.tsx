"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Overview" },
  { id: "factions", label: "Factions" },
  { id: "timer-demo", label: "Timer Surface" },
  { id: "progression", label: "Trajectory" },
  { id: "soundscapes", label: "Soundscapes" },
  { id: "faq", label: "FAQ" },
];

export const TubelightNavbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Navbar Blur Fade */}
      <div className="fixed top-0 left-0 right-0 h-28 z-40 pointer-events-none bg-gradient-to-b from-[#030712]/90 via-[#030712]/50 to-transparent backdrop-blur-[4px]" />

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[calc(100vw-2rem)]">
        <nav className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-[#0B1020]/80 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {/* Logo Mark */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-white hover:text-accent transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#7C5CFF]" />
            <span className="font-mono text-sm font-semibold tracking-tight hidden sm:inline">
              FOCUS<span className="text-accent">NEBULA</span>
            </span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                    isActive ? "text-white" : "text-textMuted hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="minimalNavLamp"
                      className="absolute inset-0 bg-primary/15 rounded-full border border-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-2 ml-1">
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/login")}
              className="text-xs py-1.5 px-4 font-medium"
            >
              <span>Login</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-textMuted hover:bg-white/10 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 p-4 rounded-3xl bg-[#0B1020]/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-primary/15 text-white border border-primary/30"
                    : "text-textMuted hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </header>

    </>
  );
};
