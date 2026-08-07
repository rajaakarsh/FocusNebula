"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useFocusStore } from '@/store/useFocusStore';
import { getJourneyCurve } from './OrbitPath';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

export function CameraRig() {
  const { stats } = useFocusStore();
  const { camera } = useThree();
  const curve = useMemo(() => getJourneyCurve(), []);
  
  // Create a smoothed target position for the camera to ease into
  const targetPos = useRef(new THREE.Vector3());
  const lookAtPos = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Determine progress on curve (0 to 1). Let's say 10 hours finishes the current path (can loop or extend later)
    const maxHours = 10;
    const progress = Math.min(stats.lifetimeFocusHours / maxHours, 0.99); // cap at 0.99 to have room to look ahead
    
    // Get the point on the curve for the current progress
    const currentPoint = curve.getPointAt(progress);
    // Get a point slightly ahead to look at
    const aheadPoint = curve.getPointAt(Math.min(progress + 0.05, 1));

    // Camera offset: slightly above and to the right/left of the path to see the marker and planets
    targetPos.current.copy(currentPoint).add(new THREE.Vector3(5, 5, 10));
    lookAtPos.current.copy(aheadPoint);

    // Smoothly interpolate camera position and rotation
    camera.position.lerp(targetPos.current, 0.05);
    
    // Smooth lookAt: we can't directly lerp lookAt easily without quaternions
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLookAt.lerp(lookAtPos.current, 0.05);
    camera.lookAt(currentLookAt);
  });

  return null;
}
