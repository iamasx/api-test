import type { ScenarioBoardScenario } from "../_data/scenario-board-data";

const toneLabel = {
  recommended: "Low-risk lane",
  watch: "Moderate-risk lane",
  fallback: "High-risk lane",
} as const;

type ScenarioCardProps = {
  scenario: ScenarioBoardScenario;
};

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <article
      className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]"
      role="listitem"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700">
              {scenario.label}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {toneLabel[scenario.tone]}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {scenario.window}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              {scenario.title}
            </h3>
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              {scenario.summary}
            </p>
            <p className="text-sm leading-7 text-slate-700">{scenario.objective}</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 sm:grid-cols-2 lg:min-w-[18rem] lg:grid-cols-1">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Lead
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">{scenario.lead}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Support
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {scenario.support}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(260px,0.92fr)]">
        <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pressure point
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {scenario.pressurePoint}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700">{scenario.signal}</p>
        </div>

        <div aria-label={`${scenario.title} measures`} className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1" role="list">
          {scenario.measures.map((measure) => (
            <div
              key={measure.label}
              className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4"
              role="listitem"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {measure.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                {measure.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {measure.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Critical checkpoints
        </p>
        <ul className="grid gap-3" role="list">
          {scenario.checkpoints.map((checkpoint, index) => (
            <li
              key={checkpoint}
              className="flex items-start gap-3 rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span>{checkpoint}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
