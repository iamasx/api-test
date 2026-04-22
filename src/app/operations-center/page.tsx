import type { Metadata } from "next";

import { ActivityList } from "./_components/activity-list";
import { AlertStrip } from "./_components/alert-strip";
import { KpiTile } from "./_components/kpi-tile";
import {
  activeAlerts,
  kpiMetrics,
  recentActivity,
} from "./_data/dashboard-data";
import styles from "./operations-center.module.css";

export const metadata: Metadata = {
  title: "Operations Center",
  description:
    "Live dashboard showing KPI tiles, active alerts, and recent operational activity.",
};

export default function OperationsCenterPage() {
  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Operations Center
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Shift overview
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Monitor network KPIs, active alerts, and recent operational activity
            from a single view.
          </p>
        </header>

        <section aria-labelledby="kpi-heading" className="space-y-4">
          <h2
            id="kpi-heading"
            className="text-2xl font-semibold tracking-tight text-slate-950"
          >
            KPI snapshot
          </h2>
          <div
            role="list"
            aria-label="KPI metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {kpiMetrics.map((metric) => (
              <KpiTile key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <div
          className="grid gap-8 xl:grid-cols-[1.4fr_1fr]"
          data-testid="operations-center-panels"
        >
          <section aria-labelledby="alerts-heading" className="space-y-4">
            <h2
              id="alerts-heading"
              className="text-2xl font-semibold tracking-tight text-slate-950"
            >
              Active alerts
            </h2>
            <AlertStrip alerts={activeAlerts} />
          </section>

          <section aria-labelledby="activity-heading" className="space-y-4">
            <h2
              id="activity-heading"
              className="text-2xl font-semibold tracking-tight text-slate-950"
            >
              Recent activity
            </h2>
            <ActivityList items={recentActivity} />
          </section>
        </div>
      </div>
    </main>
  );
}
