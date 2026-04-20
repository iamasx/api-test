import styles from "@/app/mission-briefing/mission-briefing.module.css";
import { outcomeStanceLabels, scoreLabels } from "@/app/mission-briefing/mission-data";

import { getScoreAverage, scoreKeys, type MissionScenarioView } from "./mission-briefing.utils";

export function OutcomeScoreboard({
  onSelectOutcome,
  view,
}: Readonly<{
  onSelectOutcome: (outcomeId: string) => void;
  view: MissionScenarioView | null;
}>) {
  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Outcome Scoring</p>
          <h2 className={styles.sectionTitle}>Projected outcomes</h2>
        </div>
        {view?.activePlan ? (
          <span className={styles.tag}>{view.activePlan.label}</span>
        ) : null}
      </div>

      {!view?.activePlan ? (
        <div className={styles.empty}>
          <strong>No plan selected.</strong>
          <p>Select a scenario plan to compare baseline, upside, and stress outcomes.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {view.activePlan.outcomes.map((outcome) => {
            const isActive = view.activeOutcome?.id === outcome.id;

            return (
              <button
                aria-label={`Select outcome ${outcome.label}`}
                className={styles.planCard}
                data-active={isActive}
                key={outcome.id}
                onClick={() => onSelectOutcome(outcome.id)}
                type="button"
              >
                <div className={styles.head}>
                  <div>
                    <p className={styles.small}>{outcomeStanceLabels[outcome.stance]}</p>
                    <h3 className={styles.cardTitle}>{outcome.label}</h3>
                  </div>
                  <span className={styles.scoreBadge}>
                    Outcome score {getScoreAverage(outcome.score)}
                  </span>
                </div>

                <p className={styles.copy}>{outcome.summary}</p>
                <p className={styles.muted}>{outcome.trigger}</p>

                <div className={styles.scoreGrid}>
                  {scoreKeys.map((key) => (
                    <article className={styles.scoreCard} key={key}>
                      <span className={styles.small}>{scoreLabels[key]}</span>
                      <strong>{outcome.score[key]}</strong>
                    </article>
                  ))}
                </div>

                <div className={styles.item}>
                  <span className={styles.small}>Command note</span>
                  <p>{outcome.commandNote}</p>
                </div>

                <div className={styles.item}>
                  <span className={styles.small}>Watchpoints</span>
                  <ul className={styles.bulletList}>
                    {outcome.watchpoints.map((watchpoint) => (
                      <li key={watchpoint}>{watchpoint}</li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
