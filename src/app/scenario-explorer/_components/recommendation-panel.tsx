import type { Recommendation } from "../_data/scenario-explorer-data";
import styles from "../scenario-explorer.module.css";

const toneBadge: Record<string, string> = {
  steady: styles.badgeToneSteady,
  watch: styles.badgeToneWatch,
  risk: styles.badgeToneRisk,
};

const priorityLabel: Record<string, string> = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

export function RecommendationPanel({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  return (
    <aside
      className={`${styles.recommendationPanel} rounded-[1.75rem] border border-slate-200/50 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] backdrop-blur sm:p-6`}
      aria-label="Recommendations"
    >
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Recommendations
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">
          Suggested next moves
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`${styles.recCard} space-y-2`}
          >
            <div className="flex items-center gap-2">
              <span className={`${styles.badge} ${toneBadge[rec.tone]}`}>
                {rec.tone}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {priorityLabel[rec.priority]}
              </span>
            </div>

            <p className="text-sm font-semibold leading-5 text-slate-900">
              {rec.label}
            </p>

            <p className="text-sm leading-6 text-slate-600">{rec.rationale}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
