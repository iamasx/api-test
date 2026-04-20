import type {
  AuditChangeEntry,
  AuditReviewFlag,
  AuditReviewer,
} from "../_lib/audit-trail-data";
import styles from "../audit-trail.module.css";

type AuditEntryCardProps = {
  entry: AuditChangeEntry;
  flags: AuditReviewFlag[];
  reviewers: AuditReviewer[];
};

function getReviewStateClass(reviewState: AuditChangeEntry["reviewState"]) {
  switch (reviewState) {
    case "Escalated":
      return styles.entryStateEscalated;
    case "Needs review":
      return styles.entryStateNeedsReview;
    case "Watching":
      return styles.entryStateWatching;
    case "Approved":
      return styles.entryStateApproved;
  }
}

function getRiskClass(risk: AuditChangeEntry["risk"]) {
  switch (risk) {
    case "Critical":
      return styles.riskCritical;
    case "Elevated":
      return styles.riskElevated;
    case "Moderate":
      return styles.riskModerate;
    case "Low":
      return styles.riskLow;
  }
}

function getLinkedFlagClass(severity: AuditReviewFlag["severity"]) {
  switch (severity) {
    case "Critical":
      return styles.linkedFlagCritical;
    case "Elevated":
      return styles.linkedFlagElevated;
    case "Watch":
      return styles.linkedFlagWatch;
  }
}

export function AuditEntryCard({
  entry,
  flags,
  reviewers,
}: AuditEntryCardProps) {
  return (
    <article
      className={`${styles.entryCard} rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)]`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {entry.changedLabel}
            </p>
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              {entry.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={`${styles.metaBadge} rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700`}
            >
              {entry.changeType}
            </span>
            <span
              className={`${styles.entryStateBadge} ${getReviewStateClass(entry.reviewState)} rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]`}
            >
              {entry.reviewState}
            </span>
            <span
              className={`${styles.riskBadge} ${getRiskClass(entry.risk)} rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]`}
            >
              {entry.risk} risk
            </span>
          </div>
        </div>

        <p className="text-base leading-7 text-slate-600">{entry.summary}</p>

        <dl
          className={`${styles.entryMetaGrid} grid gap-4 rounded-[1.4rem] border border-slate-200/80 bg-slate-50/80 p-4 md:grid-cols-2 xl:grid-cols-3`}
        >
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Service
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-900">
              {entry.service}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Environment
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-900">
              {entry.environment}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Release Track
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-900">
              {entry.releaseTrack}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Actor
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-900">
              {entry.actor}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Team
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-900">
              {entry.team}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Reviewers
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-900">
              {reviewers.map((reviewer) => reviewer.name).join(", ")}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className={`${styles.tagPill} rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600`}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(260px,0.95fr)]">
          <section
            className={`${styles.detailSection} rounded-[1.4rem] border border-slate-200/80 bg-white/85 p-4`}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Review checkpoints
            </h4>
            <ul className="mt-3 space-y-3">
              {entry.checkpoints.map((checkpoint) => (
                <li
                  key={checkpoint}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {checkpoint}
                </li>
              ))}
            </ul>
          </section>

          <section
            className={`${styles.detailSection} rounded-[1.4rem] border border-slate-200/80 bg-white/85 p-4`}
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Evidence
            </h4>
            <ul className="mt-3 space-y-3">
              {entry.evidence.map((note) => (
                <li
                  key={note}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {note}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {flags.length > 0 ? (
          <section
            className={`${styles.flagPanel} rounded-[1.4rem] border border-slate-200/80 bg-slate-950 px-4 py-4 text-slate-100`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                Linked review flags
              </h4>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                {flags.length} linked item{flags.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {flags.map((flag) => (
                <span
                  key={flag.id}
                  className={`${styles.linkedFlagPill} ${getLinkedFlagClass(flag.severity)} rounded-full border px-3 py-1 text-xs font-semibold`}
                >
                  {flag.severity} · {flag.label}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
