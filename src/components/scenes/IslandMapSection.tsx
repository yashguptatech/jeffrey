"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { islandHotspots } from "@/data/story";
import { WebGLGuard } from "@/components/shared/WebGLGuard";

const IslandScene = dynamic(() => import("@/components/three/IslandScene"), {
  ssr: false,
  loading: () => <div className="scene-shell shimmer" aria-hidden="true" />,
});

export default function IslandMapSection({ allowHeavy3d }: { allowHeavy3d: boolean }) {
  const [activeHotspotId, setActiveHotspotId] = useState(islandHotspots[0]?.id ?? "");
  const [guidedMode, setGuidedMode] = useState(true);

  const active = useMemo(
    () => islandHotspots.find((spot) => spot.id === activeHotspotId) ?? islandHotspots[0],
    [activeHotspotId],
  );

  return (
    <section className="section-pad border-y border-zinc-900 bg-zinc-950/80">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.1fr]">
        <article className="reveal glass p-8">
          <p className="kicker">Island Journey</p>
          <h2 className="section-title mt-4">Guided 3D map for route-based storytelling</h2>
          <p className="mt-4 text-zinc-300">
            Navigate hotspots tied to arrivals, meetings, and timeline incidents. Guided mode keeps
            the narrative route, while exploration mode unlocks free camera orbit.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {islandHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                className={`route-chip ${hotspot.id === active?.id ? "active" : ""}`}
                onClick={() => setActiveHotspotId(hotspot.id)}
              >
                {hotspot.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="mode-toggle mt-5"
            aria-pressed={!guidedMode}
            onClick={() => setGuidedMode((value) => !value)}
          >
            {guidedMode ? "Switch to free exploration" : "Switch to guided story route"}
          </button>

          {active ? (
            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 text-zinc-300">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Current hotspot</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-100">{active.name}</h3>
              <p className="mt-3">{active.event}</p>
            </div>
          ) : null}
        </article>

        <div className="reveal scene-panel">
          <WebGLGuard
            fallback={
              <div className="scene-shell scene-fallback">
                <p>3D map unavailable. Story route remains available as textual hotspots.</p>
              </div>
            }
          >
            {allowHeavy3d ? (
              <IslandScene hotspots={islandHotspots} activeId={active?.id ?? ""} guided={guidedMode} />
            ) : (
              <div className="scene-shell scene-fallback">
                <p>Mobile/reduced mode active. Guided hotspot details are still interactive.</p>
              </div>
            )}
          </WebGLGuard>
        </div>
      </div>
    </section>
  );
}
