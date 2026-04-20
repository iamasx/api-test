export type MetricState = "healthy" | "warning" | "critical";
export type AlertSeverity = "info" | "warning" | "critical";
export type AlertSeverityFilter = AlertSeverity | "all";
export type ActivityCategory =
  | "deployments"
  | "incidents"
  | "traffic"
  | "automation";
export type ActivityFilter = ActivityCategory | "all";
export type OperatorPosture = "monitor" | "contain" | "escalate";
export type ControlRoomRegion =
  | "metrics"
  | "feed"
  | "alerts"
  | "drilldown"
  | "controls";

type MetricDefinition = {
  id: string;
  label: string;
  description: string;
  base: number;
  step: number;
  precision: number;
  suffix: string;
  deltaPrecision: number;
  deltaSuffix: string;
  higherBetter: boolean;
  attention: number;
  critical: number;
};

type TemplateValue = string | ((cycle: number) => string);

export type WorkflowEffect =
  | { type: "focus-region"; region: ControlRoomRegion }
  | { type: "refresh-snapshot" }
  | { type: "select-alert"; alertId: string }
  | { type: "set-alert-filter"; filter: AlertSeverityFilter }
  | { type: "set-divert-workers"; value: boolean }
  | { type: "set-feed-filter"; filter: ActivityFilter }
  | { type: "set-freeze-deploys"; value: boolean }
  | { type: "set-posture"; posture: OperatorPosture }
  | { type: "set-sampling-rate"; value: number }
  | { type: "set-silence-info-alerts"; value: boolean };

type AlertTimelineTemplate = {
  id: string;
  actor: string;
  detail: string;
  minutesAgo: number;
  phase: "detect" | "stabilize" | "mitigate" | "handoff";
  title: string;
};

type AlertActionTemplate = {
  id: string;
  description: string;
  effects: WorkflowEffect[];
  label: string;
  tone: "default" | "warning" | "critical";
};

type AlertTemplate = {
  id: string;
  title: string;
  detail: string;
  severity: AlertSeverity;
  owner: string;
  impact: string;
  minutesAgo: number;
  region: string;
  service: string;
  status: string;
  summary: string;
  runbook: string;
  recommendedPosture: OperatorPosture;
  relatedMetricIds: string[];
  tags: string[];
  remediationActions: AlertActionTemplate[];
  timeline: AlertTimelineTemplate[];
};

type FeedTemplate = {
  id: string;
  title: string;
  summary: string;
  category: ActivityCategory;
  actor: string;
  system: string;
  minutesAgo: number;
  details: { label: string; value: TemplateValue }[];
  relatedAlertIds: string[];
};

export type MetricCard = {
  id: string;
  label: string;
  description: string;
  value: string;
  delta: string;
  state: MetricState;
};

export type AlertTimelineEntry = {
  id: string;
  actor: string;
  ageLabel: string;
  detail: string;
  phase: "detect" | "stabilize" | "mitigate" | "handoff";
  title: string;
};

export type AlertRemediationAction = {
  id: string;
  description: string;
  effects: WorkflowEffect[];
  label: string;
  tone: "default" | "warning" | "critical";
};

export type AlertItem = {
  id: string;
  title: string;
  detail: string;
  severity: AlertSeverity;
  owner: string;
  impact: string;
  ageLabel: string;
  region: string;
  service: string;
  status: string;
  summary: string;
  runbook: string;
  recommendedPosture: OperatorPosture;
  relatedMetricIds: string[];
  tags: string[];
  remediationActions: AlertRemediationAction[];
  timeline: AlertTimelineEntry[];
};

export type FeedDetail = {
  label: string;
  value: string;
};

export type FeedItem = {
  id: string;
  title: string;
  summary: string;
  category: ActivityCategory;
  actor: string;
  system: string;
  ageLabel: string;
  details: FeedDetail[];
  relatedAlertIds: string[];
};

export type ControlRoomSnapshot = {
  environment: string;
  lastUpdated: string;
  metrics: MetricCard[];
  alerts: AlertItem[];
  feed: FeedItem[];
};

