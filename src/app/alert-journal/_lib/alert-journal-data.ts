export type AlertJournalSeverity = "Critical" | "High" | "Moderate" | "Low";

export type AlertJournalResolutionStatus =
  | "Resolved"
  | "Monitoring"
  | "Mitigation active"
  | "Follow-up queued";

export type AlertJournalDay = {
  id: string;
  date: string;
  label: string;
  shiftLabel: string;
  summary: string;
};

export type AlertJournalResolution = {
  status: AlertJournalResolutionStatus;
  owner: string;
  updatedAt: string;
  updatedLabel: string;
  summary: string;
  detail: string;
  nextStep: string;
  actions: string[];
};

export type AlertJournalEntry = {
  id: string;
  dayId: AlertJournalDay["id"];
  occurredAt: string;
  occurredLabel: string;
  durationLabel: string;
  title: string;
  service: string;
  environment: string;
  severity: AlertJournalSeverity;
  summary: string;
  impact: string;
  tags: string[];
  responders: string[];
  resolution: AlertJournalResolution;
};

export const alertJournalDays: AlertJournalDay[] = [
  {
    id: "2026-04-20",
    date: "2026-04-20",
    label: "Apr 20, 2026",
    shiftLabel: "Day shift takeover",
    summary:
      "Queue pressure, cache jitter, and one partner retry storm all stayed visible during the same operating window, forcing tighter prioritization than the prior two days.",
  },
  {
    id: "2026-04-19",
    date: "2026-04-19",
    label: "Apr 19, 2026",
    shiftLabel: "Weekend bridge coverage",
    summary:
      "Regional drift and webhook duplication both surfaced as low-volume but high-noise alerts, so the journal captures the exact handoff and mitigation notes for the next shift.",
  },
  {
    id: "2026-04-18",
    date: "2026-04-18",
    label: "Apr 18, 2026",
    shiftLabel: "Night stabilization window",
    summary:
      "The earliest journal entries focus on preventative stops and recovery validation, establishing the context for the follow-up work that continued into the weekend.",
  },
];

