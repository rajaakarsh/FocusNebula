"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmExit: () => void;
}

export const ExitModal: React.FC<ExitModalProps> = ({
  isOpen,
  onClose,
  onConfirmExit,
}) => {
  const [phraseInput, setPhraseInput] = useState<string>("");
  const requiredPhrase = "I CHOOSE TO ABANDON";

  const isConfirmed = phraseInput.trim() === requiredPhrase;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Abandon Focus Session?"
      className="max-w-md"
    >
      <div className="space-y-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-textMuted leading-relaxed">
            Ending your focus streak early will cancel telemetry tracking and reduce session rank XP.
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs font-semibold">
            50% XP Penalty Applies
          </div>
        </div>

        {/* Phrase Confirmation Input */}
        <div className="space-y-2 text-left bg-white/[0.02] p-4 rounded-2xl border border-white/10">
          <label className="font-mono text-[11px] text-textMuted uppercase tracking-wider block">
            Type phrase to confirm: <span className="text-white font-bold">{requiredPhrase}</span>
          </label>
          <input
            type="text"
            value={phraseInput}
            onChange={(e) => setPhraseInput(e.target.value)}
            placeholder="Type phrase here..."
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white font-mono placeholder:text-textMuted/50 focus:outline-none focus:border-rose-400"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="ghost"
            size="md"
            className="w-1/2"
            onClick={onClose}
          >
            Stay & Focus
          </Button>

          <Button
            variant="primary"
            size="md"
            disabled={!isConfirmed}
            className="w-1/2 bg-rose-600 hover:bg-rose-500 border-rose-400 text-white disabled:opacity-40"
            onClick={onConfirmExit}
          >
            Abandon
          </Button>
        </div>
      </div>
    </Modal>
  );
};
