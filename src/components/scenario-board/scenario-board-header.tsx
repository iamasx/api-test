import { activeScenario, scenarioModes, type ScenarioMode } from "@/app/scenario-board/scenario-board-data";

type ScenarioBoardHeaderProps = {
  activeAssumptionCount: number;
  mode: ScenarioMode;
  outcomeCount: number;
  playbookCount: number;
  onModeChange: (mode: ScenarioMode) => void;
};

export function ScenarioBoardHeader({
  activeAssumptionCount,
  mode,
  outcomeCount,
  playbookCount,
  onModeChange,
}: ScenarioBoardHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-amber-200/15 bg-stone-950/70 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">Scenario board</p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight text-stone-50 sm:text-5xl">{activeScenario.title}</h1>
            <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
              {activeScenario.modeBadges[mode]}
            </span>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-stone-300 sm:text-base">{activeScenario.brief}</p>
          <div className="flex flex-wrap gap-3 text-sm text-stone-300">
            <span className="rounded-full bg-white/5 px-3 py-1.5">{activeScenario.window}</span>
            <span className="rounded-full bg-white/5 px-3 py-1.5">{activeScenario.decision}</span>
          </div>
        </div>

        <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap gap-2">
            {scenarioModes.map((option) => (
              <button
                aria-pressed={option === mode}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  option === mode ? "bg-amber-300 text-stone-950" : "bg-white/5 text-stone-200 hover:bg-white/10"
                }`}
                key={option}
                onClick={() => onModeChange(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {activeScenario.metrics.map((metric) => (
              <div className="rounded-2xl bg-black/20 p-4" key={metric.label}>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">{metric.label}</p>
                <p className="mt-2 text-lg font-semibold text-stone-50">{metric.value}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/80">Visible playbooks</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-100">{playbookCount}</p>
            </div>
            <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-200/80">Active assumptions</p>
              <p className="mt-2 text-2xl font-semibold text-sky-100">{activeAssumptionCount}</p>
            </div>
            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-rose-200/80">Matrix outcomes</p>
              <p className="mt-2 text-2xl font-semibold text-rose-100">{outcomeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
