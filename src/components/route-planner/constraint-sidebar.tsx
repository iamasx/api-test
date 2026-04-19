import type {
  ConstraintId,
  RouteConstraint,
  RouteSegment,
} from "@/app/route-planner/route-planner-data";

type DecisionState = { detail: string; label: string; title: string };
type ConstraintSidebarProps = {
  activeSegment: RouteSegment | null;
  constraints: RouteConstraint[];
  decision: DecisionState;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onToggleConstraint: (constraintId: ConstraintId) => void;
  selectedConstraintIds: ConstraintId[];
  totalBufferMinutes: number;
  visibleSegments: RouteSegment[];
};

const severityStyles = {
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

export function ConstraintSidebar({
  activeSegment,
  constraints,
  decision,
  hasActiveFilters,
  onClearFilters,
  onToggleConstraint,
  selectedConstraintIds,
  totalBufferMinutes,
  visibleSegments,
}: ConstraintSidebarProps) {
  const rerouteCount = visibleSegments.filter((segment) => segment.status === "reroute").length;
  const watchCount = visibleSegments.filter((segment) => segment.status === "watch").length;
  const owners = [...new Set(visibleSegments.map((segment) => segment.owner))].slice(0, 3);

  return (
    <aside className="space-y-5 rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.92))] p-5 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.45)] sm:p-6">
      <section>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Constraint Sidebar</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Decision inputs</h2>
          </div>
          {hasActiveFilters ? (
            <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white" onClick={onClearFilters} type="button">
              Clear all
            </button>
          ) : null}
        </div>
        <div className="mt-5 grid gap-3">
          {constraints.map((constraint) => {
            const isSelected = selectedConstraintIds.includes(constraint.id);
            return (
              <button aria-pressed={isSelected} className={`rounded-[1.35rem] border px-4 py-4 text-left transition ${isSelected ? "border-slate-900 bg-slate-950 text-white shadow-[0_22px_55px_-38px_rgba(15,23,42,0.9)]" : "border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white"}`} key={constraint.id} onClick={() => onToggleConstraint(constraint.id)} type="button">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">{constraint.label}</h3>
                    <p className={`mt-2 text-sm leading-6 ${isSelected ? "text-slate-300" : "text-slate-600"}`}>{constraint.description}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${isSelected ? "border-white/15 bg-white/10 text-white" : severityStyles[constraint.severity]}`}>{constraint.severity}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        <div className="rounded-[1.4rem] bg-slate-950 px-4 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Buffer In View</p>
          <p className="mt-2 text-2xl font-semibold">{totalBufferMinutes} min</p>
        </div>
        <div className="rounded-[1.4rem] bg-white px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Watch Segments</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{watchCount}</p>
        </div>
        <div className="rounded-[1.4rem] bg-white px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Reroute Calls</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{rerouteCount}</p>
        </div>
      </section>
      <section className="rounded-[1.5rem] border border-slate-200 bg-white/85 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Focused Segment</p>
        {activeSegment ? (
          <>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">{activeSegment.label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{activeSegment.start} to {activeSegment.end}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[1.25rem] bg-slate-100 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Window</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{activeSegment.window}</p>
              </div>
              <div className="rounded-[1.25rem] bg-slate-100 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Confidence</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{activeSegment.confidence}%</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{activeSegment.fallback}</p>
          </>
        ) : (
          <p className="mt-3 text-sm leading-6 text-slate-600">No segment is visible for the current filter set.</p>
        )}
      </section>
      <section className="rounded-[1.5rem] border border-amber-200 bg-amber-50/80 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Decision Sidebar</p>
        <h3 className="mt-3 text-xl font-semibold text-slate-950">{decision.title}</h3>
        <p className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{decision.label}</p>
        <p className="mt-4 text-sm leading-6 text-slate-700">{decision.detail}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {owners.length > 0 ? (
            owners.map((owner) => (
              <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-700" key={owner}>{owner}</span>
            ))
          ) : (
            <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-700">No active owners in scope</span>
          )}
        </div>
      </section>
    </aside>
  );
}
