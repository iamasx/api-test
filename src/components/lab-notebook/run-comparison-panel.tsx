import type {
  ComparisonMetric,
  ComparisonView,
  Experiment,
  ExperimentRun,
  ExperimentTemplate,
} from "@/app/lab-notebook/notebook-data";

type RunComparisonPanelProps = {
  comparisonMetrics: ComparisonMetric[];
  comparisonView: ComparisonView;
  experiment: Experiment | null;
  onChangeComparisonView: (view: ComparisonView) => void;
  onToggleRun: (runId: string) => void;
  runs: ExperimentRun[];
  selectedRunIds: string[];
  template: ExperimentTemplate | null;
};

function formatMetric(metric: ComparisonMetric, value: number) {
  if (metric.id === "variance") {
    return `${value.toFixed(1)}${metric.unit}`;
  }

  return metric.unit.length > 0 ? `${value}${metric.unit}` : `${value}`;
}

function getBestRun(runs: ExperimentRun[], metric: ComparisonMetric) {
  if (runs.length === 0) {
    return null;
  }

  return runs.reduce((best, run) => {
    if (!best) {
      return run;
    }

    const currentValue = run.metrics[metric.id];
    const bestValue = best.metrics[metric.id];

    if (metric.better === "higher") {
      return currentValue > bestValue ? run : best;
    }

    return currentValue < bestValue ? run : best;
  }, runs[0] ?? null);
}