export const activityFilters = [
  { id: "all", label: "All" },
  { id: "deployments", label: "Deployments" },
  { id: "incidents", label: "Incidents" },
  { id: "traffic", label: "Traffic" },
  { id: "automation", label: "Automation" },
] satisfies { id: ActivityFilter; label: string }[];

export const alertSeverityFilters = [
  { id: "all", label: "All severities" },
  { id: "critical", label: "Critical" },
  { id: "warning", label: "Warning" },
  { id: "info", label: "Info" },
] satisfies { id: AlertSeverityFilter; label: string }[];

export const controlRoomRegions = [
  { id: "metrics", label: "Metrics Grid" },
  { id: "feed", label: "Activity Feed" },
  { id: "alerts", label: "Alert Queue" },
  { id: "drilldown", label: "Alert Drilldown" },
  { id: "controls", label: "Drill Controls" },
] satisfies { id: ControlRoomRegion; label: string }[];

export const operatorPostureOptions = [
  "monitor",
  "contain",
  "escalate",
] as const;

const metricDefinitions: MetricDefinition[] = [
  {
    id: "availability",
    label: "Availability",
    description: "Successful edge responses across the primary mesh.",
    base: 99.982,
    step: 0.008,
    precision: 3,
    suffix: "%",
    deltaPrecision: 3,
    deltaSuffix: "%",
    higherBetter: true,
    attention: 99.975,
    critical: 99.96,
  },
  {
    id: "latency",
    label: "P95 latency",
    description: "Application edge to origin response time.",
    base: 184,
    step: 7,
    precision: 0,
    suffix: "ms",
    deltaPrecision: 0,
    deltaSuffix: "ms",
    higherBetter: false,
    attention: 195,
    critical: 208,
  },
  {
    id: "burn",
    label: "Error budget burn",
    description: "Rolling burn rate over the last 60 minutes.",
    base: 21,
    step: 3.5,
    precision: 1,
    suffix: "%",
    deltaPrecision: 1,
    deltaSuffix: "%",
    higherBetter: false,
    attention: 25,
    critical: 31,
  },
  {
    id: "queue",
    label: "Queue depth",
    description: "Buffered background jobs waiting on worker capacity.",
    base: 412,
    step: 36,
    precision: 0,
    suffix: "",
    deltaPrecision: 0,
    deltaSuffix: "",
    higherBetter: false,
    attention: 460,
    critical: 520,
  },
  {
    id: "replicas",
    label: "Replica coverage",
    description: "Healthy replicas participating in regional failover.",
    base: 97.4,
    step: 0.5,
    precision: 1,
    suffix: "%",
    deltaPrecision: 1,
    deltaSuffix: "%",
    higherBetter: true,
    attention: 96,
    critical: 94.5,
  },
  {
    id: "cadence",
    label: "Deploy cadence",
    description: "Production changes cleared through the release lane.",
    base: 6.4,
    step: 0.4,
    precision: 1,
    suffix: "/hr",
    deltaPrecision: 1,
    deltaSuffix: "/hr",
    higherBetter: true,
    attention: 5.8,
    critical: 5.2,
  },
  {
    id: "automation",
    label: "Automation success",
    description: "Guardrail tasks completing without intervention.",
    base: 94.6,
    step: 0.7,
    precision: 1,
    suffix: "%",
    deltaPrecision: 1,
    deltaSuffix: "%",
    higherBetter: true,
    attention: 92,
    critical: 89,
  },
  {
    id: "notifications",
    label: "Notification lag",
    description: "Median time for paging and timeline fan-out.",
    base: 42,
    step: 4,
    precision: 0,
    suffix: "s",
    deltaPrecision: 0,
    deltaSuffix: "s",
    higherBetter: false,
    attention: 48,
    critical: 56,
  },
];

