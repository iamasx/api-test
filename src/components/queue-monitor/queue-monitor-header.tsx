import type { ThroughputSummary } from "./queue-monitor-data";

type QueueMonitorHeaderProps = {
  agingCount: number; backlogTotal: number; breachCount: number; escalatedCount: number;
  queuesAtRisk: number; snapshot: string; throughputSummaries: ThroughputSummary[];
};

const throughputToneClasses = {
  up: "border-sky-300/20 bg-sky-300/10 text-sky-50",
  flat: "border-slate-300/20 bg-slate-300/10 text-slate-50",
  down: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

export function QueueMonitorHeader({
  agingCount,
  backlogTotal,
  breachCount,
  escalatedCount,
  queuesAtRisk,
  snapshot,
  throughputSummaries,
}: QueueMonitorHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(17,24,39,0.96),rgba(67,20,7,0.82))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.42)] sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-200">Queue monitor</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Backlog pressure, queue throughput, and escalation decisions in one isolated route.</h1>
          <p className="mt-4 text-sm leading-6 text-slate-200 sm:text-base">The totals, columns, and escalation controls below are driven entirely by feature-local mock data and client-side state.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 xl:w-[27rem]">
          <div className="rounded-3xl border border-white/10 bg-white/8 p-4 text-white">
            <p className="text-sm text-slate-300">Backlog total</p>
            <p className="mt-2 text-3xl font-semibold">{backlogTotal}</p>
            <p className="mt-1 text-sm text-slate-300">{queuesAtRisk} queues need attention</p>
          </div>
          <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 text-amber-50">
            <p className="text-sm text-amber-100/80">Aging items</p>
            <p className="mt-2 text-3xl font-semibold">{agingCount}</p>
            <p className="mt-1 text-sm text-amber-100/80">{breachCount} over target window</p>
          </div>
          <div className="rounded-3xl border border-orange-300/20 bg-orange-300/12 p-4 text-orange-50">
            <p className="text-sm text-orange-100/80">Escalations</p>
            <p className="mt-2 text-3xl font-semibold">{escalatedCount}</p>
            <p className="mt-1 text-sm text-orange-100/80">{snapshot}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        {throughputSummaries.map((summary) => (
          <div className={`rounded-[1.6rem] border p-4 ${throughputToneClasses[summary.tone]}`} key={summary.id}>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] opacity-75">{summary.label}</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-3xl font-semibold">{summary.value}</p>
              <p className="max-w-40 text-right text-sm opacity-80">{summary.note}</p>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
