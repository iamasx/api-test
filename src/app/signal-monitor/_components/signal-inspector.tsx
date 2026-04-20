import type {
  SignalAnomaly,
  SignalStream,
} from "../_lib/signal-monitor-data";

type SignalInspectorProps = {
  signal: SignalStream;
  anomalies: SignalAnomaly[];
};

const inspectorToneClasses: Record<SignalStream["status"], string> = {
  tracking: "border-emerald-300/30 bg-emerald-400/15 text-emerald-50",
  watch: "border-amber-300/30 bg-amber-400/15 text-amber-50",
  degraded: "border-rose-300/30 bg-rose-400/15 text-rose-50",
  offline: "border-slate-300/30 bg-white/10 text-slate-100",
};

export function SignalInspector({
  signal,
  anomalies,
}: SignalInspectorProps) {
  return (
    <aside
      aria-label="Signal inspector"
      className="overflow-hidden rounded-[2rem] border border-slate-900/80 bg-slate-950 shadow-[0_28px_100px_rgba(15,23,42,0.22)]"
    >
      <div className="space-y-6 px-6 py-6 sm:px-7 sm:py-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Inspector
            </p>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                {signal.name}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {signal.summary}
              </p>
            </div>
          </div>

          <div
            className={`inline-flex rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${inspectorToneClasses[signal.status]}`}
          >
            {signal.status}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Region
            </p>
            <p className="mt-2 text-lg font-semibold text-white">{signal.region}</p>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Throughput
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {signal.throughput}
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Refresh state
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {signal.refreshedAt}
            </p>
          </div>
        </div>

        <section aria-label="Inspector detail sections" className="space-y-4">
          {signal.detailSections.map((section) => (
            <div
              key={section.title}
              className="rounded-[1.45rem] border border-white/10 bg-white/5 px-5 py-5"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {section.title}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  {section.description}
                </p>
              </div>
              <dl className="mt-4 space-y-3">
                {section.entries.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex flex-col gap-1 border-t border-white/[0.08] pt-3 first:border-t-0 first:pt-0"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {entry.label}
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-white">
                      {entry.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </section>

        <section
          aria-label="Inspector anomalies"
          className="rounded-[1.45rem] border border-white/10 bg-white/5 px-5 py-5"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                Active anomaly stack
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The inspector keeps anomaly context for the current signal
                adjacent to the detailed operating notes.
              </p>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-200">
              {anomalies.length} active
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {anomalies.length > 0 ? (
              anomalies.map((anomaly) => (
                <article
                  key={anomaly.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-200">
                        {anomaly.severity}
                      </div>
                      <h4 className="text-base font-semibold text-white">
                        {anomaly.title}
                      </h4>
                    </div>
                    <p className="text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {anomaly.detectionWindow}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {anomaly.impact}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4">
                <p className="text-sm leading-6 text-slate-300">
                  No active anomalies are mapped to this stream in the current
                  mock window.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
}
