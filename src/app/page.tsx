"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function DistortedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ROTATION_SPEED_Y = 0.13;
  const ROTATION_X_WAVE_FREQUENCY = 0.2;
  const ROTATION_AMPLITUDE_X = 0.12;
  const FLOAT_SPEED = 0.7;
  const FLOAT_AMPLITUDE = 0.05;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * ROTATION_SPEED_Y;
      meshRef.current.rotation.x =
        Math.sin(t * ROTATION_X_WAVE_FREQUENCY) * ROTATION_AMPLITUDE_X;
      meshRef.current.position.y = Math.sin(t * FLOAT_SPEED) * FLOAT_AMPLITUDE;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 6]} />
      <meshStandardMaterial
        color="#8ea0ff"
        wireframe
        metalness={0.9}
        roughness={0.2}
        emissive="#200035"
        emissiveIntensity={0.75}
      />
    </mesh>
  );
}

function MagneticButton({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      className={`magnetic rounded-full border px-5 py-3 text-sm uppercase tracking-[0.26em] ${className ?? ""}`}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.18,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.18,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      type="button"
    >
      {children}
    </motion.button>
  );
}

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const GLITCH_PULSE_INTERVAL_MS = 1800;
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [legacyPulse, setLegacyPulse] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 32 });
  const heroParallax = useTransform(smoothProgress, [0, 0.2], [0, -180]);
  const legacyOpacity = useTransform(smoothProgress, [0.65, 1], [1, 0.35]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 1.1,
        ease: "power3.out",
      });
    }, wrapperRef);

    const interval = setInterval(
      () => setLegacyPulse((value) => !value),
      GLITCH_PULSE_INTERVAL_MS,
    );

    const onMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      ctx.revert();
      clearInterval(interval);
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const testimonials = useMemo(
    () => [
      "Changed the way I think about islands.",
      "A masterclass in strategic introductions.",
      "He definitely knew everybody. Somehow all at once.",
    ],
    [],
  );

  return (
    <div ref={wrapperRef} className="relative overflow-x-hidden bg-black text-zinc-100">
      <motion.div className="progress" style={{ scaleX: smoothProgress }} />

      <motion.div
        className="cursor-orb pointer-events-none"
        animate={{ x: mouse.x - 12, y: mouse.y - 12 }}
        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.25 }}
      />

      <section className="hero section-pad">
        <motion.div className="hero-canvas" style={{ y: heroParallax }}>
          <Canvas camera={{ position: [0, 0, 3.5], fov: 55 }}>
            <ambientLight intensity={0.45} />
            <directionalLight color="#8e5dff" position={[2, 2, 3]} intensity={1.2} />
            <DistortedGlobe />
            <Stars radius={24} depth={35} count={2000} factor={2.5} fade speed={0.8} />
          </Canvas>
        </motion.div>

        <div className="noise-layer" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="reveal overline">Reputation Engineering / Since 1988</p>
          <h1 className="reveal headline mt-6 max-w-5xl">
            Reinventing Networking Since 1988.
            <span className="block text-zinc-500">Legacy, Now in Premium Matte Black.</span>
          </h1>
          <p className="reveal mt-8 max-w-2xl text-lg text-zinc-300/90">
            The Art of Strategic Relationships. Connecting Powerful People Globally. A legacy
            beyond headlines, now with enhanced storytelling, selective memory, and luxury-grade
            optics.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <MagneticButton className="border-zinc-200/70 bg-zinc-100/10">Request Redemption Deck</MagneticButton>
            <MagneticButton className="border-zinc-700 bg-zinc-900/60">View Crisis Timeline</MagneticButton>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-zinc-900 bg-zinc-950/70">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="reveal glass p-8">
            <p className="kicker">About</p>
            <h2 className="section-title mt-4">The documentary cut nobody asked for.</h2>
            <p className="mt-4 text-zinc-300">
              Presented by a fictional agency with real confidence: part Netflix teaser voiceover,
              part failed TED stage monologue, part legal memo with cinematic color grading.
            </p>
            <p className="mt-4 text-zinc-400 italic">
              “When the narrative gets complicated, we call it visionary.”
            </p>
          </div>
          <div className="reveal glass p-8">
            <p className="kicker">Global Connections</p>
            <h3 className="mt-4 text-3xl font-semibold">Discretion-first world coverage</h3>
            <svg viewBox="0 0 600 320" className="mt-6 w-full">
              <path d="M20 260 C120 110, 250 110, 310 220 S510 300, 580 120" className="map-path" />
              <path d="M40 90 C220 260, 300 40, 560 210" className="map-path map-path-delayed" />
              <circle cx="120" cy="140" r="6" className="map-node" />
              <circle cx="310" cy="220" r="7" className="map-node" />
              <circle cx="560" cy="120" r="6" className="map-node" />
            </svg>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm uppercase tracking-[0.15em] text-zinc-300">
              <li>5000+ influential friendships</li>
              <li>127 private destinations</li>
              <li>Trusted by world leaders</li>
              <li>Discretion-first philosophy</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-black/90">
        <div className="mx-auto max-w-6xl">
          <p className="kicker reveal">Testimonials</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {testimonials.map((quote) => (
              <motion.article
                key={quote}
                className="reveal testimonial"
                whileHover={{ y: -8, rotateX: 4, rotateY: -3 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                <p className="text-lg">“{quote}”</p>
                <p className="mt-6 text-xs uppercase tracking-[0.24em] text-zinc-400">
                  Anonymous, definitely
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-zinc-950">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <div className="reveal">
            <p className="kicker">Philanthropy</p>
            <h2 className="section-title mt-4">Innovation initiatives with maximal buzzwords</h2>
            <ul className="mt-6 space-y-3 text-zinc-300">
              <li>• Future Leaders Program — scalable mentorship for optics-first growth.</li>
              <li>• Young Visionaries Initiative — disrupt tomorrow, audit never.</li>
              <li>• Ethical Networking Lab — trust frameworks for narrative resilience.</li>
            </ul>
          </div>
          <div className="reveal media-grid">
            {[
              "The Man Who Knew Everyone",
              "Reputation as a Service",
              "Can Branding Save Anyone?",
            ].map((headline) => (
              <motion.div key={headline} className="media-card" whileHover={{ scale: 1.04 }}>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Editorial Simulation</p>
                <h3 className="mt-2 text-2xl">{headline}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="section-pad legacy" style={{ opacity: legacyOpacity }}>
        <div className="mx-auto max-w-6xl">
          <p className="kicker">Legacy</p>
          <h2 className={`mt-4 text-5xl font-semibold leading-tight md:text-7xl ${legacyPulse ? "glitch" : ""}`}>
            Archive Integrity Compromised.
          </h2>
          <p className="mt-8 max-w-3xl text-zinc-300">
            As the scroll deepens, the polish collapses: typography fades, interfaces fracture,
            and the brochure voice can no longer suppress the record.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="collapse-card">VHS artifacts detected</div>
            <div className="collapse-card">Signal loss in timeline layer</div>
            <div className="collapse-card">Narrative rewrite failed</div>
          </div>
          <p className="mt-12 text-xs uppercase tracking-[0.24em] text-zinc-500">
            <span aria-label="Easter egg keyboard shortcut prompt">easter egg: press </span>
            <kbd className="rounded border border-zinc-700 px-2 py-1">
              ⌘/Ctrl + K
            </kbd>{" "}
            for absolutely no legal advice.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
