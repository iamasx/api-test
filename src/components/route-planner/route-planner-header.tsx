type RoutePlannerHeaderProps = { activeConstraintCount: number; dispatchLead: string; objective: string; planningMode: string; routeName: string; routeScore: number; selectedWindow: string; summary: string; totalSegments: number; visibleSegments: number };

export function RoutePlannerHeader({ activeConstraintCount, dispatchLead, objective, planningMode, routeName, routeScore, selectedWindow, summary, totalSegments, visibleSegments }: RoutePlannerHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-amber-200/70 bg-[linear-gradient(135deg,rgba(255,251,235,0.96),rgba(255,237,213,0.92))] p-6 shadow-[0_30px_80px_-45px_rgba(146,64,14,0.6)] sm:p-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.85fr)]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">{planningMode}</p>
          <div className="space-y-3">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{routeName}</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">{summary}</p>
            <p className="max-w-3xl text-sm leading-6 text-slate-600">{objective}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div className="rounded-[1.5rem] bg-slate-950 px-5 py-4 text-slate-50">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-200">Route Score</p>
            <p className="mt-2 text-3xl font-semibold">{routeScore}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white/80 px-5 py-4 text-slate-900">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Selected Window</p>
            <p className="mt-2 text-lg font-semibold">{selectedWindow}</p>
            <p className="mt-1 text-sm text-slate-600">{dispatchLead}</p>
          </div>
          <div className="rounded-[1.5rem] bg-white/80 px-5 py-4 text-slate-900">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">In Scope</p>
            <p className="mt-2 text-lg font-semibold">{visibleSegments} of {totalSegments} segments</p>
            <p className="mt-1 text-sm text-slate-600">{activeConstraintCount > 0 ? `${activeConstraintCount} active constraint filters` : "Baseline route view"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
