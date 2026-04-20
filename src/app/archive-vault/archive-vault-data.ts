export const archiveStatuses = ["sealed", "review", "active", "drift"] as const;
export type ArchiveStatus = (typeof archiveStatuses)[number];

export type SnapshotRecord = {
  id: string;
  label: string;
  cluster: string;
  status: ArchiveStatus;
  owner: string;
  region: string;
  capturedAt: string;
  records: number;
  delta: number;
  confidence: number;
  tags: string[];
  summary: string;
  notes: string[];
  highlights: Array<{ label: string; value: string }>;
  lineage: string;
  retentionWindow: string;
  checksumStatus: string;
  exportTarget: string;
  reviewLane: string;
};

export type ComparisonMetricTone = "stable" | "watch" | "risk";

export type ComparisonMetric = {
  label: string;
  leftValue: string;
  rightValue: string;
  delta: string;
  tone: ComparisonMetricTone;
};

export type ComparisonRecordChangeType = "added" | "removed" | "changed" | "watch";
export type ComparisonRecordChangeSeverity = "low" | "medium" | "high";

export type ComparisonRecordChange = {
  id: string;
  recordLabel: string;
  area: string;
  changeType: ComparisonRecordChangeType;
  severity: ComparisonRecordChangeSeverity;
  summary: string;
  leftValue: string;
  rightValue: string;
  impact: string;
  reviewerAction: string;
};

export type ComparisonTimelineEventTone = "baseline" | "handoff" | "action" | "alert";

export type ComparisonTimelineEvent = {
  id: string;
  at: string;
  lane: string;
  summary: string;
  tone: ComparisonTimelineEventTone;
};

export type ComparisonSummary = {
  pair: [string, string];
  verdict: string;
  alignment: string;
  risk: string;
  shift: string;
  recommendation: string;
  reviewLane: string;
  queueSummary: string;
  leftFocus: string;
  rightFocus: string;
  metrics: ComparisonMetric[];
  recordChanges: ComparisonRecordChange[];
  timeline: ComparisonTimelineEvent[];
  exportArtifacts: string[];
};

export type ExportQueueStatus = "queued" | "packaging" | "ready";

export type ExportQueueEntry = {
  id: string;
  comparisonKey: string;
  pair: [string, string];
  label: string;
  status: ExportQueueStatus;
  requestedBy: string;
  requestedAt: string;
  destination: string;
  reviewLane: string;
  note: string;
  artifacts: string[];
};

export const archiveTags = [
  "legal hold",
  "pii mesh",
  "geo drift",
  "consent",
  "checksum drift",
  "retention",
  "delta burst",
] as const;

