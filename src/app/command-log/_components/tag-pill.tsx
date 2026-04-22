import type { EventTag } from "../_data/command-log-data";

type TagPillProps = {
  tag: EventTag;
};

const colorMap: Record<EventTag["color"], string> = {
  slate: "bg-slate-100 text-slate-700",
  amber: "bg-amber-100 text-amber-800",
  rose: "bg-rose-100 text-rose-800",
  emerald: "bg-emerald-100 text-emerald-800",
  cyan: "bg-cyan-100 text-cyan-800",
  violet: "bg-violet-100 text-violet-800",
};

export function TagPill({ tag }: TagPillProps) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorMap[tag.color]}`}>
      {tag.label}
    </span>
  );
}
