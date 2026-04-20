import type { Metadata } from "next";
import Link from "next/link";

import { AnomalySummary } from "./_components/anomaly-summary";
import { MetricTile } from "./_components/metric-tile";
import { TrendPanel } from "./_components/trend-panel";
import {
  anomalySummary,
  telemetryDeskNotes,
  telemetryDeskOverview,
  telemetryMetrics,
  telemetryTrends,
  type TelemetryHighlightTone,
} from "./_data/telemetry-desk-data";
import styles from "./telemetry-desk.module.css";

export const metadata: Metadata = {
  title: "Telemetry Desk",
  description:
    "Review telemetry metrics, trend comparisons, and anomaly clusters on a route-specific desk surface.",
};

const highlightClasses: Record<TelemetryHighlightTone, string> = {
  lift: styles.highlightLift,
  watch: styles.highlightWatch,
  steady: styles.highlightSteady,
};

export default function TelemetryDeskPage() {
  return (
    <main className={styles.pageShell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <section className={`${styles.heroPanel} rounded-[2rem] p-6 sm:p-8 lg:p-10`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.85fr)] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/78">
                  {telemetryDeskOverview.eyebrow}
                </p>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                    {telemetryDeskOverview.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-200/82 sm:text-lg">
                    {telemetryDeskOverview.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#telemetry-anomalies"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                >
                  Review anomaly summary
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-white/10"
                >
                  Back to route index
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {telemetryDeskOverview.highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className={`${styles.highlightChip} ${highlightClasses[highlight.tone]} min-w-[11rem] rounded-[1.2rem] px-4 py-3`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/68">
                      {highlight.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                      {highlight.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className={`${styles.heroAside} rounded-[1.7rem] p-5 sm:p-6`}>
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
                    {telemetryDeskOverview.postureTitle}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {telemetryDeskOverview.posture}
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-6 text-slate-200/78">
                  <p>{telemetryDeskOverview.shiftLabel}</p>
                  <p>{telemetryDeskOverview.refreshLabel}</p>
                </div>

                <div className="grid gap-3">
                  {telemetryDeskOverview.postureNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4"
                    >
                      <p className="text-sm leading-6 text-slate-100">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="telemetry-metrics" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/72">
                Desk metrics
              </p>
              <h2
                id="telemetry-metrics"
                className="text-3xl font-semibold tracking-tight text-white"
              >
                Metric overview
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              These tiles are fed by mock route data so the review desk can ship and test independently from any shared analytics backend.
            </p>
          </div>

          <div
            aria-label="Telemetry metrics"
            className="grid gap-4 xl:grid-cols-4 md:grid-cols-2"
            role="list"
          >
            {telemetryMetrics.map((metric) => (
              <MetricTile key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <section aria-labelledby="telemetry-trends" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100/72">
                Trend comparisons
              </p>
              <h2
                id="telemetry-trends"
                className="text-3xl font-semibold tracking-tight text-white"
              >
                Review how the desk is shifting
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Each panel compares the current window to a meaningful reference so operators can tell whether improvement is real, noisy, or incomplete.
            </p>
          </div>

          <div
            aria-label="Trend comparison panels"
            className="grid gap-5 xl:grid-cols-3"
            role="list"
          >
            {telemetryTrends.map((trend) => (
              <TrendPanel key={trend.id} panel={trend} />
            ))}
          </div>
        </section>

        <div
          className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
          data-testid="telemetry-desk-lower-panels"
        >
          <AnomalySummary />

          <aside
            aria-label="Desk notes"
            className={`${styles.notesPanel} flex h-full flex-col gap-5 rounded-[1.95rem] p-6 sm:p-7`}
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-700">
                Supporting notes
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Keep the trend story grounded
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                The desk notes capture what changed underneath the charts so a recovered trend does not hide the operational caveats behind it.
              </p>
            </div>

            <div className="space-y-3">
              {telemetryDeskNotes.map((note) => (
                <article key={note.id} className={styles.noteCard}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {note.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                        {note.value}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{note.detail}</p>
                </article>
              ))}
            </div>

            <div className={`${styles.handoffPanel} mt-auto`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700">
                {anomalySummary.handoff.title}
              </p>
              <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                {anomalySummary.handoff.owner}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {anomalySummary.handoff.eta}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {anomalySummary.handoff.note}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
