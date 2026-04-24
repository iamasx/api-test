export type ActionStatus = "completed" | "in-progress" | "escalated" | "deferred";

export type ActionEntry = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  status: ActionStatus;
  owner: string;
  team: string;
  tags: string[];
};

export type OutcomeSummary = {
  id: string;
  actionId: string;
  label: string;
  result: "success" | "partial" | "failed" | "pending";
  detail: string;
};

export type OwnershipRecord = {
  owner: string;
  team: string;
  actionCount: number;
  resolvedCount: number;
};

export const actionEntries: ActionEntry[] = [
  {
    id: "act-001",
    timestamp: "2026-04-25T09:12:00Z",
    title: "Reroute inbound traffic to secondary gateway",
    description:
      "Primary gateway hit capacity limits during the morning surge. Traffic was shifted to the secondary gateway within the SLA window.",
    status: "completed",
    owner: "Mara Chen",
    team: "Network Ops",
    tags: ["traffic", "gateway", "capacity"],
  },
  {
    id: "act-002",
    timestamp: "2026-04-25T08:47:00Z",
    title: "Escalate database replication lag to DBA on-call",
    description:
      "Replica lag exceeded 30 seconds on the analytics cluster. Escalated to the DBA rotation after automated recovery stalled.",
    status: "escalated",
    owner: "Jonas Park",
    team: "Data Platform",
    tags: ["database", "replication", "escalation"],
  },
  {
    id: "act-003",
    timestamp: "2026-04-25T08:30:00Z",
    title: "Deploy hotfix for auth token validation",
    description:
      "A regression in token validation caused intermittent 401 responses for federated users. Hotfix deployed and canary confirmed healthy.",
    status: "completed",
    owner: "Priya Gupta",
    team: "Identity",
    tags: ["auth", "hotfix", "deploy"],
  },
  {
    id: "act-004",
    timestamp: "2026-04-25T08:15:00Z",
    title: "Investigate elevated error rate on /v2/search",
    description:
      "Error rate spiked to 4.2% on the search endpoint. Root cause traced to an upstream index rebuild that temporarily returned partial results.",
    status: "in-progress",
    owner: "Leo Tanaka",
    team: "Search",
    tags: ["search", "errors", "investigation"],
  },
  {
    id: "act-005",
    timestamp: "2026-04-25T07:58:00Z",
    title: "Defer cache warming for low-priority tenants",
    description:
      "Cache warming for tier-3 tenants deferred to off-peak window to preserve bandwidth for critical path traffic during the incident.",
    status: "deferred",
    owner: "Mara Chen",
    team: "Network Ops",
    tags: ["cache", "deferral", "capacity"],
  },
  {
    id: "act-006",
    timestamp: "2026-04-25T07:40:00Z",
    title: "Restart notification relay workers",
    description:
      "Three relay workers stopped processing after a connection pool timeout. Rolling restart restored delivery within two minutes.",
    status: "completed",
    owner: "Sam Okoro",
    team: "Messaging",
    tags: ["notifications", "restart", "workers"],
  },
  {
    id: "act-007",
    timestamp: "2026-04-25T07:22:00Z",
    title: "Roll back config change on rate limiter",
    description:
      "A config push lowered the global rate limit by 40%, triggering throttle alerts across partner integrations. Config reverted to previous version.",
    status: "completed",
    owner: "Priya Gupta",
    team: "Identity",
    tags: ["config", "rollback", "rate-limit"],
  },
  {
    id: "act-008",
    timestamp: "2026-04-25T07:05:00Z",
    title: "Scale up compute pool for batch processing",
    description:
      "Batch job queue depth exceeded threshold. Auto-scale triggered but was capped; manual override added four additional nodes.",
    status: "in-progress",
    owner: "Jonas Park",
    team: "Data Platform",
    tags: ["compute", "scaling", "batch"],
  },
];

export const outcomeSummaries: OutcomeSummary[] = [
  {
    id: "out-001",
    actionId: "act-001",
    label: "Traffic reroute",
    result: "success",
    detail: "Secondary gateway absorbed 100% of overflow. No dropped requests detected.",
  },
  {
    id: "out-002",
    actionId: "act-002",
    label: "Replication lag escalation",
    result: "pending",
    detail: "DBA on-call acknowledged. Investigating replica configuration drift.",
  },
  {
    id: "out-003",
    actionId: "act-003",
    label: "Auth hotfix deployment",
    result: "success",
    detail: "401 rate returned to baseline within 3 minutes of canary promotion.",
  },
  {
    id: "out-004",
    actionId: "act-004",
    label: "Search error investigation",
    result: "partial",
    detail: "Index rebuild identified as root cause. Monitoring for recurrence after rebuild completes.",
  },
  {
    id: "out-005",
    actionId: "act-005",
    label: "Cache warming deferral",
    result: "success",
    detail: "Bandwidth freed for critical traffic. Tier-3 warming rescheduled for 02:00 UTC.",
  },
  {
    id: "out-006",
    actionId: "act-006",
    label: "Relay worker restart",
    result: "success",
    detail: "All three workers healthy. Notification backlog cleared in 90 seconds.",
  },
  {
    id: "out-007",
    actionId: "act-007",
    label: "Rate limiter rollback",
    result: "success",
    detail: "Partner throttle alerts resolved. No SLA breaches recorded.",
  },
  {
    id: "out-008",
    actionId: "act-008",
    label: "Compute scale-up",
    result: "partial",
    detail: "Four nodes added. Queue depth dropping but not yet below threshold.",
  },
];

export function getOwnershipRecords(): OwnershipRecord[] {
  const map = new Map<string, OwnershipRecord>();

  for (const action of actionEntries) {
    const key = action.owner;
    const existing = map.get(key);
    if (existing) {
      existing.actionCount += 1;
      if (action.status === "completed") existing.resolvedCount += 1;
    } else {
      map.set(key, {
        owner: action.owner,
        team: action.team,
        actionCount: 1,
        resolvedCount: action.status === "completed" ? 1 : 0,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.actionCount - a.actionCount);
}

export type ResponseLedgerView = {
  actions: ActionEntry[];
  outcomes: OutcomeSummary[];
  ownership: OwnershipRecord[];
  summary: {
    totalActions: number;
    completedCount: number;
    escalatedCount: number;
    inProgressCount: number;
  };
};

export function getResponseLedgerView(): ResponseLedgerView {
  const ownership = getOwnershipRecords();

  return {
    actions: actionEntries,
    outcomes: outcomeSummaries,
    ownership,
    summary: {
      totalActions: actionEntries.length,
      completedCount: actionEntries.filter((a) => a.status === "completed").length,
      escalatedCount: actionEntries.filter((a) => a.status === "escalated").length,
      inProgressCount: actionEntries.filter((a) => a.status === "in-progress").length,
    },
  };
}
