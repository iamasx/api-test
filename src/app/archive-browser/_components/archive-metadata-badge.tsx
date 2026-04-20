import type { ArchiveMetadataBadge as ArchiveMetadataBadgeValue } from "../_lib/archive-data";

const toneClasses = {
  alert: "border-amber-200 bg-amber-50 text-amber-900",
  muted: "border-slate-200 bg-slate-100 text-slate-700",
  verified: "border-emerald-200 bg-emerald-50 text-emerald-900",
};

type ArchiveMetadataBadgeProps = {
  badge: ArchiveMetadataBadgeValue;
};

export function ArchiveMetadataBadge({
  badge,
}: ArchiveMetadataBadgeProps) {
  const tone = badge.tone ?? "muted";

  return (
    <li
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide ${toneClasses[tone]}`}
    >
      <span className="uppercase opacity-70">{badge.label}</span>
      <span>{badge.value}</span>
    </li>
  );
}
