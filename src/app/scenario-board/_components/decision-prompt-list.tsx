import type { ScenarioDecisionPrompt } from "../_data/scenario-board-data";

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
      className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-7"
    >
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
          Decision prompts
        </p>
        <h2
          id="decision-prompts-heading"
          className="text-3xl font-semibold tracking-tight text-slate-950"
        >
          Questions to settle before execution starts
        </h2>
        <p className="text-sm leading-7 text-slate-600">
          These prompts frame the next planning review around owner, timing, and
          explicit trade-offs instead of open-ended debate.
        </p>
      </div>

      <div aria-label="Decision prompts" className="mt-6 grid gap-4" role="list">
        {prompts.map((prompt) => (
          <article
            key={prompt.id}
            className="rounded-[1.45rem] border border-slate-200 bg-slate-50 px-5 py-5"
            role="listitem"
          >
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                {prompt.owner}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {prompt.reviewWindow}
              </p>
            </div>

            <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
              {prompt.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {prompt.question}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {prompt.framing}
            </p>

            <ul className="mt-5 grid gap-3" role="list">
              {prompt.options.map((option) => (
                <li
                  key={option.label}
                  className="rounded-[1.1rem] border border-slate-200 bg-white px-4 py-4"
                >
                  <p className="text-sm font-semibold text-slate-950">
                    {option.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {option.impact}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {option.risk}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[1.45rem] border border-slate-200 bg-slate-50 px-5 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Board notes
        </p>
        <ul aria-label="Board notes" className="mt-4 grid gap-3" role="list">
          {notes.map((note) => (
            <li
              key={note}
              className="rounded-[1rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700"
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