const alertTemplates: AlertTemplate[] = [
  {
    id: "replica-drift",
    title: "Replica drift exceeds guardrail",
    detail:
      "Database follower in us-east-2 is 12s behind after a storage rebalance.",
    severity: "critical",
    owner: "Storage Ops",
    impact: "Write protection may arm if drift keeps climbing.",
    minutesAgo: 4,
    region: "us-east-2 / payments-primary",
    service: "payments-primary",
    status: "Follower lag is breaching the SEV-2 watch threshold.",
    summary:
      "A shard rebalance completed cleanly, but the promoted follower is now absorbing write amplification and trailing the primary.",
    runbook: "Runbook 7 · Replica drift containment",
    recommendedPosture: "escalate",
    relatedMetricIds: ["replicas", "latency", "availability"],
    tags: ["database", "replication", "guardrail"],
    remediationActions: [
      {
        id: "replica-freeze-deploys",
        label: "Freeze deploy lane",
        description:
          "Stop new promotions while storage validates follower health.",
        tone: "critical",
        effects: [
          { type: "set-freeze-deploys", value: true },
          { type: "focus-region", region: "controls" },
        ],
      },
      {
        id: "replica-escalate-posture",
        label: "Escalate operator posture",
        description:
          "Promote the desk into escalation mode and prepare bridge comms.",
        tone: "warning",
        effects: [{ type: "set-posture", posture: "escalate" }],
      },
      {
        id: "replica-filter-incidents",
        label: "Filter timeline to incidents",
        description:
          "Trim the feed to bridge updates, mitigations, and handoff notes.",
        tone: "default",
        effects: [
          { type: "set-feed-filter", filter: "incidents" },
          { type: "focus-region", region: "feed" },
        ],
      },
    ],
    timeline: [
      {
        id: "replica-lag-detected",
        actor: "Storage watcher",
        detail: "Follower lag crossed 10s for two consecutive telemetry windows.",
        minutesAgo: 2,
        phase: "detect",
        title: "Lag breach detected",
      },
      {
        id: "replica-rebalance-note",
        actor: "Shard allocator",
        detail:
          "Rebalance completed with higher than expected write amplification on shard 14.",
        minutesAgo: 7,
        phase: "stabilize",
        title: "Recent storage rebalance linked",
      },
      {
        id: "replica-write-protect",
        actor: "Guardrail service",
        detail:
          "Write protection will arm if drift rises above 18s for another minute.",
        minutesAgo: 9,
        phase: "mitigate",
        title: "Protective threshold approaching",
      },
      {
        id: "replica-bridge-opened",
        actor: "Shift lead",
        detail:
          "SEV-2 review bridge opened with platform, storage, and release control.",
        minutesAgo: 12,
        phase: "handoff",
        title: "Cross-team bridge staged",
      },
    ],
  },
  {
    id: "queue-surge",
    title: "Background queue rising in canary lane",
    detail:
      "Worker saturation is pushing fan-out jobs above their comfort band.",
    severity: "warning",
    owner: "Workflow Control",
    impact: "Customer notifications could slip by one processing window.",
    minutesAgo: 9,
    region: "canary lane / fan-out workers",
    service: "notification-fanout",
    status: "Queue depth has expanded across two release intervals.",
    summary:
      "Autoscaling is trailing canary traffic, leaving retries and timeline fan-out stacked behind the hot lane.",
    runbook: "Runbook 12 · Queue surge shaping",
    recommendedPosture: "contain",
    relatedMetricIds: ["queue", "automation", "notifications"],
    tags: ["queue", "workers", "fan-out"],
    remediationActions: [
      {
        id: "queue-divert-workers",
        label: "Divert background workers",
        description:
          "Borrow spare capacity from replay workers and feed the canary lane.",
        tone: "warning",
        effects: [
          { type: "set-divert-workers", value: true },
          { type: "focus-region", region: "controls" },
        ],
      },
      {
        id: "queue-raise-sampling",
        label: "Raise event sampling to 84%",
        description:
          "Collect more trace coverage before the fan-out window rolls over.",
        tone: "default",
        effects: [{ type: "set-sampling-rate", value: 84 }],
      },
      {
        id: "queue-focus-automation",
        label: "Filter timeline to automation",
        description:
          "Surface scaler, de-dupe, and replay events that explain the backlog.",
        tone: "default",
        effects: [
          { type: "set-feed-filter", filter: "automation" },
          { type: "focus-region", region: "feed" },
        ],
      },
    ],
    timeline: [
      {
        id: "queue-autoscale",
        actor: "Capacity manager",
        detail: "Autoscaler requested six workers but only three healthy slots were free.",
        minutesAgo: 3,
        phase: "detect",
        title: "Autoscale shortfall recorded",
      },
      {
        id: "queue-notifications",
        actor: "Fan-out scheduler",
        detail:
          "Notification replay jobs were deprioritized behind canary verification tasks.",
        minutesAgo: 6,
        phase: "stabilize",
        title: "Replay work deprioritized",
      },
      {
        id: "queue-dedupe",
        actor: "Signal reducer",
        detail:
          "Duplicate-warning suppression trimmed 18 events but the backlog remains above band.",
        minutesAgo: 10,
        phase: "mitigate",
        title: "Noise suppression reduced pressure",
      },
      {
        id: "queue-handoff",
        actor: "Workflow lead",
        detail:
          "Oncoming shift asked for an operator decision before the next canary gate.",
        minutesAgo: 14,
        phase: "handoff",
        title: "Decision checkpoint scheduled",
      },
    ],
  },
  {
    id: "synthetic-drill",
    title: "Synthetic failover drill opens in 12 minutes",
    detail:
      "Dry-run policies are preloaded and waiting for operator confirmation.",
    severity: "info",
    owner: "Resilience Team",
    impact: "Status banners will switch to drill mode during the exercise.",
    minutesAgo: 15,
    region: "global ingress / dry-run rail",
    service: "resilience-simulator",
    status: "Drill scaffolding is staged and awaiting operator launch.",
    summary:
      "The exercise is ready to open with route, cache, and notification mocks already pinned into rehearsal mode.",
    runbook: "Drill Pack 3 · Synthetic failover rehearsal",
    recommendedPosture: "monitor",
    relatedMetricIds: ["availability", "cadence", "notifications"],
    tags: ["drill", "failover", "simulation"],
    remediationActions: [
      {
        id: "drill-run-failover",
        label: "Run dry failover sequence",
        description:
          "Advance the rehearsal and capture the operator decision in the local command log.",
        tone: "default",
        effects: [{ type: "focus-region", region: "controls" }],
      },
      {
        id: "drill-silence-info",
        label: "Silence info alerts locally",
        description:
          "Mute the lower-severity rehearsal noise while the exercise banner is active.",
        tone: "default",
        effects: [{ type: "set-silence-info-alerts", value: true }],
      },
      {
        id: "drill-refresh-snapshot",
        label: "Refresh desk snapshot",
        description:
          "Rotate the mock desk state before the rehearsal begins.",
        tone: "default",
        effects: [{ type: "refresh-snapshot" }],
      },
    ],
    timeline: [
      {
        id: "drill-policies",
        actor: "Resilience bot",
        detail: "Dry-run policies were loaded into the rehearsal rail without touching production.",
        minutesAgo: 4,
        phase: "detect",
        title: "Exercise policies staged",
      },
      {
        id: "drill-route-check",
        actor: "Ingress controller",
        detail:
          "Synthetic route checks passed against the standby edge map in 46 seconds.",
        minutesAgo: 8,
        phase: "stabilize",
        title: "Standby route check passed",
      },
      {
        id: "drill-comms",
        actor: "Control desk",
        detail:
          "Drill comms draft is ready if operators want timeline breadcrumbs during the run.",
        minutesAgo: 11,
        phase: "mitigate",
        title: "Comms draft prepared",
      },
      {
        id: "drill-handoff",
        actor: "Resilience lead",
        detail:
          "Shift lead needs to acknowledge the rehearsal before banners flip to drill mode.",
        minutesAgo: 16,
        phase: "handoff",
        title: "Approval checkpoint open",
      },
    ],
  },
  {
    id: "tls-window",
    title: "Certificate rotation overlap narrows",
    detail:
      "Two edge clusters are within the final renewal grace period.",
    severity: "warning",
    owner: "Edge Platform",
    impact: "Regional handshakes may degrade if renewal is delayed.",
    minutesAgo: 21,
    region: "eu-west-1 / edge batch b14",
    service: "edge-handshake",
    status: "Renewal overlap is shrinking faster than the expected rollout pace.",
    summary:
      "The next certificate bundle is signed, but two edge clusters are still serving the expiring chain while the new batch drains forward.",
    runbook: "Runbook 19 · Edge cert overlap recovery",
    recommendedPosture: "contain",
    relatedMetricIds: ["availability", "latency", "cadence"],
    tags: ["tls", "edge", "renewal"],
    remediationActions: [
      {
        id: "tls-freeze-promotions",
        label: "Freeze lane before edge batch",
        description:
          "Pause promotions until the final certificate overlap expands again.",
        tone: "warning",
        effects: [
          { type: "set-freeze-deploys", value: true },
          { type: "set-alert-filter", filter: "warning" },
        ],
      },
      {
        id: "tls-focus-alerts",
        label: "Focus alert queue on warnings",
        description:
          "Reduce the queue to operator-reviewable warnings for the next handoff.",
        tone: "default",
        effects: [
          { type: "set-alert-filter", filter: "warning" },
          { type: "focus-region", region: "alerts" },
        ],
      },
      {
        id: "tls-open-drilldown",
        label: "Jump back to drilldown",
        description:
          "Re-center the operator on the certificate context pane.",
        tone: "default",
        effects: [{ type: "focus-region", region: "drilldown" }],
      },
    ],
    timeline: [
      {
        id: "tls-expiry",
        actor: "Certificate monitor",
        detail: "Two clusters entered the final overlap window with 31 minutes to spare.",
        minutesAgo: 5,
        phase: "detect",
        title: "Final overlap window entered",
      },
      {
        id: "tls-bundle",
        actor: "Release signer",
        detail: "Bundle `edge-b14-r3` was signed and queued for promotion.",
        minutesAgo: 9,
        phase: "stabilize",
        title: "Updated bundle prepared",
      },
      {
        id: "tls-promotion",
        actor: "Edge platform",
        detail:
          "Promotion is waiting on the canary gate to clear before moving to the remaining clusters.",
        minutesAgo: 13,
        phase: "mitigate",
        title: "Promotion blocked on canary gate",
      },
      {
        id: "tls-handoff",
        actor: "Edge on-call",
        detail: "Next checkpoint is aligned with the 10:30 UTC promotion window.",
        minutesAgo: 18,
        phase: "handoff",
        title: "Renewal checkpoint pinned",
      },
    ],
  },
  {
    id: "audit-note",
    title: "Runbook audit snapshot published",
    detail:
      "Shift handoff notes were attached to the incident ledger.",
    severity: "info",
    owner: "Control Desk",
    impact: "Operators can cross-check the latest mitigation notes locally.",
    minutesAgo: 28,
    region: "control desk / ledger",
    service: "incident-ledger",
    status: "A fresh audit bundle is available for local review.",
    summary:
      "The desk now has a packaged handoff note with decision history, command log entries, and mitigation outcomes from the last rotation.",
    runbook: "Desk note · Shift ledger audit",
    recommendedPosture: "monitor",
    relatedMetricIds: ["automation", "notifications", "cadence"],
    tags: ["audit", "handoff", "ledger"],
    remediationActions: [
      {
        id: "audit-filter-feed",
        label: "Filter feed to deployments",
        description:
          "Cross-check the signed bundle and handoff against release activity.",
        tone: "default",
        effects: [{ type: "set-feed-filter", filter: "deployments" }],
      },
      {
        id: "audit-focus-controls",
        label: "Focus drill controls",
        description:
          "Move the operator to local switches before the next shift note is staged.",
        tone: "default",
        effects: [{ type: "focus-region", region: "controls" }],
      },
      {
        id: "audit-silence-info",
        label: "Mute audit noise",
        description:
          "Keep the note in the queue, but locally mute info-only chatter.",
        tone: "default",
        effects: [{ type: "set-silence-info-alerts", value: true }],
      },
    ],
    timeline: [
      {
        id: "audit-ledger",
        actor: "Control desk",
        detail: "Latest mitigation notes were bundled into the shift ledger for local review.",
        minutesAgo: 6,
        phase: "detect",
        title: "Ledger bundle published",
      },
      {
        id: "audit-signoff",
        actor: "Review bot",
        detail: "Audit sign-off linked release approvals, command logs, and mitigation decisions.",
        minutesAgo: 11,
        phase: "stabilize",
        title: "Cross-links assembled",
      },
      {
        id: "audit-gaps",
        actor: "Responder notes",
        detail: "No missing reviewer acknowledgements were found in the prior shift sample.",
        minutesAgo: 15,
        phase: "mitigate",
        title: "Handoff gaps cleared",
      },
      {
        id: "audit-ready",
        actor: "Shift lead",
        detail: "Desk can reference the note during the next incident drilldown without leaving Control Room.",
        minutesAgo: 21,
        phase: "handoff",
        title: "Local review path confirmed",
      },
    ],
  },
];

