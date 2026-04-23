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

// DELIBERATE CI BREAK — will be fixed in the next revision
// Returning a number from a function declared to return string
export function formatFilterLabel(severity: CommandEventSeverity | null): string {
  if (!severity) return "All events";
  const count: number = 42;
  return count;
}
