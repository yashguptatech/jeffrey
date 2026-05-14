"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { peopleProfiles } from "@/data/story";
import { WebGLGuard } from "@/components/shared/WebGLGuard";

const PeopleScene = dynamic(() => import("@/components/three/PeopleScene"), {
  ssr: false,
  loading: () => <div className="scene-shell shimmer" aria-hidden="true" />,
});

export default function PeopleNetworkSection({ allowHeavy3d }: { allowHeavy3d: boolean }) {
  const [activePersonId, setActivePersonId] = useState(peopleProfiles[0]?.id ?? "");

  const activePerson = useMemo(
    () => peopleProfiles.find((person) => person.id === activePersonId) ?? peopleProfiles[0],
    [activePersonId],
  );

  return (
    <section className="section-pad bg-black/85">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_1fr]">
        <article className="reveal glass p-8">
          <p className="kicker">People Involved</p>
          <h2 className="section-title mt-4">A stylized network of influence primitives</h2>
          <p className="mt-4 text-zinc-300">
            Hover, focus, or click a profile to reveal relationship type, region, and timeline role.
          </p>
          <div className="mt-6 grid gap-3">
            {peopleProfiles.map((person) => {
              const isActive = person.id === activePerson?.id;
              return (
                <button
                  key={person.id}
                  type="button"
                  className={`person-card ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setActivePersonId(person.id)}
                  onFocus={() => setActivePersonId(person.id)}
                  onClick={() => setActivePersonId(person.id)}
                >
                  <span>
                    {person.name} — {person.role}
                  </span>
                  <span className="text-zinc-400">{person.relationshipType}</span>
                </button>
              );
            })}
          </div>
          {activePerson ? (
            <div className="mt-6 space-y-2 text-sm text-zinc-300" aria-live="polite">
              <p>
                <strong>Region:</strong> {activePerson.region}
              </p>
              <p>
                <strong>Timeline relevance:</strong> {activePerson.timelineRelevance}
              </p>
              <p>
                <strong>Direct links:</strong> {activePerson.links.join(", ")}
              </p>
            </div>
          ) : null}
        </article>

        <div className="reveal scene-panel">
          <WebGLGuard
            fallback={
              <div className="scene-shell scene-fallback">
                <p>Network visualization unavailable. Use profile cards for full story context.</p>
              </div>
            }
          >
            {allowHeavy3d ? (
              <PeopleScene people={peopleProfiles} activeId={activePerson?.id ?? ""} />
            ) : (
              <div className="scene-shell scene-fallback">
                <p>Low-power mode: profile-driven network view enabled.</p>
              </div>
            )}
          </WebGLGuard>
        </div>
      </div>
    </section>
  );
}
