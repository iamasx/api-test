import type { TrendPanel } from "@/app/telemetry-desk/mock-data";

const panelStatusClasses = {
  lift: "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
  steady: "border-cyan-300/30 bg-cyan-300/12 text-cyan-100",
  watch: "border-amber-300/25 bg-amber-300/10 text-amber-100",
};

type TrendComparisonPanelsProps = {
  baselineByPanel: Record<string, string>;
  focusedMetricLabel: string | null;
  hiddenCount: number;
  onBaselineChange: (panelId: string, baselineId: string) => void;
  onHidePanel: (panelId: string) => void;
  onReset: () => void;
  panels: TrendPanel[];
  totalPanels: number;
};

export function TrendComparisonPanels({
  baselineByPanel,
  focusedMetricLabel,
  hiddenCount,
  onBaselineChange,
  onHidePanel,
  onReset,
  panels,
  totalPanels,
}: TrendComparisonPanelsProps) {
  const helperCopy = focusedMetricLabel
    ? `Focused comparisons for ${focusedMetricLabel}.`
    : "Each panel can switch its own baseline or drop out of the desk until reset.";

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Trend Comparison Panels</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Local baselines and panel visibility controls.</h2>
        </div>
        <p className="max-w-xl text-sm text-slate-300">{hiddenCount > 0 ? `${hiddenCount} panel${hiddenCount === 1 ? "" : "s"} hidden. ` : ""}{helperCopy}</p>
      </div>
      {panels.length > 0 ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {panels.map((panel) => {
            const activeBaseline =
              panel.baselines.find((baseline) => baseline.id === baselineByPanel[panel.id]) ??
              panel.baselines[0];
            return (
              <article className="rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-5" key={panel.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{panel.owner}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{panel.title}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${panelStatusClasses[panel.status]}`}>{panel.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{panel.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {panel.baselines.map((baseline) => (
                    <button
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${baseline.id === activeBaseline.id ? "border-cyan-300/35 bg-cyan-300 text-slate-950" : "border-white/10 text-slate-200 hover:bg-white/[0.08]"}`}
                      key={baseline.id}
                      onClick={() => onBaselineChange(panel.id, baseline.id)}
                      type="button"
                    >
                      {baseline.label}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Comparison value</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{activeBaseline.value}</p>
                    <p className="mt-1 text-sm text-cyan-100">{activeBaseline.delta}</p>
                  </div>
                  <button className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/[0.08]" onClick={() => onHidePanel(panel.id)} type="button">
                    Hide panel
                  </button>
                </div>
                <div className="mt-5 flex h-16 items-end gap-2">
                  {activeBaseline.samples.map((sample, index) => (
                    <div className="flex-1 rounded-t-full bg-gradient-to-t from-cyan-500/35 to-amber-300/55" key={`${panel.id}-${index}`} style={{ height: `${sample}%` }} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-[1.6rem] border border-dashed border-white/12 bg-white/[0.03] p-8 text-center">
          <p className="text-lg font-semibold text-white">No comparison panels are visible.</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {focusedMetricLabel
              ? `${focusedMetricLabel} does not have an active trend panel in the current desk view.`
              : "All comparison panels have been hidden from the desk."}
          </p>
          <button className="mt-5 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200" onClick={onReset} type="button">
            Restore all {totalPanels} panels
          </button>
        </div>
      )}
    </section>
  );
}
