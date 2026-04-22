import type { ScenarioSummary } from "../_data/scenario-explorer-data";
import styles from "../scenario-explorer.module.css";

const toneBg: Record<string, string> = {
  steady: styles.scenarioToneSteady,
  watch: styles.scenarioToneWatch,
  risk: styles.scenarioToneRisk,
};

const toneBadge: Record<string, string> = {
  steady: styles.badgeToneSteady,
  watch: styles.badgeToneWatch,
  risk: styles.badgeToneRisk,
};

export function ScenarioSummaryCard({ scenario }: { scenario: ScenarioSummary }) {
  return (
    <article
      className={`${styles.scenarioCard} ${toneBg[scenario.tone]} space-y-3`}
      role="listitem"
    >
      <div className="flex items-center gap-2">
        <span className={`${styles.badge} ${toneBadge[scenario.tone]}`}>
          {scenario.tone}
        </span>
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-slate-950">
        {scenario.title}
      </h3>

      <p className="text-sm leading-6 text-slate-600">{scenario.description}</p>

      <div className="flex gap-4 text-xs font-medium text-slate-500">
        <span>
          Likelihood: <strong className="text-slate-700">{scenario.likelihood}</strong>
        </span>
        <span>
          Impact: <strong className="text-slate-700">{scenario.impact}</strong>
        </span>
      </div>

      <ul className="space-y-1.5 pt-1">
        {scenario.keyFactors.map((factor) => (
          <li
            key={factor}
            className="rounded-lg border border-slate-200/60 bg-white/60 px-3 py-2 text-sm leading-5 text-slate-700"
          >
            {factor}
          </li>
        ))}
      </ul>
    </article>
  );
}
