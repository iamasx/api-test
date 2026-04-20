import styles from "@/app/mission-briefing/mission-briefing.module.css";
import { reviewModeLabels, statusLabels, type ReviewMode } from "@/app/mission-briefing/mission-data";

import type { MissionScenarioView } from "./mission-briefing.utils";

export function ReadinessMatrix({
  reviewMode,
  view,
}: Readonly<{
  reviewMode: ReviewMode;
  view: MissionScenarioView | null;
}>) {
  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Readiness Matrix</p>
          <h2 className={styles.sectionTitle}>Team posture</h2>
        </div>
        {view ? (
          <span className={styles.tag}>
            {view.readyCount} ready / {view.blockedCount} blocked
          </span>
        ) : null}
      </div>

      {!view?.activePlan ? (
        <div className={styles.empty}>
          <strong>Matrix unavailable.</strong>
          <p>Team confidence and review summaries appear after a scenario plan is selected.</p>
        </div>
      ) : (
        <>
          <div className={styles.summaryGrid}>
            <article className={styles.card}>
              <p className={styles.small}>{reviewModeLabels[reviewMode]}</p>
              <p className={styles.copy}>{view.activePlan.readinessSummary.headline}</p>
            </article>
            <article className={styles.card}>
              <p className={styles.small}>Support demand</p>
              <p className={styles.copy}>{view.activePlan.readinessSummary.supportDemand}</p>
            </article>
            <article className={styles.card}>
              <p className={styles.small}>Risk window</p>
              <p className={styles.copy}>{view.activePlan.readinessSummary.riskWindow}</p>
            </article>
          </div>

          <div className={styles.inlineNotice}>
            {view.activePlan.readinessSummary.note}
          </div>

          <div className={styles.list}>
            {view.adjustedTeams.map((team) => (
              <article className={styles.card} key={team.id}>
                <div className={styles.head}>
                  <div>
                    <p className={styles.small}>{team.lead}</p>
                    <h3 className={styles.cardTitle}>{team.name}</h3>
                  </div>
                  <span className={styles.status} data-state={team.readiness}>
                    {statusLabels[team.readiness]}
                  </span>
                </div>

                <div className={styles.item}>
                  <span className={styles.tag}>Confidence {team.confidence}%</span>
                  <div className={styles.confidence}>
                    <span
                      className={styles.fill}
                      style={{ width: `${team.confidence}%` }}
                    />
                  </div>
                </div>

                <p className={styles.copy}>{team.focus}</p>
                <p className={styles.muted}>{team.note}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
