import type { AlertJournalAlert, AlertJournalDay, ResolutionState } from "@/app/alert-journal/alert-journal-data";

type AlertDayGroupsProps = { days: Array<AlertJournalDay & { visibleAlerts: AlertJournalAlert[] }>; expandedDayIds: string[]; resolutionById: Record<string, ResolutionState>; selectedAlertId: string | null; selectedDayId: string | null; onRestoreFilters: () => void; onSelectAlert: (dayId: string, alertId: string) => void; onSelectDay: (dayId: string) => void; onToggleDay: (dayId: string) => void; };

export function AlertDayGroups({
  days,
  expandedDayIds,
  resolutionById,
  selectedAlertId,
  selectedDayId,
  onRestoreFilters,
  onSelectAlert,
  onSelectDay,
  onToggleDay,
}: AlertDayGroupsProps) {
  const totalVisibleAlerts = days.reduce((count, day) => count + day.visibleAlerts.length, 0);

  if (totalVisibleAlerts === 0) {
    return (
      <section className="space-y-4" aria-label="Daily alert groups">
        <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-slate-950/35 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">No alerts match the current severity filter.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">Re-enable one or more severities to reopen the journal list and detail rail.</p>
          <button className="mt-4 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/10" type="button" onClick={onRestoreFilters}>Restore all severities</button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4" aria-label="Daily alert groups">
      {days.map((day) => {
        const isExpanded = expandedDayIds.includes(day.id);
        const isSelectedDay = selectedDayId === day.id;
        const openCount = day.alerts.filter((alert) => resolutionById[alert.id] === "open").length;

        return (
          <article
            key={day.id}
            className={`rounded-[1.75rem] border p-4 backdrop-blur transition ${
              isSelectedDay ? "border-cyan-300/30 bg-cyan-400/10" : "border-white/10 bg-slate-950/45"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <button className="min-w-0 text-left" type="button" onClick={() => onSelectDay(day.id)}>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{day.dateLabel}</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{day.label}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{day.note}</p>
                <p className="mt-2 text-sm text-slate-400">{day.visibleAlerts.length} visible of {day.alerts.length} alerts, {openCount} still open</p>
              </button>
              <button aria-expanded={isExpanded} className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10" type="button" onClick={() => onToggleDay(day.id)}>{isExpanded ? "Collapse" : "Expand"}</button>
            </div>
            {isExpanded ? (
              day.visibleAlerts.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {day.visibleAlerts.map((alert) => {
                    const isSelectedAlert = selectedAlertId === alert.id;

                    return (
                      <button
                        key={alert.id}
                        className={`w-full rounded-[1.35rem] border p-4 text-left transition ${
                          isSelectedAlert
                            ? "border-cyan-300/45 bg-cyan-300/10"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                        type="button"
                        onClick={() => onSelectAlert(day.id, alert.id)}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${severityTone(alert.severity)}`}>{alert.severity}</span>
                              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${resolutionTone(resolutionById[alert.id])}`}>{resolutionById[alert.id]}</span>
                              <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{alert.startedAt}</span>
                            </div>
                            <p className="text-lg font-medium text-white">{alert.title}</p>
                            <p className="max-w-3xl text-sm leading-6 text-slate-300">{alert.summary}</p>
                          </div>
                          <dl className="grid gap-1 text-sm text-slate-300 sm:text-right">
                            <div><dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Service</dt><dd>{alert.service}</dd></div>
                            <div><dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Zone</dt><dd>{alert.zone}</dd></div>
                          </dl>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-[1.35rem] border border-dashed border-white/15 bg-white/5 p-6 text-sm leading-6 text-slate-300">No alerts remain visible for this day. Change the severity mix to repopulate the group.</div>
              )
            ) : null}
          </article>
        );
      })}
    </section>
  );
}

function severityTone(severity: AlertJournalAlert["severity"]) {
  if (severity === "critical") return "bg-rose-500/20 text-rose-100";
  if (severity === "high") return "bg-orange-500/20 text-orange-100";
  if (severity === "medium") return "bg-amber-500/20 text-amber-100";
  return "bg-emerald-500/20 text-emerald-100";
}

function resolutionTone(resolution: ResolutionState) {
  if (resolution === "resolved") return "bg-emerald-500/20 text-emerald-100";
  if (resolution === "monitoring") return "bg-cyan-500/20 text-cyan-100";
  return "bg-slate-200/10 text-slate-100";
}
