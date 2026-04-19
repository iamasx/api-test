import { resolutionOptions, type AlertJournalAlert, type ResolutionState } from "@/app/alert-journal/alert-journal-data";

type AlertDetailRailProps = {
  alert: AlertJournalAlert | null;
  dayLabel: string | null;
  isVisibleInCurrentFilters: boolean;
  resolution: ResolutionState | null;
  onUpdateResolution: (alertId: string, resolution: ResolutionState) => void;
};

export function AlertDetailRail({
  alert,
  dayLabel,
  isVisibleInCurrentFilters,
  resolution,
  onUpdateResolution,
}: AlertDetailRailProps) {
  const detailItems = alert
    ? [
        { label: "Service", value: alert.service },
        { label: "Zone", value: alert.zone },
        { label: "Owner", value: alert.owner },
        { label: "Next step", value: alert.nextStep },
      ]
    : [];

  return (
    <aside className="rounded-[1.9rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur xl:sticky xl:top-6 xl:self-start">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Alert detail</p>
      {alert ? (
        <div className="mt-4 space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>{dayLabel}</span>
              <span>{alert.startedAt}</span>
            </div>
            <h2 className="text-2xl font-semibold text-white">{alert.title}</h2>
            <p className="text-sm leading-6 text-slate-300">{alert.summary}</p>
          </div>
          {!isVisibleInCurrentFilters ? (
            <div className="rounded-[1.2rem] border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50">This alert is still selected, but it is hidden by the active severity filter.</div>
          ) : null}
          <dl className="grid gap-4 rounded-[1.2rem] border border-white/10 bg-white/5 p-4 text-sm text-slate-200 sm:grid-cols-2">
            {detailItems.map((item) => (
              <div key={item.label} className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</dt>
                <dd className="leading-6">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Resolution marker</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resolutionOptions.map((option) => {
                const isActive = resolution === option.value;
                return (
                  <button
                    key={option.value}
                    aria-pressed={isActive}
                    className={`rounded-full border px-3 py-2 text-sm transition ${
                      isActive
                        ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-50"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                    }`}
                    type="button"
                    onClick={() => onUpdateResolution(alert.id, option.value)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Tags</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {alert.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-200">{tag}</span>)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-[1.2rem] border border-dashed border-white/15 bg-white/5 p-6 text-sm leading-6 text-slate-300">Select an alert card to inspect its handoff context and change its local resolution marker.</div>
      )}
    </aside>
  );
}
