import type { StatusBoardSummaryStat } from "../_data/status-board-data";
import { healthStateLabels, summaryStateStyles } from "./state-styles";

type StatusSummaryBannerProps = {
  stat: StatusBoardSummaryStat;
};

export function StatusSummaryBanner({ stat }: StatusSummaryBannerProps) {
  const styles = summaryStateStyles[stat.state];

  return (
    <article
      className={`rounded-[1.6rem] border p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${styles.panel}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          {stat.label}
        </p>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${styles.badge}`}
        >
          {healthStateLabels[stat.state]}
        </span>
      </div>
      <p className={`mt-4 text-3xl font-semibold tracking-tight ${styles.value}`}>
        {stat.value}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700">{stat.detail}</p>
    </article>
  );
}
