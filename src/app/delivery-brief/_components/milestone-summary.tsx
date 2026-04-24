import type { Milestone } from "../_data/delivery-brief-data";
import styles from "../delivery-brief.module.css";

const statusLabels: Record<Milestone["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

const statusBadgeStyles: Record<Milestone["status"], string> = {
  completed: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  "in-progress": "border-amber-300/20 bg-amber-300/10 text-amber-50",
  upcoming: "border-slate-300/20 bg-slate-300/10 text-slate-200",
};

type MilestoneSummaryCardProps = {
  milestone: Milestone;
};

export function MilestoneSummaryCard({ milestone }: MilestoneSummaryCardProps) {
  return (
    <article
      className={`${styles.milestoneCard} ${styles[milestone.status === "completed" ? "milestoneCompleted" : milestone.status === "in-progress" ? "milestoneInProgress" : "milestoneUpcoming"]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {milestone.label}
          </h3>
          {milestone.completedAt && (
            <p className="text-sm text-slate-300">{milestone.completedAt}</p>
          )}
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusBadgeStyles[milestone.status]}`}
        >
          {statusLabels[milestone.status]}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">
        {milestone.summary}
      </p>
    </article>
  );
}
