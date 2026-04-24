export type DemandLevel = "low" | "moderate" | "high" | "peak";
export type UtilizationStatus = "healthy" | "elevated" | "critical";

export interface DemandBand {
  id: string;
  label: string;
  level: DemandLevel;
  forecastedLoad: string;
  peakWindow: string;
  detail: string;
}

export interface UtilizationCard {
  id: string;
  resource: string;
  currentUtilization: string;
  capacity: string;
  status: UtilizationStatus;
  owner: string;
  note: string;
}

export interface PlanningNote {
  id: string;
  author: string;
  timestamp: string;
  body: string;
  priority: "info" | "action" | "warning";
}

export interface CapacityPlannerOverview {
  eyebrow: string;
  title: string;
  description: string;
  planCycle: string;
  region: string;
}

export interface CapacityStat {
  label: string;
  value: string;
  detail: string;
}

export const capacityPlannerOverview: CapacityPlannerOverview = {
  eyebrow: "Capacity Planner",
  title: "Forecast demand, track utilization, and align capacity before the next planning window.",
  description:
    "A consolidated view of demand bands, resource utilization, and planning notes that helps teams make informed capacity decisions ahead of load spikes.",
  planCycle: "Q2 2026 — Sprint 14",
  region: "US-West / Portland cluster",
};

export const capacityStats: CapacityStat[] = [
  {
    label: "Active demand bands",
    value: "4",
    detail: "Covering overnight batch, morning API surge, midday steady-state, and evening wind-down",
  },
  {
    label: "Resources tracked",
    value: "5",
    detail: "Compute nodes, message queues, worker pools, storage I/O, and network egress",
  },
  {
    label: "Open planning notes",
    value: "4",
    detail: "Two action items, one warning, and one informational note from the last review cycle",
  },
];

export const demandBands: DemandBand[] = [
  {
    id: "band-overnight",
    label: "Overnight batch window",
    level: "low",
    forecastedLoad: "12%",
    peakWindow: "01:00 — 05:00 PDT",
    detail:
      "Scheduled ETL jobs and index rebuilds run during this window. Load stays predictable unless a backfill is queued.",
  },
  {
    id: "band-morning",
    label: "Morning API surge",
    level: "high",
    forecastedLoad: "78%",
    peakWindow: "07:30 — 10:00 PDT",
    detail:
      "User-facing API traffic ramps sharply as west-coast teams come online. Auto-scaling usually absorbs this within 8 minutes.",
  },
  {
    id: "band-midday",
    label: "Midday steady-state",
    level: "moderate",
    forecastedLoad: "45%",
    peakWindow: "10:00 — 16:00 PDT",
    detail:
      "Traffic plateaus after the morning surge. This is the safest window for deploying capacity changes or running load tests.",
  },
  {
    id: "band-evening",
    label: "Evening wind-down",
    level: "peak",
    forecastedLoad: "88%",
    peakWindow: "16:00 — 19:00 PDT",
    detail:
      "End-of-day report generation and cross-region sync jobs push utilization to its daily peak. Pre-scale at 15:30.",
  },
];

export const utilizationCards: UtilizationCard[] = [
  {
    id: "util-compute",
    resource: "Compute nodes",
    currentUtilization: "62%",
    capacity: "48 / 80 vCPUs",
    status: "healthy",
    owner: "Platform team",
    note: "Auto-scaler headroom is sufficient for the next two demand bands.",
  },
  {
    id: "util-queue",
    resource: "Message queues",
    currentUtilization: "74%",
    capacity: "18.5k / 25k msg/s",
    status: "elevated",
    owner: "Messaging infra",
    note: "Consumer lag has been climbing since the last deploy. Monitor closely during the evening peak.",
  },
  {
    id: "util-workers",
    resource: "Worker pool",
    currentUtilization: "55%",
    capacity: "110 / 200 workers",
    status: "healthy",
    owner: "Job scheduler",
    note: "Batch jobs are draining on schedule. No contention expected until the overnight window.",
  },
  {
    id: "util-storage",
    resource: "Storage I/O",
    currentUtilization: "83%",
    capacity: "4.1k / 5k IOPS",
    status: "critical",
    owner: "Data platform",
    note: "Index rebuild backlog is saturating the provisioned IOPS. Consider deferring non-critical writes.",
  },
  {
    id: "util-network",
    resource: "Network egress",
    currentUtilization: "39%",
    capacity: "3.9 / 10 Gbps",
    status: "healthy",
    owner: "Network ops",
    note: "Cross-region replication is well within budget. No action needed this cycle.",
  },
];

export const planningNotes: PlanningNote[] = [
  {
    id: "note-001",
    author: "M. Chen",
    timestamp: "2026-04-25 09:14 PDT",
    body: "Storage IOPS are running hot after the index rebuild was moved to the midday window. Recommend reverting to overnight scheduling.",
    priority: "warning",
  },
  {
    id: "note-002",
    author: "J. Okafor",
    timestamp: "2026-04-25 08:42 PDT",
    body: "Pre-scale compute nodes to 72 vCPUs by 15:30 to absorb the evening peak without relying solely on the auto-scaler.",
    priority: "action",
  },
  {
    id: "note-003",
    author: "S. Petrov",
    timestamp: "2026-04-24 17:30 PDT",
    body: "Consumer lag on the order-events topic cleared after partition rebalance. Queue utilization should stabilize by tomorrow morning.",
    priority: "info",
  },
  {
    id: "note-004",
    author: "A. Reyes",
    timestamp: "2026-04-24 14:55 PDT",
    body: "Add a second worker pool tier for low-priority batch jobs so they don't compete with real-time processing during peak bands.",
    priority: "action",
  },
];
