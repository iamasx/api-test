import type { ArchiveVaultMetadataBadge as ArchiveVaultMetadataBadgeValue } from "../_data/archive-vault-data";
import styles from "../archive-vault.module.css";

const toneClasses = {
  accent: styles.metadataAccent,
  caution: styles.metadataCaution,
  steady: styles.metadataSteady,
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
      className={`${styles.metadataBadge} ${toneClasses[tone]}`}
    >
      <span className={styles.metadataBadgeLabel}>{badge.label}</span>
      <span>{badge.value}</span>
    </li>
  );
}
