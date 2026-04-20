import styles from "@/app/mission-briefing/mission-briefing.module.css";
import { statusLabels } from "@/app/mission-briefing/mission-data";

import type { MissionScenarioView } from "./mission-briefing.utils";

export function MissionTimeline({
  view,
}: Readonly<{
  view: MissionScenarioView | null;
}>) {
  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Phase Timeline</p>
          <h2 className={styles.sectionTitle}>Execution path</h2>
        </div>
        {view ? <span className={styles.tag}>{view.scenario.horizon}</span> : null}
      </div>

      {!view ? (
        <div className={styles.empty}>
          <strong>No active mission focus.</strong>
          <p>Choose a scenario card to inspect plan actions, phase timing, and outcome stress points.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {view.scenario.timeline.map((phase, index) => {
            const planActions =
              view.activePlan?.actions.filter((action) => action.phaseId === phase.id) ?? [];
            const isStressed = Boolean(
              view.activeOutcome?.stressedPhaseIds.includes(phase.id),
            );

            return (
              <article
                className={styles.card}
                data-stressed={isStressed}
                key={phase.id}
              >
                <div className={styles.head}>
                  <div>
                    <p className={styles.small}>
                      {index + 1}. {phase.window} · {phase.owner}
                    </p>
                    <h3 className={styles.cardTitle}>{phase.label}</h3>
                  </div>
                  <div className={styles.badges}>
                    {isStressed ? (
                      <span className={styles.warningTag}>Outcome stress</span>
                    ) : null}
                    <span className={styles.status} data-state={phase.status}>
                      {statusLabels[phase.status]}
                    </span>
                  </div>
                </div>

                <p className={styles.copy}>{phase.objective}</p>

                <div className={styles.chips}>
                  {phase.blockers.length === 0 ? (
                    <span className={styles.tag}>No blockers</span>
                  ) : (
                    phase.blockers.map((blocker) => (
                      <span
                        className={styles.chip}
                        data-severity={blocker.severity}
                        key={`${phase.id}-${blocker.label}`}
                      >
                        {blocker.label}
                      </span>
                    ))
                  )}
                </div>

                {planActions.length > 0 ? (
                  <div className={styles.item}>
                    <span className={styles.small}>Plan actions</span>
                    <div className={styles.actionList}>
                      {planActions.map((action) => (
                        <div className={styles.actionCard} key={action.id}>
                          <strong>{action.label}</strong>
                          <p>
                            {action.window} · {action.owner}
                          </p>
                          <p>{action.effect}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
