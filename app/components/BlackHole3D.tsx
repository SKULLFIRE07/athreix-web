"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function DistortedCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
      <MeshDistortMaterial
        color="#000000"
        attach="material"
        distort={0.4} // Level of distortion
        speed={2} // Speed of the blob distortion
        roughness={0}
        metalness={1}
        wireframe={false}
      />
    </Sphere>
  );
}

function WireframeAura() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * -0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * -0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[3, 32, 32]}>
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
    </Sphere>
  );
}

export default function BlackHole3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#444" />
        <DistortedCore />
        <WireframeAura />
      </Canvas>
    </div>
  );
}
