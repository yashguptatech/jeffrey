"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { IslandHotspot } from "@/data/story";

function GuidedCamera({ target }: { target: [number, number, number] }) {
  useFrame(({ camera }) => {
    const desired = new THREE.Vector3(target[0], target[1], target[2]);
    camera.position.lerp(desired, 0.04);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

function IslandMesh({ hotspots, activeId }: { hotspots: IslandHotspot[]; activeId: string }) {
  const islandRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (islandRef.current) {
      islandRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.12) * 0.08;
    }
  });

  const route = useMemo(() => hotspots.map((hotspot) => hotspot.position), [hotspots]);

  return (
    <group>
      <mesh ref={islandRef} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.9, 2.4, 0.55, 48, 1]} />
        <meshStandardMaterial color="#3e7349" roughness={0.9} metalness={0.08} />
      </mesh>
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshStandardMaterial color="#0a2239" transparent opacity={0.78} />
      </mesh>
      {hotspots.map((hotspot) => {
        const isActive = hotspot.id === activeId;
        return (
          <mesh key={hotspot.id} position={hotspot.position}>
            <sphereGeometry args={[isActive ? 0.11 : 0.08, 20, 20]} />
            <meshStandardMaterial
              color={isActive ? "#ffddad" : "#c8b8ff"}
              emissive={isActive ? "#955f2a" : "#40306b"}
              emissiveIntensity={isActive ? 0.9 : 0.45}
            />
          </mesh>
        );
      })}
      <Line points={route} color="#d7c7ff" lineWidth={2} transparent opacity={0.88} />
    </group>
  );
}

export default function IslandScene({
  hotspots,
  activeId,
  guided,
}: {
  hotspots: IslandHotspot[];
  activeId: string;
  guided: boolean;
}) {
  const active = hotspots.find((hotspot) => hotspot.id === activeId) ?? hotspots[0];

  return (
    <Canvas camera={{ position: active.camera, fov: 55 }}>
      <color attach="background" args={["#040812"]} />
      <fog attach="fog" args={["#060c1a", 3, 10]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 2]} intensity={1} color="#93bfff" />
      <directionalLight position={[-2, 1, -1]} intensity={0.6} color="#ffe6b8" />
      <IslandMesh hotspots={hotspots} activeId={activeId} />
      {guided ? <GuidedCamera target={active.camera} /> : null}
      <OrbitControls enablePan={false} enableZoom={!guided} enableRotate autoRotate={!guided} />
    </Canvas>
  );
}
