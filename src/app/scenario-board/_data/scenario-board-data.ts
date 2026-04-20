export type ScenarioBoardScenarioId =
  | "hybrid-buffer"
  | "airbridge-burst"
  | "sealift-stretch";

export type ScenarioCardTone = "recommended" | "watch" | "fallback";

export type ScenarioOutcomeTone = "strong" | "balanced" | "fragile";

export type ScenarioBoardScenario = {
  id: ScenarioBoardScenarioId;
  label: string;
  title: string;
  summary: string;
  objective: string;
  window: string;
  lead: string;
  support: string;
  pressurePoint: string;
  signal: string;
  tone: ScenarioCardTone;
  measures: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
  checkpoints: string[];
};

export type ScenarioDecisionPrompt = {
  id: string;
  title: string;
  question: string;
  framing: string;
  owner: string;
  reviewWindow: string;
  options: Array<{
    label: string;
    impact: string;
    risk: string;
  }>;
};

export type ScenarioOutcomeMatrixRow = {
  id: string;
  criterion: string;
  whyItMatters: string;
  outcomes: Record<
    ScenarioBoardScenarioId,
    {
      label: string;
      detail: string;
      tone: ScenarioOutcomeTone;
    }
  >;
};

export const scenarioBoardSummary = {
  eyebrow: "Scenario Board",
  title: "Pressure-test the next move before the window closes.",
  description:
    "This planning surface keeps scenario options, decision prompts, and outcome comparisons in one route so operators can decide with trade-offs visible instead of scattered across notes.",
  stats: [
    {
      label: "Scenario lanes",
      value: "3",
      detail: "Each lane frames a distinct posture for timing, spend, and resilience.",
    },
    {
      label: "Decision prompts",
      value: "3",
      detail: "Prompts are tuned for the next planning review rather than post-facto analysis.",
    },
    {
      label: "Outcome checks",
      value: "5",
      detail: "The comparison matrix surfaces where every option helps or hurts the operating plan.",
    },
  ],
  boardNotes: [
    "Treat the matrix as a planning aid, not an approval memo. It exists to sharpen the discussion.",
    "When the demand signal changes, update the outcome row detail before rewriting the whole card set.",
    "Use the recommended lane as the baseline and keep one faster and one cheaper fallback on the page.",
  ],
};

export const scenarioBoardScenarios: ScenarioBoardScenario[] = [
  {
    id: "hybrid-buffer",
    label: "Recommended",
    title: "Hybrid Buffer Route",
    summary:
      "Split the release across a near-term air tranche and a scheduled ground buffer so the team protects speed without burning the full expedite budget.",
    objective:
      "Preserve service confidence while keeping enough slack in the system to absorb a second wave of requests tomorrow.",
    window: "Activate within 18 hours",
    lead: "Regional operations lead",
    support: "Carrier desk + inventory planner",
    pressurePoint:
      "Needs supplier release confirmation before the late pickup cutoff to keep both tranches aligned.",
    signal:
      "Strongest balance of activation speed, margin protection, and fallback coverage if demand changes mid-cycle.",
    tone: "recommended",
    measures: [
      {
        label: "ETA confidence",
        value: "88%",
        detail: "Uses two delivery rails with a shared handoff plan.",
      },
      {
        label: "Budget posture",
        value: "+8%",
        detail: "Higher than baseline, but below full expedite spend.",
      },
      {
        label: "Fallback depth",
        value: "High",
        detail: "Ground tranche can absorb late order changes with minimal rework.",
      },
    ],
    checkpoints: [
      "Lock the split quantity before supplier dock release at 18:00 local.",
      "Reserve one dedicated handoff window for the air tranche to avoid dock queue bleed.",
      "Publish a customer-facing contingency note before the planning review closes.",
    ],
  },
  {
    id: "airbridge-burst",
    label: "Fastest path",
    title: "Airbridge Burst",
    summary:
      "Push the full release through priority air capacity to maximize speed and compress the recovery window into a single operating cycle.",
    objective:
      "Reduce customer wait time immediately when service-level risk outweighs the cost of concentrated expedite spend.",
    window: "Activate within 6 hours",
    lead: "Expedite coordinator",
    support: "Finance partner + customer success lead",
    pressurePoint:
      "Carrier capacity and surcharge approvals both need same-shift signoff before the booking can be held.",
    signal:
      "Best if the next 24 hours are the only concern, but it creates the thinnest margin for downstream disruption.",
    tone: "watch",
    measures: [
      {
        label: "ETA confidence",
        value: "94%",
        detail: "Fastest path if booking remains intact end to end.",
      },
      {
        label: "Budget posture",
        value: "+24%",
        detail: "Highest spend concentration of the three options.",
      },
      {
        label: "Fallback depth",
        value: "Low",
        detail: "Replanning gets harder once the shipment is committed to air.",
      },
    ],
    checkpoints: [
      "Confirm finance coverage for the surcharge delta before tendering the booking.",
      "Secure customer agreement on the premium path before switching all volume to air.",
      "Hold one backup carrier contact in reserve in case the first booking slips.",
    ],
  },
  {
    id: "sealift-stretch",
    label: "Cost guardrail",
    title: "Sealift Stretch",
    summary:
      "Delay the release into a consolidated lower-cost lane and rely on buffer stock messaging to protect spend during a volatile demand cycle.",
    objective:
      "Keep budget pressure contained while retaining enough communication coverage to avoid surprise escalations.",
    window: "Activate within 36 hours",
    lead: "Network planner",
    support: "Procurement + account operations",
    pressurePoint:
      "Only works if customers accept a longer promise window and the regional buffer stays available.",
    signal:
      "Cheapest option, but it leaves the board with the most exposure if demand keeps accelerating through the week.",
    tone: "fallback",
    measures: [
      {
        label: "ETA confidence",
        value: "73%",
        detail: "More vulnerable to cutoffs and downstream congestion.",
      },
      {
        label: "Budget posture",
        value: "-4%",
        detail: "Only lane that improves spend against baseline.",
      },
      {
        label: "Fallback depth",
        value: "Medium",
        detail: "Can pivot later, but only with service promises already softened.",
      },
    ],
    checkpoints: [
      "Validate regional buffer inventory before messaging any revised promise date.",
      "Issue a customer briefing that explains the slower lane and the recovery trigger.",
      "Set a hard reevaluation point after the next demand forecast refresh.",
    ],
  },
];

