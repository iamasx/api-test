import type {
  AlertSeverity,
  ControlRoomAlertSection,
} from "../_data/control-room-data";
import styles from "../control-room.module.css";

const severityClasses: Record<AlertSeverity, string> = {
  critical: "border-rose-200 bg-rose-50 text-rose-800",
  elevated: "border-amber-200 bg-amber-50 text-amber-800",
  watch: "border-sky-200 bg-sky-50 text-sky-800",
};

const severityLabels: Record<AlertSeverity, string> = {
  critical: "Critical",
  elevated: "Elevated",
  watch: "Watch",
};

const sectionClasses: Record<string, string> = {
  "immediate-action": styles.alertSectionImmediate,
  "stabilization-queue": styles.alertSectionStabilization,
  "observation-deck": styles.alertSectionObservation,
};

const itemClasses: Record<AlertSeverity, string> = {
  critical: styles.alertCritical,
  elevated: styles.alertElevated,
  watch: styles.alertWatch,
};

export function AlertList({ sections }: { sections: ControlRoomAlertSection[] }) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <section
          key={section.id}
          className={`${styles.surfaceCard} ${styles.alertSection} ${sectionClasses[section.id]} p-5 sm:p-6`}
        >
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                  {section.title}
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  {section.summary}
                </p>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {section.responseWindow}
              </p>
            </div>

            {section.alerts.length > 0 ? (
              <ul className="space-y-3" aria-label={section.title}>
                {section.alerts.map((alert) => (
                  <li key={alert.id}>
                    <article
                      className={`${styles.alertItem} ${itemClasses[alert.severity]} rounded-[1.5rem] border border-slate-200/90 bg-white/75 p-4`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${severityClasses[alert.severity]}`}
                            >
                              {severityLabels[alert.severity]}
                            </span>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {alert.zone}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold tracking-tight text-slate-950">
                              {alert.title}
                            </h4>
                            <p className="text-sm leading-6 text-slate-600">
                              {alert.summary}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {alert.updatedAt}
                        </p>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Owner
                          </p>
                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {alert.owner}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                            Customer impact
                          </p>
                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {alert.customerImpact}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          Next step
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-800">
                          {alert.nextStep}
                        </p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/75 px-5 py-4">
                <p className="text-sm font-medium text-slate-800">
                  No active alerts in this lane.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep this section visible so operators can confirm the lane is
                  intentionally clear, not missing data.
                </p>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
