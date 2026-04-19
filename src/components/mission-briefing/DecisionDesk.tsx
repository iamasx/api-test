import styles from "@/app/mission-briefing/mission-briefing.module.css";
import type { MissionScenario } from "@/app/mission-briefing/mission-data";

export function DecisionDesk({
  markers,
  note,
  onNoteChange,
  onToggleMarker,
  scenario,
}: Readonly<{
  markers: Record<string, boolean>;
  note: string;
  onNoteChange: (nextNote: string) => void;
  onToggleMarker: (decisionId: string) => void;
  scenario: MissionScenario | null;
}>) {
  const activeCount = scenario
    ? scenario.decisions.filter((decision) => markers[decision.id]).length
    : 0;

  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Decision Desk</p>
          <h2 className={styles.sectionTitle}>Local session notes</h2>
        </div>
        <span className={styles.tag}>Client state only</span>
      </div>
      {!scenario ? (
        <div className={styles.empty}>
          <strong>Nothing pinned yet.</strong>
          <p>Select a scenario card to mark decisions and capture briefing notes.</p>
        </div>
      ) : (
        <>
          <div className={styles.badges}>
            <span className={styles.tag}>{activeCount} active marker{activeCount === 1 ? "" : "s"}</span>
            <span className={styles.tag}>{scenario.horizon}</span>
          </div>
          <div className={styles.list}>
            {scenario.decisions.map((decision) => (
              <button aria-pressed={Boolean(markers[decision.id])} className={styles.marker} key={decision.id} onClick={() => onToggleMarker(decision.id)} type="button">
                <strong>{decision.label}</strong>
                {decision.rationale}
              </button>
            ))}
          </div>
          <div className={styles.item}>
            <label className={styles.small} htmlFor="mission-note-field">Decision notes</label>
            <textarea
              className={`${styles.field} ${styles.note}`}
              id="mission-note-field"
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="Capture operator notes, go/no-go language, or next review triggers."
              value={note}
            />
          </div>
        </>
      )}
    </section>
  );
}
