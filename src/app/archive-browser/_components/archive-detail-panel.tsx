import { ArchiveMetadataBadge } from "./archive-metadata-badge";
import styles from "../archive-browser.module.css";
import type { ArchiveSnapshot } from "../_lib/archive-data";

type ArchiveDetailPanelProps = {
  selectedSnapshot: ArchiveSnapshot;
  requestedSnapshotId?: string;
  selectionFound: boolean;
};

export function ArchiveDetailPanel({
  selectedSnapshot,
  requestedSnapshotId,
  selectionFound,
}: ArchiveDetailPanelProps) {
  return (
    <aside className={styles.detailColumn}>
      <section
        aria-label="Archive detail view"
        className={styles.detailPanel}
      >
        <div className="space-y-3">
          <p className={styles.eyebrow}>Detail view</p>
          <h2 className={styles.sectionTitle}>{selectedSnapshot.title}</h2>
          <p className={styles.detailText}>{selectedSnapshot.summary}</p>
        </div>

        {!selectionFound && requestedSnapshotId ? (
          <p role="status" className={styles.detailNotice}>
            Snapshot ID <span className="font-semibold">{requestedSnapshotId}</span>{" "}
            was not found. Showing the latest archive instead.
          </p>
        ) : null}

        <div className={styles.detailMetaPanel}>
          <div className={styles.metadataBadgeList}>
            {selectedSnapshot.metadataBadges.map((badge) => (
              <ArchiveMetadataBadge
                key={`${selectedSnapshot.id}-${badge.label}-detail`}
                badge={badge}
              />
            ))}
          </div>

          <div className={styles.detailMetaGrid}>
            <div>
              <p className={styles.detailMetaLabel}>Label</p>
              <p className={styles.detailMetaValue}>{selectedSnapshot.label}</p>
            </div>
            <div>
              <p className={styles.detailMetaLabel}>Status</p>
              <p className={styles.detailMetaValue}>{selectedSnapshot.status}</p>
            </div>
            <div>
              <p className={styles.detailMetaLabel}>Source</p>
              <p className={styles.detailMetaValue}>{selectedSnapshot.source}</p>
            </div>
            <div>
              <p className={styles.detailMetaLabel}>Archive seal</p>
              <p className={styles.detailMetaValue}>
                {selectedSnapshot.archivedLabel}
              </p>
            </div>
            <div>
              <p className={styles.detailMetaLabel}>Capture range</p>
              <p className={styles.detailMetaValue}>
                {selectedSnapshot.captureRange}
              </p>
            </div>
          </div>
        </div>

        <section className={styles.detailTimeline}>
          <h3 className={styles.detailSectionTitle}>Archive timeline</h3>
          <ul className={styles.timelineList}>
            {selectedSnapshot.timelineEntries.map((entry) => (
              <li
                key={`${selectedSnapshot.id}-${entry.label}`}
                className={styles.timelineEntry}
              >
                <p className={styles.timelineLabel}>{entry.label}</p>
                <p className={styles.timelineStamp}>{entry.timestamp}</p>
                <p className={styles.timelineDetail}>{entry.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-4">
          {selectedSnapshot.detailSections.map((section) => (
            <section
              key={`${selectedSnapshot.id}-${section.title}`}
              className={styles.detailSection}
            >
              <div>
                <h3 className={styles.detailSectionTitle}>{section.title}</h3>
                <p className={styles.detailSectionDescription}>
                  {section.description}
                </p>
              </div>

              <dl className={styles.detailRows}>
                {section.rows.map((row) => (
                  <div
                    key={`${selectedSnapshot.id}-${section.title}-${row.label}`}
                    className={styles.timelineEntry}
                  >
                    <dt className={styles.detailRowLabel}>{row.label}</dt>
                    <dd className={styles.detailRowValue}>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <section className={styles.detailNotes}>
          <h3 className={styles.detailSectionTitle}>Recovery notes</h3>
          <ul className={styles.detailNotesList}>
            {selectedSnapshot.recoveryNotes.map((note) => (
              <li
                key={`${selectedSnapshot.id}-${note}`}
                className={styles.detailNote}
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </aside>
  );
}
