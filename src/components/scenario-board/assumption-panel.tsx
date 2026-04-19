import type { ScenarioAssumption } from "@/app/scenario-board/mock-data"

type AssumptionPanelProps = {
  activeAssumptionIds: string[]
  assumptions: ScenarioAssumption[]
  onReset: () => void
  onToggleAssumption: (assumptionId: string) => void
}

const statusStyles = {
  fragile: "border-rose-200 bg-rose-50 text-rose-700",
  validated: "border-teal-200 bg-teal-50 text-teal-700",
  watch: "border-amber-200 bg-amber-50 text-amber-700",
} as const

export function AssumptionPanel({ activeAssumptionIds, assumptions, onReset, onToggleAssumption }: AssumptionPanelProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_18px_60px_rgba(38,23,22,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Assumptions</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">Toggle what still holds</h2>
        </div>
        <button className="rounded-full border border-stone-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600 transition hover:border-stone-300 hover:text-stone-900" onClick={onReset} type="button">Restore baseline</button>
      </div>
      <div className="mt-5 space-y-3">
        {assumptions.map((assumption) => {
          const isActive = activeAssumptionIds.includes(assumption.id)
          return (
            <button key={assumption.id} aria-pressed={isActive} className={`w-full rounded-[1.35rem] border p-4 text-left transition ${isActive ? "border-stone-900 bg-stone-950 text-stone-50" : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-300"}`} onClick={() => onToggleAssumption(assumption.id)} type="button">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{assumption.label}</p>
                  <p className={`mt-2 text-sm leading-6 ${isActive ? "text-stone-300" : "text-stone-600"}`}>{assumption.note}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isActive ? "border-white/10 bg-white/10 text-white" : statusStyles[assumption.status]}`}>{assumption.status}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isActive ? "bg-orange-400/20 text-orange-100" : "bg-stone-200 text-stone-600"}`}>{isActive ? "Included" : "Excluded"}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
