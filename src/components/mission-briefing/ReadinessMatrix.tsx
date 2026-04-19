import styles from "@/app/mission-briefing/mission-briefing.module.css";
import type { MissionScenario } from "@/app/mission-briefing/mission-data";
import { statusLabels } from "@/app/mission-briefing/mission-data";

export function ReadinessMatrix({
  scenario,
}: Readonly<{
  scenario: MissionScenario | null;
}>) {
  return (
    <section className={`${styles.panel} ${styles.section}`}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Readiness Matrix</p>
          <h2 className={styles.sectionTitle}>Team posture</h2>
        </div>
        {scenario ? <span className={styles.tag}>{scenario.readiness.filter((team) => team.readiness === "ready").length} ready</span> : null}
      </div>
      {!scenario ? (
        <div className={styles.empty}>
          <strong>Matrix unavailable.</strong>
          <p>Team confidence and focus appear after a scenario is selected.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {scenario.readiness.map((team) => (
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
                <span className={styles.tag}>Confidence {team.confidence}</span>
                <div className={styles.confidence}>
                  <span className={styles.fill} style={{ width: team.confidence }} />
                </div>
              </div>
              <p className={styles.copy}>{team.focus}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
