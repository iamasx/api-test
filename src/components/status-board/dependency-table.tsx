import type { BoardTone, StatusBoardDependency } from "@/app/status-board/mock-data";

type DependencyTableProps = {
  dependencies: StatusBoardDependency[];
  filterOptions: { count: number; id: string; label: string }[];
  onFilterChange: (filterId: string) => void;
  selectedFilter: string;
  selectedRegionCount: number;
};

const toneClasses = {
  healthy: "border-emerald-200 bg-emerald-500/12 text-emerald-900",
  watch: "border-amber-200 bg-amber-400/15 text-amber-900",
  degraded: "border-rose-200 bg-rose-500/12 text-rose-900",
  failover: "border-cyan-200 bg-cyan-500/12 text-cyan-900",
} satisfies Record<BoardTone, string>;

export function DependencyTable({
  dependencies,
  filterOptions,
  onFilterChange,
  selectedFilter,
  selectedRegionCount,
}: DependencyTableProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/78 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Dependency health</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Regional dependency coverage</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const isActive = selectedFilter === option.id;
            return (
              <button
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isActive ? "border-slate-950 bg-slate-950 text-slate-50" : "border-slate-300 bg-white text-slate-700 hover:border-slate-950 hover:text-slate-950"}`}
                key={option.id}
                onClick={() => onFilterChange(option.id)}
                type="button"
              >
                {option.label} · {option.count}
              </button>
            );
          })}
        </div>
      </div>
      {selectedRegionCount === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-950">Select at least one region to inspect dependency coverage.</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Clear filters only when you want a deliberate zero-state. The table repopulates as soon as a regional card is active again.</p>
        </div>
      ) : dependencies.length === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-950">No dependencies match the current state filter.</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Switch the status chips above or widen the regional selection to compare a broader failover surface.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-950 text-left text-xs uppercase tracking-[0.22em] text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Primary</th>
                  <th className="px-4 py-3 font-medium">Backup</th>
                  <th className="px-4 py-3 font-medium">p95</th>
                  <th className="px-4 py-3 font-medium">Error rate</th>
                  <th className="px-4 py-3 font-medium">Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {dependencies.map((dependency) => (
                  <tr className="align-top text-sm text-slate-700" key={dependency.id}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-950">{dependency.service}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{dependency.owner}</p>
                    </td>
                    <td className="px-4 py-4"><span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${toneClasses[dependency.status]}`}>{dependency.status}</span></td>
                    <td className="px-4 py-4">{dependency.primaryRegion}</td>
                    <td className="px-4 py-4">{dependency.backupRegion}</td>
                    <td className="px-4 py-4">{dependency.p95LatencyMs} ms</td>
                    <td className="px-4 py-4">{dependency.errorRate.toFixed(2)}%</td>
                    <td className="px-4 py-4">{dependency.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
