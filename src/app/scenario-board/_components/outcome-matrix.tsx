import type {
  ScenarioBoardScenario,
  ScenarioOutcomeTone,
  ScenarioOutcomeMatrixRow,
} from "../_data/scenario-board-data";

const toneLabel: Record<ScenarioOutcomeTone, string> = {
  strong: "Low risk",
  balanced: "Moderate risk",
  fragile: "High risk",
};

type OutcomeMatrixProps = {
  scenarios: ScenarioBoardScenario[];
  title: string;
  description: string;
  footer: string;
  rows: ScenarioOutcomeMatrixRow[];
};

export function OutcomeMatrix({
  scenarios,
  title,
  description,
  footer,
  rows,
}: OutcomeMatrixProps) {
  return (
    <section
      aria-labelledby="outcome-matrix-heading"
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-8"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
            Outcome matrix
          </p>
          <h2
            id="outcome-matrix-heading"
            className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl"
          >
            Compare likely outcomes before you commit
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table aria-label={title} className="min-w-[64rem] border-separate border-spacing-y-4">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr>
              <th
                className="rounded-[1.35rem] bg-slate-100 px-5 py-5 text-left align-bottom"
                scope="col"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Decision factor
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  What changes if the board picks this lane?
                </p>
              </th>
              {scenarios.map((scenario) => (
                <th key={scenario.id} className="px-4 text-left align-bottom" scope="col">
                  <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {scenario.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-950">
                      {scenario.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {scenario.signal}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th
                  className="rounded-[1.35rem] bg-slate-100 px-5 py-5 text-left align-top"
                  scope="row"
                >
                  <p className="text-sm font-semibold text-slate-950">{row.criterion}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {row.whyItMatters}
                  </p>
                </th>

                {scenarios.map((scenario) => {
                  const outcome = row.outcomes[scenario.id];

                  return (
                    <td key={`${row.id}-${scenario.id}`} className="px-4 align-top">
                      <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {toneLabel[outcome.tone]}
                        </p>
                        <p className="mt-2 text-base font-semibold text-slate-950">
                          {outcome.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {outcome.detail}
                        </p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-slate-200 bg-slate-50 px-5 py-4">
        <p className="text-sm leading-7 text-slate-600">{footer}</p>
      </div>
    </section>
  );
}
