import { ArchiveVaultMetadataBadge } from "./archive-vault-metadata-badge";
import styles from "../archive-vault.module.css";
import type { ArchiveVaultSnapshot } from "../_data/archive-vault-data";

type ArchiveVaultDetailPanelProps = {
  snapshot: ArchiveVaultSnapshot;
  requestedSnapshotId?: string;
  selectionFound?: boolean;
};

export function ArchiveVaultDetailPanel({
  snapshot,
  requestedSnapshotId,
  selectionFound = true,
}: ArchiveVaultDetailPanelProps) {
  return (
    <aside className={styles.detailColumn}>
      <section
        aria-label="Archive vault detail panel"
        className={styles.detailPanel}
      >
        <div className={styles.detailHeader}>
          <p className={styles.eyebrow}>Detail summary</p>
          <h2 className={styles.detailTitle}>{snapshot.title}</h2>
          <p className={styles.detailText}>{snapshot.detailSummary.overview}</p>
        </div>

        {!selectionFound && requestedSnapshotId ? (
          <p role="status" className={styles.detailNotice}>
            Snapshot <span className="font-semibold">{requestedSnapshotId}</span>{" "}
            was not found. Showing the current vault baseline instead.
          </p>
        ) : null}

        <ul className={styles.metadataList}>
          {snapshot.metadataBadges.map((badge) => (
            <ArchiveVaultMetadataBadge
              key={`${snapshot.id}-${badge.label}-detail`}
              badge={badge}
            />
          ))}
        </ul>

        <div className={styles.detailMetaGrid}>
          <article className={styles.detailMetaCard}>
            <p className={styles.detailMetaLabel}>Archive label</p>
            <p className={styles.detailMetaValue}>{snapshot.label}</p>
            <p className={styles.detailFeatureText}>
              Sealed {snapshot.archivedLabel}
            </p>
          </article>

          <article className={styles.detailMetaCard}>
            <p className={styles.detailMetaLabel}>Comparison readiness</p>
            <p className={styles.detailFeatureText}>
              {snapshot.detailSummary.comparisonReadiness}
            </p>
          </article>

          <article className={styles.detailMetaCard}>
            <p className={styles.detailMetaLabel}>Source</p>
            <p className={styles.detailMetaValue}>{snapshot.source}</p>
            <p className={styles.detailFeatureText}>{snapshot.vaultZone}</p>
          </article>

          <article className={styles.detailMetaCard}>
            <p className={styles.detailMetaLabel}>Status</p>
            <p className={styles.detailMetaValue}>{snapshot.status}</p>
            <p className={styles.detailFeatureText}>
              {snapshot.detailSummary.reviewWindow}
            </p>
          </article>
        </div>

        <section className={styles.detailSection}>
          <h3 className={styles.detailSectionTitle}>
            {snapshot.detailSummary.heading}
          </h3>
          <p className={styles.detailSectionText}>
            {snapshot.detailSummary.reviewWindow}
          </p>

          <dl className={styles.detailRows}>
            {snapshot.detailSummary.rows.map((row) => (
              <div
                key={`${snapshot.id}-${row.label}`}
                className={styles.detailRow}
              >
                <dt className={styles.detailRowLabel}>{row.label}</dt>
                <dd className={styles.detailRowValue}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </section>
    </aside>
  );
}
