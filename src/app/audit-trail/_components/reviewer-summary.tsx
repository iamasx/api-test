import type { AuditReviewer } from "../_lib/audit-trail-data";
import styles from "../audit-trail.module.css";

type ReviewerSummaryProps = {
  reviewers: AuditReviewer[];
};

export function ReviewerSummary({ reviewers }: ReviewerSummaryProps) {
  return (
    <section
      aria-labelledby="audit-reviewer-summary-title"
      className={`${styles.reviewerSection} rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] p-6 shadow-[0_18px_65px_rgba(15,23,42,0.08)]`}
    >
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Reviewer coverage
        </p>
        <h2
          id="audit-reviewer-summary-title"
          className="text-3xl font-semibold tracking-tight text-slate-950"
        >
          Reviewer ownership and follow-the-sun context
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          Each reviewer card keeps operational focus, coverage, and current
          availability visible so unresolved flags do not lose context during
          handoffs.
        </p>
      </div>

      <div className={`${styles.reviewerGrid} mt-6 grid gap-4 xl:grid-cols-2`}>
        {reviewers.map((reviewer) => (
          <article
            key={reviewer.id}
            className={`${styles.reviewerCard} rounded-[1.5rem] border border-slate-200/80 bg-white/82 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xl font-semibold tracking-tight text-slate-950">
                  {reviewer.name}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {reviewer.role} · {reviewer.timezone}
                </p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                {reviewer.shiftLabel}
              </span>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Focus
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">
                  {reviewer.focusArea}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Coverage
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">
                  {reviewer.coverage}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Decisions today
                </dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {reviewer.decisionsToday}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Open flags
                </dt>
                <dd className="mt-2 text-sm font-medium text-slate-900">
                  {reviewer.openFlags}
                </dd>
              </div>
            </dl>

            <div
              className={`${styles.reviewerNote} mt-5 rounded-[1.3rem] border border-slate-200/80 bg-slate-50/80 p-4`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Current note
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {reviewer.availabilityNote}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {reviewer.lastReviewedLabel}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
