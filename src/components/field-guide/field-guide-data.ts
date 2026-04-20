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

export const playbookStatuses = ["Draft", "In Review", "Published"] as const;

export const rehearsalStatuses = [
  "Needs Revision",
  "Ready to Rehearse",
  "Scheduled",
] as const;

export const playbookModes = ["Custom", "Remix"] as const;

export const playbookStepPhases = ["Brief", "Execute", "Verify"] as const;

export const procedureTags = [
  "briefing",
  "handoff",
  "safety",
  "cold-chain",
  "networking",
  "maintenance",
  "response",
  "rollback",
  "telemetry",
  "verification",
  "coordination",
  "downtime",
] as const;

export type ProcedureTeam = (typeof procedureTeams)[number];
export type ProcedureDifficulty = (typeof procedureDifficulties)[number];
export type ProcedureStatus = (typeof procedureStatuses)[number];
export type PlaybookStatus = (typeof playbookStatuses)[number];
export type RehearsalStatus = (typeof rehearsalStatuses)[number];
export type PlaybookMode = (typeof playbookModes)[number];
export type PlaybookStepPhase = (typeof playbookStepPhases)[number];

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
  tags: string[];
  tools: string[];
  checklist: ProcedureStep[];
};

export type PlaybookStep = {
  id: string;
  label: string;
  detail: string;
  phase: PlaybookStepPhase;
  owner: string;
  duration: string;
  expectedSignal: string;
  rehearsalTip: string;
};

export type DraftMetadata = {
  version: string;
  owner: string;
  reviewers: string[];
  changeSummary: string;
  reviewWindow: string;
  publishWindow: string;
  rehearsalWindow: string;
  lastSaved: string;
};

export type SavedPlaybook = {
  id: string;
  sourceProcedureId: string;
  title: string;
  summary: string;
  team: ProcedureTeam;
  difficulty: ProcedureDifficulty;
  status: PlaybookStatus;
  rehearsalStatus: RehearsalStatus;
  authoringMode: PlaybookMode;
  objective: string;
  audience: string;
  rehearsalFocus: string;
  duration: string;
  cadence: string;
  location: string;
  lastUpdated: string;
  lastRehearsed: string;
  notes: string;
  tags: string[];
  tools: string[];
  checkpoints: string[];
  metadata: DraftMetadata;
  steps: PlaybookStep[];
};

