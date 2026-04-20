import { commandLogEvents, type CommandLogEvent } from "./command-log-data";

export type CommandTagSummaryItem = {
  tag: string;
  eventCount: number;
  latestEventLabel: string;
  latestEventTitle: string;
  severities: string[];
  categories: string[];
};

export type CommandLogSummaryMetric = {
  label: string;
  value: string;
  note: string;
};

export type CommandLogView = {
  events: CommandLogEvent[];
  selectedEvent: CommandLogEvent;
  requestedEventId?: string;
  selectionFound: boolean;
  tagSummary: CommandTagSummaryItem[];
  summaryMetrics: CommandLogSummaryMetric[];
};

const numberFormatter = new Intl.NumberFormat("en-US");

function normalizeEventId(eventId?: string) {
  return eventId?.trim().toLowerCase();
}

function sortChronologically(events: CommandLogEvent[]) {
  return [...events].sort(
    (left, right) =>
      new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime(),
  );
}

function buildTagSummary(events: CommandLogEvent[]): CommandTagSummaryItem[] {
  const groups = new Map<
    string,
    {
      tag: string;
      eventCount: number;
      latestEventLabel: string;
      latestEventTitle: string;
      severities: Set<string>;
      categories: Set<string>;
    }
  >();

  for (const event of events) {
    for (const tag of event.tags) {
      const existing = groups.get(tag);

      if (!existing) {
        groups.set(tag, {
          tag,
          eventCount: 1,
          latestEventLabel: event.occurredLabel,
          latestEventTitle: event.title,
          severities: new Set([event.severity]),
          categories: new Set([event.category]),
        });
        continue;
      }

      existing.eventCount += 1;
      existing.severities.add(event.severity);
      existing.categories.add(event.category);
    }
  }

  return [...groups.values()]
    .filter((group) => group.eventCount > 1)
    .sort((left, right) => {
      if (right.eventCount !== left.eventCount) {
        return right.eventCount - left.eventCount;
      }

      return left.tag.localeCompare(right.tag);
    })
    .map((group) => ({
      tag: group.tag,
      eventCount: group.eventCount,
      latestEventLabel: group.latestEventLabel,
      latestEventTitle: group.latestEventTitle,
      severities: [...group.severities],
      categories: [...group.categories],
    }));
}

function buildSummaryMetrics(events: CommandLogEvent[]): CommandLogSummaryMetric[] {
  const teamsEngaged = new Set(events.map((event) => event.team)).size;
  const highAttentionCount = events.filter(
    (event) => event.severity === "Critical" || event.severity === "High",
  ).length;
  const recurringTags = buildTagSummary(events).length;

  return [
    {
      label: "Logged events",
      value: numberFormatter.format(events.length),
      note: "Most recent entries stay selected by default.",
    },
    {
      label: "High-attention items",
      value: numberFormatter.format(highAttentionCount),
      note: "Critical and high-severity actions across the shift.",
    },
    {
      label: "Teams engaged",
      value: numberFormatter.format(teamsEngaged),
      note: "Distinct groups contributing notes or commands.",
    },
    {
      label: "Recurring tags",
      value: numberFormatter.format(recurringTags),
      note: "Cross-event groupings surfaced in the summary band.",
    },
  ];
}

export function readRequestedEventId(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function resolveCommandLogView(eventId?: string): CommandLogView {
  const requestedEventId = normalizeEventId(eventId);
  const events = sortChronologically(commandLogEvents);
  const selectedEvent =
    events.find((event) => event.id === requestedEventId) ?? events[0];

  return {
    events,
    selectedEvent,
    requestedEventId,
    selectionFound: requestedEventId
      ? events.some((event) => event.id === requestedEventId)
      : true,
    tagSummary: buildTagSummary(events),
    summaryMetrics: buildSummaryMetrics(events),
  };
}
