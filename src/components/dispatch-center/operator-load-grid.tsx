import type { DispatchAssignment, OperatorRecord } from "@/app/dispatch-center/mock-data";

type OperatorLoadGridProps = { assignments: DispatchAssignment[]; onSelectOperator: (operatorId: string) => void; operators: OperatorRecord[]; selectedOperatorId: string | null };

export function OperatorLoadGrid({ assignments, onSelectOperator, operators, selectedOperatorId }: OperatorLoadGridProps) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.9),rgba(2,6,23,0.96))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.34)] sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Operator load</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Capacity view by active dispatcher</h2>
        </div>
        <p className="text-sm text-slate-400">Select a card to spotlight that operator on the board.</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {operators.map((operator) => {
          const operatorAssignments = assignments.filter((assignment) => assignment.operatorId === operator.id);
          const utilization = Math.round((operatorAssignments.length / operator.capacity) * 100);
          const readyCount = operatorAssignments.filter((assignment) => assignment.bucketId === "dispatch").length;
          const holdCount = operatorAssignments.filter((assignment) => assignment.bucketId === "hold").length;
          const isSelected = selectedOperatorId === operator.id;

          return (
            <button className={`rounded-[1.75rem] border p-5 text-left transition hover:-translate-y-0.5 ${isSelected ? "border-sky-300/25 bg-sky-300/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`} key={operator.id} onClick={() => onSelectOperator(operator.id)} type="button">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{operator.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{operator.focus}</p>
                </div>
                <span className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">{operator.shift}</span>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-semibold text-white">{operatorAssignments.length}</p>
                  <p className="mt-1 text-sm text-slate-400">Assigned against {operator.capacity} slots</p>
                </div>
                <div className="text-right text-sm text-slate-300">
                  <p>{readyCount} ready</p>
                  <p>{holdCount} on hold</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[linear-gradient(90deg,#38bdf8,#f59e0b)]" style={{ width: `${Math.min(utilization, 100)}%` }} />
              </div>
              <p className="mt-3 text-sm text-slate-400">{utilization}% utilized</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