export const procedures: Procedure[] = [
  {
    id: "fiber-uplink-recovery",
    title: "Fiber Uplink Recovery",
    summary:
      "Restore the rooftop uplink after packet loss spikes without dropping the backup path.",
    team: "Network Ops",
    difficulty: "Advanced",
    status: "Ready",
    duration: "22 min",
    cadence: "Weekly drill",
    location: "Roof access cabinet B2",
    lastUpdated: "April 12, 2026",
    notes:
      "Keep the microwave failover online until the final packet capture review is complete and the handoff recorder signs off.",
    tags: ["networking", "response", "rollback", "verification"],
    tools: ["Loopback tester", "Patch labels", "Spare SFP kit"],
    checklist: [
      {
        id: "confirm-alert-window",
        label: "Confirm alert window",
        detail: "Cross-check NOC timestamps with the edge switch log.",
      },
      {
        id: "inspect-fiber-tray",
        label: "Inspect tray and jumper seating",
        detail:
          "Verify strain relief and reseat any mismatched jumper pair before touching the live uplink.",
      },
      {
        id: "validate-primary-return",
        label: "Validate the primary return",
        detail:
          "Capture five clean minutes of traffic before retiring failover and closing the incident note.",
      },
    ],
  },
  {
    id: "cold-chain-isolation",
    title: "Cold Chain Isolation",
    summary:
      "Stabilize the vaccine storage loop during a compressor fault without warming bay inventory.",
    team: "Facilities",
    difficulty: "Intermediate",
    status: "In Review",
    duration: "18 min",
    cadence: "Biweekly",
    location: "Lower level refrigeration plant",
    lastUpdated: "April 9, 2026",
    notes:
      "Record ambient readings at each checkpoint so maintenance can compare drift later and decide whether the temporary cooling loop stays online.",
    tags: ["cold-chain", "safety", "maintenance", "coordination"],
    tools: ["Thermal probe", "Valve key", "Insulated tags"],
    checklist: [
      {
        id: "isolate-compressor-bank",
        label: "Isolate the flagged compressor bank",
        detail:
          "Close the bypass pair in sequence to prevent pressure rebound while the escort keeps aisles clear.",
      },
      {
        id: "stage-portable-cooling",
        label: "Stage portable cooling",
        detail:
          "Keep a clear aisle so inventory carts can still rotate through receiving without blocking the service tech.",
      },
      {
        id: "handoff-maintenance",
        label: "Handoff to maintenance",
        detail:
          "Attach the alarm code and your temperature notes to the ticket before the maintenance lead takes over.",
      },
    ],
  },
  {
    id: "dock-safety-sweep",
    title: "Dock Safety Sweep",
    summary:
      "Run the opening safety sweep before inbound trailers are released to the dock.",
    team: "Operations",
    difficulty: "Beginner",
    status: "Ready",
    duration: "12 min",
    cadence: "Daily open",
    location: "North receiving dock",
    lastUpdated: "April 15, 2026",
    notes:
      "Treat blocked egress and cracked wheel stops as no-go findings until cleared by the lead and dispatch acknowledges the hold.",
    tags: ["safety", "handoff", "briefing"],
    tools: ["Flashlight", "Barrier cones", "Dock checklist card"],
    checklist: [
      {
        id: "inspect-lane-markings",
        label: "Inspect lane markings",
        detail:
          "Replace any missing cone set before opening a lane to a carrier and call out exceptions over the dock brief.",
      },
      {
        id: "verify-egress-paths",
        label: "Verify egress paths",
        detail:
          "Clear staged pallets that drifted into the pedestrian route overnight and tag the aisle if further cleanup is needed.",
      },
      {
        id: "log-first-shift-brief",
        label: "Log the first-shift brief",
        detail:
          "Call out restricted lanes so dispatch does not assign them and record the release time for the shift log.",
      },
    ],
  },
  {
    id: "sensor-mast-hot-swap",
    title: "Sensor Mast Hot Swap",
    summary:
      "Replace a weather mast payload while keeping the remote feed online for command.",
    team: "Platform",
    difficulty: "Advanced",
    status: "Ready",
    duration: "26 min",
    cadence: "Monthly",
    location: "Training lot mast array",
    lastUpdated: "April 11, 2026",
    notes:
      "If the backup pod takes more than two minutes to register, abort and roll back before the mast team opens the mount.",
    tags: ["telemetry", "maintenance", "rollback", "verification"],
    tools: ["Harness", "Spare pod", "Weather cap"],
    checklist: [
      {
        id: "inspect-seal",
        label: "Inspect mast seal and tether line",
        detail:
          "Confirm the tether has no fraying before releasing the payload bracket or exposing the open connector.",
      },
      {
        id: "promote-backup-feed",
        label: "Promote the backup feed",
        detail:
          "Wait for two healthy telemetry pings before the physical swap and record the exact takeover time.",
      },
      {
        id: "verify-calibration",
        label: "Verify live calibration",
        detail:
          "Compare readings to the nearby control mast for one minute before declaring the mast ready for command.",
      },
    ],
  },
  {
    id: "intake-downtime-handoff",
    title: "Intake Downtime Handoff",
    summary:
      "Move specimen intake to a paper queue during LIS downtime and preserve custody notes.",
    team: "Lab",
    difficulty: "Intermediate",
    status: "Draft",
    duration: "16 min",
    cadence: "Quarterly rehearsal",
    location: "Specimen intake window",
    lastUpdated: "April 8, 2026",
    notes:
      "Flag controlled samples separately so they receive immediate reconciliation after recovery and are visible to the post-downtime audit.",
    tags: ["handoff", "response", "downtime", "coordination"],
    tools: ["Downtime packet", "Barcode labels", "Custody seals"],
    checklist: [
      {
        id: "start-paper-log",
        label: "Start the paper accession log",
        detail:
          "Record the downtime start time before first intake and assign a runner to keep the queue moving.",
      },
      {
        id: "tag-priority-samples",
        label: "Tag STAT and controlled samples",
        detail:
          "Use red seals so the catch-up team can separate them quickly when the LIS recovers.",
      },
      {
        id: "handoff-recovery-sheet",
        label: "Handoff the reconciliation sheet",
        detail:
          "Pair each paper row with the matching downtime barcode before the post-recovery lead signs off.",
      },
    ],
  },
];

