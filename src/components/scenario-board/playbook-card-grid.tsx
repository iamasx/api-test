import type { ScenarioPlaybook } from "@/app/scenario-board/mock-data"

type PlaybookCardGridProps = {
  onSelectPlaybook: (playbookId: string) => void
  playbooks: ScenarioPlaybook[]
  selectedPlaybookId: string
}

export function PlaybookCardGrid({ onSelectPlaybook, playbooks, selectedPlaybookId }: PlaybookCardGridProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-[#f8f2eb] p-5 shadow-[0_18px_60px_rgba(38,23,22,0.08)] sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Playbook cards</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">Pick the operating posture</h2>
        </div>
        <p className="text-sm text-stone-600">Tap the active card again to clear it and trigger the zero-state.</p>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {playbooks.map((playbook) => {
          const isSelected = playbook.id === selectedPlaybookId
          return (
            <button key={playbook.id} aria-pressed={isSelected} className={`rounded-[1.5rem] border p-4 text-left transition ${isSelected ? "border-stone-900 bg-stone-950 text-stone-50 shadow-[0_18px_40px_rgba(17,24,39,0.22)]" : "border-stone-200 bg-white text-stone-900 hover:-translate-y-0.5 hover:border-stone-300"}`} onClick={() => onSelectPlaybook(playbook.id)} type="button">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{playbook.title}</p>
                  <p className={`mt-1 text-xs uppercase tracking-[0.22em] ${isSelected ? "text-orange-200" : "text-stone-500"}`}>{playbook.lead}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isSelected ? "bg-white/10 text-white" : "bg-stone-100 text-stone-600"}`}>{playbook.cadence}</span>
              </div>
              <p className={`mt-4 text-sm leading-6 ${isSelected ? "text-stone-200" : "text-stone-600"}`}>{playbook.intent}</p>
              <div className={`mt-4 rounded-2xl border px-3 py-3 text-sm ${isSelected ? "border-white/10 bg-white/5 text-stone-100" : "border-stone-200 bg-stone-50 text-stone-700"}`}>{playbook.checkpoint}</div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
