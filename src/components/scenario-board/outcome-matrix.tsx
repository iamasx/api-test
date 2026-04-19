import type { OutcomeImpact, ScenarioOutcome } from "@/app/scenario-board/mock-data"

type OutcomeMatrixProps = {
  impactFilter: "all" | OutcomeImpact
  onImpactFilterChange: (impact: "all" | OutcomeImpact) => void
  outcomes: ScenarioOutcome[]
  selectedPlaybookTitle: string | null
}

const impactColumns: { id: OutcomeImpact; label: string; tone: string }[] = [
  { id: "contained", label: "Contained", tone: "bg-teal-50 text-teal-700" },
  { id: "elevated", label: "Elevated", tone: "bg-amber-50 text-amber-700" },
  { id: "severe", label: "Severe", tone: "bg-rose-50 text-rose-700" },
]

const probabilityRows = [
  { id: "high", label: "High probability" },
  { id: "medium", label: "Medium probability" },
  { id: "low", label: "Low probability" },
] as const

export function OutcomeMatrix({ impactFilter, onImpactFilterChange, outcomes, selectedPlaybookTitle }: OutcomeMatrixProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_18px_60px_rgba(38,23,22,0.08)] sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Outcome matrix</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">{selectedPlaybookTitle ? `Projected spread for ${selectedPlaybookTitle}` : "Projected spread"}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${impactFilter === "all" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`} onClick={() => onImpactFilterChange("all")} type="button">All outcomes</button>
          {impactColumns.map((column) => (
            <button key={column.id} className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${impactFilter === column.id ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`} onClick={() => onImpactFilterChange(column.id)} type="button">{column.label}</button>
          ))}
        </div>
      </div>
      {!selectedPlaybookTitle ? (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 px-5 py-10 text-center text-sm leading-6 text-stone-600">Select a playbook card to project the matrix. Clearing the active card intentionally gives this route a zero-state view.</div>
      ) : outcomes.length === 0 ? (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 px-5 py-10 text-center text-sm leading-6 text-stone-600">No outcomes remain for this playbook under the current assumption mix. Re-enable a fragile assumption or switch the impact focus.</div>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <div className="grid min-w-[48rem] grid-cols-[10rem_repeat(3,minmax(0,1fr))] gap-3">
            <div />
            {impactColumns.map((column) => <div key={column.id} className={`rounded-2xl px-4 py-3 text-center text-sm font-semibold ${column.tone}`}>{column.label}</div>)}
            {probabilityRows.map((row) => (
              <div key={row.id} className="contents">
                <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm font-semibold text-stone-700">{row.label}</div>
                {impactColumns.map((column) => {
                  const cellOutcomes = outcomes.filter((outcome) => outcome.probability === row.id && outcome.impact === column.id)
                  return (
                    <div key={`${row.id}-${column.id}`} className="rounded-2xl border border-stone-200 bg-[#fcfaf7] p-4">
                      {cellOutcomes.length === 0 ? (
                        <p className="text-sm text-stone-400">No live branch.</p>
                      ) : (
                        <div className="space-y-3">
                          {cellOutcomes.map((outcome) => (
                            <div key={outcome.id} className="rounded-xl border border-stone-200 bg-white px-3 py-3">
                              <p className="text-sm font-semibold text-stone-900">{outcome.title}</p>
                              <p className="mt-1 text-sm leading-6 text-stone-600">{outcome.note}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
