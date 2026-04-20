export type HealthState = "healthy" | "warning" | "degraded";

export interface StatusBoardSummaryStat {
  label: string;
  value: string;
  detail: string;
  state: HealthState;
}

export interface ServiceHealthItem {
  id: string;
  name: string;
  category: string;
  owner: string;
  status: HealthState;
  uptime: string;
  latency: string;
  incidents: string;
  summary: string;
  nextUpdate: string;
}

export interface RegionalHealthGroup {
  id: string;
  name: string;
  coverageWindow: string;
  status: HealthState;
  summary: string;
  serviceCount: number;
  warningCount: number;
  degradedCount: number;
  services: ServiceHealthItem[];
}

export interface ResponseChecklistItem {
  id: string;
  title: string;
  owner: string;
  dueBy: string;
  completed: boolean;
  detail: string;
}

export interface ResponseSidebarNote {
  label: string;
  value: string;
}

export const statusBoardSummary = {
  eyebrow: "Status Board",
  title: "Track regional service health and response posture in one place.",
  description:
    "A route-scoped monitoring board for reviewing service reliability, regional exceptions, and where the response team needs to focus next.",
  generatedAt: "Snapshot captured at 08:42 UTC",
  stats: [
    {
      label: "Regions reporting",
      value: "4",
      detail: "North America, Europe, APAC, and LATAM are included in the board.",
      state: "healthy",
    },
    {
      label: "Healthy services",
      value: "9",
      detail: "Most services are staying within expected latency and availability targets.",
      state: "healthy",
    },
    {
      label: "Warning services",
      value: "2",
      detail: "Elevated attention is needed before these services tip into an incident state.",
      state: "warning",
    },
    {
      label: "Degraded services",
      value: "2",
      detail: "Two services currently need direct intervention from response leads.",
      state: "degraded",
    },
  ] satisfies StatusBoardSummaryStat[],
};

