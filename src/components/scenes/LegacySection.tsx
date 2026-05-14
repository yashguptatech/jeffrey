"use client";

import { motion, MotionValue } from "framer-motion";
import { legacySignals } from "@/data/story";

export default function LegacySection({
  legacyOpacity,
  legacyPulse,
}: {
  legacyOpacity: MotionValue<number>;
  legacyPulse: boolean;
}) {
  return (
    <motion.section className="section-pad legacy" style={{ opacity: legacyOpacity }}>
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Legacy</p>
        <h2 className={`mt-4 text-5xl font-semibold leading-tight md:text-7xl ${legacyPulse ? "glitch" : ""}`}>
          Archive Integrity Compromised.
        </h2>
        <p className="mt-8 max-w-3xl text-zinc-300">
          As the scroll deepens, the polish collapses: typography fades, interfaces fracture, and
          the brochure voice can no longer suppress the record.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {legacySignals.map((signal) => (
            <div key={signal} className="collapse-card">
              {signal}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
