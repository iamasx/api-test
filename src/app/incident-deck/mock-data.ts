export type IncidentSeverity = "critical" | "high" | "medium" | "low";
export type IncidentSeverityFilter = IncidentSeverity | "all";
export type ResponderStatus = "On bridge" | "Deploying" | "Relief" | "Monitoring";

export type SeverityLevel = {
  id: IncidentSeverity;
  label: string;
  summary: string;
  badgeClass: string;
  surfaceClass: string;
};

export type IncidentRecord = {
  id: string;
  code: string;
  title: string;
  service: string;
  severity: IncidentSeverity;
  status: string;
  openedAt: string;
  lead: string;
  region: string;
  affectedUsers: string;
  summary: string;
  activeTask: string;
  responderIds: string[];
};

export type ResponderRecord = {
  id: string;
  name: string;
  role: string;
  team: string;
  status: ResponderStatus;
  zone: string;
  specialties: string[];
  note: string;
};

export type TimelineEntry = {
  id: string;
  incidentId: string;
  kind: string;
  title: string;
  detail: string;
  at: string;
  channel: string;
  responderIds: string[];
};

export const incidentSeverities = [
  {
    id: "critical",
    label: "Critical",
    summary: "Customer-impacting and actively mitigating.",
    badgeClass: "border border-rose-400/30 bg-rose-500/15 text-rose-100",
    surfaceClass: "bg-rose-500/10 text-rose-100 ring-rose-400/30",
  },
  {
    id: "high",
    label: "High",
    summary: "Escalated and tracking a recovery owner.",
    badgeClass: "border border-orange-300/30 bg-orange-400/15 text-orange-50",
    surfaceClass: "bg-orange-400/10 text-orange-100 ring-orange-300/30",
  },
  {
    id: "medium",
    label: "Medium",
    summary: "Contained but still consuming operator time.",
    badgeClass: "border border-amber-300/30 bg-amber-400/15 text-amber-50",
    surfaceClass: "bg-amber-400/10 text-amber-100 ring-amber-300/30",
  },
  {
    id: "low",
    label: "Low",
    summary: "Observed and held in an active watch lane.",
    badgeClass: "border border-cyan-300/30 bg-cyan-400/15 text-cyan-50",
    surfaceClass: "bg-cyan-400/10 text-cyan-100 ring-cyan-300/30",
  },
] satisfies SeverityLevel[];

export const incidentResponders = [
  {
    id: "maya-tran",
    name: "Maya Tran",
    role: "Incident commander",
    team: "Core platform",
    status: "On bridge",
    zone: "UTC-7",
    specialties: ["Traffic shaping", "Rollback control"],
    note: "Holding write pressure below the burn threshold while the cache patch rolls out.",
  },
  {
    id: "jonah-price",
    name: "Jonah Price",
    role: "Database on-call",
    team: "Data systems",
    status: "Deploying",
    zone: "UTC-5",
    specialties: ["Replica recovery", "Failover checks"],
    note: "Validating follower lag after the replica pool drained stale lease holders.",
  },
  {
    id: "leila-ortega",
    name: "Leila Ortega",
    role: "Edge specialist",
    team: "Network runtime",
    status: "On bridge",
    zone: "UTC+1",
    specialties: ["Cache routing", "Token propagation"],
    note: "Shadowing auth edge nodes and confirming config parity before widening traffic.",
  },
  {
    id: "cameron-reeves",
    name: "Cameron Reeves",
    role: "Comms lead",
    team: "Customer ops",
    status: "Monitoring",
    zone: "UTC-4",
    specialties: ["Status updates", "Escalation pacing"],
    note: "Preparing the next external update if the canary lane stays stable for one more interval.",
  },
  {
    id: "talia-brooks",
    name: "Talia Brooks",
    role: "Queue response",
    team: "Workflow control",
    status: "Relief",
    zone: "UTC-6",
    specialties: ["Backlog draining", "Replay safety"],
    note: "Keeping replay pressure under the alert threshold while secondary workers warm up.",
  },
  {
    id: "owen-singh",
    name: "Owen Singh",
    role: "Delivery analyst",
    team: "Partner systems",
    status: "Monitoring",
    zone: "UTC+5:30",
    specialties: ["Webhook fan-out", "Partner retry policy"],
    note: "Watching late-arriving carrier events and pruning duplicates before they reach merchants.",
  },
] satisfies ResponderRecord[];

