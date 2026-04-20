export type BriefingScenarioTone = "accelerate" | "stabilize" | "contain";
export type ReadinessHighlightTone = "ready" | "watch" | "risk";

export interface BriefingStat {
  label: string;
  value: string;
  detail: string;
}

export interface MissionBriefingScenario {
  id: string;
  title: string;
  tone: BriefingScenarioTone;
  launchWindow: string;
  objective: string;
  commander: string;
  supportLead: string;
  readiness: string;
  confidence: string;
  summary: string;
  decision: string;
  assetMix: string[];
  frictionPoints: string[];
}

export interface ReadinessHighlight {
  id: string;
  label: string;
  value: string;
  tone: ReadinessHighlightTone;
  owner: string;
  note: string;
  nextCheck: string;
}

export interface DecisionPrompt {
  id: string;
  prompt: string;
  recommendation: string;
  threshold: string;
}

export interface BriefingNote {
  id: string;
  title: string;
  owner: string;
  window: string;
  detail: string;
  impact: string;
}

export const missionBriefingOverview = {
  eyebrow: "Mission Briefing",
  title: "Build a briefing deck that compares branches before the field team commits.",
  description:
    "This route stages scenario cards, operational readiness highlights, and a decision support panel so planning leads can compare trade-offs without opening a second workspace.",
  primaryAction: "Review scenario branches",
  secondaryAction: "Open decision support",
  commandNote: {
    title: "Command note",
    summary:
      "The Delta branch remains the recommended plan as long as comms stability holds through the 08:10 relay check.",
    decisionWindow: "Decision lock in 24 minutes",
    recommendedScenarioId: "delta-ridge",
  },
  stats: [
    {
      label: "Scenario branches",
      value: "3",
      detail: "One preferred path, one paced fallback, and one containment branch",
    },
    {
      label: "Teams on watch",
      value: "4",
      detail: "Operations, relay, logistics, and weather are tracking active changes",
    },
    {
      label: "Briefing confidence",
      value: "86%",
      detail: "Most launch assumptions are validated, but relay clearance is still moving",
    },
  ] satisfies BriefingStat[],
};

export const missionBriefingScenarios = [
  {
    id: "delta-ridge",
    title: "Delta Ridge lift",
    tone: "accelerate",
    launchWindow: "07:50-08:20 UTC",
    objective: "Launch early through the ridge corridor before coastal turbulence spreads inland.",
    commander: "Avery Stone",
    supportLead: "Relay desk / Hana Flores",
    readiness: "88% cleared",
    confidence: "High confidence",
    summary:
      "Fastest path to field deployment with the strongest payload timing, but it depends on the relay network clearing its final certificate sweep on time.",
    decision:
      "Keep the main crew on Delta Ridge unless relay verification slips past 08:10 UTC.",
    assetMix: [
      "2 ridge drones with thermal shielding",
      "Primary relay mast at checkpoint Echo",
      "Rapid-response recovery team on the north apron",
    ],
    frictionPoints: [
      "Relay certificate rotation must complete before the final commit call",
      "Crosswind margin tightens after 08:18 UTC",
      "Field recovery team needs a confirmed ridge descent lane by liftoff",
    ],
  },
  {
    id: "harbor-shift",
    title: "Harbor Shift delay",
    tone: "stabilize",
    launchWindow: "08:25-09:00 UTC",
    objective: "Delay deployment to protect signal quality and reduce handoff volatility.",
    commander: "Mina Doyle",
    supportLead: "Logistics / Theo Briggs",
    readiness: "79% cleared",
    confidence: "Moderate confidence",
    summary:
      "Safer communications posture and cleaner dock access, but the later window compresses recovery timing and narrows the secondary delivery slot.",
    decision:
      "Use Harbor Shift if relay validation misses the early window but the dock corridor stays under congestion threshold.",
    assetMix: [
      "1 heavy-lift drone with dock transfer cradle",
      "Secondary battery pallet staged in Hangar West",
      "Late-window logistics convoy on standby",
    ],
    frictionPoints: [
      "Dock congestion needs to stay below 60% to avoid a queue reset",
      "Battery pallet must be staged before 08:05 UTC",
      "Later launch window reduces analysis handoff time by 18 minutes",
    ],
  },
  {
    id: "inland-hold",
    title: "Inland Hold containment",
    tone: "contain",
    launchWindow: "Standby containment branch",
    objective: "Preserve the payload and move only if weather and relay conditions both degrade.",
    commander: "Risa Patel",
    supportLead: "Field response / Corin Voss",
    readiness: "68% staged",
    confidence: "Contingency only",
    summary:
      "Lowest-risk protection plan for the asset itself, but it delays downstream analysis and expands the field crew handoff chain.",
    decision:
      "Only activate Inland Hold if both main launch branches lose comms or safety margin in the next review cycle.",
    assetMix: [
      "Protected inland cache with manual handoff kit",
      "Two all-terrain recovery vehicles",
      "Reserve navigation package loaded to the field tablets",
    ],
    frictionPoints: [
      "Manual handoff adds one more checkpoint before analysis can start",
      "Reserve crew still needs a final fatigue sign-off",
      "Containment branch pushes reporting beyond the standard morning review",
    ],
  },
] satisfies MissionBriefingScenario[];

