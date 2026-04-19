import type { PlannerDay } from "@/app/shift-planner/shift-planner-data";

type ShiftPlannerHeaderProps = {
  days: PlannerDay[];
  gapCount: number;
  onSelectDay: (dayId: string) => void;
  readyCount: number;
  readyNotes: number;
  selectedDayId: string;
  staffing: PlannerDay["staffing"];
  totalNotes: number;
  watchCount: number;
};

function SummaryCard({
  detail,
  label,
  value,
}: {
  detail: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.26em] text-sky-200/70">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-300">{detail}</p>
    </div>
  );
}

export function ShiftPlannerHeader({
  days,
  gapCount,
  onSelectDay,
  readyCount,
  readyNotes,
  selectedDayId,
  staffing,
  totalNotes,
  watchCount,
}: ShiftPlannerHeaderProps) {
  const openSeats = Math.max(staffing.target - staffing.scheduled, 0);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-5 shadow-[0_24px_70px_rgba(2,8,23,0.4)] backdrop-blur sm:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-sky-300">Shift Planner</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Coverage matrix with local hand-off control.
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
            Review role coverage by shift, keep staffing gaps visible, and leave
            route-local notes for the next team without touching shared app state.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:w-[29rem] xl:grid-cols-4">
          <SummaryCard detail={openSeats ? `${openSeats} open seats` : "Target met"} label="Staffing" value={`${staffing.scheduled}/${staffing.target}`} />
          <SummaryCard detail={`${watchCount} watch blocks`} label="Coverage" value={`${readyCount} ready`} />
          <SummaryCard detail={`${gapCount} unresolved blocks`} label="Risk" value={gapCount ? "Gaps open" : "Stable"} />
          <SummaryCard detail="Saved only in this route" label="Notes" value={`${readyNotes}/${totalNotes}`} />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {days.map((day) => {
          const isActive = day.id === selectedDayId;

          return (
            <button
              className={`rounded-[1.4rem] border px-4 py-3 text-left transition ${
                isActive
                  ? "border-sky-300/80 bg-sky-400/15 text-white shadow-[0_16px_36px_rgba(14,165,233,0.18)]"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-sky-300/40 hover:bg-white/10"
              }`}
              key={day.id}
              onClick={() => onSelectDay(day.id)}
              type="button"
            >
              <p className="text-sm font-semibold">{day.label}</p>
              <p className="mt-1 text-sm text-slate-300">{day.dateLabel}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-sky-200/70">{day.focus}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
