"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { Users, Orbit, Sparkles } from "lucide-react";

interface CrewMember {
  id: string;
  name: string;
  rank: string;
  route: string;
  sessionTime: string;
  isUser?: boolean;
}

interface CrewManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userTrack: string;
}

export const CrewManifestModal: React.FC<CrewManifestModalProps> = ({
  isOpen,
  onClose,
  userTrack,
}) => {
  const crewMembers: CrewMember[] = [
    {
      id: "user",
      name: "YOU",
      rank: "Commander",
      route: `Studying ${userTrack}`,
      sessionTime: "00:24:50",
      isUser: true,
    },
    {
      id: "c1",
      name: "Elena R.",
      rank: "Cosmonaut",
      route: "En route from Mars",
      sessionTime: "01:12:30",
    },
    {
      id: "c2",
      name: "Aarav S.",
      rank: "Explorer",
      route: "En route from Jupiter",
      sessionTime: "00:45:15",
    },
    {
      id: "c3",
      name: "Devon V.",
      rank: "Starwalker",
      route: "Deep Space Orbit",
      sessionTime: "02:05:00",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crew Manifest"
      className="max-w-3xl"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Badge variant="purple" pulse>
            Active Crew Surface • Spacewalkers Faction
          </Badge>
          <span className="font-mono text-xs text-textMuted flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-primary" /> 4 Members Active
          </span>
        </div>

        {/* Crew Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {crewMembers.map((member) => (
            <div
              key={member.id}
              className={`p-5 rounded-2xl border transition-all ${
                member.isUser
                  ? "bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(124,92,255,0.2)]"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center font-mono text-xs font-bold text-white">
                    {member.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-sans text-sm font-medium text-white flex items-center gap-1.5">
                      <span>{member.name}</span>
                      {member.isUser && (
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-primary text-white">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-textMuted">
                      {member.rank}
                    </div>
                  </div>
                </div>

                <div className="font-mono text-sm text-secondary font-semibold">
                  {member.sessionTime}
                </div>
              </div>

              <div className="font-mono text-xs text-accent pt-2 border-t border-white/5 flex items-center gap-1">
                <Orbit className="w-3 h-3 text-secondary" />
                <span className="truncate">{member.route}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-textMuted">
            Crew seating synchronizes quiet focus metrics across active study partners.
          </p>
        </div>
      </div>
    </Modal>
  );
};
