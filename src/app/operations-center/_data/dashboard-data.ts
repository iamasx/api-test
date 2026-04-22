export type MetricTone = "positive" | "caution" | "neutral";
export type AlertSeverity = "critical" | "elevated" | "watch";
export type ActivityKind = "automated" | "manual" | "resolved";

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
  detail: string;
}

export interface ActiveAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  location: string;
  description: string;
  owner: string;
  updatedAgo: string;
}

export interface ActivityEntry {
  id: string;
  title: string;
  actor: string;
  timestamp: string;
  summary: string;
  kind: ActivityKind;
}

export const kpiMetrics: KpiMetric[] = [
  {
    id: "on-time-rate",
    label: "On-time delivery",
    value: "96.1%",
    delta: "+2.3% vs last week",
    tone: "positive",
    detail: "Linehaul departures holding above target across eastern hubs.",
  },
  {
    id: "fleet-util",
    label: "Fleet utilization",
    value: "81%",
    delta: "+4 units staged",
    tone: "positive",
    detail: "Reserve tractors positioned in Newark and Ontario for surge demand.",
  },
  {
    id: "open-exceptions",
    label: "Open exceptions",
    value: "23 cases",
    delta: "8 over target",
    tone: "caution",
    detail:
      "Most unresolved items are cold-chain handoff delays and customs holds.",
  },
  {
    id: "escalation-time",
    label: "Avg escalation response",
    value: "9 min",
    delta: "Within 10-min target",
    tone: "neutral",
    detail:
      "Shift leads clearing inbound requests fast enough to protect SLAs.",
  },
];

export const activeAlerts: ActiveAlert[] = [
  {
    id: "memphis-temp",
    severity: "critical",
    title: "Memphis cold-chain temperature drift",
    location: "Memphis Hub · Cold storage lane",
    description:
      "Trailer CX-218 exceeded the acceptable threshold for 9 minutes before backup cooling engaged. 42 cartons require recertification.",
    owner: "Facilities + Cold Chain",
    updatedAgo: "4 min ago",
  },
  {
    id: "gulf-storms",
    severity: "elevated",
    title: "Storm reroutes across Gulf corridor",
    location: "I-10 East network",
    description:
      "Weather cells forcing staged detours for southbound freight through Houston and Mobile. 11 loads absorbing ~27 min detour.",
    owner: "Linehaul control",
    updatedAgo: "11 min ago",
  },
  {
    id: "scan-latency",
    severity: "watch",
    title: "Outbound scan latency spike in Newark",
    location: "Newark outbound mezzanine",
    description:
      "Scanner response climbed above baseline after the latest warehouse ruleset sync. P95 at 1.8 s.",
    owner: "Fulfillment systems",
    updatedAgo: "18 min ago",
  },
];

export const recentActivity: ActivityEntry[] = [
  {
    id: "phoenix-reroute",
    title: "Auto-reroute for Phoenix → Dallas lane",
    actor: "Route automation",
    timestamp: "08:04 UTC",
    summary:
      "Routing engine detected El Paso congestion and shifted two premium loads onto the Amarillo bypass, recovering 23 minutes.",
    kind: "automated",
  },
  {
    id: "newark-overflow",
    title: "Overflow dispatch approved in Newark",
    actor: "Maya Chen · Shift lead",
    timestamp: "07:52 UTC",
    summary:
      "Reserve sort team activated to absorb the outbound spike before the 09:00 pickup window.",
    kind: "manual",
  },
  {
    id: "cooling-swap",
    title: "Cooling unit replaced on trailer CX-218",
    actor: "R. Patel · Field maintenance",
    timestamp: "07:39 UTC",
    summary:
      "Reefer replacement completed; clean temperature trace uploaded at last checkpoint.",
    kind: "resolved",
  },
  {
    id: "customer-brief",
    title: "Enterprise briefed on Houston delay",
    actor: "Customer success desk",
    timestamp: "07:24 UTC",
    summary:
      "High-touch accounts received updated arrival windows and a direct escalation contact.",
    kind: "manual",
  },
];
