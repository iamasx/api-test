import type { Metadata } from "next";
import Link from "next/link";

import { ComparisonNotes } from "./_components/comparison-notes";
import { RankedItemCard } from "./_components/ranked-item-card";
import { SignalSummary } from "./_components/signal-summary";
import styles from "./priority-lab.module.css";
import {
  comparisonNotes,
  priorityLabOverview,
  priorityLabStats,
  rankedItems,
  signalEntries,
} from "./_data/priority-lab-data";

export const metadata: Metadata = {
  title: "Priority Lab",
  description:
    "Ranked work items, comparison notes, and signal summaries for sequencing and prioritization decisions.",
};

export default function PriorityLabPage() {
  return (
    <main className={`${styles.shell} px-6 py-12 text-slate-50 sm:px-10 lg:px-16`}>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Hero */}
        <header
          className={`${styles.heroPanel} overflow-hidden rounded-[2rem] border border-white/10 p-8 backdrop-blur sm:p-10`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex w-fit rounded-full border border-purple-300/35 bg-purple-300/12 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-purple-100">
                {priorityLabOverview.eyebrow}
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {priorityLabOverview.title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {priorityLabOverview.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div
                className={`${styles.floatingInfo} rounded-[1.4rem] border border-white/10 px-4 py-4 text-sm text-slate-200`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Review cycle
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {priorityLabOverview.reviewCycle}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {priorityLabOverview.scope}
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-slate-950/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-purple-300/45 hover:bg-slate-900"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section aria-label="Priority lab summary" className="grid gap-4 md:grid-cols-3">
          {priorityLabStats.map((stat) => (
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

        {/* Ranked items */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Priority ranking
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ranked work items by weighted score
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Items are scored across impact, effort, and urgency dimensions.
              Higher scores indicate stronger alignment with current priorities.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" role="list" aria-label="Ranked items">
            {rankedItems.map((item) => (
              <RankedItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Comparison notes */}
        <ComparisonNotes notes={comparisonNotes} />

        {/* Signal summary */}
        <SignalSummary signals={signalEntries} />
      </div>
    </main>
  );
}
