export interface StatusItem {
  id: string;
  service: string;
  status: "healthy" | "degraded" | "down" | "maintenance";
  latency: number;
  uptime: number;
  lastChecked: string;
  owner: string;
}

export interface IncidentNote {
  id: string;
  serviceId: string;
  timestamp: string;
  message: string;
  severity: "info" | "warning" | "critical";
}

const statusItems: StatusItem[] = [
  {
    id: "svc-001",
    service: "API Gateway",
    status: "healthy",
    latency: 42,
    uptime: 99.98,
    lastChecked: "2026-04-23T08:12:00Z",
    owner: "Platform Team",
  },
  {
    id: "svc-002",
    service: "Auth Service",
    status: "degraded",
    latency: 310,
    uptime: 99.72,
    lastChecked: "2026-04-23T08:11:30Z",
    owner: "Identity Squad",
  },
  {
    id: "svc-003",
    service: "Payment Processor",
    status: "healthy",
    latency: 88,
    uptime: 99.95,
    lastChecked: "2026-04-23T08:12:00Z",
    owner: "Payments Team",
  },
  {
    id: "svc-004",
    service: "Notification Hub",
    status: "down",
    latency: 0,
    uptime: 97.31,
    lastChecked: "2026-04-23T07:58:00Z",
    owner: "Messaging Team",
  },
  {
    id: "svc-005",
    service: "Search Index",
    status: "healthy",
    latency: 67,
    uptime: 99.91,
    lastChecked: "2026-04-23T08:12:00Z",
    owner: "Discovery Team",
  },
  {
    id: "svc-006",
    service: "CDN Edge",
    status: "maintenance",
    latency: 0,
    uptime: 99.88,
    lastChecked: "2026-04-23T06:00:00Z",
    owner: "Infrastructure",
  },
  {
    id: "svc-007",
    service: "Data Pipeline",
    status: "healthy",
    latency: 125,
    uptime: 99.84,
    lastChecked: "2026-04-23T08:11:45Z",
    owner: "Data Engineering",
  },
  {
    id: "svc-008",
    service: "Object Storage",
    status: "healthy",
    latency: 35,
    uptime: 99.99,
    lastChecked: "2026-04-23T08:12:00Z",
    owner: "Infrastructure",
  },
];

const incidentNotes: IncidentNote[] = [
  {
    id: "inc-001",
    serviceId: "svc-004",
    timestamp: "2026-04-23T07:55:00Z",
    message: "Notification Hub unreachable — investigating upstream provider outage.",
    severity: "critical",
  },
  {
    id: "inc-002",
    serviceId: "svc-002",
    timestamp: "2026-04-23T07:40:00Z",
    message: "Auth Service latency elevated after config rollout. Rollback in progress.",
    severity: "warning",
  },
  {
    id: "inc-003",
    serviceId: "svc-006",
    timestamp: "2026-04-23T05:30:00Z",
    message: "Scheduled CDN Edge maintenance window — traffic rerouted to secondary PoPs.",
    severity: "info",
  },
];

export interface StatusBoardView {
  services: StatusItem[];
  incidents: IncidentNote[];
  summary: {
    total: number;
    healthy: number;
    degraded: number;
    down: number;
    maintenance: number;
    avgLatency: number;
  };
}

export function getStatusBoardView(): StatusBoardView {
  const healthy = statusItems.filter((s) => s.status === "healthy").length;
  const degraded = statusItems.filter((s) => s.status === "degraded").length;
  const down = statusItems.filter((s) => s.status === "down").length;
  const maintenance = statusItems.filter((s) => s.status === "maintenance").length;
  const active = statusItems.filter((s) => s.latency > 0);
  const avgLatency = active.length > 0 ? Math.round(active.reduce((a, s) => a + s.latency, 0) / active.length) : 0;

  return {
    services: statusItems,
    incidents: incidentNotes,
    summary: { total: statusItems.length, healthy, degraded, down, maintenance, avgLatency },
  };
}
