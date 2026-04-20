import type {
  BoardLane,
  Experiment,
  ExperimentRun,
  ExperimentStatus,
  ExperimentTemplate,
  MilestoneTag,
} from "@/app/lab-notebook/notebook-data";

type ExperimentBoardProps = {
  boardLanes: BoardLane[];
  experiments: Experiment[];
  milestoneTagsById: Record<string, MilestoneTag>;
  onSelect: (experimentId: string) => void;
  runsByExperimentId: Record<string, ExperimentRun[]>;
  selectedExperimentId: string | null;
  templatesById: Record<string, ExperimentTemplate>;
};

const statusClasses: Record<ExperimentStatus, string> = {
  active: "border-emerald-700/15 bg-emerald-600/10 text-emerald-900",
  watch: "border-rose-700/15 bg-rose-500/10 text-rose-900",
  stabilizing: "border-sky-700/15 bg-sky-500/10 text-sky-900",
  archived: "border-stone-900/10 bg-stone-300/30 text-stone-700",
};

const laneClasses = {
  compare: "border-sky-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(239,246,255,0.82))]",
  intake: "border-amber-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(254,243,199,0.78))]",
  review: "border-emerald-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(220,252,231,0.76))]",
};

const toneClasses = {
  amber: "border-amber-700/15 bg-amber-500/10 text-amber-900",
  emerald: "border-emerald-700/15 bg-emerald-500/10 text-emerald-900",
  rose: "border-rose-700/15 bg-rose-500/10 text-rose-900",
  sky: "border-sky-700/15 bg-sky-500/10 text-sky-900",
};

export function ExperimentBoard({
  boardLanes,
  experiments,
  milestoneTagsById,
  onSelect,
  runsByExperimentId,
  selectedExperimentId,
  templatesById,
}: ExperimentBoardProps) {
  if (experiments.length === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-stone-900/15 bg-white/70 p-8 text-center shadow-[0_20px_70px_rgba(120,53,15,0.1)]">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">Zero state</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-stone-950">No experiment cards match the current template or status filter.</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">Switch filters or create a new board from one of the templates to reopen the notebook workspace.</p>
      </section>
    );
  }

  return (
    <section aria-label="Template-aware experiment board" className="space-y-4">
      {boardLanes.map((lane) => {
        const laneExperiments = experiments.filter((experiment) => experiment.boardLaneId === lane.id);

        if (laneExperiments.length === 0) {
          return null;
        }

        return (
          <article
            className={`rounded-[2rem] border p-5 shadow-[0_22px_80px_rgba(120,53,15,0.12)] ${laneClasses[lane.id]}`}
            key={lane.id}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">{lane.emphasis}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">{lane.label}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-700">{lane.description}</p>
              </div>
              <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">{laneExperiments.length} cards</span>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {laneExperiments.map((experiment) => {
                const isSelected = experiment.id === selectedExperimentId;
                const template = templatesById[experiment.templateId];
                const runs = runsByExperimentId[experiment.id] ?? [];

                return (
                  <article
                    className={`rounded-[1.9rem] border p-5 transition ${
                      isSelected
                        ? "border-stone-950 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(255,255,255,0.92))] shadow-[0_24px_80px_rgba(120,53,15,0.18)]"
                        : "border-stone-900/10 bg-white/78 hover:border-stone-900/20"
                    }`}
                    key={experiment.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">{experiment.lead}</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">{experiment.title}</h3>
                      </div>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${statusClasses[experiment.status]}`}>{experiment.status}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-stone-900/10 bg-stone-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-stone-700">
                        {template?.name ?? "Template"}
                      </span>
                      <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">
                        {runs.length} runs attached
                      </span>
                      <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">
                        {experiment.comparisonRunIds.length} in compare set
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-stone-700">{experiment.summary}</p>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded-[1.35rem] bg-stone-100/70 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Template objective</p>
                        <p className="mt-2 text-sm leading-6 text-stone-700">{template?.objective ?? experiment.focus}</p>
                      </div>
                      <div className="rounded-[1.35rem] bg-stone-100/70 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Board note</p>
                        <p className="mt-2 text-sm leading-6 text-stone-700">{experiment.boardNote}</p>
                      </div>
                    </div>

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
                      <span className="rounded-full border border-stone-900/10 bg-stone-100/75 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">
                        {experiment.sampleCount} samples
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
                      <div className="rounded-[1.35rem] bg-white/65 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Run focus</p>
                        <p className="mt-2 leading-6">{experiment.focus}</p>
                      </div>
                      <div className="rounded-[1.35rem] bg-white/65 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Next board move</p>
                        <p className="mt-2 leading-6">{experiment.recommendation}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <p className="max-w-xl text-sm leading-6 text-stone-700">{experiment.window}</p>
                      <button
                        aria-label={`Open notebook: ${experiment.title}`}
                        className="rounded-full bg-stone-950 px-4 py-2 text-sm text-stone-50 transition hover:bg-stone-800"
                        onClick={() => onSelect(experiment.id)}
                        type="button"
                      >
                        {isSelected ? "Focused in notebook" : "Focus notebook"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </article>
        );
      })}
    </section>
  );
}
