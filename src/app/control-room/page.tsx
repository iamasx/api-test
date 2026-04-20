import type { Metadata } from "next";

import { ActivityRail } from "./_components/activity-rail";
import { AlertList } from "./_components/alert-list";
import { MetricCard } from "./_components/metric-card";
import {
  controlRoomAlertSections,
  controlRoomMetrics,
  operatorActivityEntries,
} from "./_data/control-room-data";
import styles from "./control-room.module.css";

export const metadata: Metadata = {
  title: "Control Room",
  description:
    "Dashboard route highlighting system metrics, active alerts, and operator activity in the control room.",
};

export default function ControlRoomPage() {
  const totalAlerts = controlRoomAlertSections.reduce(
    (count, section) => count + section.alerts.length,
    0,
  );
  const criticalAlerts = controlRoomAlertSections.reduce(
    (count, section) =>
      count +
      section.alerts.filter((alert) => alert.severity === "critical").length,
    0,
  );
  const activeOperators = new Set(
    operatorActivityEntries.map((entry) => entry.operator),
  ).size;

  return (
    <main className={styles.shell}>
      <div className={styles.inner}>
        <section className={`${styles.surfaceCard} ${styles.heroDeck}`}>
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)] lg:px-12 lg:py-14">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100/80">
                  Control Room
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  See operational drift before it becomes customer impact.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-100/78">
                  The control room keeps system health, open alert lanes, and
                  live operator handoffs visible in one route so intervention
                  decisions stay coordinated under pressure.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className={`${styles.heroStat} rounded-[1.5rem] px-5 py-5`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                    Metrics online
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {controlRoomMetrics.length}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100/72">
                    Route-level system indicators loaded from standalone mock
                    data.
                  </p>
                </div>
                <div className={`${styles.heroStat} rounded-[1.5rem] px-5 py-5`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                    Open alerts
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {totalAlerts}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100/72">
                    {criticalAlerts} critical lane requiring immediate
                    command-room attention.
                  </p>
                </div>
                <div className={`${styles.heroStat} rounded-[1.5rem] px-5 py-5`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                    Active operators
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {activeOperators}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-100/72">
                    Live activity entries pinned to the current intervention
                    rail.
                  </p>
                </div>
              </div>
            </div>

            <aside className={`${styles.briefingCard} rounded-[1.75rem] p-6`}>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-200/70">
                    Command brief
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    Stable core with targeted interventions
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-6 text-slate-100/74">
                  <p>Current shift: 08:00-16:00 UTC control desk.</p>
                  <p>
                    Escalation priority: facilities, access control, and power
                    resilience.
                  </p>
                  <p>Next structured handoff: 08:30 UTC command pulse review.</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-200/70">
                    Room note
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Keep the override queue visible until the cooling loop and
                    access-control issues are both under owner acknowledgement.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="control-room-metrics" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300/75">
                System metrics
              </p>
              <h2
                id="control-room-metrics"
                className="text-3xl font-semibold tracking-tight text-white"
              >
                Operational health snapshot
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300/75">
              Each metric is route-scoped mock content so the dashboard can
              stand on its own while the rest of the app evolves independently.
            </p>
          </div>

          <div
            aria-label="Control room metrics"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            role="list"
          >
            {controlRoomMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>

        <div
          className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.92fr)]"
          data-testid="control-room-panels"
        >
          <section aria-labelledby="control-room-alerts" className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300/75">
                Active alerts
              </p>
              <h2
                id="control-room-alerts"
                className="text-3xl font-semibold tracking-tight text-white"
              >
                Intervention lanes
              </h2>
            </div>
            <AlertList sections={controlRoomAlertSections} />
          </section>

          <section aria-labelledby="control-room-activity" className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300/75">
                Operator activity
              </p>
              <h2
                id="control-room-activity"
                className="text-3xl font-semibold tracking-tight text-white"
              >
                Live handoff rail
              </h2>
            </div>
            <ActivityRail entries={operatorActivityEntries} />
          </section>
        </div>
      </div>
    </main>
  );
}
