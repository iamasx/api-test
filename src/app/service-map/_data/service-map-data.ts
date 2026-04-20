export type ServiceHealth = "healthy" | "observing" | "degraded" | "critical";

export type DependencyRisk = "stable" | "watch" | "elevated" | "severe";

export type ServiceCluster = {
  id: string;
  name: string;
  region: string;
  mission: string;
  owner: string;
  status: ServiceHealth;
  coverageWindow: string;
  changeBudget: string;
  focusArea: string;
  summary: string;
};

export type ServiceNode = {
  id: string;
  clusterId: string;
  name: string;
  shortName: string;
  serviceType: string;
  runtime: string;
  endpoint: string;
  owner: string;
  onCall: string;
  health: ServiceHealth;
  requestRate: string;
  p95Latency: string;
  errorRate: string;
  saturation: string;
  summary: string;
  note: string;
  tags: string[];
  dependencies: string[];
  consumers: string[];
};

export type DependencyHighlight = {
  id: string;
  sourceNodeId: string;
  dependencyName: string;
  dependencyType: string;
  status: DependencyRisk;
  signal: string;
  impact: string;
  affectedServices: string[];
  sla: string;
  lastChange: string;
  nextAction: string;
  note: string;
};

export type ServiceMapClusterView = ServiceCluster & {
  nodes: ServiceNode[];
  healthCounts: Record<ServiceHealth, number>;
};

export type ServiceMapInspectorView = {
  service: ServiceNode;
  cluster: ServiceCluster;
  upstreamHighlights: DependencyHighlight[];
  downstreamServices: ServiceNode[];
};

export const serviceMapClusters: ServiceCluster[] = [
  {
    id: "edge-routing",
    name: "Edge Routing Mesh",
    region: "Global edge / us-east-1 control plane",
    mission: "Accept traffic, enforce policy, and shape requests into the internal service lanes.",
    owner: "Traffic Platform",
    status: "observing",
    coverageWindow: "24/7 with hourly synthetic probes",
    changeBudget: "2 low-risk config windows remaining this week",
    focusArea: "Reduce auth-path retries during EU traffic bursts.",
    summary:
      "The edge mesh is healthy overall, but token validation pressure is making a few services drift toward watch state.",
  },
  {
    id: "core-workflows",
    name: "Core Workflow Control",
    region: "us-east-1 primary / us-west-2 warm standby",
    mission: "Coordinate orchestration, state transitions, and operator-triggered recovery flows.",
    owner: "Workflow Systems",
    status: "degraded",
    coverageWindow: "Follow-the-sun on-call with replay drills every Tuesday",
    changeBudget: "Config freeze for customer-facing jobs until Friday",
    focusArea: "Stabilize queue backlog created by billing retry fan-out.",
    summary:
      "Queue depth and stale dependency fallbacks are making workflow execution slower than target for a subset of tenants.",
  },
  {
    id: "data-services",
    name: "Data Services Spine",
    region: "us-east-1 storage / us-central analytics mirror",
    mission: "Persist primary records, replicate events, and expose read models for search and analytics.",
    owner: "Data Reliability",
    status: "degraded",
    coverageWindow: "Primary DB coverage with dedicated replication rotation",
    changeBudget: "1 schema rollout slot reserved for Thursday night",
    focusArea: "Protect write latency while analytics backfills catch up.",
    summary:
      "Primary storage remains available, but replication lag and analytics drain pressure are producing visible dependency warnings upstream.",
  },
];

