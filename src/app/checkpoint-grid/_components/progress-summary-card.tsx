import type { CheckpointProgressSummary, CheckpointTrend } from "../_data/checkpoint-grid-data";
import styles from "../checkpoint-grid.module.css";

type ProgressSummaryCardProps = {
  summary: CheckpointProgressSummary;
};

const toneClassNames = {
  steady: styles.metricToneSteady,
  watch: styles.metricToneWatch,
  risk: styles.metricToneRisk,
};

const trendLabels: Record<CheckpointTrend, string> = {
  up: "Trending up",
  down: "Trending down",
  flat: "Holding steady",
};

const trendSymbols: Record<CheckpointTrend, string> = {
  up: "\u2191",
  down: "\u2193",
  flat: "\u2192",
};

export function ProgressSummaryCard({ summary }: ProgressSummaryCardProps) {
  return (
    <article
      className={`${styles.metricCard} ${toneClassNames[summary.tone]}`}
      role="listitem"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {summary.label}
        </p>
        <span
          className={`${styles.trendBadge} ${styles[`trend${summary.trend.charAt(0).toUpperCase()}${summary.trend.slice(1)}`]}`}
          title={trendLabels[summary.trend]}
        >
          {trendSymbols[summary.trend]}
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {summary.value}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{summary.detail}</p>
      <p className="mt-4 text-sm font-medium leading-6 text-slate-800">
        {summary.support}
      </p>
    </article>
  );
}