export const regionalHealthGroups = [
  {
    id: "north-america",
    name: "North America",
    coverageWindow: "Coverage 24 / 7 · Handoffs every 6 hours",
    status: "warning",
    summary:
      "Core delivery and search services remain online, but the notifications pipeline is seeing rising retry pressure in the east region.",
    serviceCount: 4,
    warningCount: 1,
    degradedCount: 0,
    services: [
      {
        id: "na-edge-api",
        name: "Edge API Gateway",
        category: "Traffic and routing",
        owner: "Platform edge",
        status: "healthy",
        uptime: "99.99%",
        latency: "184 ms p95",
        incidents: "No active incidents",
        summary:
          "Ingress traffic is within expected limits and cache hit rates stayed above the overnight target.",
        nextUpdate: "Next region review in 18 minutes",
      },
      {
        id: "na-search-cluster",
        name: "Search Cluster",
        category: "Discovery",
        owner: "Search reliability",
        status: "healthy",
        uptime: "99.97%",
        latency: "231 ms p95",
        incidents: "1 resolved this shift",
        summary:
          "Query latency normalized after a rolling shard rebalance completed before the morning peak.",
        nextUpdate: "Capacity review in 42 minutes",
      },
      {
        id: "na-notifications",
        name: "Notification Fanout",
        category: "Messaging",
        owner: "Messaging platform",
        status: "warning",
        uptime: "99.74%",
        latency: "2.1 s dispatch",
        incidents: "Retries elevated",
        summary:
          "Retry queues are climbing for SMS and push delivery in the east region after a third-party carrier slowdown.",
        nextUpdate: "Carrier escalation check in 9 minutes",
      },
      {
        id: "na-billing-sync",
        name: "Billing Sync",
        category: "Finance operations",
        owner: "Revenue systems",
        status: "healthy",
        uptime: "99.95%",
        latency: "7 min batch lag",
        incidents: "No active incidents",
        summary:
          "Sync jobs are completing inside the hourly batch window with no reconciliation backlog on the ledger side.",
        nextUpdate: "Ledger audit at top of hour",
      },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    coverageWindow: "Coverage 20 / 7 · Follow-the-sun support",
    status: "degraded",
    summary:
      "Authentication remains stable, but reporting exports are degraded while the Frankfurt storage cluster finishes a recovery cycle.",
    serviceCount: 3,
    warningCount: 0,
    degradedCount: 1,
    services: [
      {
        id: "eu-auth",
        name: "Identity Gateway",
        category: "Authentication",
        owner: "Trust platform",
        status: "healthy",
        uptime: "99.98%",
        latency: "143 ms p95",
        incidents: "No active incidents",
        summary:
          "Token issuance and session refresh traffic stayed flat through the last release window.",
        nextUpdate: "Trust review in 35 minutes",
      },
      {
        id: "eu-exports",
        name: "Reporting Exports",
        category: "Analytics delivery",
        owner: "Insights platform",
        status: "degraded",
        uptime: "98.92%",
        latency: "34 min queue delay",
        incidents: "Customer-visible degradation",
        summary:
          "Large CSV export jobs are queued behind storage rehydration work in Frankfurt, delaying enterprise reporting deliveries.",
        nextUpdate: "Storage recovery checkpoint in 6 minutes",
      },
      {
        id: "eu-workflows",
        name: "Workflow Runner",
        category: "Automation",
        owner: "Automation systems",
        status: "healthy",
        uptime: "99.96%",
        latency: "11 s median task start",
        incidents: "No active incidents",
        summary:
          "Background jobs are staying within concurrency limits after a scheduler tune-up earlier in the shift.",
        nextUpdate: "Queue sweep in 27 minutes",
      },
    ],
  },
  {
    id: "apac",
    name: "APAC",
    coverageWindow: "Coverage 24 / 7 · Primary desk in Singapore",
    status: "healthy",
    summary:
      "The APAC region is steady with healthy demand handling across app traffic, media processing, and partner webhooks.",
    serviceCount: 3,
    warningCount: 0,
    degradedCount: 0,
    services: [
      {
        id: "apac-app-shell",
        name: "App Shell",
        category: "Frontend delivery",
        owner: "Experience platform",
        status: "healthy",
        uptime: "99.99%",
        latency: "119 ms p95",
        incidents: "No active incidents",
        summary:
          "Static and dynamic route delivery is stable across Tokyo, Singapore, and Sydney edge regions.",
        nextUpdate: "Synthetic review in 21 minutes",
      },
      {
        id: "apac-media",
        name: "Media Processor",
        category: "Uploads and transforms",
        owner: "Media services",
        status: "healthy",
        uptime: "99.94%",
        latency: "48 s average job time",
        incidents: "No active incidents",
        summary:
          "Transcode queues are below threshold and high-resolution exports are clearing without worker saturation.",
        nextUpdate: "Worker pool audit in 54 minutes",
      },
      {
        id: "apac-partner-hooks",
        name: "Partner Webhooks",
        category: "Integrations",
        owner: "Partner ecosystem",
        status: "healthy",
        uptime: "99.93%",
        latency: "412 ms p95",
        incidents: "No active incidents",
        summary:
          "Delivery success has remained above the weekly baseline after yesterday's retry policy adjustment.",
        nextUpdate: "Partner pulse in 31 minutes",
      },
    ],
  },
  {
    id: "latam",
    name: "LATAM",
    coverageWindow: "Coverage 18 / 7 · Regional escalation desk",
    status: "warning",
    summary:
      "Checkout and support intake are online, but document ingestion is trending toward saturation during the current billing-cycle spike.",
    serviceCount: 3,
    warningCount: 1,
    degradedCount: 1,
    services: [
      {
        id: "latam-checkout",
        name: "Checkout Service",
        category: "Transactions",
        owner: "Commerce core",
        status: "healthy",
        uptime: "99.97%",
        latency: "287 ms p95",
        incidents: "No active incidents",
        summary:
          "Authorization and fraud checks are completing within normal bounds even with end-of-month transaction growth.",
        nextUpdate: "Fraud trend review in 24 minutes",
      },
      {
        id: "latam-doc-ingest",
        name: "Document Ingest",
        category: "File intake",
        owner: "Records platform",
        status: "warning",
        uptime: "99.68%",
        latency: "4.8 min queue time",
        incidents: "Backlog above threshold",
        summary:
          "Invoice and identity-verification uploads are queuing faster than workers can clear them in Sao Paulo.",
        nextUpdate: "Autoscaling decision in 12 minutes",
      },
      {
        id: "latam-support-intake",
        name: "Support Intake",
        category: "Case routing",
        owner: "Support systems",
        status: "degraded",
        uptime: "98.71%",
        latency: "6.4 s form submit",
        incidents: "Intermittent submission failures",
        summary:
          "Customers are hitting sporadic submission errors while the Bogota queue balancer recovers from an unhealthy node rotation.",
        nextUpdate: "Balancer failover review in 4 minutes",
      },
    ],
  },
] satisfies RegionalHealthGroup[];

export const responseChecklist = [
  {
    id: "carrier-escalation",
    title: "Confirm carrier escalation coverage for North America fanout retries",
    owner: "Messaging platform",
    dueBy: "Due in 9 minutes",
    completed: false,
    detail:
      "Validate whether the backup routing policy should be extended through the east region peak window.",
  },
  {
    id: "frankfurt-storage",
    title: "Review Frankfurt storage recovery before reopening large export jobs",
    owner: "Insights platform",
    dueBy: "Due in 6 minutes",
    completed: false,
    detail:
      "Keep enterprise export queues throttled until storage rehydration clears the recovery checkpoint.",
  },
  {
    id: "latam-autoscale",
    title: "Approve additional ingest workers for the Sao Paulo billing spike",
    owner: "Records platform",
    dueBy: "Due in 12 minutes",
    completed: false,
    detail:
      "Worker saturation is increasing queue time for invoice and verification uploads across LATAM.",
  },
  {
    id: "support-failover",
    title: "Verify support intake failover after the Bogota balancer rotation",
    owner: "Support systems",
    dueBy: "Review in 4 minutes",
    completed: true,
    detail:
      "Primary unhealthy node has been removed and active traffic is now pinned to the healthy pair.",
  },
] satisfies ResponseChecklistItem[];

export const responseSidebarNotes = [
  {
    label: "Escalation lead",
    value: "Aisha Morgan · Reliability command",
  },
  {
    label: "Next operations review",
    value: "09:00 UTC regional handoff",
  },
  {
    label: "Customer advisory",
    value: "Prepared for Europe exports and LATAM support intake",
  },
] satisfies ResponseSidebarNote[];