const feedTemplates: FeedTemplate[] = [
  {
    id: "deploy-wave",
    title: "Canary wave 09 advanced to 20% traffic",
    summary:
      "Release control widened exposure after the guardrail sweep stayed green.",
    category: "deployments",
    actor: "Release control",
    system: "Deploy lane",
    minutesAgo: 3,
    details: [
      { label: "Change set", value: (cycle) => `cfg-${912 + cycle}` },
      { label: "Target", value: "payments-api" },
      { label: "Next gate", value: "40% traffic after 2 healthy intervals" },
    ],
    relatedAlertIds: ["tls-window", "replica-drift"],
  },
  {
    id: "incident-escalation",
    title: "Runbook 7 escalated to platform on-call",
    summary:
      "Operator requested manual review after replica drift crossed the paging threshold.",
    category: "incidents",
    actor: "Shift lead",
    system: "Incident desk",
    minutesAgo: 8,
    details: [
      { label: "Escalation", value: "SEV-2 review bridge opened" },
      { label: "Primary on-call", value: "P. Alvarez" },
      {
        label: "Mitigation",
        value: "Follower restart held pending storage snapshot",
      },
    ],
    relatedAlertIds: ["replica-drift"],
  },
  {
    id: "traffic-policy",
    title: "Routing policy widened on eu-west ingress",
    summary:
      "Traffic steering compensated for regional cold starts after cache churn.",
    category: "traffic",
    actor: "Auto-balancer",
    system: "Global ingress",
    minutesAgo: 12,
    details: [
      { label: "Region", value: "eu-west-1" },
      { label: "Shift", value: (cycle) => `${6 + cycle}% to standby pool` },
      { label: "Observation", value: "Tail latency recovered within one interval" },
    ],
    relatedAlertIds: ["synthetic-drill", "tls-window"],
  },
  {
    id: "rollback-sim",
    title: "Rollback simulator cleared dry-run guardrails",
    summary:
      "Automation replay validated recovery steps without changing production state.",
    category: "automation",
    actor: "Control bot",
    system: "Runbook simulator",
    minutesAgo: 17,
    details: [
      { label: "Scenario", value: "Canary rollback with queue drain" },
      { label: "Execution", value: (cycle) => `dry-run-${305 + cycle}` },
      { label: "Result", value: "No blocking checks found" },
    ],
    relatedAlertIds: ["synthetic-drill", "queue-surge"],
  },
  {
    id: "signing-bundle",
    title: "Configuration bundle signed for edge batch B14",
    summary:
      "Edge policies were packaged for the next promotion window.",
    category: "deployments",
    actor: "Release signer",
    system: "Policy vault",
    minutesAgo: 22,
    details: [
      { label: "Bundle", value: (cycle) => `edge-b14-r${cycle + 1}` },
      { label: "Approvers", value: "2 of 2 collected" },
      { label: "Window", value: "Next handoff at 10:30 UTC" },
    ],
    relatedAlertIds: ["tls-window", "audit-note"],
  },
  {
    id: "replay-trace",
    title: "Trace replay trimmed duplicate notifications",
    summary:
      "Automation de-duped timeline noise after the queue surge warning.",
    category: "automation",
    actor: "Signal reducer",
    system: "Timeline fan-out",
    minutesAgo: 29,
    details: [
      { label: "Muted events", value: (cycle) => `${18 + cycle}` },
      { label: "Scope", value: "warning-only duplicate bursts" },
      { label: "Retention", value: "Raw trace preserved for audit" },
    ],
    relatedAlertIds: ["queue-surge", "audit-note"],
  },
];

const timestampFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

const rotate = <T,>(items: T[], cycle: number) => [
  ...items.slice(cycle % items.length),
  ...items.slice(0, cycle % items.length),
];

const formatAge = (minutes: number) =>
  minutes < 60 ? `${minutes}m ago` : `${Math.floor(minutes / 60)}h ago`;

function getMetricState(
  definition: MetricDefinition,
  value: number,
): MetricState {
  if (definition.higherBetter) {
    return value <= definition.critical
      ? "critical"
      : value <= definition.attention
        ? "warning"
        : "healthy";
  }

  return value >= definition.critical
    ? "critical"
    : value >= definition.attention
      ? "warning"
      : "healthy";
}

export const formatLastUpdated = (timestamp: string) =>
  `${timestampFormatter.format(new Date(timestamp))} UTC`;

export function buildControlRoomSnapshot(
  cycle: number,
  referenceTime = new Date(),
): ControlRoomSnapshot {
  const updatedAt = new Date(referenceTime.getTime() + cycle * 45_000);

  return {
    environment: "production / canary lane",
    lastUpdated: updatedAt.toISOString(),
    metrics: metricDefinitions.map((definition, index) => {
      const swing = ((cycle + index * 2) % 5) - 2;
      const value = definition.base + swing * definition.step;
      const delta = swing * definition.step;
      const signedDelta = `${delta > 0 ? "+" : ""}${delta.toFixed(
        definition.deltaPrecision,
      )}${definition.deltaSuffix} vs baseline`;

      return {
        id: definition.id,
        label: definition.label,
        description: definition.description,
        value: `${value.toFixed(definition.precision)}${definition.suffix}`,
        delta: signedDelta,
        state: getMetricState(definition, value),
      };
    }),
    alerts: rotate(alertTemplates, cycle).map((alert, index) => ({
      id: alert.id,
      title: alert.title,
      detail: alert.detail,
      severity: alert.severity,
      owner: alert.owner,
      impact: alert.impact,
      ageLabel: formatAge(alert.minutesAgo + index * 2 + cycle),
      region: alert.region,
      service: alert.service,
      status: alert.status,
      summary: alert.summary,
      runbook: alert.runbook,
      recommendedPosture: alert.recommendedPosture,
      relatedMetricIds: alert.relatedMetricIds,
      tags: alert.tags,
      remediationActions: alert.remediationActions,
      timeline: alert.timeline.map((entry) => ({
        id: entry.id,
        actor: entry.actor,
        ageLabel: formatAge(entry.minutesAgo + cycle),
        detail: entry.detail,
        phase: entry.phase,
        title: entry.title,
      })),
    })),
    feed: rotate(feedTemplates, cycle).map((entry, index) => ({
      id: entry.id,
      title: entry.title,
      summary: entry.summary,
      category: entry.category,
      actor: entry.actor,
      system: entry.system,
      ageLabel: formatAge(entry.minutesAgo + index * 2 + cycle),
      details: entry.details.map((detail) => ({
        label: detail.label,
        value:
          typeof detail.value === "function" ? detail.value(cycle) : detail.value,
      })),
      relatedAlertIds: entry.relatedAlertIds,
    })),
  };
}
