"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.18) * 0.22;
    camera.position.y = 0.15 + Math.cos(t * 0.24) * 0.18;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function HeroCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25;
      coreRef.current.rotation.x = Math.sin(t * 0.35) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.16;
      ringRef.current.rotation.y = t * 0.09;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.18, 8]} />
        <meshStandardMaterial
          color="#90a6ff"
          wireframe
          emissive="#210042"
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.65, 0.04, 32, 180]} />
        <meshStandardMaterial color="#d8c7ff" emissive="#5b2b92" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function DustField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i += 1) {
      const seedX = Math.sin(i * 12.9898) * 43758.5453;
      const seedY = Math.sin((i + 101) * 4.1414) * 12345.6789;
      const seedZ = Math.sin((i + 211) * 9.7231) * 67890.1234;
      arr[i * 3] = (seedX - Math.floor(seedX) - 0.5) * 9;
      arr[i * 3 + 1] = (seedY - Math.floor(seedY) - 0.5) * 6;
      arr[i * 3 + 2] = (seedZ - Math.floor(seedZ) - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#b8a4ff" size={0.025} opacity={0.45} transparent />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.2, 3.6], fov: 52 }}>
      <color attach="background" args={["#05050b"]} />
      <fog attach="fog" args={["#080713", 3, 9]} />
      <ambientLight intensity={0.36} />
      <directionalLight color="#8b5dff" intensity={1.1} position={[1.6, 2.2, 2.1]} />
      <directionalLight color="#5ed6ff" intensity={0.45} position={[-2, 0.8, 1.2]} />
      <Stars radius={30} depth={45} count={2600} factor={2.2} fade speed={0.7} />
      <HeroCore />
      <DustField />
      <CameraDrift />
    </Canvas>
  );
}
