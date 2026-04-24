import type {
  AllocationCategory,
  AllocationEntry,
} from "../_data/reserve-bay-data";
import styles from "../reserve-bay.module.css";

const categoryToneClasses: Record<AllocationCategory, string> = {
  inbound: "border-sky-200 bg-sky-50/80 text-sky-800",
  outbound: "border-emerald-200 bg-emerald-50/80 text-emerald-800",
  overflow: "border-amber-200 bg-amber-50/90 text-amber-800",
  maintenance: "border-slate-200 bg-slate-100/90 text-slate-700",
};

const categoryFillClasses: Record<AllocationCategory, string> = {
  inbound: styles.fillInbound,
  outbound: styles.fillHigh,
  overflow: styles.fillModerate,
  maintenance: styles.fillMaintenance,
};

export function AllocationSummary({
  allocations,
}: {
  allocations: AllocationEntry[];
}) {
  const totalAllocated = allocations.reduce(
    (sum, a) => sum + a.baysAllocated,
    0,
  );
  const totalUsed = allocations.reduce((sum, a) => sum + a.baysUsed, 0);

  return (
    <div className={`${styles.surfaceCard} space-y-6 p-6 sm:p-8`}>
      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          Facility summary
        </p>
        <div className="flex items-baseline gap-3">
          <p className="text-3xl font-semibold tracking-tight text-slate-950">
            {totalUsed}/{totalAllocated}
          </p>
          <p className="text-sm text-slate-500">bays in use</p>
        </div>
      </div>

      <div aria-label="Allocation breakdown" className="space-y-4" role="list">
        {allocations.map((alloc) => (
          <div
            key={alloc.id}
            role="listitem"
            className="space-y-3 rounded-2xl bg-white/80 px-4 py-4 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${categoryToneClasses[alloc.category]}`}
                >
                  {alloc.label}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {alloc.baysUsed}/{alloc.baysAllocated}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span>Utilization</span>
                <span>{alloc.utilization}%</span>
              </div>
              <div className={styles.progressRail}>
                <span
                  className={`${styles.progressFill} ${categoryFillClasses[alloc.category]}`}
                  style={{ width: `${alloc.utilization}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
