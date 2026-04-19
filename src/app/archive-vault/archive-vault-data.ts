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
};

export type ComparisonSummary = {
  pair: [string, string];
  verdict: string;
  alignment: string;
  risk: string;
  shift: string;
  recommendation: string;
};

export const archiveTags = ["legal hold", "pii mesh", "geo drift", "consent", "checksum drift", "retention", "delta burst"] as const;
export const snapshotRecords: SnapshotRecord[] = [
  {
    id: "aurelia-204", label: "Aurelia Ledger", cluster: "vault-eu-west / stripe mirror", status: "sealed", owner: "Ops Nine", region: "Frankfurt",
    capturedAt: "2026-04-17 08:32 UTC", records: 184_221, delta: 2, confidence: 97, tags: ["legal hold", "retention", "pii mesh"],
    summary: "Baseline ledger preserved ahead of policy expiration sweep.",
    notes: ["Checksum drift absent across all sealed shards.", "Retention lock survives regional replay."],
    highlights: [{ label: "Coverage", value: "99.2% fields indexed" }, { label: "Retention", value: "Locked until Q1 FY27" }, { label: "Replay gap", value: "14 minutes" }],
  },
  {
    id: "ember-198", label: "Ember Registry", cluster: "vault-us-central / event cache", status: "review", owner: "Delta Cell", region: "Iowa",
    capturedAt: "2026-04-18 03:10 UTC", records: 142_908, delta: 11, confidence: 88, tags: ["delta burst", "consent", "retention"],
    summary: "Consent revocations spiked after a backfilled subscriber import.",
    notes: ["Two collections crossed expected delta thresholds.", "Reviewer handoff pending for consent anomalies."],
    highlights: [{ label: "Coverage", value: "94.5% fields indexed" }, { label: "Retention", value: "Freeze pending" }, { label: "Replay gap", value: "42 minutes" }],
  },
  {
    id: "helix-171", label: "Helix Notes", cluster: "vault-us-east / health stream", status: "active", owner: "Pulse Desk", region: "Virginia",
    capturedAt: "2026-04-19 01:42 UTC", records: 208_554, delta: 6, confidence: 91, tags: ["pii mesh", "consent", "checksum drift"],
    summary: "Live notes mirror remains stable with a narrow checksum variance.",
    notes: ["Consent rollups landed before the latest mirror cut.", "Variance stays inside automated reconciliation limits."],
    highlights: [{ label: "Coverage", value: "96.7% fields indexed" }, { label: "Retention", value: "Rolling 180-day band" }, { label: "Replay gap", value: "9 minutes" }],
  },
  {
    id: "kestrel-176", label: "Kestrel Claims", cluster: "vault-ap-south / claims replica", status: "drift", owner: "Skylark Queue", region: "Mumbai",
    capturedAt: "2026-04-18 19:04 UTC", records: 96_411, delta: 18, confidence: 79, tags: ["geo drift", "delta burst", "checksum drift"],
    summary: "Claims replica shows broad field drift after a regional failback.",
    notes: ["Checksum mismatch clusters around adjudication notes.", "Geo rebalance duplicated one retention bucket."],
    highlights: [{ label: "Coverage", value: "89.1% fields indexed" }, { label: "Retention", value: "Dual-window mismatch" }, { label: "Replay gap", value: "1 hour 16 minutes" }],
  },
  {
    id: "orbit-164", label: "Orbit Permissions", cluster: "vault-ca-east / auth graph", status: "sealed", owner: "Northwatch", region: "Montreal",
    capturedAt: "2026-04-16 12:18 UTC", records: 121_733, delta: 4, confidence: 95, tags: ["legal hold", "consent", "retention"],
    summary: "Permissions archive sealed before entitlement pruning was applied.",
    notes: ["Role tombstones remain linked to the final approval window.", "Consent history is complete but cold-stored."],
    highlights: [{ label: "Coverage", value: "98.1% fields indexed" }, { label: "Retention", value: "Locked until legal release" }, { label: "Replay gap", value: "21 minutes" }],
  },
  {
    id: "quartz-159", label: "Quartz Session Tape", cluster: "vault-us-west / edge replay", status: "review", owner: "Signal Array", region: "Oregon",
    capturedAt: "2026-04-19 05:27 UTC", records: 77_942, delta: 9, confidence: 86, tags: ["geo drift", "pii mesh", "consent"],
    summary: "Session tape needs manual review after cross-region masking drift.",
    notes: ["Edge replay produced new tokenization gaps.", "Masking rules differ between west and south replicas."],
    highlights: [{ label: "Coverage", value: "93.3% fields indexed" }, { label: "Retention", value: "30-day forensic window" }, { label: "Replay gap", value: "37 minutes" }],
  },
];

export const comparisonSummaries: ComparisonSummary[] = [
  {
    pair: ["aurelia-204", "orbit-164"], verdict: "Both sealed archives hold steady and differ mostly in consent lineage depth.",
    alignment: "88% field overlap", risk: "Low drift risk",
    shift: "Orbit keeps more entitlement residue; Aurelia keeps stronger PII indexing.",
    recommendation: "Use this pair when reviewers need a calm baseline before drift triage.",
  },
  {
    pair: ["ember-198", "quartz-159"], verdict: "Consent-oriented review queues align, but Quartz carries wider masking variance.",
    alignment: "72% field overlap", risk: "Moderate review risk",
    shift: "Masking drift clusters in session tape while Ember spikes on subscriber deltas.",
    recommendation: "Pair these when validating consent workflows against replay artifacts.",
  },
  {
    pair: ["helix-171", "kestrel-176"], verdict: "Helix offers a stable live reference for a replica already slipping into drift.",
    alignment: "64% field overlap", risk: "High drift risk",
    shift: "Kestrel widens checksum and regional variance far beyond Helix tolerance.",
    recommendation: "Start with checksum mismatches, then inspect geo rebalance behavior.",
  },
];

function pairKey(leftId: string, rightId: string) {
  return [leftId, rightId].sort().join("::");
}

export function findComparisonSummary(
  leftId: string,
  rightId: string,
): ComparisonSummary | null {
  const explicit = comparisonSummaries.find((summary) => pairKey(...summary.pair) === pairKey(leftId, rightId));
  if (explicit) return explicit;
  const left = snapshotRecords.find((record) => record.id === leftId);
  const right = snapshotRecords.find((record) => record.id === rightId);
  if (!left || !right) return null;
  const sharedTags = left.tags.filter((tag) => right.tags.includes(tag));
  const driftGap = Math.abs(left.delta - right.delta);
  const overlap = Math.max(58, 92 - driftGap * 3);

  return {
    pair: [leftId, rightId] as [string, string],
    verdict: driftGap > 8
      ? "Variance is wide enough to treat this pair as an active drift investigation."
      : "The pair is close enough for a fast reviewer handoff and side-by-side scan.",
    alignment: `${overlap}% field overlap`,
    risk: driftGap > 8 ? "Escalate drift review" : "Watch in daily review",
    shift: sharedTags.length ? `Shared focus tags: ${sharedTags.join(", ")}.` : "No shared focus tags; compare structure before comparing semantics.",
    recommendation: driftGap > 8
      ? "Inspect replay gap and checksum confidence before approving archival use."
      : "Use this pair as a quick confidence check for neighboring archive states.",
  };
}
