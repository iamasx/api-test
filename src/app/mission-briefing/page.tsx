import { MissionBriefingShell } from "@/components/mission-briefing/MissionBriefingShell";

import { missionScenarios } from "./mission-data";

export default function MissionBriefingPage() {
  return <MissionBriefingShell scenarios={missionScenarios} />;
}
