import type {
  RouteConstraint,
  RouteSegmentGroup,
} from "../_data/route-planner-data";
import { SegmentCard } from "./segment-card";

type SegmentGroupProps = {
  group: RouteSegmentGroup;
  constraints: RouteConstraint[];
};

export function SegmentGroup({ group, constraints }: SegmentGroupProps) {
  return (
    <section aria-labelledby={group.id} className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Segment group
          </p>
          <h2
            id={group.id}
            className="text-3xl font-semibold tracking-tight text-white"
          >
            {group.label}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          {group.description}
        </p>
      </div>

      <div aria-label={group.label} className="grid gap-4" role="list">
        {group.segments.map((segment) => (
          <SegmentCard
            key={segment.id}
            segment={segment}
            constraints={constraints.filter((constraint) =>
              segment.constraints.includes(constraint.id),
            )}
          />
        ))}
      </div>
    </section>
  );
}
