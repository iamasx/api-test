export type MetricState = "healthy" | "warning" | "critical";
export type AlertSeverity = "info" | "warning" | "critical";
export type ActivityCategory = "deployments" | "incidents" | "traffic" | "automation";
export type ActivityFilter = ActivityCategory | "all";

type MetricDefinition = {
  id: string; label: string; description: string; base: number; step: number;
  precision: number; suffix: string; deltaPrecision: number; deltaSuffix: string;
  higherBetter: boolean; attention: number; critical: number;
};
type TemplateValue = string | ((cycle: number) => string);
type AlertTemplate = {
  id: string; title: string; detail: string; severity: AlertSeverity;
  owner: string; impact: string; minutesAgo: number;
};
type FeedTemplate = {
  id: string; title: string; summary: string; category: ActivityCategory;
  actor: string; system: string; minutesAgo: number;
  details: { label: string; value: TemplateValue }[];
};

export type MetricCard = { id: string; label: string; description: string; value: string; delta: string; state: MetricState };
export type AlertItem = { id: string; title: string; detail: string; severity: AlertSeverity; owner: string; impact: string; ageLabel: string };
export type FeedDetail = { label: string; value: string };
export type FeedItem = { id: string; title: string; summary: string; category: ActivityCategory; actor: string; system: string; ageLabel: string; details: FeedDetail[] };
export type ControlRoomSnapshot = { environment: string; lastUpdated: string; metrics: MetricCard[]; alerts: AlertItem[]; feed: FeedItem[] };

export const activityFilters = [
  { id: "all", label: "All" },
  { id: "deployments", label: "Deployments" },
  { id: "incidents", label: "Incidents" },
  { id: "traffic", label: "Traffic" },
  { id: "automation", label: "Automation" },
] satisfies { id: ActivityFilter; label: string }[];

const metricDefinitions: MetricDefinition[] = [
  { id: "availability", label: "Availability", description: "Successful edge responses across the primary mesh.", base: 99.982, step: 0.008, precision: 3, suffix: "%", deltaPrecision: 3, deltaSuffix: "%", higherBetter: true, attention: 99.975, critical: 99.96 },
  { id: "latency", label: "P95 latency", description: "Application edge to origin response time.", base: 184, step: 7, precision: 0, suffix: "ms", deltaPrecision: 0, deltaSuffix: "ms", higherBetter: false, attention: 195, critical: 208 },
  { id: "burn", label: "Error budget burn", description: "Rolling burn rate over the last 60 minutes.", base: 21, step: 3.5, precision: 1, suffix: "%", deltaPrecision: 1, deltaSuffix: "%", higherBetter: false, attention: 25, critical: 31 },
  { id: "queue", label: "Queue depth", description: "Buffered background jobs waiting on worker capacity.", base: 412, step: 36, precision: 0, suffix: "", deltaPrecision: 0, deltaSuffix: "", higherBetter: false, attention: 460, critical: 520 },
  { id: "replicas", label: "Replica coverage", description: "Healthy replicas participating in regional failover.", base: 97.4, step: 0.5, precision: 1, suffix: "%", deltaPrecision: 1, deltaSuffix: "%", higherBetter: true, attention: 96, critical: 94.5 },
  { id: "cadence", label: "Deploy cadence", description: "Production changes cleared through the release lane.", base: 6.4, step: 0.4, precision: 1, suffix: "/hr", deltaPrecision: 1, deltaSuffix: "/hr", higherBetter: true, attention: 5.8, critical: 5.2 },
  { id: "automation", label: "Automation success", description: "Guardrail tasks completing without intervention.", base: 94.6, step: 0.7, precision: 1, suffix: "%", deltaPrecision: 1, deltaSuffix: "%", higherBetter: true, attention: 92, critical: 89 },
  { id: "notifications", label: "Notification lag", description: "Median time for paging and timeline fan-out.", base: 42, step: 4, precision: 0, suffix: "s", deltaPrecision: 0, deltaSuffix: "s", higherBetter: false, attention: 48, critical: 56 },
];

const alertTemplates: AlertTemplate[] = [
  { id: "replica-drift", title: "Replica drift exceeds guardrail", detail: "Database follower in us-east-2 is 12s behind after a storage rebalance.", severity: "critical", owner: "Storage Ops", impact: "Write protection may arm if drift keeps climbing.", minutesAgo: 4 },
  { id: "queue-surge", title: "Background queue rising in canary lane", detail: "Worker saturation is pushing fan-out jobs above their comfort band.", severity: "warning", owner: "Workflow Control", impact: "Customer notifications could slip by one processing window.", minutesAgo: 9 },
  { id: "synthetic-drill", title: "Synthetic failover drill opens in 12 minutes", detail: "Dry-run policies are preloaded and waiting for operator confirmation.", severity: "info", owner: "Resilience Team", impact: "Status banners will switch to drill mode during the exercise.", minutesAgo: 15 },
  { id: "tls-window", title: "Certificate rotation overlap narrows", detail: "Two edge clusters are within the final renewal grace period.", severity: "warning", owner: "Edge Platform", impact: "Regional handshakes may degrade if renewal is delayed.", minutesAgo: 21 },
  { id: "audit-note", title: "Runbook audit snapshot published", detail: "Shift handoff notes were attached to the incident ledger.", severity: "info", owner: "Control Desk", impact: "Operators can cross-check the latest mitigation notes locally.", minutesAgo: 28 },
];

