import type { TriageCard } from "../_data/intake-desk-data";
import styles from "../intake-desk.module.css";

const outcomeLabels: Record<TriageCard["outcome"], string> = {
  accepted: "Accepted",
  deferred: "Deferred",
  escalated: "Escalated",
  rejected: "Rejected",
};

const outcomeBadgeStyles: Record<TriageCard["outcome"], string> = {
  accepted: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  deferred: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  escalated: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  rejected: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const outcomeSurfaceStyles: Record<TriageCard["outcome"], string> = {
  accepted: styles.outcomeAccepted,
  deferred: styles.outcomeDeferred,
  escalated: styles.outcomeEscalated,
  rejected: styles.outcomeRejected,
};

type TriageCardItemProps = {
  card: TriageCard;
};

export function TriageCardItem({ card }: TriageCardItemProps) {
  return (
    <article
      className={`${styles.triageCard} ${outcomeSurfaceStyles[card.outcome]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {card.reviewer}
          </h3>
          <p className="text-sm text-slate-300">{card.reviewedAt}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${outcomeBadgeStyles[card.outcome]}`}
        >
          {outcomeLabels[card.outcome]}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{card.notes}</p>
    </article>
  );
}
