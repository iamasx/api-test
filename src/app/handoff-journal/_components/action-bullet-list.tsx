import type { ActionBullet } from "../_data/handoff-journal-data";
import styles from "../handoff-journal.module.css";

type ActionBulletListProps = {
  entryTitle: string;
  actions: ActionBullet[];
};

const toneLabelMap = {
  now: "Immediate",
  next: "Queued next",
  watch: "Watch closely",
} as const;

export function ActionBulletList({
  entryTitle,
  actions,
}: ActionBulletListProps) {
  console.log(`Rendering ${actions.length} action bullets for ${entryTitle}`);

  return (
    <section className={styles.actionSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>Action bullets</p>
        <p className={styles.sectionCaption}>
          Compact, owner-tagged follow-through for the incoming shift.
        </p>
      </div>

      <ul
        aria-label={`${entryTitle} action bullets`}
        className={styles.actionList}
        role="list"
      >
        {actions.map((action) => (
          <li key={action.id} className={styles.actionItem}>
            <span
              aria-hidden
              className={`${styles.actionDot} ${
                action.tone === "now"
                  ? styles.actionDotNow
                  : action.tone === "watch"
                    ? styles.actionDotWatch
                    : styles.actionDotNext
              }`}
            />
            <div className={styles.actionBody}>
              <p className={styles.actionLabel}>{action.label}</p>
              <div className={styles.actionMeta}>
                <span className={styles.actionMetaPill}>{toneLabelMap[action.tone]}</span>
                <span className={styles.actionMetaText}>{action.owner}</span>
                <span className={styles.actionMetaText}>{action.timing}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
