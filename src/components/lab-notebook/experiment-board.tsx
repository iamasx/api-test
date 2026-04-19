import type {
  Experiment,
  ExperimentStatus,
  MilestoneTag,
} from "@/app/lab-notebook/notebook-data";

type ExperimentBoardProps = {
  experiments: Experiment[];
  milestoneTagsById: Record<string, MilestoneTag>;
  onSelect: (experimentId: string) => void;
  selectedExperimentId: string | null;
};

const statusClasses: Record<ExperimentStatus, string> = {
  active: "border-emerald-700/15 bg-emerald-600/10 text-emerald-900",
  watch: "border-rose-700/15 bg-rose-500/10 text-rose-900",
  stabilizing: "border-sky-700/15 bg-sky-500/10 text-sky-900",
  archived: "border-stone-900/10 bg-stone-300/30 text-stone-700",
};

const toneClasses = {
  amber: "border-amber-700/15 bg-amber-500/10 text-amber-900",
  emerald: "border-emerald-700/15 bg-emerald-500/10 text-emerald-900",
  rose: "border-rose-700/15 bg-rose-500/10 text-rose-900",
  sky: "border-sky-700/15 bg-sky-500/10 text-sky-900",
};

export function ExperimentBoard({
  experiments,
  milestoneTagsById,
  onSelect,
  selectedExperimentId,
}: ExperimentBoardProps) {
  if (experiments.length === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-stone-900/15 bg-white/70 p-8 text-center shadow-[0_20px_70px_rgba(120,53,15,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">Zero state</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-stone-950">No experiment cards match the current filter.</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">This notebook keeps the empty state local. Switch back to active, watch, or stabilizing cards to reopen the workspace.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
      {experiments.map((experiment) => {
        const isSelected = experiment.id === selectedExperimentId;

        return (
          <article
            className={`rounded-[2rem] border p-5 shadow-[0_22px_80px_rgba(120,53,15,0.12)] transition ${
              isSelected
                ? "border-stone-950 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(254,240,138,0.74))]"
                : "border-stone-900/10 bg-white/82 hover:border-stone-900/20"
            }`}
            key={experiment.id}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">{experiment.lead}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">{experiment.title}</h2>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${statusClasses[experiment.status]}`}>{experiment.status}</span>
            </div>

            <p className="mt-3 text-sm leading-6 text-stone-700">{experiment.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {experiment.milestoneIds.map((milestoneId) => {
                const milestone = milestoneTagsById[milestoneId];

                return milestone ? (
                  <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClasses[milestone.tone]}`} key={milestone.id}>
                    {milestone.label}
                  </span>
                ) : null;
              })}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <div className="flex items-center justify-between text-sm text-stone-700">
                  <span className="font-medium">{experiment.progressLabel}</span>
                  <span>{experiment.progressValue}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-stone-200">
                  <div className="h-full rounded-full bg-stone-950" style={{ width: `${experiment.progressValue}%` }} />
                </div>
              </div>
              <span className="rounded-full border border-stone-900/10 bg-stone-100/75 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">{experiment.sampleCount} samples</span>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              <div className="rounded-[1.35rem] bg-stone-100/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Focus</p>
                <p className="mt-2 leading-6">{experiment.focus}</p>
              </div>
              <div className="rounded-[1.35rem] bg-stone-100/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Next window</p>
                <p className="mt-2 leading-6">{experiment.window}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-xl text-sm leading-6 text-stone-700">{experiment.lastEntry}</p>
              <button className="rounded-full bg-stone-950 px-4 py-2 text-sm text-stone-50 transition hover:bg-stone-800" onClick={() => onSelect(experiment.id)} type="button">
                {isSelected ? "Focused in drawer" : "Open in drawer"}
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
