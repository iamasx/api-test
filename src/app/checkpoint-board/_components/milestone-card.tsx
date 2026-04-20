import type { CheckpointMilestone } from "../_data/checkpoint-board-data";
import styles from "../checkpoint-board.module.css";

type MilestoneCardProps = {
  milestone: CheckpointMilestone;
};

const toneClassNames = {
  steady: styles.milestoneToneSteady,
  watch: styles.milestoneToneWatch,
  risk: styles.milestoneToneRisk,
};

const toneBadgeClasses = {
  steady: styles.badgeToneSteady,
  watch: styles.badgeToneWatch,
  risk: styles.badgeToneRisk,
};

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  return (
    <article
      className={`${styles.milestoneCard} ${toneClassNames[milestone.tone]}`}
      role="listitem"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {milestone.title}
          </h3>
          <p className="text-sm leading-6 text-slate-600">{milestone.summary}</p>
        </div>

        <span
          className={`${styles.badge} ${toneBadgeClasses[milestone.tone]}`}
        >
          {milestone.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className={styles.detailCard}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Owner
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.owner}</p>
        </div>
        <div className={styles.detailCard}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Review window
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.window}</p>
        </div>
        <div className={styles.detailCard}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Readiness
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.readiness}% ready</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Deliverables
          </p>
          <ul aria-label={`${milestone.title} deliverables`} className={styles.detailList}>
            {milestone.deliverables.map((deliverable) => (
              <li key={deliverable} className={styles.detailListItem}>
                {deliverable}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Blockers
          </p>
          <ul aria-label={`${milestone.title} blockers`} className={styles.detailList}>
            {milestone.blockers.map((blocker) => (
              <li key={blocker} className={styles.detailListItem}>
                {blocker}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`mt-5 ${styles.detailCard}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Next review
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{milestone.nextReview}</p>
      </div>
    </article>
  );
}