export const alertJournalEntries: AlertJournalEntry[] = [
  {
    id: "alert-2042",
    dayId: "2026-04-20",
    occurredAt: "2026-04-20T20:42:00Z",
    occurredLabel: "Apr 20, 2026 · 20:42 UTC",
    durationLabel: "47 minutes to mitigation",
    title: "Warehouse ingest backlog crossed the watch threshold during intake overlap",
    service: "Warehouse Ingest",
    environment: "Production / us-east-1",
    severity: "Critical",
    summary:
      "Morning intake overlap pushed ingest latency past the alert threshold for three enterprise tenants before autoscaling completed.",
    impact:
      "Delayed inventory snapshots affected customer dashboards and created a visible mismatch between warehouse receipts and availability estimates.",
    tags: ["queue-depth", "tenant-impact", "ingest-watch"],
    responders: ["Fulfillment Ops", "Runtime Engineering", "Support Desk"],
    resolution: {
      status: "Mitigation active",
      owner: "Mina Patel",
      updatedAt: "2026-04-20T21:09:00Z",
      updatedLabel: "Updated at 21:09 UTC",
      summary:
        "Concurrency caps were narrowed for the noisiest tenants while a dedicated ingest lane was reopened for backlog draining.",
      detail:
        "The mitigation preserved intake throughput for the rest of the cohort by isolating two bursty tenants onto a temporary queue partition. Backlog age dropped from 18 minutes to 6 minutes before the next shift review, but the journal keeps the alert active because the tenant-specific caps need removal after traffic normalizes.",
      nextStep:
        "Review queue age after the next hourly batch cutover and remove temporary partition caps if every tenant stays under the six-minute target.",
      actions: [
        "Shifted two enterprise tenants to a temporary isolated queue lane.",
        "Raised worker concurrency for the ingest replay pool by 20%.",
        "Prepared customer-facing updates in case backlog age rises again before cap removal.",
      ],
    },
  },
  {
    id: "alert-1934",
    dayId: "2026-04-20",
    occurredAt: "2026-04-20T19:34:00Z",
    occurredLabel: "Apr 20, 2026 · 19:34 UTC",
    durationLabel: "31 minutes to stable monitoring",
    title: "EU gateway jitter reopened after cache warmup fanout returned",
    service: "Edge Gateway",
    environment: "Production / eu-central-1",
    severity: "High",
    summary:
      "Gateway retries spiked during a cache warmup cycle, reintroducing the same packet jitter pattern that had been partially contained on the previous day.",
    impact:
      "A narrow set of sessions retried more often than normal, increasing perceived latency for operators working out of the EU region.",
    tags: ["regional-drift", "cache-warmup", "follow-up"],
    responders: ["Network Reliability", "Platform Runtime"],
    resolution: {
      status: "Monitoring",
      owner: "Leo Martins",
      updatedAt: "2026-04-20T20:05:00Z",
      updatedLabel: "Updated at 20:05 UTC",
      summary:
        "Warmup fanout was reduced and regional retries fell back within the monitoring band, but no permanent fix has shipped yet.",
      detail:
        "Operators narrowed the pre-warm fanout multiplier for the EU cache tier and confirmed that the retry rate receded without needing a broader regional failover. The route keeps this in monitoring because the long-term patch for stale fanout state is still in review and the same signal resurfaced within 24 hours.",
      nextStep:
        "Validate the cache warmup patch against replay traces before the next EU morning traffic ramp begins.",
      actions: [
        "Reduced cache warmup fanout from four-way to two-way expansion.",
        "Suppressed duplicate gateway alerts during the mitigation window.",
        "Queued a replay-trace verification pass for the pending runtime patch.",
      ],
    },
  },
  {
    id: "alert-1748",
    dayId: "2026-04-20",
    occurredAt: "2026-04-20T17:48:00Z",
    occurredLabel: "Apr 20, 2026 · 17:48 UTC",
    durationLabel: "22 minutes to resolution",
    title: "Bulk export throttles restored after a partner retry storm",
    service: "Partner Exporter",
    environment: "Production / us-west-2",
    severity: "Moderate",
    summary:
      "A partner-side retry loop caused export workers to re-open older batches and consume throttle capacity reserved for scheduled exports.",
    impact:
      "Partner deliveries slowed, but internal customer dashboards remained current because the export queue stayed isolated from the core ingest path.",
    tags: ["queue-depth", "partner-retries", "resolved"],
    responders: ["Integration Ops", "Automation"],
    resolution: {
      status: "Resolved",
      owner: "Sofia Kim",
      updatedAt: "2026-04-20T18:10:00Z",
      updatedLabel: "Updated at 18:10 UTC",
      summary:
        "Duplicate retries were dropped at the broker layer and the reserved export throttle budget was restored without requiring manual replay.",
      detail:
        "The team applied a short-lived duplicate suppression rule at the broker boundary and then rebalanced throttle reservations across the export worker pool. Queue depth normalized before the next scheduled dispatch window, so the alert closed with no remaining backlog.",
      nextStep:
        "Expire the temporary duplicate suppression rule after the partner confirms their retry policy rollback.",
      actions: [
        "Dropped duplicate export retries at the broker boundary.",
        "Rebalanced throttle reservations to protect the next dispatch window.",
        "Closed the alert after queue depth stayed flat for two full polling cycles.",
      ],
    },
  },
  {
    id: "alert-1540",
    dayId: "2026-04-19",
    occurredAt: "2026-04-19T15:40:00Z",
    occurredLabel: "Apr 19, 2026 · 15:40 UTC",
    durationLabel: "1 hour 4 minutes to handoff",
    title: "APAC sync lag traced to replica lease drift",
    service: "Catalog Sync",
    environment: "Production / ap-southeast-1",
    severity: "High",
    summary:
      "Replica lease drift caused one APAC sync lane to serve older catalog state than the adjacent regions during a weekend traffic increase.",
    impact:
      "Merchandising teams saw stale catalog counts for a subset of APAC storefronts while the sync lane stayed out of parity with the global baseline.",
    tags: ["regional-drift", "replica-lease", "handoff"],
    responders: ["Regional Operations", "Database Reliability"],
    resolution: {
      status: "Follow-up queued",
      owner: "Arun Bose",
      updatedAt: "2026-04-19T16:44:00Z",
      updatedLabel: "Updated at 16:44 UTC",
      summary:
        "The drifting lease holder was rotated away from the hot shard, but the journal kept a follow-up open for the day team to validate full parity after rebalance.",
      detail:
        "Operators drained the stale replica from the active sync rotation and forced a lease refresh on the affected shard family. Freshness improved immediately, but the next shift still needed to compare parity snapshots across all APAC storefront cohorts before the issue could be fully closed.",
      nextStep:
        "Complete a parity sweep across the rotated shard family and close the alert only if every APAC cohort matches the global baseline.",
      actions: [
        "Removed the stale replica from the active sync rotation.",
        "Forced a lease refresh on the affected shard family.",
        "Handed a parity verification checklist to the incoming day team.",
      ],
    },
  },
  {
    id: "alert-1412",
    dayId: "2026-04-19",
    occurredAt: "2026-04-19T14:12:00Z",
    occurredLabel: "Apr 19, 2026 · 14:12 UTC",
    durationLabel: "18 minutes to mitigation",
    title: "Identity webhook duplicates muted with a temporary dedupe rule",
    service: "Identity Events",
    environment: "Production / global",
    severity: "Moderate",
    summary:
      "Webhook retries from a downstream integrator began duplicating identity lifecycle events and inflated tenant-level audit counts.",
    impact:
      "No customer writes were lost, but duplicated audit events forced support and security teams to review the same tenant history more than once.",
    tags: ["tenant-impact", "automation", "follow-up"],
    responders: ["Identity Platform", "Security Operations"],
    resolution: {
      status: "Monitoring",
      owner: "Casey Nguyen",
      updatedAt: "2026-04-19T14:30:00Z",
      updatedLabel: "Updated at 14:30 UTC",
      summary:
        "A short-term dedupe rule suppressed duplicate downstream callbacks while the integrator validated their retry settings.",
      detail:
        "The temporary rule matches duplicate webhook envelopes within a narrow time band and drops exact callback repeats before they reach the tenant audit service. The path is quiet now, but the alert stays in monitoring until the integrator confirms the retry bug is permanently disabled.",
      nextStep:
        "Remove the dedupe rule after one clean callback cycle from the external integrator.",
      actions: [
        "Applied an envelope-level dedupe rule to repeated webhook callbacks.",
        "Marked duplicated audit events for background cleanup.",
        "Opened a partner follow-up to validate the upstream retry fix.",
      ],
    },
  },
  {
    id: "alert-1106",
    dayId: "2026-04-19",
    occurredAt: "2026-04-19T11:06:00Z",
    occurredLabel: "Apr 19, 2026 · 11:06 UTC",
    durationLabel: "39 minutes to resolution",
    title: "Notification digest lag closed after scheduler slot rebalance",
    service: "Digest Scheduler",
    environment: "Production / us-east-2",
    severity: "Low",
    summary:
      "Digest jobs began missing their preferred slot after a reporting workload pinned the same scheduler lane used by low-priority outbound summaries.",
    impact:
      "Digest emails were delayed, but no user-facing transaction flow or customer data path was blocked.",
    tags: ["queue-depth", "scheduler-balance", "resolved"],
    responders: ["Messaging Platform", "Runtime Engineering"],
    resolution: {
      status: "Resolved",
      owner: "Jules Everett",
      updatedAt: "2026-04-19T11:45:00Z",
      updatedLabel: "Updated at 11:45 UTC",
      summary:
        "The scheduler lane was rebalanced and digest jobs returned to their target slot without requiring a backlog replay.",
      detail:
        "Operators moved reporting work onto a quieter scheduler pool, restoring enough headroom for the digest queue to clear naturally. The delayed digests were still sent inside the acceptable delivery band, so the alert was closed after the next run cycle landed on time.",
      nextStep:
        "Keep the reporting lane split in place until the next scheduler utilization review.",
      actions: [
        "Reassigned reporting workloads onto a dedicated scheduler lane.",
        "Confirmed digest jobs returned to their expected execution slot.",
        "Closed the alert after one on-time digest cycle.",
      ],
    },
  },
  {
    id: "alert-0845",
    dayId: "2026-04-18",
    occurredAt: "2026-04-18T08:45:00Z",
    occurredLabel: "Apr 18, 2026 · 08:45 UTC",
    durationLabel: "Preventative stop after 9 minutes",
    title: "Archive retention diff blocked before applying an unsigned policy token",
    service: "Archive Policy Sync",
    environment: "Compliance staging",
    severity: "High",
    summary:
      "A retention policy sync halted itself after the execution context arrived without the expected signed compliance token.",
    impact:
      "No storage state was changed, but the weekend retention review could not proceed until the approval envelope was repaired and replayed.",
    tags: ["approval-block", "policy-sync", "follow-up"],
    responders: ["Compliance Engineering", "Data Platform"],
    resolution: {
      status: "Follow-up queued",
      owner: "Hanna Iqbal",
      updatedAt: "2026-04-18T08:54:00Z",
      updatedLabel: "Updated at 08:54 UTC",
      summary:
        "The safeguard worked correctly, so the journal records the blocked run and the approval repair required before replay.",
      detail:
        "The sync job validated the missing token before any policy mutation took place and exited cleanly. Teams agreed to keep the alert open as a queued follow-up because the retention review still depends on replaying the exact staged change once the signed approval envelope is restored.",
      nextStep:
        "Attach the signed token to the staged job envelope and replay the retention diff in compliance staging.",
      actions: [
        "Stopped the policy sync before any storage mutation occurred.",
        "Captured the missing approval envelope metadata for replay.",
        "Queued the repair task for the next compliance review window.",
      ],
    },
  },
  {
    id: "alert-0712",
    dayId: "2026-04-18",
    occurredAt: "2026-04-18T07:12:00Z",
    occurredLabel: "Apr 18, 2026 · 07:12 UTC",
    durationLabel: "52 minutes to closure",
    title: "Search shard recovery closed after cross-zone rebalance",
    service: "Search Indexer",
    environment: "Production / us-central-1",
    severity: "Low",
    summary:
      "One search shard family recovered slowly after maintenance until traffic was rebalanced across healthier zones.",
    impact:
      "Search freshness dipped briefly for a small zone set, but the wider search estate remained healthy and query success rates held steady.",
    tags: ["regional-drift", "search-freshness", "resolved"],
    responders: ["Search Operations", "Regional Operations"],
    resolution: {
      status: "Resolved",
      owner: "Tessa Morgan",
      updatedAt: "2026-04-18T08:04:00Z",
      updatedLabel: "Updated at 08:04 UTC",
      summary:
        "Traffic was moved off the recovering zone pair and shard freshness returned to baseline before customer error rates changed.",
      detail:
        "The team shifted a fraction of search traffic onto healthier zones while the recovering shard family completed its catch-up cycle. Freshness parity returned inside the first hour, so the alert closed after the final verification sweep confirmed stable replication.",
      nextStep:
        "Review the maintenance playbook to shorten the next shard recovery warmup window.",
      actions: [
        "Moved search traffic away from the slow-recovering zone pair.",
        "Verified shard freshness parity after the rebalance completed.",
        "Closed the alert after the replication sweep stayed stable.",
      ],
    },
  },
];
