"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        "FocusNebula's quiet cosmic interface stopped my urge to check tab notifications every 5 minutes. My study sessions jumped from 40m to 2.5 hours easily.",
      author: "Aarav Sharma",
      role: "Computer Science Scholar",
      faction: "Spacewalkers",
      rating: 5,
    },
    {
      quote:
        "The telemetry progress system gives me tangible feedback for deep work without annoying popups. It feels like a high-end terminal for my brain.",
      author: "Elena Rostova",
      role: "Systems Engineer",
      faction: "Pilots",
      rating: 5,
    },
    {
      quote:
        "Clean, ultra-fast, and zero fluff. The built-in ambient soundscapes and dark aesthetic are perfection for night concentration.",
      author: "Devon Vance",
      role: "Medical Student",
      faction: "Spacewalkers",
      rating: 5,
    },
  ];

  return (
    <section className="py-28 px-4 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="cyan" className="px-4 py-1">
          Learner Reviews
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Built for quiet concentration.
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <Card variant="glass" className="h-full p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-primary/30" />

                <p className="text-sm text-textMuted leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-sans text-sm font-medium text-white">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-textMuted">{t.role}</div>
                </div>

                <span className="font-mono text-[10px] uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                  {t.faction}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
