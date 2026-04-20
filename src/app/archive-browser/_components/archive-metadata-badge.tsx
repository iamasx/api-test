import type { ArchiveMetadataBadge } from "../_lib/archive-data";

const toneClasses = {
  attention: "border-amber-200 bg-amber-50 text-amber-900",
  calm: "border-cyan-200 bg-cyan-50 text-cyan-900",
  neutral: "border-slate-200 bg-white/80 text-slate-700",
};

type ArchiveMetadataBadgeProps = {
  badge: ArchiveMetadataBadge;
};

export function ArchiveMetadataBadge({
  badge,
}: ArchiveMetadataBadgeProps) {
  const tone = badge.tone ?? "neutral";

  return (
    <li
      className={`rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide ${toneClasses[tone]}`}
    >
      <span className="text-[11px] uppercase text-slate-500">{badge.label}</span>{" "}
      <span>{badge.value}</span>
    </li>
  );
}
