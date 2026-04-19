export type Severity = "low" | "medium" | "high";
export type MissionStatus = "ready" | "watch" | "blocked";
export type MissionRisk = { label: string; severity: Severity };
export type MissionPhase = { id: string; label: string; window: string; owner: string; objective: string; status: MissionStatus; blockers: MissionRisk[] };
export type MissionTeam = { id: string; name: string; lead: string; readiness: MissionStatus; confidence: string; focus: string };
export type MissionDecision = { id: string; label: string; rationale: string };
export type MissionScenario = {
  id: string;
  callsign: string;
  theater: string;
  horizon: string;
  summary: string;
  lead: string;
  status: MissionStatus;
  alert: string;
  blockers: MissionRisk[];
  timeline: MissionPhase[];
  readiness: MissionTeam[];
  decisions: MissionDecision[];
};

export const statusLabels: Record<MissionStatus, string> = { ready: "Ready", watch: "Watch", blocked: "Blocked" };

export const missionScenarios: MissionScenario[] = [
  {
    id: "northern-line",
    callsign: "Northern Line",
    theater: "Arctic relay corridor",
    horizon: "18h window",
    summary: "Escort corridor with a weather shelf after phase two.",
    lead: "S. Flores",
    status: "ready",
    alert: "Route holds if the offset refuel plan is approved before convoy merge.",
    blockers: [{ label: "Fuel variance", severity: "medium" }, { label: "Dock queue", severity: "low" }],
    timeline: [
      { id: "nl-1", label: "Recon sweep", window: "18:00", owner: "Signals", objective: "Validate relay health before corridor entry.", status: "ready", blockers: [{ label: "Cloud drift", severity: "low" }] },
      { id: "nl-2", label: "Convoy merge", window: "18:40", owner: "Ops", objective: "Merge escorts before the shelf compresses.", status: "watch", blockers: [{ label: "Refuel pacing", severity: "medium" }] },
      { id: "nl-3", label: "Harbor handoff", window: "20:10", owner: "Harbor", objective: "Transfer cargo without blocking berth seven.", status: "ready", blockers: [] },
    ],
    readiness: [
      { id: "nl-r1", name: "Flight wing", lead: "R. Singh", readiness: "ready", confidence: "87%", focus: "Hold escort spacing through the shelf." },
      { id: "nl-r2", name: "Signals desk", lead: "M. Hart", readiness: "ready", confidence: "81%", focus: "Preserve relay quality in the north band." },
      { id: "nl-r3", name: "Fuel control", lead: "I. Moreno", readiness: "watch", confidence: "68%", focus: "Trim reserve mismatch before merge." },
    ],
    decisions: [
      { id: "nl-d1", label: "Approve offset tanking", rationale: "Adds reserve margin if weather closes early." },
      { id: "nl-d2", label: "Hold reserve escort", rationale: "Keeps an extraction option for the final leg." },
    ],
  },
  {
    id: "harbor-echo",
    callsign: "Harbor Echo",
    theater: "Littoral staging arc",
    horizon: "9h window",
    summary: "Coastal logistics rehearsal with contested pier access.",
    lead: "A. Rhee",
    status: "watch",
    alert: "Cargo timing is healthy, but pier access stays fragile until the patrol overlap clears.",
    blockers: [{ label: "Pier access", severity: "high" }, { label: "Drone overlap", severity: "medium" }],
    timeline: [
      { id: "he-1", label: "Harbor scan", window: "13:10", owner: "Recon", objective: "Map congestion around delta approach.", status: "watch", blockers: [{ label: "Blind spot", severity: "medium" }] },
      { id: "he-2", label: "Cargo staging", window: "13:40", owner: "Logistics", objective: "Stage priority pallets by reload order.", status: "ready", blockers: [] },
      { id: "he-3", label: "Pier insertion", window: "14:20", owner: "Harbor", objective: "Thread the convoy into pier delta.", status: "blocked", blockers: [{ label: "Patrol overlap", severity: "high" }] },
    ],
    readiness: [
      { id: "he-r1", name: "Harbor cell", lead: "L. Zhou", readiness: "blocked", confidence: "41%", focus: "Protect the insertion window at pier delta." },
      { id: "he-r2", name: "Cargo staging", lead: "F. Clarke", readiness: "ready", confidence: "84%", focus: "Keep pallets aligned with the reroute model." },
      { id: "he-r3", name: "Counter-drone desk", lead: "N. Kim", readiness: "watch", confidence: "63%", focus: "Track low-altitude interruptions above delta." },
    ],
    decisions: [
      { id: "he-d1", label: "Trigger berth gamma fallback", rationale: "Prevents the drill from slipping into the evening cycle." },
      { id: "he-d2", label: "Delay pier insertion", rationale: "Trades schedule for a cleaner safety margin." },
    ],
  },
  {
    id: "polar-relay",
    callsign: "Polar Relay",
    theater: "Sub-orbital comms chain",
    horizon: "27h window",
    summary: "Relay recovery with a degraded node and a crew rotation gap.",
    lead: "T. Osei",
    status: "blocked",
    alert: "Restoration is paused until node six stabilizes or the crew gap is closed.",
    blockers: [{ label: "Node six drift", severity: "high" }, { label: "Crew gap", severity: "high" }],
    timeline: [
      { id: "pr-1", label: "Node isolation", window: "07:00", owner: "Systems", objective: "Strip node six from the mesh and contain loss.", status: "blocked", blockers: [{ label: "Handshake failures", severity: "high" }] },
      { id: "pr-2", label: "Cold restart", window: "07:35", owner: "Power", objective: "Attempt a staged restart on drifted hardware.", status: "watch", blockers: [{ label: "Power sag", severity: "medium" }] },
      { id: "pr-3", label: "Network restore", window: "08:40", owner: "Command net", objective: "Reintroduce node six only after drift falls.", status: "watch", blockers: [{ label: "Tolerance mismatch", severity: "medium" }] },
    ],
    readiness: [
      { id: "pr-r1", name: "Systems recovery", lead: "J. Patel", readiness: "blocked", confidence: "34%", focus: "Keep drift contained while restart is validated." },
      { id: "pr-r2", name: "Power desk", lead: "C. Nwosu", readiness: "watch", confidence: "55%", focus: "Prevent another sag during the restart cycle." },
      { id: "pr-r3", name: "Crew rotations", lead: "D. Mercer", readiness: "blocked", confidence: "29%", focus: "Backfill the vacant operator seat quickly." },
    ],
    decisions: [
      { id: "pr-d1", label: "Keep node six isolated", rationale: "Avoids a broader mesh regression." },
      { id: "pr-d2", label: "Activate reserve controller", rationale: "Closes the rotation gap before the next checkpoint." },
    ],
  },
];
