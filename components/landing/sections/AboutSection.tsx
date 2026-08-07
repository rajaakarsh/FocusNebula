"use client";

import { GlowText } from "@/components/landing/GlowText";

interface AboutSectionProps {
  isActive: boolean;
}

export function AboutSection({ isActive }: AboutSectionProps) {
  return (
    <div id="section-about" className={`page-section${isActive ? " active" : ""}`}>
      <div
        className="login-wrap"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          maxWidth: 800,
          width: "100%",
        }}
      >
        <div
          className="card-headline"
          style={{ fontSize: 48, marginBottom: 24 }}
        >
          Experience a New Era of <GlowText text="Focus" />
        </div>
        <p className="desc-text">
          FocusNebula BETA is an exclusive digital academy where deep work meets
          aesthetic design. By stepping into our ranks during this closed beta,
          you commit to a lifestyle of discipline and continuous growth.
          Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
