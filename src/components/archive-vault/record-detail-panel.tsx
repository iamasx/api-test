import type {
  ComparisonSummary,
  SnapshotRecord,
} from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type RecordDetailPanelProps = {
  record: SnapshotRecord | null;
  isCompared: boolean;
  comparison: ComparisonSummary | null;
};

export function RecordDetailPanel({
  record,
  isCompared,
  comparison,
}: RecordDetailPanelProps) {
  if (!record) {
    return (
      <section className={styles.sidePanel}>
        <div className={styles.emptyState}>
          <p>Select a snapshot to inspect ownership, retention, checksum posture, and export targets.</p>
        </div>
      </section>
    );
  }

  const compareFocus = comparison?.pair.includes(record.id)
    ? comparison.pair[0] === record.id
      ? comparison.leftFocus
      : comparison.rightFocus
    : null;

  return (
    <section className={styles.sidePanel}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Snapshot Detail</p>
          <h2>{record.label}</h2>
        </div>
        {isCompared ? <span className={styles.inlineBadge}>compare ready</span> : null}
      </div>

      <dl className={styles.detailGrid}>
        <div>
          <dt>Owner</dt>
          <dd>{record.owner}</dd>
        </div>
        <div>
          <dt>Region</dt>
          <dd>{record.region}</dd>
        </div>
        <div>
          <dt>Captured</dt>
          <dd>{record.capturedAt}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{record.status}</dd>
        </div>
        <div>
          <dt>Review lane</dt>
          <dd>{record.reviewLane}</dd>
        </div>
        <div>
          <dt>Retention</dt>
          <dd>{record.retentionWindow}</dd>
        </div>
        <div>
          <dt>Checksum</dt>
          <dd>{record.checksumStatus}</dd>
        </div>
        <div>
          <dt>Export target</dt>
          <dd>{record.exportTarget}</dd>
        </div>
      </dl>

      {compareFocus ? (
        <div className={styles.focusCallout}>
          <span>Compare focus</span>
          <p>{compareFocus}</p>
        </div>
      ) : null}

      <p className={styles.lineageNote}>{record.lineage}</p>

      <div className={styles.highlightList}>
        {record.highlights.map((highlight) => (
          <div className={styles.highlightCard} key={highlight.label}>
            <span>{highlight.label}</span>
            <strong>{highlight.value}</strong>
          </div>
        ))}
      </div>

      <ul className={styles.noteList}>
        {record.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}
