"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-white/10 py-5 transition-colors">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left font-sans text-lg font-medium text-textPrimary hover:text-cyanAccent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyanAccent/50 rounded-lg p-1"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-textMuted"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-base text-textSecondary font-normal leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
