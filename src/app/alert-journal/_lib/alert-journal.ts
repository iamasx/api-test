import {
  alertJournalDays,
  alertJournalEntries,
  type AlertJournalDay,
  type AlertJournalEntry,
} from "./alert-journal-data";

export type AlertJournalTagSummaryItem = {
  tag: string;
  alertCount: number;
  latestAlertTitle: string;
  latestAlertLabel: string;
  services: string[];
  severities: string[];
  statuses: string[];
};

export type AlertJournalSummaryMetric = {
  label: string;
  value: string;
  note: string;
};

export type AlertJournalDayGroup = {
  day: AlertJournalDay;
  alerts: AlertJournalEntry[];
};

export type AlertJournalView = {
  alerts: AlertJournalEntry[];
  dayGroups: AlertJournalDayGroup[];
  selectedAlert: AlertJournalEntry;
  requestedAlertId?: string;
  selectionFound: boolean;
  summaryMetrics: AlertJournalSummaryMetric[];
  tagSummary: AlertJournalTagSummaryItem[];
};

const numberFormatter = new Intl.NumberFormat("en-US");

function normalizeAlertId(alertId?: string) {
  return alertId?.trim().toLowerCase();
}

function sortChronologically(alerts: AlertJournalEntry[]) {
  return [...alerts].sort(
    (left, right) =>
      new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime(),
  );
}

function buildDayGroups(alerts: AlertJournalEntry[]): AlertJournalDayGroup[] {
  return alertJournalDays
    .map((day) => ({
      day,
      alerts: alerts.filter((alert) => alert.dayId === day.id),
    }))
    .filter((group) => group.alerts.length > 0);
}

function buildTagSummary(alerts: AlertJournalEntry[]): AlertJournalTagSummaryItem[] {
  const groups = new Map<
    string,
    {
      tag: string;
      alertCount: number;
      latestAlertTitle: string;
      latestAlertLabel: string;
      services: Set<string>;
      severities: Set<string>;
      statuses: Set<string>;
    }
  >();

  for (const alert of alerts) {
    for (const tag of alert.tags) {
      const existing = groups.get(tag);

      if (!existing) {
        groups.set(tag, {
          tag,
          alertCount: 1,
          latestAlertTitle: alert.title,
          latestAlertLabel: alert.occurredLabel,
          services: new Set([alert.service]),
          severities: new Set([alert.severity]),
          statuses: new Set([alert.resolution.status]),
        });
        continue;
      }

      existing.alertCount += 1;
      existing.services.add(alert.service);
      existing.severities.add(alert.severity);
      existing.statuses.add(alert.resolution.status);
    }
  }

  return [...groups.values()]
    .filter((group) => group.alertCount > 1)
    .sort((left, right) => {
      if (right.alertCount !== left.alertCount) {
        return right.alertCount - left.alertCount;
      }

      return left.tag.localeCompare(right.tag);
    })
    .map((group) => ({
      tag: group.tag,
      alertCount: group.alertCount,
      latestAlertTitle: group.latestAlertTitle,
      latestAlertLabel: group.latestAlertLabel,
      services: [...group.services],
      severities: [...group.severities],
      statuses: [...group.statuses],
    }));
}

function buildSummaryMetrics(alerts: AlertJournalEntry[]) {
  const activeAlerts = alerts.filter(
    (alert) => alert.resolution.status !== "Resolved",
  ).length;
  const distinctServices = new Set(alerts.map((alert) => alert.service)).size;
  const recurringTags = buildTagSummary(alerts).length;

  return [
    {
      label: "Logged alerts",
      value: numberFormatter.format(alerts.length),
      note: "Multiple alert days stay visible in one journal stream.",
    },
    {
      label: "Still active",
      value: numberFormatter.format(activeAlerts),
      note: "Alerts still monitoring, mitigating, or waiting on follow-up.",
    },
    {
      label: "Services touched",
      value: numberFormatter.format(distinctServices),
      note: "Distinct systems that surfaced in the journal window.",
    },
    {
      label: "Recurring tags",
      value: numberFormatter.format(recurringTags),
      note: "Repeated patterns that surfaced across multiple alerts.",
    },
  ];
}

export function readRequestedAlertId(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function resolveAlertJournalView(alertId?: string): AlertJournalView {
  const requestedAlertId = normalizeAlertId(alertId);
  const alerts = sortChronologically(alertJournalEntries);
  const selectedAlert =
    alerts.find((alert) => alert.id === requestedAlertId) ?? alerts[0];

  return {
    alerts,
    dayGroups: buildDayGroups(alerts),
    selectedAlert,
    requestedAlertId,
    selectionFound: requestedAlertId
      ? alerts.some((alert) => alert.id === requestedAlertId)
      : true,
    summaryMetrics: buildSummaryMetrics(alerts),
    tagSummary: buildTagSummary(alerts),
  };
}
