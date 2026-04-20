import type { IncidentRecord } from "../_data/incident-deck-data";
import styles from "../incident-deck.module.css";

type IncidentCardProps = {
  incident: IncidentRecord;
};

const toneClassNames = {
  critical: styles.toneCritical,
  watch: styles.toneWatch,
  steady: styles.toneSteady,
};

const severityClassNames = {
  "SEV-1": styles.severityCritical,
  "SEV-2": styles.severityWatch,
  "SEV-3": styles.severityInfo,
};

const statusClassNames = {
  Investigating: styles.statusDefault,
  Mitigating: styles.statusCritical,
  Monitoring: styles.statusSteady,
};

export function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <article
      className={`${styles.incidentCard} ${toneClassNames[incident.tone]}`}
      role="listitem"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {incident.service}
            </p>
            <h3 className="max-w-3xl text-2xl font-semibold tracking-tight text-slate-950">
              {incident.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles.chip} ${severityClassNames[incident.severity]}`}
            >
              {incident.severity}
            </span>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles.chip} ${statusClassNames[incident.status]}`}
            >
              {incident.status}
            </span>
          </div>
        </div>

        <p className="max-w-4xl text-sm leading-7 text-slate-700">
          {incident.summary}
        </p>
      </div>

      <div className={`${styles.metaGrid} mt-5`}>
        <div className={styles.metaBlock}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Commander
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {incident.incidentCommander}
          </p>
        </div>
        <div className={styles.metaBlock}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Channel
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{incident.channel}</p>
        </div>
        <div className={styles.metaBlock}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Region
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{incident.region}</p>
        </div>
        <div className={styles.metaBlock}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Next update
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {incident.nextUpdateAt}
          </p>
        </div>
      </div>

      <div className={`${styles.detailGrid} mt-5`}>
        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Blast radius
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {incident.blastRadius}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Customer impact
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {incident.customerImpact}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Mitigation
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {incident.mitigation}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Active workstreams
            </p>
            <ul className={styles.stackList} aria-label={`${incident.service} workstreams`}>
              {incident.workstreams.map((workstream) => (
                <li key={workstream}>{workstream}</li>
              ))}
            </ul>
          </div>

          <div className={styles.metaBlock}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Ownership lanes
            </p>
            <div className={`${styles.chipRow} mt-3`}>
              {incident.owners.map((owner) => (
                <span key={owner} className={styles.chip}>
                  {owner}
                </span>
              ))}
            </div>
          </div>

          <div className={`${styles.darkNote} px-4 py-4 text-slate-50`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Latest note
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              {incident.updateNote}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Open for {incident.ageMinutes} minutes since {incident.detectedAt}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
