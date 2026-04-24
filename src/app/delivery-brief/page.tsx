import type { Metadata } from "next";
import Link from "next/link";

import { CheckpointCard } from "./_components/checkpoint-card";
import { FollowUpNotesRail } from "./_components/follow-up-notes-rail";
import { MilestoneSummaryCard } from "./_components/milestone-summary";
import styles from "./delivery-brief.module.css";
import {
  checkpoints,
  deliveryBriefOverview,
  deliveryStats,
  followUpNotes,
  milestones,
} from "./_data/delivery-brief-data";

export const metadata: Metadata = {
  title: "Delivery Brief",
  description:
    "Milestone summaries, shipment checkpoints, and follow-up notes for delivery operations.",
};

export default function DeliveryBriefPage() {
  return (
    <main className={`${styles.shell} px-6 py-12 text-slate-50 sm:px-10 lg:px-16`}>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Hero */}
        <header
          className={`${styles.heroPanel} overflow-hidden rounded-[2rem] border border-white/10 p-8 backdrop-blur sm:p-10`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-sky-300/35 bg-sky-300/12 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-sky-100">
                {deliveryBriefOverview.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {deliveryBriefOverview.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {deliveryBriefOverview.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div
                className={`${styles.floatingInfo} rounded-[1.4rem] border border-white/10 px-4 py-4 text-sm text-slate-200`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Shipment
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {deliveryBriefOverview.shipmentId}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {deliveryBriefOverview.origin} &rarr;{" "}
                  {deliveryBriefOverview.destination}
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-300/45 hover:bg-slate-900"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section aria-label="Delivery brief summary" className="grid gap-4 md:grid-cols-3">
          {deliveryStats.map((stat) => (
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

        {/* Milestones */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Shipment progress
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Milestone summaries
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Each milestone represents a key stage in the shipment lifecycle.
              Track progress from label creation through final delivery.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Milestones">
            {milestones.map((milestone) => (
              <MilestoneSummaryCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </section>

        {/* Checkpoints */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Transit log
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Shipment checkpoints
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Chronological record of every scan and hand-off along the route.
              Severity flags highlight delays and issues requiring attention.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2" role="list" aria-label="Checkpoints">
            {checkpoints.map((checkpoint) => (
              <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} />
            ))}
          </div>
        </section>

        {/* Follow-up notes rail */}
        <FollowUpNotesRail notes={followUpNotes} />
      </div>
    </main>
  );
}
