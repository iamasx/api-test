import type { ActionPrompt, Playbook, PlaybookLaneFilter } from "@/app/scenario-board/scenario-board-data";

type PlaybookRailProps = {
  filters: { count: number; id: PlaybookLaneFilter; label: string }[];
  modeLabel: string;
  onLaneChange: (lane: PlaybookLaneFilter) => void;
  onSelectPlaybook: (playbookId: string) => void;
  prompts: ActionPrompt[];
  selectedLane: PlaybookLaneFilter;
  selectedPlaybook: Playbook | null;
  selectedPlaybookId: string | null;
  playbooks: Playbook[];
};

const laneTone: Record<Playbook["lane"], string> = {
  stabilize: "bg-emerald-400/15 text-emerald-100",
  hedge: "bg-amber-300/15 text-amber-100",
  accelerate: "bg-sky-400/15 text-sky-100",
};

export function PlaybookRail({
  filters,
  modeLabel,
  onLaneChange,
  onSelectPlaybook,
  prompts,
  selectedLane,
  selectedPlaybook,
  selectedPlaybookId,
  playbooks,
}: PlaybookRailProps) {
  return (
    <section className="space-y-5 rounded-[2rem] border border-white/10 bg-stone-950/60 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Playbooks</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">Plan lanes with local selection state.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              aria-pressed={selectedLane === filter.id}
              className={`rounded-full px-4 py-2 text-sm transition ${
                selectedLane === filter.id ? "bg-stone-100 text-stone-950" : "bg-white/5 text-stone-300 hover:bg-white/10"
              }`}
              key={filter.id}
              onClick={() => onLaneChange(filter.id)}
              type="button"
            >
              {filter.label} <span className="text-xs opacity-70">{filter.count}</span>
            </button>
          ))}
        </div>
      </div>

      {playbooks.length > 0 ? (
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="grid gap-4 md:grid-cols-2">
            {playbooks.map((playbook) => (
              <button
                aria-label={`Open playbook: ${playbook.title}`}
                aria-pressed={playbook.id === selectedPlaybookId}
                className={`rounded-[1.5rem] border p-5 text-left transition ${
                  playbook.id === selectedPlaybookId
                    ? "border-amber-300/50 bg-amber-300/10 shadow-[0_20px_60px_rgba(251,191,36,0.12)]"
                    : "border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
                }`}
                key={playbook.id}
                onClick={() => onSelectPlaybook(playbook.id)}
                type="button"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${laneTone[playbook.lane]}`}>
                    {playbook.lane}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-400">{playbook.readiness}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-stone-50">{playbook.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">{playbook.summary}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-300">
                  <span>{playbook.lead}</span>
                  <span>{playbook.timeToImpact}</span>
                </div>
              </button>
            ))}
          </div>

          <aside className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5" aria-label="Selected playbook prompts">
            {selectedPlaybook ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">Action prompts</p>
                <h3 className="mt-3 text-2xl font-semibold text-stone-50">{selectedPlaybook.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">{selectedPlaybook.summary}</p>
                <div className="mt-5 space-y-3">
                  {prompts.map((prompt) => (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={prompt.id}>
                      <p className="text-sm font-medium text-stone-100">{prompt.label}</p>
                      <p className="mt-2 text-sm leading-6 text-stone-400">{prompt.detail}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-[1.25rem] border border-dashed border-white/15 bg-white/5 p-5 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">No playbook selected</p>
                <p className="mt-3 text-sm leading-6 text-stone-300">Choose a visible playbook to inspect its action prompts.</p>
              </div>
            )}
          </aside>
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-400">No matching playbooks</p>
          <h3 className="mt-3 text-2xl font-semibold text-stone-50">No {modeLabel.toLowerCase()} lane matches the current filter.</h3>
          <p className="mt-3 text-sm leading-6 text-stone-300">Switch the lane or mode to repopulate this isolated board.</p>
        </div>
      )}
    </section>
  );
}
