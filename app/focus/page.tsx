"use client";

import { JourneyCanvas } from "@/components/Journey/JourneyCanvas";
import { TimerCard } from "@/components/Timer/TimerCard";
import { FocusTimer } from "@/components/Timer/FocusTimer";
import { LeftSidebar } from "@/components/Sidebar/LeftSidebar";

export default function FocusJourneyPage() {
  return (
    <main className="relative min-h-screen bg-[#010204] text-white overflow-hidden selection:bg-[#3CCBFF] selection:text-black">
      {/* 3D Environment */}
      <JourneyCanvas />

      {/* Logic Components */}
      <FocusTimer />

      {/* UI Overlays */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <div className="pointer-events-auto">
          <LeftSidebar />
          <TimerCard />
        </div>
      </div>
    </main>
  );
}
