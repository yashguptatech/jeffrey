"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { PersonProfile } from "@/data/story";

function NetworkNodes({ people, activeId }: { people: PersonProfile[]; activeId: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.18;
    }
  });

  const active = useMemo(() => people.find((person) => person.id === activeId), [people, activeId]);

  return (
    <group ref={groupRef}>
      {people.map((person) => {
        const isActive = person.id === activeId;
        return (
          <mesh key={person.id} position={person.position}>
            <sphereGeometry args={[isActive ? 0.14 : 0.1, 24, 24]} />
            <meshStandardMaterial
              color={isActive ? "#f8d2ff" : "#9ab0ff"}
              emissive={isActive ? "#6b2f9f" : "#2a2250"}
              emissiveIntensity={isActive ? 0.85 : 0.35}
            />
          </mesh>
        );
      })}

      {active
        ? active.links.map((linkId) => {
            const linked = people.find((person) => person.id === linkId);
            if (!linked) {
              return null;
            }
            return (
              <Line
                key={`${active.id}-${linked.id}`}
                points={[active.position, linked.position]}
                color="#cab4ff"
                lineWidth={1.6}
                transparent
                opacity={0.92}
              />
            );
          })
        : null}
    </group>
  );
}

export default function PeopleScene({
  people,
  activeId,
}: {
  people: PersonProfile[];
  activeId: string;
}) {
  return (
    <Canvas camera={{ position: [0, 0.2, 3.4], fov: 56 }}>
      <color attach="background" args={["#06060d"]} />
      <ambientLight intensity={0.42} />
      <pointLight position={[2.2, 1.8, 2.2]} intensity={1.25} color="#8a67ff" />
      <pointLight position={[-1.8, -0.7, 1.1]} intensity={0.7} color="#5ad8ff" />
      <Stars radius={25} depth={30} count={800} factor={1.3} fade speed={0.5} />
      <NetworkNodes people={people} activeId={activeId} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
    </Canvas>
  );
}
