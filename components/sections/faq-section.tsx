"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AccordionItem } from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <Badge variant="cyan" className="px-4 py-1">
          Frequently Asked Questions
        </Badge>
        <h2 className="font-sans text-3xl sm:text-5xl font-light text-white tracking-tight">
          Everything you need to know.
        </h2>
      </div>

      {/* Accordion List */}
      <div className="bg-[#121622]/60 rounded-3xl p-6 sm:p-10 border border-white/10 backdrop-blur-xl">
        {FAQ_ITEMS.map((item, idx) => (
          <AccordionItem
            key={idx}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === idx}
            onToggle={() => handleToggle(idx)}
          />
        ))}
      </div>
    </section>
  );
};
