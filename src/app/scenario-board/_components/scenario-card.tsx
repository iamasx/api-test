import type { ScenarioBoardScenario } from "../_data/scenario-board-data";
import styles from "../scenario-board.module.css";

const toneClasses = {
  recommended: {
    label: "Low-risk lane",
    frame: "border-emerald-300/26",
    badge: "bg-emerald-100 text-emerald-950",
    accent: "text-emerald-200",
    chip: "border-emerald-300/20 bg-emerald-300/10",
  },
  watch: {
    label: "Moderate-risk lane",
    frame: "border-amber-300/28",
    badge: "bg-amber-100 text-amber-950",
    accent: "text-amber-200",
    chip: "border-amber-300/18 bg-amber-300/10",
  },
  fallback: {
    label: "High-risk lane",
    frame: "border-sky-300/28",
    badge: "bg-sky-100 text-sky-950",
    accent: "text-sky-200",
    chip: "border-sky-300/18 bg-sky-300/10",
  },
} as const;

type ScenarioCardProps = {
  scenario: ScenarioBoardScenario;
};

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const tone = toneClasses[scenario.tone];

  return (
    <article
      className={`${styles.cardChrome} rounded-[1.75rem] border p-6 text-slate-50 sm:p-7 ${tone.frame}`}
      role="listitem"
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <p
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${tone.badge}`}
            >
              {scenario.label}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {tone.label}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {scenario.window}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
              {scenario.title}
            </h3>
            <p className="text-sm leading-7 text-slate-200 sm:text-base">
              {scenario.summary}
            </p>
            <p className="text-sm leading-7 text-slate-100">{scenario.objective}</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4 sm:grid-cols-2 xl:min-w-[18rem] xl:grid-cols-1">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Lead
            </p>
            <p className="mt-2 text-sm font-medium text-white">{scenario.lead}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Support
            </p>
            <p className="mt-2 text-sm font-medium text-white">{scenario.support}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.04fr)_minmax(260px,0.96fr)]">
        <div className={`rounded-[1.45rem] border px-5 py-5 ${tone.chip}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
            Decision frame
          </p>
          <p className="mt-3 text-base leading-7 text-slate-100">
            {scenario.objective}
          </p>
          <p className={`mt-4 text-sm leading-6 ${tone.accent}`}>{scenario.signal}</p>

          <div className="mt-5 rounded-[1.15rem] border border-white/10 bg-slate-950/30 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Pressure point
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              {scenario.pressurePoint}
            </p>
          </div>
        </div>

        <div
          aria-label={`${scenario.title} measures`}
          className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1"
          role="list"
        >
          {scenario.measures.map((measure) => (
            <div
              key={measure.label}
              className="rounded-[1.3rem] border border-white/10 bg-white/7 px-4 py-4"
              role="listitem"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {measure.label}
              </p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                {measure.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {measure.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Critical checkpoints
        </p>
        <ul className="grid gap-3" role="list">
          {scenario.checkpoints.map((checkpoint, index) => (
            <li
              key={checkpoint}
              className="flex items-start gap-3 rounded-[1.2rem] border border-white/10 bg-slate-950/24 px-4 py-4"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm leading-6 text-slate-200">{checkpoint}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
