import type {
  IncidentSeverityFilter,
  SeverityLevel,
} from "@/app/incident-deck/mock-data";

type SeverityCount = SeverityLevel & { count: number };

type IncidentDeckHeaderProps = {
  totalCount: number;
  visibleCount: number;
  selectedSeverity: IncidentSeverityFilter;
  severitySummary: SeverityCount[];
};

export function IncidentDeckHeader({
  totalCount,
  visibleCount,
  selectedSeverity,
  severitySummary,
}: IncidentDeckHeaderProps) {
  const selectedLabel =
    selectedSeverity === "all"
      ? "All severities"
      : severitySummary.find((severity) => severity.id === selectedSeverity)
          ?.label ?? "Filtered";

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className="grid gap-6 px-6 py-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:px-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-300">
            Incident Deck
          </p>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Mock incident workspace for active stacks, response pacing, and
              operator handoffs.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Everything on this route is feature-local: incidents, severity
              filters, responder focus, and the response timeline all stay
              inside the client session.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {severitySummary.map((severity) => (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ring-1 ${severity.surfaceClass}`}
                key={severity.id}
              >
                {severity.count} {severity.label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm text-slate-400">Active incidents</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {totalCount}
            </p>
          </div>
          <div className="rounded-3xl border border-sky-400/20 bg-sky-400/10 px-5 py-4">
            <p className="text-sm text-sky-200">Visible in deck</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {visibleCount}
            </p>
          </div>
          <div className="rounded-3xl border border-orange-300/20 bg-orange-400/10 px-5 py-4">
            <p className="text-sm text-orange-100">Current filter</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {selectedLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
