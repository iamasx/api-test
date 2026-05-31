import { ActionBulletList } from "./action-bullet-list";
import type { HandoffEntry } from "../_data/handoff-journal-data";
import styles from "../handoff-journal.module.css";

type HandoffEntryCardProps = {
  entry: HandoffEntry;
};

export function HandoffEntryCard({ entry }: HandoffEntryCardProps) {
  return (
    <article
      className={`${styles.entryCard} ${
        entry.tone === "steady"
          ? styles.entrySteady
          : entry.tone === "watch"
            ? styles.entryWatch
            : styles.entryUrgent
      }`}
      role="listitem"
    >
      <div className={styles.entryHeader}>
        <div className={styles.entryHeaderCopy}>
          <span className={styles.entryShiftBadge}>{entry.shiftLabel}</span>
          <h3 className={styles.entryTitle}>{entry.title}</h3>
        </div>
        <div className={styles.entryMeta}>
          <span className={styles.entryMetaPill}>{entry.window}</span>
          <span className={styles.entryMetaText}>{entry.operator}</span>
          <span className={styles.entryMetaText}>{entry.channel}</span>
        </div>
      </div>

      <p className={styles.entrySummary}>{entry.summary}</p>

      <ul
        aria-label={`${entry.title} highlights`}
        className={styles.highlightList}
        role="list"
      >
        {entry.highlights.map((highlight) => (
          <li key={highlight} className={styles.highlightItem}>
            {highlight}
          </li>
        ))}
      </ul>

      <ActionBulletList actions={entry.actions} entryTitle={entry.title} />
    </article>
  );
}
