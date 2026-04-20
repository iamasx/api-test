import type {
  Experiment,
  ExperimentRun,
  ExperimentTemplate,
  OutcomeReview,
  ReviewDecisionId,
  ReviewDecisionOption,
} from "@/app/lab-notebook/notebook-data";

type OutcomeReviewPanelProps = {
  activeDecisionId: ReviewDecisionId | null;
  checkedHelperIds: string[];
  decisionOptions: ReviewDecisionOption[];
  experiment: Experiment | null;
  onSelectDecision: (decisionId: ReviewDecisionId) => void;
  onToggleHelper: (helperId: string) => void;
  review: OutcomeReview | null;
  selectedRuns: ExperimentRun[];
  template: ExperimentTemplate | null;
};

export function OutcomeReviewPanel({
  activeDecisionId,
  checkedHelperIds,
  decisionOptions,
  experiment,
  onSelectDecision,
  onToggleHelper,
  review,
  selectedRuns,
  template,
}: OutcomeReviewPanelProps) {
  const activeDecision = decisionOptions.find((option) => option.id === activeDecisionId) ?? null;

  return (
    <section className="rounded-[2rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(12,10,9,0.96),rgba(41,37,36,0.97))] p-5 text-stone-100 shadow-[0_28px_90px_rgba(15,23,42,0.3)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-200/75">Outcome review</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{experiment ? experiment.title : "Choose an experiment"}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-300">
            {experiment
              ? `${template?.name ?? "Template"} review helpers keep the board move, evidence checklist, and selected runs in one panel.`
              : "Focus a board card to unlock the review checklist and next-lane actions."}
          </p>
        </div>
        {review ? (
          <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-300">
            {review.dueWindow}
          </span>
        ) : null}
      </div>

      {!experiment || !review ? (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.04] p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-400">Waiting on review context</p>
          <p className="mt-3 text-sm leading-6 text-stone-300">Once a board is focused, this panel will stage the checklist, run context, and recommended board move.</p>
        </div>
      ) : (
        <>
          <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">{review.owner}</p>
            <h3 className="mt-2 text-xl font-semibold">{review.headline}</h3>
            <p className="mt-2 text-sm leading-6 text-stone-300">{review.summary}</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.7fr)]">
            <div className="space-y-3">
              <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.05] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Checklist</p>
                  <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-300">
                    {checkedHelperIds.length} of {review.helperChecklist.length} ready
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {review.helperChecklist.map((helper) => {
                    const checked = checkedHelperIds.includes(helper.id);

                    return (
                      <label className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-3" key={helper.id}>
                        <input
                          aria-label={`Toggle helper: ${helper.label}`}
                          checked={checked}
                          className="mt-1 size-4 rounded border-stone-400 text-stone-50 focus:ring-amber-200"
                          onChange={() => onToggleHelper(helper.id)}
                          type="checkbox"
                        />
                        <span>
                          <span className="block text-sm font-semibold text-stone-100">{helper.label}</span>
                          <span className="mt-1 block text-sm leading-6 text-stone-300">{helper.description}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Review prompts</p>
                <div className="mt-4 space-y-2">
                  {review.prompts.map((prompt) => (
                    <p className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm leading-6 text-stone-300" key={prompt}>
                      {prompt}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Selected runs</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedRuns.length > 0 ? (
                    selectedRuns.map((run) => (
                      <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-200" key={run.id}>
                        {run.label}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm leading-6 text-stone-300">Choose one or more runs in comparison view to attach them to the review decision.</span>
                  )}
                </div>
              </div>

              <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Next board move</p>
                <div className="mt-4 space-y-2">
                  {decisionOptions.map((option) => (
                    <button
                      className={`w-full rounded-[1.1rem] border px-4 py-3 text-left text-sm transition ${
                        activeDecisionId === option.id
                          ? "border-amber-200/40 bg-amber-300/10 text-stone-50"
                          : "border-white/10 bg-white/[0.04] text-stone-200 hover:bg-white/[0.08]"
                      }`}
                      key={option.id}
                      onClick={() => onSelectDecision(option.id)}
                      type="button"
                    >
                      <span className="block font-semibold">{option.label}</span>
                      <span className="mt-1 block leading-6 text-stone-300">{option.summary}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.45rem] border border-emerald-300/20 bg-emerald-400/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">Active recommendation</p>
                <p className="mt-2 text-lg font-semibold text-white">{activeDecision?.label ?? "No decision selected"}</p>
                <p className="mt-2 text-sm leading-6 text-emerald-50/90">
                  {activeDecision?.recommendation ?? "Pick a board move to update the lane placement and recommendation on the focused experiment card."}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
