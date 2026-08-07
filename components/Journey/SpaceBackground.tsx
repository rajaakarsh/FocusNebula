"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles, Stars } from '@react-three/drei';

export function SpaceBackground() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate the entire starfield slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.02;
      groupRef.current.rotation.x -= delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={['#010204']} />
      
      {/* Background ambient light */}
      <ambientLight intensity={0.1} />

      {/* 
        Stars: 
        radius: distance from center
        depth: depth of the star field
        count: number of stars
        factor: size factor
        saturation: color saturation (0 = white stars, 1 = colored stars)
      */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      <Stars 
        radius={150} 
        depth={50} 
        count={2000} 
        factor={6} 
        saturation={0.5} 
        fade 
        speed={0.5} 
      />

      {/* Subtle floating particles near the camera */}
      <Sparkles 
        count={300} 
        scale={50} 
        size={2} 
        speed={0.2} 
        opacity={0.3} 
        color="#c7b8ff" 
      />
      
      {/* Deep space colored nebula hints using large soft point lights */}
      <pointLight position={[50, 50, -100]} color="#4cc9f0" intensity={2} distance={300} decay={2} />
      <pointLight position={[-50, -50, -150]} color="#7209b7" intensity={3} distance={400} decay={2} />
    </group>
  );
}
