import { type AlertSummary, type TelemetryMetric } from "./mock-data";

const toneClasses = {
  focus: "border-amber-300/35 bg-amber-300/12 text-amber-100",
  watch: "border-rose-300/35 bg-rose-300/12 text-rose-100",
  steady: "border-teal-300/35 bg-teal-300/12 text-teal-100",
};

type AlertSummaryRailProps = { activeMetric: TelemetryMetric | null; alerts: AlertSummary[] };

export function AlertSummaryRail({ activeMetric, alerts }: AlertSummaryRailProps) {
  const visibleAlerts = activeMetric ? alerts.filter((alert) => alert.metrics.includes(activeMetric.id)) : alerts;

  return (
    <aside aria-label="Alert summary rail" className="rounded-[2rem] border border-white/10 bg-stone-950/65 p-6 backdrop-blur sm:p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-teal-200/70">Alert summaries</p>
      <h2 className="mt-2 text-2xl font-semibold text-stone-50">Pinned local comparisons</h2>
      <p className="mt-3 text-sm leading-6 text-stone-300">{activeMetric ? `Filtered to ${activeMetric.label}.` : "Showing the full local alert stack."}</p>
      <div className="mt-6 space-y-4">
        {visibleAlerts.map((alert) => (
          <article className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5" key={alert.id}>
            <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${toneClasses[alert.tone]}`}>
              {alert.tone}
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <h3 className="text-lg font-semibold text-stone-50">{alert.label}</h3>
              <span className="font-mono text-2xl font-semibold text-stone-100">{alert.count}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-400">{alert.detail}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}
