import type { ArchiveVaultMetadataBadge as ArchiveVaultMetadataBadgeValue } from "../_data/archive-vault-data";

const toneClasses = {
  accent: "border-sky-300/35 bg-sky-300/12 text-sky-950",
  caution: "border-amber-300/40 bg-amber-200/35 text-amber-950",
  steady: "border-emerald-300/40 bg-emerald-200/35 text-emerald-950",
};

type ArchiveVaultMetadataBadgeProps = {
  badge: ArchiveVaultMetadataBadgeValue;
};

export function ArchiveVaultMetadataBadge({
  badge,
}: ArchiveVaultMetadataBadgeProps) {
  const tone = badge.tone ?? "accent";

  return (
    <li
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase ${toneClasses[tone]}`}
    >
      <span className="opacity-70">{badge.label}</span>
      <span>{badge.value}</span>
    </li>
  );
}
