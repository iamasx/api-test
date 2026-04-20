import type { ScenarioDecisionPrompt } from "../_data/scenario-board-data";
import styles from "../scenario-board.module.css";

type DecisionPromptListProps = {
  prompts: ScenarioDecisionPrompt[];
  notes: string[];
};

export function DecisionPromptList({
  prompts,
  notes,
}: DecisionPromptListProps) {
  return (
    <aside
      aria-labelledby="decision-prompts-heading"
      className={`${styles.railSurface} rounded-[1.9rem] border border-white/10 p-6 text-slate-50 sm:p-7`}
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-300">
          Decision prompts
        </p>
        <h2
          id="decision-prompts-heading"
          className="text-3xl font-semibold tracking-tight text-white"
        >
          Questions to settle before execution starts
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          These prompts frame the next planning review around owner, timing, and
          explicit trade-offs instead of open-ended debate.
        </p>
      </div>

      <div aria-label="Decision prompts" className="mt-6 grid gap-4" role="list">
        {prompts.map((prompt) => (
          <article
            key={prompt.id}
            className="rounded-[1.45rem] border border-white/10 bg-slate-950/24 px-5 py-5"
            role="listitem"
          >
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-100">
                {prompt.owner}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                {prompt.reviewWindow}
              </p>
            </div>

            <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
              {prompt.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-100">{prompt.question}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {prompt.framing}
            </p>

            <ul className="mt-5 grid gap-3" role="list">
              {prompt.options.map((option) => (
                <li
                  key={option.label}
                  className="rounded-[1.1rem] border border-white/8 bg-white/6 px-4 py-4"
                >
                  <p className="text-sm font-semibold text-white">{option.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {option.impact}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {option.risk}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-white/6 px-5 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
          Board notes
        </p>
        <ul aria-label="Board notes" className="mt-4 grid gap-3" role="list">
          {notes.map((note) => (
            <li
              key={note}
              className="rounded-[1rem] border border-white/10 bg-slate-950/22 px-4 py-4 text-sm leading-6 text-slate-200"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
