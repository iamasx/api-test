import {
  type ComparisonSection,
  type RankedScenario,
} from "@/data/scenario-explorer";

type ComparisonBlockProps = {
  section: ComparisonSection;
  scenarios: RankedScenario[];
};

export function ComparisonBlock({
  section,
  scenarios,
}: ComparisonBlockProps) {
  return (
    <article
      className="rounded-[32px] border border-black/8 bg-white/80 p-6 shadow-[0_24px_90px_-55px_rgba(15,23,42,0.5)] backdrop-blur"
      data-testid="comparison-block"
    >
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          {section.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          {section.description}
        </p>
      </div>

      <div className="mt-6 hidden grid-cols-[minmax(0,1fr)_repeat(3,minmax(0,1fr))] gap-4 px-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 lg:grid">
        <span>Decision signal</span>
        {scenarios.map((scenario) => (
          <span key={`${section.id}-${scenario.id}`}>{scenario.name}</span>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {section.rows.map((row) => (
          <div
            key={`${section.id}-${row.label}`}
            className="rounded-[28px] border border-slate-200/70 bg-slate-50/70 p-4"
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_repeat(3,minmax(0,1fr))]">
              <div className="rounded-[24px] border border-slate-200/80 bg-white/70 p-4">
                <h4 className="text-base font-semibold text-slate-950">
                  {row.label}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {row.note}
                </p>
              </div>

              {scenarios.map((scenario) => (
                <div
                  key={`${section.id}-${row.label}-${scenario.id}`}
                  className="rounded-[24px] border p-4"
                  style={{
                    backgroundColor: scenario.theme.surface,
                    borderColor: scenario.theme.border,
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.25em]"
                    style={{ color: scenario.theme.accent }}
                  >
                    {scenario.name}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {row.values[scenario.id]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
