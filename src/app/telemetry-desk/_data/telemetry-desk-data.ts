export type TelemetryHighlightTone = "lift" | "watch" | "steady";
export type TelemetryMetricTone = "positive" | "steady" | "attention";
export type TrendDirection = "improving" | "watch" | "mixed";
export type AnomalySeverity = "critical" | "elevated" | "watch";

export interface TelemetryHighlight {
  label: string;
  value: string;
  tone: TelemetryHighlightTone;
}

export interface TelemetryMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  benchmark: string;
  signal: string;
  context: string;
  tone: TelemetryMetricTone;
}

export interface TrendCheckpoint {
  label: string;
  value: string;
  emphasis: string;
  intensity: number;
}

export interface TrendPanelData {
  id: string;
  title: string;
  windowLabel: string;
  currentValue: string;
  comparisonValue: string;
  changeLabel: string;
  direction: TrendDirection;
  summary: string;
  focusLabel: string;
  note: string;
  checkpoints: TrendCheckpoint[];
}

export interface AnomalySummaryStat {
  label: string;
  value: string;
  detail: string;
}

export interface AnomalyCluster {
  id: string;
  severity: AnomalySeverity;
  title: string;
  surface: string;
  shift: string;
  action: string;
  owner: string;
}

export interface DeskNote {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export const telemetryDeskOverview = {
  eyebrow: "Telemetry Desk",
  title: "Compare telemetry shifts before the desk inherits noisy alerts.",
  description:
    "A route-specific review surface for checking metric health, trend movement, and anomaly clusters without depending on any shared dashboard state.",
  shiftLabel: "Shift 05 · Review desk",
  refreshLabel: "Synthetic feed refreshed 4 minutes ago",
  postureTitle: "Desk posture",
  posture: "Stable, with one anomaly lane held for manual review.",
  postureNotes: [
    "Detection latency is back under the operator SLA after the west parser pool was rebalanced.",
    "Coverage expanded across four additional regions, but finance suppression precision slipped after the latest model retrain.",
  ],
  highlights: [
    {
      label: "Recovered latency",
      value: "16 sec",
      tone: "lift",
    },
    {
      label: "Anomaly clusters open",
      value: "3",
      tone: "watch",
    },
    {
      label: "Analyst confidence",
      value: "91%",
      tone: "steady",
    },
    {
      label: "Escalations deferred",
      value: "12",
      tone: "lift",
    },
  ] satisfies TelemetryHighlight[],
};

export const telemetryMetrics = [
  {
    id: "ingest-health",
    label: "Event ingest health",
    value: "99.94%",
    delta: "+0.6 pts vs prior shift",
    benchmark: "Target 99.5%",
    signal: "West and central collectors",
    context:
      "Collector retries flattened after log compression was dialed back for the west shard rotation window.",
    tone: "positive",
  },
  {
    id: "detection-latency",
    label: "Detection latency",
    value: "42 sec",
    delta: "16 sec faster than the last window",
    benchmark: "SLA under 45 sec",
    signal: "Parser pool rebalance",
    context:
      "The detection tier cleared its backlog once smaller schema bundles replaced the heavier replay package.",
    tone: "positive",
  },
  {
    id: "anomaly-precision",
    label: "Anomaly precision",
    value: "87%",
    delta: "-3 pts after retrain rollout",
    benchmark: "Hold above 90%",
    signal: "Finance duplicate signatures",
    context:
      "The newest classifier widened billing matches faster than label review could keep pace, so analyst verification is still required.",
    tone: "attention",
  },
  {
    id: "suppression-coverage",
    label: "Suppression coverage",
    value: "63%",
    delta: "+9 queues auto-triaged",
    benchmark: "Goal 70%",
    signal: "Rules applied with analyst guardrails",
    context:
      "Coverage improved across infrastructure and auth feeds, but finance remains partially manual until duplicate scoring is corrected.",
    tone: "steady",
  },
] satisfies TelemetryMetric[];

export const telemetryTrends = [
  {
    id: "latency-trend",
    title: "Detection latency",
    windowLabel: "Last 90 minutes",
    currentValue: "42 sec",
    comparisonValue: "58 sec in the previous window",
    changeLabel: "16 sec faster after parser rebalance",
    direction: "improving",
    summary:
      "Latency dropped in a steady line once the west shard switched to the lighter schema bundle and replay traffic stopped bunching.",
    focusLabel: "West ingest",
    note: "This is the first three-slice run under the 45-second desk SLA today.",
    checkpoints: [
      {
        label: "14:30",
        value: "61 sec",
        emphasis: "Replay-heavy",
        intensity: 88,
      },
      {
        label: "15:00",
        value: "55 sec",
        emphasis: "Queue draining",
        intensity: 76,
      },
      {
        label: "15:30",
        value: "49 sec",
        emphasis: "Schema split",
        intensity: 64,
      },
      {
        label: "16:00",
        value: "45 sec",
        emphasis: "SLA line",
        intensity: 54,
      },
      {
        label: "16:30",
        value: "42 sec",
        emphasis: "Current",
        intensity: 46,
      },
    ],
  },
  {
    id: "precision-drift",
    title: "False-positive drift",
    windowLabel: "Day-over-day comparison",
    currentValue: "13.2%",
    comparisonValue: "9.8% yesterday",
    changeLabel: "+3.4 pts after duplicate signature expansion",
    direction: "watch",
    summary:
      "The finance detector is now surfacing more candidate duplicates than analysts can confirm, creating more noisy anomaly suggestions.",
    focusLabel: "Finance ingest",
    note: "Keep auto-suppression paused on west-finance until the retrain threshold rollback lands.",
    checkpoints: [
      {
        label: "Mon",
        value: "8.7%",
        emphasis: "Clean baseline",
        intensity: 34,
      },
      {
        label: "Tue",
        value: "9.1%",
        emphasis: "Normal variance",
        intensity: 38,
      },
      {
        label: "Wed",
        value: "9.8%",
        emphasis: "Reference",
        intensity: 42,
      },
      {
        label: "Thu",
        value: "11.9%",
        emphasis: "Retrain",
        intensity: 65,
      },
      {
        label: "Fri",
        value: "13.2%",
        emphasis: "Current",
        intensity: 76,
      },
    ],
  },
  {
    id: "coverage-trend",
    title: "Coverage stability",
    windowLabel: "Region-by-region comparison",
    currentValue: "78 stable regions",
    comparisonValue: "74 stable regions earlier today",
    changeLabel: "+4 regions recovered, but 2 still need manual overrides",
    direction: "mixed",
    summary:
      "Coverage breadth is improving, yet the desk still has to hand-hold two regions where alert deduplication remains too aggressive.",
    focusLabel: "Regional control",
    note: "Expansion is real, but the watchlist cannot be cleared until duplicate suppression is trusted again.",
    checkpoints: [
      {
        label: "APAC",
        value: "14",
        emphasis: "Stable",
        intensity: 46,
      },
      {
        label: "EU",
        value: "17",
        emphasis: "Recovered",
        intensity: 58,
      },
      {
        label: "East",
        value: "16",
        emphasis: "Manual guardrail",
        intensity: 66,
      },
      {
        label: "Central",
        value: "15",
        emphasis: "Steady",
        intensity: 54,
      },
      {
        label: "West",
        value: "16",
        emphasis: "Review hold",
        intensity: 62,
      },
    ],
  },
] satisfies TrendPanelData[];

export const anomalySummary = {
  eyebrow: "Anomaly summary",
  title: "Three clusters are shaping the next manual review pass.",
  description:
    "Trend gains are meaningful, but the desk still has to resolve the patterns below before it can trust the current auto-triage posture.",
  stats: [
    {
      label: "Open clusters",
      value: "3",
      detail: "All three clusters were opened within the current analyst shift.",
    },
    {
      label: "Events sampled",
      value: "284",
      detail: "Sampled across finance, auth, and collector replay feeds.",
    },
    {
      label: "Automation on hold",
      value: "2 lanes",
      detail: "Finance duplicate suppression and west replay dedupe remain manual.",
    },
  ] satisfies AnomalySummaryStat[],
  anomalies: [
    {
      id: "billing-duplicates",
      severity: "critical",
      title: "Billing duplicate signatures widened after retrain",
      surface: "Finance ingest",
      shift:
        "Confidence scores jumped from 0.71 to 0.82 across the west-finance batch, widening duplicate candidate volume.",
      action:
        "Freeze auto-suppressions for west-finance invoice events until labels are replayed against the older threshold.",
      owner: "Signals QA",
    },
    {
      id: "auth-replay",
      severity: "elevated",
      title: "Replay collector is emitting dense auth bursts",
      surface: "West replay queue",
      shift:
        "Backfill traffic now arrives in tighter bursts, briefly resembling account-takeover anomalies even though the accounts are valid.",
      action:
        "Throttle the replay queue and pin the auth detector to burst-aware scoring for the remaining backfill window.",
      owner: "Platform telemetry",
    },
    {
      id: "cache-suppression",
      severity: "watch",
      title: "Regional cache warmups are over-suppressing noise signals",
      surface: "Regional control",
      shift:
        "Suppression is catching most warmup chatter, but two regions are now hiding legitimate warning transitions during restarts.",
      action:
        "Keep manual review on the east and west restart windows while coverage confidence is recalibrated.",
      owner: "Operations analytics",
    },
  ] satisfies AnomalyCluster[],
  handoff: {
    title: "Next review handoff",
    owner: "Telemetry analyst · Priya Raman",
    eta: "ETA 20 minutes",
    note:
      "Re-score the west-finance sample immediately after the duplicate detector threshold rollback lands so the desk can decide whether to re-enable suppression.",
  },
};

export const telemetryDeskNotes = [
  {
    id: "parser-pool",
    label: "Parser pool rebalance",
    value: "Healthy",
    detail:
      "Detection stayed under the desk SLA for three consecutive slices once the west parser shard adopted the smaller schema bundle.",
  },
  {
    id: "label-gap",
    label: "Label coverage gap",
    value: "Needs follow-up",
    detail:
      "Finance suggestions still rely on incomplete historical labels, which keeps suppression confidence below the threshold needed for full automation.",
  },
  {
    id: "handoff-queue",
    label: "Analyst handoff queue",
    value: "Two reviewers staged",
    detail:
      "Escalations are being batched for the 18:30 review handoff so the desk does not approve partial suppressions mid-shift.",
  },
] satisfies DeskNote[];
