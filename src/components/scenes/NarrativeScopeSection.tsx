"use client";

import { storyScope, timelineBeats } from "@/data/story";

export default function NarrativeScopeSection() {
  return (
    <section className="section-pad border-y border-zinc-900 bg-zinc-950/70">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <article className="reveal glass p-8">
          <p className="kicker">Scope Alignment</p>
          <h2 className="section-title mt-4">Narrative arc locked for cinematic storytelling</h2>
          <ul className="mt-6 space-y-3 text-zinc-300">
            {storyScope.narrativeArc.map((step) => (
              <li key={step} className="scope-chip">
                {step}
              </li>
            ))}
          </ul>
        </article>

        <article className="reveal glass p-8">
          <p className="kicker">Creative Constraints</p>
          <p className="mt-4 text-zinc-300">{storyScope.visualDirection}</p>
          <p className="mt-4 text-zinc-300">{storyScope.deviceSupport}</p>
          <p className="mt-4 text-zinc-300">{storyScope.performanceBudget}</p>
        </article>
      </div>

      <div className="mx-auto mt-10 max-w-6xl">
        <ol className="timeline-grid">
          {timelineBeats.map((beat) => (
            <li key={beat.id} className="reveal timeline-card">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{beat.id}</p>
              <h3 className="mt-3 text-xl font-semibold">{beat.title}</h3>
              <p className="mt-3 text-zinc-300">{beat.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
