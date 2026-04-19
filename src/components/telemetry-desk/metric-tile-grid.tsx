import { type TelemetryMetric } from "./mock-data";

const stateClasses = {
  active: "border-amber-300/35 bg-amber-300/12 text-amber-100",
  watch: "border-rose-300/35 bg-rose-300/12 text-rose-100",
  steady: "border-teal-300/35 bg-teal-300/12 text-teal-100",
};

type MetricTileGridProps = {
  activeMetricId: string | null;
  metrics: TelemetryMetric[];
  onToggleMetric: (metricId: string) => void;
};

export function MetricTileGrid({
  activeMetricId,
  metrics,
  onToggleMetric,
}: MetricTileGridProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-stone-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-teal-200/70">Metric tiles</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">Toggle a tile to change the comparison focus</h2>
        </div>
        <p className="max-w-xl text-sm text-stone-300">
          Active tiles stay bright. Clicking the focused tile again clears the comparison view and reveals the zero-state copy.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const isActive = activeMetricId === metric.id;
          return (
            <button
              aria-pressed={isActive}
              className={`rounded-[1.6rem] border p-5 text-left transition ${isActive ? "border-amber-200/45 bg-white/[0.08] shadow-[0_20px_40px_rgba(15,23,42,0.22)]" : "border-white/8 bg-white/[0.03] opacity-75 hover:border-white/15 hover:bg-white/[0.05] hover:opacity-100"}`}
              key={metric.id}
              onClick={() => onToggleMetric(metric.id)}
              type="button"
            >
              <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${stateClasses[metric.state]}`}>
                {metric.state}
              </div>
              <h3 className="mt-4 text-sm uppercase tracking-[0.16em] text-stone-300">{metric.label}</h3>
              <p className="mt-3 font-mono text-3xl font-semibold text-stone-50">{metric.value}</p>
              <p className="mt-2 text-sm text-teal-100">{metric.delta}</p>
              <p className="mt-4 text-sm leading-6 text-stone-400">{metric.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
