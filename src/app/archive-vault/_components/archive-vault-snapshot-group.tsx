import Link from "next/link";

import { ArchiveVaultMetadataBadge } from "./archive-vault-metadata-badge";
import styles from "../archive-vault.module.css";
import type { ArchiveVaultSnapshotGroup } from "../_data/archive-vault-data";

type ArchiveVaultSnapshotGroupProps = {
  group: ArchiveVaultSnapshotGroup;
  selectedSnapshotId: string;
};

export function ArchiveVaultSnapshotGroup({
  group,
  selectedSnapshotId,
}: ArchiveVaultSnapshotGroupProps) {
  return (
    <section
      aria-labelledby={`${group.id}-title`}
      className={styles.groupSection}
    >
      <div className={styles.groupHeader}>
        <p className={styles.eyebrow}>{group.eyebrow}</p>
        <h2
          id={`${group.id}-title`}
          className={styles.groupTitle}
        >
          {group.title}
        </h2>
        <p className={styles.groupDescription}>{group.description}</p>
      </div>

      <div
        aria-label={`${group.title} snapshots`}
        className={styles.snapshotStack}
        role="list"
      >
        {group.snapshots.map((snapshot) => {
          const isSelected = snapshot.id === selectedSnapshotId;

          return (
            <article
              key={snapshot.id}
              aria-labelledby={`${snapshot.id}-title`}
              className={`${styles.snapshotCard} ${
                isSelected
                  ? styles.snapshotCardSelected
                  : ""
              }`}
              role="listitem"
            >
              <div className={styles.snapshotTop}>
                <div className={styles.snapshotHeading}>
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
                    className={`${styles.snapshotSummary} ${
                      isSelected ? styles.snapshotSummarySelected : ""
                    }`}
                  >
                    {snapshot.summary}
                  </p>
                </div>

                <Link
                  href={`/archive-vault?snapshot=${snapshot.id}`}
                  aria-current={isSelected ? "page" : undefined}
                  className={`${styles.snapshotAction} ${
                    isSelected ? styles.snapshotActionSelected : ""
                  }`}
                >
                  {isSelected ? "Viewing snapshot" : "Open snapshot"}
                </Link>
              </div>

              <div className={styles.snapshotFacts}>
                <div
                  className={`${styles.factCard} ${
                    isSelected ? styles.factCardSelected : ""
                  }`}
                >
                  <p className={styles.factLabel}>Archive seal</p>
                  <p
                    className={`${styles.factValue} ${
                      isSelected ? styles.factValueSelected : ""
                    }`}
                  >
                    {snapshot.archivedLabel}
                  </p>
                </div>
                <div
                  className={`${styles.factCard} ${
                    isSelected ? styles.factCardSelected : ""
                  }`}
                >
                  <p className={styles.factLabel}>Source</p>
                  <p
                    className={`${styles.factValue} ${
                      isSelected ? styles.factValueSelected : ""
                    }`}
                  >
                    {snapshot.source}
                  </p>
                </div>
                <div
                  className={`${styles.factCard} ${
                    isSelected ? styles.factCardSelected : ""
                  }`}
                >
                  <p className={styles.factLabel}>Vault zone</p>
                  <p
                    className={`${styles.factValue} ${
                      isSelected ? styles.factValueSelected : ""
                    }`}
                  >
                    {snapshot.vaultZone}
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

              <div className={styles.metadataList}>
                {snapshot.metadataBadges.map((badge) => (
                  <ArchiveVaultMetadataBadge
                    key={`${snapshot.id}-${badge.label}`}
                    badge={badge}
                  />
                ))}
              </div>

              <div
                className={`${styles.statusCard} ${
                  isSelected ? styles.statusCardSelected : ""
                }`}
              >
                <p className={styles.statusLabel}>Status</p>
                <p
                  className={`${styles.statusValue} ${
                    isSelected ? styles.statusValueSelected : ""
                  }`}
                >
                  {snapshot.status}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
