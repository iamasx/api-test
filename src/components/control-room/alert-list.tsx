import type { Ref } from "react";
import {
  alertSeverityFilters,
  type AlertItem,
  type AlertSeverityFilter,
} from "@/app/control-room/mock-data";

const severityClasses = {
  info: "border-sky-300/20 bg-sky-400/10 text-sky-100",
  warning: "border-amber-300/25 bg-amber-400/10 text-amber-100",
  critical: "border-rose-400/25 bg-rose-500/10 text-rose-100",
};

type AlertListProps = {
  activeSeverityFilter: AlertSeverityFilter;
  alerts: AlertItem[];
  isInfoSilenced: boolean;
  isSpotlighted: boolean;
  selectedAlertId: string | null;
  onSelectAlert: (alertId: string) => void;
  onSeverityFilterChange: (filter: AlertSeverityFilter) => void;
  sectionRef?: Ref<HTMLElement>;
};

export function AlertList({
  activeSeverityFilter,
  alerts,
  isInfoSilenced,
  isSpotlighted,
  selectedAlertId,
  onSelectAlert,
  onSeverityFilterChange,
  sectionRef,
}: AlertListProps) {
  const visibleAlerts = alerts.filter(
    (alert) =>
      activeSeverityFilter === "all" || alert.severity === activeSeverityFilter,
  );

  return (
    <section
      aria-label="Alert queue"
      className={`rounded-[2rem] border bg-slate-950/65 p-6 backdrop-blur transition sm:p-8 ${
        isSpotlighted
          ? "border-cyan-300/45 shadow-[0_0_0_1px_rgba(103,232,249,0.15),0_18px_70px_rgba(34,211,238,0.18)]"
          : "border-white/10"
      }`}
      ref={sectionRef}
      tabIndex={-1}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
              Alerts
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Priority queue
            </h2>
          </div>
          <p className="text-sm text-slate-400">{visibleAlerts.length} active items</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {alertSeverityFilters.map((filter) => {
            const isActive = activeSeverityFilter === filter.id;

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-cyan-200 bg-cyan-200 text-slate-950"
                    : "border-white/12 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white"
                }`}
                key={filter.id}
                onClick={() => onSeverityFilterChange(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleAlerts.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-sm text-slate-400">
          No alerts match the current queue filter.
        </div>
      ) : (
        <ol className="mt-6 space-y-3">
          {visibleAlerts.map((alert) => {
            const isSelected = selectedAlertId === alert.id;
            const isMutedInfo = isInfoSilenced && alert.severity === "info";

            return (
              <li
                className={`rounded-[1.5rem] border p-4 transition ${
                  isSelected
                    ? "border-cyan-300/35 bg-cyan-400/[0.08]"
                    : "border-white/8 bg-white/[0.04]"
                } ${isMutedInfo ? "opacity-80" : ""}`}
                key={alert.id}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em] ${severityClasses[alert.severity]}`}
                    >
                      {alert.severity}
                    </span>
                    {isMutedInfo ? (
                      <span className="rounded-full border border-slate-400/20 bg-slate-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-200">
                        muted locally
                      </span>
                    ) : null}
                    {isSelected ? (
                      <span className="rounded-full border border-cyan-300/30 bg-cyan-300/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-100">
                        drilldown open
                      </span>
                    ) : null}
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {alert.ageLabel}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">{alert.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{alert.detail}</p>
                <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
                  <p>
                    <span className="text-slate-200">Owner:</span> {alert.owner}
                  </p>
                  <p>
                    <span className="text-slate-200">Impact:</span> {alert.impact}
                  </p>
                  <p>
                    <span className="text-slate-200">Service:</span> {alert.service}
                  </p>
                  <p>
                    <span className="text-slate-200">Runbook:</span> {alert.runbook}
                  </p>
                </div>
                <button
                  className={`mt-5 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? "bg-cyan-300 text-slate-950"
                      : "border border-white/12 bg-white/[0.04] text-slate-100 hover:border-cyan-300/30 hover:text-white"
                  }`}
                  onClick={() => onSelectAlert(alert.id)}
                  type="button"
                >
                  {isSelected ? "Drilldown selected" : "Open alert drilldown"}
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
