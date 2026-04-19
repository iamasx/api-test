import type { CrewRole, CrewRoleId } from "@/app/crew-roster/mock-data";

type RoleFilterBarProps = {
  onSelectRole: (roleId: CrewRoleId | "all") => void; roles: CrewRole[]; roleCounts: Record<CrewRoleId, number>;
  selectedRoleId: CrewRoleId | "all"; totalCrewCount: number; visibleCrewCount: number; visibleTeamsCount: number;
};

export function RoleFilterBar({
  onSelectRole, roles, roleCounts, selectedRoleId, totalCrewCount, visibleCrewCount, visibleTeamsCount,
}: RoleFilterBarProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-4 shadow-xl shadow-slate-950/15 backdrop-blur sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/70">Role Filters</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Spotlight a specialty without leaving the roster board.</h2>
        </div>
        <p className="text-sm text-slate-300">Showing {visibleCrewCount} crew across {visibleTeamsCount} visible teams.</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedRoleId === "all" ? "bg-amber-300 text-slate-950" : "border border-white/10 bg-white/5 text-slate-200 hover:border-amber-200/30 hover:bg-white/10"}`} onClick={() => onSelectRole("all")} type="button">
          All roles
          <span className="ml-2 text-xs opacity-70">{totalCrewCount}</span>
        </button>
        {roles.map((role) => (
          <button className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedRoleId === role.id ? "bg-sky-300 text-slate-950" : "border border-white/10 bg-white/5 text-slate-200 hover:border-sky-200/30 hover:bg-white/10"}`} key={role.id} onClick={() => onSelectRole(role.id)} type="button">
            {role.label}
            <span className="ml-2 text-xs opacity-70">{roleCounts[role.id]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
