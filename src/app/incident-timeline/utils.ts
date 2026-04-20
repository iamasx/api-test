import type {
  Incident,
  IncidentStatus,
  Severity,
  TimelineStage,
} from "./data";

export type SeverityFilter = Severity | "All";
export type SummaryTone = "critical" | "warning" | "calm" | "neutral";
export type SummaryCard = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: SummaryTone;
};

const timestampFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "UTC",
});

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatTimestamp(timestamp: string) {
  return `${timestampFormatter.format(new Date(timestamp))} UTC`;
}

export function getIncidentDurationMinutes(incident: Incident) {
  const endTimestamp =
    incident.resolvedAt ??
    incident.timeline[incident.timeline.length - 1]?.timestamp ??
    incident.startedAt;

  return Math.max(
    1,
    Math.round(
      (new Date(endTimestamp).getTime() - new Date(incident.startedAt).getTime()) /
        60_000
    )
  );
}

export function getIncidentDurationLabel(incident: Incident) {
  const totalMinutes = getIncidentDurationMinutes(incident);

  const days = Math.floor(totalMinutes / 1_440);
  const hours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${minutes}m`;
}

export function getSeverityBadgeClasses(severity: Severity) {
  switch (severity) {
    case "Critical":
      return "border-rose-400/35 bg-rose-500/15 text-rose-100";
    case "High":
      return "border-amber-400/35 bg-amber-400/15 text-amber-100";
    case "Moderate":
      return "border-sky-400/35 bg-sky-400/15 text-sky-100";
    case "Low":
      return "border-emerald-400/35 bg-emerald-400/15 text-emerald-100";
  }
}

export function getStatusBadgeClasses(status: IncidentStatus) {
  switch (status) {
    case "Investigating":
      return "border-amber-300/25 bg-amber-300/10 text-amber-100";
    case "Monitoring":
      return "border-cyan-300/25 bg-cyan-300/10 text-cyan-100";
    case "Mitigated":
      return "border-emerald-300/25 bg-emerald-300/10 text-emerald-100";
    case "Resolved":
      return "border-white/15 bg-white/5 text-slate-100";
  }
}

export function getTimelineStageClasses(stage: TimelineStage) {
  switch (stage) {
    case "Detection":
      return "border-rose-400/35 bg-rose-500/20 text-rose-100";
    case "Triage":
      return "border-amber-400/35 bg-amber-400/20 text-amber-100";
    case "Mitigation":
      return "border-sky-400/35 bg-sky-400/20 text-sky-100";
    case "Communication":
      return "border-cyan-400/35 bg-cyan-400/20 text-cyan-100";
    case "Recovery":
      return "border-emerald-400/35 bg-emerald-400/20 text-emerald-100";
    case "Follow-up":
      return "border-white/15 bg-white/5 text-slate-100";
  }
}

export function getSummaryToneClasses(tone: SummaryTone) {
  switch (tone) {
    case "critical":
      return "border-rose-400/25 bg-rose-500/10";
    case "warning":
      return "border-amber-400/25 bg-amber-400/10";
    case "calm":
      return "border-emerald-400/25 bg-emerald-400/10";
    case "neutral":
      return "border-white/10 bg-white/5";
  }
}

export function sortIncidents(incidents: Incident[]) {
  const severityWeight: Record<Severity, number> = {
    Critical: 0,
    High: 1,
    Moderate: 2,
    Low: 3,
  };

  return [...incidents].sort((left, right) => {
    const severityDifference =
      severityWeight[left.severity] - severityWeight[right.severity];

    if (severityDifference !== 0) {
      return severityDifference;
    }

    return (
      new Date(right.startedAt).getTime() - new Date(left.startedAt).getTime()
    );
  });
}

export function filterIncidents(
  incidents: Incident[],
  severity: SeverityFilter
) {
  if (severity === "All") {
    return incidents;
  }

  return incidents.filter((incident) => incident.severity === severity);
}

export function getSeverityCounts(
  incidents: Incident[]
): Record<SeverityFilter, number> {
  return {
    All: incidents.length,
    Critical: incidents.filter((incident) => incident.severity === "Critical")
      .length,
    High: incidents.filter((incident) => incident.severity === "High").length,
    Moderate: incidents.filter((incident) => incident.severity === "Moderate")
      .length,
    Low: incidents.filter((incident) => incident.severity === "Low").length,
  };
}

export function getLatestActivityLabel(incidents: Incident[]) {
  const latestEntry = incidents
    .flatMap((incident) => incident.timeline)
    .sort(
      (left, right) =>
        new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime()
    )[0];

  return latestEntry ? formatTimestamp(latestEntry.timestamp) : "No activity";
}

export function buildSummaryCards(incidents: Incident[]): SummaryCard[] {
  if (incidents.length === 0) {
    return [
      {
        id: "scope",
        label: "Incidents in scope",
        value: "0",
        detail: "No incidents match the active filter yet.",
        tone: "neutral",
      },
      {
        id: "regions",
        label: "Regions touched",
        value: "0",
        detail: "Regional scope will appear once incidents are available.",
        tone: "neutral",
      },
      {
        id: "timeline",
        label: "Timeline checkpoints",
        value: "0",
        detail: "Timeline notes will populate from mock response activity.",
        tone: "neutral",
      },
      {
        id: "longest",
        label: "Longest disruption",
        value: "0m",
        detail: "Duration data will appear after incidents are loaded.",
        tone: "neutral",
      },
    ];
  }

  const activeResponses = incidents.filter(
    (incident) => incident.status !== "Resolved"
  ).length;
  const uniqueRegions = new Set(incidents.map((incident) => incident.region));
  const checkpointCount = incidents.reduce(
    (total, incident) => total + incident.timeline.length,
    0
  );
  const longestIncident = incidents.reduce((currentLongest, incident) => {
    if (!currentLongest) {
      return incident;
    }

    return getIncidentDurationMinutes(incident) >
      getIncidentDurationMinutes(currentLongest)
      ? incident
      : currentLongest;
  }, incidents[0]);

  return [
    {
      id: "scope",
      label: "Incidents in scope",
      value: `${incidents.length}`,
      detail:
        activeResponses > 0
          ? `${activeResponses} responses still require live monitoring.`
          : "All incidents in the current view are fully resolved.",
      tone: activeResponses > 0 ? "warning" : "calm",
    },
    {
      id: "regions",
      label: "Regions touched",
      value: `${uniqueRegions.size}`,
      detail: `Coverage spans ${Array.from(uniqueRegions).join(", ")}.`,
      tone: "neutral",
    },
    {
      id: "timeline",
      label: "Timeline checkpoints",
      value: `${checkpointCount}`,
      detail:
        "Every checkpoint is available for the detailed response review stream.",
      tone: "neutral",
    },
    {
      id: "longest",
      label: "Longest disruption",
      value: getIncidentDurationLabel(longestIncident),
      detail: `${longestIncident.title} carried the longest recovery window in the current scope.`,
      tone: longestIncident.severity === "Critical" ? "critical" : "warning",
    },
  ];
}
