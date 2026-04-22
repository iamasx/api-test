import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonNoteCard } from "./_components/comparison-note-card";
import { RecommendationPanel } from "./_components/recommendation-panel";
import { ScenarioSummaryCard } from "./_components/scenario-summary-card";
import { getScenarioExplorerView } from "./_data/scenario-explorer-data";
import styles from "./scenario-explorer.module.css";

export const metadata: Metadata = {
  title: "Scenario Explorer",
  description:
    "Scenario explorer route for scenario summaries, comparison notes, and recommendation guidance.",
};

export default function ScenarioExplorerPage() {
  const view = getScenarioExplorerView();

  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        {/* Hero */}
        <section
          className={`${styles.surfaceCard} ${styles.heroPanel} rounded-[2rem] p-8 sm:p-10`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              {view.hero.eyebrow}
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.85fr)] xl:items-start">
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {view.hero.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {view.hero.description}
              </p>
            </div>

            <aside className={`${styles.heroAside} rounded-[1.75rem] p-5 sm:p-6`}>
              <div className="space-y-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-100/72">
                  Planning pulse
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  Scenario summaries, trade-offs, and recommendations in one view.
                </p>

                <div className="grid gap-3">
                  {view.metrics.map((metric) => (
                    <div key={metric.label} className={styles.heroMetricCard}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-white">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/72">
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Scenario summaries */}
        <section aria-labelledby="scenario-summaries" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Scenarios
              </p>
              <h2
                id="scenario-summaries"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Planning futures at a glance
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Each card captures a distinct future with its likelihood, impact,
              and the key factors that would drive it.
            </p>
          </div>

          <div
            aria-label="Scenario summaries"
            className={styles.scenarioGrid}
            role="list"
          >
            {view.scenarios.map((scenario) => (
              <ScenarioSummaryCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        </section>

        {/* Comparisons + Recommendations */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.9fr)]">
          <section aria-labelledby="comparison-notes" className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Comparison notes
                </p>
                <h2
                  id="comparison-notes"
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Cross-scenario trade-offs
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Notes that surface overlaps, tensions, and shared
                dependencies between scenarios.
              </p>
            </div>

            <div className={styles.noteList}>
              {view.comparisons.map((note) => (
                <ComparisonNoteCard key={note.id} note={note} />
              ))}
            </div>
          </section>

          <RecommendationPanel recommendations={view.recommendations} />
        </div>
      </div>
    </main>
  );
}
