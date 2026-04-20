import styles from "@/app/mission-briefing/mission-briefing.module.css";
import { reviewModeLabels } from "@/app/mission-briefing/mission-data";

import type { MissionScenarioView } from "./mission-briefing.utils";

export function StrategyReviewBoard({
  focusedScenarioId,
  onFocusScenario,
  reviewMode,
  views,
}: Readonly<{
  focusedScenarioId: string | null;
  onFocusScenario: (scenarioId: string) => void;
  reviewMode: keyof typeof reviewModeLabels;
  views: MissionScenarioView[];
}>) {
  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Readiness Review</p>
          <h2 className={styles.sectionTitle}>Scenario compare board</h2>
        </div>
        <div className={styles.badges}>
          <span className={styles.tag}>{reviewModeLabels[reviewMode]}</span>
          <span className={styles.tag}>
            {views.length} scenario{views.length === 1 ? "" : "s"} in view
          </span>
        </div>
      </div>

      {views.length === 0 ? (
        <div className={styles.empty}>
          <strong>No review set available.</strong>
          <p>Focus or pin a scenario to compare plans and outcomes side by side.</p>
        </div>
      ) : (
        <>
          {views.length === 1 ? (
            <div className={styles.inlineNotice}>
              Pin another scenario from the rail to compare alternate plans and scoring side by side.
            </div>
          ) : null}
          <div className={styles.compareGrid}>
            {views.map((view) => (
              <button
                aria-label={`Focus review scenario ${view.scenario.callsign}`}
                className={styles.compareCard}
                data-active={focusedScenarioId === view.scenario.id}
                key={view.scenario.id}
                onClick={() => onFocusScenario(view.scenario.id)}
                type="button"
              >
                <div className={styles.head}>
                  <div>
                    <p className={styles.small}>{view.scenario.theater}</p>
                    <h3 className={styles.cardTitle}>{view.scenario.callsign}</h3>
                  </div>
                  <span className={styles.scoreBadge}>Score {view.overallScore}</span>
                </div>

                <div className={styles.metricRow}>
                  <span className={styles.tag}>
                    {view.activePlan?.label ?? "No plan"}
                  </span>
                  <span className={styles.tag}>
                    {view.activeOutcome?.label ?? "No outcome"}
                  </span>
                </div>

                <div className={styles.compareMetrics}>
                  <article className={styles.metric}>
                    <span className={styles.value}>{view.readyCount}</span>
                    <span className={styles.label}>Ready teams</span>
                  </article>
                  <article className={styles.metric}>
                    <span className={styles.value}>{view.watchCount}</span>
                    <span className={styles.label}>Watch teams</span>
                  </article>
                  <article className={styles.metric}>
                    <span className={styles.value}>{view.blockedCount}</span>
                    <span className={styles.label}>Blocked teams</span>
                  </article>
                </div>

                <p className={styles.copy}>
                  {view.activeOutcome?.summary ?? view.scenario.summary}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
