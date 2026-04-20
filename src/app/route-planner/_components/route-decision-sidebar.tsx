import type {
  RouteConstraint,
  RouteDecision,
  TimingSignal,
} from "../_data/route-planner-data";

const decisionStateLabels: Record<RouteDecision["state"], string> = {
  ready: "Ready",
  review: "Review",
  hold: "Hold",
};

const decisionStateStyles: Record<RouteDecision["state"], string> = {
  ready: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  review: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  hold: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

type RouteDecisionSidebarProps = {
  decisions: RouteDecision[];
  timingSignals: TimingSignal[];
  constraints: RouteConstraint[];
};

export function RouteDecisionSidebar({
  decisions,
  timingSignals,
  constraints,
}: RouteDecisionSidebarProps) {
  const blockedSignals = timingSignals.filter(
    (signal) => signal.tone === "blocked",
  ).length;
  const criticalConstraints = constraints.filter(
    (constraint) => constraint.tone === "critical",
  ).length;

  return (
    <aside
      aria-label="Route decision sidebar"
      className="rounded-[1.9rem] border border-white/10 bg-slate-950/65 p-6"
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
            Decision rail
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Route-level calls
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Keep release, reroute, and crew decisions visible in one place so
            the route owner can act before the lane hardens.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Blocked timing signals
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {blockedSignals}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Critical constraints
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {criticalConstraints}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {decisions.map((decision) => (
            <article
              key={decision.id}
              className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">
                    {decision.title}
                  </p>
                  <p className="text-sm text-slate-300">{decision.owner}</p>
                </div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${decisionStateStyles[decision.state]}`}
                >
                  {decisionStateLabels[decision.state]}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {decision.detail}
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {decision.deadline}
              </p>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
