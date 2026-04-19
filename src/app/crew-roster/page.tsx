import type { Metadata } from "next";
import {
  crewMembers,
  crewRoles,
  crewTeams,
  dutyRotations,
  readinessStates,
  rosterSummary,
} from "./mock-data";
import { CrewRosterShell } from "@/components/crew-roster/crew-roster-shell";

export const metadata: Metadata = {
  title: "Crew Roster | API Test",
  description: "Mock crew roster with role filters, team cards, readiness indicators, and duty rotation details.",
};

export default function CrewRosterPage() {
  return <CrewRosterShell members={crewMembers} readinessStates={readinessStates} roles={crewRoles} rotations={dutyRotations} summary={rosterSummary} teams={crewTeams} />;
}
