import type {
  CrewMember,
  CrewRoleId,
  CrewTeam,
  DutyRotation,
  ReadinessState,
} from "@/app/crew-roster/mock-data";

const readinessChipClass = {
  ready: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  steady: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  recovery: "border-rose-300/25 bg-rose-300/10 text-rose-100",
} as const;

const rotationStateClass = {
  active: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  handoff: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  staged: "border-sky-300/25 bg-sky-300/10 text-sky-100",
} as const;
const roleLabel = { navigation: "Nav", systems: "Sys", medical: "Med", security: "Sec" } as const;

type CrewTeamCardProps = {
  members: CrewMember[];
  readinessStates: ReadinessState[];
  rotation: DutyRotation | null;
  selectedRoleId: CrewRoleId | "all";
  team: CrewTeam;
};

export function CrewTeamCard({
  members,
  readinessStates,
  rotation,
  selectedRoleId,
  team,
}: CrewTeamCardProps) {
  const visibleMembers = members.filter((member) => selectedRoleId === "all" || member.roleId === selectedRoleId);

  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(15,23,42,0.72))] p-5 shadow-xl shadow-slate-950/15">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/70">{team.watch}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{team.name}</h3>
          <p className="mt-1 text-sm text-slate-400">{team.bay} · {team.cadence}</p>
        </div>
        {rotation ? <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${rotationStateClass[rotation.state]}`}>{rotation.state}</span> : null}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{team.mission}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {team.tags.map((tag) => (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200" key={tag}>{tag}</span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {readinessStates.map((state) => {
          const count = visibleMembers.filter((member) => member.readinessId === state.id).length;
          if (count === 0) return null;
          return (
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${readinessChipClass[state.id]}`} key={state.id}>
              {count} {state.label}
            </span>
          );
        })}
      </div>
      <ul className="mt-5 space-y-3">
        {visibleMembers.map((member) => {
          const readiness = readinessStates.find((state) => state.id === member.readinessId);
          return (
            <li className="flex items-start justify-between gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3" key={member.id}>
              <div>
                <p className="font-medium text-white">{member.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{member.callsign} · {roleLabel[member.roleId]}</p>
                <p className="mt-2 text-sm text-slate-300">{member.note}</p>
              </div>
              <div className="text-right">
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${readinessChipClass[member.readinessId]}`}>{readiness?.label}</span>
                <p className="mt-2 text-xs text-slate-400">{member.specialty}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <span>Showing {visibleMembers.length} of {members.length} crew</span>
        <span>{rotation?.label ?? "Rotation pending"}</span>
      </div>
    </article>
  );
}
