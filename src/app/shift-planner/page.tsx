import type { Metadata } from "next";
import Link from "next/link";

import { CoverageMatrixSection } from "./_components/coverage-matrix-section";
import { HandoffNotesPanel } from "./_components/handoff-notes-panel";
import { StaffingWarningPanel } from "./_components/staffing-warning-panel";
import { getShiftPlannerView } from "./_data/shift-planner-data";

export const metadata: Metadata = {
  title: "Shift Planner",
  description: "Review shift coverage, staffing warnings, and handoff notes on a dedicated route.",
};

const summaryToneClassNames = {
  steady: "border-emerald-200 bg-emerald-50/70 text-emerald-950",
  watch: "border-amber-200 bg-amber-50/80 text-amber-950",
  risk: "border-rose-200 bg-rose-50/80 text-rose-950",
};

export default function ShiftPlannerPage() {
  const view = getShiftPlannerView();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="rounded-[2.2rem] border border-slate-200 bg-white/85 p-8 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10 lg:p-12">
        <div className="flex flex-col gap-8 xl:grid xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] xl:items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
                {view.summary.eyebrow}
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to route index
              </Link>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {view.summary.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {view.summary.description}
              </p>
            </div>
          </div>

          <aside className="rounded-[1.8rem] border border-slate-200 bg-slate-50/85 p-6">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Command post
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {view.summary.commandPost}
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Active staffing window
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {view.summary.shiftLabel}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        aria-label="Shift planner summary cards"
        className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4"
      >
        {view.summaryCards.map((card) => (
          <article
            key={card.id}
            className={`rounded-[1.6rem] border px-5 py-5 shadow-[0_18px_70px_rgba(15,23,42,0.06)] ${summaryToneClassNames[card.tone]}`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              {card.label}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight">
              {card.value}
            </p>
            <p className="mt-3 text-sm leading-6 opacity-85">
              {card.detail}
            </p>
          </article>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.42fr)_minmax(21rem,0.9fr)]">
        <section aria-labelledby="shift-planner-matrices" className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Coverage matrices
            </p>
            <h2
              id="shift-planner-matrices"
              className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
            >
              Coverage segments with seat-level depth and queue context
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Each segment pairs seat counts with named operators, queue
              posture, and lane-level notes so staffing moves stay grounded in
              real coverage tradeoffs instead of flat totals.
            </p>
          </div>

          <div className="space-y-6" role="list" aria-label="Coverage segments">
            {view.coverageSegments.map((segment) => (
              <CoverageMatrixSection key={segment.id} segment={segment} />
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <StaffingWarningPanel
            segments={view.coverageSegments}
            warnings={view.openShiftWarnings}
          />
          <HandoffNotesPanel notes={view.handoffNotes} />
        </div>
      </div>
    </main>
  );
}
