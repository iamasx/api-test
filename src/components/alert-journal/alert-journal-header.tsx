import type { AlertJournalDay } from "@/app/alert-journal/alert-journal-data";

type AlertJournalHeaderProps = { days: AlertJournalDay[]; monitoringCount: number; openCount: number; resolvedCount: number; selectedDay: AlertJournalDay | null; selectedDayId: string | null; selectedDayVisibleCount: number; totalAlerts: number; onSelectDay: (dayId: string) => void; };

export function AlertJournalHeader({ days, monitoringCount, openCount, resolvedCount, selectedDay, selectedDayId, selectedDayVisibleCount, totalAlerts, onSelectDay }: AlertJournalHeaderProps) {
  const stats = [{ label: "Total alerts", value: totalAlerts }, { label: "Open", value: openCount }, { label: "Monitoring", value: monitoringCount }, { label: "Resolved", value: resolvedCount }];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Alert Journal</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Daily alert groups, severity trims, and local resolution markers for a mock watch desk.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              This route is fully isolated. Filters, expanded groups, selected alerts, and resolution markers stay in local client state.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {stats.map((stat) => <StatCard key={stat.label} label={stat.label} value={stat.value} />)}
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Selected day</p>
          {selectedDay ? (
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedDay.dateLabel}</h2>
                  <p className="text-sm text-slate-400">{selectedDay.handoffWindow}</p>
                </div>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  {selectedDayVisibleCount} visible
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-300">{selectedDay.note}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-300">Select a day chip to pin its handoff summary while keeping the full journal open below.</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {days.map((day) => {
              const isActive = selectedDayId === day.id;
              return (
                <button
                  key={day.id}
                  className={`rounded-full border px-3 py-2 text-sm transition ${
                    isActive
                      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-50"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                  }`}
                  type="button"
                  onClick={() => onSelectDay(day.id)}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
