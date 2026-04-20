import {
  recommendationCopy,
  type RankedScenario,
} from "@/data/scenario-explorer";

type RecommendationPanelProps = {
  recommendedScenario: RankedScenario;
  alternativeScenarios: RankedScenario[];
};

export function RecommendationPanel({
  recommendedScenario,
  alternativeScenarios,
}: RecommendationPanelProps) {
  return (
    <aside className="lg:sticky lg:top-8">
      <div className="overflow-hidden rounded-[36px] bg-slate-950 text-white shadow-[0_30px_120px_-60px_rgba(15,23,42,0.9)]">
        <div
          className="border-b border-white/10 px-6 py-8"
          style={{
            background: `linear-gradient(135deg, ${recommendedScenario.theme.accent} 0%, rgba(15, 23, 42, 0.98) 68%)`,
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
            Recommendation
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            {recommendationCopy.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/85 sm:text-base">
            {recommendationCopy.summary}
          </p>

          <div className="mt-6 rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/65">
              Recommended path
            </p>
            <p className="mt-3 text-2xl font-semibold">
              {recommendedScenario.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/80">
              {recommendedScenario.bestFit}
            </p>
          </div>
        </div>

        <div className="space-y-8 px-6 py-8">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/65">
              Why it wins
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/82">
              {recommendationCopy.rationale.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white/80"
                  />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/65">
              Guardrails
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/82">
              {recommendationCopy.guardrails.map((guardrail) => (
                <li key={guardrail} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300"
                  />
                  <span>{guardrail}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/65">
              Next actions
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/82">
              {recommendationCopy.nextSteps.map((nextStep) => (
                <li key={nextStep} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-300"
                  />
                  <span>{nextStep}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/65">
              Backup paths
            </h3>
            <div className="mt-4 space-y-3">
              {alternativeScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="rounded-[24px] border border-white/10 bg-white/6 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-semibold">{scenario.name}</p>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                      Fit {scenario.weightedScore}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {scenario.tagline}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}
