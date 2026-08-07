"use client";

import React, { useState } from "react";
import { Sparkles, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";

export const CtaBanner: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <Card variant="glow" className="p-10 sm:p-16 text-center space-y-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-gradient-to-r from-primary/20 via-secondary/15 to-transparent blur-[120px] pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-accent font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Ready to Enter Deep Focus?
          </div>

          <h2 className="font-sans text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight">
            Step into the surface. Master your craft.
          </h2>

          <p className="text-base sm:text-lg text-textMuted font-normal">
            Join thousands of scholars and engineers building high-value study habits inside FocusNebula Beta.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setAuthModalOpen(true)}
              className="px-10 group"
            >
              <span>Get Free Beta Access</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-textMuted pt-4 font-mono">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>No credit card required • Local encrypted privacy</span>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Access FocusNebula Beta"
      >
        <div className="text-center space-y-4">
          <p className="text-sm text-textMuted leading-relaxed">
            Connect your Google account to claim your Beta session token and start logging focus sessions instantly.
          </p>
          <div className="py-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => {
                setAuthModalOpen(false);
                alert("Google Beta session initiated!");
              }}
            >
              Continue with Google
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
