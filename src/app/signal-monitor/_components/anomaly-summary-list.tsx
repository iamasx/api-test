import type {
  SignalAnomaly,
  SignalSeverity,
  SignalStream,
} from "../_lib/signal-monitor-data";

type AnomalySummaryListProps = {
  anomalies: SignalAnomaly[];
  signals: SignalStream[];
};

const severityClasses: Record<SignalSeverity, string> = {
  watch: "border-amber-300/70 bg-amber-50 text-amber-900",
  elevated: "border-rose-300/70 bg-rose-50 text-rose-900",
  critical: "border-slate-900 bg-slate-950 text-white",
};

export function AnomalySummaryList({
  anomalies,
  signals,
}: AnomalySummaryListProps) {
  const signalNameById = new Map(signals.map((signal) => [signal.id, signal.name]));

  return (
    <div className="space-y-4">
      {anomalies.map((anomaly) => (
        <article
          key={anomaly.id}
          className={`rounded-[1.5rem] border px-5 py-5 shadow-[0_12px_36px_rgba(15,23,42,0.05)] ${severityClasses[anomaly.severity]}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex rounded-full border border-current/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {anomaly.severity}
                </span>
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {signalNameById.get(anomaly.signalId) ?? anomaly.signalId}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {anomaly.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-current/78">
                  {anomaly.summary}
                </p>
              </div>
            </div>

            <div className="min-w-[10rem] rounded-2xl border border-current/15 bg-white/15 px-4 py-3 text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/70">
                Detection window
              </p>
              <p className="mt-2 text-sm font-semibold">{anomaly.detectionWindow}</p>
            </div>
          </div>

          <dl className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-current/15 bg-white/10 px-4 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/70">
                Owner
              </dt>
              <dd className="mt-2 text-sm font-semibold">{anomaly.owner}</dd>
            </div>
            <div className="rounded-2xl border border-current/15 bg-white/10 px-4 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/70">
                Impact
              </dt>
              <dd className="mt-2 text-sm leading-6">{anomaly.impact}</dd>
            </div>
            <div className="rounded-2xl border border-current/15 bg-white/10 px-4 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/70">
                Recommended action
              </dt>
              <dd className="mt-2 text-sm leading-6">
                {anomaly.recommendedAction}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
