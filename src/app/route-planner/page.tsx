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
  title: "Route Planner",
  description:
    "Standalone route for reviewing route segments, timing constraints, and route-level planning decisions.",
};

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

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/45 hover:bg-slate-900"
              >
                Back to route index
              </Link>
            </div>
          </div>
        </header>

        <SummaryBanners
          stats={routePlannerStats}
          timingSignals={routeTimingSignals}
          constraints={routeConstraints}
        />

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
