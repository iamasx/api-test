"use client";

import { startTransition, useState } from "react";
import type {
  CrewMember,
  CrewRole,
  CrewRoleId,
  CrewTeam,
  DutyRotation,
  ReadinessState,
} from "@/app/crew-roster/mock-data";
import { CrewRosterHeader } from "./crew-roster-header";
import { CrewTeamCardGrid } from "./crew-team-card-grid";
import { DutyRotationPanel } from "./duty-rotation-panel";
import { RoleFilterBar } from "./role-filter-bar";

type CrewRosterShellProps = {
  members: CrewMember[]; readinessStates: ReadinessState[]; roles: CrewRole[]; rotations: DutyRotation[];
  summary: { activeRotationId: string; cycleLabel: string; handoffAt: string; readinessNote: string };
  teams: CrewTeam[];
};

function teamMatchesRole(teamId: string, members: CrewMember[], selectedRoleId: CrewRoleId | "all") {
  return selectedRoleId === "all" || members.some((member) => member.teamId === teamId && member.roleId === selectedRoleId);
}

export function CrewRosterShell({
  members, readinessStates, roles, rotations, summary, teams,
}: CrewRosterShellProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<CrewRoleId | "all">("all");
  const [selectedRotationId, setSelectedRotationId] = useState<string | null>(null);
  const roleCounts: Record<CrewRoleId, number> = { navigation: 0, systems: 0, medical: 0, security: 0 };
  for (const member of members) roleCounts[member.roleId] += 1;
  const visibleTeams = teams.filter((team) => teamMatchesRole(team.id, members, selectedRoleId));
  const visibleTeamIds = new Set(visibleTeams.map((team) => team.id));
  const visibleRotations = rotations.filter((rotation) => visibleTeamIds.has(rotation.teamId));
  const activeRotation = rotations.find((rotation) => rotation.id === summary.activeRotationId) ?? rotations[0];
  const selectedRoleLabel = selectedRoleId === "all" ? "All roles" : (roles.find((role) => role.id === selectedRoleId)?.label ?? "All roles");
  const readyCount = members.filter((member) => member.readinessId === "ready").length;
  const visibleCrewCount = members.filter((member) => selectedRoleId === "all" || member.roleId === selectedRoleId).length;

  const handleRoleSelect = (nextRoleId: CrewRoleId | "all") => {
    const nextVisibleTeamIds = new Set(teams.filter((team) => teamMatchesRole(team.id, members, nextRoleId)).map((team) => team.id));
    startTransition(() => {
      setSelectedRoleId(nextRoleId);
      if (selectedRotationId && !rotations.some((rotation) => rotation.id === selectedRotationId && nextVisibleTeamIds.has(rotation.teamId))) {
        setSelectedRotationId(null);
      }
    });
  };

  const handleRotationSelect = (rotationId: string) => startTransition(() => setSelectedRotationId((current) => (current === rotationId ? null : rotationId)));

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_28%),linear-gradient(180deg,#09090b_0%,#0f172a_46%,#111827_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <CrewRosterHeader activeRotationLabel={activeRotation?.label ?? "No active lane"} cycleLabel={summary.cycleLabel} handoffAt={summary.handoffAt} readinessNote={summary.readinessNote} readyCount={readyCount} selectedRoleLabel={selectedRoleLabel} totalCrew={members.length} totalTeams={teams.length} visibleCrewCount={visibleCrewCount} visibleTeamsCount={visibleTeams.length} />
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.92fr)]">
          <div className="space-y-5">
            <RoleFilterBar onSelectRole={handleRoleSelect} roles={roles} roleCounts={roleCounts} selectedRoleId={selectedRoleId} totalCrewCount={members.length} visibleCrewCount={visibleCrewCount} visibleTeamsCount={visibleTeams.length} />
            <CrewTeamCardGrid members={members} readinessStates={readinessStates} rotations={visibleRotations} selectedRoleId={selectedRoleId} teams={visibleTeams} />
          </div>
          <DutyRotationPanel members={members} onClearSelection={() => setSelectedRotationId(null)} onSelectRotation={handleRotationSelect} rotations={visibleRotations} selectedRoleId={selectedRoleId} selectedRotationId={selectedRotationId} teams={teams} />
        </section>
      </div>
    </main>
  );
}
