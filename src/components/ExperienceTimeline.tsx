"use client";

import { useState } from "react";
import { experienceStats, experiences } from "@/data/experience";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string>(experiences[0]?.id ?? "");

  return (
    <section className="space-y-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Experience Timeline
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Building products that move from prototype to scale without losing operational
          discipline.
        </h2>
        <p className="text-base leading-8 text-zinc-600">
          My recent work has centered on high-signal backend systems, collaboration-heavy product
          surfaces, and delivery pipelines that let teams ship more often with less risk.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {experienceStats.map((stat) => (
          <AnimatedCounter key={stat.label} {...stat} />
        ))}
      </div>

      <div className="relative pl-6 before:absolute before:bottom-4 before:left-[11px] before:top-4 before:w-px before:bg-zinc-200">
        <div className="space-y-5">
          {experiences.map((experience) => {
            const isExpanded = expandedId === experience.id;

            return (
              <article key={experience.id} className="relative pl-6">
                <span
                  className={`absolute left-[-2px] top-7 h-4 w-4 rounded-full border-4 transition-colors ${
                    isExpanded ? "border-amber-400 bg-zinc-950" : "border-white bg-zinc-400"
                  }`}
                />

                <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200/70 bg-white/85 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.85)] backdrop-blur">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? "" : experience.id)}
                    className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        <span>{experience.period}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                        <span>{experience.company}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
                          {experience.role}
                        </h3>
                        <p className="mt-2 max-w-2xl text-base leading-7 text-zinc-600">
                          {experience.summary}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span
                      className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-transform ${
                        isExpanded ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="grid gap-8 border-t border-zinc-200/80 px-6 py-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
                      <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
                          Role Highlights
                        </p>
                        <ul className="space-y-3">
                          {experience.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-3 text-sm leading-7 text-zinc-600"
                            >
                              <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-[1.5rem] bg-zinc-950 p-5 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">
                          Key Achievement
                        </p>
                        <p className="mt-4 text-lg font-medium leading-8">
                          {experience.keyAchievement}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
