import type {
  BriefingScenarioTone,
  MissionBriefingScenario,
} from "../_data/mission-briefing-data";

const toneBadgeStyles: Record<BriefingScenarioTone, string> = {
  accelerate:
    "border-amber-300/40 bg-amber-300/16 text-amber-100 shadow-[0_14px_35px_rgba(245,158,11,0.18)]",
  stabilize:
    "border-sky-300/35 bg-sky-300/14 text-sky-100 shadow-[0_14px_35px_rgba(56,189,248,0.16)]",
  contain:
    "border-emerald-300/35 bg-emerald-300/14 text-emerald-100 shadow-[0_14px_35px_rgba(16,185,129,0.16)]",
};

const toneGlowStyles: Record<BriefingScenarioTone, string> = {
  accelerate: "bg-amber-300/24",
  stabilize: "bg-sky-300/22",
  contain: "bg-emerald-300/22",
};

const toneLabels: Record<BriefingScenarioTone, string> = {
  accelerate: "Accelerate",
  stabilize: "Stabilize",
  contain: "Contain",
};

type BriefingScenarioCardProps = {
  scenario: MissionBriefingScenario;
};

export function BriefingScenarioCard({
  scenario,
}: BriefingScenarioCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,18,32,0.92),rgba(7,12,24,0.94))] p-6 shadow-[0_28px_80px_rgba(3,7,18,0.32)] transition-transform duration-300 hover:-translate-y-1"
      role="listitem"
    >
      <div
        aria-hidden
        className={`absolute left-5 top-0 h-28 w-36 -translate-y-1/3 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${toneGlowStyles[scenario.tone]}`}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${toneBadgeStyles[scenario.tone]}`}
        >
          {toneLabels[scenario.tone]}
        </span>
        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Launch window
          </p>
          <p className="mt-1 text-sm font-medium text-slate-100">
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
        <p className="text-sm leading-7 text-slate-300">{scenario.summary}</p>
      </div>

      <dl className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Commander
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-100">
            {scenario.commander}
          </dd>
        </div>
        <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Support lead
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-100">
            {scenario.supportLead}
          </dd>
        </div>
        <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Readiness
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-100">
            {scenario.readiness}
          </dd>
        </div>
        <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Confidence
          </dt>
          <dd className="mt-2 text-sm font-medium text-slate-100">
            {scenario.confidence}
          </dd>
        </div>
      </dl>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-[1.5rem] border border-white/8 bg-slate-950/80 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Asset mix
          </p>
          <ul className="mt-3 space-y-3">
            {scenario.assetMix.map((asset) => (
              <li
                key={asset}
                className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-sm leading-6 text-slate-200"
              >
                {asset}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-slate-950/80 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Friction points
          </p>
          <ul className="mt-3 space-y-3">
            {scenario.frictionPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-2xl border border-white/8 bg-white/5 px-3 py-3 text-sm leading-6 text-slate-200"
              >
                <span
                  aria-hidden
                  className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${toneGlowStyles[scenario.tone]}`}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.22))] px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Recommended decision
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-200">{scenario.decision}</p>
      </div>
    </article>
  );
}
