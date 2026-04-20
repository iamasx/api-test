export type MissionPriority = "critical" | "timed" | "watch";
export type MissionReadinessTone = "ready" | "watch" | "blocked";
export type StageStatus = "complete" | "active" | "queued";
export type TaskStatus = "done" | "watch" | "pending";

export interface PlannerStat {
  label: string;
  value: string;
  detail: string;
}

export interface MissionScenario {
  id: string;
  title: string;
  priority: MissionPriority;
  launchWindow: string;
  objective: string;
  lead: string;
  support: string;
  summary: string;
  checkpoints: string[];
}

export interface ReadinessSignal {
  id: string;
  label: string;
  value: string;
  note: string;
  tone: MissionReadinessTone;
}

export interface ChecklistTask {
  id: string;
  label: string;
  owner: string;
  status: TaskStatus;
  note: string;
}

export interface MissionStage {
  id: string;
  name: string;
  status: StageStatus;
  window: string;
  focus: string;
  tasks: ChecklistTask[];
}

export const missionPlannerSummary = {
  eyebrow: "Mission Planner",
  title: "Sequence launch-day contingencies before they become field delays.",
  description:
    "A planning surface for comparing scenarios, reading readiness posture, and walking the crew through the staged mission checklist.",
  stats: [
    {
      label: "Scenarios in play",
      value: "3",
      detail: "Two high-confidence paths and one contingency branch",
    },
    {
      label: "Readiness posture",
      value: "82%",
      detail: "Primary teams cleared, weather and comms under watch",
    },
    {
      label: "Active stage",
      value: "Stage 2",
      detail: "Payload locking and final route synchronization",
    },
  ] satisfies PlannerStat[],
};

export const missionScenarios = [
  {
    id: "aurora-lift",
    title: "Aurora Lift",
    priority: "critical",
    launchWindow: "06:40-07:25 UTC",
    objective: "Move the sensor package to the northern ridge before thermal drift spikes.",
    lead: "Flight operations",
    support: "Telemetry + ground relay",
    summary:
      "Primary launch path optimized for the earliest stable weather pocket with minimal relay congestion.",
    checkpoints: [
      "Confirm ridge relay handoff 18 minutes before release",
      "Lock payload temperature band to cold-start profile",
      "Hold alternate descent lane in reserve until payload clears ridge line",
    ],
  },
  {
    id: "ember-coast",
    title: "Ember Coast",
    priority: "timed",
    launchWindow: "07:40-08:10 UTC",
    objective: "Delay the sortie to protect line-of-sight comms without missing the resupply corridor.",
    lead: "Mission control",
    support: "Weather desk + logistics",
    summary:
      "A delayed departure scenario that trades launch speed for stronger comms stability and cleaner coastal routing.",
    checkpoints: [
      "Reconfirm sea-band interference floor at T-minus 35",
      "Stage backup battery cradle in west hangar",
      "Shift dock crew to delayed dispatch rhythm if launch slips beyond 07:55 UTC",
    ],
  },
  {
    id: "nightglass-divert",
    title: "Nightglass Divert",
    priority: "watch",
    launchWindow: "Standby branch",
    objective: "Route the mission through the inland corridor if the shoreline cell expands.",
    lead: "Contingency planning",
    support: "Navigation + field response",
    summary:
      "Fallback route prepared for rapid activation if the coastal weather shelf moves into the primary flight band.",
    checkpoints: [
      "Keep inland fuel cache topped off and signed",
      "Validate alternate waypoint package in the nav console",
      "Prepare field recovery crew for a longer return window",
    ],
  },
] satisfies MissionScenario[];

export const readinessSignals = [
  {
    id: "crew-availability",
    label: "Crew availability",
    value: "11 / 12 ready",
    note: "Recovery specialist is on delayed arrival but cross-trained backup is already briefed.",
    tone: "ready",
  },
  {
    id: "weather-window",
    label: "Weather window",
    value: "Narrow but usable",
    note: "Crosswind is inside threshold through the first launch slot, then shifts to watch status.",
    tone: "watch",
  },
  {
    id: "payload-health",
    label: "Payload health",
    value: "Stable",
    note: "Thermal envelope is flat and the calibration sweep completed without variance alerts.",
    tone: "ready",
  },
  {
    id: "relay-network",
    label: "Relay network",
    value: "Fallback pending",
    note: "Primary uplink is healthy, but the inland relay certificate rotation still needs verification.",
    tone: "blocked",
  },
] satisfies ReadinessSignal[];

export const missionStages = [
  {
    id: "stage-1",
    name: "Stage 1 · Preflight alignment",
    status: "complete",
    window: "05:30-06:00 UTC",
    focus: "Crew briefing, system confirmation, and launch corridor review.",
    tasks: [
      {
        id: "crew-briefing",
        label: "Run final crew briefing",
        owner: "Ops lead",
        status: "done",
        note: "All teams signed off on the weather-adjusted timing plan.",
      },
      {
        id: "payload-calibration",
        label: "Complete payload calibration sweep",
        owner: "Payload tech",
        status: "done",
        note: "Sweep closed with no deviation beyond the green tolerance band.",
      },
      {
        id: "corridor-review",
        label: "Confirm primary and alternate corridor locks",
        owner: "Navigation desk",
        status: "done",
        note: "Aurora Lift remains primary, Nightglass Divert remains armed as fallback.",
      },
    ],
  },
  {
    id: "stage-2",
    name: "Stage 2 · Launch window control",
    status: "active",
    window: "06:00-07:10 UTC",
    focus: "Protect the primary launch slot while reducing dependency risk.",
    tasks: [
      {
        id: "relay-verification",
        label: "Verify inland relay certificate rotation",
        owner: "Comms engineer",
        status: "watch",
        note: "Waiting on the final certificate propagation check from the edge node.",
      },
      {
        id: "battery-cradle",
        label: "Stage backup battery cradle",
        owner: "Hangar crew",
        status: "pending",
        note: "Must be in position before the delayed Ember Coast branch can be activated.",
      },
      {
        id: "crosswind-monitoring",
        label: "Track crosswind shift at five-minute intervals",
        owner: "Weather desk",
        status: "watch",
        note: "Threshold is acceptable now, but conditions tighten after 07:20 UTC.",
      },
    ],
  },
  {
    id: "stage-3",
    name: "Stage 3 · Recovery and handoff",
    status: "queued",
    window: "07:10-08:30 UTC",
    focus: "Secure the package, route the return leg, and hand off for field analysis.",
    tasks: [
      {
        id: "recovery-lane",
        label: "Reserve the preferred recovery lane",
        owner: "Field response",
        status: "pending",
        note: "Will open once the final mission branch is locked.",
      },
      {
        id: "analysis-handoff",
        label: "Prepare analysis handoff packet",
        owner: "Mission analyst",
        status: "pending",
        note: "Packet template is ready; final telemetry summary populates after landing.",
      },
      {
        id: "return-fuel",
        label: "Confirm inland return fuel cache",
        owner: "Logistics",
        status: "pending",
        note: "Only required if Nightglass Divert is activated during launch control.",
      },
    ],
  },
] satisfies MissionStage[];