export const snapshotRecords: SnapshotRecord[] = [
  {
    id: "aurelia-204",
    label: "Aurelia Ledger",
    cluster: "vault-eu-west / stripe mirror",
    status: "sealed",
    owner: "Ops Nine",
    region: "Frankfurt",
    capturedAt: "2026-04-17 08:32 UTC",
    records: 184_221,
    delta: 2,
    confidence: 97,
    tags: ["legal hold", "retention", "pii mesh"],
    summary: "Baseline ledger preserved ahead of policy expiration sweep.",
    notes: [
      "Checksum drift absent across all sealed shards.",
      "Retention lock survives regional replay.",
    ],
    highlights: [
      { label: "Coverage", value: "99.2% fields indexed" },
      { label: "Retention", value: "Locked until Q1 FY27" },
      { label: "Replay gap", value: "14 minutes" },
    ],
    lineage: "Quarter-end seal after policy expiration sweep.",
    retentionWindow: "Locked until Q1 FY27",
    checksumStatus: "No variance across sealed shards",
    exportTarget: "legal-hold review package",
    reviewLane: "baseline audit lane",
  },
  {
    id: "ember-198",
    label: "Ember Registry",
    cluster: "vault-us-central / event cache",
    status: "review",
    owner: "Delta Cell",
    region: "Iowa",
    capturedAt: "2026-04-18 03:10 UTC",
    records: 142_908,
    delta: 11,
    confidence: 88,
    tags: ["delta burst", "consent", "retention"],
    summary: "Consent revocations spiked after a backfilled subscriber import.",
    notes: [
      "Two collections crossed expected delta thresholds.",
      "Reviewer handoff pending for consent anomalies.",
    ],
    highlights: [
      { label: "Coverage", value: "94.5% fields indexed" },
      { label: "Retention", value: "Freeze pending" },
      { label: "Replay gap", value: "42 minutes" },
    ],
    lineage: "Subscriber import landed after the last approved consent freeze.",
    retentionWindow: "Freeze pending",
    checksumStatus: "Consent index drift across two collections",
    exportTarget: "consent anomaly digest",
    reviewLane: "subscriber remediation lane",
  },
  {
    id: "helix-171",
    label: "Helix Notes",
    cluster: "vault-us-east / health stream",
    status: "active",
    owner: "Pulse Desk",
    region: "Virginia",
    capturedAt: "2026-04-19 01:42 UTC",
    records: 208_554,
    delta: 6,
    confidence: 91,
    tags: ["pii mesh", "consent", "checksum drift"],
    summary: "Live notes mirror remains stable with a narrow checksum variance.",
    notes: [
      "Consent rollups landed before the latest mirror cut.",
      "Variance stays inside automated reconciliation limits.",
    ],
    highlights: [
      { label: "Coverage", value: "96.7% fields indexed" },
      { label: "Retention", value: "Rolling 180-day band" },
      { label: "Replay gap", value: "9 minutes" },
    ],
    lineage: "Reference health snapshot captured before the regional failback window.",
    retentionWindow: "Rolling 180-day band",
    checksumStatus: "Variance under automated tolerance",
    exportTarget: "health replay package",
    reviewLane: "clinical drift lane",
  },
  {
    id: "kestrel-176",
    label: "Kestrel Claims",
    cluster: "vault-ap-south / claims replica",
    status: "drift",
    owner: "Skylark Queue",
    region: "Mumbai",
    capturedAt: "2026-04-18 19:04 UTC",
    records: 96_411,
    delta: 18,
    confidence: 79,
    tags: ["geo drift", "delta burst", "checksum drift"],
    summary: "Claims replica shows broad field drift after a regional failback.",
    notes: [
      "Checksum mismatch clusters around adjudication notes.",
      "Geo rebalance duplicated one retention bucket.",
    ],
    highlights: [
      { label: "Coverage", value: "89.1% fields indexed" },
      { label: "Retention", value: "Dual-window mismatch" },
      { label: "Replay gap", value: "1 hour 16 minutes" },
    ],
    lineage: "Replica recovered during an AP-south failback with duplicated retention residue.",
    retentionWindow: "Dual-window mismatch",
    checksumStatus: "Mismatch on adjudication note segments",
    exportTarget: "claims drift incident bundle",
    reviewLane: "regional failback lane",
  },
  {
    id: "orbit-164",
    label: "Orbit Permissions",
    cluster: "vault-ca-east / auth graph",
    status: "sealed",
    owner: "Northwatch",
    region: "Montreal",
    capturedAt: "2026-04-16 12:18 UTC",
    records: 121_733,
    delta: 4,
    confidence: 95,
    tags: ["legal hold", "consent", "retention"],
    summary: "Permissions archive sealed before entitlement pruning was applied.",
    notes: [
      "Role tombstones remain linked to the final approval window.",
      "Consent history is complete but cold-stored.",
    ],
    highlights: [
      { label: "Coverage", value: "98.1% fields indexed" },
      { label: "Retention", value: "Locked until legal release" },
      { label: "Replay gap", value: "21 minutes" },
    ],
    lineage: "Seal taken while entitlement residue was still attached to the auth graph.",
    retentionWindow: "Locked until legal release",
    checksumStatus: "Stable checksum graph with entitlement residue",
    exportTarget: "entitlement review packet",
    reviewLane: "baseline audit lane",
  },
  {
    id: "quartz-159",
    label: "Quartz Session Tape",
    cluster: "vault-us-west / edge replay",
    status: "review",
    owner: "Signal Array",
    region: "Oregon",
    capturedAt: "2026-04-19 05:27 UTC",
    records: 77_942,
    delta: 9,
    confidence: 86,
    tags: ["geo drift", "pii mesh", "consent"],
    summary: "Session tape needs manual review after cross-region masking drift.",
    notes: [
      "Edge replay produced new tokenization gaps.",
      "Masking rules differ between west and south replicas.",
    ],
    highlights: [
      { label: "Coverage", value: "93.3% fields indexed" },
      { label: "Retention", value: "30-day forensic window" },
      { label: "Replay gap", value: "37 minutes" },
    ],
    lineage: "Cross-region masking divergence surfaced after the latest replay bundle.",
    retentionWindow: "30-day forensic window",
    checksumStatus: "Masking variance across replay shards",
    exportTarget: "masking variance appendix",
    reviewLane: "consent remediation lane",
  },
];

