import type { DependencyHighlight as DependencyHighlightItem } from "../_data/service-map-data";
import styles from "../service-map.module.css";

type DependencyHighlightProps = {
  highlight: DependencyHighlightItem;
};

const highlightToneClasses = {
  stable: "border-emerald-300/40 bg-emerald-50 text-emerald-950",
  watch: "border-sky-300/50 bg-sky-50 text-sky-950",
  elevated: "border-amber-300/60 bg-amber-50 text-amber-950",
  severe: "border-rose-300/60 bg-rose-50 text-rose-950",
};

export function DependencyHighlight({ highlight }: DependencyHighlightProps) {
  return (
    <article
      data-risk={highlight.status}
      className={`${styles.highlightCard} rounded-[1.6rem] border px-5 py-5 shadow-[0_18px_60px_-44px_rgba(15,23,42,0.5)] ${highlightToneClasses[highlight.status]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-current/65">
            {highlight.dependencyType}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            {highlight.dependencyName}
          </h3>
        </div>
        <span className="rounded-full border border-current/15 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
          {highlight.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-current/80">{highlight.signal}</p>

      <dl className="mt-5 grid gap-3">
        <div className="rounded-2xl border border-current/10 bg-white/60 px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/60">
            Impact
          </dt>
          <dd className="mt-2 text-sm leading-6">{highlight.impact}</dd>
        </div>
        <div className="rounded-2xl border border-current/10 bg-white/60 px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-current/60">
            Next action
          </dt>
          <dd className="mt-2 text-sm leading-6">{highlight.nextAction}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {highlight.affectedServices.map((serviceName) => (
          <span
            key={serviceName}
            className="rounded-full border border-current/12 bg-white/70 px-3 py-1 text-xs font-medium"
          >
            {serviceName}
          </span>
        ))}
      </div>
    </article>
  );
}
