import type { CommandEventSeverity, CommandLogEvent } from "./command-log-data";

const validSeverities = new Set<string>(["critical", "high", "moderate", "low"]);

export function parseSeverityParam(
  value: string | string[] | undefined,
): CommandEventSeverity | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;

  const normalized = raw.trim().toLowerCase();
  if (!validSeverities.has(normalized)) return null;

  // Capitalize first letter to match the type
  return (normalized.charAt(0).toUpperCase() + normalized.slice(1)) as CommandEventSeverity;
}

export function filterBySeverity(
  events: CommandLogEvent[],
  severity: CommandEventSeverity | null,
): CommandLogEvent[] {
  if (!severity) return events;
  return events.filter((event) => event.severity === severity);
}

export function countBySeverity(
  events: CommandLogEvent[],
): Record<CommandEventSeverity, number> {
  const counts: Record<CommandEventSeverity, number> = {
    Critical: 0,
    High: 0,
    Moderate: 0,
    Low: 0,
  };

  for (const event of events) {
    counts[event.severity] += 1;
  }

  return counts;
}

export function formatFilterLabel(
  severity: CommandEventSeverity | null,
  count: number,
): string {
  if (!severity) return `All events (${count})`;
  return `${count} ${severity.toLowerCase()} event${count === 1 ? "" : "s"}`;
}
