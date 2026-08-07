"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, Sparkles, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

export const HeroSection: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const handleSimulatedGoogleAuth = () => {
    setIsLoadingAuth(true);
    setTimeout(() => {
      setIsLoadingAuth(false);
      setAuthModalOpen(false);
      alert("Beta session authenticated! Welcome to FocusNebula.");
    }, 1200);
  };

  const scrollToFactions = () => {
    const el = document.getElementById("factions");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-36 pb-24 flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Soft Glowing Gradient Sphere */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      {/* Hero Container */}
      <div className="max-w-4xl mx-auto space-y-10 z-10">
        {/* Minimal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block"
        >
          <Badge variant="purple" pulse className="px-4 py-1 text-xs">
            Closed Beta • v1.0 Live
          </Badge>
        </motion.div>

        {/* Large Typography Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans text-5xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.04]"
        >
          Make focusing{" "}
          <span className="relative inline-block font-normal bg-gradient-to-b from-white via-[#E8E4FF] to-accent bg-clip-text text-transparent">
            effortless.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-textMuted max-w-2xl mx-auto font-normal leading-relaxed"
        >
          An atmospheric deep work surface engineered for absolute concentration. No noise, no intrusive notifications, pure infinite focus.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => setAuthModalOpen(true)}
            className="group px-8"
          >
            <span>Continue with Google</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button variant="ghost" size="lg" onClick={scrollToFactions} className="px-8">
            <span>Explore Factions</span>
          </Button>
        </motion.div>

        {/* Quiet Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-xs text-textMuted pt-1 font-mono"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Local Encrypted Session Storage</span>
        </motion.div>

        {/* Floating Glass Telemetry Panel (Linear Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-10 max-w-lg mx-auto"
        >
          <div className="relative p-6 rounded-3xl bg-[#0B1020]/75 border border-white/10 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.7)] text-left flex items-center gap-6 overflow-hidden">
            {/* Orbit Circle Graphic */}
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-primary/20" />
              <div className="absolute inset-1.5 rounded-full border border-secondary/30 animate-spin-slow" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-black font-bold text-xs shadow-[0_0_16px_rgba(124,92,255,0.4)]">
                ✦
              </div>
            </div>

            {/* Live Telemetry Info */}
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-textMuted">
                <span>ORBITAL DEEP WORK</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <div className="font-mono text-3xl font-light text-white tracking-wider">
                24:50
              </div>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary h-full w-[65%]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Trigger */}
      <motion.button
        onClick={scrollToFactions}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="mt-16 text-textMuted hover:text-white transition-colors focus:outline-none"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.button>

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Access FocusNebula Beta"
      >
        <div className="text-center space-y-4">
          <p className="text-sm text-textMuted leading-relaxed">
            Connect your account to lock in your rank progression, save custom focus study sessions, and join authorized study crews.
          </p>

          <div className="py-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoadingAuth}
              onClick={handleSimulatedGoogleAuth}
            >
              Continue with Google
            </Button>
          </div>

          <p className="text-xs text-textMuted">
            Closed Beta v1.0 • All study logs end-to-end encrypted
          </p>
        </div>
      </Modal>
    </section>
  );
};
