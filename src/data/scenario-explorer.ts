export type ScenarioId =
  | "launch-sprint"
  | "phased-rollout"
  | "reliability-hardening";

export type ScenarioScoreKey =
  | "deliverySpeed"
  | "operationalCertainty"
  | "adaptability"
  | "costDiscipline";

export type ScenarioRecord = {
  id: ScenarioId;
  name: string;
  tagline: string;
  summary: string;
  deliveryWindow: string;
  budgetBand: string;
  ownershipModel: string;
  bestFit: string;
  watchout: string;
  focusAreas: string[];
  scores: Record<ScenarioScoreKey, number>;
  theme: {
    accent: string;
    surface: string;
    border: string;
    glow: string;
  };
};

export type ComparisonRow = {
  label: string;
  note: string;
  values: Record<ScenarioId, string>;
};

export type ComparisonSection = {
  id: string;
  title: string;
  description: string;
  rows: ComparisonRow[];
};

export type OverviewStat = {
  label: string;
  value: string;
  detail: string;
};

export type RankedScenario = ScenarioRecord & {
  weightedScore: number;
};

export const scoreLabels = [
  { key: "deliverySpeed", label: "Delivery speed" },
  { key: "operationalCertainty", label: "Operational certainty" },
  { key: "adaptability", label: "Adaptability" },
  { key: "costDiscipline", label: "Cost discipline" },
] as const satisfies ReadonlyArray<{
  key: ScenarioScoreKey;
  label: string;
}>;

export const overviewStats: OverviewStat[] = [
  {
    label: "Decision window",
    value: "6 weeks",
    detail: "Enough time to compare rollout motions before the next partner intake.",
  },
  {
    label: "Scenario count",
    value: "3 paths",
    detail: "A fast path, a balanced path, and a resilience-first path.",
  },
  {
    label: "Primary lens",
    value: "Launch readiness",
    detail: "The recommendation weights speed, certainty, adaptability, and cost.",
  },
];

export const scenarios: ScenarioRecord[] = [
  {
    id: "launch-sprint",
    name: "Launch Sprint",
    tagline: "Fastest route to market",
    summary:
      "A narrow release path aimed at learning from live traffic quickly with a lighter governance layer.",
    deliveryWindow: "3 to 5 weeks",
    budgetBand: "Low to medium",
    ownershipModel: "Single delivery pod",
    bestFit: "Best when leadership needs fast signal from one launch cohort.",
    watchout:
      "Operational certainty drops quickly if the first release needs broad partner support or strict SLA guarantees.",
    focusAreas: [
      "Keep scope to one customer segment with one critical workflow.",
      "Use feature flags to protect unfinished branches behind runtime controls.",
      "Pair launch metrics with a weekly rollback checkpoint.",
    ],
    scores: {
      deliverySpeed: 92,
      operationalCertainty: 54,
      adaptability: 70,
      costDiscipline: 63,
    },
    theme: {
      accent: "#c2410c",
      surface: "rgba(255, 237, 213, 0.82)",
      border: "rgba(194, 65, 12, 0.26)",
      glow: "rgba(194, 65, 12, 0.28)",
    },
  },
  {
    id: "phased-rollout",
    name: "Phased Rollout",
    tagline: "Balanced delivery with controllable risk",
    summary:
      "A staged expansion plan that keeps launch momentum while preserving room for reliability hardening between waves.",
    deliveryWindow: "6 to 8 weeks",
    budgetBand: "Medium",
    ownershipModel: "Delivery pod plus platform partner",
    bestFit:
      "Best when the team needs a credible launch while still protecting downstream support capacity.",
    watchout:
      "This path needs firm entry and exit criteria for each wave or it can quietly expand into a long-running program.",
    focusAreas: [
      "Cap the first wave to two customer cohorts and a narrow SLA tier.",
      "Use comparison checkpoints after each wave to confirm expansion criteria.",
      "Reserve a platform sprint for instrumentation and incident rehearsal.",
    ],
    scores: {
      deliverySpeed: 78,
      operationalCertainty: 86,
      adaptability: 82,
      costDiscipline: 76,
    },
    theme: {
      accent: "#0f766e",
      surface: "rgba(204, 251, 241, 0.82)",
      border: "rgba(15, 118, 110, 0.26)",
      glow: "rgba(15, 118, 110, 0.26)",
    },
  },
  {
    id: "reliability-hardening",
    name: "Reliability Hardening",
    tagline: "Foundation first before broad exposure",
    summary:
      "A resilience-first track focused on observability, failure isolation, and operational readiness ahead of scale.",
    deliveryWindow: "8 to 10 weeks",
    budgetBand: "Medium to high",
    ownershipModel: "Platform-led program",
    bestFit:
      "Best when contractual uptime, high partner concurrency, or migration complexity dominates the decision.",
    watchout:
      "The delay can weaken stakeholder momentum if there is no intermediate customer-visible milestone.",
    focusAreas: [
      "Prioritize error budget controls and queue back-pressure before traffic expansion.",
      "Validate migration rollback paths with production-like data snapshots.",
      "Publish a support playbook before the first partner onboarding window.",
    ],
    scores: {
      deliverySpeed: 52,
      operationalCertainty: 94,
      adaptability: 60,
      costDiscipline: 58,
    },
    theme: {
      accent: "#334155",
      surface: "rgba(226, 232, 240, 0.9)",
      border: "rgba(51, 65, 85, 0.24)",
      glow: "rgba(51, 65, 85, 0.24)",
    },
  },
];

