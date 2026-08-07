"use client";

import { useFrame } from '@react-three/fiber';
import { useFocusStore } from '@/store/useFocusStore';
import { getJourneyCurve } from './OrbitPath';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Html } from '@react-three/drei';

export function ProgressMarker() {
  const { stats } = useFocusStore();
  const curve = useMemo(() => getJourneyCurve(), []);
  const groupRef = useRef<THREE.Group>(null);
  
  // Interpolation targets
  const targetPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!groupRef.current) return;

    const maxHours = 10;
    const progress = Math.min(stats.lifetimeFocusHours / maxHours, 1);
    
    // Get position on curve
    const currentPoint = curve.getPointAt(progress);
    targetPos.current.copy(currentPoint);

    // Smooth movement
    groupRef.current.position.lerp(targetPos.current, 0.05);

    // Add a floating bob effect
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Gold Dot */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1} />
      </mesh>
      
      {/* Gold line (could use a cylinder or line, cylinder is easiest) */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.5} />
      </mesh>

      {/* YOU ARE HERE Label */}
      <Html position={[0, 3.5, 0]} center zIndexRange={[100, 0]} distanceFactor={15}>
        <div className="flex flex-col items-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md border border-[#FFD700]/30 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,215,0,0.2)]">
            <h3 className="text-[#FFD700] font-jetbrains font-bold uppercase tracking-[0.2em] text-[10px] whitespace-nowrap">
              You Are Here
            </h3>
          </div>
        </div>
      </Html>
    </group>
  );
}
