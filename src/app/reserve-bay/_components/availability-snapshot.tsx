import type {
  AvailabilityLevel,
  AvailabilitySnapshot,
} from "../_data/reserve-bay-data";
import styles from "../reserve-bay.module.css";

const levelToneClasses: Record<AvailabilityLevel, string> = {
  high: "border-emerald-200 bg-emerald-50/80 text-emerald-800",
  moderate: "border-amber-200 bg-amber-50/90 text-amber-800",
  low: "border-rose-200 bg-rose-50 text-rose-800",
};

const levelFillClasses: Record<AvailabilityLevel, string> = {
  high: styles.fillHigh,
  moderate: styles.fillModerate,
  low: styles.fillLow,
};

export function AvailabilitySnapshotCard({
  snapshot,
}: {
  snapshot: AvailabilitySnapshot;
}) {
  const occupancyPct = Math.round(
    (snapshot.occupiedBays / snapshot.totalBays) * 100,
  );
  const freeBays = snapshot.totalBays - snapshot.occupiedBays;

  return (
    <article
      role="listitem"
      className={`${styles.surfaceCard} flex h-full flex-col gap-5 p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {snapshot.zone}
          </p>
          <p className="text-4xl font-semibold tracking-tight text-slate-950">
            {freeBays} <span className="text-lg text-slate-500">free</span>
          </p>
        </div>
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${levelToneClasses[snapshot.level]}`}
        >
          {snapshot.level} availability
        </span>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Next free at
          </p>
          <p className="mt-2 font-medium text-slate-700">
            {snapshot.nextFreeAt}
          </p>
        </div>
        <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Peak window
          </p>
          <p className="mt-2 font-medium text-slate-700">
            {snapshot.peakWindow}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          <span>Occupancy</span>
          <span>
            {snapshot.occupiedBays}/{snapshot.totalBays} bays · {occupancyPct}%
          </span>
        </div>
        <div className={styles.progressRail}>
          <span
            className={`${styles.progressFill} ${levelFillClasses[snapshot.level]}`}
            style={{ width: `${occupancyPct}%` }}
          />
        </div>
      </div>
    </article>
  );
}
