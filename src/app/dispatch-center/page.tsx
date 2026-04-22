import type { Metadata } from "next";
import Link from "next/link";

import { DispatchBucketSection } from "./_components/dispatch-bucket-section";
import { DispatchDetailPanel } from "./_components/dispatch-detail-panel";
import {
  dispatchAssignments,
  dispatchBuckets,
  dispatchOwners,
  dispatchQueues,
  getDispatchBucketViews,
  getDispatchMetrics,
} from "./_lib/dispatch-data";

export const metadata: Metadata = {
  title: "Dispatch Center",
  description:
    "Operational dispatch center with assignment buckets, pending counts, and assignment detail.",
};

export default function DispatchCenterPage() {
  const metrics = getDispatchMetrics(
    dispatchAssignments,
    dispatchQueues,
    dispatchOwners,
  );
  const bucketViews = getDispatchBucketViews(
    dispatchBuckets,
    dispatchAssignments,
    dispatchOwners,
    dispatchQueues,
  );
  const featuredAssignment = bucketViews[0]?.assignments[0] ?? null;

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      {/* Hero header */}
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-950 bg-slate-950 px-6 py-8 text-white shadow-[0_40px_130px_rgba(15,23,42,0.18)] sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/72">
          Dispatch Center
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]">
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Route, release, and resolve every active assignment from one board.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-200/82 sm:text-lg">
              The dispatch center surfaces pending work across queues, groups
              assignments into urgency buckets, and shows a compact detail view
              for the selected load so dispatchers can act without switching
              screens.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#dispatch-buckets"
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Jump to buckets
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-slate-950/30 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-slate-900/60"
              >
                Back to route index
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Dispatch pulse
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Assignments
                </p>
                <p className="mt-1 text-2xl font-semibold">{metrics.totalAssignments}</p>
              </div>
              <div className="rounded-[1.4rem] border border-rose-300/16 bg-rose-300/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-100/75">
                  Critical
                </p>
                <p className="mt-1 text-2xl font-semibold">{metrics.criticalCount}</p>
              </div>
              <div className="rounded-[1.4rem] border border-amber-300/16 bg-amber-300/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100/75">
                  Due soon
                </p>
                <p className="mt-1 text-2xl font-semibold">{metrics.dueSoonCount}</p>
              </div>
              <div className="rounded-[1.4rem] border border-cyan-300/16 bg-cyan-300/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/75">
                  Owners
                </p>
                <p className="mt-1 text-2xl font-semibold">{metrics.ownerCount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Queue summaries */}
      <section aria-label="Queue summaries">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Pending work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Queue pressure across regions
          </h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Queues">
          {dispatchQueues.map((queue) => (
            <article
              key={queue.id}
              role="listitem"
              className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"
            >
              <p className="text-lg font-semibold tracking-tight text-slate-950">
                {queue.name}
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs">
                <span className="font-semibold text-slate-700">
                  {queue.pendingCount} pending
                </span>
                <span className="font-semibold text-amber-700">
                  {queue.dueSoon} due soon
                </span>
                <span className="text-slate-500">
                  Oldest: {queue.oldestAge}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {queue.summary}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-400">
                {queue.releaseWindow}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Buckets + detail */}
      <section
        id="dispatch-buckets"
        className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] xl:items-start"
      >
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Assignment buckets
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Work grouped by urgency and owner accountability
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Each bucket collects assignments at a similar urgency level so
              dispatchers can sweep one tier before moving to the next.
            </p>
          </div>

          {bucketViews.map((bucket) => (
            <DispatchBucketSection key={bucket.id} bucket={bucket} />
          ))}
        </div>

        {featuredAssignment && (
          <DispatchDetailPanel assignment={featuredAssignment} />
        )}
      </section>
    </main>
  );
}
