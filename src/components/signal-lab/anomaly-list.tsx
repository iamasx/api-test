import type { SignalAnomaly } from "./mock-data";

const severityClasses = {
  low: "border-sky-400/30 bg-sky-400/10 text-sky-200",
  medium: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  high: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

type AnomalyListProps = {
  anomalies: SignalAnomaly[];
  acknowledgedIds: string[];
  showDismissed: boolean;
  onToggleAcknowledged: (anomalyId: string) => void;
  onToggleDismissed: (anomalyId: string) => void;
  onToggleDismissedView: () => void;
  onSelectStream: (streamId: string) => void;
};
export function AnomalyList({
  anomalies,
  acknowledgedIds,
  showDismissed,
  onToggleAcknowledged,
  onToggleDismissed,
  onToggleDismissedView,
  onSelectStream,
}: AnomalyListProps) {
  return (
    <section
      aria-label="Anomaly feed"
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-5 backdrop-blur"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Anomaly Feed</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Synthetic incidents</h2>
        </div>
        <button
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5"
          onClick={onToggleDismissedView}
          type="button"
        >
          {showDismissed ? "Hide dismissed" : "Show dismissed"}
        </button>
      </div>
      <div className="mt-5 space-y-3">
        {anomalies.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-8 text-sm text-slate-400">
            No anomalies match the current view. Restore dismissed items or clear stream focus to widen the sweep.
          </div>
        ) : null}
        {anomalies.map((anomaly) => {
          const isTracked = acknowledgedIds.includes(anomaly.id);
          const dismissLabel = `Dismiss ${anomaly.title}`;
          const trackLabel = `${isTracked ? "Release" : "Track"} ${anomaly.title}`;
          return (
            <article
              key={anomaly.id}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.25em] ${severityClasses[anomaly.severity]}`}>
                      {anomaly.severity}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{anomaly.detectedAt}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-white">{anomaly.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{anomaly.summary}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Delta</p>
                  <p className="mt-2 text-lg font-medium text-white">{anomaly.delta}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-300/40"
                  onClick={() => onSelectStream(anomaly.streamId)}
                  type="button"
                >
                  Jump to stream
                </button>
                <button
                  aria-label={trackLabel}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/5"
                  onClick={() => onToggleAcknowledged(anomaly.id)}
                  type="button"
                >
                  {isTracked ? "Tracked" : "Track"}
                </button>
                <button
                  aria-label={dismissLabel}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/5"
                  onClick={() => onToggleDismissed(anomaly.id)}
                  type="button"
                >
                  Dismiss
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-400">{anomaly.recommendation}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
