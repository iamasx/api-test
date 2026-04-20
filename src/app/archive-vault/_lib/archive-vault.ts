import {
  archiveVaultSnapshotGroups,
  archiveVaultSnapshots,
  type ArchiveVaultSnapshot,
  type ArchiveVaultSnapshotGroup,
} from "../_data/archive-vault-data";

export type ArchiveVaultSelection = {
  snapshotGroups: ArchiveVaultSnapshotGroup[];
  selectedSnapshot: ArchiveVaultSnapshot;
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

export function resolveArchiveVaultSelection(
  snapshotId?: string,
): ArchiveVaultSelection {
  const requestedSnapshotId = normalizeSnapshotId(snapshotId);
  const selectedSnapshot =
    archiveVaultSnapshots.find((snapshot) => snapshot.id === requestedSnapshotId) ??
    archiveVaultSnapshots[0];

  return {
    snapshotGroups: archiveVaultSnapshotGroups,
    selectedSnapshot,
    requestedSnapshotId,
    selectionFound: requestedSnapshotId
      ? archiveVaultSnapshots.some(
          (snapshot) => snapshot.id === requestedSnapshotId,
        )
      : true,
  };
}
