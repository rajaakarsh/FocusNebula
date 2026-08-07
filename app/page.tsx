"use client";

import { useState, useCallback } from "react";
import { BgCanvas } from "@/components/landing/BgCanvas";
import { BgOverlay, NavTopFade } from "@/components/landing/BgOverlay";
import { TubelightNav, SectionId } from "@/components/landing/TubelightNav";
import { HomeSection } from "@/components/landing/sections/HomeSection";
import { AboutSection } from "@/components/landing/sections/AboutSection";
import { PilotsSection } from "@/components/landing/sections/PilotsSection";
import { SpacewalkersSection } from "@/components/landing/sections/SpacewalkersSection";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const navigate = useCallback((id: string) => {
    setActiveSection(id as SectionId);
    // Scroll to top of section on navigate
    setTimeout(() => {
      const el = document.getElementById(`section-${id}`);
      if (el) el.scrollTop = 0;
    }, 0);
  }, []);

  return (
    <>
      {/* Layer 0: WebGL animated nebula */}
      <BgCanvas />

      {/* Layer 1: CSS gradient overlay */}
      <BgOverlay />

      {/* Layer 2: Nav top fade */}
      <NavTopFade />

      {/* Layer 3: Tubelight pill navbar */}
      <TubelightNav
        activeSection={activeSection}
        onNavigate={navigate}
      />

      {/* Layer 4: Page Sections — React controls active class via prop */}
      <HomeSection onNavigate={navigate} isActive={activeSection === "home"} />
      <AboutSection isActive={activeSection === "about"} />
      <PilotsSection onNavigate={navigate} isActive={activeSection === "pilots"} />
      <SpacewalkersSection onNavigate={navigate} isActive={activeSection === "spacewalkers"} />
    </>
  );
}