export const comparisonSummaries: ComparisonSummary[] = [
  {
    pair: ["aurelia-204", "orbit-164"],
    verdict: "Both sealed archives hold steady and differ mostly in consent lineage depth.",
    alignment: "88% field overlap",
    risk: "Low drift risk",
    shift: "Orbit keeps more entitlement residue; Aurelia keeps stronger PII indexing.",
    recommendation: "Use this pair when reviewers need a calm baseline before drift triage.",
    reviewLane: "baseline audit lane",
    queueSummary: "Low-noise diff package fit for policy sign-off exports.",
    leftFocus: "Aurelia preserves stronger PII index coverage and the faster replay baseline.",
    rightFocus: "Orbit keeps entitlement residue and colder consent lineage for legal follow-up.",
    metrics: [
      {
        label: "Indexed fields",
        leftValue: "99.2%",
        rightValue: "98.1%",
        delta: "Aurelia +1.1%",
        tone: "stable",
      },
      {
        label: "Replay gap",
        leftValue: "14 minutes",
        rightValue: "21 minutes",
        delta: "Orbit +7 min lag",
        tone: "watch",
      },
      {
        label: "Retention lock",
        leftValue: "Q1 FY27",
        rightValue: "Legal release",
        delta: "Orbit uses external release gate",
        tone: "watch",
      },
    ],
    recordChanges: [
      {
        id: "aurelia-orbit-consent-lineage",
        recordLabel: "Consent lineage map",
        area: "Identity graph",
        changeType: "changed",
        severity: "low",
        summary: "Orbit preserves entitlement tombstones that Aurelia already collapsed into sealed lineage.",
        leftValue: "Collapsed lineage after final approval",
        rightValue: "Entitlement residue retained until legal release",
        impact: "Reviewers see more historical permission residue on Orbit exports.",
        reviewerAction: "Use Orbit when sign-off needs entitlement ancestry.",
      },
      {
        id: "aurelia-orbit-replay-gap",
        recordLabel: "Replay completion lag",
        area: "Recovery log",
        changeType: "changed",
        severity: "low",
        summary: "Orbit trails Aurelia on replay completion despite both archives staying sealed.",
        leftValue: "14 minutes",
        rightValue: "21 minutes",
        impact: "Longer replay lag widens the manual annotation window for reviewers.",
        reviewerAction: "Keep Aurelia as the baseline for timing-sensitive approvals.",
      },
      {
        id: "aurelia-orbit-retention-lock",
        recordLabel: "Retention release gate",
        area: "Lifecycle policy",
        changeType: "watch",
        severity: "medium",
        summary: "Lock semantics differ even though both archives were sealed in calm conditions.",
        leftValue: "Locked until Q1 FY27",
        rightValue: "Locked until legal release",
        impact: "Different release triggers change who can authorize the export package.",
        reviewerAction: "Confirm the release authority in the package cover sheet.",
      },
    ],
    timeline: [
      {
        id: "aurelia-orbit-seal",
        at: "2026-04-16 12:18 UTC",
        lane: "baseline audit lane",
        summary: "Orbit sealed before entitlement pruning and kept the original approval residue.",
        tone: "baseline",
      },
      {
        id: "aurelia-orbit-policy-sweep",
        at: "2026-04-17 08:32 UTC",
        lane: "baseline audit lane",
        summary: "Aurelia captured after policy sweep and preserved the stronger PII index coverage.",
        tone: "handoff",
      },
      {
        id: "aurelia-orbit-review",
        at: "2026-04-20 09:05 UTC",
        lane: "archive review desk",
        summary: "Review desk approved the pair as a calm baseline for training exports.",
        tone: "action",
      },
    ],
    exportArtifacts: [
      "field-overlap digest",
      "consent lineage appendix",
      "retention release checklist",
    ],
  },
  {
    pair: ["ember-198", "quartz-159"],
    verdict: "Consent-oriented review queues align, but Quartz carries wider masking variance.",
    alignment: "72% field overlap",
    risk: "Moderate review risk",
    shift: "Masking drift clusters in session tape while Ember spikes on subscriber deltas.",
    recommendation: "Pair these when validating consent workflows against replay artifacts.",
    reviewLane: "consent remediation lane",
    queueSummary: "Package should include consent delta sheets before masking evidence leaves review.",
    leftFocus: "Ember highlights subscriber backfill deltas and pending freeze decisions.",
    rightFocus: "Quartz exposes cross-region masking gaps and tokenization exceptions.",
    metrics: [
      {
        label: "Delta pressure",
        leftValue: "11%",
        rightValue: "9%",
        delta: "Ember +2% subscriber churn",
        tone: "watch",
      },
      {
        label: "Indexed fields",
        leftValue: "94.5%",
        rightValue: "93.3%",
        delta: "Quartz trails by 1.2%",
        tone: "watch",
      },
      {
        label: "Replay gap",
        leftValue: "42 minutes",
        rightValue: "37 minutes",
        delta: "Ember +5 min lag",
        tone: "watch",
      },
    ],
    recordChanges: [
      {
        id: "ember-quartz-revocations",
        recordLabel: "Subscriber revocation set",
        area: "Consent ledger",
        changeType: "changed",
        severity: "medium",
        summary: "Ember adds new revocations from imported subscriber history while Quartz stays session-bound.",
        leftValue: "Backfilled subscriber revocations pending sign-off",
        rightValue: "Stable session consent events with masking exceptions",
        impact: "Review packages need both churn evidence and masking context to stay coherent.",
        reviewerAction: "Attach the subscriber delta sheet before export.",
      },
      {
        id: "ember-quartz-masking",
        recordLabel: "Masking ruleset drift",
        area: "Privacy masking",
        changeType: "changed",
        severity: "high",
        summary: "Quartz diverges between west and south replica masking rules after replay.",
        leftValue: "Masking stays aligned inside registry imports",
        rightValue: "Replica mismatch on tokenization and redaction",
        impact: "Quartz artifacts can expose different fields across regions unless annotated.",
        reviewerAction: "Block external export until masking notes are attached.",
      },
      {
        id: "ember-quartz-retention",
        recordLabel: "Retention freeze readiness",
        area: "Lifecycle policy",
        changeType: "watch",
        severity: "medium",
        summary: "Ember has a pending freeze while Quartz stays inside a fixed forensic window.",
        leftValue: "Freeze pending",
        rightValue: "30-day forensic window",
        impact: "Packaging destination and reviewer SLA differ by snapshot.",
        reviewerAction: "Route approval through the consent remediation lane.",
      },
      {
        id: "ember-quartz-geo-annotations",
        recordLabel: "Regional masking appendix",
        area: "Replay annotations",
        changeType: "added",
        severity: "low",
        summary: "Quartz adds cross-region masking annotations that Ember does not carry.",
        leftValue: "No regional appendix",
        rightValue: "West vs south masking note bundle",
        impact: "The queue needs an extra appendix to explain why the same session fields diverge.",
        reviewerAction: "Export the regional masking appendix whenever Quartz is in the pair.",
      },
    ],
    timeline: [
      {
        id: "ember-quartz-import",
        at: "2026-04-18 03:10 UTC",
        lane: "subscriber remediation lane",
        summary: "Ember captured the imported subscriber revocations before the freeze decision landed.",
        tone: "baseline",
      },
      {
        id: "ember-quartz-replay",
        at: "2026-04-19 05:27 UTC",
        lane: "consent remediation lane",
        summary: "Quartz replay surfaced a masking split between west and south replicas.",
        tone: "alert",
      },
      {
        id: "ember-quartz-handoff",
        at: "2026-04-20 06:50 UTC",
        lane: "archive review desk",
        summary: "Review desk combined both snapshots for consent workflow validation and export prep.",
        tone: "handoff",
      },
      {
        id: "ember-quartz-queue",
        at: "2026-04-20 07:18 UTC",
        lane: "consent remediation lane",
        summary: "Queue package moved to masking appendix assembly before release review.",
        tone: "action",
      },
    ],
    exportArtifacts: [
      "consent delta digest",
      "masking variance appendix",
      "reviewer handoff memo",
    ],
  },
  {
    pair: ["helix-171", "kestrel-176"],
    verdict: "Helix offers a stable live reference for a replica already slipping into drift.",
    alignment: "64% field overlap",
    risk: "High drift risk",
    shift: "Kestrel widens checksum and regional variance far beyond Helix tolerance.",
    recommendation: "Start with checksum mismatches, then inspect geo rebalance behavior.",
    reviewLane: "regional drift escalation lane",
    queueSummary: "Queue only after checksum drift evidence and failback notes are attached.",
    leftFocus: "Helix stays inside tolerance and acts as the clean reference snapshot.",
    rightFocus: "Kestrel shows failback drift concentrated around adjudication notes.",
    metrics: [
      {
        label: "Drift delta",
        leftValue: "6%",
        rightValue: "18%",
        delta: "Kestrel +12% variance",
        tone: "risk",
      },
      {
        label: "Confidence",
        leftValue: "91%",
        rightValue: "79%",
        delta: "12% spread",
        tone: "risk",
      },
      {
        label: "Replay gap",
        leftValue: "9 minutes",
        rightValue: "1 hour 16 minutes",
        delta: "Kestrel +67 min lag",
        tone: "risk",
      },
    ],
    recordChanges: [
      {
        id: "helix-kestrel-checksum",
        recordLabel: "Adjudication note checksum",
        area: "Claims narrative",
        changeType: "changed",
        severity: "high",
        summary: "Kestrel duplicates checksum segments after regional failback while Helix stays stable.",
        leftValue: "Stable note hash ladder",
        rightValue: "Mismatch clusters around adjudication notes",
        impact: "Narrative fields cannot be trusted until the failback duplication is explained.",
        reviewerAction: "Keep this issue in the package lead summary.",
      },
      {
        id: "helix-kestrel-geo",
        recordLabel: "Geo rebalance residue",
        area: "Regional routing",
        changeType: "added",
        severity: "high",
        summary: "Failback introduced a second retention bucket in Kestrel and widened regional drift.",
        leftValue: "Single active region band",
        rightValue: "Duplicate AP-south retention bucket",
        impact: "Reviewers need region lineage evidence to understand why row counts diverged.",
        reviewerAction: "Attach regional failback logs before export.",
      },
      {
        id: "helix-kestrel-consent",
        recordLabel: "Consent rollup alignment",
        area: "Consent aggregates",
        changeType: "watch",
        severity: "medium",
        summary: "Helix completed rollups before mirror cut while Kestrel replayed mid-failback.",
        leftValue: "Consent rollups sealed before capture",
        rightValue: "Consent rollups interleaved with failback replay",
        impact: "Aggregate counts diverge even when row totals still look plausible.",
        reviewerAction: "Compare aggregate consent totals before approval.",
      },
      {
        id: "helix-kestrel-replay",
        recordLabel: "Replay recovery lag",
        area: "Recovery log",
        changeType: "changed",
        severity: "high",
        summary: "Kestrel trails Helix by more than an hour on replay completion.",
        leftValue: "9 minutes",
        rightValue: "1 hour 16 minutes",
        impact: "Exported packages could omit late-arriving replay annotations without an exception note.",
        reviewerAction: "Wait for replay recovery evidence or export an explicit exception notice.",
      },
    ],
    timeline: [
      {
        id: "helix-kestrel-failback",
        at: "2026-04-18 19:04 UTC",
        lane: "regional failback lane",
        summary: "Kestrel recovered during AP-south failback and duplicated one retention bucket.",
        tone: "alert",
      },
      {
        id: "helix-kestrel-reference",
        at: "2026-04-19 01:42 UTC",
        lane: "clinical drift lane",
        summary: "Helix captured a stable reference state before the failback residue could spread.",
        tone: "baseline",
      },
      {
        id: "helix-kestrel-triage",
        at: "2026-04-20 08:22 UTC",
        lane: "regional drift escalation lane",
        summary: "Triage moved the pair into checksum-first review after replay lag widened.",
        tone: "handoff",
      },
      {
        id: "helix-kestrel-export",
        at: "2026-04-20 09:40 UTC",
        lane: "archive review desk",
        summary: "Queue guidance requires checksum evidence and failback logs before export.",
        tone: "action",
      },
    ],
    exportArtifacts: [
      "checksum mismatch brief",
      "regional failback appendix",
      "replay recovery exception form",
    ],
  },
];

