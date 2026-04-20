import type {
  MissionOutcome,
  MissionPlan,
  MissionScenario,
  MissionScore,
  MissionStatus,
  MissionTeam,
} from "@/app/mission-briefing/mission-data";

export const scoreKeys = [
  "readiness",
  "tempo",
  "cover",
  "resilience",
] as const satisfies ReadonlyArray<keyof MissionScore>;

export type MissionTeamView = MissionTeam & {
  note: string;
};

export type MissionScenarioView = {
  scenario: MissionScenario;
  activePlan: MissionPlan | null;
  activeOutcome: MissionOutcome | null;
  adjustedTeams: MissionTeamView[];
  overallScore: number;
  readyCount: number;
  watchCount: number;
  blockedCount: number;
};

const statusOrder: MissionStatus[] = ["ready", "watch", "blocked"];

function clampConfidence(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getAdjustedTeam(
  team: MissionTeam,
  activePlan: MissionPlan | null,
): MissionTeamView {
  const adjustment = activePlan?.teamAdjustments[team.id];

  return {
    ...team,
    readiness: adjustment?.readiness ?? team.readiness,
    confidence: clampConfidence(team.confidence + (adjustment?.confidenceDelta ?? 0)),
    focus: adjustment?.focus ?? team.focus,
    note: adjustment?.note ?? "No plan-specific readiness adjustment.",
  };
}

export function getScoreAverage(score: MissionScore) {
  return Math.round(
    scoreKeys.reduce((sum, key) => sum + score[key], 0) / scoreKeys.length,
  );
}

export function createDefaultPlanSelections(scenarios: MissionScenario[]) {
  return Object.fromEntries(
    scenarios.map((scenario) => [scenario.id, scenario.plans[0]?.id ?? ""]),
  ) as Record<string, string>;
}

export function createDefaultOutcomeSelections(scenarios: MissionScenario[]) {
  return Object.fromEntries(
    scenarios.map((scenario) => [
      scenario.id,
      scenario.plans[0]?.outcomes[0]?.id ?? "",
    ]),
  ) as Record<string, string>;
}

export function getPlanStorageKey(scenarioId: string, planId: string) {
  return `${scenarioId}:${planId}`;
}

export function getScenarioSearchText(scenario: MissionScenario) {
  return [
    scenario.callsign,
    scenario.lead,
    scenario.theater,
    scenario.summary,
    scenario.alert,
    ...scenario.blockers.map((blocker) => blocker.label),
    ...scenario.plans.flatMap((plan) => [
      plan.label,
      plan.posture,
      plan.summary,
      ...plan.assumptions,
      ...plan.outcomes.map((outcome) => outcome.label),
    ]),
  ]
    .join(" ")
    .toLowerCase();
}

export function resolveScenarioView(
  scenario: MissionScenario,
  selectedPlanId?: string,
  selectedOutcomeId?: string,
): MissionScenarioView {
  const activePlan =
    scenario.plans.find((plan) => plan.id === selectedPlanId) ??
    scenario.plans[0] ??
    null;
  const activeOutcome =
    activePlan?.outcomes.find((outcome) => outcome.id === selectedOutcomeId) ??
    activePlan?.outcomes[0] ??
    null;
  const adjustedTeams = scenario.readiness
    .map((team) => getAdjustedTeam(team, activePlan))
    .sort(
      (left, right) =>
        statusOrder.indexOf(left.readiness) - statusOrder.indexOf(right.readiness),
    );
  const readyCount = adjustedTeams.filter((team) => team.readiness === "ready").length;
  const watchCount = adjustedTeams.filter((team) => team.readiness === "watch").length;
  const blockedCount = adjustedTeams.filter(
    (team) => team.readiness === "blocked",
  ).length;

  return {
    scenario,
    activePlan,
    activeOutcome,
    adjustedTeams,
    overallScore: getScoreAverage(activeOutcome?.score ?? activePlan?.scorecard ?? {
      readiness: 0,
      tempo: 0,
      cover: 0,
      resilience: 0,
    }),
    readyCount,
    watchCount,
    blockedCount,
  };
}
