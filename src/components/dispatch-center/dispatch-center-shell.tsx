"use client";

import { startTransition, useState } from "react";
import { bucketOrder, calculateWorkloadTotals, type DispatchCenterSnapshot, type QueueId } from "@/app/dispatch-center/mock-data";
import { AssignmentBuckets } from "./assignment-buckets";
import { DispatchCenterHeader } from "./dispatch-center-header";
import { OperatorLoadGrid } from "./operator-load-grid";
import { QueueDetailDrawer } from "./queue-detail-drawer";

type DispatchCenterShellProps = { initialSnapshot: DispatchCenterSnapshot };

export function DispatchCenterShell({ initialSnapshot }: DispatchCenterShellProps) {
  const [assignments, setAssignments] = useState(initialSnapshot.assignments);
  const [queueFilter, setQueueFilter] = useState<QueueId | "all">("all");
  const [selectedQueueId, setSelectedQueueId] = useState<QueueId | null>(null);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(null);

  const workloadTotals = calculateWorkloadTotals(assignments);
  const selectedAssignment = assignments.find((assignment) => assignment.id === selectedAssignmentId) ?? null;
  const queueSummaries = initialSnapshot.queues.map((queue) => {
    const queueAssignments = assignments.filter((assignment) => assignment.queueId === queue.id);
    return {
      ...queue,
      total: queueAssignments.length,
      dispatchCount: queueAssignments.filter((assignment) => assignment.bucketId === "dispatch").length,
      holdCount: queueAssignments.filter((assignment) => assignment.bucketId === "hold").length,
      oldestMinutes: queueAssignments.reduce((max, assignment) => Math.max(max, assignment.ageMinutes), 0),
    };
  });
  const queueCounts = queueSummaries.reduce<Record<QueueId, number>>((counts, queue) => ({ ...counts, [queue.id]: queue.total }), { priority: 0, recovery: 0, returns: 0 });

  function handleMoveAssignment(assignmentId: string, direction: -1 | 1) {
    startTransition(() => setAssignments((current) => current.map((assignment) => {
      if (assignment.id !== assignmentId) return assignment;
      const nextBucket = bucketOrder[bucketOrder.indexOf(assignment.bucketId) + direction];
      return nextBucket ? { ...assignment, bucketId: nextBucket } : assignment;
    })));
  }

  function handleQueueFilterChange(nextFilter: QueueId | "all") {
    startTransition(() => {
      setQueueFilter(nextFilter);
      if (nextFilter !== "all" && selectedAssignment?.queueId !== nextFilter) setSelectedAssignmentId(null);
    });
  }

  function handleSelectAssignment(assignmentId: string) {
    const assignment = assignments.find((item) => item.id === assignmentId);
    if (!assignment) return;
    startTransition(() => {
      setSelectedAssignmentId((current) => (current === assignmentId ? null : assignmentId));
      setSelectedQueueId(assignment.queueId);
      setSelectedOperatorId(assignment.operatorId);
    });
  }

  function handleSelectQueue(queueId: QueueId) {
    startTransition(() => {
      setSelectedQueueId((current) => (current === queueId ? null : queueId));
      if (selectedAssignment && selectedAssignment.queueId !== queueId) setSelectedAssignmentId(null);
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(251,146,60,0.14),transparent_24%),linear-gradient(180deg,#07111f_0%,#0f172a_58%,#111827_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <DispatchCenterHeader
          lastUpdated={initialSnapshot.lastUpdated}
          onSelectQueue={handleSelectQueue}
          queueSummaries={queueSummaries}
          selectedQueueId={selectedQueueId}
          shiftLabel={initialSnapshot.shiftLabel}
          shiftWindow={initialSnapshot.shiftWindow}
          workloadTotals={workloadTotals}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(21rem,0.9fr)]">
          <div className="space-y-6">
            <AssignmentBuckets
              assignments={assignments}
              onMoveAssignment={handleMoveAssignment}
              onQueueFilterChange={handleQueueFilterChange}
              onSelectAssignment={handleSelectAssignment}
              operators={initialSnapshot.operators}
              queueCounts={queueCounts}
              queueFilter={queueFilter}
              queues={initialSnapshot.queues}
              selectedAssignmentId={selectedAssignmentId}
              selectedOperatorId={selectedOperatorId}
            />
            <OperatorLoadGrid
              assignments={assignments}
              onSelectOperator={(operatorId) => startTransition(() => setSelectedOperatorId((current) => (current === operatorId ? null : operatorId)))}
              operators={initialSnapshot.operators}
              selectedOperatorId={selectedOperatorId}
            />
          </div>
          <QueueDetailDrawer
            assignments={assignments}
            onClearSelection={() => startTransition(() => { setSelectedAssignmentId(null); setSelectedQueueId(null); })}
            onSelectAssignment={handleSelectAssignment}
            operators={initialSnapshot.operators}
            queues={initialSnapshot.queues}
            selectedAssignmentId={selectedAssignmentId}
            selectedOperatorId={selectedOperatorId}
            selectedQueueId={selectedQueueId}
          />
        </div>
      </div>
    </main>
  );
}
