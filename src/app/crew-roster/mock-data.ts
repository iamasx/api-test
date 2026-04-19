export type CrewRoleId = "navigation" | "systems" | "medical" | "security";
export type ReadinessId = "ready" | "steady" | "recovery";
export type RotationState = "active" | "handoff" | "staged";
export type CrewRole = { id: CrewRoleId; label: string; shortLabel: string };
export type ReadinessState = { id: ReadinessId; label: string; summary: string };
export type CrewTeam = { id: string; name: string; bay: string; mission: string; watch: string; cadence: string; tags: string[] };
export type CrewMember = { id: string; name: string; callsign: string; teamId: CrewTeam["id"]; roleId: CrewRoleId; readinessId: ReadinessId; specialty: string; note: string };
export type DutyRotation = { id: string; label: string; window: string; teamId: CrewTeam["id"]; state: RotationState; objective: string; handoff: string; leadId: CrewMember["id"]; supportIds: CrewMember["id"][]; notes: string[] };

export const crewRoles: CrewRole[] = [
  { id: "navigation", label: "Navigation", shortLabel: "Nav" },
  { id: "systems", label: "Systems", shortLabel: "Sys" },
  { id: "medical", label: "Medical", shortLabel: "Med" },
  { id: "security", label: "Security", shortLabel: "Sec" },
];
export const readinessStates: ReadinessState[] = [
  { id: "ready", label: "Ready", summary: "Cleared for current watch" },
  { id: "steady", label: "Steady", summary: "On console with reduced load" },
  { id: "recovery", label: "Recovery", summary: "Off-peak support only" },
];
export const crewTeams: CrewTeam[] = [
  { id: "atlas", name: "Atlas Flight", bay: "Dock A-3", mission: "Launch deck routing, escort windows, and queue sequencing.", watch: "Blue watch", cadence: "00:00-06:00 UTC", tags: ["Launch deck", "Priority cargo"] },
  { id: "beacon", name: "Beacon Relay", bay: "Med Ring 2", mission: "Passenger stabilisation, corridor relays, and infirmary handoffs.", watch: "Gold watch", cadence: "02:00-08:00 UTC", tags: ["Med relay", "Inbound triage"] },
  { id: "cinder", name: "Cinder Span", bay: "Engine Spine", mission: "Coolant balance, reactor trim, and systems fault isolation.", watch: "Red watch", cadence: "04:00-10:00 UTC", tags: ["Coolant grid", "Maintenance lock"] },
  { id: "drift", name: "Drift Guard", bay: "Outer Lock 5", mission: "Perimeter escort, deck sweeps, and access control coverage.", watch: "Slate watch", cadence: "06:00-12:00 UTC", tags: ["Perimeter", "Visitor screening"] },
];
export const crewMembers: CrewMember[] = [
  { id: "mara-quin", name: "Mara Quin", callsign: "Keel", teamId: "atlas", roleId: "navigation", readinessId: "ready", specialty: "Orbital docking", note: "Holding launch queue." },
  { id: "ivo-senn", name: "Ivo Senn", callsign: "Latch", teamId: "atlas", roleId: "systems", readinessId: "steady", specialty: "Thruster trim", note: "Balancing gate pressure." },
  { id: "talia-reed", name: "Talia Reed", callsign: "Ward", teamId: "atlas", roleId: "security", readinessId: "ready", specialty: "Escort lanes", note: "Covering cargo escort." },
  { id: "lena-osei", name: "Lena Osei", callsign: "Pulse", teamId: "beacon", roleId: "medical", readinessId: "ready", specialty: "Rapid triage", note: "Lead for med ring handoff." },
  { id: "jules-park", name: "Jules Park", callsign: "Kite", teamId: "beacon", roleId: "navigation", readinessId: "steady", specialty: "Shuttle relay", note: "Holding corridor routing." },
  { id: "orin-vale", name: "Orin Vale", callsign: "Flux", teamId: "beacon", roleId: "systems", readinessId: "recovery", specialty: "Cabin telemetry", note: "On reduced console load." },
  { id: "sora-keene", name: "Sora Keene", callsign: "Ember", teamId: "cinder", roleId: "systems", readinessId: "ready", specialty: "Reactor trim", note: "Lead on coolant pulse." },
  { id: "dev-malik", name: "Dev Malik", callsign: "Hush", teamId: "cinder", roleId: "security", readinessId: "steady", specialty: "Access rings", note: "Watching maintenance lock." },
  { id: "mira-ilyan", name: "Mira Ilyan", callsign: "Suture", teamId: "cinder", roleId: "medical", readinessId: "ready", specialty: "Fatigue recovery", note: "Supporting rest corridor." },
  { id: "noor-hale", name: "Noor Hale", callsign: "Harbor", teamId: "drift", roleId: "security", readinessId: "ready", specialty: "Gate screening", note: "Lead for outer lock checks." },
  { id: "ezra-pike", name: "Ezra Pike", callsign: "Span", teamId: "drift", roleId: "navigation", readinessId: "ready", specialty: "Approach vectors", note: "Tracking escort windows." },
  { id: "cass-wynn", name: "Cass Wynn", callsign: "Rivet", teamId: "drift", roleId: "systems", readinessId: "steady", specialty: "Sensor sweep", note: "Monitoring gate mesh." },
];
export const dutyRotations: DutyRotation[] = [
  { id: "north-span", label: "North Span Watch", window: "04:00-06:00 UTC", teamId: "atlas", state: "active", objective: "Keep launch deck sequencing stable while freight escorts clear Dock A.", handoff: "Transfer to Beacon corridor when passenger surge reaches gate three.", leadId: "mara-quin", supportIds: ["ivo-senn", "talia-reed"], notes: ["Cargo escort staggered by six minutes.", "Throttle handoff stays on manual confirmation."] },
  { id: "triage-loop", label: "Triage Loop", window: "05:30-07:30 UTC", teamId: "beacon", state: "handoff", objective: "Stabilise inbound passenger flow and keep med ring relay below two-minute dwell.", handoff: "Rotate cabin telemetry to Cinder once infirmary intake drops under twelve.", leadId: "lena-osei", supportIds: ["jules-park", "orin-vale"], notes: ["Medical kits already staged at ring two.", "Reduced load on systems console remains in effect."] },
  { id: "coolant-pulse", label: "Coolant Pulse", window: "07:00-09:00 UTC", teamId: "cinder", state: "staged", objective: "Balance reactor draw before maintenance crews reopen the engine spine.", handoff: "Release lock only after sensor delta stays flat for two consecutive scans.", leadId: "sora-keene", supportIds: ["dev-malik", "mira-ilyan"], notes: ["Security stays posted on maintenance lock.", "Recovery corridor remains open for technical crews."] },
  { id: "outer-lantern", label: "Outer Lantern", window: "08:30-10:30 UTC", teamId: "drift", state: "staged", objective: "Sweep perimeter lanes and hold visitor screening coverage through arrivals peak.", handoff: "Promote to live watch if gate five queue exceeds threshold.", leadId: "noor-hale", supportIds: ["ezra-pike", "cass-wynn"], notes: ["Escort lane two is reserved for diplomatic arrivals.", "Sensor mesh refresh remains on ten-minute cadence."] },
];
export const rosterSummary = { cycleLabel: "Cycle 7 / Dockside Rotation", activeRotationId: "north-span", handoffAt: "05:45 UTC", readinessNote: "Nine crew cleared for active coverage across four isolated teams." };
