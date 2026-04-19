import type { SnapshotRecord } from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type RecordDetailPanelProps = {
  record: SnapshotRecord | null;
  isCompared: boolean;
};

export function RecordDetailPanel({
  record,
  isCompared,
}: RecordDetailPanelProps) {
  if (!record) {
    return (
      <section className={styles.sidePanel}>
        <div className={styles.emptyState}>
          <p>Select a snapshot to inspect ownership, retention, and replay notes.</p>
        </div>
      </section>
    );
  }

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
      </dl>

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
