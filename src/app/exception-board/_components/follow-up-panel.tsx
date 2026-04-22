import type { FollowUpItem } from "../_data/exception-board-data";
import styles from "../exception-board.module.css";

interface FollowUpPanelProps {
  followUps: FollowUpItem[];
}

export function FollowUpPanel({ followUps }: FollowUpPanelProps) {
  return (
    <aside
      aria-label="Follow-up actions"
      className={`${styles.followUpPanel} rounded-[1.75rem] p-5 sm:p-6`}
    >
      <div className="space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-100/72">
          Follow-up actions
        </p>
        <p className="text-2xl font-semibold tracking-tight text-white">
          {followUps.length} actions pending
        </p>

        <div className="grid gap-3">
          {followUps.map((item) => (
            <div key={item.id} className={styles.followUpCard}>
              <p className="text-sm font-medium text-white">{item.action}</p>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/60">
                <span>{item.assignee}</span>
                <span>Due {item.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
