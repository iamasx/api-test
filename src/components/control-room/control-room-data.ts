export type ActivityCategory = "Deployments" | "Incidents" | "Jobs" | "Notes";
export type ActivityFilter = "All" | ActivityCategory;
export type AlertSeverity = "info" | "warning" | "critical";
export type MetricTone = "good" | "watch" | "hot";
export type QuickActionTone = "teal" | "amber" | "rose" | "sky" | "slate";

export type MetricSnapshot = {
  id: string;
  label: string;
  displayValue: string;
  deltaLabel: string;
  caption: string;
  supportLabel: string;
  stateLabel: string;
  tone: MetricTone;
};

export type AlertItem = {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  service: string;
  owner: string;
  raisedAtLabel: string;
};

export type ActivityItem = {
  id: string;
  category: ActivityCategory;
  title: string;
  detail: string;
  status: string;
  actor: string;
  service: string;
  happenedAtLabel: string;
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
  response: string;
  tone: QuickActionTone;
};

export type ControlRoomSnapshot = {
  environmentLabel: string;
  lastUpdatedLabel: string;
  metrics: MetricSnapshot[];
  alerts: AlertItem[];
  activities: ActivityItem[];
  revision: number;
};

type MetricBlueprint = {
  id: string;
  label: string;
  base: number;
  swing: number;
  step: number;
  precision: number;
  suffix: string;
  deltaStep: number;
  deltaPrecision: number;
  deltaSuffix: string;
  caption: string;
  supportLabel: string;
  stateLabel: string;
  tone: MetricTone;
};

type AlertBlueprint = [
  id: string,
  severity: AlertSeverity,
  title: string,
  message: string,
  service: string,
  owner: string,
  offsetMinutes: number,
];

type ActivityBlueprint = [
  id: string,
  category: ActivityCategory,
  title: string,
  detail: string,
  status: string,
  actor: string,
  service: string,
  offsetMinutes: number,
];

type QuickActionBlueprint = [
  id: string,
  label: string,
  description: string,
  response: string,
  tone: QuickActionTone,
];

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const activityFilters: ActivityFilter[] = ["All", "Deployments", "Incidents", "Jobs", "Notes"];

const metricBlueprints: MetricBlueprint[] = [
  { id: "throughput", label: "Global throughput", base: 842, swing: 148, step: 17, precision: 0, suffix: " req/s", deltaStep: 14, deltaPrecision: 0, deltaSuffix: " req/s", caption: "Ingress across the mock edge fleet", supportLabel: "Target 800 req/s", stateLabel: "Nominal", tone: "good" },
  { id: "latency", label: "Edge latency p95", base: 186, swing: 44, step: 5, precision: 0, suffix: " ms", deltaStep: 4, deltaPrecision: 0, deltaSuffix: " ms", caption: "Public request latency at the 95th percentile", supportLabel: "Budget 200 ms", stateLabel: "Watch", tone: "watch" },
  { id: "success-rate", label: "Success rate", base: 99.82, swing: 0.18, step: 0.03, precision: 2, suffix: "%", deltaStep: 0.04, deltaPrecision: 2, deltaSuffix: "%", caption: "Healthy responses returned by core APIs", supportLabel: "Error budget 0.25%", stateLabel: "Stable", tone: "good" },
  { id: "queue-depth", label: "Queue depth", base: 38, swing: 24, step: 4, precision: 0, suffix: " jobs", deltaStep: 3, deltaPrecision: 0, deltaSuffix: " jobs", caption: "Outstanding background work in mock schedulers", supportLabel: "Comfort zone < 50", stateLabel: "Rising", tone: "watch" },
  { id: "saturation", label: "Worker saturation", base: 68, swing: 22, step: 3, precision: 0, suffix: "%", deltaStep: 2, deltaPrecision: 0, deltaSuffix: "%", caption: "Average load across batch workers", supportLabel: "Headroom 20%", stateLabel: "Buffered", tone: "good" },
  { id: "incidents", label: "Open incidents", base: 2, swing: 4, step: 1, precision: 0, suffix: "", deltaStep: 1, deltaPrecision: 0, deltaSuffix: "", caption: "Active response threads requiring operator attention", supportLabel: "Resolved target 0", stateLabel: "Escalated", tone: "hot" },
  { id: "deployments", label: "Deployments today", base: 14, swing: 8, step: 2, precision: 0, suffix: "", deltaStep: 1, deltaPrecision: 0, deltaSuffix: "", caption: "Synthetic rollouts promoted across regions", supportLabel: "Canary ratio 2:1", stateLabel: "Active", tone: "good" },
  { id: "coverage", label: "Runbook coverage", base: 83, swing: 10, step: 2, precision: 0, suffix: "%", deltaStep: 1, deltaPrecision: 0, deltaSuffix: "%", caption: "Mock services linked to a documented response path", supportLabel: "Next target 90%", stateLabel: "Improving", tone: "watch" },
];

