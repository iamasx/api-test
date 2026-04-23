import type { Metadata } from "next";
import Link from "next/link";

import { RouteDecisionSidebar } from "./_components/route-decision-sidebar";
import { SegmentGroup } from "./_components/segment-group";
import { SummaryBanners } from "./_components/summary-banners";
import styles from "./route-planner.module.css";
import {
  routeConstraints,
  routeDecisionQueue,
  routePlannerOverview,
  routePlannerStats,
  routeSegmentGroups,
  routeTimingSignals,
} from "./_data/route-planner-data";

export const metadata: Metadata = {
  title: "Route Planner — Inventory Integration",
  description:
    "Route segments, timing constraints, and planning decisions with integrated inventory bay supply snapshots.",
};

const inventorySupplySummary = [
  { warehouse: "Bay-North", itemCount: 342, lowStock: 18, status: "nominal" as const },
  { warehouse: "Bay-Central", itemCount: 589, lowStock: 47, status: "warning" as const },
  { warehouse: "Bay-South", itemCount: 215, lowStock: 5, status: "nominal" as const },
];

const deliveryWindowStats = [
  { label: "On-time deliveries", value: "87%", trend: "+3%" },
  { label: "Pending dispatches", value: "14", trend: "-2" },
  { label: "Avg transit time", value: "2.4h", trend: "-0.3h" },
  { label: "Restock urgency", value: "3 bays", trend: "+1" },
];

export default function RoutePlannerPage() {
  return (
    <main className={`${styles.shell} px-6 py-12 text-slate-50 sm:px-10 lg:px-16`}>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header
          className={`${styles.heroPanel} overflow-hidden rounded-[2rem] border border-white/10 p-8 backdrop-blur sm:p-10`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-cyan-300/35 bg-cyan-300/12 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-cyan-100">
                {routePlannerOverview.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {routePlannerOverview.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {routePlannerOverview.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div
                className={`${styles.floatingInfo} rounded-[1.4rem] border border-white/10 px-4 py-4 text-sm text-slate-200`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Active route
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {routePlannerOverview.routeName}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {routePlannerOverview.shiftLabel}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/inventory-bay"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-900/30 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-800/40"
                >
                  View inventory bay
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/45 hover:bg-slate-900"
                >
                  Back to route index
                </Link>
              </div>
            </div>
          </div>
        </header>

        <SummaryBanners
          stats={routePlannerStats}
          timingSignals={routeTimingSignals}
          constraints={routeConstraints}
        />

        <section className="integration-panel rounded-[2rem] border border-emerald-400/20 bg-emerald-950/40 p-8 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">
            Inventory supply snapshot
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Warehouse stock levels for active route bays
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Real-time inventory counts from warehouses on this route. Low-stock
            alerts trigger automatic priority re-sequencing.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryWindowStats.map((stat) => (
              <div
                key={stat.label}
                className="integration-card rounded-2xl border border-white/10 bg-white/5 px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-emerald-300">{stat.trend}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {inventorySupplySummary.map((bay) => (
              <li key={bay.warehouse}>
                <Link
                  href="/inventory-bay"
                  className="integration-card block rounded-2xl border border-white/10 bg-white/5 px-5 py-5 transition hover:border-emerald-400/40 hover:bg-emerald-900/30"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{bay.warehouse}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        bay.status === "warning"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-emerald-400/15 text-emerald-300"
                      }`}
                    >
                      {bay.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    {bay.itemCount} items &middot; {bay.lowStock} low stock
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)] xl:items-start">
          <div className="space-y-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Route segments
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Segment cards for every control point on the route
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Each segment card calls out who owns the handoff, what timing
                window still matters, and which constraint is attached to the
                decision.
              </p>
            </div>

            {routeSegmentGroups.map((group) => (
              <SegmentGroup
                key={group.id}
                group={group}
                constraints={routeConstraints}
              />
            ))}
          </div>

          <RouteDecisionSidebar
            decisions={routeDecisionQueue}
            timingSignals={routeTimingSignals}
            constraints={routeConstraints}
          />
        </section>
      </div>
    </main>
  );
}
