import type { StatusBreakdownItem } from "../_data/checkpoint-grid-data";
import styles from "../checkpoint-grid.module.css";

type StatusBreakdownBarProps = {
  items: StatusBreakdownItem[];
};

const toneClassNames = {
  steady: styles.breakdownSteady,
  watch: styles.breakdownWatch,
  risk: styles.breakdownRisk,
};

export function StatusBreakdownBar({ items }: StatusBreakdownBarProps) {
  return (
    <div className={styles.breakdownContainer}>
      <div className={styles.breakdownTrack} role="img" aria-label="Status breakdown">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${styles.breakdownSegment} ${toneClassNames[item.tone]}`}
            style={{ width: `${item.percentage}%` }}
            title={`${item.status}: ${item.count} (${item.percentage}%)`}
          />
        ))}
      </div>
      <div className={styles.breakdownLegend} role="list" aria-label="Status breakdown legend">
        {items.map((item) => (
          <div key={item.id} className={styles.breakdownLegendItem} role="listitem">
            <span className={`${styles.breakdownDot} ${toneClassNames[item.tone]}`} />
            <span className="text-sm text-slate-700">
              {item.status}
            </span>
            <span className="text-sm font-semibold text-slate-950">
              {item.count}
            </span>
            <span className="text-xs text-slate-500">
              ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
