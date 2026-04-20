import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lab Notebook",
  description:
    "Notebook route shell for experiment entries, observation panels, and summary callouts.",
};

const shellSections = [
  "Experiment entries will stack as notebook cards with owners, windows, and objectives.",
  "Observation panels will expand field notes, anomalies, and next checks for each session.",
  "Status summaries will call out stable signals, watch items, and blocked dependencies.",
];

export default function LabNotebookPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe5_0%,#efe4d6_48%,#e7d8c7_100%)] px-6 py-12 text-stone-950 sm:px-10 lg:px-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-[rgba(255,250,244,0.84)] p-8 shadow-[0_20px_80px_rgba(68,42,22,0.12)] backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-amber-900/15 bg-amber-700/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-amber-950">
                Lab notebook
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Notebook shell for experiments, observations, and status callouts
              </h1>
              <p className="max-w-2xl text-base leading-7 text-stone-700 sm:text-lg">
                This first pass establishes the dedicated route shell. Follow-up
                subtasks will populate the notebook with experiment records,
                observation panels, and summary signals.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-stone-900/12 bg-white/70 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-900/25 hover:bg-white"
            >
              Back to route index
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
          <article className="rounded-[1.75rem] border border-stone-900/10 bg-white/72 p-7 shadow-[0_16px_60px_rgba(68,42,22,0.08)]">
            <h2 className="text-lg font-semibold text-stone-950">
              Planned notebook panels
            </h2>
            <ol className="mt-5 space-y-4 text-sm leading-7 text-stone-700 sm:text-base">
              {shellSections.map((section, index) => (
                <li
                  key={section}
                  className="flex gap-4 rounded-2xl border border-stone-900/8 bg-stone-50/80 px-4 py-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700/10 text-sm font-semibold text-amber-950">
                    {index + 1}
                  </span>
                  <span>{section}</span>
                </li>
              ))}
            </ol>
          </article>

          <aside className="rounded-[1.75rem] border border-stone-900/10 bg-[rgba(77,48,31,0.92)] p-7 text-amber-50 shadow-[0_16px_60px_rgba(43,24,13,0.25)]">
            <h2 className="text-lg font-semibold text-white">Route status</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="rounded-2xl border border-emerald-300/18 bg-emerald-300/10 p-4">
                <dt className="font-medium text-emerald-100">Availability</dt>
                <dd className="mt-1 leading-6 text-amber-50/90">
                  The route is live at <code>/lab-notebook</code>.
                </dd>
              </div>
              <div className="rounded-2xl border border-amber-200/18 bg-amber-200/10 p-4">
                <dt className="font-medium text-amber-50">Next build step</dt>
                <dd className="mt-1 leading-6 text-amber-50/90">
                  Add mock entries, observations, and multi-panel notebook detail.
                </dd>
              </div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
