import type { StatusFilter, StatusOption } from "@/app/lab-notebook/notebook-data";

type StatusFilterBarProps = {
  counts: Record<StatusFilter, number>; onChange: (filter: StatusFilter) => void; selectedFilter: StatusFilter; statusOptions: StatusOption[];
};

export function StatusFilterBar({
  counts,
  onChange,
  selectedFilter,
  statusOptions,
}: StatusFilterBarProps) {
  return (
    <section className="rounded-[1.8rem] border border-stone-900/10 bg-white/80 p-4 shadow-[0_20px_70px_rgba(120,53,15,0.12)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">Status filters</p>
          <p className="mt-2 text-sm text-stone-600">Filter the notebook board after template selection without leaving the route or mutating any shared workspace.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button className={`rounded-full px-4 py-2 text-sm transition ${option.id === selectedFilter ? "bg-stone-950 text-stone-50" : "border border-stone-900/10 bg-stone-100/80 text-stone-700 hover:bg-stone-200/80"}`} key={option.id} onClick={() => onChange(option.id)} type="button">
              {option.label} <span className="text-xs opacity-75">{counts[option.id]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