export const serviceMapNodes: ServiceNode[] = [
  {
    id: "edge-gateway",
    clusterId: "edge-routing",
    name: "Northstar Edge Gateway",
    shortName: "Gateway",
    serviceType: "Ingress proxy",
    runtime: "Rust + WASM filters",
    endpoint: "edge-gateway.internal",
    owner: "Traffic Platform",
    onCall: "Rhea Morgan",
    health: "healthy",
    requestRate: "118k rpm",
    p95Latency: "42 ms",
    errorRate: "0.12%",
    saturation: "51%",
    summary:
      "Accepts public ingress traffic and forwards normalized requests to tenant-aware lanes.",
    note: "No dropped lanes in the last 12 hours; policy cache hit rate remains above target.",
    tags: ["ingress", "rate limiting", "tenant routing"],
    dependencies: ["token-vault", "policy-registry", "delivery-cache"],
    consumers: ["All external traffic"],
  },
  {
    id: "auth-broker",
    clusterId: "edge-routing",
    name: "Token Broker",
    shortName: "Auth",
    serviceType: "Identity service",
    runtime: "Node.js 22",
    endpoint: "auth-broker.internal",
    owner: "Identity Reliability",
    onCall: "Nina Alvarez",
    health: "observing",
    requestRate: "64k rpm",
    p95Latency: "131 ms",
    errorRate: "0.41%",
    saturation: "67%",
    summary:
      "Validates edge tokens, enriches claims, and publishes principal context for downstream services.",
    note: "Latency increased after the last partner rollout because cached signing keys are rotating more often.",
    tags: ["auth", "tokens", "partner traffic"],
    dependencies: ["token-vault", "session-ledger"],
    consumers: ["edge-gateway", "workflow-api"],
  },
  {
    id: "policy-registry",
    clusterId: "edge-routing",
    name: "Policy Registry",
    shortName: "Policy",
    serviceType: "Configuration service",
    runtime: "Go 1.24",
    endpoint: "policy-registry.internal",
    owner: "Traffic Platform",
    onCall: "Aiden Shah",
    health: "healthy",
    requestRate: "9k rpm",
    p95Latency: "33 ms",
    errorRate: "0.03%",
    saturation: "38%",
    summary:
      "Distributes routing, tenancy, and rate-policy documents to edge and workflow systems.",
    note: "Config propagation remains within the 90-second target across all edge regions.",
    tags: ["config", "routing", "policy"],
    dependencies: ["config-store"],
    consumers: ["edge-gateway", "workflow-api", "ops-console"],
  },
  {
    id: "workflow-api",
    clusterId: "core-workflows",
    name: "Workflow API",
    shortName: "Workflow API",
    serviceType: "Orchestration API",
    runtime: "Next.js server runtime",
    endpoint: "workflow-api.internal",
    owner: "Workflow Systems",
    onCall: "Mara Chen",
    health: "degraded",
    requestRate: "27k rpm",
    p95Latency: "288 ms",
    errorRate: "1.2%",
    saturation: "74%",
    summary:
      "Coordinates request intake, orchestration state changes, and operator-triggered recovery actions.",
    note: "Retry traffic from billing replays is consuming the spare queue budget.",
    tags: ["orchestration", "api", "operator flows"],
    dependencies: ["queue-orchestrator", "session-ledger", "billing-adapter"],
    consumers: ["ops-console", "edge-gateway", "fulfillment-worker"],
  },
  {
    id: "queue-orchestrator",
    clusterId: "core-workflows",
    name: "Queue Orchestrator",
    shortName: "Queue",
    serviceType: "Async coordinator",
    runtime: "Kotlin + Kafka Streams",
    endpoint: "queue-orchestrator.internal",
    owner: "Workflow Systems",
    onCall: "Ivy Laurent",
    health: "degraded",
    requestRate: "14k jobs/min",
    p95Latency: "1.8 s",
    errorRate: "0.84%",
    saturation: "83%",
    summary:
      "Sequences long-running jobs, deduplicates retries, and hands work to fulfillment and analytics workers.",
    note: "Backlog remains elevated after a burst of billing repair events entered the shared queue.",
    tags: ["queues", "retries", "worker coordination"],
    dependencies: ["event-bus", "billing-adapter", "inventory-index"],
    consumers: ["workflow-api", "fulfillment-worker"],
  },
  {
    id: "ops-console",
    clusterId: "core-workflows",
    name: "Operator Console",
    shortName: "Console",
    serviceType: "Internal dashboard",
    runtime: "React 19 + server actions",
    endpoint: "ops-console.internal",
    owner: "Control Room UX",
    onCall: "Jules Grant",
    health: "healthy",
    requestRate: "3.2k rpm",
    p95Latency: "96 ms",
    errorRate: "0.09%",
    saturation: "44%",
    summary:
      "Presents workflow state, service posture, and operator controls for intervention and replay.",
    note: "Operator flows are healthy, but several panels are showing dependency warnings coming from workflow-api.",
    tags: ["dashboard", "operations", "intervention"],
    dependencies: ["workflow-api", "inventory-index", "analytics-lake"],
    consumers: ["Operations team"],
  },
  {
    id: "ledger-primary",
    clusterId: "data-services",
    name: "Ledger Primary",
    shortName: "Ledger",
    serviceType: "Transactional datastore",
    runtime: "PostgreSQL 17",
    endpoint: "ledger-primary.internal",
    owner: "Data Reliability",
    onCall: "Priya Raman",
    health: "healthy",
    requestRate: "91k qpm",
    p95Latency: "28 ms",
    errorRate: "0.01%",
    saturation: "58%",
    summary:
      "Stores core account, workflow, and session records for operational services.",
    note: "Primary writes remain stable, but read replicas are running behind due to analytics copy pressure.",
    tags: ["postgres", "transactions", "session state"],
    dependencies: ["replication-bus"],
    consumers: ["auth-broker", "workflow-api", "inventory-index"],
  },
  {
    id: "inventory-index",
    clusterId: "data-services",
    name: "Inventory Index",
    shortName: "Inventory",
    serviceType: "Search/read model",
    runtime: "OpenSearch + ingest workers",
    endpoint: "inventory-index.internal",
    owner: "Data Reliability",
    onCall: "Diego Flores",
    health: "observing",
    requestRate: "36k qpm",
    p95Latency: "109 ms",
    errorRate: "0.28%",
    saturation: "71%",
    summary:
      "Builds searchable read models for operator lookup panels, availability views, and fulfillment checks.",
    note: "Replica lag is forcing a subset of reads onto colder shards during reindex windows.",
    tags: ["search", "read models", "catalog"],
    dependencies: ["ledger-primary", "analytics-lake"],
    consumers: ["queue-orchestrator", "ops-console", "fulfillment-worker"],
  },
  {
    id: "analytics-lake",
    clusterId: "data-services",
    name: "Analytics Lake",
    shortName: "Analytics",
    serviceType: "Warehouse / replay sink",
    runtime: "Iceberg + Spark pipelines",
    endpoint: "analytics-lake.internal",
    owner: "Data Platform",
    onCall: "Owen Mercer",
    health: "critical",
    requestRate: "6.4k batch ops/hr",
    p95Latency: "4.9 min",
    errorRate: "2.8%",
    saturation: "91%",
    summary:
      "Aggregates event replay, backfill, and downstream reporting jobs for long-horizon analysis.",
    note: "Backfill workloads are competing with near-real-time sync jobs and causing downstream freshness alerts.",
    tags: ["analytics", "backfill", "warehouse"],
    dependencies: ["event-bus", "replication-bus"],
    consumers: ["ops-console", "inventory-index", "billing-adapter"],
  },
  {
    id: "billing-adapter",
    clusterId: "core-workflows",
    name: "Billing Adapter",
    shortName: "Billing",
    serviceType: "Partner connector",
    runtime: "Java 21",
    endpoint: "billing-adapter.internal",
    owner: "Revenue Systems",
    onCall: "Lucas Meyer",
    health: "observing",
    requestRate: "8.6k rpm",
    p95Latency: "244 ms",
    errorRate: "0.66%",
    saturation: "63%",
    summary:
      "Bridges internal workflow events into partner billing systems and receives asynchronous settlement updates.",
    note: "Replay traffic is healthy enough to continue, but adapter retries are amplifying queue pressure.",
    tags: ["billing", "partner", "retries"],
    dependencies: ["event-bus", "analytics-lake"],
    consumers: ["workflow-api", "queue-orchestrator"],
  },
  {
    id: "fulfillment-worker",
    clusterId: "core-workflows",
    name: "Fulfillment Worker",
    shortName: "Fulfillment",
    serviceType: "Background worker",
    runtime: "Python 3.13",
    endpoint: "fulfillment-worker.internal",
    owner: "Workflow Systems",
    onCall: "Talia Brooks",
    health: "healthy",
    requestRate: "11.2k jobs/min",
    p95Latency: "620 ms",
    errorRate: "0.15%",
    saturation: "56%",
    summary:
      "Consumes orchestration jobs, validates readiness, and emits state-change events back to the platform.",
    note: "Workers are draining normally, but queue wait time is starting to overshadow processing time.",
    tags: ["workers", "fulfillment", "background jobs"],
    dependencies: ["queue-orchestrator", "inventory-index", "event-bus"],
    consumers: ["workflow-api"],
  },
];

