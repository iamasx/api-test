import type { TelemetryMetric } from "@/app/telemetry-desk/mock-data";

const stateClasses = {
  active: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
  inactive: "border-slate-400/20 bg-slate-400/10 text-slate-200",
};

type MetricTileGridProps = {
  focusedMetricId: string | null;
  metrics: TelemetryMetric[];
  onToggleMetric: (metricId: string) => void;
};

export function MetricTileGrid({
  focusedMetricId,
  metrics,
  onToggleMetric,
}: MetricTileGridProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Metric Tiles</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Desk-wide signals with active and inactive emphasis.</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-300">
          Select a tile to narrow alerts and comparison panels. Select it again to return to the full desk.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {metrics.map((metric) => {
          const isFocused = focusedMetricId === metric.id;
          const isDimmed = focusedMetricId !== null && !isFocused;

          return (
            <button
              className={`rounded-[1.6rem] border p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition ${isFocused ? "border-cyan-300/40 bg-cyan-300/12" : "border-white/8 bg-white/[0.04]"} ${isDimmed ? "opacity-45" : "opacity-100 hover:-translate-y-0.5 hover:bg-white/[0.06]"}`}
              key={metric.id}
              onClick={() => onToggleMetric(metric.id)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm uppercase tracking-[0.18em] text-slate-300">{metric.label}</h3>
                  <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${stateClasses[metric.state]}`}>{metric.state}</span>
              </div>
              <p className="mt-2 text-sm text-cyan-100">{metric.delta}</p>
              <p className="mt-4 text-sm leading-6 text-slate-400">{metric.note}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
