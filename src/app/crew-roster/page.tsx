import type { Metadata } from "next";
import Link from "next/link";

const deliveryMilestones = [
  "Grouped shift sections for day, swing, and overnight teams",
  "Staffing summaries that call out roster coverage and open roles",
  "Duty rotation spotlight for the next handoff window",
];

export const metadata: Metadata = {
  title: "Crew Roster",
  description:
    "Initial crew roster route shell for grouped teams, staffing summaries, and duty rotation coverage.",
};

export default function CrewRosterPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_46%,#eff6ff_100%)] shadow-[0_24px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-800">
                Crew Roster
              </p>
              <p className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]">
                Initial route shell
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Stage grouped crew coverage, staffing summaries, and the next duty rotation.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                This first pass establishes the dedicated route shell for the
                upcoming crew roster experience. The next subtasks will fill it
                with route-specific mock data, grouped team cards, and a richer
                staffing presentation.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Back to overview
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/120"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Planned milestones
            </p>
            <ul className="mt-5 space-y-4">
              {deliveryMilestones.map((milestone) => (
                <li
                  key={milestone}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {milestone}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-8 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Coming next
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          Shift groups, staffing panels, and rotation details land in the next commits.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          This placeholder section keeps the route structure in place while the
          mock crew data model and presentation components are added
          incrementally.
        </p>
      </section>
    </main>
  );
}
