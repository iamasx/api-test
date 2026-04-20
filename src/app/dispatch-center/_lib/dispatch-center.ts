import {
  dispatchAssignments,
  dispatchBuckets,
  dispatchOwners,
  dispatchQueues,
  type DispatchAssignment,
  type DispatchBucket,
  type DispatchOwner,
  type DispatchQueue,
} from "./dispatch-data";

export type DispatchAssignmentView = DispatchAssignment & {
  owner: DispatchOwner;
  queue: DispatchQueue;
  bucket: DispatchBucket;
};

export type DispatchBucketView = {
  bucket: DispatchBucket;
  assignments: DispatchAssignmentView[];
  metrics: {
    total: number;
    critical: number;
    oldestAge: string;
  };
};

export type DispatchCenterView = {
  buckets: DispatchBucketView[];
  queues: DispatchQueue[];
  selectedAssignment: DispatchAssignmentView;
  summaryMetrics: Array<{
    label: string;
    value: string;
  }>;
  missingAssignmentId?: string;
};

function findOwner(ownerId: string) {
  const owner = dispatchOwners.find((entry) => entry.id === ownerId);

  if (!owner) {
    throw new Error(`Unknown dispatch owner: ${ownerId}`);
  }

  return owner;
}

function findQueue(queueId: string) {
  const queue = dispatchQueues.find((entry) => entry.id === queueId);

  if (!queue) {
    throw new Error(`Unknown dispatch queue: ${queueId}`);
  }

  return queue;
}

function findBucket(bucketId: string) {
  const bucket = dispatchBuckets.find((entry) => entry.id === bucketId);

  if (!bucket) {
    throw new Error(`Unknown dispatch bucket: ${bucketId}`);
  }

  return bucket;
}

function toAssignmentView(assignment: DispatchAssignment): DispatchAssignmentView {
  return {
    ...assignment,
    owner: findOwner(assignment.ownerId),
    queue: findQueue(assignment.queueId),
    bucket: findBucket(assignment.bucketId),
  };
}

function readAgeMinutes(ageLabel: string) {
  const value = Number.parseInt(ageLabel, 10);

  return Number.isNaN(value) ? 0 : value;
}

function getOldestAgeLabel(assignments: DispatchAssignmentView[]) {
  if (assignments.length === 0) {
    return "No open work";
  }

  return assignments
    .map((assignment) => assignment.ageLabel)
    .sort((left, right) => readAgeMinutes(right) - readAgeMinutes(left))[0];
}

export function readRequestedAssignmentId(
  assignmentParam: string | string[] | undefined,
) {
  if (Array.isArray(assignmentParam)) {
    return assignmentParam[0];
  }

  return assignmentParam;
}

export function resolveDispatchCenterView(
  requestedAssignmentId?: string,
): DispatchCenterView {
  const assignmentViews = dispatchAssignments.map(toAssignmentView);
  const defaultAssignment = assignmentViews[0];
  const selectedAssignment =
    assignmentViews.find((assignment) => assignment.id === requestedAssignmentId) ??
    defaultAssignment;

  const buckets = dispatchBuckets.map((bucket) => {
    const assignments = assignmentViews.filter(
      (assignment) => assignment.bucketId === bucket.id,
    );

    return {
      bucket,
      assignments,
      metrics: {
        total: assignments.length,
        critical: assignments.filter(
          (assignment) => assignment.priority === "Critical",
        ).length,
        oldestAge: getOldestAgeLabel(assignments),
      },
    };
  });

  return {
    buckets,
    queues: dispatchQueues,
    selectedAssignment,
    summaryMetrics: [
      {
        label: "Assignments live",
        value: assignmentViews.length.toString(),
      },
      {
        label: "Buckets active",
        value: dispatchBuckets.length.toString(),
      },
      {
        label: "Owners on shift",
        value: dispatchOwners.length.toString(),
      },
      {
        label: "Due in the next wave",
        value: dispatchQueues.reduce((sum, queue) => sum + queue.dueSoon, 0).toString(),
      },
    ],
    missingAssignmentId:
      requestedAssignmentId && selectedAssignment.id !== requestedAssignmentId
        ? requestedAssignmentId
        : undefined,
  };
}
