"use client";

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Outlines } from '@react-three/drei';

interface PlanetProps {
  position: THREE.Vector3;
  color: string;
  name: string;
  hours: number;
  scale?: number;
  glowColor?: string;
}

export function Planet({ position, color, name, hours, scale = 1, glowColor = "#ffffff" }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      
      // Floating animation
      meshRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.5;

      // Hover scale interpolation
      const targetScale = hovered ? scale * 1.1 : scale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.8}
          metalness={0.2}
          emissive={hovered ? glowColor : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
        {hovered && <Outlines thickness={0.05} color={glowColor} />}
      </mesh>

      {/* Point light to cast soft glow onto nearby things */}
      <pointLight color={glowColor} intensity={hovered ? 2 : 0.5} distance={20} />

      {/* Label under planet */}
      <Html position={[0, -3.5, 0]} center zIndexRange={[100, 0]} distanceFactor={20}>
        <div className="flex flex-col items-center pointer-events-none" style={{ transition: 'all 0.3s', opacity: hovered ? 1 : 0.7 }}>
          <h3 className="text-white font-jetbrains font-bold uppercase tracking-[0.3em] text-xs mb-1 drop-shadow-md">
            {name}
          </h3>
          <div className="text-[10px] font-medium tracking-wider" style={{ color: glowColor }}>
            {hours} HR
          </div>
        </div>
      </Html>
    </group>
  );
}
