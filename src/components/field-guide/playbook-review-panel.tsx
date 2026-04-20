import type {
  RehearsalStatus,
  SavedPlaybook,
} from "@/components/field-guide/field-guide-data";
import type { Procedure } from "@/components/field-guide/field-guide-data";
import RehearsalPreview from "@/components/field-guide/rehearsal-preview";

type PlaybookReviewPanelProps = {
  description?: string;
  heading?: string;
  playbook: SavedPlaybook | null;
  sourceProcedure: Procedure | null;
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

export default function PlaybookReviewPanel({
  description = "Review draft metadata, source context, and the authored rehearsal flow in one panel.",
  heading = "Playbook review",
  playbook,
  sourceProcedure,
}: PlaybookReviewPanelProps) {
  if (!playbook) {
    return (
      <aside className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-lg shadow-slate-200/40">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Playbook review
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Select or author a playbook to review the draft metadata.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Saved playbooks stay local to this route, so the review panel updates
          as soon as you save or publish the current draft.
        </p>
      </aside>
    );
  }

  return (
    <aside className="space-y-6 rounded-[1.75rem] border border-slate-200/70 bg-white/95 p-6 shadow-lg shadow-slate-200/40">
      <section>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
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
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                {heading}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                {playbook.title}
              </h2>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Version
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950">
              {playbook.metadata.version}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">{playbook.summary}</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Source procedure
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {sourceProcedure?.title ?? "Custom flow"}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {sourceProcedure?.summary ??
              "The playbook was authored without a single source procedure."}
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Rehearsal focus
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {playbook.rehearsalFocus}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Audience: {playbook.audience}
          </p>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Draft metadata
        </p>
        <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Owner
            </p>
            <p className="mt-2 font-medium text-slate-950">
              {playbook.metadata.owner}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Last saved
            </p>
            <p className="mt-2 font-medium text-slate-950">
              {playbook.metadata.lastSaved}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Review window
            </p>
            <p className="mt-2">{playbook.metadata.reviewWindow}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Rehearsal window
            </p>
            <p className="mt-2">{playbook.metadata.rehearsalWindow}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Reviewers
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {playbook.metadata.reviewers.map((reviewer) => (
                <span
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700"
                  key={reviewer}
                >
                  {reviewer}
                </span>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Change summary
            </p>
            <p className="mt-2 leading-6">{playbook.metadata.changeSummary}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Review checkpoints
        </p>
        <ol className="mt-4 space-y-3">
          {playbook.checkpoints.map((checkpoint, index) => (
            <li
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600"
              key={checkpoint}
            >
              <span className="font-semibold text-slate-950">{index + 1}.</span>{" "}
              {checkpoint}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Notes and kit
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{playbook.notes}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {playbook.tools.map((tool) => (
            <span
              className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900"
              key={tool}
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      <RehearsalPreview playbook={playbook} />
    </aside>
  );
}
