import type {
  RehearsalStatus,
  SavedPlaybook,
} from "@/components/field-guide/field-guide-data";

type PlaybookCardProps = {
  isSelected: boolean;
  onSelect: (playbookId: string) => void;
  playbook: SavedPlaybook;
  sourceTitle: string;
};

const statusClasses = {
  Draft: "bg-slate-200 text-slate-700",
  "In Review": "bg-amber-100 text-amber-800",
  Published: "bg-emerald-100 text-emerald-800",
} as const;

const rehearsalClasses: Record<RehearsalStatus, string> = {
  "Needs Revision": "bg-rose-100 text-rose-800",
  "Ready to Rehearse": "bg-sky-100 text-sky-900",
  Scheduled: "bg-violet-100 text-violet-900",
};

export default function PlaybookCard({
  isSelected,
  onSelect,
  playbook,
  sourceTitle,
}: PlaybookCardProps) {
  return (
    <button
      aria-label={`Review playbook: ${playbook.title}`}
      className={`w-full rounded-[1.75rem] border p-5 text-left shadow-lg transition ${
        isSelected
          ? "border-amber-300 bg-amber-50 shadow-amber-100"
          : "border-slate-200/70 bg-white/90 shadow-slate-200/40 hover:-translate-y-0.5 hover:border-slate-300"
      }`}
      onClick={() => onSelect(playbook.id)}
      type="button"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-50">
          {playbook.team}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[playbook.status]}`}
        >
          {playbook.status}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${rehearsalClasses[playbook.rehearsalStatus]}`}
        >
          {playbook.rehearsalStatus}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {playbook.authoringMode}
        </span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
        {playbook.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{playbook.summary}</p>
      <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Source
          </dt>
          <dd className="mt-2 font-medium text-slate-900">{sourceTitle}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Focus
          </dt>
          <dd className="mt-2 font-medium text-slate-900">
            {playbook.rehearsalFocus}
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {playbook.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span>{playbook.metadata.version}</span>
        <span>{playbook.steps.length} rehearsal steps</span>
      </div>
    </button>
  );
}
