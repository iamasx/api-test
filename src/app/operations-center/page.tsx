import type { Metadata } from "next";
import Link from "next/link";

import { ActivityFeed } from "./_components/activity-feed";
import { AlertList } from "./_components/alert-list";
import { MetricCard } from "./_components/metric-card";
import {
  operationsCenterActivity,
  operationsCenterAlerts,
  operationsCenterMetrics,
  operationsCenterSummary,
  type SummaryTone,
} from "./_data/dashboard-data";
import styles from "./operations-center.module.css";

export const metadata: Metadata = {
  title: "Operations Center",
  description:
    "Dashboard route highlighting KPIs, live alerts, and recent operational activity.",
};

const summaryToneClasses: Record<SummaryTone, string> = {
  stable: "border-emerald-300/30 bg-emerald-300/15 text-emerald-50",
  watch: "border-amber-300/30 bg-amber-300/15 text-amber-50",
  focused: "border-sky-300/30 bg-sky-300/15 text-sky-50",
};

export default function OperationsCenterPage() {
  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/60 px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          >
            <span aria-hidden="true">&larr;</span> Home
          </Link>
          <span className="ops-badge">Live dashboard</span>
        </div>

        <section className={`${styles.surfaceCard} ${styles.heroPanel} p-6 sm:p-8 lg:p-10`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.95fr)] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-100/75">
                  {operationsCenterSummary.eyebrow}
                </p>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    {operationsCenterSummary.title}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-100/78 sm:text-lg">
                    {operationsCenterSummary.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {operationsCenterSummary.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`inline-flex min-w-[11rem] flex-col rounded-2xl border px-4 py-3 ${summaryToneClasses[stat.tone]}`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
                      {stat.label}
                    </span>
                    <span className="mt-2 text-2xl font-semibold text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className={`${styles.surfaceCard} rounded-[1.5rem] bg-white/12 p-5 sm:p-6`}>
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">
                    Shift posture
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    Steady with targeted watchpoints
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-6 text-slate-100/78">
                  <p>{operationsCenterSummary.shiftLabel}</p>
                  <p>{operationsCenterSummary.refreshLabel}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Immediate focus
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Clear Memphis cold-chain risk before the noon premium dispatch cutoff.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                      Coverage note
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      Reserve drivers are staged in Newark, Joliet, and Ontario for rapid reroute support.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="operations-center-metrics" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Dashboard pulse
              </p>
              <h2
                id="operations-center-metrics"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                KPI snapshot
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Each card is fueled by mock data so the route can stand alone without any dependency on the home page or backend services.
            </p>
          </div>

          <div
            aria-label="KPI metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            role="list"
          >
            {operationsCenterMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <div
          className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)]"
          data-testid="operations-center-panels"
        >
          <section aria-labelledby="operations-center-alerts" className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Intervention queue
                </p>
                <h2
                  id="operations-center-alerts"
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Live alerts
                </h2>
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Prioritized by severity, owner, and expected customer impact.
              </p>
            </div>
            <AlertList alerts={operationsCenterAlerts} />
          </section>

          <section aria-labelledby="operations-center-activity" className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Shift log
              </p>
              <h2
                id="operations-center-activity"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Recent activity
              </h2>
            </div>
            <ActivityFeed items={operationsCenterActivity} />
          </section>
        </div>
      </div>
    </main>
  );
}
