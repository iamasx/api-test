import type { FailoverChecklistItem } from "@/app/status-board/mock-data";

type FailoverChecklistProps = {
  completedCount: number;
  items: FailoverChecklistItem[];
  onReset: () => void;
  onToggleItem: (itemId: string) => void;
  onToggleOpenOnly: () => void;
  showOpenOnly: boolean;
  toggledIds: string[];
  totalCount: number;
};

export function FailoverChecklist({
  completedCount,
  items,
  onReset,
  onToggleItem,
  onToggleOpenOnly,
  showOpenOnly,
  toggledIds,
  totalCount,
}: FailoverChecklistProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.2)] md:p-6">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">Failover checklist</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Operator handoff</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{completedCount} of {totalCount} checklist steps complete</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className={`rounded-full border px-4 py-2 text-sm font-medium transition ${showOpenOnly ? "border-cyan-200 bg-cyan-300 text-slate-950" : "border-slate-700 text-slate-200 hover:border-slate-400"}`} onClick={onToggleOpenOnly} type="button">{showOpenOnly ? "Showing open only" : "Show open only"}</button>
          <button className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-400" onClick={onReset} type="button">Reset defaults</button>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-slate-700 bg-slate-900/70 p-8 text-center">
          <p className="text-lg font-semibold">No open checklist items remain.</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Every visible step is cleared for this snapshot. Reset defaults to rehearse the failover path again.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((item) => {
            const checked = toggledIds.includes(item.id);
            return (
              <li className="rounded-[24px] border border-slate-800 bg-slate-900/75 p-4" key={item.id}>
                <label className="flex cursor-pointer items-start gap-4">
                  <input
                    aria-label={item.title}
                    checked={checked}
                    className="mt-1 h-4 w-4 rounded border-slate-500 bg-slate-950 text-cyan-300"
                    onChange={() => onToggleItem(item.id)}
                    type="checkbox"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-slate-50">{item.title}</span>
                      <span className="rounded-full border border-slate-700 px-2 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-300">{item.phase}</span>
                      {item.required ? <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-2 py-1 text-[11px] uppercase tracking-[0.22em] text-amber-200">Required</span> : null}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-300">{item.detail}</span>
                    <span className="mt-2 block text-xs uppercase tracking-[0.22em] text-slate-500">Owner · {item.owner}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
