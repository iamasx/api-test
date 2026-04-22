import type { ExperimentStatus } from "../_lib/experiment-registry-data";

const statusStyles: Record<ExperimentStatus, string> = {
  active:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  paused:
    "border-amber-200 bg-amber-50 text-amber-700",
  completed:
    "border-sky-200 bg-sky-50 text-sky-700",
  draft:
    "border-slate-200 bg-slate-50 text-slate-600",
};

const statusLabels: Record<ExperimentStatus, string> = {
  active: "Active",
  paused: "Paused",
  completed: "Completed",
  draft: "Draft",
};

export function StatusBadge({ status }: { status: ExperimentStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
      data-testid={`status-badge-${status}`}
    >
      {statusLabels[status]}
    </span>
  );
}
