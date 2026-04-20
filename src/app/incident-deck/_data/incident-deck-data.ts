export type IncidentDeckTone = "critical" | "watch" | "steady";

export type IncidentSeverity = "SEV-1" | "SEV-2" | "SEV-3";

export type IncidentStatus = "Investigating" | "Mitigating" | "Monitoring";

export type IncidentRecord = {
  id: string;
  service: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  tone: IncidentDeckTone;
  ageMinutes: number;
  detectedAt: string;
  nextUpdateAt: string;
  incidentCommander: string;
  channel: string;
  region: string;
  blastRadius: string;
  customerImpact: string;
  summary: string;
  mitigation: string;
  workstreams: string[];
  owners: string[];
  updateNote: string;
};

export type TimelineEventType =
  | "Detection"
  | "Escalation"
  | "Mitigation"
  | "Communication"
  | "Handoff";

export type TimelineEvent = {
  id: string;
  loggedAt: string;
  minutesAgo: number;
  type: TimelineEventType;
  tone: IncidentDeckTone;
  title: string;
  actor: string;
  detail: string;
  linkedIncidentIds: string[];
};

export type OwnershipCell = {
  id: string;
  team: string;
  lead: string;
  role: string;
  shift: string;
  queue: string;
  responders: number;
  tone: IncidentDeckTone;
  health: "Stable" | "Stretched" | "Hot";
  focus: string;
  nextHandoff: string;
  activeIncidentIds: string[];
};

export type IncidentDeckMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: IncidentDeckTone;
};

export type OwnershipSnapshot = {
  teamsEngaged: number;
  respondersEngaged: number;
  stretchedTeams: number;
  hotTeams: number;
};

export const incidentDeckOverview = {
  eyebrow: "Incident Deck",
  title: "Hold active incidents, the response timeline, and ownership posture on one operational route.",
  description:
    "The incident deck is a self-contained app-router page built around local mock data: live incident cards, chronological response events, and an ownership panel that shows which teams currently hold the work.",
  activeWindow: "Shift window: 09:00 to 13:00 UTC",
  routeNote: "Last coordinated update recorded at 10:06 UTC across four response cells.",
  actions: [
    {
      href: "#active-incident-cards",
      label: "Review active incidents",
    },
    {
      href: "#incident-response-timeline",
      label: "Open response timeline",
    },
    {
      href: "#incident-ownership-summary",
      label: "Inspect ownership",
    },
  ],
};

export const activeIncidents: IncidentRecord[] = [
  {
    id: "checkout-edge-latency",
    service: "Checkout Edge",
    title: "Authentication callbacks are timing out for checkout traffic in the east region",
    severity: "SEV-1",
    status: "Mitigating",
    tone: "critical",
    ageMinutes: 54,
    detectedAt: "09:12 UTC",
    nextUpdateAt: "10:12 UTC",
    incidentCommander: "Rin Patel",
    channel: "#inc-checkout-edge",
    region: "us-east-1 and us-east-2",
    blastRadius: "31% of checkout attempts in the east region are retrying before auth completes.",
    customerImpact:
      "Customers can still complete orders after retries, but auth redirects are adding 18 to 25 seconds of delay on mobile.",
    summary:
      "A cache fanout regression in the callback path is saturating auth workers during the morning traffic ramp.",
    mitigation:
      "Traffic is being shifted toward the fallback callback cluster while the auth team drains the highest-error shard.",
    workstreams: [
      "Drain the callback shard with the highest timeout rate and pin new sessions to the fallback path.",
      "Rebuild the cache fanout for east-region workers from the pre-release configuration snapshot.",
      "Keep support macros aligned with the latest customer-facing retry guidance.",
    ],
    owners: ["Platform API", "Checkout Reliability", "Support Operations"],
    updateNote:
      "Retry success has improved from 58% to 83%, but the team has not yet returned traffic to the primary path.",
  },
  {
    id: "telemetry-ingest-backlog",
    service: "Telemetry Ingest",
    title: "Event ingestion is building backlog after a partition rebalance on the analytics stream",
    severity: "SEV-2",
    status: "Monitoring",
    tone: "watch",
    ageMinutes: 103,
    detectedAt: "08:23 UTC",
    nextUpdateAt: "10:20 UTC",
    incidentCommander: "Mara Chen",
    channel: "#inc-telemetry",
    region: "eu-west-1 and central processing queue",
    blastRadius:
      "Dashboard freshness is trailing by up to 14 minutes for operational metrics and shipment telemetry.",
    customerImpact:
      "Internal operators are working from delayed charts, but end-user flows remain available and data is not being dropped.",
    summary:
      "A partition rebalance left one consumer group underprovisioned, forcing queue depth to grow faster than the autoscaler recovered.",
    mitigation:
      "The data team increased consumers on the lagging partition set and is watching replay throughput against the backlog curve.",
    workstreams: [
      "Hold the new consumer count until the backlog drops under the 10-minute freshness target.",
      "Validate that the replay path is preserving message ordering on the highest-volume partitions.",
      "Coordinate dashboard freshness notices with operations center leads until charts catch up.",
    ],
    owners: ["Data Pipeline", "Observability", "Operations Center"],
    updateNote:
      "Backlog growth stopped at 09:47 UTC, and the lag is now falling by roughly two minutes every replay cycle.",
  },
  {
    id: "fulfillment-sync-drift",
    service: "Fulfillment Sync",
    title: "Warehouse assignment records are drifting after a late inventory snapshot replay",
    severity: "SEV-2",
    status: "Investigating",
    tone: "watch",
    ageMinutes: 41,
    detectedAt: "09:25 UTC",
    nextUpdateAt: "10:15 UTC",
    incidentCommander: "Owen Hart",
    channel: "#inc-fulfillment-sync",
    region: "North America warehouse graph",
    blastRadius:
      "A subset of assignment records are selecting fallback warehouses, increasing reroute volume for same-day orders.",
    customerImpact:
      "Orders still place successfully, but the operations team is manually reviewing a growing queue of warehouse overrides.",
    summary:
      "A replayed inventory snapshot appears to have rewritten assignment priorities faster than the sync verifier could reconcile them.",
    mitigation:
      "Logistics systems are freezing automated reassignments while the team compares replay output against the last healthy snapshot.",
    workstreams: [
      "Diff the replay payload against the last verified assignment snapshot for the top twelve warehouses.",
      "Hold new automated reassignments until the verifier confirms no fresh drift is entering the graph.",
      "Prepare a fallback rule set for same-day shipments if manual override volume keeps rising.",
    ],
    owners: ["Logistics Systems", "Warehouse Ops", "Support Operations"],
    updateNote:
      "No new drift has appeared since the assignment freeze, but the backlog of manual overrides is still climbing.",
  },
];

