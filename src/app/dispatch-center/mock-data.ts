export const bucketOrder = ["intake", "dispatch", "hold"] as const;
export type BucketId = (typeof bucketOrder)[number];
export type QueueId = "priority" | "recovery" | "returns";
export type DispatchPriority = "critical" | "watch" | "steady";
export type QueueDefinition = { id: QueueId; label: string; detail: string; serviceTarget: string; windowLabel: string };
export type OperatorRecord = { id: string; name: string; focus: string; capacity: number; shift: string };
export type DispatchAssignment = {
  id: string; title: string; location: string; queueId: QueueId; bucketId: BucketId; operatorId: string;
  priority: DispatchPriority; etaLabel: string; ageMinutes: number; note: string;
};
export type WorkloadTotals = { openAssignments: number; readyCount: number; holdCount: number };
export type DispatchCenterSnapshot = {
  shiftLabel: string; shiftWindow: string; lastUpdated: string; queues: QueueDefinition[];
  operators: OperatorRecord[]; assignments: DispatchAssignment[]; workloadTotals: WorkloadTotals;
};

const queues: QueueDefinition[] = [
  { id: "priority", label: "Priority Response", detail: "Escalated field calls that need a near-immediate reroute or operator handoff.", serviceTarget: "Target under 15 min", windowLabel: "Rapid" },
  { id: "recovery", label: "Route Recovery", detail: "Work dropped from live routes because of timing slips, access holds, or asset conflicts.", serviceTarget: "Re-sequence inside 30 min", windowLabel: "Flex" },
  { id: "returns", label: "Returns Lane", detail: "Return trips and callbacks grouped for low-friction reassignment before end of shift.", serviceTarget: "Close before shift handoff", windowLabel: "Later" },
];

const operators: OperatorRecord[] = [
  { id: "op-mika", name: "Mika Solis", focus: "Downtown core", capacity: 4, shift: "12:00-20:00" },
  { id: "op-jordan", name: "Jordan Hale", focus: "Airport ring", capacity: 3, shift: "11:30-19:30" },
  { id: "op-priya", name: "Priya Nori", focus: "North loop", capacity: 4, shift: "12:00-20:00" },
  { id: "op-sera", name: "Sera Quinn", focus: "Returns + overflow", capacity: 3, shift: "13:00-21:00" },
];

const assignments: DispatchAssignment[] = [
  { id: "asg-101", title: "Generator restart", location: "Tower A", queueId: "priority", bucketId: "intake", operatorId: "op-mika", priority: "critical", etaLabel: "12 min", ageMinutes: 9, note: "Badge access needs reconfirmation." },
  { id: "asg-102", title: "Cold-chain pickup", location: "South Dock", queueId: "priority", bucketId: "dispatch", operatorId: "op-jordan", priority: "critical", etaLabel: "18 min", ageMinutes: 14, note: "Vehicle staged and waiting for release." },
  { id: "asg-103", title: "Relay route rebuild", location: "Airport feeder", queueId: "recovery", bucketId: "dispatch", operatorId: "op-priya", priority: "watch", etaLabel: "27 min", ageMinutes: 22, note: "Route trimmed after a missed handoff." },
  { id: "asg-104", title: "Return label swap", location: "Harbor clinic", queueId: "returns", bucketId: "hold", operatorId: "op-sera", priority: "steady", etaLabel: "41 min", ageMinutes: 36, note: "Waiting on corrected manifest." },
  { id: "asg-105", title: "Overnight spillover", location: "North annex", queueId: "recovery", bucketId: "intake", operatorId: "op-priya", priority: "watch", etaLabel: "34 min", ageMinutes: 17, note: "Reassign after lift-gate slot opens." },
  { id: "asg-106", title: "Customer callback", location: "Maple district", queueId: "returns", bucketId: "dispatch", operatorId: "op-sera", priority: "steady", etaLabel: "55 min", ageMinutes: 24, note: "Window confirmed with recipient." },
  { id: "asg-107", title: "Battery relay", location: "Gate 6", queueId: "priority", bucketId: "hold", operatorId: "op-jordan", priority: "watch", etaLabel: "20 min", ageMinutes: 19, note: "Courier is waiting on hazmat seal." },
  { id: "asg-108", title: "Same-route merge", location: "Riverside block", queueId: "recovery", bucketId: "dispatch", operatorId: "op-mika", priority: "steady", etaLabel: "29 min", ageMinutes: 11, note: "Can move once two stops are merged." },
  { id: "asg-109", title: "Return tote recovery", location: "Union market", queueId: "returns", bucketId: "intake", operatorId: "op-sera", priority: "watch", etaLabel: "47 min", ageMinutes: 13, note: "Tote scan mismatch flagged for review." },
];

export function calculateWorkloadTotals(items: DispatchAssignment[]): WorkloadTotals {
  return { openAssignments: items.length, readyCount: items.filter((item) => item.bucketId === "dispatch").length, holdCount: items.filter((item) => item.bucketId === "hold").length };
}

export function buildDispatchCenterSnapshot(): DispatchCenterSnapshot {
  const clonedAssignments = assignments.map((assignment) => ({ ...assignment }));
  return {
    shiftLabel: "Swing Shift",
    shiftWindow: "12:00-20:00 local",
    lastUpdated: "Local sync 08:14",
    queues: queues.map((queue) => ({ ...queue })),
    operators: operators.map((operator) => ({ ...operator })),
    assignments: clonedAssignments,
    workloadTotals: calculateWorkloadTotals(clonedAssignments),
  };
}
