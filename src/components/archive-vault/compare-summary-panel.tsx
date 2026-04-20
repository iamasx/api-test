import type {
  ComparisonSummary,
  SnapshotRecord,
} from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type CompareSummaryPanelProps = {
  records: SnapshotRecord[];
  summary: ComparisonSummary | null;
  reviewed: boolean;
  isQueued: boolean;
  onMarkReviewed: () => void;
  onQueue: () => void;
};

export function CompareSummaryPanel({
  records,
  summary,
  reviewed,
  isQueued,
  onMarkReviewed,
  onQueue,
}: CompareSummaryPanelProps) {
  return (
    <section className={styles.sidePanel}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Comparison</p>
          <h2>Snapshot summary</h2>
        </div>
        <span className={styles.inlineBadge}>{records.length}/2 selected</span>
      </div>

      {records.length < 2 || !summary ? (
        <div className={styles.emptyState}>
          <p>Select two snapshots to unlock overlap, drift, record deltas, and export actions.</p>
          {records.length === 1 ? <p>Baseline selected: {records[0].label}</p> : null}
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

          <div className={styles.compareFocusGrid}>
            <article className={styles.focusCard}>
              <span>Primary focus</span>
              <strong>{records[0].label}</strong>
              <p>{summary.leftFocus}</p>
            </article>
            <article className={styles.focusCard}>
              <span>Secondary focus</span>
              <strong>{records[1].label}</strong>
              <p>{summary.rightFocus}</p>
            </article>
          </div>

          <div className={styles.metricGrid}>
            {summary.metrics.map((metric) => (
              <article className={styles.metricCard} data-tone={metric.tone} key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.delta}</strong>
                <p>
                  {metric.leftValue} vs {metric.rightValue}
                </p>
              </article>
            ))}
          </div>

          <ul className={styles.noteList}>
            <li>{summary.shift}</li>
            <li>{summary.recommendation}</li>
            <li>{summary.queueSummary}</li>
          </ul>

          <div className={styles.artifactRow}>
            {summary.exportArtifacts.map((artifact) => (
              <span className={styles.tag} key={artifact}>
                {artifact}
              </span>
            ))}
          </div>

          <div className={styles.actionRow}>
            <button
              className={reviewed ? styles.actionSecondary : styles.actionPrimary}
              disabled={reviewed}
              onClick={onMarkReviewed}
              type="button"
            >
              {reviewed ? "Review captured" : "Mark comparison reviewed"}
            </button>
            <button
              className={styles.actionPrimary}
              disabled={!reviewed || isQueued}
              onClick={onQueue}
              type="button"
            >
              {isQueued ? "Queued for export" : "Queue review package"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