const feedTemplates: FeedTemplate[] = [
  {
    id: "deploy-wave", title: "Canary wave 09 advanced to 20% traffic",
    summary: "Release control widened exposure after the guardrail sweep stayed green.", category: "deployments",
    actor: "Release control", system: "Deploy lane", minutesAgo: 3,
    details: [{ label: "Change set", value: (cycle) => `cfg-${912 + cycle}` }, { label: "Target", value: "payments-api" }, { label: "Next gate", value: "40% traffic after 2 healthy intervals" }],
  },
  {
    id: "incident-escalation", title: "Runbook 7 escalated to platform on-call",
    summary: "Operator requested manual review after replica drift crossed the paging threshold.", category: "incidents",
    actor: "Shift lead", system: "Incident desk", minutesAgo: 8,
    details: [{ label: "Escalation", value: "SEV-2 review bridge opened" }, { label: "Primary on-call", value: "P. Alvarez" }, { label: "Mitigation", value: "Follower restart held pending storage snapshot" }],
  },
  {
    id: "traffic-policy", title: "Routing policy widened on eu-west ingress",
    summary: "Traffic steering compensated for regional cold starts after cache churn.", category: "traffic",
    actor: "Auto-balancer", system: "Global ingress", minutesAgo: 12,
    details: [{ label: "Region", value: "eu-west-1" }, { label: "Shift", value: (cycle) => `${6 + cycle}% to standby pool` }, { label: "Observation", value: "Tail latency recovered within one interval" }],
  },
  {
    id: "rollback-sim", title: "Rollback simulator cleared dry-run guardrails",
    summary: "Automation replay validated recovery steps without changing production state.", category: "automation",
    actor: "Control bot", system: "Runbook simulator", minutesAgo: 17,
    details: [{ label: "Scenario", value: "Canary rollback with queue drain" }, { label: "Execution", value: (cycle) => `dry-run-${305 + cycle}` }, { label: "Result", value: "No blocking checks found" }],
  },
  {
    id: "signing-bundle", title: "Configuration bundle signed for edge batch B14",
    summary: "Edge policies were packaged for the next promotion window.", category: "deployments",
    actor: "Release signer", system: "Policy vault", minutesAgo: 22,
    details: [{ label: "Bundle", value: (cycle) => `edge-b14-r${cycle + 1}` }, { label: "Approvers", value: "2 of 2 collected" }, { label: "Window", value: "Next handoff at 10:30 UTC" }],
  },
  {
    id: "replay-trace", title: "Trace replay trimmed duplicate notifications",
    summary: "Automation de-duped timeline noise after the queue surge warning.", category: "automation",
    actor: "Signal reducer", system: "Timeline fan-out", minutesAgo: 29,
    details: [{ label: "Muted events", value: (cycle) => `${18 + cycle}` }, { label: "Scope", value: "warning-only duplicate bursts" }, { label: "Retention", value: "Raw trace preserved for audit" }],
  },
];

const timestampFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" });
const rotate = <T,>(items: T[], cycle: number) => [...items.slice(cycle % items.length), ...items.slice(0, cycle % items.length)];
const formatAge = (minutes: number) => (minutes < 60 ? `${minutes}m ago` : `${Math.floor(minutes / 60)}h ago`);

function getMetricState(definition: MetricDefinition, value: number): MetricState {
  if (definition.higherBetter) return value <= definition.critical ? "critical" : value <= definition.attention ? "warning" : "healthy";
  return value >= definition.critical ? "critical" : value >= definition.attention ? "warning" : "healthy";
}

export const formatLastUpdated = (timestamp: string) => `${timestampFormatter.format(new Date(timestamp))} UTC`;

export function buildControlRoomSnapshot(cycle: number, referenceTime = new Date()): ControlRoomSnapshot {
  const updatedAt = new Date(referenceTime.getTime() + cycle * 45_000);

  return {
    environment: "production / canary lane",
    lastUpdated: updatedAt.toISOString(),
    metrics: metricDefinitions.map((definition, index) => {
      const swing = ((cycle + index * 2) % 5) - 2;
      const value = definition.base + swing * definition.step;
      const delta = swing * definition.step;
      const signedDelta = `${delta > 0 ? "+" : ""}${delta.toFixed(definition.deltaPrecision)}${definition.deltaSuffix} vs baseline`;

      return {
        id: definition.id,
        label: definition.label,
        description: definition.description,
        value: `${value.toFixed(definition.precision)}${definition.suffix}`,
        delta: signedDelta,
        state: getMetricState(definition, value),
      };
    }),
    alerts: rotate(alertTemplates, cycle).map((alert, index) => ({ ...alert, ageLabel: formatAge(alert.minutesAgo + index * 2 + cycle) })),
    feed: rotate(feedTemplates, cycle).map((entry, index) => ({
      id: entry.id,
      title: entry.title,
      summary: entry.summary,
      category: entry.category,
      actor: entry.actor,
      system: entry.system,
      ageLabel: formatAge(entry.minutesAgo + index * 2 + cycle),
      details: entry.details.map((detail) => ({ label: detail.label, value: typeof detail.value === "function" ? detail.value(cycle) : detail.value })),
    })),
  };
}
