"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import HeroSection from "@/components/scenes/HeroSection";
import NarrativeScopeSection from "@/components/scenes/NarrativeScopeSection";
import PeopleNetworkSection from "@/components/scenes/PeopleNetworkSection";
import IslandMapSection from "@/components/scenes/IslandMapSection";
import TestimonialsSection from "@/components/scenes/TestimonialsSection";
import LegacySection from "@/components/scenes/LegacySection";
import { useExperienceMode } from "@/hooks/useExperienceMode";

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const GLITCH_PULSE_INTERVAL_MS = 1800;
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [legacyPulse, setLegacyPulse] = useState(false);

  const { allowHeavy3d } = useExperienceMode();

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 130, damping: 32 });

  const heroParallax = useTransform(smoothProgress, [0, 0.24], [0, -180]);
  const peopleShift = useTransform(smoothProgress, [0.2, 0.46], [120, 0]);
  const mapShift = useTransform(smoothProgress, [0.42, 0.68], [130, 0]);
  const legacyOpacity = useTransform(smoothProgress, [0.7, 1], [1, 0.35]);

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

  return (
    <div ref={wrapperRef} className="relative overflow-x-hidden bg-black text-zinc-100">
      <motion.div className="progress" style={{ scaleX: smoothProgress }} />

      <motion.div
        className="cursor-orb pointer-events-none"
        animate={{ x: mouse.x - 12, y: mouse.y - 12 }}
        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.25 }}
      />

      <HeroSection heroParallax={heroParallax} allowHeavy3d={allowHeavy3d} />
      <NarrativeScopeSection />

      <motion.div style={{ y: peopleShift }}>
        <PeopleNetworkSection allowHeavy3d={allowHeavy3d} />
      </motion.div>

      <motion.div style={{ y: mapShift }}>
        <IslandMapSection allowHeavy3d={allowHeavy3d} />
      </motion.div>

      <TestimonialsSection />
      <LegacySection legacyOpacity={legacyOpacity} legacyPulse={legacyPulse} />
    </div>
  );
}
