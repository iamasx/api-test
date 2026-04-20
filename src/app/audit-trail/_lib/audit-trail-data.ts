export type AuditChangeType =
  | "Deployment"
  | "Escalation"
  | "Automation"
  | "Compliance"
  | "Investigation"
  | "Handoff";

export type AuditReviewState =
  | "Escalated"
  | "Needs review"
  | "Watching"
  | "Approved";

export type AuditRiskLevel = "Critical" | "Elevated" | "Moderate" | "Low";

export type AuditFlagSeverity = "Critical" | "Elevated" | "Watch";

export type AuditFlagStatus = "Open" | "Mitigating" | "Ready to close";

export type AuditChangeEntry = {
  id: string;
  changedAt: string;
  changedLabel: string;
  title: string;
  summary: string;
  actor: string;
  team: string;
  service: string;
  environment: string;
  releaseTrack: string;
  changeType: AuditChangeType;
  reviewState: AuditReviewState;
  risk: AuditRiskLevel;
  reviewerIds: string[];
  flagIds: string[];
  tags: string[];
  checkpoints: string[];
  evidence: string[];
};

export type AuditReviewFlag = {
  id: string;
  entryId: string;
  reviewerId: string;
  label: string;
  category: string;
  severity: AuditFlagSeverity;
  status: AuditFlagStatus;
  openedLabel: string;
  detail: string;
  nextStep: string;
};

export type AuditReviewer = {
  id: string;
  name: string;
  role: string;
  timezone: string;
  shiftLabel: string;
  focusArea: string;
  coverage: string;
  decisionsToday: string;
  openFlags: number;
  lastReviewedLabel: string;
  availabilityNote: string;
};

export const auditTrailReviewers: AuditReviewer[] = [
  {
    id: "reviewer-mara-chen",
    name: "Mara Chen",
    role: "Release commander",
    timezone: "UTC-5",
    shiftLabel: "North America day shift",
    focusArea: "Rollback gates, queue health, and production release posture.",
    coverage: "Workflow Engine, Import API, Scheduler",
    decisionsToday: "11 sign-offs",
    openFlags: 2,
    lastReviewedLabel: "Reviewed 12 minutes ago",
    availabilityNote:
      "Holding the primary release lane while APAC parity and queue drift stay under observation.",
  },
  {
    id: "reviewer-priya-shah",
    name: "Priya Shah",
    role: "Reliability reviewer",
    timezone: "UTC+1",
    shiftLabel: "Follow-the-sun reliability desk",
    focusArea: "Trace regressions, cache warmup behavior, and platform rollback safety.",
    coverage: "Worker Runtime, Config Cache, Metrics Ingest",
    decisionsToday: "8 technical reviews",
    openFlags: 2,
    lastReviewedLabel: "Reviewed 28 minutes ago",
    availabilityNote:
      "Keeping trace comparisons live until the cache fanout patch matches the baseline replay samples.",
  },
  {
    id: "reviewer-inez-alvarez",
    name: "Inez Alvarez",
    role: "Data integrity reviewer",
    timezone: "UTC-3",
    shiftLabel: "LATAM audit coverage",
    focusArea: "Export correctness, replay evidence, and compliance-sensitive automation.",
    coverage: "Data Exporter, Blob Archive, Policy Control",
    decisionsToday: "6 evidence reviews",
    openFlags: 2,
    lastReviewedLabel: "Reviewed 19 minutes ago",
    availabilityNote:
      "Available for replay validation, but storage-policy approvals still require a signed compliance token.",
  },
  {
    id: "reviewer-jonas-weber",
    name: "Jonas Weber",
    role: "Regional operations reviewer",
    timezone: "UTC+8",
    shiftLabel: "APAC command handoff",
    focusArea: "Regional drift, certificate parity, and search freshness escalation paths.",
    coverage: "Identity Edge, Search Pipeline, Indexer Fleet",
    decisionsToday: "9 regional checks",
    openFlags: 2,
    lastReviewedLabel: "Reviewed 7 minutes ago",
    availabilityNote:
      "Coordinating APAC follow-up items so unresolved regional flags do not roll into the next deploy window.",
  },
];

