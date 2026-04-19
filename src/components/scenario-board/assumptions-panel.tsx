import type { Assumption, Playbook } from "@/app/scenario-board/scenario-board-data";

type AssumptionsPanelProps = {
  activeIds: string[];
  assumptions: Assumption[];
  onClear: () => void;
  onReset: () => void;
  onToggle: (assumptionId: string) => void;
  selectedPlaybook: Playbook | null;
};

const stateTone: Record<Assumption["state"], string> = {
  confirmed: "bg-emerald-400/15 text-emerald-100",
  watch: "bg-amber-300/15 text-amber-100",
  strained: "bg-rose-400/15 text-rose-100",
};

export function AssumptionsPanel({
  activeIds,
  assumptions,
  onClear,
  onReset,
  onToggle,
  selectedPlaybook,
}: AssumptionsPanelProps) {
  return (
    <section className="space-y-5 rounded-[2rem] border border-white/10 bg-stone-950/60 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">Assumptions</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-50">Toggle the active premise set.</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full bg-white/5 px-4 py-2 text-sm text-stone-300 transition hover:bg-white/10" onClick={onClear} type="button">
            Clear assumptions
          </button>
          <button className="rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-950 transition hover:bg-white" onClick={onReset} type="button">
            Reset all
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {assumptions.map((assumption) => {
          const isActive = activeIds.includes(assumption.id);
          const isUsedBySelection = selectedPlaybook?.assumptionIds.includes(assumption.id) ?? false;

          return (
            <button
              aria-pressed={isActive}
              className={`w-full rounded-[1.35rem] border p-4 text-left transition ${
                isActive ? "border-sky-300/30 bg-sky-400/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
              key={assumption.id}
              onClick={() => onToggle(assumption.id)}
              type="button"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${stateTone[assumption.state]}`}>
                  {assumption.state}
                </span>
                {isUsedBySelection ? (
                  <span className="text-xs uppercase tracking-[0.2em] text-amber-200">Used by selected playbook</span>
                ) : null}
              </div>
              <h3 className="mt-3 text-sm font-semibold text-stone-50">{assumption.label}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-300">{assumption.note}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-stone-400">{assumption.owner}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
