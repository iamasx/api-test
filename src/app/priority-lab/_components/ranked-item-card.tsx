import type { RankedItem } from "../_data/priority-lab-data";
import styles from "../priority-lab.module.css";

const tierLabels: Record<RankedItem["tier"], string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const tierBadgeStyles: Record<RankedItem["tier"], string> = {
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
  high: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  medium: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  low: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
};

const tierSurfaceStyles: Record<RankedItem["tier"], string> = {
  critical: styles.tierCritical,
  high: styles.tierHigh,
  medium: styles.tierMedium,
  low: styles.tierLow,
};

type RankedItemCardProps = {
  item: RankedItem;
};

export function RankedItemCard({ item }: RankedItemCardProps) {
  return (
    <article
      className={`${styles.rankCard} ${tierSurfaceStyles[item.tier]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Rank #{item.rank}
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {item.title}
          </h3>
          <p className="text-sm text-slate-300">{item.owner}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${tierBadgeStyles[item.tier]}`}
        >
          {tierLabels[item.tier]}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Priority score
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
          {item.score}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{item.summary}</p>
    </article>
  );
}