export const exportQueueEntries: ExportQueueEntry[] = [
  {
    id: "pkg-aurelia-204-orbit-164",
    comparisonKey: "aurelia-204::orbit-164",
    pair: ["aurelia-204", "orbit-164"],
    label: "Aurelia Ledger vs Orbit Permissions",
    status: "ready",
    requestedBy: "Ops Nine",
    requestedAt: "2026-04-19 22:05 UTC",
    destination: "baseline audit lane -> legal-hold review package",
    reviewLane: "baseline audit lane",
    note: "Low-noise baseline bundle approved for training exports.",
    artifacts: [
      "field-overlap digest",
      "consent lineage appendix",
      "retention release checklist",
    ],
  },
  {
    id: "pkg-ember-198-quartz-159",
    comparisonKey: "ember-198::quartz-159",
    pair: ["ember-198", "quartz-159"],
    label: "Ember Registry vs Quartz Session Tape",
    status: "packaging",
    requestedBy: "Mara Holt",
    requestedAt: "2026-04-20 07:18 UTC",
    destination: "consent remediation lane -> privacy review bundle",
    reviewLane: "consent remediation lane",
    note: "Awaiting masking appendix before export sign-off.",
    artifacts: [
      "consent delta digest",
      "masking variance appendix",
      "reviewer handoff memo",
    ],
  },
];