export const dependencyHighlights: DependencyHighlight[] = [
  {
    id: "dep-token-vault",
    sourceNodeId: "auth-broker",
    dependencyName: "Token Vault",
    dependencyType: "Signing key store",
    status: "watch",
    signal: "Cache misses increased 18% after partner key rotation.",
    impact: "Auth latency is elevated on requests that miss the local validation cache.",
    affectedServices: ["Token Broker", "Northstar Edge Gateway"],
    sla: "99.95% availability / 150 ms read target",
    lastChange: "Key rotation completed 2 hours ago",
    nextAction: "Warm the missing partner key set in the EU edge pool.",
    note: "No outright failures, but edge retries are measurable in the auth path.",
  },
  {
    id: "dep-session-ledger",
    sourceNodeId: "workflow-api",
    dependencyName: "Session Ledger",
    dependencyType: "Transactional session store",
    status: "stable",
    signal: "Write latency remains within SLO despite replay pressure.",
    impact: "Workflow writes still commit cleanly; fallback reads are not active.",
    affectedServices: ["Workflow API", "Token Broker"],
    sla: "99.99% availability / 50 ms write target",
    lastChange: "No recent config changes",
    nextAction: "Keep replication utilization under observation during replay window.",
    note: "Primary database posture is solid; the risk is indirect replica lag rather than primary failure.",
  },
  {
    id: "dep-event-bus",
    sourceNodeId: "queue-orchestrator",
    dependencyName: "Event Bus",
    dependencyType: "Shared stream backbone",
    status: "elevated",
    signal: "Consumer lag is above target on replay and analytics partitions.",
    impact: "Queue orchestration and analytics backfills are competing for the same partitions.",
    affectedServices: [
      "Queue Orchestrator",
      "Billing Adapter",
      "Analytics Lake",
      "Fulfillment Worker",
    ],
    sla: "99.9% availability / under 3 s end-to-end propagation",
    lastChange: "Replay batch size raised by 25% this morning",
    nextAction: "Throttle non-urgent replay traffic until backlog drops below the watch threshold.",
    note: "This is the most visible shared dependency risk in the current topology.",
  },
  {
    id: "dep-analytics-lake",
    sourceNodeId: "ops-console",
    dependencyName: "Analytics Lake",
    dependencyType: "Reporting and replay sink",
    status: "severe",
    signal: "Freshness gap exceeds 14 minutes on three operator views.",
    impact: "Read models and billing replay dashboards are surfacing stale or partial data.",
    affectedServices: ["Operator Console", "Inventory Index", "Billing Adapter"],
    sla: "15-minute freshness for operator-facing data products",
    lastChange: "Backfill campaign resumed 6 hours ago",
    nextAction: "Pause low-priority backfills and restore operator freshness before overnight batch resumes.",
    note: "User-visible data staleness is now high enough to keep this in the severe lane.",
  },
  {
    id: "dep-inventory-index",
    sourceNodeId: "fulfillment-worker",
    dependencyName: "Inventory Index",
    dependencyType: "Availability read model",
    status: "watch",
    signal: "Cold-shard reads added 80-120 ms to a subset of validation checks.",
    impact: "Fulfillment jobs are still succeeding, but readiness checks are slower than normal.",
    affectedServices: ["Fulfillment Worker", "Queue Orchestrator", "Operator Console"],
    sla: "99.9% availability / 120 ms query target",
    lastChange: "Shard rebalance completed 45 minutes ago",
    nextAction: "Finish shard warm-up before the next queue surge window.",
    note: "This dependency is noisy rather than failing, but it compounds the existing workflow latency.",
  },
];