export const readinessHighlights = [
  {
    id: "relay-health",
    label: "Relay health",
    value: "Last sweep pending",
    tone: "watch",
    owner: "Network operations",
    note: "Primary mast is stable, but edge-node certificates are still propagating across the inland mesh.",
    nextCheck: "Revalidate at 08:10 UTC",
  },
  {
    id: "flight-crew",
    label: "Flight crew posture",
    value: "12 of 13 cleared",
    tone: "ready",
    owner: "Ops command",
    note: "Backup navigator is already briefed, which keeps the early branch viable even if the primary shift stretches.",
    nextCheck: "Crew rest check at 07:55 UTC",
  },
  {
    id: "weather-band",
    label: "Weather band",
    value: "Stable until ridge shift",
    tone: "watch",
    owner: "Weather desk",
    note: "The early corridor remains usable, but the ridge shelf is moving faster than yesterday’s model projected.",
    nextCheck: "Refresh model at 08:06 UTC",
  },
  {
    id: "dock-logistics",
    label: "Dock logistics",
    value: "Buffer available",
    tone: "ready",
    owner: "Ground logistics",
    note: "Cargo staging has a 14-minute buffer, which protects the Harbor Shift branch if it becomes the preferred path.",
    nextCheck: "Queue review at 08:12 UTC",
  },
  {
    id: "recovery-lane",
    label: "Recovery lane allocation",
    value: "North lane not locked",
    tone: "risk",
    owner: "Field response",
    note: "Recovery can still run, but the preferred lane is shared with another exercise and needs a control room approval.",
    nextCheck: "Decision with control at 08:00 UTC",
  },
] satisfies ReadinessHighlight[];

export const decisionPrompts = [
  {
    id: "branch-lock",
    prompt: "Which branch stays primary if relay clearance arrives exactly on the edge of the commit window?",
    recommendation: "Hold Delta Ridge unless the clearance lands after 08:10 UTC, then switch directly to Harbor Shift.",
    threshold: "Threshold: relay certification timestamp",
  },
  {
    id: "recovery-tradeoff",
    prompt: "What trade-off is acceptable if the north recovery lane remains shared?",
    recommendation: "Accept a later recovery handoff for Harbor Shift before accepting a risky descent lane on Delta Ridge.",
    threshold: "Threshold: lane approval and field recovery ETA",
  },
  {
    id: "containment-trigger",
    prompt: "When does the team stop trying to save the launch and move into containment?",
    recommendation: "Trigger Inland Hold only if weather and relay checks both degrade in the same review cycle.",
    threshold: "Threshold: dual-signal degradation across weather and network",
  },
] satisfies DecisionPrompt[];

export const briefingNotes = [
  {
    id: "relay-override",
    title: "Relay override path is ready but unsent",
    owner: "Hana Flores",
    window: "Needs decision before 08:08 UTC",
    detail:
      "The network team prepared a manual relay override package that avoids the slowest certificate hop, but it introduces extra operator steps during launch.",
    impact: "Use only if Delta Ridge remains primary and the normal sweep stalls.",
  },
  {
    id: "dock-convoy",
    title: "Late convoy can absorb one more pallet",
    owner: "Theo Briggs",
    window: "Available through the Harbor Shift branch",
    detail:
      "Logistics can fold the backup battery pallet into the delayed convoy without dropping cargo priority, which keeps the fallback branch operationally clean.",
    impact: "Improves the delayed option if the early launch window closes.",
  },
  {
    id: "recovery-control",
    title: "Control room wants a single recovery preference",
    owner: "Corin Voss",
    window: "Discuss in the next control sync",
    detail:
      "Field response requested a single preferred recovery lane instead of two floating options to prevent last-minute vehicle shuffling.",
    impact: "Decision support should make the branch recommendation explicit before the next handoff.",
  },
] satisfies BriefingNote[];
