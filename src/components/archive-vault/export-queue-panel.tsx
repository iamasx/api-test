import type { ExportQueueEntry } from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type ExportQueuePanelProps = {
  entries: ExportQueueEntry[];
  activeComparisonKey: string | null;
  onAdvance: (entryId: string) => void;
};

export function ExportQueuePanel({
  entries,
  activeComparisonKey,
  onAdvance,
}: ExportQueuePanelProps) {
  const readyCount = entries.filter((entry) => entry.status === "ready").length;

  return (
    <section aria-label="Export queue" className={styles.sidePanel}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.eyebrow}>Export Queue</p>
          <h2>Review packages</h2>
        </div>
        <span className={styles.inlineBadge}>{readyCount} ready</span>
      </div>

      {entries.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Mark a comparison reviewed to start queueing exportable review packages.</p>
        </div>
      ) : (
        <div className={styles.queueList}>
          {entries.map((entry) => {
            const isActive = entry.comparisonKey === activeComparisonKey;

            return (
              <article
                className={isActive ? `${styles.queueCard} ${styles.queueCardActive}` : styles.queueCard}
                key={entry.id}
              >
                <div className={styles.cardTop}>
                  <div>
                    <strong>{entry.label}</strong>
                    <p className={styles.cardSummary}>{entry.destination}</p>
                  </div>
                  <span className={styles.statusBadge} data-queue-status={entry.status}>
                    {entry.status}
                  </span>
                </div>

                <div className={styles.queueMeta}>
                  <span>{entry.requestedBy}</span>
                  <span>{entry.requestedAt}</span>
                  <span>{entry.reviewLane}</span>
                </div>

                <p className={styles.queueNote}>{entry.note}</p>

                <div className={styles.tagStrip}>
                  {entry.artifacts.map((artifact) => (
                    <span className={styles.tag} key={artifact}>
                      {artifact}
                    </span>
                  ))}
                </div>

                <button
                  aria-label={entry.status === "ready"
                    ? `Export package ready ${entry.label}`
                    : `Advance package ${entry.label}`}
                  className={styles.actionSecondary}
                  disabled={entry.status === "ready"}
                  onClick={() => onAdvance(entry.id)}
                  type="button"
                >
                  {entry.status === "ready" ? "Ready to export" : "Advance package"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
