import type { ActiveAlert, AlertSeverity } from "../_data/dashboard-data";
import styles from "../operations-center.module.css";

const severityBadge: Record<AlertSeverity, string> = {
  critical: "border-rose-200 bg-rose-50 text-rose-800",
  elevated: "border-amber-200 bg-amber-50 text-amber-800",
  watch: "border-sky-200 bg-sky-50 text-sky-800",
};

const severityLabel: Record<AlertSeverity, string> = {
  critical: "Critical",
  elevated: "Elevated",
  watch: "Watch",
};

export function AlertStrip({ alerts }: { alerts: ActiveAlert[] }) {
  return (
    <ul aria-label="Active alerts" className="space-y-3">
      {alerts.map((alert) => (
        <li key={alert.id}>
          <article className={`${styles.surfaceCard} space-y-3 p-5`}>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${severityBadge[alert.severity]}`}
              >
                {severityLabel[alert.severity]}
              </span>
              <span className="text-xs text-slate-500">{alert.location}</span>
              <span className="ml-auto text-xs text-slate-400">
                {alert.updatedAgo}
              </span>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-slate-950">
              {alert.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600">
              {alert.description}
            </p>

            <p className="text-xs font-medium text-slate-500">
              Owner: {alert.owner}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
