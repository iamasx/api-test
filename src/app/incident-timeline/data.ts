export type Severity = "Critical" | "High" | "Moderate" | "Low";

export type IncidentStatus =
  | "Investigating"
  | "Monitoring"
  | "Mitigated"
  | "Resolved";

export type TimelineStage =
  | "Detection"
  | "Triage"
  | "Mitigation"
  | "Communication"
  | "Recovery"
  | "Follow-up";

export type IncidentMetric = {
  label: string;
  value: string;
  note: string;
};

export type TimelineEntry = {
  id: string;
  timestamp: string;
  stage: TimelineStage;
  actor: string;
  title: string;
  detail: string;
};

export type Incident = {
  id: string;
  title: string;
  service: string;
  severity: Severity;
  status: IncidentStatus;
  startedAt: string;
  resolvedAt?: string;
  region: string;
  commander: string;
  summary: string;
  customerImpact: string;
  tags: string[];
  metrics: IncidentMetric[];
  timeline: TimelineEntry[];
};

export const severityOptions: Array<Severity | "All"> = [
  "All",
  "Critical",
  "High",
  "Moderate",
  "Low",
];

export const incidents: Incident[] = [
  {
    id: "INC-4821",
    title: "Payments API latency spike",
    service: "Payments Core",
    severity: "Critical",
    status: "Resolved",
    startedAt: "2026-04-18T01:14:00Z",
    resolvedAt: "2026-04-18T03:32:00Z",
    region: "Global",
    commander: "Nadia Reyes",
    summary:
      "A runaway retry loop saturated the authorization write pool and pushed checkout latency beyond the sev-one threshold.",
    customerImpact:
      "Merchants processing bursty card traffic saw delayed authorizations and intermittent checkout failures until retry pressure was capped.",
    tags: ["Database saturation", "Retry storm", "Merchant traffic"],
    metrics: [
      {
        label: "Peak latency",
        value: "12.8s",
        note: "p95 authorization round-trip",
      },
      {
        label: "Failed attempts",
        value: "18.4%",
        note: "requests exceeding timeout budget",
      },
      {
        label: "Comms updates",
        value: "6",
        note: "status page and merchant advisories",
      },
    ],
    timeline: [
      {
        id: "INC-4821-1",
        timestamp: "2026-04-18T01:14:00Z",
        stage: "Detection",
        actor: "Alerting",
        title: "Error budget alerts fired",
        detail:
          "Checkout latency breached the sev-one threshold after duplicate write traffic tripled across the primary authorization cluster.",
      },
      {
        id: "INC-4821-2",
        timestamp: "2026-04-18T01:19:00Z",
        stage: "Triage",
        actor: "Nadia Reyes",
        title: "Incident command opened",
        detail:
          "The incident lead isolated the bottleneck to the authorization write pool and pulled in database and payments engineers.",
      },
      {
        id: "INC-4821-3",
        timestamp: "2026-04-18T01:34:00Z",
        stage: "Mitigation",
        actor: "Priya Shah",
        title: "Retry circuit breaker enabled",
        detail:
          "Duplicate write volume dropped enough to restore partial throughput while high-churn merchants were rate limited.",
      },
      {
        id: "INC-4821-4",
        timestamp: "2026-04-18T01:52:00Z",
        stage: "Communication",
        actor: "Marcus Lee",
        title: "Merchant advisory posted",
        detail:
          "A merchant-facing update outlined the checkout delays, temporary rate caps, and support routing changes.",
      },
      {
        id: "INC-4821-5",
        timestamp: "2026-04-18T02:41:00Z",
        stage: "Recovery",
        actor: "Priya Shah",
        title: "Primary write pool rebalanced",
        detail:
          "Replication lag cleared and end-to-end authorization success returned to baseline under controlled replay.",
      },
      {
        id: "INC-4821-6",
        timestamp: "2026-04-18T03:32:00Z",
        stage: "Follow-up",
        actor: "Nadia Reyes",
        title: "Incident resolved with safeguards retained",
        detail:
          "Retry caps stayed in place pending backlog replay and a focused postmortem on idempotency enforcement.",
      },
    ],
  },
  {
    id: "INC-4817",
    title: "Background job queue saturation",
    service: "Workflow Engine",
    severity: "High",
    status: "Monitoring",
    startedAt: "2026-04-19T08:05:00Z",
    region: "North America",
    commander: "Avery Kim",
    summary:
      "A queue partition imbalance delayed asynchronous workflow jobs and slowed customer-facing confirmations for long-running tasks.",
    customerImpact:
      "Customers launching bulk automations saw delayed run starts and stale completion banners while workers drained the hottest partitions.",
    tags: ["Queue depth", "Partition imbalance", "Worker backlog"],
    metrics: [
      {
        label: "Backlog peak",
        value: "184k",
        note: "jobs queued above steady state",
      },
      {
        label: "Delayed starts",
        value: "27 min",
        note: "worst-case wait before execution",
      },
      {
        label: "Customer notices",
        value: "4",
        note: "support macros and status updates",
      },
    ],
    timeline: [
      {
        id: "INC-4817-1",
        timestamp: "2026-04-19T08:05:00Z",
        stage: "Detection",
        actor: "Worker telemetry",
        title: "Queue depth anomaly detected",
        detail:
          "The hottest partition exceeded worker concurrency assumptions and backlog growth accelerated over a 10-minute window.",
      },
      {
        id: "INC-4817-2",
        timestamp: "2026-04-19T08:17:00Z",
        stage: "Triage",
        actor: "Avery Kim",
        title: "Hot partition isolated",
        detail:
          "Operations confirmed new campaign imports were over-indexing a single partition key and stalling downstream jobs.",
      },
      {
        id: "INC-4817-3",
        timestamp: "2026-04-19T08:41:00Z",
        stage: "Mitigation",
        actor: "Luis Ortega",
        title: "Workers redistributed",
        detail:
          "Queue consumers were rebalanced and a temporary cap was added to the heaviest import source to flatten backlog growth.",
      },
      {
        id: "INC-4817-4",
        timestamp: "2026-04-19T09:26:00Z",
        stage: "Communication",
        actor: "Dana Brooks",
        title: "Customer run-delay update published",
        detail:
          "Support teams received runbook language for explaining delayed automation starts and expected recovery windows.",
      },
      {
        id: "INC-4817-5",
        timestamp: "2026-04-19T10:48:00Z",
        stage: "Recovery",
        actor: "Luis Ortega",
        title: "Backlog drain entered monitoring",
        detail:
          "Job latency was trending back toward normal after worker redistribution, but the incident remained open under active watch.",
      },
    ],
  },
  {
    id: "INC-4809",
    title: "Customer exports delayed in EU",
    service: "Data Exporter",
    severity: "Moderate",
    status: "Resolved",
    startedAt: "2026-04-17T05:42:00Z",
    resolvedAt: "2026-04-17T08:56:00Z",
    region: "Europe",
    commander: "Sofia Lind",
    summary:
      "A storage lifecycle policy change increased cold-read latency for export bundles and slowed generation times for EU tenants.",
    customerImpact:
      "Scheduled CSV and parquet exports completed late for EU workspaces, but no payloads were lost or corrupted.",
    tags: ["Object storage", "Cold reads", "Scheduled exports"],
    metrics: [
      {
        label: "Delayed exports",
        value: "312",
        note: "jobs completed outside SLA",
      },
      {
        label: "Worst delay",
        value: "2h 11m",
        note: "largest miss against schedule",
      },
      {
        label: "Escalations",
        value: "11",
        note: "support tickets routed to ops",
      },
    ],
    timeline: [
      {
        id: "INC-4809-1",
        timestamp: "2026-04-17T05:42:00Z",
        stage: "Detection",
        actor: "Batch monitor",
        title: "Export completion SLA breach",
        detail:
          "Automated monitoring flagged a cluster of EU export jobs completing well outside the expected SLA window.",
      },
      {
        id: "INC-4809-2",
        timestamp: "2026-04-17T06:03:00Z",
        stage: "Triage",
        actor: "Sofia Lind",
        title: "Storage tier regression confirmed",
        detail:
          "Investigators traced the slowdown to a lifecycle policy update that forced cold reads for hot export bundles.",
      },
      {
        id: "INC-4809-3",
        timestamp: "2026-04-17T06:24:00Z",
        stage: "Mitigation",
        actor: "Milo Novak",
        title: "Lifecycle policy rolled back",
        detail:
          "The previous storage policy was restored and cache warming restarted for tenants with scheduled morning exports.",
      },
      {
        id: "INC-4809-4",
        timestamp: "2026-04-17T07:11:00Z",
        stage: "Communication",
        actor: "Ella Tran",
        title: "Regional support briefed",
        detail:
          "Support teams received tenant-facing language explaining the export delays and recovery plan for queued jobs.",
      },
      {
        id: "INC-4809-5",
        timestamp: "2026-04-17T08:56:00Z",
        stage: "Follow-up",
        actor: "Sofia Lind",
        title: "Backlog replay completed",
        detail:
          "All delayed exports were regenerated successfully and a policy change review was scheduled with platform engineering.",
      },
    ],
  },
  {
    id: "INC-4798",
    title: "Login provider token refresh failures",
    service: "Identity Edge",
    severity: "High",
    status: "Mitigated",
    startedAt: "2026-04-19T14:22:00Z",
    region: "Global",
    commander: "Mira Patel",
    summary:
      "A certificate rollover mismatch caused token refresh calls to fail intermittently for sessions crossing regional edges.",
    customerImpact:
      "A subset of users was forced to sign in again when refresh attempts failed, especially after long-lived sessions crossed regions.",
    tags: ["Certificate rollover", "Session refresh", "Regional edges"],
    metrics: [
      {
        label: "Refresh failures",
        value: "8.7%",
        note: "peak failure rate before mitigation",
      },
      {
        label: "Forced logins",
        value: "21k",
        note: "estimated impacted sessions",
      },
      {
        label: "Regions affected",
        value: "3",
        note: "edge clusters with stale cert bundles",
      },
    ],
    timeline: [
      {
        id: "INC-4798-1",
        timestamp: "2026-04-19T14:22:00Z",
        stage: "Detection",
        actor: "Identity dashboard",
        title: "Session refresh failures spike",
        detail:
          "Authentication telemetry showed elevated refresh rejection rates on a subset of edge clusters after a certificate rollover.",
      },
      {
        id: "INC-4798-2",
        timestamp: "2026-04-19T14:36:00Z",
        stage: "Triage",
        actor: "Mira Patel",
        title: "Certificate bundle mismatch isolated",
        detail:
          "The incident team confirmed stale bundles on specific regional edges were validating against the wrong signing chain.",
      },
      {
        id: "INC-4798-3",
        timestamp: "2026-04-19T15:08:00Z",
        stage: "Mitigation",
        actor: "Riley Chen",
        title: "Fresh certificate bundles deployed",
        detail:
          "Affected edge nodes were rotated to the latest bundle set and long-tail retry paths were reset to pick up new trust material.",
      },
      {
        id: "INC-4798-4",
        timestamp: "2026-04-19T15:29:00Z",
        stage: "Communication",
        actor: "Dana Brooks",
        title: "Customer session advisory shared",
        detail:
          "The status page and support inboxes acknowledged forced re-logins for a subset of sessions while the fix propagated.",
      },
      {
        id: "INC-4798-5",
        timestamp: "2026-04-19T16:05:00Z",
        stage: "Recovery",
        actor: "Riley Chen",
        title: "Refresh success returned to expected range",
        detail:
          "Failure rates fell back near baseline, and the incident moved to mitigated while expiry telemetry remained under watch.",
      },
    ],
  },
  {
    id: "INC-4786",
    title: "Search indexing lag in APAC",
    service: "Search Pipeline",
    severity: "Low",
    status: "Resolved",
    startedAt: "2026-04-16T21:10:00Z",
    resolvedAt: "2026-04-16T22:18:00Z",
    region: "APAC",
    commander: "Jonas Weber",
    summary:
      "A low-priority shard rebalance delayed fresh document indexing for APAC tenants without affecting query availability.",
    customerImpact:
      "Recently created records took longer than normal to appear in search results for APAC workspaces, but reads continued to serve normally.",
    tags: ["Shard rebalance", "Index freshness", "Read path healthy"],
    metrics: [
      {
        label: "Freshness delay",
        value: "43 min",
        note: "largest lag before catch-up",
      },
      {
        label: "Queued documents",
        value: "58k",
        note: "documents waiting for indexing",
      },
      {
        label: "Support pings",
        value: "3",
        note: "tenant reports before recovery",
      },
    ],
    timeline: [
      {
        id: "INC-4786-1",
        timestamp: "2026-04-16T21:10:00Z",
        stage: "Detection",
        actor: "Index freshness monitor",
        title: "APAC freshness threshold exceeded",
        detail:
          "The search pipeline reported indexing delay beyond the low-severity freshness objective for APAC tenants.",
      },
      {
        id: "INC-4786-2",
        timestamp: "2026-04-16T21:21:00Z",
        stage: "Triage",
        actor: "Jonas Weber",
        title: "Shard rebalance identified as trigger",
        detail:
          "Investigation linked the delay to a low-priority shard rebalance that starved fresh indexing workers in one region.",
      },
      {
        id: "INC-4786-3",
        timestamp: "2026-04-16T21:37:00Z",
        stage: "Mitigation",
        actor: "Nina Flores",
        title: "Rebalance paused and workers reassigned",
        detail:
          "Rebalance work was paused to restore index freshness and spare workers were shifted back onto customer document ingestion.",
      },
      {
        id: "INC-4786-4",
        timestamp: "2026-04-16T22:18:00Z",
        stage: "Follow-up",
        actor: "Jonas Weber",
        title: "Freshness restored",
        detail:
          "The backlog fully cleared and the team queued a scheduler change so low-priority rebalances cannot preempt fresh indexing again.",
      },
    ],
  },
];