export const responseTimeline: TimelineEvent[] = [
  {
    id: "timeline-1",
    loggedAt: "08:23 UTC",
    minutesAgo: 103,
    type: "Detection",
    tone: "watch",
    title: "Telemetry freshness alert crossed the 12-minute threshold",
    actor: "Mara Chen / Observability",
    detail:
      "The analytics freshness SLO paged after queue depth accelerated across the central partition set, opening the telemetry incident.",
    linkedIncidentIds: ["telemetry-ingest-backlog"],
  },
  {
    id: "timeline-2",
    loggedAt: "09:12 UTC",
    minutesAgo: 54,
    type: "Escalation",
    tone: "critical",
    title: "Checkout auth retries escalated to SEV-1 and incident command took lead",
    actor: "Rin Patel / Incident Command",
    detail:
      "Checkout errors breached the regional paging threshold, a cross-functional bridge was opened, and support was asked to freeze risky macro changes.",
    linkedIncidentIds: ["checkout-edge-latency"],
  },
  {
    id: "timeline-3",
    loggedAt: "09:25 UTC",
    minutesAgo: 41,
    type: "Detection",
    tone: "watch",
    title: "Warehouse override queue signaled fulfillment assignment drift",
    actor: "Owen Hart / Logistics Systems",
    detail:
      "Manual override volume doubled within one replay interval, indicating assignment priorities had shifted away from the expected warehouse graph.",
    linkedIncidentIds: ["fulfillment-sync-drift"],
  },
  {
    id: "timeline-4",
    loggedAt: "09:34 UTC",
    minutesAgo: 32,
    type: "Mitigation",
    tone: "critical",
    title: "Traffic moved to the checkout fallback callback cluster",
    actor: "Priya Shah / Platform API",
    detail:
      "The auth team shifted east-region callbacks toward the fallback cluster to cut timeout pressure while the highest-error shard was drained.",
    linkedIncidentIds: ["checkout-edge-latency"],
  },
  {
    id: "timeline-5",
    loggedAt: "09:47 UTC",
    minutesAgo: 19,
    type: "Communication",
    tone: "steady",
    title: "Operators received a dashboard lag advisory and workaround guidance",
    actor: "Leah Moss / Operations Center",
    detail:
      "Operations leads were notified that telemetry charts could lag by up to 14 minutes and were given the live queue-depth fallback dashboard.",
    linkedIncidentIds: ["telemetry-ingest-backlog"],
  },
  {
    id: "timeline-6",
    loggedAt: "10:06 UTC",
    minutesAgo: 0,
    type: "Handoff",
    tone: "watch",
    title: "Fulfillment systems handed manual override tracking to the support cell",
    actor: "Noah Kim / Support Operations",
    detail:
      "Support operations accepted ownership of the override queue while logistics compared replay output with the last healthy snapshot.",
    linkedIncidentIds: ["fulfillment-sync-drift", "checkout-edge-latency"],
  },
];

