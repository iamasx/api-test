import type { CheckpointStatus } from "@/app/checkpoint-grid/mock-data";

const statusOptions: Array<{ value: CheckpointStatus | "all"; label: string }> = [
  { value: "all", label: "All statuses" },
  { value: "complete", label: "Complete" },
  { value: "active", label: "Active" },
  { value: "watch", label: "Watch" },
  { value: "blocked", label: "Blocked" },
];

type CheckpointFiltersProps = {
  onOwnerChange: (owner: string) => void; onReset: () => void; onStatusChange: (status: CheckpointStatus | "all") => void;
  owners: string[]; selectedOwner: string; selectedStatus: CheckpointStatus | "all"; totalCount: number; visibleCount: number;
};

export function CheckpointFilters({ onOwnerChange, onReset, onStatusChange, owners, selectedOwner, selectedStatus, totalCount, visibleCount }: CheckpointFiltersProps) {
  const filterButtonClass = "rounded-full border px-4 py-2 text-sm transition hover:border-sky-200/50 hover:text-white";

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-sky-200/75">Filters</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Owner and status views</h2>
        </div>
        <p className="text-sm text-slate-300">Showing {visibleCount} of {totalCount} checkpoints.</p>
      </div>
      <div className="mt-6 space-y-5">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Owner</p>
          <div className="flex flex-wrap gap-3">
            <button
              className={`${filterButtonClass} ${selectedOwner === "all" ? "border-sky-300/45 bg-sky-300/12 text-sky-100" : "border-white/10 bg-white/[0.03] text-slate-300"}`}
              onClick={() => onOwnerChange("all")}
              type="button"
            >
              All owners
            </button>
            {owners.map((owner) => (
              <button
                className={`${filterButtonClass} ${selectedOwner === owner ? "border-sky-300/45 bg-sky-300/12 text-sky-100" : "border-white/10 bg-white/[0.03] text-slate-300"}`}
                key={owner}
                onClick={() => onOwnerChange(owner)}
                type="button"
              >
                {owner}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((status) => (
              <button
                className={`${filterButtonClass} ${selectedStatus === status.value ? "border-amber-300/45 bg-amber-300/12 text-amber-100" : "border-white/10 bg-white/[0.03] text-slate-300"}`}
                key={status.value}
                onClick={() => onStatusChange(status.value)}
                type="button"
              >
                {status.label}
              </button>
            ))}
            <button
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
              onClick={onReset}
              type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
