import type { CheckpointProgressSummary } from "../_data/checkpoint-grid-data";
import styles from "../checkpoint-grid.module.css";

type ProgressSummaryCardProps = {
  summary: CheckpointProgressSummary;
};

const toneClassNames = {
  steady: styles.metricToneSteady,
  watch: styles.metricToneWatch,
  risk: styles.metricToneRisk,
};

export function ProgressSummaryCard({ summary }: ProgressSummaryCardProps) {
  return (
    <article
      className={`${styles.metricCard} ${toneClassNames[summary.tone]}`}
      role="listitem"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {summary.label}
      </p>
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
