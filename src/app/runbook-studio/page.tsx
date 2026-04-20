import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Runbook Studio",
  description:
    "Initial route shell for staging runbook procedures, execution previews, and revision tracking.",
};

export default function RunbookStudioPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6efe2_0%,#efe6d7_52%,#e2d8ca_100%)] px-6 py-12 text-slate-950 sm:px-10 lg:px-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="overflow-hidden rounded-[2rem] border border-slate-300/70 bg-[rgba(255,251,245,0.9)] p-8 shadow-[0_24px_90px_rgba(15,23,42,0.12)] sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800">
                Runbook Studio
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Stage runbooks, inspect execution previews, and keep revision
                detail close to the current procedure set.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                This route shell is in place for issue 149 and will be expanded
                in follow-up commits with mock runbooks, revision summaries, and
                execution-preview sections.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              Back to route index
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <article className="rounded-[1.75rem] border border-slate-300/70 bg-white/85 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Procedure groups
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              Grouped runbook cards will land here next
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              The finished route will present multiple runbook clusters with
              revision markers, execution metadata, and procedure-level
              summaries.
            </p>
          </article>

          <aside className="rounded-[1.75rem] border border-slate-300/70 bg-slate-950 p-6 text-slate-50 shadow-[0_18px_70px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Revision summary
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Summary panel scaffolded
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Upcoming commits will add revision counts, approval state, and a
              focused summary of the latest edits across the runbook set.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
