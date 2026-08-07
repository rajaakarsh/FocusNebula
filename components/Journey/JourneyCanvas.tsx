"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { SpaceBackground } from './SpaceBackground';
import { OrbitPath, getJourneyCurve } from './OrbitPath';
import { CameraRig } from './CameraRig';
import { ProgressMarker } from './ProgressMarker';
import { Planet } from './Planet';
import { Preload, BakeShadows, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';

const curve = getJourneyCurve();
const planetsData = [
  { name: 'Mercury', hours: 0, color: '#8c8c8c', glowColor: '#cccccc', progress: 0.05 },
  { name: 'Venus', hours: 1, color: '#e3bb76', glowColor: '#ffcc77', progress: 0.15 },
  { name: 'Earth', hours: 2, color: '#2b82c9', glowColor: '#4cc9f0', progress: 0.25 },
  { name: 'Mars', hours: 3, color: '#c1440e', glowColor: '#ff5400', progress: 0.35 },
  { name: 'Jupiter', hours: 5, color: '#d39c7e', glowColor: '#ffaa88', progress: 0.5 },
  { name: 'Saturn', hours: 7, color: '#ead6b8', glowColor: '#ffeecc', progress: 0.65 },
  { name: 'Galaxy', hours: 10, color: '#7209b7', glowColor: '#f72585', progress: 0.9 },
];

export function JourneyCanvas() {
  return (
    <div className="absolute inset-0 z-0 bg-[#010204]">
      <Canvas
        shadows
        gl={{ 
          antialias: false, // Turn off default AA for performance, we can rely on post-processing if needed, or rely on high DPR
          powerPreference: "high-performance",
          alpha: false
        }}
        dpr={[1, 2]} // Limit DPR to 2 for performance
        camera={{ position: [0, 5, 10], fov: 60, near: 0.1, far: 1000 }}
      >
        <Suspense fallback={null}>
          <SpaceBackground />
          <OrbitPath />
          <ProgressMarker />
          <CameraRig />

          {/* Render Planets along the curve */}
          {planetsData.map((p, i) => {
            const pos = curve.getPointAt(p.progress);
            return (
              <Planet 
                key={p.name}
                name={p.name}
                hours={p.hours}
                color={p.color}
                glowColor={p.glowColor}
                position={pos}
                scale={i === planetsData.length - 1 ? 2.5 : 1 + Math.random() * 0.5}
              />
            );
          })}
          
          {/* Performance optimizations */}
          <Preload all />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
