import type { Metadata } from "next";

import { ActivityRail } from "./_components/activity-rail";
import { AlertList } from "./_components/alert-list";
import { MetricCard } from "./_components/metric-card";
import {
  controlRoomAlertSections,
  controlRoomMetrics,
  operatorActivityEntries,
} from "./_data/control-room-data";

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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">
                Control Room
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                See operational drift before it becomes customer impact.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                The control room keeps system health, open alert lanes, and live
                operator handoffs visible in one route so intervention decisions
                stay coordinated under pressure.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Metrics online
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {controlRoomMetrics.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Route-level system indicators loaded from standalone mock data.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Open alerts
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {totalAlerts}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {criticalAlerts} critical lane requiring immediate command-room
                  attention.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 px-5 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Active operators
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {activeOperators}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Live activity entries pinned to the current intervention rail.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-white/75 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Command brief
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  Stable core with targeted interventions
                </p>
              </div>

              <div className="space-y-3 text-sm leading-6 text-slate-600">
                <p>Current shift: 08:00-16:00 UTC control desk.</p>
                <p>
                  Escalation priority: facilities, access control, and power
                  resilience.
                </p>
                <p>Next structured handoff: 08:30 UTC command pulse review.</p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/90 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Room note
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              System metrics
            </p>
            <h2
              id="control-room-metrics"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Operational health snapshot
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Each metric is route-scoped mock content so the dashboard can stand
            on its own while the rest of the app evolves independently.
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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Active alerts
            </p>
            <h2
              id="control-room-alerts"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Intervention lanes
            </h2>
          </div>
          <AlertList sections={controlRoomAlertSections} />
        </section>

        <section aria-labelledby="control-room-activity" className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Operator activity
            </p>
            <h2
              id="control-room-activity"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Live handoff rail
            </h2>
          </div>
          <ActivityRail entries={operatorActivityEntries} />
        </section>
      </div>
    </main>
  );
}
