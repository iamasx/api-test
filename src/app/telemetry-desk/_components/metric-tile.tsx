import type { TelemetryMetric, TelemetryMetricTone } from "../_data/telemetry-desk-data";
import styles from "../telemetry-desk.module.css";

const metricAccentClasses: Record<TelemetryMetricTone, string> = {
  positive: styles.metricTilePositive,
  steady: styles.metricTileSteady,
  attention: styles.metricTileAttention,
};

const metricToneClasses: Record<TelemetryMetricTone, string> = {
  positive: "border-emerald-300/40 bg-emerald-300/14 text-emerald-100",
  steady: "border-sky-300/35 bg-sky-300/12 text-sky-100",
  attention: "border-amber-300/40 bg-amber-300/14 text-amber-100",
};

export function MetricTile({ metric }: { metric: TelemetryMetric }) {
  return (
    <article
      role="listitem"
      className={`${styles.metricTile} ${metricAccentClasses[metric.tone]} flex h-full flex-col gap-5 rounded-[1.8rem] p-5 sm:p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
            {metric.label}
          </p>
          <p className="text-4xl font-semibold tracking-tight text-white">
            {metric.value}
          </p>
        </div>
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${metricToneClasses[metric.tone]}`}
        >
          {metric.delta}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-200/82">{metric.context}</p>

      <div className="mt-auto grid gap-3 sm:grid-cols-2">
        <div className={styles.metricFootnote}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Benchmark
          </p>
          <p className="mt-2 text-sm font-medium text-white">{metric.benchmark}</p>
        </div>
        <div className={styles.metricFootnote}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Signal
          </p>
          <p className="mt-2 text-sm font-medium text-white">{metric.signal}</p>
        </div>
      </div>
    </article>
  );
}
