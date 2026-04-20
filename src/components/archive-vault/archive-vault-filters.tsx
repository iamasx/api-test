import type { ArchiveStatus } from "@/app/archive-vault/archive-vault-data";
import styles from "./archive-vault.module.css";

type ArchiveVaultFiltersProps = {
  query: string;
  statuses: readonly ArchiveStatus[];
  activeStatuses: ArchiveStatus[];
  tags: readonly string[];
  activeTag: string;
  resultCount: number;
  totalCount: number;
  hasFilters: boolean;
  onQueryChange: (value: string) => void;
  onToggleStatus: (status: ArchiveStatus) => void;
  onTagChange: (tag: string) => void;
  onReset: () => void;
};

export function ArchiveVaultFilters({
  query,
  statuses,
  activeStatuses,
  tags,
  activeTag,
  resultCount,
  totalCount,
  hasFilters,
  onQueryChange,
  onToggleStatus,
  onTagChange,
  onReset,
}: ArchiveVaultFiltersProps) {
  return (
    <section className={styles.filters}>
      <div className={styles.searchRow}>
        <label className={styles.searchField}>
          <span>Search snapshots</span>
          <input
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search label, owner, region, or tag"
            type="search"
            value={query}
          />
        </label>
        <div className={styles.filterMeta}>
          <strong>
            {resultCount} / {totalCount}
          </strong>
          <span>client-side matches</span>
          {hasFilters ? (
            <button className={styles.ghostButton} onClick={onReset} type="button">
              Reset
            </button>
          ) : null}
        </div>
      </div>

      <div className={styles.chipRow}>
        {statuses.map((status) => (
          <button
            aria-pressed={activeStatuses.includes(status)}
            className={
              activeStatuses.includes(status)
                ? `${styles.chip} ${styles.chipActive}`
                : styles.chip
            }
            key={status}
            onClick={() => onToggleStatus(status)}
            type="button"
          >
            {status}
          </button>
        ))}
      </div>

      <div className={styles.chipRow}>
        <button
          aria-pressed={activeTag === "all"}
          className={activeTag === "all" ? `${styles.chip} ${styles.chipActive}` : styles.chip}
          onClick={() => onTagChange("all")}
          type="button"
        >
          all tags
        </button>
        {tags.map((tag) => (
          <button
            aria-pressed={activeTag === tag}
            className={activeTag === tag ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            key={tag}
            onClick={() => onTagChange(tag)}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