const exportQueueStatusOrder: ExportQueueStatus[] = ["queued", "packaging", "ready"];

function getHighlightValue(record: SnapshotRecord, label: string) {
  return record.highlights.find((highlight) => highlight.label === label)?.value ?? "Unavailable";
}

function metricTone(
  spread: number,
  watchCutoff: number,
  riskCutoff: number,
): ComparisonMetricTone {
  if (spread >= riskCutoff) return "risk";
  if (spread >= watchCutoff) return "watch";
  return "stable";
}

function changeSeverity(
  spread: number,
  watchCutoff: number,
  riskCutoff: number,
): ComparisonRecordChangeSeverity {
  if (spread >= riskCutoff) return "high";
  if (spread >= watchCutoff) return "medium";
  return "low";
}

function buildFallbackRecordChanges(
  left: SnapshotRecord,
  right: SnapshotRecord,
  sharedTags: string[],
  deltaGap: number,
  confidenceGap: number,
): ComparisonRecordChange[] {
  const comparisonKey = buildComparisonKey(left.id, right.id);

  return [
    {
      id: `${comparisonKey}-coverage`,
      recordLabel: "Coverage profile",
      area: "Field catalog",
      changeType: deltaGap >= 8 ? "changed" : "watch",
      severity: changeSeverity(confidenceGap, 5, 10),
      summary: `Coverage and confidence diverge between ${left.label} and ${right.label}.`,
      leftValue: getHighlightValue(left, "Coverage"),
      rightValue: getHighlightValue(right, "Coverage"),
      impact: "Reviewers need the field coverage spread before exporting a side-by-side package.",
      reviewerAction: sharedTags.length
        ? `Validate the shared focus tags first: ${sharedTags.join(", ")}.`
        : "No shared tags were found, so inspect structure before comparing semantics.",
    },
    {
      id: `${comparisonKey}-retention`,
      recordLabel: "Retention controls",
      area: "Lifecycle policy",
      changeType: left.retentionWindow === right.retentionWindow ? "watch" : "changed",
      severity: changeSeverity(deltaGap, 4, 9),
      summary: "Retention release rules differ across the selected snapshots.",
      leftValue: left.retentionWindow,
      rightValue: right.retentionWindow,
      impact: "Different release gates affect who can authorize the export queue handoff.",
      reviewerAction: "Confirm the approval owner before sending the package downstream.",
    },
    {
      id: `${comparisonKey}-checksum`,
      recordLabel: "Checksum posture",
      area: "Integrity signals",
      changeType: left.checksumStatus === right.checksumStatus ? "watch" : "changed",
      severity: changeSeverity(deltaGap + confidenceGap, 10, 18),
      summary: "Checksum posture shifted enough to justify an explicit reviewer note.",
      leftValue: left.checksumStatus,
      rightValue: right.checksumStatus,
      impact: "Checksum differences change how much trust reviewers can place in the record deltas.",
      reviewerAction: "Attach integrity notes when the pair moves into the export queue.",
    },
    {
      id: `${comparisonKey}-replay`,
      recordLabel: "Replay recovery lag",
      area: "Recovery log",
      changeType: "changed",
      severity: changeSeverity(deltaGap, 5, 10),
      summary: "Replay lag changed between the two snapshots and can affect review completeness.",
      leftValue: getHighlightValue(left, "Replay gap"),
      rightValue: getHighlightValue(right, "Replay gap"),
      impact: "Late replay completion can leave annotations out of an exported review package.",
      reviewerAction: "Verify replay notes before marking the comparison export-ready.",
    },
  ];
}

