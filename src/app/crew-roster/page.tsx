import type { Metadata } from "next";
import Link from "next/link";
import { CrewRosterView, getCrewRosterView } from "./_data/crew-roster-data";
import { DutyRotationPanel } from "./_components/duty-rotation-panel";
import { ShiftGroupSection } from "./_components/shift-group-section";
import { StaffingSummaryCard } from "./_components/staffing-summary-card";

export const metadata: Metadata = {
  title: "Crew Roster",
  description:
    "Crew roster route with grouped shifts, staffing summaries, and a highlighted duty rotation panel.",
};

function HeroStats({ view }: { view: CrewRosterView }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Staffed seats
        </p>
        <p className="mt-3 text-4xl font-semibold tracking-tight">
          {view.totals.staffed}/{view.totals.target}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/72">
          {view.totals.coveragePercent}% of planned coverage is filled across the
          full roster.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Shift groups
        </p>
        <p className="mt-3 text-4xl font-semibold tracking-tight">
          {view.totals.shiftCount}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/72">
          {view.totals.teamCount} active teams are distributed across day, swing,
          and overnight coverage.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Open roles
        </p>
        <p className="mt-3 text-4xl font-semibold tracking-tight">
          {view.totals.gap}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/72">
          Current gaps stay visible before the next handoff window starts.
        </p>
      </div>
    </div>
  );
}

export default function CrewRosterPage() {
  const view = getCrewRosterView();

  return (
    <main className="mx-auto flex w-full max-w-[96rem] flex-1 flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="overflow-hidden rounded-[2.3rem] border border-slate-200 bg-slate-950 text-white shadow-[0_36px_120px_rgba(15,23,42,0.2)]">
        <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] lg:px-10 lg:py-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-[#f7b267] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950">
                {view.summary.eyebrow}
              </p>
              <p className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Grouped shift coverage
              </p>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {view.summary.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {view.summary.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Back to overview
              </Link>
              <a
                href="#crew-shifts"
                className="inline-flex items-center justify-center rounded-full border border-white/16 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                Browse shift groups
              </a>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Handoff window
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight">
                {view.summary.handoffWindow}
              </p>
            </div>
          </div>

          <HeroStats view={view} />
        </div>
      </section>

      <section aria-labelledby="staffing-summary" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Staffing summary
            </p>
            <h2
              id="staffing-summary"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Coverage totals and watchpoints
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Staffing totals are derived from route-local role slots so each
            summary card stays aligned with the grouped team coverage below.
          </p>
        </div>

        <div
          aria-label="Crew roster staffing summaries"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          role="list"
        >
          {view.staffingSummaries.map((summary) => (
            <StaffingSummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      </section>

      <section id="crew-shifts" aria-labelledby="crew-shifts-title" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Teams by shift
            </p>
            <h2
              id="crew-shifts-title"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Grouped teams with staffing detail
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Every shift section keeps its coverage window, handoff lead, and team
            role slots in view so staffing gaps stand out before transitions.
          </p>
        </div>

        <div className="space-y-6">
          {view.shiftGroups.map((shiftGroup) => (
            <ShiftGroupSection key={shiftGroup.id} shiftGroup={shiftGroup} />
          ))}
        </div>
      </section>

      <DutyRotationPanel entries={view.dutyRotation} />
    </main>
  );
}
