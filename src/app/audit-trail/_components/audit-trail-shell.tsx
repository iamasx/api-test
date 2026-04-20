import Link from "next/link";

import { AuditEntryCard } from "./audit-entry-card";
import { ReviewFlagCard } from "./review-flag-card";
import { ReviewerSummary } from "./reviewer-summary";
import type { AuditTrailView } from "../_lib/audit-trail";
import styles from "../audit-trail.module.css";

type AuditTrailShellProps = {
  view: AuditTrailView;
};

export function AuditTrailShell({ view }: AuditTrailShellProps) {
  return (
    <main
      className={`${styles.pageShell} mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12`}
    >
      <section
        className={`${styles.heroPanel} overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]`}
      >
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Audit trail
            </p>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Review change history, linked flags, and reviewer context in one timeline.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                The route keeps audit work local to one page: chronological
                entries on the left, review flags on the right, and reviewer
                ownership below so handoffs keep their operational context.
              </p>
            </div>
          </div>

          <section
            className={`${styles.summaryPanel} rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Route summary
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {view.summaryMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className={`${styles.summaryMetricCard} rounded-[1.25rem] border border-slate-200 bg-white/80 p-4`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {metric.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section
        className={`${styles.filterSection} rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] p-6 shadow-[0_18px_65px_rgba(15,23,42,0.08)]`}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Filters
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              {view.selectedFilter.label}
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              {view.selectedFilter.description}
            </p>
          </div>
          {view.notice ? (
            <p
              role="status"
              className="max-w-xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
            >
              {view.notice}
            </p>
          ) : null}
        </div>

        <nav aria-label="Audit trail filters" className="mt-6 flex flex-wrap gap-3">
          {view.filters.map((filter) => (
            <Link
              key={filter.id}
              href={filter.href}
              aria-current={filter.isActive ? "page" : undefined}
              className={`${
                filter.isActive
                  ? `${styles.filterLink} ${styles.filterLinkActive} rounded-full border border-slate-950 bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-50`
                  : `${styles.filterLink} rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700`
              }`}
            >
              {filter.label} ({filter.matchCount})
            </Link>
          ))}
        </nav>
      </section>

      <div
        className={`${styles.contentGrid} grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]`}
      >
        <section
          aria-labelledby="audit-trail-timeline-title"
          className={`${styles.timelineSection} rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] p-6 shadow-[0_18px_65px_rgba(15,23,42,0.08)]`}
        >
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Timeline
            </p>
            <h2
              id="audit-trail-timeline-title"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Recent audit activity
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-600">
              Every entry carries review state, linked flags, evidence, and
              operational metadata so the page reads like a review handoff
              rather than a flat changelog.
            </p>
          </div>

          <ol
            role="list"
            aria-label="Audit timeline"
            className={styles.timelineList}
          >
            {view.entries.map(({ entry, flags, reviewers }) => (
              <li key={entry.id} className={styles.timelineItem}>
                <span aria-hidden="true" className={styles.timelineMarker} />
                <AuditEntryCard
                  entry={entry}
                  flags={flags}
                  reviewers={reviewers}
                />
              </li>
            ))}
          </ol>
        </section>

        <aside className="flex flex-col gap-8">
          <section
            aria-labelledby="audit-review-flags-title"
            className={`${styles.flagSection} rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] p-6 shadow-[0_18px_65px_rgba(15,23,42,0.08)]`}
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Review flags
              </p>
              <h2
                id="audit-review-flags-title"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Flags tied to the visible audit scope
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Flag cards keep severity, ownership, and next-step detail close
                to the changes they can block.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {view.reviewFlags.map(({ flag, entry, reviewer }) => (
                <ReviewFlagCard
                  key={flag.id}
                  flag={flag}
                  reviewer={reviewer}
                  entryTitle={entry.title}
                />
              ))}
            </div>
          </section>
        </aside>
      </div>

      <ReviewerSummary reviewers={view.reviewers} />
    </main>
  );
}
