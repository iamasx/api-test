import type { CheckpointGroup } from "../_data/checkpoint-board-data";
import { MilestoneCard } from "./milestone-card";

type CheckpointGroupProps = {
  group: CheckpointGroup;
};

export function CheckpointGroupSection({ group }: CheckpointGroupProps) {
  return (
    <article
      aria-labelledby={`${group.id}-heading`}
      className="rounded-[1.85rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)] sm:p-7"
      role="listitem"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {group.label}
            </p>
            <div className="space-y-2">
              <h3
                id={`${group.id}-heading`}
                className="text-2xl font-semibold tracking-tight text-slate-950"
              >
                {group.title}
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                {group.summary}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Lead
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{group.lead}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Review window
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                {group.reviewWindow}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Focus areas
          </p>
          <ul
            aria-label={`${group.title} focus areas`}
            className="mt-3 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-3"
          >
            {group.focusAreas.map((focusArea) => (
              <li key={focusArea} className="rounded-2xl border border-slate-200 px-4 py-4">
                {focusArea}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Milestones
          </p>
          <div
            aria-label={`${group.title} milestones`}
            className="mt-4 grid gap-4"
            role="list"
          >
            {group.milestones.map((milestone) => (
              <MilestoneCard key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
