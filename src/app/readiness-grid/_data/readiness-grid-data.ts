export type ReadinessLevel = "ready" | "partial" | "blocked" | "not-started";

export interface ReadinessTile {
  id: string;
  area: string;
  level: ReadinessLevel;
  owner: string;
  completedChecks: number;
  totalChecks: number;
  summary: string;
}

export interface DependencyNote {
  id: string;
  source: string;
  target: string;
  status: "resolved" | "pending" | "at-risk";
  note: string;
}

export interface ProgressEntry {
  id: string;
  label: string;
  current: number;
  total: number;
}

export interface ReadinessGridOverview {
  eyebrow: string;
  title: string;
  description: string;
  reviewWindow: string;
  scope: string;
}

export interface ReadinessStat {
  label: string;
  value: string;
  detail: string;
}

export const readinessGridOverview: ReadinessGridOverview = {
  eyebrow: "Readiness Grid",
  title: "Track launch readiness across every workstream before the go-live window.",
  description:
    "A consolidated view of readiness tiles, dependency notes, and progress strips that helps teams identify blockers and confirm go/no-go status ahead of critical milestones.",
  reviewWindow: "Q2 2026 — Launch gate 3",
  scope: "Platform / all workstreams",
};

export const readinessStats: ReadinessStat[] = [
  {
    label: "Workstreams tracked",
    value: "6",
    detail: "Auth, payments, notifications, data pipeline, monitoring, and docs",
  },
  {
    label: "Dependencies logged",
    value: "5",
    detail: "Three resolved, one pending, and one at-risk requiring escalation",
  },
  {
    label: "Overall progress",
    value: "68%",
    detail: "Combined completion across all tracked workstreams and their check items",
  },
];

export const readinessTiles: ReadinessTile[] = [
  {
    id: "tile-auth",
    area: "Authentication",
    level: "ready",
    owner: "Identity team",
    completedChecks: 8,
    totalChecks: 8,
    summary:
      "OAuth2 flows verified, session handling audited, and SSO integration confirmed across all tenants.",
  },
  {
    id: "tile-payments",
    area: "Payment processing",
    level: "partial",
    owner: "Billing squad",
    completedChecks: 5,
    totalChecks: 7,
    summary:
      "Stripe integration live, webhook retries tested. Remaining: currency conversion edge cases and refund idempotency.",
  },
  {
    id: "tile-notifications",
    area: "Notifications",
    level: "ready",
    owner: "Comms platform",
    completedChecks: 6,
    totalChecks: 6,
    summary:
      "Email, push, and in-app channels verified. Rate limiting and preference center tested end-to-end.",
  },
  {
    id: "tile-pipeline",
    area: "Data pipeline",
    level: "blocked",
    owner: "Data engineering",
    completedChecks: 3,
    totalChecks: 9,
    summary:
      "Ingestion layer stable, but the transform stage is blocked on schema migration approval from the compliance team.",
  },
  {
    id: "tile-monitoring",
    area: "Monitoring",
    level: "partial",
    owner: "SRE team",
    completedChecks: 4,
    totalChecks: 6,
    summary:
      "Alerting rules deployed, dashboards built. Remaining: runbook reviews and on-call rotation confirmation.",
  },
  {
    id: "tile-docs",
    area: "Documentation",
    level: "not-started",
    owner: "Tech writing",
    completedChecks: 0,
    totalChecks: 5,
    summary:
      "API reference and migration guide are pending. Work is scheduled to begin once endpoint contracts are finalized.",
  },
];

export const dependencyNotes: DependencyNote[] = [
  {
    id: "dep-001",
    source: "Payment processing",
    target: "Authentication",
    status: "resolved",
    note: "Payments now receives verified identity tokens after the SSO rollout completed last sprint.",
  },
  {
    id: "dep-002",
    source: "Data pipeline",
    target: "Payment processing",
    status: "at-risk",
    note: "Transform stage needs finalized transaction schema from billing. Blocked until currency conversion is settled.",
  },
  {
    id: "dep-003",
    source: "Monitoring",
    target: "Data pipeline",
    status: "pending",
    note: "Pipeline health metrics are instrumented but alerting thresholds await the new ingestion throughput baseline.",
  },
  {
    id: "dep-004",
    source: "Notifications",
    target: "Authentication",
    status: "resolved",
    note: "Notification delivery now respects per-user auth scopes after the permission model update.",
  },
  {
    id: "dep-005",
    source: "Documentation",
    target: "Payment processing",
    status: "pending",
    note: "API reference for billing endpoints cannot be finalized until refund idempotency contracts are locked.",
  },
];

export const progressEntries: ProgressEntry[] = [
  { id: "prog-auth", label: "Authentication", current: 8, total: 8 },
  { id: "prog-payments", label: "Payment processing", current: 5, total: 7 },
  { id: "prog-notifications", label: "Notifications", current: 6, total: 6 },
  { id: "prog-pipeline", label: "Data pipeline", current: 3, total: 9 },
  { id: "prog-monitoring", label: "Monitoring", current: 4, total: 6 },
  { id: "prog-docs", label: "Documentation", current: 0, total: 5 },
];
