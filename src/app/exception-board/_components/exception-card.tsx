import type { ExceptionCase, ResolutionHint } from "../_data/exception-board-data";
import styles from "../exception-board.module.css";

const statusLabel: Record<string, string> = {
  urgent: "Urgent",
  pending: "Pending",
  resolved: "Resolved",
};

interface ExceptionCardProps {
  exception: ExceptionCase;
  hint: ResolutionHint | undefined;
}

export function ExceptionCard({ exception, hint }: ExceptionCardProps) {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <article
      className={`${styles.exceptionCard} ${styles[`cardStatus${capitalize(exception.status)}`]}`}
      role="listitem"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`${styles.badge} ${styles[`badgeStatus${capitalize(exception.status)}`]}`}
        >
          {statusLabel[exception.status]}
        </span>
        <span className="text-xs text-slate-400">
          {exception.owner.name} &middot; {exception.owner.role}
        </span>
      </div>

      <h3 className="mt-3 text-base font-semibold text-slate-900">
        {exception.title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        {exception.description}
      </p>

      {hint && (
        <div className={styles.hintBox}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Resolution hint
          </p>
          <p className="mt-1 text-sm font-medium text-slate-800">
            {hint.label}
          </p>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            {hint.description}
          </p>
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {exception.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
