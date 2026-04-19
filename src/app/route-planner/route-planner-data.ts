export type ConstraintId = "weather-window" | "dock-capacity" | "crew-turn" | "cold-chain" | "bridge-clearance";
export type RouteConstraint = { id: ConstraintId; label: string; severity: "high" | "medium" | "low"; description: string };
export type RouteSegment = {
  id: string;
  label: string;
  start: string;
  end: string;
  mode: "Ground" | "Air" | "Relay";
  window: string;
  status: "locked" | "watch" | "reroute";
  confidence: number;
  bufferMinutes: number;
  owner: string;
  note: string;
  fallback: string;
  constraintIds: ConstraintId[];
};
export type PlannedRoute = {
  id: string;
  name: string;
  planningMode: string;
  objective: string;
  selectedWindow: string;
  summary: string;
  dispatchLead: string;
  routeScore: number;
  segments: RouteSegment[];
};

const segment = (
  id: string,
  label: string,
  start: string,
  end: string,
  mode: RouteSegment["mode"],
  window: string,
  status: RouteSegment["status"],
  confidence: number,
  bufferMinutes: number,
  owner: string,
  note: string,
  fallback: string,
  constraintIds: ConstraintId[],
): RouteSegment => ({ id, label, start, end, mode, window, status, confidence, bufferMinutes, owner, note, fallback, constraintIds });

const route = (
  id: string,
  name: string,
  planningMode: string,
  objective: string,
  selectedWindow: string,
  summary: string,
  dispatchLead: string,
  routeScore: number,
  segments: RouteSegment[],
): PlannedRoute => ({ id, name, planningMode, objective, selectedWindow, summary, dispatchLead, routeScore, segments });

export const routeConstraints: RouteConstraint[] = [
  { id: "weather-window", label: "Weather Window", severity: "high", description: "Surface segments with wind or visibility pressure." },
  { id: "dock-capacity", label: "Dock Capacity", severity: "medium", description: "Show handoffs that need reassigned berths or queues." },
  { id: "crew-turn", label: "Crew Turn", severity: "medium", description: "Highlight segments near labor or timing limits." },
  { id: "cold-chain", label: "Cold Chain", severity: "high", description: "Focus on protected transfers with thermal exposure." },
  { id: "bridge-clearance", label: "Bridge Clearance", severity: "low", description: "Track corridor segments with height or timing gates." },
];

export const plannedRoutes: PlannedRoute[] = [
  route("north-delta", "North Delta Relay", "Adaptive relay", "Preserve the northern spine and keep all late-bound handoffs inside a 90 minute margin.", "06:10-11:40 UTC", "Fastest corridor with two protected handoffs and moderate weather exposure.", "Dispatch Cell A3", 92, [
    segment("nd-1", "Harbor Intake", "Pier Intake 2", "Delta Staging", "Ground", "06:10-07:05", "locked", 95, 18, "Yard Team 4", "Clean release from berth lane with no thermal handling.", "Shift to Intake 4 if crane queue slips past 12 minutes.", ["dock-capacity"]),
    segment("nd-2", "Lift Corridor", "Delta Staging", "North Air Ramp", "Air", "07:20-08:35", "watch", 84, 12, "Rotor Desk 2", "Crosswind risk builds after the first departure slot.", "Hold to the lower pass and trade 20 minutes of margin.", ["weather-window", "crew-turn"]),
    segment("nd-3", "Thermal Handoff", "North Air Ramp", "Cold Spine Lockup", "Relay", "08:55-09:25", "watch", 81, 9, "Chain Custody", "Protected relay only if seal check clears on first scan.", "Use dock-side refrigerant locker and relabel the manifest.", ["cold-chain"]),
    segment("nd-4", "Final Drop", "Cold Spine Lockup", "North Delta Hub", "Ground", "09:45-11:40", "locked", 90, 22, "Linehaul West", "Preferred arrival path through the east apron remains open.", "Flip to the ridge spur if apron demand spikes.", ["bridge-clearance"]),
  ]),
  route("harbor-spine", "Harbor Spine", "Constraint chase", "Contain queue growth around the central docks without losing the earliest delivery slot.", "07:00-12:15 UTC", "Most direct harbor route, but berth turnover and crew pacing are both tight.", "Queue Control B1", 86, [
    segment("hs-1", "Dock Exit", "Harbor Stack 7", "Canal Merge", "Ground", "07:00-07:40", "watch", 82, 10, "Dock Marshal", "Earliest lane is available, but berth turnover remains noisy.", "Queue behind Stack 5 and release on the next green cycle.", ["dock-capacity", "crew-turn"]),
    segment("hs-2", "Canal Transit", "Canal Merge", "South Bridge Gate", "Relay", "07:55-09:05", "reroute", 76, 6, "Transit Board", "Bridge timing conflict narrows the open passage to one cycle.", "Divert to the inner quay and accept a 28 minute delay.", ["bridge-clearance"]),
    segment("hs-3", "Crew Exchange", "South Bridge Gate", "Spine Relay", "Ground", "09:25-10:10", "watch", 79, 14, "Crew Board", "Shift overlap is still viable, but only with the early release.", "Call reserve crew and slide the relay by one service band.", ["crew-turn"]),
    segment("hs-4", "Harbor Finish", "Spine Relay", "South Yard", "Ground", "10:30-12:15", "locked", 88, 18, "Harbor Haul", "Final yard window holds if upstream timing stays inside tolerance.", "Use overflow yard slot 3 and hold the outbound release.", []),
  ]),
  route("cinder-arc", "Cinder Arc", "Cold-chain reserve", "Protect refrigerated transfer integrity while keeping the reserve corridor ready for escalation.", "05:50-10:50 UTC", "Reserve path with the best thermal handling, but weather and dock timing can both pinch capacity.", "Reserve Cell C7", 89, [
    segment("ca-1", "Reserve Intake", "North Berth 1", "Cinder Prep", "Ground", "05:50-06:35", "locked", 93, 16, "Reserve Yard", "Thermal seal begins here and remains intact through the relay.", "Backfill through Berth 3 if intake handling runs long.", ["cold-chain"]),
    segment("ca-2", "Sky Hook", "Cinder Prep", "Mesa Drop", "Air", "06:50-08:05", "watch", 80, 11, "Flight Board", "Visibility floor remains acceptable but trends down after sunrise.", "Break the leg into two lower hops via Mesa West.", ["weather-window", "cold-chain"]),
    segment("ca-3", "Mesa Relay", "Mesa Drop", "Arc Lock", "Relay", "08:20-09:00", "locked", 91, 20, "Thermal Desk", "Fastest protected transfer in the reserve portfolio.", "Extend refrigeration dwell and delay the final launch.", ["cold-chain"]),
    segment("ca-4", "Arc Delivery", "Arc Lock", "Cinder Hub", "Ground", "09:15-10:50", "watch", 83, 13, "Hub Dispatch", "Arrival slot is stable if the dock queue downstream stays flat.", "Switch to the reserve apron and absorb a short unload hold.", ["dock-capacity"]),
  ]),
];
