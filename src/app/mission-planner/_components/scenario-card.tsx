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

type ScenarioCardProps = {
  scenario: MissionScenario;
};

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <article
      className="rounded-[1.8rem] border border-white/10 bg-slate-950/55 p-6 shadow-[0_24px_60px_rgba(2,6,23,0.28)] backdrop-blur"
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${priorityStyles[scenario.priority]}`}
        >
          {priorityLabels[scenario.priority]}
        </span>
        <p className="text-sm font-medium text-slate-300">{scenario.launchWindow}</p>
      </div>

      <div className="mt-5 space-y-3">
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
              className="rounded-2xl border border-white/8 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-200"
            >
              {checkpoint}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