const alertBlueprints: AlertBlueprint[] = [
  ["alert-control-api", "critical", "Control API retries breached the high-water mark", "Retry volume in sandbox region 2 is 2.3x above the rehearsal baseline.", "control-api", "On-call backend", 6],
  ["alert-scheduler", "warning", "Background queue lag is trending upward", "Scheduler lane B is averaging 18% slower completion than the last refresh window.", "scheduler", "Jobs desk", 14],
  ["alert-observability", "info", "Synthetic probe pack rotated to rehearsal mode", "Latency probes now target the upcoming canary template for pre-release comparison.", "observability", "Platform ops", 23],
];

const activityBlueprints: ActivityBlueprint[] = [
  ["act-rollout-eu", "Deployments", "Release cr-77 promoted to 50% in eu-west-1", "Synthetic checks stayed green long enough to widen the Europe canary from 15% to 50%.", "Canary widened", "release-bot", "control-api", 4],
  ["act-incident-cache", "Incidents", "Operator opened incident thread for cache stampede drill", "The response cell tagged the issue as rehearsal-only after cache churn crossed the mock threshold three times in a row.", "Incident bridged", "maya.k", "edge-cache", 9],
  ["act-job-replay", "Jobs", "Replay batch kicked off for failed settlement jobs", "Seventeen sandbox jobs were queued for replay so the worker pool could validate the retry policy under moderate load.", "Replay running", "scheduler", "job-runner", 13],
  ["act-rollout-us", "Deployments", "US rehearsal lane pinned to fallback image", "Operators rolled the traffic slice back to the fallback image to compare memory pressure before another deploy attempt.", "Fallback pinned", "nina.p", "worker-api", 18],
  ["act-job-import", "Jobs", "Ingest cleanup completed on archive partition", "The cleanup job reclaimed headroom in the archive partition and cut the simulated backlog by twelve percent.", "Cleanup done", "janitor-bot", "storage-ops", 24],
  ["act-incident-auth", "Incidents", "Auth throttling rehearsal escalated to paging stage", "The drill advanced after the mock rate limiter exceeded its error budget and triggered the paging branch of the runbook.", "Paging staged", "ila.s", "identity-gateway", 31],
  ["act-rollout-apac", "Deployments", "APAC config bundle validated against standby nodes", "A dry-run of the next control-plane config passed on standby nodes and cleared the region for tomorrow's rehearsal.", "Bundle cleared", "config-bot", "control-plane", 37],
  ["act-job-backfill", "Jobs", "Billing backfill throttled to protect worker headroom", "The scheduler reduced concurrency from 16 to 10 to keep the simulated backlog under the saturation threshold.", "Throttle applied", "scheduling-rule", "billing-jobs", 43],
  ["act-incident-db", "Incidents", "Database failover drill cleared after replica catch-up", "Replica lag returned to range, so the team closed the drill and marked the failover path ready for another rehearsal.", "Drill resolved", "on-call db", "replica-cluster", 52],
  ["act-job-audit", "Jobs", "Nightly audit pack queued for integrity verification", "The verification pack will compare checksum drift across archived snapshots before the next synthetic deploy.", "Audit queued", "audit-bot", "artifact-vault", 66],
  ["act-rollout-canary", "Deployments", "Canary scorecard published for shift handoff", "The release scorecard captured latency, rollback triggers, and error rate so the next operator can continue the drill cleanly.", "Handoff posted", "shift-lead", "release-ops", 73],
];

