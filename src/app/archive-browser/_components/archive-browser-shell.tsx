import { ArchiveDetailPanel } from "./archive-detail-panel";
import { ArchiveSnapshotList } from "./archive-snapshot-list";
import styles from "../archive-browser.module.css";
import type { ArchiveBrowserSelection } from "../_lib/archive-browser";

const numberFormatter = new Intl.NumberFormat("en-US");

type ArchiveBrowserShellProps = {
  selection: ArchiveBrowserSelection;
};

function formatFootprint(totalFootprintGb: number) {
  if (totalFootprintGb >= 1000) {
    return `${(totalFootprintGb / 1000).toFixed(1)} TB`;
  }

  return `${totalFootprintGb.toFixed(1)} GB`;
}

function buildOverview(selection: ArchiveBrowserSelection) {
  const totalAssets = selection.snapshots.reduce(
    (count, snapshot) => count + snapshot.assetCount,
    0,
  );
  const totalFootprint = selection.snapshots.reduce(
    (count, snapshot) => count + snapshot.storageFootprintGb,
    0,
  );
  const allTags = new Set(
    selection.snapshots.flatMap((snapshot) => snapshot.tags),
  );

  return [
    {
      label: "Snapshots",
      value: numberFormatter.format(selection.snapshots.length),
    },
    {
      label: "Preserved assets",
      value: numberFormatter.format(totalAssets),
    },
    {
      label: "Storage footprint",
      value: formatFootprint(totalFootprint),
    },
    {
      label: "Tagged themes",
      value: numberFormatter.format(allTags.size),
    },
  ];
}

export function ArchiveBrowserShell({
  selection,
}: ArchiveBrowserShellProps) {
  const overview = buildOverview(selection);

  return (
    <main className={styles.archiveBrowser}>
      <section className={styles.heroPanel}>
        <div className={styles.heroGrid}>
          <div className="space-y-4">
            <p className={styles.eyebrow}>Archive browser</p>
            <div className="space-y-3">
              <h1 className={styles.heroTitle}>
                Inspect preserved snapshots with visible metadata and a detail-first review panel.
              </h1>
              <p className={styles.heroText}>
                This route keeps archive browsing independent and testable:
                server-rendered snapshot selection, explicit metadata badges,
                and a detail surface that expands timeline and recovery notes.
              </p>
            </div>
          </div>

          <section
            aria-labelledby="archive-browser-overview-title"
            className={styles.overviewCard}
          >
            <p className={styles.eyebrow}>Route overview</p>
            <h2
              id="archive-browser-overview-title"
              className={styles.overviewTitle}
            >
              Archive metrics at a glance
            </h2>
            <div className={styles.overviewGrid}>
              {overview.map((item) => (
                <div
                  key={item.label}
                  className={styles.overviewMetric}
                >
                  <p className={styles.overviewMetricLabel}>{item.label}</p>
                  <p className={styles.overviewMetricValue}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <ArchiveSnapshotList
          snapshots={selection.snapshots}
          selectedSnapshotId={selection.selectedSnapshot.id}
        />
        <ArchiveDetailPanel
          selectedSnapshot={selection.selectedSnapshot}
          requestedSnapshotId={selection.requestedSnapshotId}
          selectionFound={selection.selectionFound}
        />
      </div>
    </main>
  );
}
