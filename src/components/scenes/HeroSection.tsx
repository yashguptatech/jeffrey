"use client";

import dynamic from "next/dynamic";
import { motion, MotionValue } from "framer-motion";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { WebGLGuard } from "@/components/shared/WebGLGuard";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="scene-shell shimmer" aria-hidden="true" />,
});

export default function HeroSection({
  heroParallax,
  allowHeavy3d,
}: {
  heroParallax: MotionValue<number>;
  allowHeavy3d: boolean;
}) {
  return (
    <section className="hero section-pad">
      <motion.div className="hero-canvas" style={{ y: heroParallax }}>
        <WebGLGuard
          fallback={
            <div className="scene-shell scene-fallback">
              <p>WebGL unavailable. Showing cinematic static backdrop.</p>
            </div>
          }
        >
          {allowHeavy3d ? (
            <HeroScene />
          ) : (
            <div className="scene-shell scene-fallback">
              <p>Mobile/reduced-motion mode active. 3D hero simplified.</p>
            </div>
          )}
        </WebGLGuard>
      </motion.div>

      <div className="noise-layer" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="reveal overline">Reputation Engineering / Since 1988</p>
        <h1 className="reveal headline mt-6 max-w-5xl">
          Reinventing Networking Since 1988.
          <span className="block text-zinc-500">Now with cinematic 3D storytelling optics.</span>
        </h1>
        <p className="reveal mt-8 max-w-2xl text-lg text-zinc-300/90">
          The Art of Strategic Relationships. Connecting powerful people globally through guided
          scenes, map-based timelines, and premium-grade narrative choreography.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-4">
          <MagneticButton className="border-zinc-200/70 bg-zinc-100/10">
            Request Redemption Deck
          </MagneticButton>
          <MagneticButton className="border-zinc-700 bg-zinc-900/60">
            View Crisis Timeline
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
