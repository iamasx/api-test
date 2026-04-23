export type ExperimentStatus = "active" | "paused" | "completed" | "draft";

export type Owner = {
  id: string;
  name: string;
  team: string;
};

export type ResultSummary = {
  metric: string;
  baseline: number;
  current: number;
  unit: string;
};

export type Experiment = {
  id: string;
  title: string;
  hypothesis: string;
  status: ExperimentStatus;
  ownerId: string;
  startDate: string;
  endDate: string | null;
  tags: string[];
  results: ResultSummary[];
};

export const owners: Owner[] = [
  { id: "owner-1", name: "Amara Chen", team: "Growth" },
  { id: "owner-2", name: "Kai Nakamura", team: "Platform" },
  { id: "owner-3", name: "Priya Sharma", team: "Engagement" },
  { id: "owner-4", name: "Leo Martinez", team: "Infrastructure" },
];

export const experiments: Experiment[] = [
  {
    id: "exp-001",
    title: "Onboarding Flow Simplification",
    hypothesis:
      "Reducing onboarding steps from 5 to 3 will increase completion rate by 15%.",
    status: "active",
    ownerId: "owner-1",
    startDate: "2026-03-10",
    endDate: null,
    tags: ["onboarding", "conversion"],
    results: [
      { metric: "Completion rate", baseline: 62, current: 74, unit: "%" },
      { metric: "Time to complete", baseline: 4.2, current: 2.8, unit: "min" },
    ],
  },
  {
    id: "exp-002",
    title: "Cache-first API Strategy",
    hypothesis:
      "Serving cached responses for read-heavy endpoints will cut p95 latency by 40%.",
    status: "completed",
    ownerId: "owner-2",
    startDate: "2026-02-01",
    endDate: "2026-03-15",
    tags: ["performance", "api"],
    results: [
      { metric: "p95 latency", baseline: 320, current: 185, unit: "ms" },
      { metric: "Cache hit ratio", baseline: 0, current: 87, unit: "%" },
    ],
  },
  {
    id: "exp-003",
    title: "Push Notification Cadence Test",
    hypothesis:
      "Limiting push notifications to 2 per day will reduce opt-outs by 25%.",
    status: "paused",
    ownerId: "owner-3",
    startDate: "2026-03-20",
    endDate: null,
    tags: ["engagement", "notifications"],
    results: [
      { metric: "Opt-out rate", baseline: 8.3, current: 6.1, unit: "%" },
      { metric: "Open rate", baseline: 12, current: 11.4, unit: "%" },
    ],
  },
  {
    id: "exp-004",
    title: "Edge Worker Cold Start Reduction",
    hypothesis:
      "Pre-warming edge workers during low traffic windows will eliminate 90% of cold starts.",
    status: "active",
    ownerId: "owner-4",
    startDate: "2026-04-01",
    endDate: null,
    tags: ["infrastructure", "performance"],
    results: [
      { metric: "Cold starts / hr", baseline: 142, current: 18, unit: "count" },
      { metric: "Avg cold start time", baseline: 1.8, current: 1.7, unit: "s" },
    ],
  },
  {
    id: "exp-005",
    title: "Search Ranking Model v3",
    hypothesis:
      "A transformer-based ranking model will lift click-through rate by 10% over the current BM25 baseline.",
    status: "draft",
    ownerId: "owner-1",
    startDate: "2026-04-18",
    endDate: null,
    tags: ["search", "ml"],
    results: [],
  },
  {
    id: "exp-006",
    title: "Checkout Single-Page Redesign",
    hypothesis:
      "Merging cart review and payment into a single page will raise conversion by 8%.",
    status: "completed",
    ownerId: "owner-3",
    startDate: "2026-01-15",
    endDate: "2026-03-01",
    tags: ["conversion", "checkout"],
    results: [
      { metric: "Conversion rate", baseline: 3.1, current: 3.5, unit: "%" },
      { metric: "Cart abandonment", baseline: 68, current: 61, unit: "%" },
    ],
  },
  {
    id: "exp-007",
    title: "Dark Mode Engagement Lift",
    hypothesis:
      "Offering a system-aware dark mode will increase average session duration by 12%.",
    status: "active",
    ownerId: "owner-1",
    startDate: "2026-04-05",
    endDate: null,
    tags: ["engagement", "ui"],
    results: [
      { metric: "Avg session duration", baseline: 4.6, current: 5.1, unit: "min" },
      { metric: "Theme toggle rate", baseline: 0, current: 38, unit: "%" },
    ],
  },
  {
    id: "exp-008",
    title: "Batched Write Pipeline",
    hypothesis:
      "Batching database writes in 50ms windows will reduce write latency p99 by 35%.",
    status: "completed",
    ownerId: "owner-4",
    startDate: "2026-02-20",
    endDate: "2026-03-28",
    tags: ["infrastructure", "database"],
    results: [
      { metric: "Write latency p99", baseline: 420, current: 265, unit: "ms" },
      { metric: "Throughput", baseline: 1200, current: 1850, unit: "ops/s" },
    ],
  },
  {
    id: "exp-009",
    title: "Contextual Help Tooltips",
    hypothesis:
      "Adding contextual help tooltips to complex form fields will reduce support tickets by 20%.",
    status: "draft",
    ownerId: "owner-3",
    startDate: "2026-04-20",
    endDate: null,
    tags: ["ux", "support"],
    results: [],
  },
];

export type ExperimentView = Experiment & {
  owner: Owner;
};

export type RegistryView = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stats: {
    total: number;
    active: number;
    completed: number;
    paused: number;
    draft: number;
  };
  experiments: ExperimentView[];
};

export function getExperimentRegistryView(): RegistryView {
  const experimentViews: ExperimentView[] = experiments.map((exp) => ({
    ...exp,
    owner: owners.find((o) => o.id === exp.ownerId)!,
  }));

  return {
    hero: {
      eyebrow: "Experiment Registry",
      title: "Experiment Registry",
      description:
        "Track every experiment from hypothesis to results. Monitor status, ownership, and outcomes across all teams.",
    },
    stats: {
      total: experiments.length,
      active: experiments.filter((e) => e.status === "active").length,
      completed: experiments.filter((e) => e.status === "completed").length,
      paused: experiments.filter((e) => e.status === "paused").length,
      draft: experiments.filter((e) => e.status === "draft").length,
    },
    experiments: experimentViews,
  };
}
