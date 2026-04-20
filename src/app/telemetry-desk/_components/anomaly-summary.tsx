import type { AnomalyCluster, AnomalySeverity } from "../_data/telemetry-desk-data";
import { anomalySummary } from "../_data/telemetry-desk-data";
import styles from "../telemetry-desk.module.css";

const severityLabel: Record<AnomalySeverity, string> = {
  critical: "Critical",
  elevated: "Elevated",
  watch: "Watch",
};

const severityToneClasses: Record<AnomalySeverity, string> = {
  critical: "border-rose-300/40 bg-rose-300/14 text-rose-100",
  elevated: "border-amber-300/40 bg-amber-300/14 text-amber-100",
  watch: "border-sky-300/35 bg-sky-300/12 text-sky-100",
};

const severityCardClasses: Record<AnomalySeverity, string> = {
  critical: styles.clusterCritical,
  elevated: styles.clusterElevated,
  watch: styles.clusterWatch,
};

function AnomalyClusterCard({ cluster }: { cluster: AnomalyCluster }) {
  return (
    <li>
      <article
        className={`${styles.clusterCard} ${severityCardClasses[cluster.severity]} rounded-[1.6rem] p-5`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${severityToneClasses[cluster.severity]}`}
              >
                {severityLabel[cluster.severity]}
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {cluster.surface}
              </p>
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {cluster.title}
            </h3>
          </div>
          <p className="text-sm font-medium text-slate-200/78">{cluster.owner}</p>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.85fr)]">
          <div className={styles.clusterDetail}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Behavior shift
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{cluster.shift}</p>
          </div>
          <div className={styles.clusterDetail}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Recommended action
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{cluster.action}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export function AnomalySummary() {
  return (
    <section
      id="telemetry-anomalies"
      aria-label="Anomaly summary"
      className={`${styles.anomalyPanel} rounded-[1.95rem] p-6 sm:p-7`}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200/78">
            {anomalySummary.eyebrow}
          </p>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {anomalySummary.title}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-200/84 sm:text-base">
              {anomalySummary.description}
            </p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          {anomalySummary.stats.map((stat) => (
            <article key={stat.label} className={styles.summaryStat}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200/78">{stat.detail}</p>
            </article>
          ))}
        </div>

        <ul aria-label="Active anomaly clusters" className="space-y-4">
          {anomalySummary.anomalies.map((cluster) => (
            <AnomalyClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </ul>
      </div>
    </section>
  );
}
