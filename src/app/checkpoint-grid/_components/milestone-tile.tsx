import type { CheckpointMilestone } from "../_data/checkpoint-grid-data";
import styles from "../checkpoint-grid.module.css";

type MilestoneTileProps = {
  milestone: CheckpointMilestone;
};

const toneClassNames = {
  steady: styles.milestoneToneSteady,
  watch: styles.milestoneToneWatch,
  risk: styles.milestoneToneRisk,
};

export function MilestoneTile({ milestone }: MilestoneTileProps) {
  return (
    <article
      className={`${styles.milestoneTile} ${toneClassNames[milestone.tone]}`}
      role="listitem"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {milestone.phase}
          </p>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              {milestone.title}
            </h3>
            <p className="text-sm leading-6 text-slate-600">{milestone.summary}</p>
          </div>
        </div>

        <span className={`${styles.badge} ${toneClassNames[milestone.tone]}`}>
          {milestone.status}
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className={styles.detailBlock}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Owner
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.owner}</p>
        </div>
        <div className={styles.detailBlock}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Review window
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.window}</p>
        </div>
        <div className={styles.detailBlock}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Progress
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.completion}% complete</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Deliverables
          </p>
          <ul className={styles.bulletList} aria-label={`${milestone.title} deliverables`}>
            {milestone.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Dependencies
          </p>
          <ul className={styles.bulletList} aria-label={`${milestone.title} dependencies`}>
            {milestone.dependencies.map((dependency) => (
              <li key={dependency}>{dependency}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.divider} />

      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Next review
        </p>
        <p className="text-sm leading-6 text-slate-700">{milestone.nextReview}</p>
      </div>
    </article>
  );
}
