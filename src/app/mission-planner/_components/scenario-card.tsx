import type {
  MissionPriority,
  MissionScenario,
} from "../_data/mission-planner-data";

const priorityStyles: Record<MissionPriority, string> = {
  critical:
    "border-rose-300/35 bg-rose-300/14 text-rose-50 shadow-[0_12px_30px_rgba(244,63,94,0.2)]",
  timed:
    "border-amber-300/35 bg-amber-300/14 text-amber-50 shadow-[0_12px_30px_rgba(245,158,11,0.2)]",
  watch:
    "border-sky-300/35 bg-sky-300/14 text-sky-50 shadow-[0_12px_30px_rgba(56,189,248,0.16)]",
};

const priorityLabels: Record<MissionPriority, string> = {
  critical: "Critical path",
  timed: "Timed branch",
  watch: "Watch branch",
};

const priorityGlowStyles: Record<MissionPriority, string> = {
  critical: "bg-rose-300/30",
  timed: "bg-amber-300/26",
  watch: "bg-sky-300/24",
};

type ScenarioCardProps = {
  scenario: MissionScenario;
};

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(9,15,28,0.9))] p-6 shadow-[0_24px_60px_rgba(2,6,23,0.28)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
      role="listitem"
    >
      <div
        aria-hidden
        className={`absolute left-6 top-0 h-24 w-32 -translate-y-1/3 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${priorityGlowStyles[scenario.priority]}`}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${priorityStyles[scenario.priority]}`}
        >
          {priorityLabels[scenario.priority]}
        </span>
        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Window
          </p>
          <p className="mt-1 text-sm font-medium text-slate-200">
            {scenario.launchWindow}
          </p>
        </div>
      </div>

      <div className="relative mt-5 space-y-3">
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {scenario.title}
        </h3>
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
          {scenario.objective}
        </p>
        <p className="text-sm leading-6 text-slate-300">{scenario.summary}</p>
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Lead
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-100">{scenario.lead}</dd>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Support
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-100">{scenario.support}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Required checkpoints
        </p>
        <ul className="mt-3 space-y-3">
          {scenario.checkpoints.map((checkpoint) => (
            <li
              key={checkpoint}
              className="flex gap-3 rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-200"
            >
              <span
                aria-hidden
                className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${priorityGlowStyles[scenario.priority]}`}
              />
              <span>{checkpoint}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
