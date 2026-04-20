import type {
  MissionReadinessTone,
  PlannerStat,
  ReadinessSignal,
} from "../_data/mission-planner-data";

const signalToneStyles: Record<MissionReadinessTone, string> = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-50",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-50",
  blocked: "border-rose-300/25 bg-rose-300/10 text-rose-50",
};

const signalSurfaceStyles: Record<MissionReadinessTone, string> = {
  ready:
    "border-emerald-300/14 bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(15,23,42,0.45))]",
  watch:
    "border-amber-300/14 bg-[linear-gradient(180deg,rgba(245,158,11,0.14),rgba(15,23,42,0.45))]",
  blocked:
    "border-rose-300/14 bg-[linear-gradient(180deg,rgba(244,63,94,0.14),rgba(15,23,42,0.45))]",
};

const signalToneLabels: Record<MissionReadinessTone, string> = {
  ready: "Ready",
  watch: "Watch",
  blocked: "Blocked",
};

type ReadinessSummaryProps = {
  stats: PlannerStat[];
  signals: ReadinessSignal[];
};

export function ReadinessSummary({
  stats,
  signals,
}: ReadinessSummaryProps) {
  return (
    <section
      aria-label="Mission readiness summary"
      className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.16))] p-6 shadow-[0_28px_80px_rgba(2,6,23,0.28)] backdrop-blur xl:sticky xl:top-8"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
          Readiness highlights
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Mission posture at a glance
        </h2>
        <p className="text-sm leading-6 text-slate-300">
          Summary metrics show the planning baseline, while the readiness list
          calls out where the launch window is secure and where it still needs
          intervention.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.78),rgba(9,15,28,0.92))] px-4 py-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {signals.map((signal) => (
          <article
            key={signal.id}
            className={`rounded-[1.5rem] border px-4 py-4 ${signalSurfaceStyles[signal.tone]}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{signal.label}</p>
                <p className="mt-1 text-base font-medium text-slate-100">
                  {signal.value}
                </p>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${signalToneStyles[signal.tone]}`}
              >
                {signalToneLabels[signal.tone]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{signal.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
