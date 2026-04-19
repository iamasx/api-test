import type { ScenarioRecord } from "@/app/scenario-board/mock-data"

type ScenarioBoardHeaderProps = {
  activeAssumptionCount: number
  scenario: ScenarioRecord
  selectedPlaybookTitle: string | null
  visibleOutcomeCount: number
}

export function ScenarioBoardHeader({ activeAssumptionCount, scenario, selectedPlaybookTitle, visibleOutcomeCount }: ScenarioBoardHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1d1311]/80 text-stone-50 shadow-[0_24px_80px_rgba(18,10,7,0.36)] backdrop-blur">
      <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.9fr)] lg:px-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-orange-200">Scenario board</span>
            <span className="rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100">{scenario.mode}</span>
          </div>
          <div>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{scenario.name}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-300 sm:text-base">{scenario.summary}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Watch window</p>
            <p className="mt-2 text-sm font-medium text-white">{scenario.horizon}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Signal</p>
            <p className="mt-2 text-sm font-medium text-white">{scenario.signal}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Active playbook</p>
            <p className="mt-2 text-sm font-medium text-white">{selectedPlaybookTitle ?? "No playbook selected"}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Visible outcomes</p>
            <p className="mt-2 text-3xl font-semibold text-white">{visibleOutcomeCount}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Live assumptions</p>
            <p className="mt-2 text-3xl font-semibold text-white">{activeAssumptionCount}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Playbooks in scene</p>
            <p className="mt-2 text-3xl font-semibold text-white">{scenario.playbooks.length}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
