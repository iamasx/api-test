import type { ReviewItem } from "../_data/review-console-data";

type ReviewItemCardProps = {
  item: ReviewItem;
};

const toneClassNames = {
  steady: "border-l-teal-700 bg-teal-50/70",
  watch: "border-l-amber-600 bg-amber-50/70",
  risk: "border-l-rose-700 bg-rose-50/70",
};

export function ReviewItemCard({ item }: ReviewItemCardProps) {
  return (
    <article
      className={`rounded-[1.6rem] border border-slate-200/80 border-l-4 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.06)] ${toneClassNames[item.tone]}`}
      role="listitem"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {item.lane}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
            {item.title}
          </h3>
        </div>
        <span className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-slate-700">
          {item.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>

      <dl className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-[1.1rem] border border-slate-200 bg-white/80 p-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Reviewer
          </dt>
          <dd className="mt-2">{item.reviewer}</dd>
        </div>
        <div className="rounded-[1.1rem] border border-slate-200 bg-white/80 p-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Owner
          </dt>
          <dd className="mt-2">{item.owner}</dd>
        </div>
        <div className="rounded-[1.1rem] border border-slate-200 bg-white/80 p-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Updated
          </dt>
          <dd className="mt-2">{item.updatedAt}</dd>
        </div>
        <div className="rounded-[1.1rem] border border-slate-200 bg-white/80 p-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Window
          </dt>
          <dd className="mt-2">{item.dueWindow}</dd>
        </div>
      </dl>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${item.title} tags`}>
        {item.tags.map((tag) => (
          <li
            key={tag}
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[0.72rem] font-bold text-slate-600"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-[1.2rem] border border-slate-200 bg-white/70 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Next action
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">{item.nextStep}</p>
      </div>
    </article>
  );
}
