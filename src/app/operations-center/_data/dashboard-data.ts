export type SummaryTone = "stable" | "watch" | "focused";
export type MetricTone = "positive" | "caution" | "neutral";
export type AlertSeverity = "critical" | "elevated" | "watch";
export type ActivityTone = "automated" | "coordinated" | "resolved";

export interface DashboardStat {
  label: string;
  value: string;
  tone: SummaryTone;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
  context: string;
  highlight: string;
  progress: number;
}

export interface LiveAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  site: string;
  description: string;
  owner: string;
  updatedAt: string;
  playbook: string;
  impact: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  actor: string;
  channel: string;
  timestamp: string;
  summary: string;
  outcome: string;
  tone: ActivityTone;
}

export const operationsCenterSummary = {
  eyebrow: "Operations Center",
  title: "Keep critical lanes, crews, and customer promises in sync.",
  description:
    "A route-level dashboard for operators monitoring live network health, dispatch risk, and intervention velocity across the current shift.",
  shiftLabel: "Shift 02 · Global command desk",
  refreshLabel: "Updated 2 minutes ago",
  stats: [
    {
      label: "Network availability",
      value: "99.982%",
      tone: "stable",
    },
    {
      label: "Auto-remediations landed",
      value: "12 / 14",
      tone: "focused",
    },
    {
      label: "Active watch regions",
      value: "3",
      tone: "watch",
    },
    {
      label: "Median acknowledgement",
      value: "7 min",
      tone: "stable",
    },
  ] satisfies DashboardStat[],
};

export const operationsCenterMetrics = [
  {
    id: "on-time-departures",
    label: "On-time departures",
    value: "97.4%",
    delta: "+1.8% vs 7-day average",
    tone: "positive",
    context:
      "Linehaul departures held steady even with the pre-noon wave building across east coast hubs.",
    highlight: "Morning linehaul release",
    progress: 97,
  },
  {
    id: "fleet-utilization",
    label: "Fleet utilization",
    value: "84%",
    delta: "+6 tractors staged",
    tone: "positive",
    context:
      "Overflow units are staged in Newark and Joliet, keeping reserve capacity available for weather diversions.",
    highlight: "Reserve fleet readiness",
    progress: 84,
  },
  {
    id: "exception-backlog",
    label: "Exception backlog",
    value: "18 cases",
    delta: "6 cases over target",
    tone: "caution",
    context:
      "Most unresolved exceptions are concentrated in two cold-chain handoffs and one customs hold.",
    highlight: "Manual interventions queued",
    progress: 62,
  },
  {
    id: "response-time",
    label: "Escalation response",
    value: "7 min",
    delta: "Target under 10 minutes",
    tone: "neutral",
    context:
      "Shift leads are clearing inbound escalation requests fast enough to protect premium customer commitments.",
    highlight: "Median acknowledgement window",
    progress: 76,
  },
] satisfies DashboardMetric[];

export const operationsCenterAlerts = [
  {
    id: "memphis-cold-chain",
    severity: "critical",
    title: "Memphis cold-chain temperature drift",
    site: "Memphis Hub · Cold storage lane",
    description:
      "Trailer CX-218 crossed the acceptable storage threshold for nine minutes before backup cooling engaged.",
    owner: "Facilities + Cold Chain",
    updatedAt: "Updated 4 minutes ago",
    playbook: "Dispatch reefer swap and quarantine scan",
    impact: "42 high-value cartons require recertification.",
  },
  {
    id: "gulf-reroutes",
    severity: "elevated",
    title: "Storm reroutes building across the Gulf corridor",
    site: "I-10 East network",
    description:
      "Inbound weather cells are forcing staged detours for southbound freight moving through Houston and Mobile.",
    owner: "Linehaul control",
    updatedAt: "Updated 11 minutes ago",
    playbook: "Re-sequence linehaul and activate reserve drivers",
    impact: "11 loads are absorbing an average 27-minute detour.",
  },
  {
    id: "newark-scan-latency",
    severity: "watch",
    title: "Outbound barcode scan latency spike",
    site: "Newark outbound mezzanine",
    description:
      "Scanner response time climbed above baseline after the latest warehouse ruleset sync completed.",
    owner: "Fulfillment systems",
    updatedAt: "Updated 18 minutes ago",
    playbook: "Rollback scanner ruleset and monitor error queue",
    impact: "P95 scan time is sitting at 1.8 seconds.",
  },
] satisfies LiveAlert[];

export const operationsCenterActivity = [
  {
    id: "phoenix-reroute",
    title: "Auto-reroute triggered for Phoenix to Dallas lane",
    actor: "Route automation",
    channel: "Automation",
    timestamp: "08:04 UTC",
    summary:
      "The routing engine detected congestion around El Paso and shifted two premium loads onto the Amarillo bypass.",
    outcome: "Recovered 23 minutes for premium freight.",
    tone: "automated",
  },
  {
    id: "newark-overflow",
    title: "Shift lead approved overflow dispatch in Newark",
    actor: "Maya Chen",
    channel: "Coordination",
    timestamp: "07:52 UTC",
    summary:
      "A reserve sort team was activated to absorb the outbound spike before the 09:00 pickup window opened.",
    outcome: "Protected three same-day customer commitments.",
    tone: "coordinated",
  },
  {
    id: "cooling-unit-swap",
    title: "Cooling unit swapped on trailer CX-218",
    actor: "R. Patel",
    channel: "Field action",
    timestamp: "07:39 UTC",
    summary:
      "Field maintenance completed the reefer replacement and uploaded a clean temperature trace for the last checkpoint.",
    outcome: "Cold-chain route restored and monitoring tightened.",
    tone: "resolved",
  },
  {
    id: "customer-briefing",
    title: "Enterprise support briefed on Houston transfer delay",
    actor: "Customer success desk",
    channel: "Customer comms",
    timestamp: "07:24 UTC",
    summary:
      "High-touch accounts received updated arrival windows plus a single escalation contact for follow-up requests.",
    outcome: "Inbound support volume stayed below expected threshold.",
    tone: "coordinated",
  },
] satisfies ActivityItem[];
