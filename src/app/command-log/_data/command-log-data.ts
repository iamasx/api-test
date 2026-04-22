export type EventSeverity = "info" | "warning" | "error" | "success";

export type EventTag = {
  id: string;
  label: string;
  color: "slate" | "amber" | "rose" | "emerald" | "cyan" | "violet";
};

export type CommandEvent = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: EventSeverity;
  source: string;
  tags: EventTag[];
  detail: string;
};

export type CommandLogSummary = {
  totalEvents: number;
  errorCount: number;
  warningCount: number;
  lastUpdated: string;
};

export const eventTags: EventTag[] = [
  { id: "tag-deploy", label: "deploy", color: "cyan" },
  { id: "tag-auth", label: "auth", color: "violet" },
  { id: "tag-db", label: "database", color: "amber" },
  { id: "tag-api", label: "api", color: "emerald" },
  { id: "tag-cache", label: "cache", color: "slate" },
  { id: "tag-security", label: "security", color: "rose" },
];

export const commandEvents: CommandEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-04-22T14:32:07Z",
    title: "Deployment initiated",
    description: "Production deployment pipeline triggered for v2.14.0 release.",
    severity: "info",
    source: "ci/deploy-pipeline",
    tags: [eventTags[0], eventTags[3]],
    detail:
      "Artifact sha256:a8f3c… built from main@ceb90be. Rolling update strategy with 25% max-unavailable. Expected completion in 4 minutes.",
  },
  {
    id: "evt-002",
    timestamp: "2026-04-22T14:28:45Z",
    title: "Auth token refresh failure",
    description: "OAuth refresh cycle failed for service-account-analytics after three retries.",
    severity: "error",
    source: "auth/token-manager",
    tags: [eventTags[1], eventTags[5]],
    detail:
      "Upstream IdP returned 503 on /oauth2/token. Backoff schedule exhausted (2s, 4s, 8s). Downstream dashboards may show stale data until next successful refresh.",
  },
  {
    id: "evt-003",
    timestamp: "2026-04-22T14:25:12Z",
    title: "Cache eviction spike",
    description: "Redis cluster evicted 12,400 keys in the last 60 seconds due to memory pressure.",
    severity: "warning",
    source: "infra/cache-monitor",
    tags: [eventTags[4]],
    detail:
      "Eviction policy: allkeys-lru. Peak memory usage at 94.2% of 16 GB limit. Consider scaling the cluster or reviewing TTL policies for session keys.",
  },
  {
    id: "evt-004",
    timestamp: "2026-04-22T14:20:33Z",
    title: "Database migration complete",
    description: "Schema migration 047_add_audit_columns applied successfully to the primary database.",
    severity: "success",
    source: "db/migrator",
    tags: [eventTags[2]],
    detail:
      "Added columns: created_by (varchar 128), updated_by (varchar 128), audit_note (text). Zero-downtime migration using shadow column strategy. 3.2 s execution time.",
  },
  {
    id: "evt-005",
    timestamp: "2026-04-22T14:15:50Z",
    title: "API rate-limit threshold reached",
    description: "Partner integration endpoint hit 80% of its 10,000 req/min quota.",
    severity: "warning",
    source: "gateway/rate-limiter",
    tags: [eventTags[3]],
    detail:
      "Client: partner-acme (api-key …x7f2). Current window: 8,014 / 10,000 requests. Throttle headers already sent. If sustained, hard cap will engage in ~90 seconds.",
  },
  {
    id: "evt-006",
    timestamp: "2026-04-22T14:10:18Z",
    title: "Security scan passed",
    description: "Scheduled SAST/DAST scan completed with no new findings on the release branch.",
    severity: "success",
    source: "security/scanner",
    tags: [eventTags[5]],
    detail:
      "Scan scope: 1,248 files, 14 dependency trees. Previous critical finding (CVE-2026-1024) confirmed patched. Next scheduled scan: 2026-04-23T02:00Z.",
  },
  {
    id: "evt-007",
    timestamp: "2026-04-22T14:05:02Z",
    title: "Deploy canary healthy",
    description: "Canary instance v2.14.0-rc.3 reports healthy after 15-minute soak period.",
    severity: "success",
    source: "ci/deploy-pipeline",
    tags: [eventTags[0]],
    detail:
      "Error rate: 0.02% (baseline 0.03%). p99 latency: 142 ms (baseline 148 ms). Memory: 412 MB / 1 GB. Canary promoted to stable pool.",
  },
  {
    id: "evt-008",
    timestamp: "2026-04-22T13:58:41Z",
    title: "Database connection pool exhausted",
    description: "Primary connection pool reached 100% utilization for 12 seconds before recovering.",
    severity: "error",
    source: "db/pool-monitor",
    tags: [eventTags[2]],
    detail:
      "Pool size: 50 connections. Peak queue depth: 23 waiters. Longest wait: 4.7 s. Recovered after slow-query timeout released 8 connections. Recommend increasing pool to 75.",
  },
];

export function getCommandLogView() {
  const summary: CommandLogSummary = {
    totalEvents: commandEvents.length,
    errorCount: commandEvents.filter((e) => e.severity === "error").length,
    warningCount: commandEvents.filter((e) => e.severity === "warning").length,
    lastUpdated: commandEvents[0].timestamp,
  };

  return { events: commandEvents, summary };
}
