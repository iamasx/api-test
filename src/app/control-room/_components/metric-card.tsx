import type {
  ControlRoomMetric,
  MetricStatus,
} from "../_data/control-room-data";
import styles from "../control-room.module.css";

const statusBadgeClasses: Record<MetricStatus, string> = {
  stable: "border-emerald-200 bg-emerald-50 text-emerald-800",
  attention: "border-amber-200 bg-amber-50 text-amber-800",
  critical: "border-rose-200 bg-rose-50 text-rose-800",
};

const progressFillClasses: Record<MetricStatus, string> = {
  stable: styles.metricFillStable,
  attention: styles.metricFillAttention,
  critical: styles.metricFillCritical,
};

export function MetricCard({ metric }: { metric: ControlRoomMetric }) {
  return (
    <article
      role="listitem"
      className={`${styles.surfaceCard} ${styles.metricCard} flex h-full flex-col gap-5 p-5`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {metric.label}
          </p>
          <p className="text-4xl font-semibold tracking-tight text-slate-950">
            {metric.value}
          </p>
        </div>

        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadgeClasses[metric.status]}`}
        >
          {metric.delta}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-600">{metric.context}</p>

      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>{metric.focus}</span>
          <span>{metric.progress}%</span>
        </div>
        <div className={styles.metricRail}>
          <span
            className={`${styles.metricFill} ${progressFillClasses[metric.status]}`}
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
