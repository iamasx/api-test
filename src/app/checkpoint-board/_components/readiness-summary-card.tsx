import type { ReadinessSummary } from "../_data/checkpoint-board-data";
import styles from "../checkpoint-board.module.css";

type ReadinessSummaryCardProps = {
  summary: ReadinessSummary;
};

const toneClassNames = {
  steady: styles.summaryToneSteady,
  watch: styles.summaryToneWatch,
  risk: styles.summaryToneRisk,
};

export function ReadinessSummaryCard({ summary }: ReadinessSummaryCardProps) {
  return (
    <article
      className={`${styles.summaryCard} ${toneClassNames[summary.tone]}`}
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