export const ownershipCells: OwnershipCell[] = [
  {
    id: "ownership-1",
    team: "Incident Command",
    lead: "Rin Patel",
    role: "Bridge lead",
    shift: "09:00 to 13:00 UTC",
    queue: "1 bridge, 3 active incidents",
    responders: 4,
    tone: "critical",
    health: "Hot",
    focus:
      "Keep shared decisions, next-update timings, and risk handoffs synchronized across checkout, telemetry, and fulfillment workstreams.",
    nextHandoff:
      "Decide by 10:12 UTC whether checkout traffic can return to the primary callback path.",
    activeIncidentIds: [
      "checkout-edge-latency",
      "telemetry-ingest-backlog",
      "fulfillment-sync-drift",
    ],
  },
  {
    id: "ownership-2",
    team: "Platform API",
    lead: "Priya Shah",
    role: "Mitigation owner",
    shift: "Primary on-call",
    queue: "Checkout fallback cluster and auth shard recovery",
    responders: 3,
    tone: "critical",
    health: "Hot",
    focus:
      "Drain the worst callback shard, keep retry success above 80%, and prepare a rollback if error rate rebounds during traffic restoration.",
    nextHandoff:
      "Publish the shard recovery check at 10:10 UTC before incident command approves any traffic return.",
    activeIncidentIds: ["checkout-edge-latency"],
  },
  {
    id: "ownership-3",
    team: "Data Pipeline",
    lead: "Mara Chen",
    role: "Replay lead",
    shift: "Follow-the-sun overlap",
    queue: "Partition recovery and backlog replay",
    responders: 2,
    tone: "steady",
    health: "Stable",
    focus:
      "Hold the higher consumer count until freshness drops under ten minutes without message-order drift on the replay path.",
    nextHandoff:
      "Send a backlog trend update at 10:20 UTC with the expected time to clear the remaining lag.",
    activeIncidentIds: ["telemetry-ingest-backlog"],
  },
  {
    id: "ownership-4",
    team: "Support Operations",
    lead: "Noah Kim",
    role: "Customer updates",
    shift: "Regional support rotation",
    queue: "Macro control and warehouse override queue",
    responders: 5,
    tone: "watch",
    health: "Stretched",
    focus:
      "Keep checkout macro guidance aligned with live retry behavior while triaging the manual warehouse overrides now arriving from fulfillment.",
    nextHandoff:
      "Confirm by 10:15 UTC whether same-day override volume requires a dedicated warehouse ops rotation.",
    activeIncidentIds: ["checkout-edge-latency", "fulfillment-sync-drift"],
  },
];

function formatMinutes(totalMinutes: number) {
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

export function getIncidentDeckMetrics(): IncidentDeckMetric[] {
  const sevOneCount = activeIncidents.filter(
    (incident) => incident.severity === "SEV-1",
  ).length;
  const oldestIncident = activeIncidents.reduce((oldest, incident) =>
    incident.ageMinutes > oldest.ageMinutes ? incident : oldest,
  );
  const nextUpdate = activeIncidents.reduce((soonest, incident) =>
    incident.nextUpdateAt < soonest.nextUpdateAt ? incident : soonest,
  );
  const engagedResponders = ownershipCells.reduce(
    (runningTotal, cell) => runningTotal + cell.responders,
    0,
  );

  return [
    {
      id: "metric-active",
      label: "Active incidents",
      value: String(activeIncidents.length),
      detail: "Checkout, telemetry, and fulfillment are all holding live response work.",
      tone: "critical",
    },
    {
      id: "metric-sev-one",
      label: "SEV-1 bridges",
      value: String(sevOneCount),
      detail: "One customer-facing incident is still driving the shared bridge cadence.",
      tone: "critical",
    },
    {
      id: "metric-oldest",
      label: "Oldest incident age",
      value: formatMinutes(oldestIncident.ageMinutes),
      detail: `${oldestIncident.service} has been open since ${oldestIncident.detectedAt}.`,
      tone: "watch",
    },
    {
      id: "metric-responders",
      label: "Responders engaged",
      value: String(engagedResponders),
      detail: `The next committed customer-facing update lands at ${nextUpdate.nextUpdateAt}.`,
      tone: "steady",
    },
  ];
}

export function getOwnershipSnapshot(): OwnershipSnapshot {
  return ownershipCells.reduce(
    (snapshot, cell) => {
      snapshot.teamsEngaged += 1;
      snapshot.respondersEngaged += cell.responders;

      if (cell.health === "Stretched") {
        snapshot.stretchedTeams += 1;
      }

      if (cell.health === "Hot") {
        snapshot.hotTeams += 1;
      }

      return snapshot;
    },
    {
      teamsEngaged: 0,
      respondersEngaged: 0,
      stretchedTeams: 0,
      hotTeams: 0,
    },
  );
}

export function getTimelineWindowLabel() {
  const firstEvent = responseTimeline[0];
  const lastEvent = responseTimeline[responseTimeline.length - 1];

  return `${firstEvent.loggedAt} to ${lastEvent.loggedAt}`;
}
