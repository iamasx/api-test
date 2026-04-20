import type { TrendDirection, TrendPanelData } from "../_data/telemetry-desk-data";
import styles from "../telemetry-desk.module.css";

const directionBadgeClasses: Record<TrendDirection, string> = {
  improving: "border-emerald-300/35 bg-emerald-300/14 text-emerald-100",
  watch: "border-amber-300/40 bg-amber-300/14 text-amber-100",
  mixed: "border-sky-300/35 bg-sky-300/12 text-sky-100",
};

const directionPanelClasses: Record<TrendDirection, string> = {
  improving: styles.trendPanelImproving,
  watch: styles.trendPanelWatch,
  mixed: styles.trendPanelMixed,
};

const directionBarClasses: Record<TrendDirection, string> = {
  improving: styles.sparkBarImproving,
  watch: styles.sparkBarWatch,
  mixed: styles.sparkBarMixed,
};

const directionLabels: Record<TrendDirection, string> = {
  improving: "Improving",
  watch: "Watch",
  mixed: "Mixed",
};

export function TrendPanel({ panel }: { panel: TrendPanelData }) {
  return (
    <article
      role="listitem"
      className={`${styles.trendPanel} ${directionPanelClasses[panel.direction]} flex h-full flex-col gap-5 rounded-[1.85rem] p-5 sm:p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
            {panel.windowLabel}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {panel.title}
          </h3>
        </div>
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${directionBadgeClasses[panel.direction]}`}
        >
          {directionLabels[panel.direction]}
        </span>
      </div>

      <p className="text-sm leading-6 text-slate-200/82">{panel.summary}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className={styles.comparisonStat}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Current window
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {panel.currentValue}
          </p>
        </div>
        <div className={styles.comparisonStat}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Reference
          </p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-white">
            {panel.comparisonValue}
          </p>
        </div>
      </div>

      <div className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Shift change
        </p>
        <p className="mt-2 text-sm font-medium text-white">{panel.changeLabel}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Comparison rail
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {panel.focusLabel}
          </p>
        </div>
        <div className={styles.sparkRail} aria-hidden>
          {panel.checkpoints.map((checkpoint) => (
            <div key={checkpoint.label} className={styles.sparkPoint}>
              <div className={styles.sparkBarTrack}>
                <span
                  className={`${styles.sparkBar} ${directionBarClasses[panel.direction]}`}
                  style={{ height: `${checkpoint.intensity}%` }}
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {checkpoint.label}
                </p>
                <p className="text-sm font-medium text-white">{checkpoint.value}</p>
                <p className="text-[11px] leading-5 text-slate-300">{checkpoint.emphasis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.panelNote}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Desk note
        </p>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-100">
          {panel.note}
        </p>
      </div>
    </article>
  );
}
