import type { Metadata } from "next";
import Link from "next/link";

import {
  getResponseLedgerView,
  type OwnershipRailItemStatus,
  type ResponseLedgerEntryStatus,
} from "./_data/response-ledger-data";

export const metadata: Metadata = {
  title: "Response Ledger",
  description: "Action history route with short outcome summaries and a compact ownership rail.",
};
const entryStatusStyles: Record<ResponseLedgerEntryStatus, string> = {
  sealed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  watching: "border-amber-200 bg-amber-50 text-amber-700",
  handoff: "border-sky-200 bg-sky-50 text-sky-700",
};

const ownerStatusStyles: Record<OwnershipRailItemStatus, string> = {
  "on-watch": "border-amber-200 bg-amber-50 text-amber-700",
  balanced: "border-teal-200 bg-teal-50 text-teal-700",
};

function formatStatusLabel(value: string) {
  return value.replace("-", " ");
}

export default function ResponseLedgerPage() {
  const view = getResponseLedgerView();
  return (
    <main className="min-h-screen bg-[#f3eee6]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
        <section className="rounded-[2rem] border border-white/70 bg-white/90 px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              {view.summary.eyebrow}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#action-history"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Review timeline
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to route index
              </Link>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {view.summary.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {view.summary.description}
            </p>
          </div>
          <div
            aria-label="Response ledger summary"
            className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            role="list"
          >
            {view.summary.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 px-5 py-4"
                role="listitem"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>
        <div
          className="grid gap-6 xl:grid-cols-[minmax(0,1.16fr)_minmax(300px,0.84fr)]"
          data-testid="response-ledger-layout"
        >
          <section id="action-history" aria-labelledby="action-history-heading" className="space-y-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                  Action history
                </p>
                <h2
                  id="action-history-heading"
                  className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
                >
                  Every intervention is logged with a visible owner and outcome.
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600">
                Each ledger card keeps the move, observed result, and next review
                window in one place.
              </p>
            </div>
            <div aria-label="Ledger entries" className="space-y-4" role="list">
              {view.entries.map((entry) => (
                <article
                  key={entry.id}
                  className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-6"
                  role="listitem"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {entry.timestamp}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${entryStatusStyles[entry.status]}`}
                        >
                          {formatStatusLabel(entry.status)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="max-w-3xl text-2xl font-semibold tracking-tight text-slate-950">
                          {entry.action}
                        </h3>
                        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                          {entry.summary}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-[210px] rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Owner
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">{entry.owner}</p>
                      <p className="mt-1 text-sm text-slate-600">{entry.team}</p>
                    </div>
                  </div>
                  <p className="mt-4 rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                    {entry.outcome}
                  </p>
                  <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Signal
                      </dt>
                      <dd className="mt-2 text-sm font-medium text-slate-900">{entry.signal}</dd>
                    </div>
                    <div className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Next review
                      </dt>
                      <dd className="mt-2 text-sm font-medium text-slate-900">
                        {entry.reviewWindow}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
          <aside aria-labelledby="ownership-rail-heading" className="h-fit space-y-5 xl:sticky xl:top-8">
            <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Ownership rail
              </p>
              <h2
                id="ownership-rail-heading"
                className="mt-3 text-3xl font-semibold tracking-tight text-slate-950"
              >
                Compact accountability for the next review window.
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The rail stays small on purpose: who is balanced, who is on
                watch, and what each owner carries forward.
              </p>
              <div aria-label="Ownership rail entries" className="mt-5 space-y-3" role="list">
                {view.ownershipRail.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.3rem] border border-slate-200 bg-slate-50/80 px-4 py-4"
                    role="listitem"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">{item.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{item.role}</p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${ownerStatusStyles[item.status]}`}
                      >
                        {formatStatusLabel(item.status)}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-700">{item.focus}</p>
                    <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Queue
                        </dt>
                        <dd className="mt-1 text-sm text-slate-700">{item.queue}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Coverage
                        </dt>
                        <dd className="mt-1 text-sm text-slate-700">{item.coverage}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
        <section aria-labelledby="outcome-summaries-heading" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Outcome summaries
              </p>
              <h2
                id="outcome-summaries-heading"
                className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
              >
                Short summaries keep the shift outcome legible.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              A quick read on what improved, what remains exposed, and who owns
              the next checkpoint.
            </p>
          </div>

          <div
            aria-label="Outcome summaries"
            className="grid gap-4 lg:grid-cols-3"
            data-testid="response-ledger-outcomes"
            role="list"
          >
            {view.outcomeSummaries.map((summary) => (
              <article
                key={summary.id}
                className="rounded-[1.6rem] border border-white/70 bg-white/90 px-5 py-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                role="listitem"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {summary.label}
                </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                {summary.headline}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{summary.detail}</p>
              <p className="mt-4 text-sm font-medium text-slate-900">{summary.owner}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
