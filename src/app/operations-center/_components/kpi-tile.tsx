import type { KpiMetric, MetricTone } from "../_data/dashboard-data";
import styles from "../operations-center.module.css";

const toneBadge: Record<MetricTone, string> = {
  positive: "border-emerald-200 bg-emerald-50/80 text-emerald-800",
  caution: "border-amber-200 bg-amber-50/80 text-amber-800",
  neutral: "border-slate-200 bg-slate-50/80 text-slate-700",
};

export function KpiTile({ metric }: { metric: KpiMetric }) {
  return (
    <article role="listitem" className={`${styles.surfaceCard} flex flex-col gap-4 p-5`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          {metric.label}
        </p>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${toneBadge[metric.tone]}`}
        >
          {metric.delta}
        </span>
      </div>

      <p className="text-3xl font-semibold tracking-tight text-slate-950">
        {metric.value}
      </p>

      <p className="text-sm leading-6 text-slate-600">{metric.detail}</p>
    </article>
  );
}
