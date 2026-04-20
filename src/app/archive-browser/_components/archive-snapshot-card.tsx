import Link from "next/link";

import { ArchiveMetadataBadge } from "./archive-metadata-badge";
import styles from "../archive-browser.module.css";
import type { ArchiveSnapshot } from "../_lib/archive-data";

const numberFormatter = new Intl.NumberFormat("en-US");

type ArchiveSnapshotCardProps = {
  snapshot: ArchiveSnapshot;
  isSelected: boolean;
};

export function ArchiveSnapshotCard({
  snapshot,
  isSelected,
}: ArchiveSnapshotCardProps) {
  return (
    <article
      aria-labelledby={`${snapshot.id}-title`}
      className={`${styles.snapshotCard} ${
        isSelected ? styles.snapshotCardSelected : ""
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className={styles.snapshotHeader}>
          <div className={styles.snapshotMeta}>
            <p
              className={`${styles.snapshotLabel} ${
                isSelected ? styles.snapshotLabelSelected : ""
              }`}
            >
              {snapshot.label}
            </p>
            <h3
              id={`${snapshot.id}-title`}
              className={styles.snapshotTitle}
            >
              {snapshot.title}
            </h3>
            <p
              className={`${styles.snapshotStamp} ${
                isSelected ? styles.snapshotStampSelected : ""
              }`}
            >
              Sealed {snapshot.archivedLabel}
            </p>
          </div>

          <Link
            href={`/archive-browser?snapshot=${snapshot.id}`}
            aria-current={isSelected ? "page" : undefined}
            className={`${styles.snapshotAction} ${
              isSelected ? styles.snapshotActionSelected : ""
            }`}
          >
            {isSelected ? "Viewing detail" : "Open detail"}
          </Link>
        </div>

        <p
          className={`${styles.snapshotBodyText} ${
            isSelected ? styles.snapshotBodyTextSelected : ""
          }`}
        >
          {snapshot.summary}
        </p>

        <div
          className={`${styles.snapshotStats} ${
            isSelected ? styles.snapshotStatsSelected : ""
          }`}
        >
          <div>
            <p className={styles.snapshotStatLabel}>Source</p>
            <p className={styles.snapshotStatValue}>{snapshot.source}</p>
          </div>
          <div>
            <p className={styles.snapshotStatLabel}>Assets</p>
            <p className={styles.snapshotStatValue}>
              {numberFormatter.format(snapshot.assetCount)}
            </p>
          </div>
          <div>
            <p className={styles.snapshotStatLabel}>Footprint</p>
            <p className={styles.snapshotStatValue}>
              {snapshot.storageFootprintLabel}
            </p>
          </div>
        </div>

        <div className={styles.snapshotTags}>
          {snapshot.tags.map((tag) => (
            <span
              key={`${snapshot.id}-${tag}`}
              className={`${styles.snapshotTag} ${
                isSelected ? styles.snapshotTagSelected : ""
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`${styles.snapshotStatus} ${
            isSelected ? styles.snapshotStatusSelected : ""
          }`}
        >
          <p className={styles.snapshotStatLabel}>Status</p>
          <p className={styles.snapshotStatusText}>{snapshot.status}</p>
          <p
            className={`${styles.snapshotBodyText} ${
              isSelected ? styles.snapshotStatusTextSelected : ""
            }`}
          >
            Capture window: {snapshot.captureRange}
          </p>
        </div>

        <ul className={styles.metadataBadgeList}>
          {snapshot.metadataBadges.map((badge) => (
            <ArchiveMetadataBadge
              key={`${snapshot.id}-${badge.label}`}
              badge={badge}
            />
          ))}
        </ul>
      </div>
    </article>
  );
}
