import { AnomalySummaryList } from "./anomaly-summary-list";
import { SignalInspector } from "./signal-inspector";
import { SignalStreamCard } from "./signal-stream-card";
import type { SignalMonitorView } from "../_lib/signal-monitor";

type SignalMonitorShellProps = {
  view: SignalMonitorView;
};

const monitorHighlights = [
  "Live cards stay visible alongside the active inspector selection.",
  "Anomaly summaries emphasize severity, ownership, and concrete action.",
  "Mock stream data keeps the route isolated from backend dependencies.",
];

export function SignalMonitorShell({ view }: SignalMonitorShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-900/80 bg-slate-950 shadow-[0_30px_110px_rgba(15,23,42,0.24)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:px-12 lg:py-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Signal monitor
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Watch live streams, anomaly pressure, and operator detail in one route.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                The monitoring view pairs live signal cards with a standing
                anomaly rollup and an inspector-style side panel so the route
                can be validated independently with mock data.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {view.overviewStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Route posture
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Mixed live status with one critical blind spot
            </p>
            <ul className="mt-5 space-y-3">
              {monitorHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {!view.selectionFound && view.requestedSignalId ? (
        <div
          role="status"
          className="rounded-[1.6rem] border border-amber-300/70 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-900"
        >
          The requested signal <code>{view.requestedSignalId}</code> was not
          found. Showing the highest-priority stream instead.
        </div>
      ) : null}

      <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <div className="space-y-8">
          <section aria-labelledby="signal-monitor-streams" className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Monitoring surface
                </p>
                <h2
                  id="signal-monitor-streams"
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Live signal cards
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Each card exposes stream posture, throughput, drift markers, and
                the number of active anomalies tied to that feed.
              </p>
            </div>

            <div
              aria-label="Live signals"
              className="grid gap-4 xl:grid-cols-2"
              role="list"
            >
              {view.signals.map((signal) => (
                <div key={signal.id} role="listitem">
                  <SignalStreamCard
                    href={`/signal-monitor?signal=${signal.id}`}
                    isActive={signal.id === view.selectedSignal.id}
                    signal={signal}
                  />
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="signal-monitor-anomalies" className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Intervention queue
                </p>
                <h2
                  id="signal-monitor-anomalies"
                  className="text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Anomaly summary
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Severity, owner, impact, and recommended actions stay visible so
                the route can be reviewed without opening a second surface.
              </p>
            </div>

            <AnomalySummaryList anomalies={view.anomalies} signals={view.signals} />
          </section>
        </div>

        <SignalInspector
          anomalies={view.selectedAnomalies}
          signal={view.selectedSignal}
        />
      </div>
    </main>
  );
}
