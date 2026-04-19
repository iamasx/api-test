import type { QueueId, WorkloadTotals } from "@/app/dispatch-center/mock-data";

type DispatchCenterHeaderProps = {
  lastUpdated: string; onSelectQueue: (queueId: QueueId) => void;
  queueSummaries: Array<{ id: QueueId; label: string; serviceTarget: string; windowLabel: string; total: number; dispatchCount: number; holdCount: number; oldestMinutes: number }>;
  selectedQueueId: QueueId | null; shiftLabel: string; shiftWindow: string; workloadTotals: WorkloadTotals;
};

const queueTone = { priority: "border-amber-300/25 bg-amber-300/10 text-amber-50", recovery: "border-sky-300/25 bg-sky-300/10 text-sky-50", returns: "border-emerald-300/25 bg-emerald-300/10 text-emerald-50" };

export function DispatchCenterHeader({ lastUpdated, onSelectQueue, queueSummaries, selectedQueueId, shiftLabel, shiftWindow, workloadTotals }: DispatchCenterHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.94),rgba(17,24,39,0.88))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.42)] sm:p-8">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Dispatch Center</p>
            <span className="rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-sky-100">{shiftLabel}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Assignment buckets, queue pressure, and operator load on one isolated route.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">Move items across local buckets, open queue detail without touching shared state, and watch the header totals react as the board shifts.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 xl:w-[25rem]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white">
            <p className="text-sm text-slate-300">Open board</p>
            <p className="mt-2 text-3xl font-semibold">{workloadTotals.openAssignments}</p>
            <p className="mt-1 text-sm text-slate-400">{shiftWindow}</p>
          </div>
          <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-4 text-sky-50">
            <p className="text-sm text-sky-100/80">Ready to move</p>
            <p className="mt-2 text-3xl font-semibold">{workloadTotals.readyCount}</p>
            <p className="mt-1 text-sm text-sky-100/80">Dispatch-ready cards</p>
          </div>
          <div className="rounded-3xl border border-rose-300/20 bg-rose-300/10 p-4 text-rose-50">
            <p className="text-sm text-rose-100/80">Hold review</p>
            <p className="mt-2 text-3xl font-semibold">{workloadTotals.holdCount}</p>
            <p className="mt-1 text-sm text-rose-100/80">{lastUpdated}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        {queueSummaries.map((queue) => (
          <button
            className={`rounded-[1.75rem] border p-5 text-left transition hover:-translate-y-0.5 hover:bg-white/10 ${selectedQueueId === queue.id ? "border-white/20 bg-white/10" : "border-white/10 bg-white/[0.04]"}`}
            key={queue.id}
            onClick={() => onSelectQueue(queue.id)}
            type="button"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">{queue.label}</p>
                <p className="mt-1 text-sm text-slate-400">{queue.serviceTarget}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] ${queueTone[queue.id]}`}>{queue.windowLabel}</span>
            </div>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-white">{queue.total}</p>
                <p className="mt-1 text-sm text-slate-400">{queue.oldestMinutes} min oldest item</p>
              </div>
              <div className="text-right text-sm text-slate-300">
                <p>{queue.dispatchCount} ready</p>
                <p>{queue.holdCount} on hold</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </header>
  );
}
