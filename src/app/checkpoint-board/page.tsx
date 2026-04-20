import type { Metadata } from "next";
import Link from "next/link";

import { CheckpointGroupSection } from "./_components/checkpoint-group";
import { ReadinessSummaryCard } from "./_components/readiness-summary-card";
import { ReviewNotesPanel } from "./_components/review-notes-panel";
import { getCheckpointBoardView } from "./_data/checkpoint-board-data";

export const metadata: Metadata = {
  title: "Checkpoint Board",
  description: "Checkpoint board route scaffold for milestone groups, readiness summaries, and review notes.",
};

export default function CheckpointBoardPage() {
  const view = getCheckpointBoardView();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            {view.summary.eyebrow}
          </p>
          <Link
            href="/"
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back to overview
          </Link>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.85fr)] xl:items-start">
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

          <aside className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Planning pulse
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  One route for checkpoint groups, readiness posture, and recent reviews.
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

      <section aria-labelledby="checkpoint-readiness" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Readiness summaries
            </p>
            <h2
              id="checkpoint-readiness"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Board readiness at a glance
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Summary cards are derived from the route-local dataset so the board
            can communicate scope, progress, and review follow-through without
            leaning on other screens.
          </p>
        </div>

        <div
          aria-label="Checkpoint readiness summaries"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {view.readinessSummaries.map((summary) => (
            <ReadinessSummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.9fr)]">
        <section
          id="checkpoint-groups"
          aria-labelledby="checkpoint-group-board"
          className="space-y-5"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Milestone groups
              </p>
              <h2
                id="checkpoint-group-board"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Grouped checkpoint board
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Each lane keeps checkpoint context, group-level focus, and
              milestone detail together so the route reads like a delivery board
              rather than a disconnected card list.
            </p>
          </div>

          <div aria-label="Checkpoint milestone groups" className="grid gap-5" role="list">
            {view.checkpointGroups.map((group) => (
              <CheckpointGroupSection key={group.id} group={group} />
            ))}
          </div>
        </section>

        <ReviewNotesPanel cadence={view.reviewCadence} notes={view.reviewNotes} />
      </div>
    </main>
  );
}
