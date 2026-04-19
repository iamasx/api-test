import styles from "@/app/mission-briefing/mission-briefing.module.css";
import type { MissionScenario } from "@/app/mission-briefing/mission-data";
import { statusLabels } from "@/app/mission-briefing/mission-data";

export function MissionTimeline({
  scenario,
}: Readonly<{
  scenario: MissionScenario | null;
}>) {
  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Phase Timeline</p>
          <h2 className={styles.sectionTitle}>Execution path</h2>
        </div>
        {scenario ? <span className={styles.tag}>{scenario.horizon}</span> : null}
      </div>
      {!scenario ? (
        <div className={styles.empty}>
          <strong>No active mission focus.</strong>
          <p>Choose a scenario card to inspect phase timing, owners, and blockers.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {scenario.timeline.map((phase, index) => (
            <article className={styles.card} key={phase.id}>
              <div className={styles.head}>
                <div>
                  <p className={styles.small}>
                    {index + 1}. {phase.window} · {phase.owner}
                  </p>
                  <div>
                    <h3 className={styles.cardTitle}>{phase.label}</h3>
                  </div>
                </div>
                <span className={styles.status} data-state={phase.status}>
                  {statusLabels[phase.status]}
                </span>
              </div>
              <p className={styles.copy}>{phase.objective}</p>
              <div className={styles.chips}>
                {phase.blockers.length === 0 ? (
                  <span className={styles.tag}>No blockers</span>
                ) : (
                  phase.blockers.map((blocker) => (
                    <span className={styles.chip} data-severity={blocker.severity} key={`${phase.id}-${blocker.label}`}>
                      {blocker.label}
                    </span>
                  ))
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