export function getServiceMapClusterViews(): ServiceMapClusterView[] {
  return serviceMapClusters.map((cluster) => {
    const nodes = serviceMapNodes.filter((node) => node.clusterId === cluster.id);
    const healthCounts: Record<ServiceHealth, number> = {
      healthy: 0,
      observing: 0,
      degraded: 0,
      critical: 0,
    };

    for (const node of nodes) {
      healthCounts[node.health] += 1;
    }

    return {
      ...cluster,
      nodes,
      healthCounts,
    };
  });
}

export function getServiceMapSummary() {
  const healthOrder: Record<ServiceHealth, number> = {
    healthy: 0,
    observing: 1,
    degraded: 2,
    critical: 3,
  };
  const highestRiskNode = [...serviceMapNodes].sort(
    (left, right) => healthOrder[right.health] - healthOrder[left.health],
  )[0];
  const severeHighlights = dependencyHighlights.filter(
    (highlight) => highlight.status === "severe" || highlight.status === "elevated",
  ).length;

  if (!highestRiskNode) {
    throw new Error("Expected service map nodes to contain at least one service.");
  }

  return {
    totalClusters: serviceMapClusters.length,
    totalServices: serviceMapNodes.length,
    dependencyHighlights: dependencyHighlights.length,
    severeHighlights,
    highestRiskNode,
  };
}

export function getDefaultInspectedService() {
  return (
    serviceMapNodes.find((node) => node.health === "critical") ??
    serviceMapNodes.find((node) => node.health === "degraded") ??
    serviceMapNodes[0]
  );
}

export function getServiceMapInspectorView(
  serviceId: string,
): ServiceMapInspectorView | undefined {
  const service =
    serviceMapNodes.find((node) => node.id === serviceId) ??
    getDefaultInspectedService();

  if (!service) {
    return undefined;
  }

  const cluster = serviceMapClusters.find((item) => item.id === service.clusterId);

  if (!cluster) {
    return undefined;
  }

  const upstreamHighlights = dependencyHighlights.filter(
    (highlight) =>
      highlight.sourceNodeId === service.id ||
      highlight.affectedServices.includes(service.name),
  );

  const downstreamServices = serviceMapNodes.filter((node) =>
    node.dependencies.includes(service.id),
  );

  return {
    service,
    cluster,
    upstreamHighlights,
    downstreamServices,
  };
}
