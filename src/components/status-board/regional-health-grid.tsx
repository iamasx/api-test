import type { StatusBoardRegion } from "@/app/status-board/mock-data";

type RegionalHealthGridProps = {
  onClearAll: () => void;
  onSelectAll: () => void;
  onToggleRegion: (regionId: string) => void;
  regions: StatusBoardRegion[];
  selectedRegionIds: string[];
};

const toneClasses = {
  healthy: "border-emerald-200 bg-emerald-500/12 text-emerald-900",
  watch: "border-amber-200 bg-amber-400/15 text-amber-900",
  degraded: "border-rose-200 bg-rose-500/12 text-rose-900",
  failover: "border-cyan-200 bg-cyan-500/12 text-cyan-900",
} satisfies Record<StatusBoardRegion["status"], string>;
const formatDelta = (delta: number) => `${delta >= 0 ? "+" : ""}${delta} ms`;

export function RegionalHealthGrid({
  onClearAll,
  onSelectAll,
  onToggleRegion,
  regions,
  selectedRegionIds,
}: RegionalHealthGridProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/75 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Regional health</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Filter dependencies by active geography</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950" onClick={onSelectAll} type="button">Select all regions</button>
          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950" onClick={onClearAll} type="button">Clear all regions</button>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {regions.map((region) => {
          const isSelected = selectedRegionIds.includes(region.id);
          return (
            <button
              aria-label={`Toggle region ${region.name}`}
              aria-pressed={isSelected}
              className={`rounded-[24px] border p-4 text-left transition ${isSelected ? "border-slate-950 bg-slate-950 text-slate-50 shadow-[0_18px_35px_rgba(15,23,42,0.18)]" : "border-slate-200 bg-slate-50/85 text-slate-950 hover:border-slate-400"}`}
              key={region.id}
              onClick={() => onToggleRegion(region.id)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-current/60">{region.code} · {region.city}</p>
                  <h3 className="mt-2 text-xl font-semibold">{region.name}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${isSelected ? "border-white/20 bg-white/10 text-slate-50" : toneClasses[region.status]}`}>{region.status}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-black/5 p-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-current/60">p95 latency</p>
                  <p className="mt-2 text-2xl font-semibold">{region.latencyMs} ms</p>
                </div>
                <div className="rounded-2xl bg-black/5 p-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-current/60">Delta</p>
                  <p className="mt-2 text-2xl font-semibold">{formatDelta(region.latencyDeltaMs)}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-current/70">
                <span>{region.trafficShare}% traffic share</span>
                <span>{region.incidents} active incidents</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-current/72">{region.summary}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
