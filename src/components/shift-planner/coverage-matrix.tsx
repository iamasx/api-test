import type {
  PlannerCoverageRow,
  PlannerShiftId,
  PlannerShift,
  PlannerTeamMember,
} from "@/app/shift-planner/shift-planner-data";
import { plannerRoles } from "@/app/shift-planner/shift-planner-data";

type ShiftFilter = PlannerShiftId | "all";

type CoverageMatrixProps = {
  memberDirectory: Record<string, PlannerTeamMember>;
  rows: PlannerCoverageRow[];
  selectedDayLabel: string;
  selectedShiftId: ShiftFilter;
  shifts: readonly PlannerShift[];
};

const toneStyles = {
  ready: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  watch: "border-amber-300/30 bg-amber-300/10 text-amber-50",
  gap: "border-rose-400/30 bg-rose-400/10 text-rose-100",
} as const;

const roleDirectory = Object.fromEntries(
  plannerRoles.map((role) => [role.id, role]),
);

export function CoverageMatrix({
  memberDirectory,
  rows,
  selectedDayLabel,
  selectedShiftId,
  shifts,
}: CoverageMatrixProps) {
  if (rows.length === 0) {
    return (
      <section className="rounded-[1.9rem] border border-dashed border-white/15 bg-slate-950/50 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-slate-400">No coverage</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">No roles match the current scope.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Reset the role filter or switch to another day to reopen the matrix.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.9rem] border border-white/10 bg-slate-950/65 p-5 shadow-[0_20px_60px_rgba(2,8,23,0.28)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Coverage Matrix</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{selectedDayLabel}</h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-slate-300">
          Each block tracks the target headcount, assigned teammates, and readiness for the selected role and shift scope.
        </p>
      </div>
      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <article className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4" key={row.roleId}>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{roleDirectory[row.roleId]?.label ?? row.roleId}</h3>
                <p className="mt-1 text-sm text-slate-300">{row.note}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                {selectedShiftId === "all" ? "All shifts" : "Focused shift"}
              </p>
            </div>
            <div className={`mt-4 grid gap-3 ${shifts.length > 1 ? "lg:grid-cols-3" : ""}`}>
              {shifts.map((shift) => {
                const assignment = row.assignments.find(
                  (block) => block.shiftId === shift.id,
                );

                if (!assignment) return null;

                const delta = assignment.target - assignment.assigneeIds.length;
                const resolvedNames = assignment.assigneeIds.map(
                  (memberId) => memberDirectory[memberId]?.name ?? memberId,
                );
                const deltaLabel =
                  delta > 0
                    ? `${delta} open seat${delta > 1 ? "s" : ""}`
                    : delta < 0
                      ? `${Math.abs(delta)} flex cover`
                      : "Target met";

                return (
                  <div
                    className={`rounded-[1.35rem] border p-4 ${toneStyles[assignment.tone]}`}
                    key={shift.id}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{shift.label}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.22em] opacity-80">{shift.window}</p>
                      </div>
                      <span className="rounded-full border border-current/30 px-2.5 py-1 text-xs uppercase tracking-[0.18em]">
                        {assignment.tone}
                      </span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold">
                      {assignment.assigneeIds.length}/{assignment.target}
                    </p>
                    <p className="mt-1 text-sm opacity-90">{deltaLabel}</p>
                    <p className="mt-3 text-sm leading-6 opacity-90">{assignment.note}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {resolvedNames.length > 0 ? (
                        resolvedNames.map((name) => (
                          <span className="rounded-full bg-slate-950/25 px-2.5 py-1 text-xs font-medium text-white" key={name}>
                            {name}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-full bg-slate-950/25 px-2.5 py-1 text-xs font-medium text-white">
                          Unassigned
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