export const comparisonSections: ComparisonSection[] = [
  {
    id: "delivery-posture",
    title: "Delivery posture",
    description:
      "How each path behaves when the goal is to get meaningful adoption data without losing control of the release.",
    rows: [
      {
        label: "Release motion",
        note: "The practical shape of each option once work starts.",
        values: {
          "launch-sprint":
            "Single release train with tight scope control and a bias toward live experimentation.",
          "phased-rollout":
            "Wave-based launch with explicit hold points between rollout stages.",
          "reliability-hardening":
            "Infrastructure and support readiness milestones before customer-facing release.",
        },
      },
      {
        label: "Primary milestone",
        note: "The moment each scenario considers the first iteration successful.",
        values: {
          "launch-sprint":
            "One pilot customer completes the critical workflow in production.",
          "phased-rollout":
            "Two cohorts graduate through the first wave with stable support load.",
          "reliability-hardening":
            "Service-level rehearsal and rollback drills pass before expansion.",
        },
      },
      {
        label: "Stakeholder rhythm",
        note: "The review cadence needed to keep the path healthy.",
        values: {
          "launch-sprint":
            "Twice-weekly launch room reviews with rapid scope cuts when signal is weak.",
          "phased-rollout":
            "Weekly readiness review with checkpoints after each cohort wave.",
          "reliability-hardening":
            "Program review tied to platform readiness and incident game-day output.",
        },
      },
    ],
  },
  {
    id: "operating-signal",
    title: "Operating signal",
    description:
      "The indicators that become visible once traffic starts flowing through the route and support processes.",
    rows: [
      {
        label: "Traffic shape",
        note: "What the production ramp looks like when the release goes live.",
        values: {
          "launch-sprint":
            "Sharp initial ramp from a single cohort, with limited redundancy if demand spikes.",
          "phased-rollout":
            "Measured capacity growth that can be paused between waves without stopping the program.",
          "reliability-hardening":
            "Traffic stays low until guardrails are in place, then ramps with stronger protections.",
        },
      },
      {
        label: "Change cost",
        note: "How painful it is to adjust direction after the first release signal lands.",
        values: {
          "launch-sprint":
            "Low cost to redirect product scope, but medium cost if support debt appears.",
          "phased-rollout":
            "Moderate cost because expansion criteria can be reset at each wave boundary.",
          "reliability-hardening":
            "Higher cost because deep platform work is hard to unwind once underway.",
        },
      },
      {
        label: "Reliability threshold",
        note: "The minimum operational bar the scenario assumes.",
        values: {
          "launch-sprint":
            "A monitored pilot with known gaps and an agreed support safety net.",
          "phased-rollout":
            "Stable baseline SLAs, visible telemetry, and clear throttling controls.",
          "reliability-hardening":
            "Strong incident response, rollback confidence, and mature observability.",
        },
      },
    ],
  },
  {
    id: "intervention-triggers",
    title: "Intervention triggers",
    description:
      "Signals that tell the team to switch paths, pause the rollout, or invest in a different operating model.",
    rows: [
      {
        label: "Switch if",
        note: "The condition that makes a different scenario more suitable.",
        values: {
          "launch-sprint":
            "Move away from this option if partner onboarding expands faster than one pod can support.",
          "phased-rollout":
            "Escalate to reliability hardening if every wave uncovers the same platform bottleneck.",
          "reliability-hardening":
            "Downshift to phased rollout if platform risk stabilizes and launch urgency rises.",
        },
      },
      {
        label: "Skip if",
        note: "The red flag that should remove the option from consideration early.",
        values: {
          "launch-sprint":
            "Skip when contractual commitments demand predictable uptime from day one.",
          "phased-rollout":
            "Skip when leadership only values immediate market entry or full-scale certainty.",
          "reliability-hardening":
            "Skip when there is no budget or patience for non-visible foundational work.",
        },
      },
      {
        label: "Data needed",
        note: "The extra evidence that tightens confidence in the recommendation.",
        values: {
          "launch-sprint":
            "Pilot conversion rates, support desk load, and rollback rehearsal timing.",
          "phased-rollout":
            "Wave exit criteria, cohort adoption quality, and support utilization by tier.",
          "reliability-hardening":
            "Incident rehearsal output, failure-domain mapping, and migration rollback timing.",
        },
      },
    ],
  },
];

