import { ArchiveSnapshotCard } from "./archive-snapshot-card";
import styles from "../archive-browser.module.css";
import type { ArchiveSnapshot } from "../_lib/archive-data";

type ArchiveSnapshotListProps = {
  snapshots: ArchiveSnapshot[];
  selectedSnapshotId: string;
};

export function ArchiveSnapshotList({
  snapshots,
  selectedSnapshotId,
}: ArchiveSnapshotListProps) {
  return (
    <section
      aria-labelledby="archive-snapshot-list-title"
      className={styles.listSection}
    >
      <div className="space-y-2">
        <p className={styles.eyebrow}>Snapshot list</p>
        <h2
          id="archive-snapshot-list-title"
          className={styles.sectionTitle}
        >
          Archived entries
        </h2>
        <p className={styles.sectionDescription}>
          Each snapshot card exposes preservation metadata, searchable tags, and
          a linked detail state.
        </p>
      </div>

      <div className={styles.snapshotStack}>
        {snapshots.map((snapshot) => (
          <ArchiveSnapshotCard
            key={snapshot.id}
            snapshot={snapshot}
            isSelected={snapshot.id === selectedSnapshotId}
          />
        ))}
      </div>
    </section>
  );
}
