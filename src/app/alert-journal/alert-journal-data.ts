export const alertSeverityValues = ["critical", "high", "medium", "low"] as const;
export type AlertSeverity = (typeof alertSeverityValues)[number];

export const resolutionStateValues = ["open", "monitoring", "resolved"] as const;
export type ResolutionState = (typeof resolutionStateValues)[number];

export type AlertJournalAlert = {
  id: string;
  startedAt: string;
  title: string;
  summary: string;
  service: string;
  zone: string;
  severity: AlertSeverity;
  owner: string;
  nextStep: string;
  initialResolution: ResolutionState;
  tags: string[];
};

export type AlertJournalDay = {
  id: string;
  label: string;
  dateLabel: string;
  handoffWindow: string;
  note: string;
  alerts: AlertJournalAlert[];
};

export const severityOptions = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
] as const;

export const resolutionOptions = [
  { value: "open", label: "Open" },
  { value: "monitoring", label: "Monitoring" },
  { value: "resolved", label: "Resolved" },
] as const;

function createAlert(
  id: string,
  startedAt: string,
  title: string,
  summary: string,
  service: string,
  zone: string,
  severity: AlertSeverity,
  owner: string,
  nextStep: string,
  initialResolution: ResolutionState,
  tags: string[],
): AlertJournalAlert {
  return { id, startedAt, title, summary, service, zone, severity, owner, nextStep, initialResolution, tags };
}

function createDay(
  id: string,
  label: string,
  dateLabel: string,
  handoffWindow: string,
  note: string,
  alerts: AlertJournalAlert[],
): AlertJournalDay {
  return { id, label, dateLabel, handoffWindow, note, alerts };
}

export const alertJournalDays: AlertJournalDay[] = [
  createDay("sat-19", "Today", "Sat 19 Apr", "03:00 to 11:00 UTC", "Ingress pressure peaked during handoff and two alerts still need a closeout marker.", [
    createAlert("aj-101", "04:12 UTC", "Satellite uplink drift breached packet threshold", "Relay Mesh 4 crossed sustained packet loss above the handoff threshold for eight minutes.", "Relay Mesh 4", "Polar corridor", "critical", "Comms watch", "Re-lock beam alignment before the 05:00 verification pass.", "open", ["packet loss", "handoff"]),
    createAlert("aj-102", "05:36 UTC", "Thermal spike on vault inverter pair", "The inverter pair trended 7C over baseline after the backup rail picked up morning load.", "Vault power ring", "East rack lane", "high", "Facilities", "Keep bypass fans staged until the next telemetry sweep settles.", "monitoring", ["thermal", "power"]),
    createAlert("aj-103", "07:02 UTC", "Credential replay blocked on support proxy", "Replay attempts were stopped locally, but the offending support key still needs rotation.", "Support proxy", "Edge auth tier", "medium", "Identity team", "Rotate the service credential and confirm no secondary retries appear.", "open", ["auth", "proxy"]),
    createAlert("aj-104", "08:41 UTC", "Queue depth warning on intake parser", "Backlog expanded during the morning burst and drained after a worker rebalance.", "Intake parser", "North ingest", "low", "Data ops", "Leave the extra worker online through the next upload pulse.", "resolved", ["queue", "ingest"]),
  ]),
  createDay("fri-18", "Yesterday", "Fri 18 Apr", "11:00 to 19:00 UTC", "Volume stayed higher than normal, but the shift closed without a critical escalation.", [
    createAlert("aj-201", "11:28 UTC", "Replication lag climbed past audit tolerance", "Audit replicas in the western pool lagged 94 seconds behind the primary trail.", "Audit replicas", "West pool", "high", "Platform DB", "Keep catch-up mode active until lag falls below 20 seconds.", "monitoring", ["replication", "audit"]),
    createAlert("aj-202", "13:11 UTC", "Unauthorized device registration attempt", "A staged kiosk fingerprint failed attestation and was denied before enrollment completed.", "Registration broker", "Dock access", "high", "Endpoint security", "Review the failed fingerprint and hold the staging lane until cleared.", "open", ["device", "attestation"]),
    createAlert("aj-203", "16:05 UTC", "Operator note mismatch on change ledger", "The ledger write succeeded, but the attached shift note referenced the wrong fallback plan.", "Change ledger", "Ops archive", "medium", "Shift lead", "Correct the note chain before exporting the daily packet.", "resolved", ["ledger", "notes"]),
    createAlert("aj-204", "18:17 UTC", "Bandwidth watch triggered on training mirror", "Mirror traffic briefly exceeded the usual test window after delayed media sync.", "Training mirror", "South edge", "low", "Infra support", "Throttle nonessential sync jobs during the next overlap.", "resolved", ["bandwidth", "sync"]),
  ]),
  createDay("thu-17", "Thu 17", "Thu 17 Apr", "19:00 to 03:00 UTC", "Earlier alerts are quieter now, but one corridor still carries elevated risk into the weekend.", [
    createAlert("aj-301", "19:46 UTC", "Sensor corridor dropouts repeated across three relays", "Dropouts repeated after the corridor switched to the backup relay chain during weather shear.", "Field relay chain", "North ridge", "critical", "Telemetry team", "Keep the backup chain pinned until the ridge path validates cleanly.", "monitoring", ["sensors", "weather"]),
    createAlert("aj-302", "21:09 UTC", "Drift warning on clock sync broker", "Broker drift touched the alert line but stayed within the rollback-free correction window.", "Clock sync broker", "Core timing", "medium", "Runtime core", "Review oscillator noise after the nightly maintenance sweep.", "resolved", ["timing", "broker"]),
    createAlert("aj-303", "23:52 UTC", "Archive export retry exceeded normal cadence", "The export eventually completed, but retry cadence stayed noisy for the remainder of the shift.", "Archive export", "Compliance lane", "low", "Archive ops", "Trim the retry budget before the next compliance batch opens.", "monitoring", ["archive", "retries"]),
    createAlert("aj-304", "02:21 UTC", "Review queue backlog reopened after route flap", "A route flap reopened part of the review queue, but no records were lost in replay.", "Review queue", "Approval mesh", "low", "Workflow ops", "Verify the route pins before the queue resumes normal priority.", "open", ["queue", "route"]),
  ]),
];
