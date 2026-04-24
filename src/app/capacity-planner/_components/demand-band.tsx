import type { DemandBand } from "../_data/capacity-planner-data";
import styles from "../capacity-planner.module.css";

const levelLabels: Record<DemandBand["level"], string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
  peak: "Peak",
};

const levelBadgeStyles: Record<DemandBand["level"], string> = {
  low: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  moderate: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  high: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  peak: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const levelSurfaceStyles: Record<DemandBand["level"], string> = {
  low: styles.bandLow,
  moderate: styles.bandModerate,
  high: styles.bandHigh,
  peak: styles.bandPeak,
};

type DemandBandCardProps = {
  band: DemandBand;
};

export function DemandBandCard({ band }: DemandBandCardProps) {
  return (
    <article
      className={`${styles.bandCard} ${levelSurfaceStyles[band.level]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {band.label}
          </h3>
          <p className="text-sm text-slate-300">{band.peakWindow}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${levelBadgeStyles[band.level]}`}
        >
          {levelLabels[band.level]}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Forecasted load
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
          {band.forecastedLoad}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{band.detail}</p>
    </article>
  );
}
