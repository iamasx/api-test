"use client";

import { useState, useTransition } from "react";

import { ActivityFeed } from "./ActivityFeed";
import { AlertList } from "./AlertList";
import { MetricCard } from "./MetricCard";
import { QuickActions } from "./QuickActions";
import {
  activityFilters,
  createControlRoomSnapshot,
  quickActions,
  type ActivityFilter,
  type ControlRoomSnapshot,
} from "./control-room-data";

type ControlRoomDashboardProps = {
  initialSnapshot: ControlRoomSnapshot;
};

export function ControlRoomDashboard({
  initialSnapshot,
}: Readonly<ControlRoomDashboardProps>) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [filter, setFilter] = useState<ActivityFilter>("All");
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState(
    "Choose any dry-run control to simulate an operator action inside this mock room.",
  );
  const [isPending, startTransition] = useTransition();

  const filteredActivities =
    filter === "All"
      ? snapshot.activities
      : snapshot.activities.filter((activity) => activity.category === filter);

  const criticalAlerts = snapshot.alerts.filter(
    (alert) => alert.severity === "critical",
  ).length;

  function handleRefresh() {
    startTransition(() => {
      const nextSnapshot = createControlRoomSnapshot(snapshot.revision + 1);

      setSnapshot(nextSnapshot);
      setExpandedIds([]);
      setActionMessage(`Telemetry refreshed at ${nextSnapshot.lastUpdatedLabel}.`);
    });
  }

  function handleToggleActivity(activityId: string) {
    setExpandedIds((currentIds) =>
      currentIds.includes(activityId)
        ? currentIds.filter((id) => id !== activityId)
        : [...currentIds, activityId],
    );
  }

  function handleAction(actionId: string) {
    const action = quickActions.find((entry) => entry.id === actionId);

    if (!action) {
      return;
    }

    setActiveActionId(actionId);
    setActionMessage(`${action.response} No live infrastructure was touched.`);
  }

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 shadow-[0_30px_140px_rgba(2,6,23,0.55)] sm:p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),_transparent_55%)]" />
        <div className="absolute -left-16 top-24 h-52 w-52 rounded-full bg-emerald-400/12 blur-3xl" />
        <div className="absolute bottom-8 right-0 h-48 w-48 rounded-full bg-rose-400/10 blur-3xl" />
      </div>

      <div className="relative space-y-6">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-100">
                {snapshot.environmentLabel}
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Control Room
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                A self-contained rehearsal dashboard for deployments, incidents, and background
                jobs. Everything on this page is local mock data with client-side state only.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Last updated</p>
                  <p className="mt-2 text-sm font-medium text-white">{snapshot.lastUpdatedLabel}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Critical alerts</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {criticalAlerts} requiring review
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                {isPending ? "Refreshing..." : "Refresh telemetry"}
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {snapshot.metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
          <ActivityFeed
            activities={filteredActivities}
            expandedIds={expandedIds}
            filter={filter}
            filters={activityFilters}
            onFilterChange={setFilter}
            onToggle={handleToggleActivity}
          />

          <div className="space-y-6">
            <AlertList alerts={snapshot.alerts} />
            <QuickActions
              actions={quickActions}
              activeActionId={activeActionId}
              message={actionMessage}
              onAction={handleAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
