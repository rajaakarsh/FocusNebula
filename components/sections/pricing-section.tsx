"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

export const PricingSection: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const tiers = [
    {
      name: "Closed Beta Explorer",
      price: "$0",
      cadence: "Free During Beta",
      description: "Immediate access to the Spacewalkers deep work surface for early adopters.",
      features: [
        "Full Spacewalkers Cosmic Surface",
        "Orbital Timer & Checkpoints",
        "Rank XP & Milestone Progression",
        "Local Encrypted Session Logs",
        "Community Study Crews",
      ],
      cta: "Join Beta Now",
      popular: false,
      variant: "glass" as const,
    },
    {
      name: "Vanguard Founder Pass",
      price: "$29",
      cadence: "One-Time Lifetime Access",
      description: "Support early development and lock in lifetime access to all future surfaces.",
      features: [
        "Everything in Beta Explorer",
        "Unlocks Pilots Faction (v1.2)",
        "Custom Soundscape Equalizer",
        "Exclusive Vanguard Starwalker Badge",
        "Priority Feature Voting",
        "Lifetime Cloud Sync Backup",
      ],
      cta: "Claim Vanguard Pass",
      popular: true,
      variant: "glow" as const,
    },
  ];

  return (
    <section className="py-28 px-4 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="purple" className="px-4 py-1">
          Simple Transparent Access
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Invest in your deep work habits.
        </h2>
        <p className="text-base text-textMuted">
          No subscriptions, no hidden paywalls. FocusNebula Beta is free for authorized learners.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {tiers.map((tier, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <Card
              variant={tier.variant}
              className="h-full p-8 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden"
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-accent text-white font-mono text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-sans text-2xl font-medium text-white">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-textMuted leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-5xl font-light text-white tracking-tight">
                    {tier.price}
                  </span>
                  <span className="font-mono text-xs text-textMuted uppercase tracking-wider">
                    / {tier.cadence}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-textMuted">
                      <div className="p-0.5 rounded-full bg-primary/20 text-accent">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Button
                  variant={tier.popular ? "primary" : "ghost"}
                  size="lg"
                  className="w-full"
                  onClick={() => setAuthModalOpen(true)}
                >
                  {tier.cta}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

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
