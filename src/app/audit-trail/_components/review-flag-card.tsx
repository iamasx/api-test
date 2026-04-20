import type {
  AuditReviewFlag,
  AuditReviewer,
} from "../_lib/audit-trail-data";
import styles from "../audit-trail.module.css";

type ReviewFlagCardProps = {
  flag: AuditReviewFlag;
  reviewer: AuditReviewer;
  entryTitle: string;
};

function getFlagSeverityClass(severity: AuditReviewFlag["severity"]) {
  switch (severity) {
    case "Critical":
      return styles.flagSeverityCritical;
    case "Elevated":
      return styles.flagSeverityElevated;
    case "Watch":
      return styles.flagSeverityWatch;
  }
}

function getFlagStatusClass(status: AuditReviewFlag["status"]) {
  switch (status) {
    case "Open":
      return styles.flagStatusOpen;
    case "Mitigating":
      return styles.flagStatusMitigating;
    case "Ready to close":
      return styles.flagStatusReadyToClose;
  }
}

export function ReviewFlagCard({
  flag,
  reviewer,
  entryTitle,
}: ReviewFlagCardProps) {
  return (
    <article
      className={`${styles.flagCard} rounded-[1.6rem] border border-slate-200/80 bg-white/82 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.06)]`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {flag.category}
          </p>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {flag.label}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`${styles.flagSeverityBadge} ${getFlagSeverityClass(flag.severity)} rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]`}
          >
            {flag.severity}
          </span>
          <span
            className={`${styles.flagStatusBadge} ${getFlagStatusClass(flag.status)} rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]`}
          >
            {flag.status}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
        <p>{flag.detail}</p>
        <p>
          <span className="font-semibold text-slate-950">Opened:</span>{" "}
          {flag.openedLabel}
        </p>
        <p>
          <span className="font-semibold text-slate-950">Linked change:</span>{" "}
          {entryTitle}
        </p>
      </div>

      <div
        className={`${styles.flagCardReviewer} mt-5 rounded-[1.3rem] border border-slate-200/80 bg-slate-50/80 p-4`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Reviewer
        </p>
        <div className="mt-3 space-y-2">
          <p className="text-lg font-semibold tracking-tight text-slate-950">
            {reviewer.name}
          </p>
          <p className="text-sm text-slate-600">
            {reviewer.role} · {reviewer.timezone}
          </p>
          <p className="text-sm text-slate-600">{reviewer.coverage}</p>
        </div>
      </div>

      <div
        className={`${styles.flagCardNextStep} mt-5 rounded-[1.3rem] border border-slate-200/80 bg-white/80 p-4`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Next step
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">{flag.nextStep}</p>
      </div>
    </article>
  );
}
