import type { DispatchAssignment, OperatorRecord, QueueDefinition, QueueId } from "@/app/dispatch-center/mock-data";

type AssignmentBucketsProps = {
  assignments: DispatchAssignment[]; onMoveAssignment: (assignmentId: string, direction: -1 | 1) => void;
  onQueueFilterChange: (filter: QueueId | "all") => void; onSelectAssignment: (assignmentId: string) => void;
  operators: OperatorRecord[]; queueCounts: Record<QueueId, number>; queueFilter: QueueId | "all"; queues: QueueDefinition[];
  selectedAssignmentId: string | null; selectedOperatorId: string | null;
};

const bucketMeta = [
  { id: "intake", label: "Intake", detail: "Fresh queue drops and newly recovered work." },
  { id: "dispatch", label: "Ready Board", detail: "Operator-confirmed work waiting for release." },
  { id: "hold", label: "Hold Bucket", detail: "Paused items waiting on access, stock, or approval." },
] as const;
const priorityTone = { critical: "border-amber-300/25 bg-amber-300/10 text-amber-100", watch: "border-sky-300/25 bg-sky-300/10 text-sky-100", steady: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" };

export function AssignmentBuckets({
  assignments, onMoveAssignment, onQueueFilterChange, onSelectAssignment, operators, queueCounts, queueFilter, queues, selectedAssignmentId, selectedOperatorId,
}: AssignmentBucketsProps) {
  const operatorMap = Object.fromEntries(operators.map((operator) => [operator.id, operator.name]));
  const queueLabelMap = Object.fromEntries(queues.map((queue) => [queue.id, queue.label]));
  const filteredAssignments = assignments.filter((assignment) => queueFilter === "all" || assignment.queueId === queueFilter);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.94))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.34)] sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Assignment board</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Queue buckets with local movement controls</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Filter by queue, select a card to sync the drawer, and move items between buckets without leaving this route.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={`rounded-full px-3 py-2 text-sm transition ${queueFilter === "all" ? "bg-white text-slate-950" : "border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10"}`} onClick={() => onQueueFilterChange("all")} type="button">
            All queues · {assignments.length}
          </button>
          {queues.map((queue) => (
            <button
              className={`rounded-full px-3 py-2 text-sm transition ${queueFilter === queue.id ? "bg-sky-200 text-slate-950" : "border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10"}`}
              key={queue.id}
              onClick={() => onQueueFilterChange(queue.id)}
              type="button"
            >
              {queue.label} · {queueCounts[queue.id]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {bucketMeta.map((bucket, index) => {
          const bucketAssignments = filteredAssignments.filter((assignment) => assignment.bucketId === bucket.id);
          return (
            <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4" key={bucket.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">{bucket.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">{bucket.detail}</p>
                </div>
                <span className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">{bucketAssignments.length}</span>
              </div>

              <div className="mt-4 space-y-3">
                {bucketAssignments.length > 0 ? bucketAssignments.map((assignment) => {
                  const isSelected = selectedAssignmentId === assignment.id;
                  const isDimmed = Boolean(selectedOperatorId && assignment.operatorId !== selectedOperatorId);
                  return (
                    <div className={`rounded-[1.5rem] border p-4 transition ${isSelected ? "border-sky-300/30 bg-sky-300/10" : "border-white/10 bg-white/5"} ${isDimmed ? "opacity-55" : ""}`} key={assignment.id}>
                      <button className="w-full text-left" onClick={() => onSelectAssignment(assignment.id)} type="button">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] ${priorityTone[assignment.priority]}`}>{assignment.priority}</span>
                          <span className="rounded-full border border-white/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">{queueLabelMap[assignment.queueId]}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-white">{assignment.title}</h3>
                        <p className="mt-1 text-sm text-slate-300">{assignment.location}</p>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{assignment.note}</p>
                      </button>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-sm text-slate-300">
                          <p>{operatorMap[assignment.operatorId]}</p>
                          <p className="text-slate-500">ETA {assignment.etaLabel}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40" disabled={index === 0} onClick={() => onMoveAssignment(assignment.id, -1)} type="button">Back</button>
                          <button className="rounded-full bg-sky-200 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-40" disabled={index === bucketMeta.length - 1} onClick={() => onMoveAssignment(assignment.id, 1)} type="button">Advance</button>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.02] p-5 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">Zero state</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{queueFilter === "all" ? "This bucket is clear right now." : "The active queue filter leaves this bucket empty."}</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