export const auditTrailReviewFlags: AuditReviewFlag[] = [
  {
    id: "flag-queue-drift",
    entryId: "change-queue-balancer-hold",
    reviewerId: "reviewer-mara-chen",
    label: "Queue drift remains above the quiet-window floor",
    category: "Rollback watch",
    severity: "Elevated",
    status: "Mitigating",
    openedLabel: "Opened Apr 20 at 09:34 UTC",
    detail:
      "Backlog growth flattened, but the release hold remains active until queue age stays under the nine-minute threshold for another full autoscaling cycle.",
    nextStep:
      "Compare the next queue sample against the rollback trigger before the rollout proceeds to the final production lane.",
  },
  {
    id: "flag-cert-lineage",
    entryId: "change-apac-cert-escalation",
    reviewerId: "reviewer-jonas-weber",
    label: "Certificate lineage mismatch blocks APAC rollout parity",
    category: "Regional escalation",
    severity: "Critical",
    status: "Open",
    openedLabel: "Opened Apr 20 at 09:18 UTC",
    detail:
      "One APAC identity-edge cluster still reports the previous bundle lineage, so command review has not cleared that region for resumed customer traffic growth.",
    nextStep:
      "Validate bundle provenance, then rerun parity checks on the affected cluster before regional traffic caps are lifted.",
  },
  {
    id: "flag-export-sampling",
    entryId: "change-export-replay-approval",
    reviewerId: "reviewer-inez-alvarez",
    label: "Replay evidence needs one final tenant sampling pass",
    category: "Data validation",
    severity: "Watch",
    status: "Ready to close",
    openedLabel: "Opened Apr 20 at 08:52 UTC",
    detail:
      "The replay completed cleanly, but audit policy still requires a manual sample across the highest-volume tenants before the incident follow-up can be closed.",
    nextStep:
      "Finish the final tenant spot-check and attach the signed evidence bundle to the cleanup record.",
  },
  {
    id: "flag-storage-token",
    entryId: "change-storage-policy-hold",
    reviewerId: "reviewer-inez-alvarez",
    label: "Compliance token missing from storage-policy sync envelope",
    category: "Approval gate",
    severity: "Elevated",
    status: "Open",
    openedLabel: "Opened Apr 20 at 06:51 UTC",
    detail:
      "The automation correctly stopped before mutating retention settings, but the queued sync cannot proceed until the signed approval token is attached to the job context.",
    nextStep:
      "Inject the approval token, rerun the dry check, and capture the preflight record for compliance review.",
  },
  {
    id: "flag-cache-baseline",
    entryId: "change-cache-patch-review",
    reviewerId: "reviewer-priya-shah",
    label: "Cache warmup patch needs replay baseline confirmation",
    category: "Trace review",
    severity: "Watch",
    status: "Mitigating",
    openedLabel: "Opened Apr 20 at 07:59 UTC",
    detail:
      "Cold-start latency improved in synthetic traces, but reliability review wants one more cross-region replay comparison before the patch is promoted.",
    nextStep:
      "Attach the final replay diff and confirm the warmup fanout stays below the earlier regression band.",
  },
  {
    id: "flag-search-handoff",
    entryId: "change-search-handoff",
    reviewerId: "reviewer-jonas-weber",
    label: "APAC search freshness remains on handoff watch",
    category: "Regional watch",
    severity: "Watch",
    status: "Mitigating",
    openedLabel: "Opened Apr 20 at 07:24 UTC",
    detail:
      "Freshness recovered before shift turnover, but the low-priority shard rebalance is still paused until the day shift confirms stability under traffic growth.",
    nextStep:
      "Keep the rebalance paused unless freshness stays below the eight-minute watch threshold through the regional peak.",
  },
];

