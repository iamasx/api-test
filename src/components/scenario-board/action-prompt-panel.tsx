import type { ActionPrompt } from "@/app/scenario-board/mock-data"

type ActionPromptPanelProps = {
  activeAssumptionIds: string[]
  prompts: ActionPrompt[]
  selectedPlaybookTitle: string | null
}

export function ActionPromptPanel({ activeAssumptionIds, prompts, selectedPlaybookTitle }: ActionPromptPanelProps) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_18px_60px_rgba(38,23,22,0.08)] sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Action prompts</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">{selectedPlaybookTitle ? `Moves for ${selectedPlaybookTitle}` : "Action prompts"}</h2>
      </div>
      {!selectedPlaybookTitle ? (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-center text-sm leading-6 text-stone-600">Choose a playbook to reveal the next prompts and operating cues.</div>
      ) : (
        <div className="mt-5 space-y-3">
          {prompts.map((prompt) => {
            const isReady = prompt.cueIds.every((id) => activeAssumptionIds.includes(id))
            return (
              <div key={prompt.id} className="rounded-[1.35rem] border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{prompt.title}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{prompt.detail}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${isReady ? "bg-teal-100 text-teal-700" : "bg-rose-100 text-rose-700"}`}>{isReady ? "Ready" : "Hold"}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                  <span className="rounded-full bg-white px-2.5 py-1">{prompt.owner}</span>
                  <span className="rounded-full bg-white px-2.5 py-1">{prompt.window}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
