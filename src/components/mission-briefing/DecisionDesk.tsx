import styles from "@/app/mission-briefing/mission-briefing.module.css";
import {
  reviewModeLabels,
  type MissionOutcome,
  type MissionPlan,
  type MissionScenario,
  type ReviewMode,
} from "@/app/mission-briefing/mission-data";

export function DecisionDesk({
  activeOutcome,
  activePlan,
  markers,
  note,
  onNoteChange,
  onReviewModeChange,
  onToggleMarker,
  reviewMode,
  scenario,
}: Readonly<{
  activeOutcome: MissionOutcome | null;
  activePlan: MissionPlan | null;
  markers: Record<string, boolean>;
  note: string;
  onNoteChange: (nextNote: string) => void;
  onReviewModeChange: (nextMode: ReviewMode) => void;
  onToggleMarker: (decisionId: string) => void;
  reviewMode: ReviewMode;
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
          <h2 className={styles.sectionTitle}>Review controls</h2>
        </div>
        <div className={styles.badges}>
          <span className={styles.tag}>Client state only</span>
          {activePlan ? <span className={styles.tag}>{activePlan.label}</span> : null}
        </div>
      </div>

      <div className={styles.filters}>
        {Object.entries(reviewModeLabels).map(([key, label]) => (
          <button
            className={styles.button}
            data-active={reviewMode === key}
            key={key}
            onClick={() => onReviewModeChange(key as ReviewMode)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {!scenario || !activePlan ? (
        <div className={styles.empty}>
          <strong>Nothing pinned yet.</strong>
          <p>Select a scenario card to review controls, mark decisions, and capture plan notes.</p>
        </div>
      ) : (
        <>
          <div className={styles.summaryGrid}>
            <article className={styles.card}>
              <p className={styles.small}>Active outcome</p>
              <p className={styles.copy}>
                {activeOutcome?.label ?? "No projected outcome selected."}
              </p>
            </article>
            <article className={styles.card}>
              <p className={styles.small}>Markers</p>
              <p className={styles.copy}>
                {activeCount} active marker{activeCount === 1 ? "" : "s"}
              </p>
            </article>
            <article className={styles.card}>
              <p className={styles.small}>Review mode</p>
              <p className={styles.copy}>{reviewModeLabels[reviewMode]}</p>
            </article>
          </div>

          <div className={styles.item}>
            <span className={styles.small}>Current review prompts</span>
            <ul className={styles.bulletList}>
              {activePlan.reviewPrompts[reviewMode].map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </div>

          {activeOutcome ? (
            <div className={styles.item}>
              <span className={styles.small}>Outcome watchpoints</span>
              <ul className={styles.bulletList}>
                {activeOutcome.watchpoints.map((watchpoint) => (
                  <li key={watchpoint}>{watchpoint}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className={styles.list}>
            {scenario.decisions.map((decision) => (
              <button
                aria-pressed={Boolean(markers[decision.id])}
                className={styles.marker}
                key={decision.id}
                onClick={() => onToggleMarker(decision.id)}
                type="button"
              >
                <strong>{decision.label}</strong>
                <span>{decision.rationale}</span>
                <p>{decision.effect}</p>
              </button>
            ))}
          </div>

          <div className={styles.item}>
            <label className={styles.small} htmlFor="mission-note-field">
              Decision notes
            </label>
            <textarea
              className={`${styles.field} ${styles.note}`}
              id="mission-note-field"
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="Capture go/no-go language, compare rationale, and next review triggers."
              value={note}
            />
          </div>
        </>
      )}
    </section>
  );
}
