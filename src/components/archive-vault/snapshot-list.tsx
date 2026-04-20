import type { SnapshotRecord } from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type SnapshotListProps = {
  records: SnapshotRecord[];
  activeRecordId: string | null;
  compareIds: string[];
  hasFilters: boolean;
  onActivate: (recordId: string) => void;
  onToggleCompare: (recordId: string) => void;
  onResetFilters: () => void;
  onClearCompare: () => void;
};

export function SnapshotList({
  records,
  activeRecordId,
  compareIds,
  hasFilters,
  onActivate,
  onToggleCompare,
  onResetFilters,
  onClearCompare,
}: SnapshotListProps) {
  const selectedLabels = records
    .filter((record) => compareIds.includes(record.id))
    .map((record) => record.label);

  return (
    <section className={styles.listPanel}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Snapshot Browser</p>
          <h2>Searchable local records</h2>
        </div>
        <div className={styles.compareHeaderActions}>
          <span className={styles.inlineBadge}>{compareIds.length}/2 compare slots</span>
          {compareIds.length > 0 ? (
            <button className={styles.ghostButton} onClick={onClearCompare} type="button">
              Clear compare
            </button>
          ) : null}
        </div>
      </div>

      {compareIds.length > 0 ? (
        <div className={styles.compareShelf}>
          <span className={styles.compareHint}>
            {compareIds.length === 1
              ? "Select one more snapshot to stage a diff review."
              : "Comparison staged for record diff inspection and export queueing."}
          </span>
          <div className={styles.comparePair}>
            {selectedLabels.map((label) => (
              <span className={styles.tag} key={label}>
                {label}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {records.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No snapshots match the current search and filter state.</p>
          {hasFilters ? (
            <button className={styles.actionSecondary} onClick={onResetFilters} type="button">
              Clear filters
            </button>
          ) : null}
        </div>
      ) : (
        <div className={styles.recordGrid}>
          {records.map((record) => {
            const isActive = record.id === activeRecordId;
            const isCompared = compareIds.includes(record.id);

            return (
              <article
                className={isActive ? `${styles.card} ${styles.cardActive}` : styles.card}
                key={record.id}
              >
                <div className={styles.cardTop}>
                  <span className={styles.statusBadge} data-tone={record.status}>
                    {record.status}
                  </span>
                  <button
                    aria-label={`Select ${record.label} for compare`}
                    aria-pressed={isCompared}
                    className={isCompared ? styles.actionSecondary : styles.ghostButton}
                    onClick={() => onToggleCompare(record.id)}
                    type="button"
                  >
                    {isCompared ? "Selected" : compareIds.length === 2 ? "Swap in" : "Compare"}
                  </button>
                </div>

                <button
                  aria-label={`Open snapshot ${record.label}`}
                  className={styles.cardBody}
                  onClick={() => onActivate(record.id)}
                  type="button"
                >
                  <div className={styles.cardHeading}>
                    <h3>{record.label}</h3>
                    <span>{record.cluster}</span>
                  </div>
                  <p className={styles.cardSummary}>{record.summary}</p>
                  <div className={styles.cardMeta}>
                    <span>{record.reviewLane}</span>
                    <span>{record.exportTarget}</span>
                  </div>
                  <dl className={styles.statGrid}>
                    <div>
                      <dt>Rows</dt>
                      <dd>{record.records.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt>Delta</dt>
                      <dd>{record.delta}%</dd>
                    </div>
                    <div>
                      <dt>Trust</dt>
                      <dd>{record.confidence}%</dd>
                    </div>
                    <div>
                      <dt>Replay</dt>
                      <dd>{record.highlights.find((highlight) => highlight.label === "Replay gap")?.value}</dd>
                    </div>
                  </dl>
                </button>

                <div className={styles.tagStrip}>
                  {record.tags.map((tag) => (
                    <span className={styles.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
