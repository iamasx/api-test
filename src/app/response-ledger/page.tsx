import type { Metadata } from "next";
import Link from "next/link";

import { LedgerEntry } from "./_components/ledger-entry";
import { OutcomeSummaryCard } from "./_components/outcome-summary";
import { OwnershipRail } from "./_components/ownership-rail";
import { getResponseLedgerView } from "./_data/response-ledger-data";

export const metadata: Metadata = {
  title: "Response Ledger",
  description:
    "Action history with outcome summaries and a compact ownership rail for operational triage.",
};

export default function ResponseLedgerPage() {
  const { actions, outcomes, ownership, summary } = getResponseLedgerView();

  return (
    <main className="min-h-screen bg-[#f4efe7]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        {/* Hero */}
        <section className="rounded-[2rem] bg-white/86 p-8 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Response Actions
            </p>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Response Ledger
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              A running log of response actions, their outcomes, and who owns
              each thread — designed for fast situational awareness during
              active incidents.
            </p>
          </div>

          {/* Summary stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Total
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {summary.totalActions}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                Completed
              </p>
              <p className="mt-1 text-2xl font-semibold text-emerald-700">
                {summary.completedCount}
              </p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
                Escalated
              </p>
              <p className="mt-1 text-2xl font-semibold text-rose-700">
                {summary.escalatedCount}
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/80 px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                In Progress
              </p>
              <p className="mt-1 text-2xl font-semibold text-sky-700">
                {summary.inProgressCount}
              </p>
            </div>
          </div>
        </section>

        {/* Main content grid: action log + ownership rail */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Action history */}
          <section aria-labelledby="action-history-heading" className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Chronological feed
              </p>
              <h2
                id="action-history-heading"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Action history
              </h2>
            </div>

            <div
              aria-label="Response ledger actions"
              className="flex flex-col gap-4"
              role="list"
            >
              {actions.map((action) => (
                <LedgerEntry key={action.id} action={action} />
              ))}
            </div>
          </section>

          {/* Ownership rail */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <OwnershipRail records={ownership} />
          </aside>
        </div>

        {/* Outcome summaries */}
        <section aria-labelledby="outcomes-heading" className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Results
            </p>
            <h2
              id="outcomes-heading"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Outcome summaries
            </h2>
          </div>

          <div
            aria-label="Outcome summaries"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {outcomes.map((outcome) => (
              <div key={outcome.id} role="listitem">
                <OutcomeSummaryCard outcome={outcome} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
