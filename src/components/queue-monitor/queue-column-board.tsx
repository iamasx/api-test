import type { BacklogItem, AgeFilter, QueueScope, QueueSummary, EscalationLevelId } from "./queue-monitor-data";

type QueueColumnBoardProps = {
  ageFilter: AgeFilter; columns: { items: BacklogItem[]; queue: QueueSummary }[]; queueEscalations: Record<string, number>;
  queueScope: QueueScope; queueTotals: Record<string, number>; selectedItemId: string | null; selectedQueueId: string | null;
  escalationState: Record<string, { level: EscalationLevelId }>; onSelectItem: (queueId: string, itemId: string) => void; onSelectQueue: (queueId: string) => void;
};

const queueToneClasses = {
  stable: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};
const severityClasses = {
  low: "bg-slate-200/15 text-slate-100",
  medium: "bg-amber-200/15 text-amber-100",
  high: "bg-rose-200/15 text-rose-100",
};
const filterCopy = {
  all: "all backlog items",
  aging: "aging or breach items",
  breach: "breach items",
};
const scopeCopy = {
  all: "all queues",
  watch: "attention queues",
  stable: "stable queues",
};

export function QueueColumnBoard({
  ageFilter,
  columns,
  queueEscalations,
  queueScope,
  queueTotals,
  selectedItemId,
  selectedQueueId,
  escalationState,
  onSelectItem,
  onSelectQueue,
}: QueueColumnBoardProps) {
  const visibleItemTotal = columns.reduce((sum, column) => sum + column.items.length, 0);

  if (visibleItemTotal === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/55 p-8 text-center text-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">No items in view</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">The current filter mix leaves {scopeCopy[queueScope]} with no {filterCopy[ageFilter]}.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">Switch the queue scope or age filter to reopen the board and inspect live backlog cards.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 xl:grid-cols-4">
      {columns.map(({ items, queue }) => {
        const isSelectedQueue = queue.id === selectedQueueId;
        const throughputDelta = queue.clearedPerHour - queue.intakePerHour;

        return (
          <article className={`rounded-[1.9rem] border p-4 shadow-[0_20px_70px_rgba(15,23,42,0.32)] ${isSelectedQueue ? "border-orange-200/45 bg-slate-900/95" : "border-white/10 bg-slate-950/72"}`} key={queue.id}>
            <button className="w-full text-left" onClick={() => onSelectQueue(queue.id)} type="button">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${queueToneClasses[queue.tone]}`}>{queue.statusLabel}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{queue.slaWindow}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">{queue.label}</h2>
              <p className="mt-1 text-sm text-slate-300">{queue.region} · {queue.owner}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Visible</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{items.length}</p>
                  <p className="text-xs text-slate-400">of {queueTotals[queue.id]} items</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Throughput</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{queue.clearedPerHour}/{queue.intakePerHour}</p>
                  <p className={`text-xs ${throughputDelta >= 0 ? "text-emerald-200" : "text-rose-200"}`}>{throughputDelta >= 0 ? `+${throughputDelta}` : throughputDelta} vs intake</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>{queue.oldestMinutes} min oldest</span>
                <span>{queueEscalations[queue.id]} local escalations</span>
              </div>
            </button>
            <div className="mt-4 space-y-3">
              {items.length > 0 ? items.map((item) => {
                const isSelectedItem = item.id === selectedItemId;
                const localLevel = escalationState[item.id].level;

                return (
                  <button className={`block w-full rounded-[1.4rem] border p-4 text-left transition ${isSelectedItem ? "border-orange-200/45 bg-orange-200/10" : "border-white/10 bg-white/5 hover:bg-white/8"}`} key={item.id} onClick={() => onSelectItem(queue.id, item.id)} type="button">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${severityClasses[item.severity]}`}>{item.severity}</span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">{item.ageMinutes} min</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{item.customer}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-400">
                      <span>{item.caseRef}</span>
                      <span>{localLevel === "none" ? "Local watch" : localLevel === "lead" ? "Lead escalated" : "Director paged"}</span>
                    </div>
                  </button>
                );
              }) : (
                <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] p-5 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Filtered clear</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">No {filterCopy[ageFilter]} are parked in this queue right now.</p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
