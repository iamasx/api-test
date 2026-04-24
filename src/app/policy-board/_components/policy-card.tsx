import type { Policy } from "../_data/policy-board-data";
import styles from "../policy-board.module.css";

const statusLabels: Record<Policy["status"], string> = {
  active: "Active",
  "under-review": "Under review",
  deprecated: "Deprecated",
};

const statusBadgeStyles: Record<Policy["status"], string> = {
  active: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  "under-review": "border-amber-300/20 bg-amber-300/10 text-amber-50",
  deprecated: "border-slate-300/20 bg-slate-300/10 text-slate-300",
};

const statusSurfaceStyles: Record<Policy["status"], string> = {
  active: styles.policyActive,
  "under-review": styles.policyUnderReview,
  deprecated: styles.policyDeprecated,
};

type PolicyCardProps = {
  policy: Policy;
};

export function PolicyCard({ policy }: PolicyCardProps) {
  return (
    <article
      className={`${styles.policyCard} ${statusSurfaceStyles[policy.status]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {policy.name}
          </h3>
          <p className="text-sm text-slate-300">{policy.category}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusBadgeStyles[policy.status]}`}
        >
          {statusLabels[policy.status]}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Effective date
          </p>
          <p className="mt-1 text-sm font-medium text-slate-100">
            {policy.effectiveDate}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Owner
          </p>
          <p className="mt-1 text-sm font-medium text-slate-100">
            {policy.owner}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{policy.summary}</p>
    </article>
  );
}
