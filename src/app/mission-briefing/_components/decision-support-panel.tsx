import type {
  BriefingNote,
  DecisionPrompt,
  MissionBriefingScenario,
} from "../_data/mission-briefing-data";

type DecisionSupportPanelProps = {
  decisionWindow: string;
  notes: BriefingNote[];
  prompts: DecisionPrompt[];
  recommendedScenario: MissionBriefingScenario;
  summary: string;
  title: string;
};

export function DecisionSupportPanel({
  decisionWindow,
  notes,
  prompts,
  recommendedScenario,
  summary,
  title,
}: DecisionSupportPanelProps) {
  return (
    <aside
      aria-label="Decision support panel"
      className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,248,235,0.12),rgba(18,24,38,0.92))] p-6 shadow-[0_28px_80px_rgba(3,7,18,0.3)] backdrop-blur xl:sticky xl:top-8"
      id="decision-support"
    >
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-100/70">
            Decision support
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
        </div>
        <p className="text-sm leading-7 text-slate-200">{summary}</p>
        <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100/70">
            Decision window
          </p>
          <p className="mt-2 text-lg font-semibold text-white">{decisionWindow}</p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-slate-950/70 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Recommended branch
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
          {recommendedScenario.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {recommendedScenario.decision}
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Window
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-100">
              {recommendedScenario.launchWindow}
            </dd>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/5 px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Confidence
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-100">
              {recommendedScenario.confidence}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Decision prompts
        </p>
        <div className="mt-3 space-y-3">
          {prompts.map((prompt) => (
            <article
              key={prompt.id}
              className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4"
            >
              <p className="text-sm font-semibold leading-6 text-white">
                {prompt.prompt}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {prompt.recommendation}
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {prompt.threshold}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Briefing notes
        </p>
        <div className="mt-3 space-y-3">
          {notes.map((note) => (
            <article
              key={note.id}
              className="rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.2))] px-4 py-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{note.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{note.owner}</p>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {note.window}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{note.detail}</p>
              <p className="mt-3 text-sm font-medium text-slate-100">{note.impact}</p>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
