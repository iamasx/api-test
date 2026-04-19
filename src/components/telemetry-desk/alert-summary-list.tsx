import type { AlertSummary, AlertTone } from "@/app/telemetry-desk/mock-data";

const toneClasses = {
  critical: "border-rose-400/25 bg-rose-500/10 text-rose-100",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  clear: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
};

type AlertSummaryListProps = {
  alerts: AlertSummary[];
  filter: AlertTone | "all";
  focusedMetricLabel: string | null;
  onFilterChange: (tone: AlertTone | "all") => void;
  toneFilters: Array<{ id: AlertTone | "all"; label: string }>;
};

export function AlertSummaryList({
  alerts,
  filter,
  focusedMetricLabel,
  onFilterChange,
  toneFilters,
}: AlertSummaryListProps) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Alert Summaries</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Local watchlist and resolved states.</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {focusedMetricLabel ? `Showing alert summaries connected to ${focusedMetricLabel}.` : "Filter the desk alert stack without affecting any other route."}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {toneFilters.map((tone) => (
          <button
            className={`rounded-full border px-3 py-1.5 text-sm transition ${tone.id === filter ? "border-cyan-300/35 bg-cyan-300 text-slate-950" : "border-white/10 text-slate-200 hover:bg-white/[0.08]"}`}
            key={tone.id}
            onClick={() => onFilterChange(tone.id)}
            type="button"
          >
            {tone.label}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        {alerts.length > 0 ? alerts.map((alert) => (
          <article className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4" key={alert.id}>
            <div className="flex items-start justify-between gap-3">
              <div><h3 className="text-base font-semibold text-white">{alert.label}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{alert.note}</p></div>
              <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${toneClasses[alert.severity]}`}>{alert.severity}</span>
            </div>
            <p className="mt-3 text-sm text-cyan-100">{alert.count} desk event{alert.count === 1 ? "" : "s"}</p>
          </article>
        )) : (
          <div className="rounded-[1.4rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center">
            <p className="text-lg font-semibold text-white">No alert summaries match this filter.</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Switch the alert tone or clear the metric focus to repopulate the watchlist.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
