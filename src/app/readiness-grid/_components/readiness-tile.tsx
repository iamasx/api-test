import type { ReadinessTile } from "../_data/readiness-grid-data";
import styles from "../readiness-grid.module.css";

const levelLabels: Record<ReadinessTile["level"], string> = {
  ready: "Ready",
  partial: "Partial",
  blocked: "Blocked",
  "not-started": "Not started",
};

const levelBadgeStyles: Record<ReadinessTile["level"], string> = {
  ready: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  partial: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  blocked: "border-rose-300/20 bg-rose-300/10 text-rose-50",
  "not-started": "border-slate-300/20 bg-slate-300/10 text-slate-200",
};

const levelSurfaceStyles: Record<ReadinessTile["level"], string> = {
  ready: styles.tileReady,
  partial: styles.tilePartial,
  blocked: styles.tileBlocked,
  "not-started": styles.tileNotStarted,
};

type ReadinessTileCardProps = {
  tile: ReadinessTile;
};

export function ReadinessTileCard({ tile }: ReadinessTileCardProps) {
  return (
    <article
      className={`${styles.tileCard} ${levelSurfaceStyles[tile.level]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {tile.area}
          </h3>
          <p className="text-sm text-slate-300">{tile.owner}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${levelBadgeStyles[tile.level]}`}
        >
          {levelLabels[tile.level]}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Checks completed
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
          {tile.completedChecks} / {tile.totalChecks}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{tile.summary}</p>
    </article>
  );
}
