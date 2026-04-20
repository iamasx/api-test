import {
  scoreLabels,
  type RankedScenario,
} from "@/data/scenario-explorer";

type ScenarioSummaryCardProps = {
  scenario: RankedScenario;
  rank: number;
};

const rankLabels = [
  "Leading fit",
  "Balanced alternative",
  "Specialist option",
] as const;

export function ScenarioSummaryCard({
  scenario,
  rank,
}: ScenarioSummaryCardProps) {
  const rankLabel = rankLabels[rank] ?? "Scenario option";

  return (
    <article
      className="rounded-[32px] border p-6 shadow-[0_24px_90px_-48px_rgba(15,23,42,0.45)]"
      style={{
        backgroundColor: scenario.theme.surface,
        borderColor: scenario.theme.border,
        boxShadow: `0 24px 90px -48px ${scenario.theme.glow}`,
      }}
      data-testid="scenario-card"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p
            className="text-sm font-semibold uppercase tracking-[0.25em]"
            style={{ color: scenario.theme.accent }}
          >
            {rankLabel}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            {scenario.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-600">
            {scenario.tagline}
          </p>
        </div>
        <div className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-right backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Weighted fit
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-950">
            {scenario.weightedScore}
          </p>
        </div>
      </div>

      <p className="mt-5 text-base leading-7 text-slate-700">
        {scenario.summary}
      </p>

      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur">
          <dt className="font-semibold text-slate-500">Delivery window</dt>
          <dd className="mt-2 text-base text-slate-950">
            {scenario.deliveryWindow}
          </dd>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur">
          <dt className="font-semibold text-slate-500">Budget band</dt>
          <dd className="mt-2 text-base text-slate-950">
            {scenario.budgetBand}
          </dd>
        </div>
        <div className="rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur">
          <dt className="font-semibold text-slate-500">Ownership</dt>
          <dd className="mt-2 text-base text-slate-950">
            {scenario.ownershipModel}
          </dd>
        </div>
      </dl>

      <div className="mt-6 space-y-4">
        {scoreLabels.map((scoreLabel) => (
          <div key={scoreLabel.key}>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-700">
                {scoreLabel.label}
              </span>
              <span className="font-semibold text-slate-950">
                {scenario.scores[scoreLabel.key]}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/70">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: scenario.theme.accent,
                  width: `${scenario.scores[scoreLabel.key]}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] border border-white/70 bg-white/60 p-5 backdrop-blur">
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Best when
          </h4>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {scenario.bestFit}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            {scenario.focusAreas.map((focusArea) => (
              <li key={focusArea} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: scenario.theme.accent }}
                />
                <span>{focusArea}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[24px] border border-white/70 bg-slate-950/92 p-5 text-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.8)]">
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
            Watch for
          </h4>
          <p className="mt-3 text-sm leading-6 text-white/85">
            {scenario.watchout}
          </p>
        </div>
      </div>
    </article>
  );
}
