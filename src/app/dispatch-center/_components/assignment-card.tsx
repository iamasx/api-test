import Link from "next/link";

import type { DispatchAssignmentView } from "../_lib/dispatch-center";

const priorityClasses: Record<DispatchAssignmentView["priority"], string> = {
  Critical: "border-rose-200 bg-rose-50 text-rose-700",
  High: "border-amber-200 bg-amber-50 text-amber-700",
  Planned: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

type AssignmentCardProps = {
  assignment: DispatchAssignmentView;
  selected: boolean;
};

export function AssignmentCard({
  assignment,
  selected,
}: AssignmentCardProps) {
  return (
    <article
      className={`rounded-[1.75rem] border p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-colors ${
        selected
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white/88 text-slate-950"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.22em] ${
              selected ? "text-white/62" : "text-slate-500"
            }`}
          >
            {assignment.queue.name}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            {assignment.reference}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
              selected
                ? "border-white/15 bg-white/10 text-white"
                : priorityClasses[assignment.priority]
            }`}
          >
            {assignment.priority}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
              selected
                ? "border-white/15 bg-white/10 text-white/82"
                : "border-slate-200 bg-slate-100 text-slate-600"
            }`}
          >
            {assignment.ageLabel}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <p className={`text-base font-medium ${selected ? "text-white" : "text-slate-900"}`}>
          {assignment.title}
        </p>
        <p className={`text-sm leading-6 ${selected ? "text-white/74" : "text-slate-600"}`}>
          {assignment.summary}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className={`rounded-2xl px-4 py-3 ${selected ? "bg-white/10" : "bg-slate-100/90"}`}>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${selected ? "text-white/60" : "text-slate-500"}`}>
            Status
          </p>
          <p className="mt-2 text-sm font-medium">{assignment.statusLabel}</p>
        </div>
        <div className={`rounded-2xl px-4 py-3 ${selected ? "bg-white/10" : "bg-slate-100/90"}`}>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${selected ? "text-white/60" : "text-slate-500"}`}>
            Owner
          </p>
          <p className="mt-2 text-sm font-medium">{assignment.owner.name}</p>
          <p className={`text-xs ${selected ? "text-white/62" : "text-slate-500"}`}>
            {assignment.owner.role}
          </p>
        </div>
        <div className={`rounded-2xl px-4 py-3 ${selected ? "bg-white/10" : "bg-slate-100/90"}`}>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${selected ? "text-white/60" : "text-slate-500"}`}>
            Lane
          </p>
          <p className="mt-2 text-sm font-medium">{assignment.lane}</p>
        </div>
        <div className={`rounded-2xl px-4 py-3 ${selected ? "bg-white/10" : "bg-slate-100/90"}`}>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${selected ? "text-white/60" : "text-slate-500"}`}>
            Service window
          </p>
          <p className="mt-2 text-sm font-medium">{assignment.serviceWindow}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className={`text-sm ${selected ? "text-white/70" : "text-slate-600"}`}>
          {assignment.customer}
        </p>
        <Link
          href={`/dispatch-center?assignment=${assignment.id}`}
          aria-current={selected ? "page" : undefined}
          aria-label={`${
            selected ? "Viewing detail for" : "Open detail for"
          } ${assignment.reference}`}
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            selected
              ? "bg-white text-slate-950 hover:bg-slate-100"
              : "bg-slate-950 text-white hover:bg-slate-800"
          }`}
        >
          {selected ? "Viewing detail" : "Open detail"}
        </Link>
      </div>
    </article>
  );
}
