"use client";

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function OrbitPath() {
  const lineRef = useRef<THREE.Line>(null);

  const curve = useMemo(() => {
    // Create a very long, sweeping curve for the journey path
    // It should snake through space
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(20, -5, -30),
      new THREE.Vector3(-10, 10, -70),
      new THREE.Vector3(30, -10, -120),
      new THREE.Vector3(-20, 20, -180),
      new THREE.Vector3(40, -5, -250),
      new THREE.Vector3(-30, 15, -320),
      new THREE.Vector3(50, -20, -400),
      new THREE.Vector3(0, 0, -500),
    ]);
  }, []);

  const points = useMemo(() => curve.getPoints(500), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    if (lineRef.current) {
      // Animate the dash offset to make the path look alive
      const material = lineRef.current.material as THREE.LineDashedMaterial;
      material.dashOffset -= 0.05;
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineDashedMaterial
        color="#3ccbff"
        linewidth={1}
        dashSize={1}
        gapSize={2}
        opacity={0.4}
        transparent
        depthWrite={false}
      />
    </line>
  );
}

// Export the curve so we can place planets and camera on it
export const getJourneyCurve = () => {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(20, -5, -30),
    new THREE.Vector3(-10, 10, -70),
    new THREE.Vector3(30, -10, -120),
    new THREE.Vector3(-20, 20, -180),
    new THREE.Vector3(40, -5, -250),
    new THREE.Vector3(-30, 15, -320),
    new THREE.Vector3(50, -20, -400),
    new THREE.Vector3(0, 0, -500),
  ]);
};
