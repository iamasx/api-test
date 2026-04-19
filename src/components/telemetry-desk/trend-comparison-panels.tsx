import { type ComparisonMode, type ComparisonPanel, type TelemetryMetric } from "./mock-data";

const toneClasses = {
  focus: "border-amber-300/35 bg-amber-300/12 text-amber-100",
  watch: "border-rose-300/35 bg-rose-300/12 text-rose-100",
  steady: "border-teal-300/35 bg-teal-300/12 text-teal-100",
};

type TrendComparisonPanelsProps = {
  activeMetric: TelemetryMetric | null;
  panelModes: Record<string, string>;
  panels: ComparisonPanel[];
  onReset: () => void;
  onSelectMode: (panelId: string, modeId: string) => void;
};

function ComparisonPanelCard({
  mode,
  panel,
  selectedModeId,
  onSelectMode,
}: {
  mode: ComparisonMode;
  panel: ComparisonPanel;
  selectedModeId: string;
  onSelectMode: (panelId: string, modeId: string) => void;
}) {
  const maxValue = Math.max(...mode.series.flatMap((point) => [point.primary, point.comparison]));

  return (
    <article className="rounded-[1.75rem] border border-white/8 bg-white/[0.04] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.24em] ${toneClasses[panel.status]}`}>
            {panel.status}
          </div>
          <h3 className="mt-4 text-xl font-semibold text-stone-50">{panel.title}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-300">{panel.strapline}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {panel.modes.map((entry) => {
            const isSelected = entry.id === selectedModeId;
            return (
              <button
                aria-pressed={isSelected}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${isSelected ? "border-teal-200/50 bg-teal-200/15 text-teal-50" : "border-white/10 bg-white/5 text-stone-300 hover:border-white/20 hover:text-stone-100"}`}
                key={entry.id}
                onClick={() => onSelectMode(panel.id, entry.id)}
                type="button"
              >
                {entry.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-sm text-stone-400">{mode.detail}</p>
      <div className="mt-5 space-y-4">
        {mode.series.map((point) => (
          <div key={point.label}>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-400">
              <span>{point.label}</span>
              <span>{mode.unit}</span>
            </div>
            <div className="mt-2 space-y-2">
              <div>
                <div className="flex items-center justify-between text-sm text-stone-200">
                  <span>{mode.primaryLabel}</span>
                  <span className="font-mono">{point.primary}{mode.unit}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-amber-200" style={{ width: `${point.primary / maxValue * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm text-stone-300">
                  <span>{mode.comparisonLabel}</span>
                  <span className="font-mono">{point.comparison}{mode.unit}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-teal-300/80" style={{ width: `${point.comparison / maxValue * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function TrendComparisonPanels({
  activeMetric,
  panelModes,
  panels,
  onReset,
  onSelectMode,
}: TrendComparisonPanelsProps) {
  if (!activeMetric || panels.length === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-white/12 bg-stone-950/55 p-6 text-center backdrop-blur sm:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Trend comparisons</p>
        <h2 className="mt-4 text-2xl font-semibold text-stone-50">No metric focus selected</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-300">
          Deselecting the active tile clears the local comparison deck. Restore the recommended focus to bring the panels back.
        </p>
        <button className="mt-6 rounded-full bg-amber-200 px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-amber-100" onClick={onReset} type="button">
          Restore recommended focus
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-stone-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-teal-200/70">Trend comparisons</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">{activeMetric.label} comparison panels</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-300">
            Each panel keeps its own selector state locally. Reset returns the desk to the recommended focus and default comparison modes.
          </p>
        </div>
        <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-stone-200 transition hover:border-amber-200/35 hover:text-amber-100" onClick={onReset} type="button">
          Reset comparisons
        </button>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {panels.map((panel) => {
          const selectedModeId = panelModes[panel.id] ?? panel.defaultMode;
          const mode = panel.modes.find((entry) => entry.id === selectedModeId) ?? panel.modes[0];
          if (!mode) return null;
          return <ComparisonPanelCard key={panel.id} mode={mode} onSelectMode={onSelectMode} panel={panel} selectedModeId={selectedModeId} />;
        })}
      </div>
    </section>
  );
}
