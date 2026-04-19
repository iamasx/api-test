import type {
  ComparisonSummary,
  SnapshotRecord,
} from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type CompareSummaryPanelProps = {
  records: SnapshotRecord[];
  summary: ComparisonSummary | null;
};

export function CompareSummaryPanel({
  records,
  summary,
}: CompareSummaryPanelProps) {
  return (
    <section className={styles.sidePanel}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Comparison</p>
          <h2>Pairwise summary</h2>
        </div>
        <span className={styles.inlineBadge}>{records.length}/2 selected</span>
      </div>

      {records.length < 2 || !summary ? (
        <div className={styles.emptyState}>
          <p>Select two snapshots to unlock overlap, drift, and compare guidance.</p>
          {records.length === 1 ? <p>Waiting for a second pair candidate.</p> : null}
        </div>
      ) : (
        <>
          <div className={styles.comparePair}>
            {records.map((record) => (
              <span className={styles.tag} key={record.id}>
                {record.label}
              </span>
            ))}
          </div>
          <p className={styles.compareVerdict}>{summary.verdict}</p>
          <dl className={styles.detailGrid}>
            <div>
              <dt>Alignment</dt>
              <dd>{summary.alignment}</dd>
            </div>
            <div>
              <dt>Risk</dt>
              <dd>{summary.risk}</dd>
            </div>
          </dl>
          <ul className={styles.noteList}>
            <li>{summary.shift}</li>
            <li>{summary.recommendation}</li>
          </ul>
        </>
      )}
    </section>
  );
}