export const auditTrailEntries: AuditChangeEntry[] = [
  {
    id: "change-queue-balancer-hold",
    changedAt: "2026-04-20T09:34:00Z",
    changedLabel: "Apr 20, 2026 · 09:34 UTC",
    title: "Rollback hold recorded after queue balancer canary stabilized",
    summary:
      "Command review paused the planned rollback when queue depth flattened faster than forecast across the first production wave.",
    actor: "Mara Chen",
    team: "Command",
    service: "Workflow Engine",
    environment: "Production / us-east-1",
    releaseTrack: "Morning canary",
    changeType: "Deployment",
    reviewState: "Watching",
    risk: "Elevated",
    reviewerIds: ["reviewer-mara-chen", "reviewer-priya-shah"],
    flagIds: ["flag-queue-drift"],
    tags: ["deploy-window", "queue-depth", "rollback-watch"],
    checkpoints: [
      "Compare queue age against the nine-minute rollback floor.",
      "Verify worker utilization across the next autoscaling interval.",
      "Hold the final production lane until the drift trend remains flat.",
    ],
    evidence: [
      "Backlog growth narrowed from 14% to 3% over the last five-minute sample.",
      "Canary tenants stayed within the run-start SLA after the rollback hold.",
      "The rollback path remains armed if queue age crosses the watch threshold again.",
    ],
  },
  {
    id: "change-apac-cert-escalation",
    changedAt: "2026-04-20T09:18:00Z",
    changedLabel: "Apr 20, 2026 · 09:18 UTC",
    title: "Certificate parity escalation opened before APAC traffic ramps",
    summary:
      "Regional review escalated an identity-edge cluster that continued serving an older certificate bundle during the morning parity sweep.",
    actor: "Jonas Weber",
    team: "Regional Operations",
    service: "Identity Edge",
    environment: "Production / ap-southeast-1",
    releaseTrack: "Regional parity sweep",
    changeType: "Escalation",
    reviewState: "Escalated",
    risk: "Critical",
    reviewerIds: ["reviewer-jonas-weber", "reviewer-mara-chen"],
    flagIds: ["flag-cert-lineage"],
    tags: ["regional-drift", "identity-edge", "follow-up"],
    checkpoints: [
      "Validate the replacement bundle lineage against the signed artifact store.",
      "Confirm the affected cluster reloads the replacement chain cleanly.",
      "Keep regional traffic protections active until parity passes again.",
    ],
    evidence: [
      "Only one of six APAC clusters reported the older lineage.",
      "Forced re-login rates stayed below the customer-visible incident threshold.",
      "Automated re-propagation was held pending manual verification.",
    ],
  },
  {
    id: "change-export-replay-approval",
    changedAt: "2026-04-20T08:52:00Z",
    changedLabel: "Apr 20, 2026 · 08:52 UTC",
    title: "Export replay cleanup approved after checksum verification",
    summary:
      "An automated replay drained the overnight export backlog and cleared the primary correctness checks without requiring tenant intervention.",
    actor: "Inez Alvarez",
    team: "Automation",
    service: "Data Exporter",
    environment: "Production / eu-west-1",
    releaseTrack: "Replay recovery",
    changeType: "Automation",
    reviewState: "Approved",
    risk: "Moderate",
    reviewerIds: ["reviewer-inez-alvarez"],
    flagIds: ["flag-export-sampling"],
    tags: ["automation", "export-recovery", "evidence-review"],
    checkpoints: [
      "Validate batch-level checksum parity after the replay run.",
      "Confirm the highest-volume tenant exports completed end to end.",
      "Attach the evidence packet before the cleanup item is closed.",
    ],
    evidence: [
      "312 export jobs completed successfully across eight replay batches.",
      "Checksum comparisons showed no data integrity drift.",
      "Support macros were prepared to close affected customer threads after the final sample pass.",
    ],
  },
  {
    id: "change-cache-patch-review",
    changedAt: "2026-04-20T07:59:00Z",
    changedLabel: "Apr 20, 2026 · 07:59 UTC",
    title: "Cache warmup patch held for additional replay review",
    summary:
      "Reliability review traced the cold-start regression to cache fanout and held the candidate patch until the replay baseline is attached.",
    actor: "Priya Shah",
    team: "Platform Reliability",
    service: "Config Cache",
    environment: "Production / multi-region",
    releaseTrack: "Noon patch lane",
    changeType: "Investigation",
    reviewState: "Needs review",
    risk: "Moderate",
    reviewerIds: ["reviewer-priya-shah", "reviewer-mara-chen"],
    flagIds: ["flag-cache-baseline"],
    tags: ["cache-fanout", "trace-review", "release-hold"],
    checkpoints: [
      "Compare replay traces across the three affected regions.",
      "Confirm the candidate patch reduces cache warmup fanout.",
      "Delay promotion until the signed replay baseline is attached.",
    ],
    evidence: [
      "Latency drift only appeared during worker cold starts.",
      "No corresponding customer error spike accompanied the regression.",
      "The candidate patch improved synthetic traces but has not yet cleared the replay requirement.",
    ],
  },
  {
    id: "change-search-handoff",
    changedAt: "2026-04-20T07:24:00Z",
    changedLabel: "Apr 20, 2026 · 07:24 UTC",
    title: "Search freshness watch handed to the APAC day shift",
    summary:
      "Night command transferred a regional indexing lag watch with explicit triggers for reopening mitigation if freshness drifts again.",
    actor: "Jonas Weber",
    team: "Regional Operations",
    service: "Search Pipeline",
    environment: "Production / apac",
    releaseTrack: "Shift handoff",
    changeType: "Handoff",
    reviewState: "Watching",
    risk: "Low",
    reviewerIds: ["reviewer-jonas-weber"],
    flagIds: ["flag-search-handoff"],
    tags: ["shift-handoff", "freshness-watch", "regional-drift"],
    checkpoints: [
      "Preserve the paused rebalance until the day shift confirms stability.",
      "Escalate if freshness exceeds eight minutes again.",
      "Carry forward the affected shard list in the handoff packet.",
    ],
    evidence: [
      "Freshness recovered to six minutes before shift transfer.",
      "The paused rebalance remains low priority pending regional review.",
      "The handoff packet includes the exact shard identifiers affected overnight.",
    ],
  },
  {
    id: "change-storage-policy-hold",
    changedAt: "2026-04-20T06:51:00Z",
    changedLabel: "Apr 20, 2026 · 06:51 UTC",
    title: "Storage-policy sync halted pending compliance approval token",
    summary:
      "Automation review blocked a storage retention sync when the required approval token was missing from the execution context.",
    actor: "Inez Alvarez",
    team: "Data Platform",
    service: "Policy Control",
    environment: "Compliance staging",
    releaseTrack: "Quarterly retention update",
    changeType: "Compliance",
    reviewState: "Needs review",
    risk: "Elevated",
    reviewerIds: ["reviewer-inez-alvarez", "reviewer-priya-shah"],
    flagIds: ["flag-storage-token"],
    tags: ["approval-block", "storage-policy", "compliance-review"],
    checkpoints: [
      "Keep the sync blocked until the signed token is attached.",
      "Rerun the dry check once the execution envelope is complete.",
      "Capture the preflight record for the compliance audit packet.",
    ],
    evidence: [
      "The blocked run exited before mutating any retention settings.",
      "Approval metadata existed on the ticket but not in the job context.",
      "Retry is safe after the token is injected into the queued run envelope.",
    ],
  },
];