export const scenarioDecisionPrompts: ScenarioDecisionPrompt[] = [
  {
    id: "demand-spike",
    title: "If demand spikes again tomorrow, what breaks first?",
    question:
      "Choose whether the next planning review is protecting customer wait time, holding margin, or preserving the easiest recovery path.",
    framing:
      "This prompt exists to force a declared priority before the team starts arguing over tactics in the room.",
    owner: "Ops director",
    reviewWindow: "Review at 09:30 planning standup",
    options: [
      {
        label: "Protect customer wait time",
        impact:
          "Pushes the board toward Airbridge Burst or a larger hybrid air tranche.",
        risk: "Raises cost exposure quickly and shortens the fallback path.",
      },
      {
        label: "Protect margin",
        impact:
          "Keeps Sealift Stretch in scope and limits premium capacity usage.",
        risk: "Service confidence softens if the forecast proves too conservative.",
      },
      {
        label: "Protect recovery options",
        impact:
          "Favors the Hybrid Buffer Route because it preserves multiple next moves.",
        risk: "May feel slower than a full expedite response in the first 12 hours.",
      },
    ],
  },
  {
    id: "supplier-alignment",
    title: "Which dependency deserves escalation before execution?",
    question:
      "Escalate the dependency that can collapse more than one scenario lane if it slips, even if it is not the loudest issue yet.",
    framing:
      "The goal is to spend scarce leadership attention on the dependency with the broadest blast radius.",
    owner: "Program manager",
    reviewWindow: "Reconfirm before supplier cutoff",
    options: [
      {
        label: "Supplier release timing",
        impact:
          "Unlocks the Hybrid Buffer Route and stabilizes every downstream handoff.",
        risk: "If missed, both speed and fallback quality degrade at the same time.",
      },
      {
        label: "Carrier capacity hold",
        impact:
          "Protects Airbridge Burst if speed becomes the only objective that matters.",
        risk: "Capacity can be expensive to hold without certainty on final volume.",
      },
      {
        label: "Customer promise reset",
        impact:
          "Makes Sealift Stretch safer by reducing surprise escalations after the shift.",
        risk: "Once the promise moves, reversing course creates trust friction.",
      },
    ],
  },
  {
    id: "recovery-trigger",
    title: "What signal should trigger a scenario change mid-cycle?",
    question:
      "Define a visible threshold now so the team is not improvising a scenario switch when the route is already under stress.",
    framing:
      "A clean trigger protects the operator from late subjective debates and keeps the handoff language crisp.",
    owner: "Planning lead",
    reviewWindow: "Publish with the scenario decision",
    options: [
      {
        label: "Forecast variance over 12%",
        impact:
          "Moves the board toward more air exposure if incoming volume outruns the hybrid buffer.",
        risk: "A noisy forecast could create churn if the threshold is too sensitive.",
      },
      {
        label: "Customer escalation volume",
        impact:
          "Changes the decision when service pain becomes visible faster than the operational metrics.",
        risk: "Escalations can lag the true disruption signal by several hours.",
      },
      {
        label: "Supplier release miss",
        impact:
          "Forces an immediate fallback because the hybrid plan depends on synchronized release timing.",
        risk: "Requires tight monitoring around the cutoff or the trigger arrives too late.",
      },
    ],
  },
];

