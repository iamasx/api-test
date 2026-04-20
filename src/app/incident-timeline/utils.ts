import type {
  Incident,
  IncidentStatus,
  Severity,
  TimelineStage,
} from "./data";

export type SeverityFilter = Severity | "All";
export type SummaryTone = "critical" | "warning" | "calm" | "neutral";

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

export function getIncidentDurationLabel(incident: Incident) {
  const endTimestamp =
    incident.resolvedAt ??
    incident.timeline[incident.timeline.length - 1]?.timestamp ??
    incident.startedAt;

  const totalMinutes = Math.max(
    1,
    Math.round(
      (new Date(endTimestamp).getTime() - new Date(incident.startedAt).getTime()) /
        60_000
    )
  );

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
