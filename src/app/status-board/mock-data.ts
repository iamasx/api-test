export type BoardTone = "healthy" | "watch" | "degraded" | "failover";
export type ChecklistPhase = "Stabilize" | "Reroute" | "Validate";
export type StatusBoardSummary = { id: string; label: string; value: string; note: string; tone: BoardTone };
export type StatusBoardRegion = { id: string; name: string; code: string; city: string; status: BoardTone; latencyMs: number; latencyDeltaMs: number; trafficShare: number; incidents: number; summary: string };
export type StatusBoardDependency = { id: string; service: string; owner: string; status: BoardTone; primaryRegion: string; backupRegion: string; regionIds: string[]; p95LatencyMs: number; errorRate: number; since: string };
export type FailoverChecklistItem = { id: string; title: string; owner: string; phase: ChecklistPhase; detail: string; required: boolean; defaultDone: boolean };
export type StatusBoardSnapshot = { boardState: string; environment: string; lastUpdated: Date; summaryCards: StatusBoardSummary[]; regions: StatusBoardRegion[]; dependencies: StatusBoardDependency[]; checklist: FailoverChecklistItem[] };

type RegionRow = readonly [string, string, string, string, BoardTone, number, number, number, number, string];
type DependencyRow = readonly [string, string, string, BoardTone, string, string, string[], number, number, string];
type ChecklistRow = readonly [string, string, string, ChecklistPhase, string, boolean, boolean];

const regionRows: RegionRow[] = [
  ["us-east", "US East", "IAD", "Ashburn", "healthy", 46, -5, 42, 0, "Primary ingress and token minting remain inside latency targets."],
  ["eu-west", "EU West", "DUB", "Dublin", "watch", 68, 11, 24, 1, "Cache pressure is contained, but replay traffic is still elevated."],
  ["ap-south", "AP South", "BOM", "Mumbai", "healthy", 61, 3, 18, 0, "Background queue replay has settled without affecting customer APIs."],
  ["sa-east", "SA East", "GRU", "Sao Paulo", "failover", 94, 18, 16, 2, "Backup replicas are warm while writes remain pinned to the secondary lane."],
];
const dependencyRows: DependencyRow[] = [
  ["edge-api", "Edge API", "Platform", "healthy", "IAD", "DUB", ["us-east", "eu-west"], 118, 0.19, "14m"],
  ["auth-mesh", "Auth Mesh", "Identity", "degraded", "DUB", "IAD", ["us-east", "eu-west", "sa-east"], 183, 1.62, "37m"],
  ["session-cache", "Session Cache", "Runtime", "failover", "GRU", "IAD", ["us-east", "sa-east"], 209, 0.84, "52m"],
  ["payments-queue", "Payments Queue", "Ledger", "watch", "BOM", "IAD", ["ap-south", "us-east"], 144, 0.47, "19m"],
  ["notification-fanout", "Notification Fanout", "Comms", "healthy", "IAD", "BOM", ["us-east", "ap-south", "eu-west"], 101, 0.11, "8m"],
];
const checklistRows: ChecklistRow[] = [
  ["freeze-routing", "Freeze cross-region routing changes", "Platform", "Stabilize", "Pause automation before capacity shifts widen blast radius.", true, true],
  ["confirm-capacity", "Confirm backup capacity reservations", "Infrastructure", "Stabilize", "Verify spare compute headroom is held in the backup region.", true, true],
  ["pin-stateful-writes", "Pin stateful writes to the safest region", "Data", "Reroute", "Keep write-heavy paths on the most stable replica set until lag clears.", true, false],
  ["drain-cold-lanes", "Drain cold lanes before promoting traffic", "Network", "Reroute", "Empty stale edge queues so retries do not arrive out of order.", false, false],
  ["verify-health-checks", "Validate public health checks from backup ingress", "SRE", "Validate", "Confirm probe locations outside the primary region can still pass end to end.", true, false],
  ["note-handover", "Log handover owner and rollback gate", "Incident", "Validate", "Record who can revert traffic and the metric needed to close the drill.", false, true],
];

const baseRegions = regionRows.map(([id, name, code, city, status, latencyMs, latencyDeltaMs, trafficShare, incidents, summary]) => ({ id, name, code, city, status, latencyMs, latencyDeltaMs, trafficShare, incidents, summary }));
const baseDependencies = dependencyRows.map(([id, service, owner, status, primaryRegion, backupRegion, regionIds, p95LatencyMs, errorRate, since]) => ({ id, service, owner, status, primaryRegion, backupRegion, regionIds, p95LatencyMs, errorRate, since }));
const baseChecklist = checklistRows.map(([id, title, owner, phase, detail, required, defaultDone]) => ({ id, title, owner, phase, detail, required, defaultDone }));
const swingMetric = (cycle: number, seed: number, step: number) => (((cycle + seed) % 3) - 1) * step;

export function buildStatusBoardSnapshot(cycle: number, now: Date): StatusBoardSnapshot {
  const regions = baseRegions.map((region, index) => ({
    ...region,
    status: region.id === "sa-east" && cycle % 2 === 1 ? "watch" : region.status,
    latencyMs: region.latencyMs + swingMetric(cycle, index + 1, 4),
    latencyDeltaMs: region.latencyDeltaMs + swingMetric(cycle, index + 4, 3),
  }));
  const dependencies = baseDependencies.map((dependency, index) => ({
    ...dependency,
    status:
      dependency.id === "auth-mesh" && cycle % 2 === 1
        ? "watch"
        : dependency.id === "session-cache" && cycle % 3 === 2
          ? "watch"
          : dependency.status,
    p95LatencyMs: dependency.p95LatencyMs + swingMetric(cycle, index + 2, 6),
    errorRate: Number((dependency.errorRate + swingMetric(cycle, index + 6, 0.08)).toFixed(2)),
  }));
  const elevatedRegions = regions.filter((region) => region.status !== "healthy").length;
  const attentionDependencies = dependencies.filter((dependency) => dependency.status !== "healthy").length;
  const primaryTrafficShare = regions.filter((region) => region.status !== "failover").reduce((sum, region) => sum + region.trafficShare, 0);
  const completedCount = baseChecklist.filter((item) => item.defaultDone).length;
  const requiredOutstanding = baseChecklist.filter((item) => item.required && !item.defaultDone).length;

  return {
    boardState: elevatedRegions > 1 ? "Regional failover watch" : "Regional posture nominal",
    environment: "Production mirror",
    lastUpdated: new Date(now.getTime() + cycle * 60_000),
    summaryCards: [
      { id: "regional-slo", label: "Regions within target", value: `${regions.length - elevatedRegions}/${regions.length}`, note: `${elevatedRegions} elevated regional lanes`, tone: elevatedRegions > 1 ? "watch" : "healthy" },
      { id: "traffic", label: "Traffic on primary path", value: `${primaryTrafficShare}%`, note: `${100 - primaryTrafficShare}% pinned to backup lanes`, tone: primaryTrafficShare < 90 ? "watch" : "healthy" },
      { id: "dependencies", label: "Dependencies needing action", value: String(attentionDependencies), note: `${dependencies.filter((item) => item.status === "failover").length} in assisted failover`, tone: attentionDependencies > 2 ? "degraded" : "watch" },
      { id: "checklist", label: "Checklist pre-cleared", value: `${completedCount}/${baseChecklist.length}`, note: `${requiredOutstanding} required steps still open`, tone: requiredOutstanding === 0 ? "healthy" : "watch" },
    ],
    regions,
    dependencies,
    checklist: baseChecklist,
  };
}
