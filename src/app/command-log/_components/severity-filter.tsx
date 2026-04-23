import type { CommandEventSeverity } from "../_lib/command-log-data";

const severityColors: Record<CommandEventSeverity, { bg: string; text: string; border: string; activeBg: string }> = {
  Critical: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    activeBg: "bg-rose-100",
  },
  High: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    activeBg: "bg-amber-100",
  },
  Moderate: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    activeBg: "bg-sky-100",
  },
  Low: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-200",
    activeBg: "bg-slate-100",
  },
};

type SeverityFilterProps = {
  counts: Record<CommandEventSeverity, number>;
  activeSeverity: CommandEventSeverity | null;
};

export function SeverityFilter({ counts, activeSeverity }: SeverityFilterProps) {
  const severities: CommandEventSeverity[] = ["Critical", "High", "Moderate", "Low"];

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by severity">
      {severities.map((severity) => {
        const colors = severityColors[severity];
        const isActive = activeSeverity === severity;
        const count = counts[severity] ?? 0;

        return (
          <a
            key={severity}
            href={isActive ? "?" : `?severity=${severity.toLowerCase()}`}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? `${colors.activeBg} ${colors.border} ${colors.text} ring-2 ring-offset-1`
                : `${colors.bg} ${colors.border} ${colors.text} hover:${colors.activeBg}`
            }`}
            aria-pressed={isActive}
          >
            <span>{severity}</span>
            <span
              className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                isActive ? "bg-white/80" : colors.bg
              }`}
            >
              {count}
            </span>
          </a>
        );
      })}
    </div>
  );
}
