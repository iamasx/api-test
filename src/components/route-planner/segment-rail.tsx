import type {
  RouteConstraint,
  RouteSegment,
} from "@/app/route-planner/route-planner-data";

type SegmentRailProps = { constraints: RouteConstraint[]; hasActiveFilters: boolean; onClearFilters: () => void; onSelectSegment: (segmentId: string) => void; routeName: string; segments: RouteSegment[]; selectedSegmentId: string | null; totalSegments: number };

const statusStyles = {
  locked: "bg-emerald-100 text-emerald-800",
  watch: "bg-amber-100 text-amber-800",
  reroute: "bg-rose-100 text-rose-800",
} as const;

export function SegmentRail({
  constraints,
  hasActiveFilters,
  onClearFilters,
  onSelectSegment,
  routeName,
  segments,
  selectedSegmentId,
  totalSegments,
}: SegmentRailProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_22px_60px_-45px_rgba(15,23,42,0.4)] backdrop-blur sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Segment Rail</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Active chain for {routeName}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Inspect each handoff in sequence and narrow the board to the segments touched by current constraints.</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">Showing {segments.length} of {totalSegments}</div>
      </div>
      {segments.length > 0 ? (
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {segments.map((segment) => {
            const isSelected = segment.id === selectedSegmentId;
            return (
              <button aria-pressed={isSelected} className={`min-w-[18.5rem] flex-1 rounded-[1.5rem] border px-5 py-5 text-left transition sm:min-w-[20rem] ${isSelected ? "border-slate-900 bg-slate-950 text-slate-50 shadow-[0_28px_70px_-42px_rgba(15,23,42,0.85)]" : "border-slate-200 bg-slate-50/80 text-slate-900 hover:border-slate-300 hover:bg-white"}`} key={segment.id} onClick={() => onSelectSegment(segment.id)} type="button">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${isSelected ? "text-slate-300" : "text-slate-500"}`}>{segment.mode}</p>
                    <h3 className="mt-2 text-xl font-semibold">{segment.label}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isSelected ? "bg-white/12 text-white" : statusStyles[segment.status]}`}>{segment.status}</span>
                </div>
                <div className={`mt-5 rounded-[1.25rem] border px-4 py-4 ${isSelected ? "border-white/10 bg-white/6" : "border-slate-200 bg-white/70"}`}>
                  <p className={isSelected ? "text-slate-300" : "text-slate-500"}>{segment.start}</p>
                  <p className="mt-2 text-lg font-semibold">{segment.end}</p>
                  <p className={`mt-2 text-sm ${isSelected ? "text-slate-300" : "text-slate-600"}`}>{segment.window} • {segment.bufferMinutes} min buffer</p>
                </div>
                <p className={`mt-4 text-sm leading-6 ${isSelected ? "text-slate-200" : "text-slate-600"}`}>{segment.note}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {segment.constraintIds.length > 0 ? (
                    segment.constraintIds.map((constraintId) => {
                      const label = constraints.find((constraint) => constraint.id === constraintId)?.label ?? constraintId.replace("-", " ");
                      return (
                        <span className={`rounded-full px-3 py-1 text-xs ${isSelected ? "bg-white/12 text-slate-100" : "bg-slate-200 text-slate-700"}`} key={constraintId}>{label}</span>
                      );
                    })
                  ) : (
                    <span className={`rounded-full px-3 py-1 text-xs ${isSelected ? "bg-white/12 text-slate-100" : "bg-emerald-100 text-emerald-800"}`}>No active constraint tags</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Zero State</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-950">No segments match the current constraint focus.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{hasActiveFilters ? "Clear one or more filters to restore the full route chain." : "Select another route to continue reviewing segment coverage."}</p>
          {hasActiveFilters ? (
            <button className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" onClick={onClearFilters} type="button">
              Reset constraint filters
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
