export const procedureTeams = [
  "Network Ops",
  "Facilities",
  "Operations",
  "Platform",
  "Lab",
] as const;

export const procedureDifficulties = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const procedureStatuses = ["Ready", "In Review", "Draft"] as const;

export const procedureTags = [
  "handoff",
  "safety",
  "cold-chain",
  "networking",
  "maintenance",
  "response",
  "rollback",
  "telemetry",
] as const;

export type ProcedureTeam = (typeof procedureTeams)[number];
export type ProcedureDifficulty = (typeof procedureDifficulties)[number];
export type ProcedureStatus = (typeof procedureStatuses)[number];

export type ProcedureStep = {
  id: string;
  label: string;
  detail: string;
};

export type Procedure = {
  id: string;
  title: string;
  summary: string;
  team: ProcedureTeam;
  difficulty: ProcedureDifficulty;
  status: ProcedureStatus;
  duration: string;
  cadence: string;
  location: string;
  lastUpdated: string;
  notes: string;
  tags: readonly string[];
  tools: readonly string[];
  checklist: readonly ProcedureStep[];
};

export const procedures: readonly Procedure[] = [
  {
    id: "fiber-uplink-recovery",
    title: "Fiber Uplink Recovery",
    summary: "Restore the rooftop uplink after packet loss spikes without dropping the backup path.",
    team: "Network Ops",
    difficulty: "Advanced",
    status: "Ready",
    duration: "22 min",
    cadence: "Weekly drill",
    location: "Roof access cabinet B2",
    lastUpdated: "April 12, 2026",
    notes: "Keep the microwave failover online until the final packet capture review is complete.",
    tags: ["networking", "response", "rollback"],
    tools: ["Loopback tester", "Patch labels", "Spare SFP kit"],
    checklist: [
      { id: "confirm-alert-window", label: "Confirm alert window", detail: "Cross-check NOC timestamps with the edge switch log." },
      { id: "inspect-fiber-tray", label: "Inspect tray and jumper seating", detail: "Verify strain relief and reseat any mismatched jumper pair." },
      { id: "validate-primary-return", label: "Validate the primary return", detail: "Capture five clean minutes of traffic before retiring failover." },
    ],
  },
  {
    id: "cold-chain-isolation",
    title: "Cold Chain Isolation",
    summary: "Stabilize the vaccine storage loop during a compressor fault without warming bay inventory.",
    team: "Facilities",
    difficulty: "Intermediate",
    status: "In Review",
    duration: "18 min",
    cadence: "Biweekly",
    location: "Lower level refrigeration plant",
    lastUpdated: "April 9, 2026",
    notes: "Record ambient readings at each checkpoint so maintenance can compare drift later.",
    tags: ["cold-chain", "safety", "maintenance"],
    tools: ["Thermal probe", "Valve key", "Insulated tags"],
    checklist: [
      { id: "isolate-compressor-bank", label: "Isolate the flagged compressor bank", detail: "Close the bypass pair in sequence to prevent pressure rebound." },
      { id: "stage-portable-cooling", label: "Stage portable cooling", detail: "Keep a clear aisle so inventory carts can still rotate through receiving." },
      { id: "handoff-maintenance", label: "Handoff to maintenance", detail: "Attach the alarm code and your temperature notes to the ticket." },
    ],
  },
  {
    id: "dock-safety-sweep",
    title: "Dock Safety Sweep",
    summary: "Run the opening safety sweep before inbound trailers are released to the dock.",
    team: "Operations",
    difficulty: "Beginner",
    status: "Ready",
    duration: "12 min",
    cadence: "Daily open",
    location: "North receiving dock",
    lastUpdated: "April 15, 2026",
    notes: "Treat blocked egress and cracked wheel stops as no-go findings until cleared.",
    tags: ["safety", "handoff"],
    tools: ["Flashlight", "Barrier cones", "Dock checklist card"],
    checklist: [
      { id: "inspect-lane-markings", label: "Inspect lane markings", detail: "Replace any missing cone set before opening a lane to a carrier." },
      { id: "verify-egress-paths", label: "Verify egress paths", detail: "Clear staged pallets that drifted into the pedestrian route overnight." },
      { id: "log-first-shift-brief", label: "Log the first-shift brief", detail: "Call out restricted lanes so dispatch does not assign them." },
    ],
  },
  {
    id: "sensor-mast-hot-swap",
    title: "Sensor Mast Hot Swap",
    summary: "Replace a weather mast payload while keeping the remote feed online for command.",
    team: "Platform",
    difficulty: "Advanced",
    status: "Ready",
    duration: "26 min",
    cadence: "Monthly",
    location: "Training lot mast array",
    lastUpdated: "April 11, 2026",
    notes: "If the backup pod takes more than two minutes to register, abort and roll back.",
    tags: ["telemetry", "maintenance", "rollback"],
    tools: ["Harness", "Spare pod", "Weather cap"],
    checklist: [
      { id: "inspect-seal", label: "Inspect mast seal and tether line", detail: "Confirm the tether has no fraying before releasing the payload bracket." },
      { id: "promote-backup-feed", label: "Promote the backup feed", detail: "Wait for two healthy telemetry pings before the physical swap." },
      { id: "verify-calibration", label: "Verify live calibration", detail: "Compare readings to the nearby control mast for one minute." },
    ],
  },
  {
    id: "intake-downtime-handoff",
    title: "Intake Downtime Handoff",
    summary: "Move specimen intake to a paper queue during LIS downtime and preserve custody notes.",
    team: "Lab",
    difficulty: "Intermediate",
    status: "Draft",
    duration: "16 min",
    cadence: "Quarterly rehearsal",
    location: "Specimen intake window",
    lastUpdated: "April 8, 2026",
    notes: "Flag controlled samples separately so they receive immediate reconciliation after recovery.",
    tags: ["handoff", "response"],
    tools: ["Downtime packet", "Barcode labels", "Custody seals"],
    checklist: [
      { id: "start-paper-log", label: "Start the paper accession log", detail: "Record the downtime start time before first intake." },
      { id: "tag-priority-samples", label: "Tag STAT and controlled samples", detail: "Use red seals so the catch-up team can separate them quickly." },
      { id: "handoff-recovery-sheet", label: "Handoff the reconciliation sheet", detail: "Pair each paper row with the matching downtime barcode." },
    ],
  },
];