export const scenarioOutcomeMatrix = {
  title: "Scenario outcome matrix",
  description:
    "Compare the likely operating outcome for each scenario before selecting the lane that will anchor the plan.",
  footer:
    "On smaller screens the matrix scrolls horizontally so the criteria stay readable without collapsing the cell detail.",
  rows: [
    {
      id: "activation-speed",
      criterion: "Activation speed",
      whyItMatters:
        "Shows how quickly the team can turn the plan into a live shipment without waiting for a second review.",
      outcomes: {
        "hybrid-buffer": {
          label: "Rapid but controlled",
          detail:
            "Needs one coordinated supplier release, then both tranches can move in the same shift.",
          tone: "strong",
        },
        "airbridge-burst": {
          label: "Immediate",
          detail:
            "Fastest start if premium capacity and approvals are already lined up.",
          tone: "strong",
        },
        "sealift-stretch": {
          label: "Delayed",
          detail:
            "Consolidation improves spend but adds at least one more decision cycle before go-live.",
          tone: "fragile",
        },
      },
    },
    {
      id: "budget-exposure",
      criterion: "Budget exposure",
      whyItMatters:
        "Clarifies whether the lane concentrates premium cost now or preserves room for future disruption.",
      outcomes: {
        "hybrid-buffer": {
          label: "Managed increase",
          detail:
            "Spend rises, but only part of the volume carries premium treatment.",
          tone: "balanced",
        },
        "airbridge-burst": {
          label: "Highest concentration",
          detail:
            "Full expedite spend lands in a single cycle with minimal opportunity to dilute the cost.",
          tone: "fragile",
        },
        "sealift-stretch": {
          label: "Best guardrail",
          detail:
            "Protects the budget baseline and keeps surcharge risk low.",
          tone: "strong",
        },
      },
    },
    {
      id: "service-confidence",
      criterion: "Service confidence",
      whyItMatters:
        "Maps how credible the promise looks to the customer once the decision is communicated.",
      outcomes: {
        "hybrid-buffer": {
          label: "Credible with backup",
          detail:
            "Gives customers a fast partial recovery and a clear fallback if volume shifts again.",
          tone: "strong",
        },
        "airbridge-burst": {
          label: "Strong near-term confidence",
          detail:
            "Looks best immediately, but confidence drops sharply if a single booking slips.",
          tone: "balanced",
        },
        "sealift-stretch": {
          label: "Conditional confidence",
          detail:
            "Works only if the revised promise is communicated early and accepted without resistance.",
          tone: "fragile",
        },
      },
    },
    {
      id: "operational-strain",
      criterion: "Operational strain",
      whyItMatters:
        "Highlights whether the lane is likely to overload planners, suppliers, or customer-facing teams during execution.",
      outcomes: {
        "hybrid-buffer": {
          label: "Shared strain",
          detail:
            "More coordination upfront, but the workload is distributed across teams and time windows.",
          tone: "balanced",
        },
        "airbridge-burst": {
          label: "Intense spike",
          detail:
            "Creates the sharpest same-day coordination load and leaves little room for recovery mistakes.",
          tone: "fragile",
        },
        "sealift-stretch": {
          label: "Lower immediate load",
          detail:
            "Simpler to execute on day one, but monitoring needs stay elevated longer.",
          tone: "balanced",
        },
      },
    },
    {
      id: "recovery-path",
      criterion: "Recovery path",
      whyItMatters:
        "Shows how easy it is to change course after launch if conditions deteriorate or improve.",
      outcomes: {
        "hybrid-buffer": {
          label: "Best optionality",
          detail:
            "Ground buffer and partial air coverage leave the cleanest path for a mid-cycle adjustment.",
          tone: "strong",
        },
        "airbridge-burst": {
          label: "Thin fallback",
          detail:
            "Once the full booking is committed, the route has fewer graceful ways to recover.",
          tone: "fragile",
        },
        "sealift-stretch": {
          label: "Recoverable with messaging",
          detail:
            "The board can still pivot later, but only after resetting the promise a second time.",
          tone: "balanced",
        },
      },
    },
  ] satisfies ScenarioOutcomeMatrixRow[],
};
