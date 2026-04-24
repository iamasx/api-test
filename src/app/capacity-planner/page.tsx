import type { Metadata } from "next";
import Link from "next/link";

import { DemandBandCard } from "./_components/demand-band";
import { PlanningNotes } from "./_components/planning-notes";
import { UtilizationCardItem } from "./_components/utilization-card";
import styles from "./capacity-planner.module.css";
import {
  capacityPlannerOverview,
  capacityStats,
  demandBands,
  planningNotes,
  utilizationCards,
} from "./_data/capacity-planner-data";

export const metadata: Metadata = {
  title: "Capacity Planner",
  description:
    "Demand bands, utilization cards, and planning notes for capacity forecasting and resource alignment.",
};

export default function CapacityPlannerPage() {
  return (
    <main className={`${styles.shell} px-6 py-12 text-slate-50 sm:px-10 lg:px-16`}>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Hero */}
        <header
          className={`${styles.heroPanel} overflow-hidden rounded-[2rem] border border-white/10 p-8 backdrop-blur sm:p-10`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-indigo-300/35 bg-indigo-300/12 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-indigo-100">
                {capacityPlannerOverview.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {capacityPlannerOverview.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {capacityPlannerOverview.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div
                className={`${styles.floatingInfo} rounded-[1.4rem] border border-white/10 px-4 py-4 text-sm text-slate-200`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Plan cycle
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {capacityPlannerOverview.planCycle}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {capacityPlannerOverview.region}
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-indigo-300/45 hover:bg-slate-900"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section aria-label="Capacity planner summary" className="grid gap-4 md:grid-cols-3">
          {capacityStats.map((stat) => (
            <article
              key={stat.label}
              className={`${styles.statCard} rounded-[1.5rem] border border-white/10 px-5 py-5`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{stat.detail}</p>
            </article>
          ))}
        </section>

        {/* Demand bands */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Demand forecast
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Demand bands across the daily cycle
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Each band represents a time window with a forecasted load level.
              Use these bands to plan scaling actions and maintenance windows.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2" role="list" aria-label="Demand bands">
            {demandBands.map((band) => (
              <DemandBandCard key={band.id} band={band} />
            ))}
          </div>
        </section>

        {/* Utilization cards */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Resource health
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Utilization across tracked resources
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Current utilization and capacity for each tracked resource.
              Status reflects whether the resource is within safe operating margins.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Utilization cards">
            {utilizationCards.map((card) => (
              <UtilizationCardItem key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* Planning notes */}
        <PlanningNotes notes={planningNotes} />
      </div>
    </main>
  );
}
