import type { CarryForwardNote } from "../_data/handoff-journal-data";
import styles from "../handoff-journal.module.css";

type CarryForwardPanelProps = {
  notes: CarryForwardNote[];
};

export function CarryForwardPanel({ notes }: CarryForwardPanelProps) {
  return (
    <aside
      aria-labelledby="carry-forward-title"
      className={`${styles.surfacePanel} ${styles.carryForwardPanel}`}
      id="carry-forward"
    >
      <div className={styles.panelHeading}>
        <p className={styles.panelEyebrow}>Carry-forward</p>
        <h2 id="carry-forward-title" className={styles.panelTitle}>
          Compact notes for the incoming crew
        </h2>
        <p className={styles.panelDescription}>
          Only unresolved items stay here, so the next shift can scan the
          essentials without rereading every handoff card.
        </p>
      </div>

      <div
        aria-label="Carry-forward notes"
        className={styles.carryForwardList}
        role="list"
      >
        {notes.map((note) => (
          <article
            key={note.id}
            className={`${styles.carryForwardCard} ${
              note.tone === "open"
                ? styles.carryForwardOpen
                : note.tone === "monitor"
                  ? styles.carryForwardMonitor
                  : styles.carryForwardScheduled
            }`}
            role="listitem"
          >
            <div className={styles.carryForwardTop}>
              <p className={styles.carryForwardLane}>{note.lane}</p>
              <span className={styles.carryForwardCheck}>{note.nextCheck}</span>
            </div>
            <p className={styles.carryForwardNote}>{note.note}</p>
            <p className={styles.carryForwardOwner}>{note.owner}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}
