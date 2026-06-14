"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function VortexParticles() {
  const count = 15000; 
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 40; // Massive spread to cover whole screen
      let y = (Math.random() - 0.5) * 40;
      let z = (Math.random() - 0.5) * 20;
      
      // Calculate 2D distance from the center (Z-axis)
      const dist2D = Math.sqrt(x * x + y * y);
      
      // Create a massive perfectly cylindrical void in the exact center!
      // This guarantees no dots will ever spawn behind or in front of the text.
      if (dist2D < 4.5) {
        // Push the dot radially outward to exactly radius 4.5
        const scale = 4.5 / dist2D;
        x *= scale;
        y *= scale;
      }
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotate strictly on the Z-axis (like a steering wheel).
      // Because our void is perfectly aligned with the Z-axis, the hole NEVER moves,
      // but all the dots swirl in a massive vortex around the center text!
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.03;
      
      // Add a tiny bit of subtle organic tilt that won't break the safe zone
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      pointsRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={2.5} color="#000" transparent opacity={0.6} sizeAttenuation={false} />
    </points>
  );
}

export default function Core3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5}>
          <VortexParticles />
        </Float>
      </Canvas>
    </div>
  );
}
