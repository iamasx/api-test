import type { Metadata } from "next";
import Link from "next/link";

import { EventEntry } from "./_components/event-entry";
import { getCommandLogView } from "./_data/command-log-data";

export const metadata: Metadata = {
  title: "Command Log",
  description: "Chronological command log with event entries, tag pills, and a compact detail panel.",
};

export default function CommandLogPage() {
  const { events, summary } = getCommandLogView();

  return (
    <main className="min-h-screen bg-[#f4efe7]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        {/* Hero */}
        <section className="rounded-[2rem] bg-white/86 p-8 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              System Events
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Command Log
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              A chronological record of system events, tagged and timestamped for quick triage and review.
            </p>
          </div>

          {/* Summary stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Total</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.totalEvents}</p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">Errors</p>
              <p className="mt-1 text-2xl font-semibold text-rose-700">{summary.errorCount}</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">Warnings</p>
              <p className="mt-1 text-2xl font-semibold text-amber-700">{summary.warningCount}</p>
            </div>
          </div>
        </section>

        {/* Event log */}
        <section aria-labelledby="event-log-heading" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Chronological feed
              </p>
              <h2
                id="event-log-heading"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Recent events
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Events are ordered newest-first. Each entry shows its severity,
              associated tags, and an expandable detail section for deeper context.
            </p>
          </div>

          <div aria-label="Command log events" className="flex flex-col gap-4" role="list">
            {events.map((event) => (
              <EventEntry key={event.id} event={event} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
