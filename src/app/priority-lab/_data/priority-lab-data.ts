export type RankTier = "critical" | "high" | "medium" | "low";
export type SignalStrength = "strong" | "moderate" | "weak";

export interface RankedItem {
  id: string;
  rank: number;
  title: string;
  tier: RankTier;
  score: string;
  owner: string;
  summary: string;
}

export interface ComparisonNote {
  id: string;
  author: string;
  timestamp: string;
  body: string;
  verdict: "promote" | "hold" | "demote";
}

export interface SignalEntry {
  id: string;
  label: string;
  strength: SignalStrength;
  value: string;
  detail: string;
}

export interface PriorityLabOverview {
  eyebrow: string;
  title: string;
  description: string;
  reviewCycle: string;
  scope: string;
}

export interface PriorityLabStat {
  label: string;
  value: string;
  detail: string;
}

export const priorityLabOverview: PriorityLabOverview = {
  eyebrow: "Priority Lab",
  title: "Rank work items, compare trade-offs, and surface the signals that drive sequencing decisions.",
  description:
    "A focused workspace for reviewing ranked priorities, recording comparison rationale, and tracking the signal inputs that influence what ships next.",
  reviewCycle: "Q2 2026 — Week 17",
  scope: "Platform / Growth track",
};

export const priorityLabStats: PriorityLabStat[] = [
  {
    label: "Ranked items",
    value: "6",
    detail: "Six work items currently scored and ordered by weighted priority across impact, effort, and urgency",
  },
  {
    label: "Comparison notes",
    value: "4",
    detail: "Four recorded trade-off assessments from the most recent prioritization session",
  },
  {
    label: "Active signals",
    value: "5",
    detail: "Five signal sources feeding into the ranking model, from customer escalations to deployment risk",
  },
];

export const rankedItems: RankedItem[] = [
  {
    id: "item-001",
    rank: 1,
    title: "Migrate auth tokens to short-lived sessions",
    tier: "critical",
    score: "94",
    owner: "Security team",
    summary:
      "Compliance deadline in three weeks. Long-lived tokens are the top finding in the latest audit. Blocking two downstream integrations.",
  },
  {
    id: "item-002",
    rank: 2,
    title: "Reduce P95 latency on order-submit endpoint",
    tier: "critical",
    score: "89",
    owner: "API platform",
    summary:
      "Latency regression introduced in v3.8 is causing timeout cascades during peak traffic. Customer-facing SLA is at risk.",
  },
  {
    id: "item-003",
    rank: 3,
    title: "Ship onboarding checklist v2",
    tier: "high",
    score: "76",
    owner: "Growth team",
    summary:
      "Activation rate dropped 4% after the last flow change. The revised checklist addresses the three highest-friction steps.",
  },
  {
    id: "item-004",
    rank: 4,
    title: "Add regional failover for notification service",
    tier: "high",
    score: "72",
    owner: "Reliability SRE",
    summary:
      "Single-region deployment has caused two P1 incidents this quarter. Failover routing is scoped and ready for review.",
  },
  {
    id: "item-005",
    rank: 5,
    title: "Consolidate admin settings into unified panel",
    tier: "medium",
    score: "58",
    owner: "Internal tools",
    summary:
      "Settings are spread across four surfaces. Consolidation reduces support tickets and unblocks the permissions overhaul.",
  },
  {
    id: "item-006",
    rank: 6,
    title: "Update dependency tree for React 19 compatibility",
    tier: "low",
    score: "41",
    owner: "Frontend infra",
    summary:
      "No breaking changes yet, but three transitive deps have published React 19 adapters. Low urgency, high future leverage.",
  },
];

export const comparisonNotes: ComparisonNote[] = [
  {
    id: "cmp-001",
    author: "L. Nakamura",
    timestamp: "2026-04-25 10:30 PDT",
    body: "Auth migration jumps ahead of latency fix because the compliance deadline is immovable. Latency is painful but has a workaround via client-side retry budgets.",
    verdict: "promote",
  },
  {
    id: "cmp-002",
    author: "R. Fernandez",
    timestamp: "2026-04-25 09:15 PDT",
    body: "Onboarding checklist v2 stays above failover work. Activation impact is measurable this sprint, while failover has a longer payoff horizon.",
    verdict: "hold",
  },
  {
    id: "cmp-003",
    author: "T. Abrams",
    timestamp: "2026-04-24 16:45 PDT",
    body: "Admin panel consolidation was ranked higher last week but the permissions dependency pushed it down. Revisit once the auth migration lands.",
    verdict: "demote",
  },
  {
    id: "cmp-004",
    author: "K. Johal",
    timestamp: "2026-04-24 14:10 PDT",
    body: "React 19 dep update stays at the bottom. No customer impact, no blocking path. Good candidate for a hack-day slot if one opens up.",
    verdict: "hold",
  },
];

export const signalEntries: SignalEntry[] = [
  {
    id: "sig-001",
    label: "Customer escalations",
    strength: "strong",
    value: "12 open",
    detail: "Escalations tied to auth and latency issues account for 80% of this week's volume.",
  },
  {
    id: "sig-002",
    label: "Deployment risk",
    strength: "moderate",
    value: "Medium",
    detail: "Auth migration touches shared middleware. Staged rollout plan is in place but adds two days.",
  },
  {
    id: "sig-003",
    label: "Revenue impact",
    strength: "strong",
    value: "$140k ARR",
    detail: "Three enterprise accounts flagged latency as a renewal blocker in QBR notes.",
  },
  {
    id: "sig-004",
    label: "Team capacity",
    strength: "weak",
    value: "72%",
    detail: "Two engineers on PTO next week. Parallel work on items 3 and 4 will need to serialize.",
  },
  {
    id: "sig-005",
    label: "Compliance deadline",
    strength: "strong",
    value: "May 16",
    detail: "SOC 2 audit window opens May 16. Auth token changes must be in production before that date.",
  },
];
