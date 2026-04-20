import type { Metadata } from "next";
import Link from "next/link";

import { ExperimentEntryCard } from "./_components/experiment-entry-card";
import { ObservationPanel } from "./_components/observation-panel";
import { StatusSummaryCard } from "./_components/status-summary-card";
import {
  experimentEntries,
  notebookSummaryMetrics,
  observationPanels,
} from "./_data/lab-notebook-data";

export const metadata: Metadata = {
  title: "Lab Notebook",
  description:
    "Notebook route shell for experiment entries, observation panels, and summary callouts.",
};

const watchListAccentClasses = {
  Stable: "border-emerald-300/35 bg-emerald-300/14 text-emerald-950",
  Watch: "border-amber-300/40 bg-amber-300/18 text-amber-950",
  Blocked: "border-rose-300/40 bg-rose-300/16 text-rose-950",
} as const;

export default function LabNotebookPage() {
  const observationCountByExperiment = observationPanels.reduce<
    Record<string, number>
  >((counts, panel) => {
    counts[panel.experimentId] = (counts[panel.experimentId] ?? 0) + 1;

    return counts;
  }, {});

  const priorityEntries = experimentEntries.filter(
    (entry) => entry.status !== "Stable",
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f6efe5_0%,#efe4d6_48%,#e7d8c7_100%)] px-6 py-12 text-stone-950 sm:px-10 lg:px-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_36%),radial-gradient(circle_at_top_right,rgba(120,113,108,0.18),transparent_32%)]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-[rgba(255,250,244,0.84)] p-8 shadow-[0_20px_80px_rgba(68,42,22,0.12)] backdrop-blur sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.8fr)]">
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="inline-flex w-fit rounded-full border border-amber-900/15 bg-amber-700/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-amber-950">
                  Lab notebook
                </span>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  Multi-panel notebook for experiment logs, field observations, and shift summaries
                </h1>
                <p className="max-w-3xl text-base leading-7 text-stone-700 sm:text-lg">
                  Review active experiment windows, compare observation notes,
                  and keep the shift-level watch items visible in one notebook
                  flow. Every panel on this route is driven by standalone mock
                  data so the experience ships independently.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-stone-900/12 bg-white/74 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-900/25 hover:bg-white"
                >
                  Back to route index
                </Link>
                <a
                  href="#lab-notebook-observations"
                  className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-stone-50 transition hover:bg-stone-800"
                >
                  Jump to observations
                </a>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-stone-900/10 bg-[rgba(77,48,31,0.92)] p-6 text-amber-50 shadow-[0_16px_60px_rgba(43,24,13,0.25)]">
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-50/62">
                    Notebook pulse
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    Stable signal coverage with one blocked rehearsal and two watch items.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-6 text-amber-50/82">
                  <p>
                    Shift handoff stays centered on the resonance sweep rerun
                    and the coolant manifold replacement window.
                  </p>
                  <p>
                    Observation packets below are ordered so investigators can
                    move from active anomalies into clean verification passes.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-2xl border border-white/8 bg-white/8 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50/58">
                      Coverage note
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      All four experiments have at least one attached
                      observation panel in the current notebook.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/8 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-50/58">
                      Next review
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Cross-team notebook review starts at 18:00 IST with
                      operations and facilities leads.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </header>

        <section aria-labelledby="lab-notebook-summary" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="inline-flex w-fit rounded-full border border-amber-900/15 bg-amber-700/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-amber-950">
                Shift summary
              </span>
              <h2
                id="lab-notebook-summary"
                className="text-3xl font-semibold tracking-tight text-stone-950"
              >
                Status summaries at a glance
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-stone-600">
              The notebook keeps the active run count, watch queue, and blocked
              dependencies visible before you drill into individual entries.
            </p>
          </div>

          <div
            aria-label="Notebook summaries"
            className="grid gap-4 md:grid-cols-3"
            role="list"
          >
            {notebookSummaryMetrics.map((metric) => (
              <div key={metric.id} role="listitem">
                <StatusSummaryCard metric={metric} />
              </div>
            ))}
          </div>
        </section>

        <div
          className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]"
          data-testid="lab-notebook-workspace"
        >
          <section aria-labelledby="lab-notebook-experiments" className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <span className="inline-flex w-fit rounded-full border border-stone-900/12 bg-white/55 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-stone-700">
                  Experiments
                </span>
                <h2
                  id="lab-notebook-experiments"
                  className="text-3xl font-semibold tracking-tight text-stone-950"
                >
                  Active notebook entries
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-stone-600">
                Each entry captures ownership, run window, current signal, and
                the context needed to interpret the linked observation panels.
              </p>
            </div>

            <div className="space-y-5">
              {experimentEntries.map((entry) => (
                <ExperimentEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>

          <aside className="space-y-5 xl:sticky xl:top-8 xl:self-start">
            <section className="rounded-[1.75rem] border border-stone-900/10 bg-white/72 p-6 shadow-[0_16px_60px_rgba(68,42,22,0.08)]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                    Watch queue
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                    Priority follow-up
                  </h2>
                </div>

                <ul className="space-y-3" role="list">
                  {priorityEntries.map((entry) => (
                    <li
                      key={entry.id}
                      className={`rounded-[1.35rem] border px-4 py-4 ${watchListAccentClasses[entry.status]}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">{entry.codename}</p>
                          <p className="mt-1 text-sm leading-6 opacity-85">
                            {entry.signal}
                          </p>
                        </div>
                        <span className="rounded-full bg-white/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-950">
                          {entry.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-stone-900/10 bg-white/72 p-6 shadow-[0_16px_60px_rgba(68,42,22,0.08)]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
                    Observation routing
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
                    Notebook links
                  </h2>
                </div>

                <ul className="space-y-3" role="list">
                  {experimentEntries.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-[1.35rem] border border-stone-900/8 bg-stone-50/80 px-4 py-4"
                    >
                      <p className="text-sm font-semibold text-stone-950">
                        {entry.codename}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        {observationCountByExperiment[entry.id] ?? 0} linked
                        observation panel
                        {observationCountByExperiment[entry.id] === 1 ? "" : "s"}
                        .
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </aside>
        </div>

        <section aria-labelledby="lab-notebook-observations" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="inline-flex w-fit rounded-full border border-stone-900/12 bg-white/55 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-stone-700">
                Observations
              </span>
              <h2
                id="lab-notebook-observations"
                className="text-3xl font-semibold tracking-tight text-stone-950"
              >
                Observation panels and anomaly notes
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-stone-600">
              Long-form note blocks stay attached to each experiment so the
              route reads like a working notebook instead of a disconnected
              dashboard.
            </p>
          </div>

          <div className="grid gap-5 2xl:grid-cols-2">
            {observationPanels.map((panel) => (
              <ObservationPanel key={panel.id} panel={panel} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
