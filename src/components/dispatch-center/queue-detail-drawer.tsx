import type { DispatchAssignment, OperatorRecord, QueueDefinition, QueueId } from "@/app/dispatch-center/mock-data";

type QueueDetailDrawerProps = {
  assignments: DispatchAssignment[]; onClearSelection: () => void; onSelectAssignment: (assignmentId: string) => void;
  operators: OperatorRecord[]; queues: QueueDefinition[]; selectedAssignmentId: string | null; selectedOperatorId: string | null; selectedQueueId: QueueId | null;
};

export function QueueDetailDrawer({
  assignments, onClearSelection, onSelectAssignment, operators, queues, selectedAssignmentId, selectedOperatorId, selectedQueueId,
}: QueueDetailDrawerProps) {
  const selectedQueue = queues.find((queue) => queue.id === selectedQueueId) ?? null;
  const queueAssignments = selectedQueue ? assignments.filter((assignment) => assignment.queueId === selectedQueue.id) : [];
  const queueOperators = operators.filter((operator) => queueAssignments.some((assignment) => assignment.operatorId === operator.id));
  const nextUp = [...queueAssignments].sort((left, right) => right.ageMinutes - left.ageMinutes).slice(0, 3);

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.42)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Queue detail</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{selectedQueue ? selectedQueue.label : "No queue selected"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{selectedQueue ? selectedQueue.detail : "Use a queue card in the header or any assignment card on the board to open a local detail drawer."}</p>
        </div>
        {selectedQueue ? <button className="rounded-full border border-white/12 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10" onClick={onClearSelection} type="button">Close</button> : null}
      </div>

      {!selectedQueue ? (
        <div className="mt-6 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Waiting on selection</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">The drawer stays empty until you choose a queue, which gives the route an explicit deselected state.</p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Queue load</p>
              <p className="mt-2 text-3xl font-semibold text-white">{queueAssignments.length}</p>
              <p className="mt-1 text-sm text-slate-400">{selectedQueue.serviceTarget}</p>
            </div>
            <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-4">
              <p className="text-sm text-sky-100/80">Ready now</p>
              <p className="mt-2 text-3xl font-semibold text-sky-50">{queueAssignments.filter((assignment) => assignment.bucketId === "dispatch").length}</p>
              <p className="mt-1 text-sm text-sky-100/80">{selectedQueue.windowLabel} window</p>
            </div>
            <div className="rounded-3xl border border-rose-300/20 bg-rose-300/10 p-4">
              <p className="text-sm text-rose-100/80">Blocked</p>
              <p className="mt-2 text-3xl font-semibold text-rose-50">{queueAssignments.filter((assignment) => assignment.bucketId === "hold").length}</p>
              <p className="mt-1 text-sm text-rose-100/80">Needs local review</p>
            </div>
          </div>

          <section className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <div>
              <p className="text-lg font-semibold text-white">Next to move</p>
              <p className="mt-1 text-sm text-slate-400">Oldest queue items surfaced for quick review.</p>
            </div>
            <div className="mt-4 space-y-3">
              {nextUp.map((assignment) => (
                <button className={`w-full rounded-[1.5rem] border p-4 text-left transition ${selectedAssignmentId === assignment.id ? "border-sky-300/25 bg-sky-300/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`} key={assignment.id} onClick={() => onSelectAssignment(assignment.id)} type="button">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{assignment.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{assignment.location}</p>
                    </div>
                    <span className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">{assignment.ageMinutes} min</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{assignment.note}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
            <p className="text-lg font-semibold text-white">Staffed by</p>
            <div className="mt-4 space-y-3">
              {queueOperators.map((operator) => (
                <div className={`rounded-[1.5rem] border p-4 ${selectedOperatorId === operator.id ? "border-sky-300/25 bg-sky-300/10" : "border-white/10 bg-white/5"}`} key={operator.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">{operator.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{operator.focus}</p>
                    </div>
                    <span className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">{operator.shift}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </aside>
  );
}
