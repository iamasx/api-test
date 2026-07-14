import type { Metadata } from "next";
import Link from "next/link";

import {
  comparisonMetrics,
  forecastDeskOverview,
  forecastNotes,
  trendSnapshots,
} from "./_data/forecast-desk-data";

export const metadata: Metadata = {
  title: "Forecast Desk",
  description:
    "Standalone forecast desk route with trend snapshots, short forecast notes, and a compact metric comparison band.",
};

const snapshotToneStyles = {
  accelerating: "border-amber-300/30 bg-amber-300/12 text-amber-100",
  watch: "border-rose-300/30 bg-rose-300/12 text-rose-100",
  steady: "border-emerald-300/30 bg-emerald-300/12 text-emerald-100",
} as const;

const noteStateStyles = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  "follow-up": "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
} as const;

export default function ForecastDeskPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.16),transparent_30%),linear-gradient(180deg,#07111f_0%,#0c1729_52%,#111f34_100%)] px-6 py-12 text-slate-50 sm:px-10 lg:px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.11),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-28 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-300/8 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,248,235,0.09),rgba(15,23,42,0.18))] p-8 shadow-[0_32px_120px_rgba(2,6,23,0.42)] backdrop-blur sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-100/78">
                {forecastDeskOverview.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                {forecastDeskOverview.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {forecastDeskOverview.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#trend-snapshots"
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
                >
                  {forecastDeskOverview.primaryAction}
                </a>
                <a
                  href="#forecast-notes"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/35 hover:bg-white/12"
                >
                  {forecastDeskOverview.secondaryAction}
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-slate-900/60"
                >
                  Back to route index
                </Link>
              </div>
            </div>

            <aside className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.72),rgba(8,12,24,0.94))] p-6 shadow-[0_22px_70px_rgba(2,6,23,0.28)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Forecast posture
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Spend buffer on dwell and exception drift, not normal lane
                variance.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                {forecastDeskOverview.stats.map((stat) => (
                  <article
                    key={stat.label}
                    className="rounded-[1.35rem] border border-white/8 bg-white/5 px-4 py-4"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {stat.detail}
                    </p>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </header>

        <section
          aria-label="Metric comparison band"
          className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.76),rgba(7,12,24,0.92))] p-6 shadow-[0_28px_80px_rgba(3,7,18,0.26)]"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Comparison band
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Compare current, next 6h, and next day
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Keep the desk focused on shifts that materially change staffing or
              dock posture.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {comparisonMetrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.18))] px-5 py-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {metric.label}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Current
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {metric.current}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Next 6h
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {metric.nextWindow}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Next day
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {metric.nextDay}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {metric.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5" id="trend-snapshots">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Trend snapshots
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Read the movements that actually change the desk
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Each card pairs a short signal read with the action that follows
              from it.
            </p>
          </div>

          <div
            aria-label="Trend snapshots"
            className="grid gap-5 xl:grid-cols-3"
            role="list"
          >
            {trendSnapshots.map((snapshot) => (
              <article
                key={snapshot.id}
                className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,26,0.78),rgba(10,18,34,0.96))] p-6 shadow-[0_18px_55px_rgba(2,6,23,0.24)]"
                role="listitem"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {snapshot.title}
                  </h3>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${snapshotToneStyles[snapshot.tone]}`}
                  >
                    {snapshot.tone}
                  </span>
                </div>

                <p className="mt-4 text-3xl font-semibold text-white">
                  {snapshot.metricValue}
                </p>
                <p className="mt-2 text-sm text-amber-200">
                  {snapshot.change} · {snapshot.confidence}
                </p>
                <p className="mt-1 text-sm text-slate-400">{snapshot.window}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {snapshot.summary}
                </p>

                <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-300">
                  {snapshot.drivers.map((driver) => (
                    <li
                      key={driver}
                      className="rounded-xl border border-white/6 bg-white/4 px-3 py-3"
                    >
                      {driver}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-[1.3rem] border border-cyan-300/12 bg-cyan-300/8 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-100/72">
                    Forecast action
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">
                    {snapshot.action}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5" id="forecast-notes">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Forecast notes
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Keep the desk narrative short enough to act on
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              These notes translate the snapshot set into decisions the active
              desk can pick up immediately.
            </p>
          </div>

          <div
            aria-label="Forecast notes"
            className="grid gap-4 lg:grid-cols-3"
            role="list"
          >
            {forecastNotes.map((note) => (
              <article
                key={note.id}
                className="rounded-[1.65rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.76),rgba(7,12,24,0.92))] p-5 shadow-[0_18px_55px_rgba(2,6,23,0.2)]"
                role="listitem"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {note.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      {note.owner} · {note.window}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${noteStateStyles[note.state]}`}
                  >
                    {note.state}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {note.summary}
                </p>
                <div className="mt-4 rounded-[1.25rem] border border-white/8 bg-white/5 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Trigger
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-100">
                    {note.trigger}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
