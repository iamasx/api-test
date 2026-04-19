import type {
  CrewMember,
  CrewRoleId,
  CrewTeam,
  DutyRotation,
} from "@/app/crew-roster/mock-data";

const rotationStateClass = {
  active: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  handoff: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  staged: "border-sky-300/25 bg-sky-300/10 text-sky-100",
} as const;
const roleLabel = { navigation: "navigation", systems: "systems", medical: "medical", security: "security" } as const;

type DutyRotationPanelProps = {
  members: CrewMember[]; onClearSelection: () => void; onSelectRotation: (rotationId: string) => void;
  rotations: DutyRotation[]; selectedRoleId: CrewRoleId | "all"; selectedRotationId: string | null; teams: CrewTeam[];
};

export function DutyRotationPanel({
  members, onClearSelection, onSelectRotation, rotations, selectedRoleId, selectedRotationId, teams,
}: DutyRotationPanelProps) {
  const scopeLabel = selectedRoleId === "all" ? "all roles" : roleLabel[selectedRoleId];
  const selectedRotation = rotations.find((rotation) => rotation.id === selectedRotationId) ?? null;
  const selectedTeam = teams.find((team) => team.id === selectedRotation?.teamId) ?? null;
  const selectedCrew = selectedRotation
    ? members.filter((member) => member.teamId === selectedRotation.teamId && (selectedRoleId === "all" || member.roleId === selectedRoleId))
    : [];

  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 shadow-xl shadow-slate-950/15 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/70">Duty Rotation</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Highlight the next handoff lane.</h2>
        </div>
        <button className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/5" onClick={onClearSelection} type="button">Clear</button>
      </div>
      <div className="mt-5 space-y-3">
        {rotations.map((rotation) => {
          const team = teams.find((entry) => entry.id === rotation.teamId);
          const matchingCrew = members.filter((member) => member.teamId === rotation.teamId && (selectedRoleId === "all" || member.roleId === selectedRoleId));

          return (
            <button className={`w-full rounded-[1.5rem] border p-4 text-left transition ${selectedRotationId === rotation.id ? "border-amber-300/40 bg-amber-200/10 shadow-lg shadow-amber-950/10" : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"}`} key={rotation.id} onClick={() => onSelectRotation(rotation.id)} type="button">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{rotation.label}</p>
                  <p className="mt-1 text-sm text-slate-400">{team?.name} · {rotation.window}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${rotationStateClass[rotation.state]}`}>{rotation.state}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{matchingCrew.length} crew visible for {scopeLabel}.</p>
            </button>
          );
        })}
      </div>
      {selectedRotation && selectedTeam ? (
        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(56,189,248,0.12),rgba(15,23,42,0.4))] p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-200">{selectedTeam.name}</span>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${rotationStateClass[selectedRotation.state]}`}>{selectedRotation.state}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{selectedRotation.objective}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Handoff note: {selectedRotation.handoff}</p>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Crew on this lane</p>
            {selectedCrew.length > 0 ? (
              <ul className="mt-3 space-y-3">
                {selectedCrew.map((member) => (
                  <li className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3" key={member.id}>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">{member.callsign} · {roleLabel[member.roleId]}</p>
                    <p className="mt-2 text-sm text-slate-300">{member.specialty}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-2xl border border-dashed border-white/15 bg-white/4 px-4 py-5 text-sm leading-6 text-slate-300">
                {selectedRoleId === "all" ? "No crew are assigned to this rotation right now." : `No ${scopeLabel} crew are assigned to this rotation right now.`} Clear the filter to restore the full lane.
              </p>
            )}
          </div>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Handoff checkpoints</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {selectedRotation.notes.map((note) => <li className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3" key={note}>{note}</li>)}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/15 bg-white/4 px-5 py-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">No lane selected</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Choose a rotation card to inspect the crew handoff.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Deselecting returns this empty state so the panel can stay local to the route without forcing a shared default focus.</p>
        </div>
      )}
    </aside>
  );
}
