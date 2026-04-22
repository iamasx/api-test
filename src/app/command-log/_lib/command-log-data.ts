export type CommandEventSeverity = "Critical" | "High" | "Moderate" | "Low";

export type CommandEventCategory =
  | "Deploy"
  | "Mitigation"
  | "Investigation"
  | "Escalation"
  | "Automation"
  | "Handoff";

export type CommandEventStatus =
  | "Completed"
  | "Watching"
  | "Needs follow-up"
  | "Blocked";

export type CommandLogEvent = {
  id: string;
  occurredAt: string;
  occurredLabel: string;
  title: string;
  summary: string;
  detail: string;
  command: string;
  actor: string;
  team: string;
  severity: CommandEventSeverity;
  category: CommandEventCategory;
  status: CommandEventStatus;
  environment: string;
  tags: string[];
  relatedServices: string[];
  notes: string[];
  nextAction: string;
};

export const commandLogEvents: CommandLogEvent[] = [
  {
    id: "evt-0934",
    occurredAt: "2026-04-20T09:34:00Z",
    occurredLabel: "Apr 20, 2026 · 09:34 UTC",
    title: "Rollback held after post-deploy queue drift",
    summary:
      "A scheduled rollback was paused when queue depth stabilized faster than expected after the latest worker deploy.",
    detail:
      "Command reviewed queue telemetry from the last two deploy steps and kept the worker rollout live after backlog growth flattened under the watch threshold.",
    command: "hold rollback workflow-engine@2026.04.20.2",
    actor: "Mara Chen",
    team: "Command",
    severity: "High",
    category: "Mitigation",
    status: "Watching",
    environment: "Production / us-east-1",
    tags: ["rollback-watch", "queue-depth", "deploy-window"],
    relatedServices: ["Workflow Engine", "Import API"],
    notes: [
      "Backlog growth fell from 14% to 3% over the final five-minute window.",
      "Canary tenants stayed within the run-start SLA after the hold decision.",
      "Rollback remains armed if queue age crosses the 12-minute threshold again.",
    ],
    nextAction:
      "Re-evaluate rollback posture after the next autoscaling interval completes.",
  },
  {
    id: "evt-0918",
    occurredAt: "2026-04-20T09:18:00Z",
    occurredLabel: "Apr 20, 2026 · 09:18 UTC",
    title: "Escalation opened for certificate parity mismatch",
    summary:
      "A regional edge cluster failed parity checks during the morning cert validation sweep.",
    detail:
      "The identity edge team escalated after one cluster continued serving an older certificate bundle while adjacent regions had already rotated to the signed replacement chain.",
    command: "open escalation identity-edge cert-rotation-apac",
    actor: "Dana Brooks",
    team: "Edge Operations",
    severity: "Critical",
    category: "Escalation",
    status: "Needs follow-up",
    environment: "Production / ap-southeast-1",
    tags: ["regional-drift", "identity-edge", "follow-up"],
    relatedServices: ["Identity Edge", "Session Broker"],
    notes: [
      "Parity mismatch affected one of six APAC clusters.",
      "Forced re-login rate remained below the incident trigger threshold.",
      "Manual verification was requested before automated re-propagation proceeds.",
    ],
    nextAction:
      "Confirm signed bundle lineage and release the replacement package to the affected edge cluster.",
  },
  {
    id: "evt-0852",
    occurredAt: "2026-04-20T08:52:00Z",
    occurredLabel: "Apr 20, 2026 · 08:52 UTC",
    title: "Automation replay drained delayed export jobs",
    summary:
      "The export replay run completed and cleared the overnight queue without requiring manual tenant intervention.",
    detail:
      "An automated replay worker re-issued pending export jobs in controlled batches and confirmed successful delivery for the delayed EU workspace set.",
    command: "run replay exports --batch-size 40 --region eu-west",
    actor: "Inez Alvarez",
    team: "Automation",
    severity: "Moderate",
    category: "Automation",
    status: "Completed",
    environment: "Production / eu-west-1",
    tags: ["automation", "export-recovery", "follow-up"],
    relatedServices: ["Data Exporter", "Blob Archive"],
    notes: [
      "312 export jobs were replayed across eight batches.",
      "No data integrity mismatches were detected during checksum comparison.",
      "Support macros were updated to close affected customer threads.",
    ],
    nextAction:
      "Remove the temporary replay throttle once the next scheduled export window passes cleanly.",
  },
  {
    id: "evt-0827",
    occurredAt: "2026-04-20T08:27:00Z",
    occurredLabel: "Apr 20, 2026 · 08:27 UTC",
    title: "Deploy approved for queue balancer patch",
    summary:
      "Command approved a patch deployment after the queue balancer fix passed soak checks on the staging lane.",
    detail:
      "The patch modifies partition rebalance heuristics so bursty imports cannot monopolize the hottest worker lane during morning ingest spikes.",
    command: "deploy workflow-engine --release queue-balancer-r12",
    actor: "Luis Ortega",
    team: "Runtime Engineering",
    severity: "High",
    category: "Deploy",
    status: "Completed",
    environment: "Staging -> Production",
    tags: ["deploy-window", "queue-depth", "worker-fleet"],
    relatedServices: ["Workflow Engine", "Worker Fleet"],
    notes: [
      "Soak checks covered synthetic import traffic and live replay samples.",
      "Memory headroom improved by 11% during the staging verification pass.",
      "The patch is pinned behind the morning command review window for all regions.",
    ],
    nextAction:
      "Monitor queue age and worker utilization through the first production burst cycle.",
  },
  {
    id: "evt-0759",
    occurredAt: "2026-04-20T07:59:00Z",
    occurredLabel: "Apr 20, 2026 · 07:59 UTC",
    title: "Investigation linked cold-start latency to cache miss fanout",
    summary:
      "Operators isolated a cold-start regression to a fanout path in the config cache warmup routine.",
    detail:
      "The investigation compared traces across three regions and found that warmup requests multiplied against a stale config shard, increasing startup latency for background workers.",
    command: "inspect traces cache-warmup --compare us-east eu-west ap-southeast",
    actor: "Priya Shah",
    team: "Platform Reliability",
    severity: "Moderate",
    category: "Investigation",
    status: "Watching",
    environment: "Production / multi-region",
    tags: ["cache-fanout", "multi-region", "follow-up"],
    relatedServices: ["Config Cache", "Worker Runtime"],
    notes: [
      "Latency impact was measurable only during worker cold starts.",
      "No customer error spike accompanied the warmup regression.",
      "A cache key compaction patch is under review to reduce fanout pressure.",
    ],
    nextAction:
      "Validate the candidate cache-key fix against replay traces before the noon deploy window.",
  },
  {
    id: "evt-0724",
    occurredAt: "2026-04-20T07:24:00Z",
    occurredLabel: "Apr 20, 2026 · 07:24 UTC",
    title: "Handoff transferred APAC search lag watch to day shift",
    summary:
      "Night command handed the remaining APAC indexing lag watch to the incoming regional team.",
    detail:
      "The handoff captured queue age, shard rebalance posture, and the exact trigger for reopening mitigation if freshness drift resumes during regional traffic growth.",
    command: "handoff search-pipeline apac-lag-watch --to day-shift",
    actor: "Jonas Weber",
    team: "Regional Operations",
    severity: "Low",
    category: "Handoff",
    status: "Watching",
    environment: "Production / apac",
    tags: ["shift-handoff", "regional-drift", "follow-up"],
    relatedServices: ["Search Pipeline", "Indexer Fleet"],
    notes: [
      "Freshness lag recovered to 6 minutes before shift transfer.",
      "A low-priority rebalance remains paused pending the day-shift review.",
      "The handoff packet includes the exact shard IDs affected overnight.",
    ],
    nextAction:
      "Resume the paused rebalance only if freshness remains under the eight-minute watch threshold.",
  },
  {
    id: "evt-0651",
    occurredAt: "2026-04-20T06:51:00Z",
    occurredLabel: "Apr 20, 2026 · 06:51 UTC",
    title: "Automation blocked on missing storage policy approval",
    summary:
      "A storage policy sync job was halted because the required compliance approval token was missing from the run context.",
    detail:
      "The automation flow correctly stopped before applying a lifecycle policy update to archival buckets, preventing unreviewed retention changes from moving forward.",
    command: "sync storage-policy archive-retention-2026-q2",
    actor: "Milo Novak",
    team: "Data Platform",
    severity: "High",
    category: "Automation",
    status: "Blocked",
    environment: "Compliance staging",
    tags: ["automation", "approval-block", "storage-policy"],
    relatedServices: ["Blob Archive", "Policy Control"],
    notes: [
      "The blocked run exited before mutating any storage configuration.",
      "Compliance approval metadata was present in the ticket but absent from the execution context.",
      "Retry is safe once the approval token is attached to the job envelope.",
    ],
    nextAction:
      "Inject the signed approval token into the queued sync job and re-run the policy check.",
  },
  {
    id: "evt-0612",
    occurredAt: "2026-04-20T06:12:00Z",
    occurredLabel: "Apr 20, 2026 · 06:12 UTC",
    title: "Mitigation started for elevated checkout retry pressure",
    summary:
      "Command capped retry concurrency after checkout write pressure crossed the early mitigation threshold.",
    detail:
      "Payments operators reduced duplicate retry traffic against the authorization pool and staged a narrower merchant allowlist while deeper analysis continued.",
    command: "apply retry-cap payments-core --limit 2x --scope merchant-burst",
    actor: "Nadia Reyes",
    team: "Payments Operations",
    severity: "Critical",
    category: "Mitigation",
    status: "Completed",
    environment: "Production / global",
    tags: ["queue-depth", "merchant-burst", "mitigation-watch"],
    relatedServices: ["Payments Core", "Authorization Pool"],
    notes: [
      "Early mitigation reduced duplicate writes within three minutes.",
      "Two high-volume merchants remained on a narrowed allowlist during the cap.",
      "Authorization success improved before the first external advisory went out.",
    ],
    nextAction:
      "Compare post-cap latency against the previous incident baseline and decide whether to keep the cap through peak hours.",
  },
  {
    id: "evt-0545",
    occurredAt: "2026-04-20T05:45:00Z",
    occurredLabel: "Apr 20, 2026 · 05:45 UTC",
    title: "Canary deploy verified for notification pipeline",
    summary:
      "The canary instance for the notification pipeline v3.8.1 passed all smoke tests and was promoted to stable.",
    detail:
      "Delivery latency held at p99 = 78 ms through the soak window. No dead-letter queue growth was observed across any region during the verification period.",
    command: "promote canary notification-pipeline@3.8.1 --region all",
    actor: "Kenji Tanaka",
    team: "Messaging Infrastructure",
    severity: "Low",
    category: "Deploy",
    status: "Completed",
    environment: "Production / global",
    tags: ["deploy-window", "notification-pipeline", "canary-check"],
    relatedServices: ["Notification Pipeline", "Dead Letter Queue"],
    notes: [
      "Soak duration was extended from 10 to 15 minutes due to overnight traffic lull.",
      "Zero alert triggers across all three monitored dashboards.",
      "Previous deploy of this service required a rollback; this release confirms the fix.",
    ],
    nextAction:
      "Archive the canary comparison report and update the deploy playbook with extended soak guidance.",
  },
  {
    id: "evt-0510",
    occurredAt: "2026-04-20T05:10:00Z",
    occurredLabel: "Apr 20, 2026 · 05:10 UTC",
    title: "Rate-limit override applied for migration batch",
    summary:
      "A temporary rate-limit override was applied to allow the data migration batch to complete before the maintenance window closes.",
    detail:
      "The override raised the write-per-second ceiling from 500 to 2,000 for the migration user principal, scoped to the analytics database cluster only.",
    command: "override rate-limit analytics-db --principal migration-svc --wps 2000 --ttl 90m",
    actor: "Sofia Lindqvist",
    team: "Data Platform",
    severity: "High",
    category: "Mitigation",
    status: "Watching",
    environment: "Production / eu-west-1",
    tags: ["queue-depth", "rate-limit", "migration-window"],
    relatedServices: ["Analytics DB", "Migration Service"],
    notes: [
      "Override is time-boxed and will auto-revert after 90 minutes.",
      "Replica lag stayed under 200 ms during the first burst.",
      "Alerting thresholds for the analytics cluster were temporarily adjusted to avoid false positives.",
    ],
    nextAction:
      "Verify that the migration completed within the TTL window and confirm the override auto-reverted.",
  },
  {
    id: "evt-0438",
    occurredAt: "2026-04-20T04:38:00Z",
    occurredLabel: "Apr 20, 2026 · 04:38 UTC",
    title: "Incident retrospective scheduled for queue drift",
    summary:
      "A retrospective meeting was scheduled to review the queue drift incident that occurred during the morning deploy window.",
    detail:
      "The facilitator captured the initial timeline, identified three contributing factors, and pre-populated the shared document with telemetry snapshots from the event window.",
    command: "schedule retro queue-drift-20260420 --date 2026-04-22 --attendees command,runtime,payments",
    actor: "Mara Chen",
    team: "Command",
    severity: "Low",
    category: "Investigation",
    status: "Completed",
    environment: "Internal",
    tags: ["retrospective", "queue-depth", "process"],
    relatedServices: ["Workflow Engine", "Payments Core"],
    notes: [
      "Three teams have confirmed attendance for the retrospective.",
      "Preliminary timeline covers a 47-minute window from first alert to resolution.",
      "Action items from the previous retro were marked complete before scheduling this one.",
    ],
    nextAction:
      "Distribute the pre-read document at least 24 hours before the scheduled session.",
  },
  {
    id: "evt-0355",
    occurredAt: "2026-04-20T03:55:00Z",
    occurredLabel: "Apr 20, 2026 · 03:55 UTC",
    title: "Automated health check restored after DNS propagation",
    summary:
      "Health check probes resumed returning healthy after a DNS change propagated to all edge locations.",
    detail:
      "The synthetic monitor had been reporting degraded status for 22 minutes while the new CNAME record propagated through the CDN layer. All probes now confirm the expected origin.",
    command: "acknowledge health-check cdn-edge --resolved --propagation-complete",
    actor: "Jonas Weber",
    team: "Regional Operations",
    severity: "Moderate",
    category: "Automation",
    status: "Completed",
    environment: "Production / global",
    tags: ["automation", "dns-propagation", "health-check"],
    relatedServices: ["CDN Edge", "Synthetic Monitor"],
    notes: [
      "Propagation took 22 minutes, within the expected 30-minute SLA.",
      "No customer-visible impact was detected during the propagation window.",
      "The previous CNAME was preserved as a fallback record for 48 hours.",
    ],
    nextAction:
      "Remove the fallback CNAME record after the 48-hour observation period passes cleanly.",
  },
];
