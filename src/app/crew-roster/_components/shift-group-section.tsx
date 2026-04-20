import type { CrewRosterView } from "../_data/crew-roster-data";
import { CrewTeamCard } from "./crew-team-card";

type ShiftGroupSectionProps = {
  shiftGroup: CrewRosterView["shiftGroups"][number];
};

export function ShiftGroupSection({ shiftGroup }: ShiftGroupSectionProps) {
  return (
    <section
      aria-labelledby={`${shiftGroup.id}-title`}
      className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] sm:p-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
              {shiftGroup.name}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {shiftGroup.window}
            </span>
          </div>

          <div>
            <h2
              id={`${shiftGroup.id}-title`}
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              {shiftGroup.name} coverage
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              {shiftGroup.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[22rem]">
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Shift staffing
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              {shiftGroup.totals.staffed}/{shiftGroup.totals.target}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {shiftGroup.totals.coveragePercent}% staffed
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Handoff lead
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
              {shiftGroup.handoffLead}
            </p>
            <p className="mt-1 text-sm text-slate-600">{shiftGroup.coverage}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {shiftGroup.teams.map((team) => (
          <CrewTeamCard key={team.id} team={team} />
        ))}
      </div>
    </section>
  );
}