function buildFallbackTimeline(
  left: SnapshotRecord,
  right: SnapshotRecord,
  deltaGap: number,
): ComparisonTimelineEvent[] {
  const comparisonKey = buildComparisonKey(left.id, right.id);

  return [
    {
      id: `${comparisonKey}-left-capture`,
      at: left.capturedAt,
      lane: left.reviewLane,
      summary: `${left.label} captured with ${left.delta}% drift and ${left.confidence}% confidence.`,
      tone: "baseline",
    },
    {
      id: `${comparisonKey}-right-capture`,
      at: right.capturedAt,
      lane: right.reviewLane,
      summary: `${right.label} captured with ${right.delta}% drift and ${right.confidence}% confidence.`,
      tone: deltaGap >= 8 ? "alert" : "handoff",
    },
    {
      id: `${comparisonKey}-queue-guidance`,
      at: "2026-04-20 10:12 UTC",
      lane: "archive review desk",
      summary: deltaGap >= 8
        ? "Escalate this ad hoc pair before queueing any export bundle."
        : "Pair is eligible for a lightweight export review package once notes are attached.",
      tone: "action",
    },
  ];
}

export function buildComparisonKey(leftId: string, rightId: string) {
  return [leftId, rightId].sort().join("::");
}

export function findSnapshotRecord(recordId: string) {
  return snapshotRecords.find((record) => record.id === recordId) ?? null;
}

