import type {
  CrewMember,
  CrewRoleId,
  CrewTeam,
  DutyRotation,
  ReadinessState,
} from "@/app/crew-roster/mock-data";
import { CrewTeamCard } from "./crew-team-card";

type CrewTeamCardGridProps = {
  members: CrewMember[]; readinessStates: ReadinessState[]; rotations: DutyRotation[];
  selectedRoleId: CrewRoleId | "all"; teams: CrewTeam[];
};

export function CrewTeamCardGrid({
  members, readinessStates, rotations, selectedRoleId, teams,
}: CrewTeamCardGridProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {teams.map((team) => (
        <CrewTeamCard
          key={team.id}
          members={members.filter((member) => member.teamId === team.id)}
          readinessStates={readinessStates}
          rotation={rotations.find((rotation) => rotation.teamId === team.id) ?? null}
          selectedRoleId={selectedRoleId}
          team={team}
        />
      ))}
    </section>
  );
}