const priorityWeights: Record<ScenarioScoreKey, number> = {
  deliverySpeed: 0.25,
  operationalCertainty: 0.3,
  adaptability: 0.2,
  costDiscipline: 0.25,
};

function calculateWeightedScore(scores: Record<ScenarioScoreKey, number>) {
  return Math.round(
    Object.entries(priorityWeights).reduce((total, [metric, weight]) => {
      const key = metric as ScenarioScoreKey;

      return total + scores[key] * weight;
    }, 0),
  );
}

export const rankedScenarios: RankedScenario[] = [...scenarios]
  .map((scenario) => ({
    ...scenario,
    weightedScore: calculateWeightedScore(scenario.scores),
  }))
  .sort((left, right) => right.weightedScore - left.weightedScore);

export const recommendedScenario = rankedScenarios[0];
export const alternativeScenarios = rankedScenarios.slice(1);

export const recommendationCopy = {
  title: "Recommended operating mode",
  summary: `${recommendedScenario.name} leads because it keeps momentum high without sacrificing the controls needed to expand responsibly.`,
  rationale: [
    "It is the strongest blend of speed, certainty, and adaptability across the comparison set.",
    "The wave structure creates natural checkpoints for support load, incident response, and customer adoption quality.",
    "It still leaves room to move either faster or more cautiously as new evidence arrives.",
  ],
  guardrails: [
    "Keep every wave tied to explicit exit criteria instead of date-based optimism.",
    "Do not expand the next cohort until instrumentation and on-call ownership are clear.",
    "Treat repeated platform bottlenecks as a signal to pivot into reliability hardening.",
  ],
  nextSteps: [
    "Lock the first two cohorts and define the success threshold for each wave.",
    "Book a rehearsal for throttling, rollback, and incident escalation before the first release.",
    "Publish a one-page decision log so stakeholders can see why the recommendation stands.",
  ],
};