export const incidents = [
  {
    id: "deck-441",
    code: "INC-441",
    title: "Checkout token refresh failures spike in the primary lane",
    service: "payments-api",
    severity: "critical",
    status: "Mitigating",
    openedAt: "09:12 UTC",
    lead: "Maya Tran",
    region: "us-east / eu-west",
    affectedUsers: "11% checkout attempts",
    summary: "Edge-issued refresh tokens are expiring ahead of session rollover after a hot shard rebalance.",
    activeTask: "Patch auth cache eviction policy and widen traffic only after burn rate normalizes.",
    responderIds: ["maya-tran", "jonah-price", "cameron-reeves"],
  },
  {
    id: "deck-438",
    code: "INC-438",
    title: "Edge auth config drift holds back new session issuance",
    service: "gateway-edge",
    severity: "high",
    status: "Containing",
    openedAt: "09:37 UTC",
    lead: "Leila Ortega",
    region: "ap-south / eu-central",
    affectedUsers: "4 regional POPs",
    summary: "A delayed config propagation wave left standby nodes serving an outdated issuer bundle.",
    activeTask: "Reseed the standby nodes and watch session parity before rejoining the pool.",
    responderIds: ["leila-ortega", "maya-tran", "cameron-reeves"],
  },
  {
    id: "deck-435",
    code: "INC-435",
    title: "Webhook replay queue grows after partner retry burst",
    service: "shipment-webhooks",
    severity: "medium",
    status: "Watching",
    openedAt: "10:05 UTC",
    lead: "Talia Brooks",
    region: "global queue mesh",
    affectedUsers: "Delayed delivery events",
    summary: "Carrier retries arrived out of order and saturated the replay workers assigned to the recovery lane.",
    activeTask: "Drain the backlog without duplicating carrier notifications for merchants already reconciled.",
    responderIds: ["talia-brooks", "owen-singh", "cameron-reeves"],
  },
  {
    id: "deck-431",
    code: "INC-431",
    title: "Audit fan-out stays under watch after canary rule change",
    service: "event-audit",
    severity: "low",
    status: "Monitoring",
    openedAt: "10:31 UTC",
    lead: "Owen Singh",
    region: "secondary workers",
    affectedUsers: "Internal review queues",
    summary: "A narrow audit rule change increased side-channel fan-out, but retry pressure is now flattening.",
    activeTask: "Keep the watch lane open until the next worker sample shows duplicate events below baseline.",
    responderIds: ["owen-singh", "talia-brooks"],
  },
] satisfies IncidentRecord[];

export const incidentTimeline = [
  {
    id: "deck-441-detect",
    incidentId: "deck-441",
    kind: "Detection",
    title: "Synthetic checkout monitors jump above the burn budget",
    detail: "Token refreshes start failing on hot shards and the rollback guardrail blocks the latest config promotion.",
    at: "09:14 UTC",
    channel: "signal-bus",
    responderIds: ["maya-tran", "jonah-price"],
  },
  {
    id: "deck-441-mitigate",
    incidentId: "deck-441",
    kind: "Mitigation",
    title: "Replica pool rotated and cache eviction patch enters canary",
    detail: "Database recovery clears stale lease holders while the platform lane tests a narrower token eviction window.",
    at: "09:23 UTC",
    channel: "ops-bridge",
    responderIds: ["jonah-price", "maya-tran"],
  },
  {
    id: "deck-441-comms",
    incidentId: "deck-441",
    kind: "Comms",
    title: "Customer status banner held at investigating while burn rate falls",
    detail: "External comms stay conservative until the next sample shows stable session recovery across both primary regions.",
    at: "09:31 UTC",
    channel: "status-page",
    responderIds: ["cameron-reeves"],
  },
  {
    id: "deck-438-detect",
    incidentId: "deck-438",
    kind: "Detection",
    title: "Standby edge nodes fail issuer parity checks",
    detail: "Session issuance begins splitting between old and new issuer bundles after a staggered deploy window.",
    at: "09:41 UTC",
    channel: "edge-watch",
    responderIds: ["leila-ortega"],
  },
  {
    id: "deck-438-remediate",
    incidentId: "deck-438",
    kind: "Mitigation",
    title: "Config reseed pushes updated bundles into the held POPs",
    detail: "The affected standby nodes rejoin in a shadow lane while traffic remains pinned away from the stale replicas.",
    at: "09:52 UTC",
    channel: "ops-bridge",
    responderIds: ["leila-ortega", "maya-tran"],
  },
  {
    id: "deck-438-comms",
    incidentId: "deck-438",
    kind: "Handoff",
    title: "Support queue gets regional holding copy for new sessions",
    detail: "The customer team shares a narrow advisory for impacted geographies instead of broad incident messaging.",
    at: "10:01 UTC",
    channel: "support-room",
    responderIds: ["cameron-reeves"],
  },
  {
    id: "deck-435-detect",
    incidentId: "deck-435",
    kind: "Detection",
    title: "Partner retry storm piles into the replay lane",
    detail: "Workers protecting duplicate merchant notifications refuse the newest burst and queue depth doubles in one interval.",
    at: "10:08 UTC",
    channel: "queue-ops",
    responderIds: ["talia-brooks", "owen-singh"],
  },
  {
    id: "deck-435-mitigate",
    incidentId: "deck-435",
    kind: "Mitigation",
    title: "Warm spare workers absorb the oldest replay partition",
    detail: "Replay pressure begins flattening once carrier-specific retry windows are spread across the spare pool.",
    at: "10:19 UTC",
    channel: "workflow-control",
    responderIds: ["talia-brooks"],
  },
  {
    id: "deck-435-comms",
    incidentId: "deck-435",
    kind: "Comms",
    title: "Merchant-facing delivery updates held until dedupe clears",
    detail: "Partner systems keep the delivery banner quiet to avoid sending duplicate status changes during recovery.",
    at: "10:24 UTC",
    channel: "partner-room",
    responderIds: ["owen-singh", "cameron-reeves"],
  },
  {
    id: "deck-431-watch",
    incidentId: "deck-431",
    kind: "Detection",
    title: "Audit retries drift above the watch threshold",
    detail: "A new canary rule causes duplicate event fan-out inside the secondary worker lane, but downstream queues remain healthy.",
    at: "10:34 UTC",
    channel: "audit-watch",
    responderIds: ["owen-singh"],
  },
  {
    id: "deck-431-monitor",
    incidentId: "deck-431",
    kind: "Monitoring",
    title: "Secondary workers hold duplicate events below the paging line",
    detail: "Queue control leaves the watch lane open, but the latest sample suggests the issue is decaying without intervention.",
    at: "10:42 UTC",
    channel: "workflow-control",
    responderIds: ["talia-brooks", "owen-singh"],
  },
] satisfies TimelineEntry[];
