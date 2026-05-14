"use client";

import { useEffect, useState } from "react";

export function useExperienceMode() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 900px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    sync();
    mobileQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);

    return () => {
      mobileQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  return {
    isMobile,
    prefersReducedMotion,
    allowHeavy3d: !isMobile && !prefersReducedMotion,
  };
}
