import { archiveSnapshots, type ArchiveSnapshot } from "./archive-data";

export type ArchiveBrowserSelection = {
  snapshots: ArchiveSnapshot[];
  selectedSnapshot: ArchiveSnapshot;
  requestedSnapshotId?: string;
  selectionFound: boolean;
};

function normalizeSnapshotId(snapshotId?: string) {
  return snapshotId?.trim().toLowerCase();
}

export function readRequestedSnapshotId(
  value: string | string[] | undefined,
) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function resolveArchiveBrowserSelection(
  snapshotId?: string,
): ArchiveBrowserSelection {
  const requestedSnapshotId = normalizeSnapshotId(snapshotId);
  const selectedSnapshot =
    archiveSnapshots.find((snapshot) => snapshot.id === requestedSnapshotId) ??
    archiveSnapshots[0];

  return {
    snapshots: archiveSnapshots,
    selectedSnapshot,
    requestedSnapshotId,
    selectionFound: requestedSnapshotId
      ? archiveSnapshots.some((snapshot) => snapshot.id === requestedSnapshotId)
      : true,
  };
}
