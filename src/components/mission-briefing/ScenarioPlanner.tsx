import styles from "@/app/mission-briefing/mission-briefing.module.css";
import { scoreLabels } from "@/app/mission-briefing/mission-data";

import { getScoreAverage, scoreKeys, type MissionScenarioView } from "./mission-briefing.utils";

export function ScenarioPlanner({
  onSelectPlan,
  view,
}: Readonly<{
  onSelectPlan: (planId: string) => void;
  view: MissionScenarioView | null;
}>) {
  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Scenario Planning</p>
          <h2 className={styles.sectionTitle}>Alternate plans</h2>
        </div>
        {view ? (
          <span className={styles.tag}>{view.scenario.plans.length} plan options</span>
        ) : null}
      </div>

      {!view ? (
        <div className={styles.empty}>
          <strong>No active scenario.</strong>
          <p>Focus a scenario to compare alternate plans, assumptions, and scorecards.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {view.scenario.plans.map((plan) => {
            const isActive = view.activePlan?.id === plan.id;

            return (
              <button
                aria-label={`Select plan ${plan.label}`}
                className={styles.planCard}
                data-active={isActive}
                key={plan.id}
                onClick={() => onSelectPlan(plan.id)}
                type="button"
              >
                <div className={styles.head}>
                  <div>
                    <p className={styles.small}>{plan.posture}</p>
                    <h3 className={styles.cardTitle}>{plan.label}</h3>
                  </div>
                  <span className={styles.scoreBadge}>
                    Score {getScoreAverage(plan.scorecard)}
                  </span>
                </div>

                <p className={styles.copy}>{plan.summary}</p>

                <div className={styles.badges}>
                  <span className={styles.tag}>{plan.readinessSummary.supportDemand}</span>
                  <span className={styles.tag}>{plan.readinessSummary.riskWindow}</span>
                </div>

                <div className={styles.scoreGrid}>
                  {scoreKeys.map((key) => (
                    <article className={styles.scoreCard} key={key}>
                      <span className={styles.small}>{scoreLabels[key]}</span>
                      <strong>{plan.scorecard[key]}</strong>
                    </article>
                  ))}
                </div>

                <div className={styles.planColumns}>
                  <div className={styles.item}>
                    <span className={styles.small}>Command intent</span>
                    <p>{plan.commandIntent}</p>
                  </div>
                  <div className={styles.item}>
                    <span className={styles.small}>Tradeoff</span>
                    <p>{plan.tradeoff}</p>
                  </div>
                </div>

                <div className={styles.item}>
                  <span className={styles.small}>Assumptions</span>
                  <ul className={styles.bulletList}>
                    {plan.assumptions.map((assumption) => (
                      <li key={assumption}>{assumption}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.item}>
                  <span className={styles.small}>Planned actions</span>
                  <div className={styles.actionList}>
                    {plan.actions.map((action) => (
                      <div className={styles.actionCard} key={action.id}>
                        <strong>{action.label}</strong>
                        <p>
                          {action.window} · {action.owner}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
