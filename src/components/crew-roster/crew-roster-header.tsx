type CrewRosterHeaderProps = {
  activeRotationLabel: string; cycleLabel: string; handoffAt: string; readinessNote: string; readyCount: number;
  selectedRoleLabel: string; totalCrew: number; totalTeams: number; visibleCrewCount: number; visibleTeamsCount: number;
};

export function CrewRosterHeader({
  activeRotationLabel, cycleLabel, handoffAt, readinessNote, readyCount,
  selectedRoleLabel, totalCrew, totalTeams, visibleCrewCount, visibleTeamsCount,
}: CrewRosterHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-amber-200/15 bg-[linear-gradient(140deg,rgba(120,53,15,0.36),rgba(15,23,42,0.92)_42%,rgba(17,24,39,0.96)_100%)] px-6 py-7 shadow-2xl shadow-slate-950/30">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.95fr)] lg:px-2">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-amber-200/80">Crew Roster</p>
          <h1 className="max-w-3xl font-[family-name:Georgia,Times,serif] text-4xl font-semibold tracking-tight text-white sm:text-5xl">Team cards, role coverage, and duty handoffs in one isolated watch board.</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Narrow the roster by specialty, inspect readiness at the team level, and open a local rotation card for handoff notes without touching any shared route state.</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{cycleLabel}</span>
            <span className="rounded-full border border-amber-300/25 bg-amber-200/10 px-3 py-1.5">Active watch: {activeRotationLabel}</span>
            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1.5">Handoff at {handoffAt}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Focus: {selectedRoleLabel}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4 backdrop-blur">
            <p className="text-sm text-slate-300">Crew listed</p>
            <p className="mt-2 text-3xl font-semibold text-white">{totalCrew}</p>
            <p className="mt-1 text-xs text-slate-400">{visibleCrewCount} in current filter</p>
          </div>
          <div className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 px-4 py-4">
            <p className="text-sm text-emerald-100">Ready now</p>
            <p className="mt-2 text-3xl font-semibold text-white">{readyCount}</p>
            <p className="mt-1 text-xs text-emerald-100/80">{readinessNote}</p>
          </div>
          <div className="rounded-[1.5rem] border border-sky-300/20 bg-sky-300/10 px-4 py-4">
            <p className="text-sm text-sky-100">Teams in view</p>
            <p className="mt-2 text-3xl font-semibold text-white">{visibleTeamsCount}/{totalTeams}</p>
            <p className="mt-1 text-xs text-sky-100/80">Desktop and mobile-safe layout</p>
          </div>
        </div>
      </div>
    </section>
  );
}