export function findComparisonSummary(
  leftId: string,
  rightId: string,
): ComparisonSummary | null {
  const explicit = comparisonSummaries.find((summary) => buildComparisonKey(...summary.pair) === buildComparisonKey(leftId, rightId));
  if (explicit) return explicit;

  const left = findSnapshotRecord(leftId);
  const right = findSnapshotRecord(rightId);

  if (!left || !right) return null;

  const sharedTags = left.tags.filter((tag) => right.tags.includes(tag));
  const deltaGap = Math.abs(left.delta - right.delta);
  const confidenceGap = Math.abs(left.confidence - right.confidence);
  const overlap = Math.max(58, 92 - deltaGap * 3);

  return {
    pair: [left.id, right.id],
    verdict: deltaGap > 8
      ? "Variance is wide enough to treat this pair as an active drift investigation."
      : "The pair is close enough for a fast reviewer handoff and side-by-side scan.",
    alignment: `${overlap}% field overlap`,
    risk: deltaGap > 8 ? "Escalate drift review" : "Watch in daily review",
    shift: sharedTags.length
      ? `Shared focus tags: ${sharedTags.join(", ")}.`
      : "No shared focus tags; compare structure before comparing semantics.",
    recommendation: deltaGap > 8
      ? "Inspect replay gap and checksum confidence before approving archival use."
      : "Use this pair as a quick confidence check for neighboring archive states.",
    reviewLane: deltaGap > 8 ? "drift escalation lane" : "daily archive review lane",
    queueSummary: deltaGap > 8
      ? "Queue only after replay and checksum evidence are attached."
      : "Low-friction ad hoc pair; attach coverage and retention notes before export.",
    leftFocus: `${left.label} captured in ${left.reviewLane} with ${left.delta}% drift.`,
    rightFocus: `${right.label} captured in ${right.reviewLane} with ${right.delta}% drift.`,
    metrics: [
      {
        label: "Record span",
        leftValue: left.records.toLocaleString(),
        rightValue: right.records.toLocaleString(),
        delta: `${Math.abs(left.records - right.records).toLocaleString()} row gap`,
        tone: metricTone(Math.abs(left.records - right.records), 25_000, 75_000),
      },
      {
        label: "Drift delta",
        leftValue: `${left.delta}%`,
        rightValue: `${right.delta}%`,
        delta: `${deltaGap}% gap`,
        tone: metricTone(deltaGap, 5, 10),
      },
      {
        label: "Confidence",
        leftValue: `${left.confidence}%`,
        rightValue: `${right.confidence}%`,
        delta: `${confidenceGap}% spread`,
        tone: metricTone(confidenceGap, 5, 10),
      },
      {
        label: "Replay gap",
        leftValue: getHighlightValue(left, "Replay gap"),
        rightValue: getHighlightValue(right, "Replay gap"),
        delta: "Compare replay lag before export",
        tone: metricTone(deltaGap, 5, 10),
      },
    ],
    recordChanges: buildFallbackRecordChanges(left, right, sharedTags, deltaGap, confidenceGap),
    timeline: buildFallbackTimeline(left, right, deltaGap),
    exportArtifacts: sharedTags.length
      ? [`${sharedTags[0]} diff digest`, "coverage comparison sheet", "reviewer handoff memo"]
      : ["coverage comparison sheet", "retention release note", "reviewer handoff memo"],
  };
}

export function advanceExportQueueStatus(status: ExportQueueStatus): ExportQueueStatus {
  const currentIndex = exportQueueStatusOrder.indexOf(status);
  return exportQueueStatusOrder[Math.min(currentIndex + 1, exportQueueStatusOrder.length - 1)] ?? status;
}

export function createExportQueueEntry(
  summary: ComparisonSummary,
  records: SnapshotRecord[],
): ExportQueueEntry {
  const comparisonKey = buildComparisonKey(...summary.pair);
  const label = records.length === 2
    ? `${records[0].label} vs ${records[1].label}`
    : summary.pair.join(" vs ");
  const destination = records.length === 2
    ? `${records[0].exportTarget} -> ${records[1].exportTarget}`
    : `${summary.reviewLane} -> review package`;

  return {
    id: `pkg-${comparisonKey.replace(/::/g, "-")}`,
    comparisonKey,
    pair: summary.pair,
    label,
    status: "queued",
    requestedBy: "Archive review desk",
    requestedAt: "2026-04-20 10:48 UTC",
    destination,
    reviewLane: summary.reviewLane,
    note: summary.queueSummary,
    artifacts: summary.exportArtifacts,
  };
}
