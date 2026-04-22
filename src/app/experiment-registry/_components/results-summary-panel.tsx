import type { ExperimentView } from "../_lib/experiment-registry-data";

export function ResultsSummaryPanel({ experiment }: { experiment: ExperimentView }) {
  const hasResults = experiment.results.length > 0;

  return (
    <aside
      aria-label="Results summary"
      className="sticky top-10 h-fit space-y-6 rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-sm backdrop-blur sm:p-8"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Results summary
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          {experiment.title}
        </h3>
        <p className="text-sm leading-6 text-slate-500">{experiment.hypothesis}</p>
      </div>

      <div className="space-y-1 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">Owner:</span>{" "}
          {experiment.owner.name} ({experiment.owner.team})
        </p>
        <p>
          <span className="font-medium text-slate-800">Started:</span>{" "}
          {experiment.startDate}
        </p>
        {experiment.endDate && (
          <p>
            <span className="font-medium text-slate-800">Ended:</span>{" "}
            {experiment.endDate}
          </p>
        )}
      </div>

      {hasResults ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Metrics
          </p>
          <div className="grid gap-3">
            {experiment.results.map((result) => {
              const delta = result.current - result.baseline;
              const isPositive = delta >= 0;

              return (
                <div
                  key={result.metric}
                  className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                >
                  <p className="text-xs font-medium text-slate-500">
                    {result.metric}
                  </p>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-xl font-semibold text-slate-900">
                      {result.current}
                      {result.unit}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {delta.toFixed(1)}
                      {result.unit}
                    </span>
                    <span className="text-xs text-slate-400">
                      from {result.baseline}
                      {result.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-400">
          No results recorded yet.
        </p>
      )}
    </aside>
  );
}
