import type {
  PlannerRole,
  PlannerRoleId,
  PlannerShift,
  PlannerShiftId,
} from "@/app/shift-planner/shift-planner-data";

type RoleFilter = PlannerRoleId | "all";
type ShiftFilter = PlannerShiftId | "all";

type ShiftPlannerFiltersProps = {
  blockCount: number;
  hasActiveFilters: boolean;
  onClear: () => void;
  onRoleChange: (roleId: RoleFilter) => void;
  onShiftChange: (shiftId: ShiftFilter) => void;
  roleCount: number;
  roles: readonly PlannerRole[];
  selectedRoleId: RoleFilter;
  selectedShiftId: ShiftFilter;
  shifts: readonly PlannerShift[];
};

function filterButton(active: boolean) {
  return `rounded-full border px-3 py-2 text-sm font-medium transition ${
    active
      ? "border-sky-300 bg-sky-400/15 text-white"
      : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-sky-300/30 hover:text-white"
  }`;
}

export function ShiftPlannerFilters({
  blockCount,
  hasActiveFilters,
  onClear,
  onRoleChange,
  onShiftChange,
  roleCount,
  roles,
  selectedRoleId,
  selectedShiftId,
  shifts,
}: ShiftPlannerFiltersProps) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_18px_50px_rgba(2,8,23,0.3)] backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Filters</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Role and shift scope</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Narrow the matrix to a single desk or shift without leaving the day view.
          </p>
        </div>
        <button
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-sky-300/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
          disabled={!hasActiveFilters}
          onClick={onClear}
          type="button"
        >
          Reset filters
        </button>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Role</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className={filterButton(selectedRoleId === "all")} onClick={() => onRoleChange("all")} type="button">All roles</button>
            {roles.map((role) => (
              <button className={filterButton(selectedRoleId === role.id)} key={role.id} onClick={() => onRoleChange(role.id)} type="button">
                {role.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Shift</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className={filterButton(selectedShiftId === "all")} onClick={() => onShiftChange("all")} type="button">All shifts</button>
            {shifts.map((shift) => (
              <button className={filterButton(selectedShiftId === shift.id)} key={shift.id} onClick={() => onShiftChange(shift.id)} type="button">
                {shift.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-300">
        {roleCount} roles and {blockCount} coverage blocks visible in the current view.
      </p>
    </section>
  );
}
