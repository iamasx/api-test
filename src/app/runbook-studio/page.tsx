import type { Metadata } from "next";
import Link from "next/link";

import { ExecutionPreviewCard } from "./_components/execution-preview-card";
import { ProcedureCard } from "./_components/procedure-card";
import { RevisionSummaryPanel } from "./_components/revision-summary-panel";
import {
  executionPreviews,
  revisionSummary,
  runbookGroups,
  runbookStudioOverview,
} from "./_data/runbook-studio-data";

export const metadata: Metadata = {
  title: "Runbook Studio",
  description:
    "Grouped runbook procedures with execution previews and a revision summary panel.",
};

export default function RunbookStudioPage() {
  const procedureCount = runbookGroups.reduce(
    (count, group) => count + group.procedures.length,
    0,
  );
  const activeCount = runbookGroups.reduce(
    (count, group) =>
      count +
      group.procedures.filter((procedure) => procedure.status === "active").length,
    0,
  );
  const draftCount = runbookGroups.reduce(
    (count, group) =>
      count +
      group.procedures.filter((procedure) => procedure.status === "draft").length,
    0,
  );
  const executionStepCount = executionPreviews.reduce(
    (count, preview) => count + preview.steps.length,
    0,
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5eee2_0%,#efe5d8_46%,#ddd1c4_100%)] px-6 py-12 text-slate-950 sm:px-10 lg:px-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2.25rem] border border-slate-300/70 bg-[rgba(255,251,245,0.92)] p-8 shadow-[0_28px_110px_rgba(15,23,42,0.12)] sm:p-10">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-800">
                {runbookStudioOverview.eyebrow}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {runbookStudioOverview.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {runbookStudioOverview.description}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#runbook-groups"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-50 transition hover:bg-slate-800"
                >
                  Review runbook groups
                </a>
                <a
                  href="#execution-previews"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                >
                  Open execution previews
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 xl:items-end">
              <div className="rounded-[1.5rem] border border-slate-300/70 bg-white/80 px-5 py-4 text-sm text-slate-600 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Release cut
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-950">R7.4</p>
                <p className="mt-2 leading-6">
                  Review active, approved, and draft procedures in one studio
                  before the revision pack moves forward.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to route index
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {runbookStudioOverview.stats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-[1.5rem] border border-slate-300/70 bg-white/82 px-5 py-5 shadow-[0_16px_55px_rgba(15,23,42,0.06)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {stat.detail}
                </p>
              </article>
            ))}
            <article className="rounded-[1.5rem] border border-slate-300/70 bg-slate-950 px-5 py-5 text-slate-50 shadow-[0_16px_55px_rgba(15,23,42,0.12)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Workflow coverage
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {procedureCount}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {activeCount} active runbooks, {draftCount} drafts, and{" "}
                {executionStepCount} preview steps staged for release review.
              </p>
            </article>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] xl:items-start">
          <div
            id="runbook-groups"
            className="space-y-6"
            aria-labelledby="runbook-groups-heading"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Procedure groups
                </p>
                <h2
                  id="runbook-groups-heading"
                  className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                >
                  Group the procedures the same way the workflow hands off
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Every group ties runbook revision history to execution timing so
                the reviewer can see what changed before approving the release
                pack.
              </p>
            </div>

            {runbookGroups.map((group) => (
              <section
                key={group.id}
                aria-labelledby={`${group.id}-heading`}
                className="space-y-4 rounded-[2rem] border border-slate-300/70 bg-[rgba(255,251,245,0.86)] p-6 shadow-[0_22px_80px_rgba(15,23,42,0.08)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {group.label}
                    </p>
                    <div>
                      <h3
                        id={`${group.id}-heading`}
                        className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
                      >
                        {group.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="max-w-sm rounded-[1.35rem] border border-slate-300/70 bg-white/80 px-4 py-4 text-sm leading-6 text-slate-600">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Handoff note
                    </p>
                    <p className="mt-2">{group.handoff}</p>
                  </div>
                </div>

                <div aria-label={`${group.title} procedures`} className="grid gap-4" role="list">
                  {group.procedures.map((procedure) => (
                    <ProcedureCard key={procedure.id} procedure={procedure} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <RevisionSummaryPanel summary={revisionSummary} />
        </section>

        <section
          id="execution-previews"
          aria-labelledby="execution-previews-heading"
          className="space-y-5 rounded-[2.1rem] border border-slate-300/70 bg-[rgba(255,251,245,0.9)] p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] sm:p-8"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Execution previews
              </p>
              <h2
                id="execution-previews-heading"
                className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
              >
                Dry-run the release before the runbook pack ships
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              The preview cards combine steps, success signals, and outputs so
              the operator can see how each revision state affects the live
              workflow before sign-off.
            </p>
          </div>

          <div aria-label="Execution preview cards" className="grid gap-5" role="list">
            {executionPreviews.map((preview) => (
              <ExecutionPreviewCard key={preview.id} preview={preview} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
