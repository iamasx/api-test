import type { ArchiveMetadataBadge as ArchiveMetadataBadgeValue } from "../_lib/archive-data";
import styles from "../archive-browser.module.css";

const toneClasses = {
  alert: styles.metadataBadgeAlert,
  muted: styles.metadataBadgeMuted,
  verified: styles.metadataBadgeVerified,
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
      className={`${styles.metadataBadge} ${toneClasses[tone]}`}
    >
      <span className={styles.metadataBadgeLabel}>{badge.label}</span>
      <span>{badge.value}</span>
    </li>
  );
}