export function RunComparisonPanel({
  comparisonMetrics,
  comparisonView,
  experiment,
  onChangeComparisonView,
  onToggleRun,
  runs,
  selectedRunIds,
  template,
}: RunComparisonPanelProps) {
  const selectedRuns = runs.filter((run) => selectedRunIds.includes(run.id));
  const averageSignal = selectedRuns.length > 0
    ? Math.round(
        (selectedRuns.reduce((total, run) => total + run.metrics.signal, 0) / selectedRuns.length) * 10,
      ) / 10
    : 0;
  const lowestVariance = selectedRuns.length > 0
    ? Math.min(...selectedRuns.map((run) => run.metrics.variance))
    : null;
  const totalWatchFlags = selectedRuns.reduce((total, run) => total + run.metrics.watchFlags, 0);

  return (
    <section
      aria-label="Run comparison panel"
      className="rounded-[2rem] border border-stone-900/10 bg-white/82 p-5 shadow-[0_24px_90px_rgba(120,53,15,0.12)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">Run comparison</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
            {experiment ? experiment.title : "Choose an experiment"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            {experiment
              ? `${template?.name ?? "Template"} keeps the summary and detail views anchored to the selected run set.`
              : "Select a board card to compare multiple runs in summary and detail without leaving the notebook."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["summary", "detail"] as ComparisonView[]).map((view) => (
            <button
              className={`rounded-full px-4 py-2 text-sm transition ${
                comparisonView === view
                  ? "bg-stone-950 text-stone-50"
                  : "border border-stone-900/10 bg-stone-100/80 text-stone-700 hover:bg-stone-200/80"
              }`}
              key={view}
              onClick={() => onChangeComparisonView(view)}
              type="button"
            >
              {view === "summary" ? "Summary view" : "Detail view"}
            </button>
          ))}
        </div>
      </div>

      {!experiment ? (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-stone-900/12 bg-stone-100/60 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">Waiting on selection</p>
          <p className="mt-3 text-sm leading-6 text-stone-600">Once a board card is focused, this panel will let you choose a run set and inspect the comparison from summary to detail.</p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {runs.map((run) => {
              const isSelected = selectedRunIds.includes(run.id);

              return (
                <label
                  className={`cursor-pointer rounded-[1.45rem] border p-4 transition ${
                    isSelected
                      ? "border-stone-950 bg-[linear-gradient(135deg,rgba(255,251,235,0.96),rgba(254,249,195,0.82))]"
                      : "border-stone-900/10 bg-stone-50/80 hover:border-stone-900/20"
                  }`}
                  key={run.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{run.startedAt}</p>
                      <h3 className="mt-2 text-lg font-semibold text-stone-950">{run.label}</h3>
                    </div>
                    <input
                      aria-label={`Select ${run.label}`}
                      checked={isSelected}
                      className="mt-1 size-4 rounded border-stone-400 text-stone-950 focus:ring-stone-500"
                      onChange={() => onToggleRun(run.id)}
                      type="checkbox"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone-700">{run.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">{run.state}</span>
                    <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">{run.operator}</span>
                  </div>
                </label>
              );
            })}
          </div>

          {comparisonView === "summary" ? (
            selectedRuns.length < 2 ? (
              <div className="mt-5 rounded-[1.75rem] border border-dashed border-stone-900/12 bg-stone-100/60 p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">Summary locked</p>
                <p className="mt-3 text-sm leading-6 text-stone-600">Select at least two runs to unlock the summary comparison view for this board.</p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <article className="rounded-[1.5rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(255,251,235,0.95),rgba(255,255,255,0.92))] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Average signal</p>
                    <p className="mt-2 text-3xl font-semibold text-stone-950">{averageSignal} pts</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Across {selectedRuns.length} runs in the current comparison set.</p>
                  </article>
                  <article className="rounded-[1.5rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(239,246,255,0.92),rgba(255,255,255,0.9))] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Lowest variance</p>
                    <p className="mt-2 text-3xl font-semibold text-stone-950">
                      {lowestVariance !== null ? `${lowestVariance.toFixed(1)}%` : "N/A"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Use the detailed view to inspect which run is holding the cleanest spread.</p>
                  </article>
                  <article className="rounded-[1.5rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(220,252,231,0.92),rgba(255,255,255,0.9))] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Watch flags</p>
                    <p className="mt-2 text-3xl font-semibold text-stone-950">{totalWatchFlags}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Carry these flags forward into the outcome review helper set.</p>
                  </article>
                </div>

                <div className="grid gap-3 xl:grid-cols-2">
                  {comparisonMetrics.map((metric) => {
                    const bestRun = getBestRun(selectedRuns, metric);

                    return (
                      <article className="rounded-[1.5rem] border border-stone-900/10 bg-white/70 p-4" key={metric.id}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{metric.label}</p>
                            <p className="mt-2 text-sm leading-6 text-stone-600">
                              {metric.better === "higher" ? "Higher is better" : "Lower is better"} for this comparison metric.
                            </p>
                          </div>
                          <span className="rounded-full border border-stone-900/10 bg-stone-100/80 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">
                            {bestRun ? bestRun.label : "No run"}
                          </span>
                        </div>
                        <div className="mt-4 space-y-2">
                          {selectedRuns.map((run) => (
                            <div className="flex items-center justify-between rounded-[1.1rem] bg-stone-100/80 px-3 py-3 text-sm text-stone-700" key={run.id}>
                              <span>{run.label}</span>
                              <span className="font-semibold">{formatMetric(metric, run.metrics[metric.id])}</span>
                            </div>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )
          ) : selectedRuns.length === 0 ? (
            <div className="mt-5 rounded-[1.75rem] border border-dashed border-stone-900/12 bg-stone-100/60 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">No runs selected</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">Pick at least one run to open the detailed comparison cards.</p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {selectedRuns.map((run) => (
                <article className="rounded-[1.6rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.88))] p-5" key={run.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{run.startedAt}</p>
                      <h3 className="mt-2 text-xl font-semibold text-stone-950">{run.label}</h3>
                    </div>
                    <span className="rounded-full border border-stone-900/10 bg-stone-100/80 px-3 py-1 text-xs uppercase tracking-[0.22em] text-stone-600">{run.state}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{run.detail}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {comparisonMetrics.map((metric) => (
                      <div className="rounded-[1.15rem] bg-stone-100/70 p-3" key={metric.id}>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">{metric.label}</p>
                        <p className="mt-2 text-lg font-semibold text-stone-950">{formatMetric(metric, run.metrics[metric.id])}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.25rem] bg-stone-100/70 p-4 text-sm text-stone-700">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Setup</p>
                    <p className="mt-2 leading-6">{run.setup}</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {run.highlights.map((highlight) => (
                      <p className="rounded-[1.1rem] border border-stone-900/10 bg-white/70 px-3 py-3 text-sm leading-6 text-stone-700" key={highlight}>
                        {highlight}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 rounded-[1.25rem] border border-stone-900/10 bg-stone-950 px-4 py-4 text-sm leading-6 text-stone-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/75">Decision note</p>
                    <p className="mt-2">{run.decisionNote}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
