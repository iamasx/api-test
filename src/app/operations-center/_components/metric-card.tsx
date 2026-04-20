import type { DashboardMetric, MetricTone } from "../_data/dashboard-data";
import styles from "../operations-center.module.css";

const metricToneClasses: Record<MetricTone, string> = {
  positive:
    "border-emerald-200 bg-emerald-50/80 text-emerald-800 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]",
  caution:
    "border-amber-200 bg-amber-50/90 text-amber-800 shadow-[0_0_0_1px_rgba(245,158,11,0.08)]",
  neutral:
    "border-slate-200 bg-slate-100/90 text-slate-700 shadow-[0_0_0_1px_rgba(100,116,139,0.08)]",
};

const metricFillClasses: Record<MetricTone, string> = {
  positive: styles.metricFillPositive,
  caution: styles.metricFillCaution,
  neutral: styles.metricFillNeutral,
};

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article
      role="listitem"
      className={`${styles.surfaceCard} ${styles.metricCard} flex h-full flex-col gap-5 p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {metric.label}
          </p>
          <p className="text-4xl font-semibold tracking-tight text-slate-950">
            {metric.value}
          </p>
        </div>
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${metricToneClasses[metric.tone]}`}
        >
          {metric.delta}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-600">{metric.context}</p>

      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>{metric.highlight}</span>
          <span>{metric.progress}%</span>
        </div>
        <div className={styles.metricRail}>
          <span
            className={`${styles.metricFill} ${metricFillClasses[metric.tone]}`}
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
