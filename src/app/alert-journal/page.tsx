import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alert Journal",
  description:
    "Initial alert journal route shell for daily alert groups, tag summaries, and resolution detail.",
};

export default function AlertJournalPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[var(--surface)] shadow-[0_24px_100px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:px-12 lg:py-10">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Alert Journal
            </p>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Review alert groups by day, scan tag patterns, and keep one
                resolution detail in view.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                This route shell is staged first so the remaining mock data,
                grouped alert entries, and focused resolution summary can land
                incrementally on the same branch.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to route index
              </Link>
              <a
                href="#journal-layout"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Jump to shell
              </a>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Planned sections
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
              <li className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4">
                Daily alert groups with multiple entries per shift.
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4">
                Tag rollups that summarize repeated patterns across alerts.
              </li>
              <li className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4">
                A focused resolution detail panel for the selected alert.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section
        id="journal-layout"
        className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]"
      >
        <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_16px_60px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Daily groups
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Alert history will land here next
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Upcoming subtasks will add grouped alert entries, severity markers,
            operational tags, and resolution metadata sourced from route-local
            mock data.
          </p>
        </section>

        <section className="grid gap-6">
          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_16px_60px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Tag summary
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Repeated alert themes will be summarized here.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_16px_60px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Resolution detail
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The selected alert resolution, owner, and next steps will appear
              in this panel.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
