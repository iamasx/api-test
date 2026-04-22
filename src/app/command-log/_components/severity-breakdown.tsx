import type { CommandLogSummaryMetric } from "../_lib/command-log";
import type { CommandEventSeverity, CommandLogEvent } from "../_lib/command-log-data";
import styles from "../command-log.module.css";

type SeverityBreakdownProps = {
  events: CommandLogEvent[];
  summaryMetrics: CommandLogSummaryMetric[];
};

type SeverityBucket = {
  severity: CommandEventSeverity;
  count: number;
  percentage: number;
  latestTitle: string;
  latestTimestamp: string;
};

const severityOrder: CommandEventSeverity[] = ["Critical", "High", "Moderate", "Low"];

const severityBarClasses: Record<CommandEventSeverity, string> = {
  Critical: "bg-rose-500",
  High: "bg-amber-400",
  Moderate: "bg-sky-400",
  Low: "bg-emerald-400",
};

function buildSeverityBuckets(events: CommandLogEvent[]): SeverityBucket[] {
  const total = events.length;
  const grouped = new Map<CommandEventSeverity, CommandLogEvent[]>();

  for (const event of events) {
    const existing = grouped.get(event.severity) ?? [];
    existing.push(event);
    grouped.set(event.severity, existing);
  }

  return severityOrder
    .filter((severity) => grouped.has(severity))
    .map((severity) => {
      const group = grouped.get(severity)!;
      const latest = group[0];
      return {
        severity,
        count: group.length,
        percentage: Math.round((group.length / total) * 100),
        latestTitle: latest.title,
        latestTimestamp: latest.occurredLabel,
      };
    });
}

export function SeverityBreakdown({ events, summaryMetrics }: SeverityBreakdownProps) {
  const buckets = buildSeverityBuckets(events);

  return (
    <section
      aria-labelledby="severity-breakdown-title"
      className={`${styles.tagSection} rounded-[2rem] border border-slate-200/70 bg-[var(--surface)] p-5 shadow-[0_18px_65px_rgba(15,23,42,0.08)] sm:p-6`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Severity distribution
          </p>
          <h2
            id="severity-breakdown-title"
            className="text-3xl font-semibold tracking-tight text-slate-950"
          >
            Event severity across the shift
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          Distribution of events by severity level helps prioritize review focus
          and identify shifts in operational pressure.
        </p>
      </div>

      <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full bg-slate-100" role="img" aria-label="Severity distribution bar">
        {buckets.map((bucket) => (
          <div
            key={bucket.severity}
            className={`${severityBarClasses[bucket.severity]} transition-all`}
            style={{ width: `${bucket.percentage}%` }}
            title={`${bucket.severity}: ${bucket.count} events (${bucket.percentage}%)`}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4" role="list" aria-label="Severity buckets">
        {buckets.map((bucket) => (
          <article
            key={bucket.severity}
            role="listitem"
            className={`${styles.tagCard} rounded-[1.5rem] border border-slate-200 bg-white/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Severity
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                  {bucket.severity}
                </h3>
              </div>
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                {bucket.count} events
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${severityBarClasses[bucket.severity]}`} />
                <span className="font-semibold text-slate-800">{bucket.percentage}%</span>
                <span>of all events</span>
              </div>
              <p>
                <span className="font-semibold text-slate-950">Latest:</span>{" "}
                {bucket.latestTitle}
              </p>
              <p className="text-xs text-slate-500">{bucket.latestTimestamp}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
