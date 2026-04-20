import type { ComparisonSummary } from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type ComparisonDetailPanelProps = {
  summary: ComparisonSummary | null;
  selectedChangeId: string | null;
  onSelectChange: (changeId: string) => void;
};

export function ComparisonDetailPanel({
  summary,
  selectedChangeId,
  onSelectChange,
}: ComparisonDetailPanelProps) {
  if (!summary) {
    return (
      <section className={styles.detailPanel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>Diff Explorer</p>
            <h2>Record-level changes</h2>
          </div>
        </div>
        <div className={styles.emptyState}>
          <p>Select a snapshot pair to inspect field deltas, reviewer notes, and queue guidance.</p>
        </div>
      </section>
    );
  }

  const activeChange = summary.recordChanges.find((change) => change.id === selectedChangeId) ?? summary.recordChanges[0];
  const highSeverityCount = summary.recordChanges.filter((change) => change.severity === "high").length;
  const changedCount = summary.recordChanges.filter((change) => change.changeType === "changed").length;

  return (
    <section className={styles.detailPanel}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Diff Explorer</p>
          <h2>Record-level changes</h2>
        </div>
        <span className={styles.inlineBadge}>{summary.recordChanges.length} tracked</span>
      </div>

      <div className={styles.metricGrid}>
        <article className={styles.metricCard} data-tone={highSeverityCount > 0 ? "risk" : "stable"}>
          <span>High severity</span>
          <strong>{highSeverityCount}</strong>
          <p>{highSeverityCount > 0 ? "Needs escalation before export." : "No blocking diffs."}</p>
        </article>
        <article className={styles.metricCard} data-tone="watch">
          <span>Direct changes</span>
          <strong>{changedCount}</strong>
          <p>Changed records versus passive watch items.</p>
        </article>
        <article className={styles.metricCard} data-tone="stable">
          <span>Review lane</span>
          <strong>{summary.reviewLane}</strong>
          <p>Where the current comparison should be triaged.</p>
        </article>
      </div>

      <div className={styles.changeGrid}>
        <div className={styles.changeList}>
          {summary.recordChanges.map((change) => {
            const isActive = change.id === activeChange.id;

            return (
              <button
                aria-label={`Inspect diff for ${change.recordLabel}`}
                aria-pressed={isActive}
                className={isActive ? `${styles.changeCard} ${styles.changeCardActive}` : styles.changeCard}
                key={change.id}
                onClick={() => onSelectChange(change.id)}
                type="button"
              >
                <div className={styles.changeMeta}>
                  <span className={styles.toneBadge} data-severity={change.severity}>
                    {change.severity}
                  </span>
                  <span className={styles.toneBadge} data-type={change.changeType}>
                    {change.changeType}
                  </span>
                </div>
                <strong>{change.recordLabel}</strong>
                <span>{change.area}</span>
                <p>{change.summary}</p>
              </button>
            );
          })}
        </div>

        <article aria-label="Selected diff detail" className={styles.changeInspector}>
          <p className={styles.inspectorLabel}>{activeChange.area}</p>
          <h3>{activeChange.recordLabel}</h3>
          <p className={styles.cardSummary}>{activeChange.summary}</p>

          <div className={styles.valueCompare}>
            <div className={styles.valueCard}>
              <span>Primary snapshot</span>
              <strong>{activeChange.leftValue}</strong>
            </div>
            <div className={styles.valueCard}>
              <span>Secondary snapshot</span>
              <strong>{activeChange.rightValue}</strong>
            </div>
          </div>

          <ul className={styles.noteList}>
            <li>{activeChange.impact}</li>
            <li>{activeChange.reviewerAction}</li>
          </ul>
        </article>
      </div>

      <div className={styles.timelineList}>
        {summary.timeline.map((event) => (
          <article className={styles.timelineItem} data-tone={event.tone} key={event.id}>
            <div className={styles.timelineMeta}>
              <strong>{event.at}</strong>
              <span>{event.lane}</span>
            </div>
            <p>{event.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
