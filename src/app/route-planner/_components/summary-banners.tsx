import type {
  RouteConstraint,
  RoutePlannerStat,
  TimingSignal,
} from "../_data/route-planner-data";

const timingToneLabels: Record<TimingSignal["tone"], string> = {
  "on-time": "On time",
  delayed: "Delayed",
  blocked: "Blocked",
};

const timingToneStyles: Record<TimingSignal["tone"], string> = {
  "on-time": "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  delayed: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  blocked: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const constraintToneLabels: Record<RouteConstraint["tone"], string> = {
  clear: "Clear",
  watch: "Watch",
  critical: "Critical",
};

const constraintToneStyles: Record<RouteConstraint["tone"], string> = {
  clear: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

type SummaryBannersProps = {
  stats: RoutePlannerStat[];
  timingSignals: TimingSignal[];
  constraints: RouteConstraint[];
};

export function SummaryBanners({
  stats,
  timingSignals,
  constraints,
}: SummaryBannersProps) {
  return (
    <section aria-label="Route planner summary banners" className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 px-5 py-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{stat.detail}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Timing pulse
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Key handoff timings
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-300">
              These signals surface whether the route still has enough timing
              cushion to protect the planned corridor.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {timingSignals.map((signal) => (
              <article
                key={signal.id}
                className="rounded-[1.35rem] border border-white/8 bg-white/5 px-4 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{signal.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
                      {signal.value}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${timingToneStyles[signal.tone]}`}
                  >
                    {timingToneLabels[signal.tone]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {signal.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/65 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Constraint summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Route watchpoints
          </h2>
          <div className="mt-5 space-y-3">
            {constraints.map((constraint) => (
              <article
                key={constraint.id}
                className="rounded-[1.35rem] border border-white/8 bg-white/5 px-4 py-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">
                      {constraint.label}
                    </p>
                    <p className="text-sm text-slate-300">{constraint.owner}</p>
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${constraintToneStyles[constraint.tone]}`}
                  >
                    {constraintToneLabels[constraint.tone]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {constraint.impact}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
