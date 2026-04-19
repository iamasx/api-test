import { severityOptions, type AlertSeverity } from "@/app/alert-journal/alert-journal-data";

type SeverityFilterBarProps = {
  activeSeverities: AlertSeverity[];
  totalAlerts: number;
  totalVisibleAlerts: number;
  onRestoreAll: () => void;
  onToggleSeverity: (severity: AlertSeverity) => void;
};

export function SeverityFilterBar({
  activeSeverities,
  totalAlerts,
  totalVisibleAlerts,
  onRestoreAll,
  onToggleSeverity,
}: SeverityFilterBarProps) {
  const showRestore = activeSeverities.length !== severityOptions.length;

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Severity filters</p>
          <p className="mt-2 text-sm text-slate-300">Showing {totalVisibleAlerts} of {totalAlerts} alerts.</p>
        </div>
        {showRestore ? <button className="rounded-full border border-white/15 px-3 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/10" type="button" onClick={onRestoreAll}>Restore all severities</button> : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {severityOptions.map((option) => {
          const isActive = activeSeverities.includes(option.value);
          return (
            <button
              key={option.value}
              aria-pressed={isActive}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                isActive
                  ? "border-amber-300/40 bg-amber-300/15 text-amber-50"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
              }`}
              type="button"
              onClick={() => onToggleSeverity(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
