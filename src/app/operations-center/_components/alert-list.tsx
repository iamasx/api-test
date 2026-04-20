import type { AlertSeverity, LiveAlert } from "../_data/dashboard-data";
import styles from "../operations-center.module.css";

const severityToneClasses: Record<AlertSeverity, string> = {
  critical: "border-rose-200 bg-rose-50 text-rose-800",
  elevated: "border-amber-200 bg-amber-50 text-amber-800",
  watch: "border-sky-200 bg-sky-50 text-sky-800",
};

const severityAccentClasses: Record<AlertSeverity, string> = {
  critical: styles.alertCritical,
  elevated: styles.alertElevated,
  watch: styles.alertWatch,
};

const severityLabel: Record<AlertSeverity, string> = {
  critical: "Critical",
  elevated: "Elevated",
  watch: "Watch",
};

export function AlertList({ alerts }: { alerts: LiveAlert[] }) {
  return (
    <ul aria-label="Live alerts" className="space-y-4">
      {alerts.map((alert) => (
        <li key={alert.id}>
          <article
            className={`${styles.surfaceCard} ${styles.alertItem} ${severityAccentClasses[alert.severity]} p-5 sm:p-6`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${severityToneClasses[alert.severity]}`}
                  >
                    {severityLabel[alert.severity]}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {alert.site}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                    {alert.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600">
                    {alert.description}
                  </p>
                </div>
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {alert.updatedAt}
              </p>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-[1fr_1fr]">
              <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Owner
                </p>
                <p className="mt-2 font-medium">{alert.owner}</p>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Impact
                </p>
                <p className="mt-2 font-medium">{alert.impact}</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-slate-300/90 bg-slate-950/[0.03] px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Recommended playbook
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {alert.playbook}
              </p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