const quickActionBlueprints: QuickActionBlueprint[] = [
  ["queue-canary", "Queue canary", "Simulate a staged rollout across two rehearsal regions.", "Canary simulation queued for the sandbox release lane.", "teal"],
  ["pause-workers", "Pause workers", "Dry-run a pause on the secondary batch pool.", "Secondary worker pool marked as paused in the mock control plane.", "amber"],
  ["dispatch-oncall", "Dispatch on-call", "Open a rehearsal escalation thread for the active critical alert.", "Escalation thread drafted and routed to the simulated on-call rotation.", "rose"],
  ["export-briefing", "Export briefing", "Generate a dummy handoff summary for the next operator.", "Shift briefing assembled with the current dashboard snapshot.", "sky"],
  ["run-diagnostics", "Run diagnostics", "Trigger a fake cross-service health sweep.", "Diagnostic sweep started across the rehearsal service graph.", "slate"],
];

export const quickActions: QuickAction[] = quickActionBlueprints.map(
  ([id, label, description, response, tone]) => ({ id, label, description, response, tone }),
);

function formatMetricValue(value: number, precision: number, suffix: string) {
  return `${value.toLocaleString("en-US", { minimumFractionDigits: precision, maximumFractionDigits: precision })}${suffix}`;
}

function formatDeltaLabel(value: number, precision: number, suffix: string) {
  const formatted = Math.abs(value).toLocaleString("en-US", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
  return `${value >= 0 ? "+" : "-"}${formatted}${suffix} vs last refresh`;
}

function formatDateLabel(date: Date) {
  return dateTimeFormatter.format(date);
}

export function createControlRoomSnapshot(revision = 0): ControlRoomSnapshot {
  const now = new Date();

  return {
    environmentLabel: "Experimental Sandbox",
    lastUpdatedLabel: formatDateLabel(now),
    revision,
    metrics: metricBlueprints.map((metric, index) => {
      const wave = ((revision + 1) * metric.step + index * 7) % metric.swing;
      const value = Number((metric.base + wave - metric.swing / 2).toFixed(metric.precision));
      const delta = Number(((((revision + index) % 5) - 2) * metric.deltaStep).toFixed(metric.deltaPrecision));
      return {
        id: metric.id,
        label: metric.label,
        displayValue: formatMetricValue(value, metric.precision, metric.suffix),
        deltaLabel: formatDeltaLabel(delta, metric.deltaPrecision, metric.deltaSuffix),
        caption: metric.caption,
        supportLabel: metric.supportLabel,
        stateLabel: metric.stateLabel,
        tone: metric.tone,
      };
    }),
    alerts: alertBlueprints.map(([id, severity, title, message, service, owner, offsetMinutes], index) => ({
      id,
      severity,
      title,
      message,
      service,
      owner,
      raisedAtLabel: formatDateLabel(new Date(now.getTime() - (offsetMinutes + revision + index) * 60_000)),
    })),
    activities: activityBlueprints.map(([id, category, title, detail, status, actor, service, offsetMinutes], index) => ({
      id,
      category,
      title,
      detail,
      status,
      actor,
      service,
      happenedAtLabel: formatDateLabel(
        new Date(now.getTime() - (offsetMinutes + revision * (index % 2 === 0 ? 1 : 2)) * 60_000),
      ),
    })),
  };
}