export const savedPlaybooks: SavedPlaybook[] = [
  {
    id: "playbook-rooftop-link-recovery",
    sourceProcedureId: "fiber-uplink-recovery",
    title: "Rooftop Link Recovery Drill",
    summary:
      "A guided rehearsal for recovering the primary rooftop uplink while keeping comms, verification, and rollback ownership explicit.",
    team: "Network Ops",
    difficulty: "Advanced",
    status: "Published",
    rehearsalStatus: "Ready to Rehearse",
    authoringMode: "Remix",
    objective:
      "Rehearse the failover-to-primary recovery flow with explicit NOC narration, packet verification, and rollback gates.",
    audience:
      "On-call network leads, incident coordinators, and field technicians rotating into rooftop access duty.",
    rehearsalFocus:
      "Escalation timing, packet-capture evidence, and the final call to retire failover without cutting over too early.",
    duration: "30 min",
    cadence: "Monthly live drill",
    location: "Roof access cabinet B2",
    lastUpdated: "April 18, 2026",
    lastRehearsed: "April 16, 2026",
    notes:
      "Use the backup microwave path as the scenario anchor and insert a mock stakeholder interruption before the verify phase.",
    tags: ["networking", "rollback", "verification", "coordination"],
    tools: ["Loopback tester", "Spare SFP kit", "Packet capture sheet"],
    checkpoints: [
      "State who owns the live traffic path before any reseat begins.",
      "Call out the packet-loss threshold that allows the primary link to return.",
      "Confirm the rollback trigger before the final failover retirement.",
    ],
    metadata: {
      version: "v1.0",
      owner: "Mina Patel",
      reviewers: ["Chris Lopez", "Tariq Sanders"],
      changeSummary:
        "Added a dedicated verification phase and clarified the rollback decision point for the rooftop team.",
      reviewWindow: "April 17, 2026 10:00 UTC",
      publishWindow: "April 18, 2026 15:30 UTC",
      rehearsalWindow: "April 22, 2026 09:00 UTC",
      lastSaved: "April 18, 2026 15:30 UTC",
    },
    steps: [
      {
        id: "roof-brief",
        label: "Frame the fault window",
        detail:
          "Review the alert timeline, confirm the backup path is steady, and assign the rooftop lead before anyone touches the cabinet.",
        phase: "Brief",
        owner: "Incident coordinator",
        duration: "5 min",
        expectedSignal: "Failover path stable and rooftop access cleared",
        rehearsalTip:
          "Pause here and ask who can stop the drill if the backup path starts to degrade.",
      },
      {
        id: "roof-reseat",
        label: "Re-seat the primary optic path",
        detail:
          "Inspect the jumper pair, swap the questionable optic, and narrate each change to the remote watcher keeping packet captures.",
        phase: "Execute",
        owner: "Field technician",
        duration: "12 min",
        expectedSignal: "Primary interface returns with clean light levels",
        rehearsalTip:
          "Force the team to name the exact moment a rollback becomes safer than continuing the swap.",
      },
      {
        id: "roof-verify",
        label: "Retire failover with evidence",
        detail:
          "Capture five steady minutes, verify alerts have cleared, and close with the NOC before handing the site back.",
        phase: "Verify",
        owner: "NOC lead",
        duration: "13 min",
        expectedSignal: "Five minutes of clean traffic and cleared alerts",
        rehearsalTip:
          "Have the moderator challenge whether the evidence is strong enough to retire failover.",
      },
    ],
  },
  {
    id: "playbook-cold-chain-tabletop",
    sourceProcedureId: "cold-chain-isolation",
    title: "Cold Chain Fault Tabletop",
    summary:
      "Draft tabletop script for compressor isolation, escort control, and temperature-note handoff during a cold-chain fault.",
    team: "Facilities",
    difficulty: "Intermediate",
    status: "In Review",
    rehearsalStatus: "Scheduled",
    authoringMode: "Custom",
    objective:
      "Pressure-test the facilities response to a compressor fault while inventory movement and maintenance dispatch happen in parallel.",
    audience:
      "Facilities leads, receiving supervisors, and the maintenance scheduler supporting cold-chain incidents.",
    rehearsalFocus:
      "Aisle control, ambient-reading discipline, and the handoff from the escort role to the maintenance lead.",
    duration: "24 min",
    cadence: "Biweekly tabletop",
    location: "Lower level refrigeration plant",
    lastUpdated: "April 17, 2026",
    lastRehearsed: "April 10, 2026",
    notes:
      "The draft still needs a clearer turn for the receiving lead when carts start backing up during the portable cooling stage.",
    tags: ["cold-chain", "safety", "maintenance", "coordination"],
    tools: ["Thermal probe", "Portable cooling cart", "Fault escalation card"],
    checkpoints: [
      "Assign an aisle escort before the compressor bank is touched.",
      "Capture an ambient reading at each stage handoff.",
      "Close with a maintenance-ready note set rather than a verbal-only summary.",
    ],
    metadata: {
      version: "v0.7",
      owner: "Ari Velasquez",
      reviewers: ["Mona Reed", "Priya Iyer"],
      changeSummary:
        "Expanded the escort lane callouts and added receiving-side prompts before the final review pass.",
      reviewWindow: "April 18, 2026 13:00 UTC",
      publishWindow: "Pending review",
      rehearsalWindow: "April 24, 2026 08:30 UTC",
      lastSaved: "April 17, 2026 18:15 UTC",
    },
    steps: [
      {
        id: "cold-brief",
        label: "Brief the escort lane",
        detail:
          "Review the alarm, assign a runner, and make sure inventory carts know which aisle remains open during the isolation.",
        phase: "Brief",
        owner: "Facilities lead",
        duration: "6 min",
        expectedSignal: "Escort route acknowledged by receiving and facilities",
        rehearsalTip:
          "Ask the room what happens if the aisle escort is unavailable halfway through the isolation.",
      },
      {
        id: "cold-stage",
        label: "Stage portable cooling and isolate",
        detail:
          "Walk through the bypass order, position portable cooling, and narrate how temperature notes are captured live.",
        phase: "Execute",
        owner: "Cooling tech",
        duration: "10 min",
        expectedSignal: "Temperature drift stays within the agreed tabletop threshold",
        rehearsalTip:
          "Insert a distraction from receiving so the team must decide whether to pause or continue the isolation.",
      },
      {
        id: "cold-handoff",
        label: "Handoff with maintenance-ready notes",
        detail:
          "Package the alarm code, ambient readings, and escort observations into the maintenance ticket and review the open questions.",
        phase: "Verify",
        owner: "Maintenance scheduler",
        duration: "8 min",
        expectedSignal: "Complete handoff packet acknowledged by maintenance",
        rehearsalTip:
          "Have the maintenance reviewer reject vague notes so the author sees where the script still needs work.",
      },
    ],
  },
  {
    id: "playbook-downtime-intake-rehearsal",
    sourceProcedureId: "intake-downtime-handoff",
    title: "Specimen Intake Downtime Rehearsal",
    summary:
      "Draft playbook for paper logging, controlled-sample handling, and the recovery-sheet review after LIS downtime.",
    team: "Lab",
    difficulty: "Intermediate",
    status: "Draft",
    rehearsalStatus: "Needs Revision",
    authoringMode: "Remix",
    objective:
      "Make downtime intake rehearsals consistent by clarifying who owns the paper log, red-seal marking, and final reconciliation sheet.",
    audience:
      "Specimen intake staff, lab leads, and the recovery coordinator who owns barcode reconciliation.",
    rehearsalFocus:
      "Queue clarity, controlled-sample separation, and the final reconciliation handoff once systems recover.",
    duration: "20 min",
    cadence: "Quarterly rehearsal",
    location: "Specimen intake window",
    lastUpdated: "April 19, 2026",
    lastRehearsed: "Not yet rehearsed",
    notes:
      "Still missing a reviewer-approved closeout step for samples that arrived during the final five minutes of downtime.",
    tags: ["downtime", "handoff", "response", "coordination"],
    tools: ["Downtime packet", "Custody seals", "Runner clipboard"],
    checkpoints: [
      "Start the paper queue with a named owner and visible downtime start time.",
      "Separate controlled samples from the general intake flow before the queue grows.",
      "End with a reconciliation sheet the recovery coordinator can work from immediately.",
    ],
    metadata: {
      version: "v0.3",
      owner: "Devika Shah",
      reviewers: ["Hannah Cho"],
      changeSummary:
        "Added a runner role, clarified sample segregation, and left the recovery closeout open for reviewer feedback.",
      reviewWindow: "April 21, 2026 11:00 UTC",
      publishWindow: "Pending review",
      rehearsalWindow: "TBD after reviewer sign-off",
      lastSaved: "April 19, 2026 20:45 UTC",
    },
    steps: [
      {
        id: "lab-brief",
        label: "Assign the downtime runner",
        detail:
          "Review the outage start time, assign the paper-log owner, and place the runner where incoming samples can still be triaged.",
        phase: "Brief",
        owner: "Intake lead",
        duration: "5 min",
        expectedSignal: "Paper queue launched with visible ownership",
        rehearsalTip:
          "Ask who notices first if the paper log stops matching the physical queue.",
      },
      {
        id: "lab-tag",
        label: "Separate controlled and STAT samples",
        detail:
          "Use red seals, announce priority samples aloud, and walk through how the runner keeps the queue from mixing.",
        phase: "Execute",
        owner: "Runner",
        duration: "8 min",
        expectedSignal: "Priority samples are visibly separated and logged",
        rehearsalTip:
          "Introduce a late-arriving STAT sample to confirm the team keeps the same cadence under pressure.",
      },
      {
        id: "lab-verify",
        label: "Review the recovery sheet",
        detail:
          "Stage the reconciliation sheet, pair rows to downtime barcodes, and note the unresolved edge cases for the recovery lead.",
        phase: "Verify",
        owner: "Recovery coordinator",
        duration: "7 min",
        expectedSignal: "Recovery coordinator accepts the sheet without clarifying questions",
        rehearsalTip:
          "Have the reviewer point out the missing final five-minute closeout to justify the current draft status.",
      },
    ],
  },
  {
    id: "playbook-dock-lane-reopen",
    sourceProcedureId: "dock-safety-sweep",
    title: "Dock Lane Reopen Review",
    summary:
      "Published playbook for opening-shift dock sweeps with explicit lane release language and dispatch acknowledgment.",
    team: "Operations",
    difficulty: "Beginner",
    status: "Published",
    rehearsalStatus: "Scheduled",
    authoringMode: "Custom",
    objective:
      "Keep opening-shift safety sweeps consistent by making the release, restriction, and dispatch acknowledgment sequence explicit.",
    audience:
      "Dock leads, dispatch coordinators, and floor supervisors covering the first inbound window.",
    rehearsalFocus:
      "Release authority, lane restrictions, and how exceptions get carried into the first-shift brief.",
    duration: "15 min",
    cadence: "Weekly rehearsal",
    location: "North receiving dock",
    lastUpdated: "April 14, 2026",
    lastRehearsed: "April 14, 2026",
    notes:
      "Works well as a starter playbook because it keeps the choreography simple while still testing release authority.",
    tags: ["safety", "briefing", "handoff"],
    tools: ["Barrier cones", "Release board", "Shift note card"],
    checkpoints: [
      "Make the first lane release audible to dispatch.",
      "Keep restricted lanes visibly marked through the shift brief.",
      "Log who acknowledges the release before trucks are assigned.",
    ],
    metadata: {
      version: "v1.2",
      owner: "Luis Moreno",
      reviewers: ["Cara Bell", "Jordan Hunt"],
      changeSummary:
        "Tightened the dispatch acknowledgment wording and added a visible release board checkpoint.",
      reviewWindow: "April 11, 2026 09:00 UTC",
      publishWindow: "April 14, 2026 12:00 UTC",
      rehearsalWindow: "April 25, 2026 07:00 UTC",
      lastSaved: "April 14, 2026 12:00 UTC",
    },
    steps: [
      {
        id: "dock-brief",
        label: "Set the release board",
        detail:
          "Mark restricted lanes, confirm cones are in place, and name the person who will call the first release to dispatch.",
        phase: "Brief",
        owner: "Dock lead",
        duration: "4 min",
        expectedSignal: "Visible release board matches the floor state",
        rehearsalTip:
          "Ask the group which restriction would stop the first release entirely.",
      },
      {
        id: "dock-execute",
        label: "Walk and release the safe lanes",
        detail:
          "Inspect egress paths, check wheel stops, and announce the safe lanes with the same language used in production.",
        phase: "Execute",
        owner: "Floor supervisor",
        duration: "6 min",
        expectedSignal: "Dispatch repeats the released lanes back without correction",
        rehearsalTip:
          "Insert an interrupted radio call so the release language has to be repeated cleanly.",
      },
      {
        id: "dock-verify",
        label: "Close in the first-shift brief",
        detail:
          "Carry any restrictions into the first-shift brief and confirm the shift log matches the release board before trucks arrive.",
        phase: "Verify",
        owner: "Dispatch coordinator",
        duration: "5 min",
        expectedSignal: "Shift log and release board stay in sync",
        rehearsalTip:
          "Have the moderator ask whether the log alone is enough without the release board.",
      },
    ],
  },
];
