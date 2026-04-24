import type { UtilizationCard } from "../_data/capacity-planner-data";
import styles from "../capacity-planner.module.css";

const statusLabels: Record<UtilizationCard["status"], string> = {
  healthy: "Healthy",
  elevated: "Elevated",
  critical: "Critical",
};

const statusBadgeStyles: Record<UtilizationCard["status"], string> = {
  healthy: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  elevated: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const statusSurfaceStyles: Record<UtilizationCard["status"], string> = {
  healthy: styles.utilHealthy,
  elevated: styles.utilElevated,
  critical: styles.utilCritical,
};

type UtilizationCardItemProps = {
  card: UtilizationCard;
};

export function UtilizationCardItem({ card }: UtilizationCardItemProps) {
  return (
    <article
      className={`${styles.utilCard} ${statusSurfaceStyles[card.status]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {card.resource}
          </h3>
          <p className="text-sm text-slate-300">{card.owner}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusBadgeStyles[card.status]}`}
        >
          {statusLabels[card.status]}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Utilization
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
            {card.currentUtilization}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Capacity
          </p>
          <p className="mt-1 text-sm font-medium text-slate-100">
            {card.capacity}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{card.note}</p>
    </article>
  );
}
