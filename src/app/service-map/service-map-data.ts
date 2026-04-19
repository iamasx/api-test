export type ClusterHealth = "steady" | "watch" | "critical";
export type NodeStatus = "healthy" | "watch" | "critical";
export type LinkMode = "core" | "watch" | "buffered";

export type ServiceCluster = { id: string; name: string; owner: string; region: string; health: ClusterHealth; healthScore: number; summary: string; riskLabel: string; nodeIds: string[] };
export type ServiceNode = { id: string; clusterId: string; name: string; role: string; status: NodeStatus; latencyMs: number; traffic: string; onCall: string; summary: string; recentChange: string; inspectorNotes: string[] };
export type DependencyLink = { id: string; fromId: string; toId: string; mode: LinkMode; summary: string; volume: string; highlight: string };

export const serviceMapOverview = { healthMode: "Dependency Watch", generatedAt: "04:18 UTC", summary: "Six mocked services span three operational clusters with local focus, mute, and dependency highlighting controls." };

export const serviceClusters: ServiceCluster[] = [
  {
    id: "ingress-mesh", name: "Ingress Mesh", owner: "Gateway Squad", region: "us-east-1",
    health: "steady", healthScore: 97, riskLabel: "Signature replay watch",
    summary: "Protects public traffic, stamps session context, and limits fan-out blast radius.",
    nodeIds: ["edge-gateway", "session-router"],
  }, {
    id: "order-core", name: "Order Core", owner: "Commerce Runtime", region: "us-east-2",
    health: "watch", healthScore: 89, riskLabel: "Queue lag rising",
    summary: "Captures order intent and buffers settlement when downstream traffic stretches.",
    nodeIds: ["orders-api", "billing-queue"],
  }, {
    id: "fulfillment-fabric", name: "Fulfillment Fabric", owner: "Carrier Ops", region: "us-west-2",
    health: "watch", healthScore: 91, riskLabel: "Carrier retry budget",
    summary: "Turns confirmed orders into dispatch plans and customer-facing timeline updates.",
    nodeIds: ["dispatch-planner", "customer-timeline"],
  },
];

export const serviceNodes: ServiceNode[] = [
  {
    id: "edge-gateway", clusterId: "ingress-mesh", name: "Edge Gateway", role: "Public ingress",
    status: "healthy", latencyMs: 18, traffic: "12.4k rpm", onCall: "Gateway primary",
    summary: "Terminates partner traffic and injects tenant headers before internal fan-out.",
    recentChange: "Certificate bundle rotated 18 minutes ago.",
    inspectorNotes: ["Replay threshold is elevated but below paging.", "Fallback WAF policy is warm."],
  }, {
    id: "session-router", clusterId: "ingress-mesh", name: "Session Router", role: "Context broker",
    status: "watch", latencyMs: 31, traffic: "8.9k rpm", onCall: "Gateway secondary",
    summary: "Maps partner tokens to workspace context and fans reads into order services.",
    recentChange: "Rate-limit tables reloaded after a partner surge test.",
    inspectorNotes: ["Cold-start variance widened in the last fifteen minutes.", "Sticky-session fallback stays off."],
  }, {
    id: "orders-api", clusterId: "order-core", name: "Orders API", role: "Intent aggregator",
    status: "watch", latencyMs: 56, traffic: "6.3k rpm", onCall: "Checkout lead",
    summary: "Normalizes order intent and coordinates settlement plus dispatch workflows.",
    recentChange: "Write path now samples duplicate partner receipts.",
    inspectorNotes: ["P95 latency is driven by cross-cluster dispatch confirmation.", "Fallback write queue is armed."],
  }, {
    id: "billing-queue", clusterId: "order-core", name: "Billing Queue", role: "Settlement buffer",
    status: "critical", latencyMs: 94, traffic: "2.2k msgs", onCall: "Payments rotation",
    summary: "Buffers settlement work when payment confirmation is slower than order assembly.",
    recentChange: "Consumer lag climbed after carrier retries doubled.",
    inspectorNotes: ["Lag is isolated to deferred settlement messages.", "Draining it would reduce timeline freshness."],
  }, {
    id: "dispatch-planner", clusterId: "fulfillment-fabric", name: "Dispatch Planner", role: "Route composer",
    status: "healthy", latencyMs: 34, traffic: "3.8k rpm", onCall: "Fulfillment desk",
    summary: "Builds dispatch plans from confirmed orders and publishes route intent.",
    recentChange: "Planner weights now favor regional consolidation.",
    inspectorNotes: ["Carrier preference scores remain stable.", "Manual override lane is hot-shipment only."],
  }, {
    id: "customer-timeline", clusterId: "fulfillment-fabric", name: "Customer Timeline", role: "Status projection",
    status: "healthy", latencyMs: 23, traffic: "9.4k rpm", onCall: "Experience ops",
    summary: "Projects fulfillment state back into customer-facing order history.",
    recentChange: "Status cards gained a delayed-shipment fallback label.",
    inspectorNotes: ["Outbound notification fan-out is muted in this route.", "Freshness remains inside budget."],
  },
];

export const dependencyLinks: DependencyLink[] = [
  { id: "edge-session", fromId: "edge-gateway", toId: "session-router", mode: "core", summary: "Ingress requests are signed, normalized, and handed to the context broker.", volume: "4.8k rpm", highlight: "Primary auth handoff" },
  { id: "session-orders", fromId: "session-router", toId: "orders-api", mode: "watch", summary: "Session context opens the order write path after token mapping settles.", volume: "3.6k rpm", highlight: "Elevated read-to-write latency" },
  { id: "billing-timeline", fromId: "billing-queue", toId: "customer-timeline", mode: "buffered", summary: "Deferred settlement events hold timeline updates until payment is safe to reveal.", volume: "420 msgs", highlight: "Buffered customer state" },
  { id: "orders-dispatch", fromId: "orders-api", toId: "dispatch-planner", mode: "core", summary: "Committed orders move into dispatch planning as soon as payment intent is durable.", volume: "1.8k rpm", highlight: "Cross-cluster commit" },
  { id: "dispatch-timeline", fromId: "dispatch-planner", toId: "customer-timeline", mode: "core", summary: "Route plans refresh the customer timeline before carrier confirmations land.", volume: "1.1k rpm", highlight: "Visible fulfillment path" },
];
