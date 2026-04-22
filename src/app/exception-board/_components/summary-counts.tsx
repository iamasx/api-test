import type { ExceptionStatus } from "../_data/exception-board-data";
import styles from "../exception-board.module.css";

interface SummaryCountsProps {
  counts: { label: string; value: number; status: ExceptionStatus }[];
}

export function SummaryCounts({ counts }: SummaryCountsProps) {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div aria-label="Summary counts" className={styles.summaryGrid} role="list">
      {counts.map((count) => (
        <div
          key={count.status}
          className={`${styles.summaryCard} ${styles[`summaryStatus${capitalize(count.status)}`]}`}
          role="listitem"
        >
          <p className="text-3xl font-semibold tracking-tight">{count.value}</p>
          <p className="mt-1 text-sm font-medium">{count.label}</p>
        </div>
      ))}
    </div>
  );
}
