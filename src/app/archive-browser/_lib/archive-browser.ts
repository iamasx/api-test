import { archiveSnapshots, type ArchiveMetric, type ArchiveSnapshot } from "./archive-data";

export type ArchiveBrowserView = {
  snapshots: ArchiveSnapshot[];
  selectedSnapshot: ArchiveSnapshot;
  requestedSnapshotId?: string;
  selectionFound: boolean;
  summaryMetrics: ArchiveMetric[];
};

const numberFormatter = new Intl.NumberFormat("en-US");

function formatFootprint(storageFootprintGb: number) {
  if (storageFootprintGb >= 1000) {
    return `${(storageFootprintGb / 1000).toFixed(1)} TB`;
  }

  return `${storageFootprintGb.toFixed(1)} GB`;
}

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

function buildSummaryMetrics(): ArchiveMetric[] {
  const totalAssets = archiveSnapshots.reduce(
    (count, snapshot) => count + snapshot.assetCount,
    0,
  );
  const totalFootprint = archiveSnapshots.reduce(
    (count, snapshot) => count + snapshot.storageFootprintGb,
    0,
  );
  const vaultCount = new Set(
    archiveSnapshots.map((snapshot) => snapshot.metadataBadges[3]?.value),
  ).size;

  return [
    { label: "Snapshots", value: numberFormatter.format(archiveSnapshots.length) },
    { label: "Preserved records", value: numberFormatter.format(totalAssets) },
    { label: "Archive footprint", value: formatFootprint(totalFootprint) },
    { label: "Vault zones", value: numberFormatter.format(vaultCount) },
  ];
}

export function resolveArchiveBrowserView(
  snapshotId?: string,
): ArchiveBrowserView {
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
    summaryMetrics: buildSummaryMetrics(),
  };
}
