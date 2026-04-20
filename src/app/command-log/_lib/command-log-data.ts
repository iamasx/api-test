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
];
