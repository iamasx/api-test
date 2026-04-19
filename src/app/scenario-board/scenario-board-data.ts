export type ScenarioMode = "Containment" | "Exploration";
export type PlaybookLane = "stabilize" | "hedge" | "accelerate";
export type PlaybookLaneFilter = PlaybookLane | "all";
export type MatrixFilter = "all" | "downside";

export type ScenarioMetric = { label: string; value: string };
export type Playbook = {
  id: string;
  title: string;
  summary: string;
  lead: string;
  lane: PlaybookLane;
  readiness: string;
  timeToImpact: string;
  assumptionIds: string[];
  modes: ScenarioMode[];
};
export type Assumption = {
  id: string;
  label: string;
  note: string;
  state: "confirmed" | "watch" | "strained";
  owner: string;
};
export type Outcome = {
  id: string;
  title: string;
  detail: string;
  likelihood: "likely" | "unlikely";
  direction: "upside" | "downside";
  score: number;
  owner: string;
  assumptionIds: string[];
  playbookIds: string[];
  modes: ScenarioMode[];
};
export type ActionPrompt = {
  id: string;
  playbookId: string;
  label: string;
  detail: string;
};

export const scenarioModes: ScenarioMode[] = ["Containment", "Exploration"];
export const laneFilters: { id: PlaybookLaneFilter; label: string }[] = [
  { id: "all", label: "All lanes" },
  { id: "stabilize", label: "Stabilize" },
  { id: "hedge", label: "Hedge" },
  { id: "accelerate", label: "Accelerate" },
];

export const activeScenario = {
  title: "Harbor Shift 6",
  brief:
    "Port demand is rebounding before labor buffers reset, so the board is modeling how fast to protect premium freight without burning next-week capacity.",
  window: "72-hour decision window",
  decision: "Decision lock at 18:00 UTC",
  modeBadges: {
    Containment: "Risk lock",
    Exploration: "Expansion sweep",
  } satisfies Record<ScenarioMode, string>,
  metrics: [
    { label: "Demand pulse", value: "+18% inbound" },
    { label: "Crew slack", value: "2 reserve teams" },
    { label: "Overflow risk", value: "7.4 / 10" },
  ] satisfies ScenarioMetric[],
};

export const playbooks: Playbook[] = [
  {
    id: "berth-buffer",
    title: "Berth Buffer",
    summary: "Reserve two swing berths for delayed priority loads and rebalance the yard only at shift handoff.",
    lead: "Terminal Ops",
    lane: "stabilize",
    readiness: "Ready in 20 min",
    timeToImpact: "Stabilizes tonight",
    assumptionIds: ["dock-window", "rail-cutoff"],
    modes: ["Containment", "Exploration"],
  },
  {
    id: "vendor-surge",
    title: "Vendor Surge",
    summary: "Activate contracted handlers for two high-friction docks while core crews protect reefer throughput.",
    lead: "Labor Desk",
    lane: "hedge",
    readiness: "Pending vendor hold",
    timeToImpact: "Unlocks by dawn",
    assumptionIds: ["labor-pool", "fuel-flat"],
    modes: ["Containment"],
  },
  {
    id: "night-rail-pivot",
    title: "Night Rail Pivot",
    summary: "Hold outbound rail cuts until the midnight sweep and convert missed windows into a single managed release.",
    lead: "Rail Coordination",
    lane: "stabilize",
    readiness: "Ready in 1 hr",
    timeToImpact: "Reduces misses tomorrow",
    assumptionIds: ["rail-cutoff", "dock-window"],
    modes: ["Containment"],
  },
  {
    id: "priority-reroute",
    title: "Priority Reroute",
    summary: "Move premium loads to the east basin, accept longer drayage, and sell speed as the recovery promise.",
    lead: "Commercial Desk",
    lane: "accelerate",
    readiness: "Ready in 35 min",
    timeToImpact: "Improves margin this cycle",
    assumptionIds: ["east-basin", "fuel-flat"],
    modes: ["Exploration"],
  },
  {
    id: "partner-lift",
    title: "Partner Lift",
    summary: "Share overflow with a partner terminal for one rotation to test whether premium demand remains sticky.",
    lead: "Network Planning",
    lane: "hedge",
    readiness: "Draft agreement live",
    timeToImpact: "Signals within 24 hr",
    assumptionIds: ["east-basin", "labor-pool"],
    modes: ["Exploration"],
  },
];

