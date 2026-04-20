import {
  comparisonWindows,
  getHistoryForWindow,
  type ComparisonWindow,
  type SignalStream,
  type StreamStatus,
} from "./mock-data";
import {
  getConfidenceShiftLabel,
  getWindowLabel,
  type ComparisonDetail,
  type ComparisonSummary,
} from "./signal-lab-model";

const statusClasses: Record<StreamStatus, string> = {
  stable: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  drifting: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-200",
};

type ComparisonWorkbenchProps = {
  comparedStreams: SignalStream[];
  comparisonSummary: ComparisonSummary | null;
  comparisonDetail: ComparisonDetail | null;
  comparisonView: "summary" | "detail";
  comparisonWindow: ComparisonWindow;
  openAnomalyCount: number;
  onChangeView: (view: "summary" | "detail") => void;
  onChangeWindow: (window: ComparisonWindow) => void;
  onClearComparison: () => void;
};

function TrendStrip({
  stream,
  comparisonWindow,
}: {
  stream: SignalStream;
  comparisonWindow: ComparisonWindow;
}) {
  const history = getHistoryForWindow(stream, comparisonWindow);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium text-white">{stream.name}</p>
          <p className="mt-1 text-sm text-slate-400">{stream.channel}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white">{stream.confidence}% confidence</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
            {getConfidenceShiftLabel(stream, comparisonWindow)}
          </p>
        </div>
      </div>
      <div className="mt-4 flex h-24 items-end gap-2">
        {history.map((point) => (
          <div className="flex-1" key={`${stream.id}-${point.time}`}>
            <div
              className={`w-full rounded-t-xl ${stream.status === "critical" ? "bg-rose-400/80" : stream.status === "drifting" ? "bg-amber-400/80" : "bg-cyan-400/80"}`}
              style={{ height: `${Math.max(24, point.confidence)}%` }}
            />
            <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.15em] text-slate-500">
              {point.time}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-slate-400">
        {history.at(-1)?.note ?? stream.outlook}
      </p>
    </div>
  );
}

export function ComparisonWorkbench({
  comparedStreams,
  comparisonSummary,
  comparisonDetail,
  comparisonView,
  comparisonWindow,
  openAnomalyCount,
  onChangeView,
  onChangeWindow,
  onClearComparison,
}: ComparisonWorkbenchProps) {
  return (
    <section
      aria-label="Comparison workspace"
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-5 backdrop-blur"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Comparison Workspace
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Pinned multi-stream analysis
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Switch between summary and detail views to compare signal behavior
            over time and explain confidence changes across the pinned set.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["summary", "detail"] as const).map((view) => (
            <button
              key={view}
              aria-pressed={comparisonView === view}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                comparisonView === view
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-100"
                  : "border-white/10 text-slate-100 hover:border-white/20 hover:bg-white/5"
              }`}
              onClick={() => onChangeView(view)}
              type="button"
            >
              {view === "summary" ? "Summary view" : "Detail view"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {comparisonWindows.map((window) => (
          <button
            key={window.id}
            aria-pressed={comparisonWindow === window.id}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              comparisonWindow === window.id
                ? "border-white/20 bg-white/10 text-white"
                : "border-white/10 text-slate-200 hover:border-white/20 hover:bg-white/5"
            }`}
            onClick={() => onChangeWindow(window.id)}
            type="button"
          >
            {window.label}
          </button>
        ))}
        {comparedStreams.length > 0 ? (
          <button
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5"
            onClick={onClearComparison}
            type="button"
          >
            Clear pinned streams
          </button>
        ) : null}
      </div>

      {comparedStreams.length < 2 || !comparisonSummary || !comparisonDetail ? (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 px-5 py-8 text-sm text-slate-400">
          Pin at least two streams to unlock the comparison workspace. With one
          stream pinned, the inspector still explains anomalies, but the summary
          and detail views remain intentionally empty.
        </div>
      ) : null}

      {comparedStreams.length >= 2 && comparisonSummary && comparisonDetail ? (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {comparedStreams.map((stream) => (
              <span
                key={stream.id}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${statusClasses[stream.status]}`}
              >
                {stream.name}
              </span>
            ))}
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
              {getWindowLabel(comparisonWindow)}
            </span>
          </div>

          {comparisonView === "summary" ? (
            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.85fr)]">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {comparisonSummary.headline}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {comparisonSummary.narrative}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {comparisonSummary.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-xl font-medium text-white">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm text-slate-400">
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-4">
                  {comparedStreams.map((stream) => (
                    <TrendStrip
                      comparisonWindow={comparisonWindow}
                      key={stream.id}
                      stream={stream}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Summary highlights
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                    {comparisonSummary.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Recommendation
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {comparisonSummary.recommendation}
                  </p>
                  <p className="mt-4 text-sm text-slate-400">
                    {openAnomalyCount} open anomalies are attached to the
                    currently pinned comparison set.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="grid gap-3 border-b border-white/10 pb-3 text-xs uppercase tracking-[0.2em] text-slate-500 sm:grid-cols-[minmax(0,1.8fr)_repeat(4,minmax(0,1fr))]">
                  <span>Stream</span>
                  <span>Confidence</span>
                  <span>Lens shift</span>
                  <span>Anomaly load</span>
                  <span>Driver</span>
                </div>
                <div className="mt-4 space-y-4">
                  {comparisonDetail.rows.map((row) => {
                    const stream = comparedStreams.find(
                      (candidate) => candidate.id === row.id,
                    );

                    if (!stream) {
                      return null;
                    }

                    return (
                      <article
                        key={row.id}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="grid gap-4 sm:grid-cols-[minmax(0,1.8fr)_repeat(4,minmax(0,1fr))]">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-medium text-white">
                                {row.name}
                              </p>
                              <span
                                className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] ${statusClasses[row.status]}`}
                              >
                                {row.status}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-slate-400">
                              {row.watchword}
                            </p>
                            <p className="mt-2 text-sm text-slate-400">
                              {row.note}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-white">
                              {row.confidence}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-white">{row.shift}</p>
                          </div>
                          <div>
                            <p className="text-sm text-white">
                              {row.anomalyLoad}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-white">{row.driver}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <TrendStrip
                            comparisonWindow={comparisonWindow}
                            stream={stream}
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {comparisonDetail.insights.map((insight) => (
                  <div
                    key={insight}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                  >
                    <p className="text-sm leading-6 text-slate-300">
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : null}
    </section>
  );
}
