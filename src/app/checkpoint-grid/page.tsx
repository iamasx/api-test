import type { Metadata } from "next";
import Link from "next/link";

import { MilestoneTile } from "./_components/milestone-tile";
import { ProgressSummaryCard } from "./_components/progress-summary-card";
import { ReviewNotesPanel } from "./_components/review-notes-panel";
import { StatusBreakdownBar } from "./_components/status-breakdown-bar";
import { getCheckpointGridView } from "./_data/checkpoint-grid-data";
import styles from "./checkpoint-grid.module.css";

export const metadata: Metadata = {
  title: "Checkpoint Grid",
  description:
    "Milestone tiles, progress summaries, and recent review notes staged on a dedicated planning route.",
};

export default function CheckpointGridPage() {
  const view = getCheckpointGridView();

  return (
    <main className={styles.shell}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <section className={`${styles.surfaceCard} ${styles.heroPanel} rounded-[2.2rem] p-8 sm:p-10 lg:p-12`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {view.summary.eyebrow}
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)] xl:items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  {view.summary.title}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  {view.summary.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                {view.summary.actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-950 hover:text-slate-950"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>

            <aside className={`${styles.surfaceCard} rounded-[1.8rem] p-5 sm:p-6`}>
              <div className="space-y-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Planning pulse
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                    One route for checkpoint posture and review follow-through.
                  </p>
                </div>

                <div className="grid gap-3">
                  {view.heroMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-3xl font-semibold text-slate-950">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="checkpoint-status-breakdown" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                At a glance
              </p>
              <h2
                id="checkpoint-status-breakdown"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Status breakdown
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              A visual distribution of milestone statuses across the planning
              board so you can spot bottlenecks before reading the full grid.
            </p>
          </div>

          <StatusBreakdownBar items={view.statusBreakdown} />
        </section>

        <section aria-labelledby="checkpoint-progress-summaries" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Progress posture
              </p>
              <h2
                id="checkpoint-progress-summaries"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Progress summaries
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              The summary rail compresses milestone coverage, average progress,
              open review actions, and verification intent into one scan line
              before the full tile grid.
            </p>
          </div>

          <div
            className={styles.summaryGrid}
            role="list"
            aria-label="Checkpoint progress summaries"
          >
            {view.progressSummaries.map((summary) => (
              <ProgressSummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(22rem,0.92fr)]">
          <section
            id="checkpoint-milestones"
            aria-labelledby="checkpoint-milestone-grid"
            className="space-y-5"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Milestone board
                </p>
                <h2
                  id="checkpoint-milestone-grid"
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Checkpoint milestones
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Every tile pairs milestone status with deliverables, dependency
                context, and the next review checkpoint so the route still reads
                as a planning board instead of a generic card grid.
              </p>
            </div>

            <div className={styles.milestoneGrid} role="list" aria-label="Checkpoint milestones">
              {view.milestones.map((milestone) => (
                <MilestoneTile key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </section>

          <ReviewNotesPanel cadence={view.cadence} notes={view.reviewNotes} />
        </div>
      </div>
    </main>
  );
}
