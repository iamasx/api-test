export type HandoffStatus = "open" | "resolved" | "escalated";

export type HandoffEntry = {
  id: string;
  timestamp: string;
  fromOperator: string;
  toOperator: string;
  status: HandoffStatus;
  summary: string;
  tags: string[];
  priority: "low" | "medium" | "high" | "critical";
};

export type ShiftRotation = {
  id: string;
  shiftLabel: string;
  startTime: string;
  endTime: string;
  outgoing: string;
  incoming: string;
  entryCount: number;
};

export const shiftRotations: ShiftRotation[] = [
  {
    id: "SR-01",
    shiftLabel: "Night → Morning",
    startTime: "2026-04-23T06:00:00Z",
    endTime: "2026-04-23T14:00:00Z",
    outgoing: "M. Chen",
    incoming: "R. Alvarez",
    entryCount: 3,
  },
  {
    id: "SR-02",
    shiftLabel: "Afternoon → Night",
    startTime: "2026-04-22T18:00:00Z",
    endTime: "2026-04-23T06:00:00Z",
    outgoing: "T. Nakamura",
    incoming: "M. Chen",
    entryCount: 3,
  },
];

export const handoffEntries: HandoffEntry[] = [
  {
    id: "HJ-001",
    timestamp: "2026-04-23T06:00:00Z",
    fromOperator: "M. Chen",
    toOperator: "R. Alvarez",
    status: "open",
    summary:
      "Ingest pipeline for sensor-grid-7 is throttled at 40% capacity. Awaiting infra team confirmation on memory limits before scaling.",
    tags: ["pipeline", "infra"],
    priority: "high",
  },
  {
    id: "HJ-002",
    timestamp: "2026-04-23T06:00:00Z",
    fromOperator: "M. Chen",
    toOperator: "R. Alvarez",
    status: "escalated",
    summary:
      "Compliance audit flagged three archive partitions with missing retention labels. Legal review required before end of week.",
    tags: ["compliance", "archive"],
    priority: "critical",
  },
  {
    id: "HJ-003",
    timestamp: "2026-04-23T06:00:00Z",
    fromOperator: "M. Chen",
    toOperator: "R. Alvarez",
    status: "resolved",
    summary:
      "Rebalanced route planner weights after overnight demand spike in sector 12. All delivery windows now within SLA.",
    tags: ["routing", "sla"],
    priority: "medium",
  },
  {
    id: "HJ-004",
    timestamp: "2026-04-22T18:00:00Z",
    fromOperator: "T. Nakamura",
    toOperator: "M. Chen",
    status: "resolved",
    summary:
      "Deployed hotfix for experiment-registry search index. Full reindex completed at 17:42 UTC with no data loss.",
    tags: ["search", "deploy"],
    priority: "medium",
  },
  {
    id: "HJ-005",
    timestamp: "2026-04-22T18:00:00Z",
    fromOperator: "T. Nakamura",
    toOperator: "M. Chen",
    status: "open",
    summary:
      "Field guide procedure FG-204 has conflicting checklist steps between v2 and v3. Needs content owner review before next publish cycle.",
    tags: ["field-guide", "content"],
    priority: "low",
  },
  {
    id: "HJ-006",
    timestamp: "2026-04-22T18:00:00Z",
    fromOperator: "T. Nakamura",
    toOperator: "M. Chen",
    status: "escalated",
    summary:
      "Operations center KPI feed showing stale data for fleet utilization metric. Dashboard cache invalidation may be stuck.",
    tags: ["ops-center", "monitoring"],
    priority: "high",
  },
];

export function getHandoffMetrics(entries: HandoffEntry[]) {
  const byStatus = { open: 0, resolved: 0, escalated: 0 };
  const byPriority = { low: 0, medium: 0, high: 0, critical: 0 };

  for (const entry of entries) {
    byStatus[entry.status]++;
    byPriority[entry.priority]++;
  }

  return {
    total: entries.length,
    byStatus,
    byPriority,
    uniqueOperators: new Set(
      entries.flatMap((e) => [e.fromOperator, e.toOperator])
    ).size,
  };
}