export const assumptions: Assumption[] = [
  {
    id: "dock-window",
    label: "Carriers accept a single widened dock window.",
    note: "Breaks if queue times exceed 85 minutes.",
    state: "confirmed",
    owner: "Port Liaison",
  },
  {
    id: "rail-cutoff",
    label: "Rail cutoff can slide one cycle without tariff penalties.",
    note: "Requires a joint sign-off before midnight.",
    state: "watch",
    owner: "Intermodal Lead",
  },
  {
    id: "fuel-flat",
    label: "Fuel surcharge remains flat through the next dispatch wave.",
    note: "A surcharge spike erodes the reroute case first.",
    state: "confirmed",
    owner: "Finance Watch",
  },
  {
    id: "labor-pool",
    label: "Contract handlers can clear badging by first light.",
    note: "Any delay shifts pressure back onto reefer crews.",
    state: "strained",
    owner: "Labor Desk",
  },
  {
    id: "east-basin",
    label: "East basin keeps one overflow gate open for premium freight.",
    note: "Gate loss would collapse both exploration plays.",
    state: "watch",
    owner: "Gate Control",
  },
];

export const outcomes: Outcome[] = [
  {
    id: "margin-recovery",
    title: "Premium margin recovers before labor cost catches up.",
    detail: "Commercial upside lands if premium loads convert faster than drayage cost expands.",
    likelihood: "likely",
    direction: "upside",
    score: 7,
    owner: "Commercial Desk",
    assumptionIds: ["fuel-flat", "east-basin"],
    playbookIds: ["priority-reroute", "partner-lift"],
    modes: ["Exploration"],
  },
  {
    id: "reefer-stability",
    title: "Reefer queue remains flat through the overnight peak.",
    detail: "The board protects cold-chain volume by concentrating resets at shift handoff only.",
    likelihood: "likely",
    direction: "upside",
    score: 6,
    owner: "Terminal Ops",
    assumptionIds: ["dock-window", "rail-cutoff"],
    playbookIds: ["berth-buffer", "night-rail-pivot"],
    modes: ["Containment"],
  },
  {
    id: "partner-stickiness",
    title: "Overflow customers accept a partner terminal for one full cycle.",
    detail: "A positive read keeps demand optionality open beyond the 72-hour board window.",
    likelihood: "unlikely",
    direction: "upside",
    score: 5,
    owner: "Network Planning",
    assumptionIds: ["east-basin", "labor-pool"],
    playbookIds: ["partner-lift"],
    modes: ["Exploration"],
  },
  {
    id: "tariff-hit",
    title: "Late rail release triggers an avoidable tariff hit.",
    detail: "Containment looks weaker if the midnight waiver slips or dispatch misses the manual hold.",
    likelihood: "likely",
    direction: "downside",
    score: 8,
    owner: "Intermodal Lead",
    assumptionIds: ["rail-cutoff"],
    playbookIds: ["night-rail-pivot"],
    modes: ["Containment"],
  },
  {
    id: "crew-burn",
    title: "Overflow handling burns reserve crews before the weekend reset.",
    detail: "Labor strain compounds if vendor onboarding drifts or the queue spills back to core teams.",
    likelihood: "likely",
    direction: "downside",
    score: 9,
    owner: "Labor Desk",
    assumptionIds: ["labor-pool"],
    playbookIds: ["vendor-surge", "partner-lift"],
    modes: ["Containment", "Exploration"],
  },
  {
    id: "gate-loss",
    title: "East basin closes the overflow gate after the first reroute wave.",
    detail: "Exploration upside disappears and premium freight re-enters the same contested queue.",
    likelihood: "unlikely",
    direction: "downside",
    score: 8,
    owner: "Gate Control",
    assumptionIds: ["east-basin"],
    playbookIds: ["priority-reroute", "partner-lift"],
    modes: ["Exploration"],
  },
];

export const actionPrompts: ActionPrompt[] = [
  {
    id: "berth-buffer-1",
    playbookId: "berth-buffer",
    label: "Freeze the two swing berths and publish the cutoff before shift handoff.",
    detail: "This keeps the containment move simple enough for one dispatcher to run.",
  },
  {
    id: "berth-buffer-2",
    playbookId: "berth-buffer",
    label: "Pair each protected berth with one manual exception path.",
    detail: "That prevents premium loads from bypassing the reefer queue without accountability.",
  },
  {
    id: "vendor-surge-1",
    playbookId: "vendor-surge",
    label: "Request the vendor surge only for docks 4 and 7.",
    detail: "A narrow activation limits fatigue if the contract labor assumption breaks.",
  },
  {
    id: "night-rail-pivot-1",
    playbookId: "night-rail-pivot",
    label: "Draft the waiver note and release plan in one message.",
    detail: "The board wants the midnight hold to be reversible, not a hidden default.",
  },
  {
    id: "priority-reroute-1",
    playbookId: "priority-reroute",
    label: "Draft carrier comms with a two-window premium promise.",
    detail: "The commercial story needs to justify the added drayage before the first reroute leaves.",
  },
  {
    id: "priority-reroute-2",
    playbookId: "priority-reroute",
    label: "Reserve one east basin gate marshal for the opening hour.",
    detail: "The margin case collapses if premium trucks wait like standard overflow.",
  },
  {
    id: "partner-lift-1",
    playbookId: "partner-lift",
    label: "Offer the partner terminal a one-rotation volume cap.",
    detail: "It tests customer stickiness without turning the partner route into a standing dependency.",
  },
];
