/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ExceptionStatus = "urgent" | "pending" | "resolved";

export interface ExceptionOwner {
  id: string;
  name: string;
  role: string;
}

export interface ResolutionHint {
  id: string;
  label: string;
  description: string;
  applicableTo: ExceptionStatus[];
}

export interface ExceptionCase {
  id: string;
  title: string;
  description: string;
  status: ExceptionStatus;
  owner: ExceptionOwner;
  createdAt: string;
  resolutionHintId: string;
  tags: string[];
}

export interface ExceptionGroup {
  status: ExceptionStatus;
  label: string;
  cases: ExceptionCase[];
}

export interface FollowUpItem {
  id: string;
  action: string;
  assignee: string;
  dueDate: string;
  relatedExceptionId: string;
}

export interface ExceptionBoardView {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  groups: ExceptionGroup[];
  resolutionHints: ResolutionHint[];
  followUps: FollowUpItem[];
  summaryCounts: { label: string; value: number; status: ExceptionStatus }[];
}

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */

const owners: ExceptionOwner[] = [
  { id: "own-1", name: "Priya Mehta", role: "Platform Lead" },
  { id: "own-2", name: "Carlos Rivera", role: "Oncall Engineer" },
  { id: "own-3", name: "Aisha Okonkwo", role: "Data Ops Manager" },
  { id: "own-4", name: "Jordan Lee", role: "SRE" },
  { id: "own-5", name: "Sam Nakamura", role: "Backend Engineer" },
];

const resolutionHints: ResolutionHint[] = [
  {
    id: "hint-1",
    label: "Retry with exponential backoff",
    description:
      "Transient failures often clear after a short delay. Configure retry logic with a 2x backoff up to 30 seconds before escalating.",
    applicableTo: ["urgent", "pending"],
  },
  {
    id: "hint-2",
    label: "Validate upstream schema",
    description:
      "Schema drift between services causes silent failures. Run the schema diff tool against the latest upstream contract.",
    applicableTo: ["urgent", "pending"],
  },
  {
    id: "hint-3",
    label: "Check rate-limit headers",
    description:
      "Third-party APIs may throttle without returning errors. Inspect the X-RateLimit-Remaining header on recent responses.",
    applicableTo: ["pending"],
  },
  {
    id: "hint-4",
    label: "Confirm deployment rollback",
    description:
      "If the exception correlates with a recent deploy, verify the rollback completed and all pods are healthy.",
    applicableTo: ["urgent"],
  },
  {
    id: "hint-5",
    label: "Archive after post-mortem",
    description:
      "Resolved exceptions should be archived only after the post-mortem document is linked and action items are tracked.",
    applicableTo: ["resolved"],
  },
];

const cases: ExceptionCase[] = [
  {
    id: "exc-1",
    title: "Payment gateway timeout",
    description:
      "Checkout flow fails intermittently when the payment provider responds after the 8-second timeout window.",
    status: "urgent",
    owner: owners[1],
    createdAt: "2026-04-21T09:14:00Z",
    resolutionHintId: "hint-1",
    tags: ["payments", "timeout", "checkout"],
  },
  {
    id: "exc-2",
    title: "Inventory sync schema mismatch",
    description:
      "Warehouse API changed the SKU field format from string to object, causing deserialization errors in the sync pipeline.",
    status: "urgent",
    owner: owners[0],
    createdAt: "2026-04-20T16:38:00Z",
    resolutionHintId: "hint-2",
    tags: ["inventory", "schema", "pipeline"],
  },
  {
    id: "exc-3",
    title: "Email delivery rate-limited",
    description:
      "Transactional email provider is throttling sends during peak hours, delaying order confirmations by up to 12 minutes.",
    status: "pending",
    owner: owners[2],
    createdAt: "2026-04-19T11:05:00Z",
    resolutionHintId: "hint-3",
    tags: ["email", "rate-limit", "notifications"],
  },
  {
    id: "exc-4",
    title: "Search index stale after deploy",
    description:
      "Product search returns outdated results after the last deployment. Reindex job appears to have been skipped.",
    status: "pending",
    owner: owners[3],
    createdAt: "2026-04-18T14:22:00Z",
    resolutionHintId: "hint-4",
    tags: ["search", "deploy", "indexing"],
  },
  {
    id: "exc-5",
    title: "Duplicate webhook deliveries",
    description:
      "Partner integration receives the same event payload twice, causing double-processing on their side.",
    status: "pending",
    owner: owners[4],
    createdAt: "2026-04-17T08:50:00Z",
    resolutionHintId: "hint-1",
    tags: ["webhooks", "duplicates", "integrations"],
  },
  {
    id: "exc-6",
    title: "Auth token refresh loop",
    description:
      "Mobile clients enter a refresh loop when the session token expires during a background sync, causing elevated API load.",
    status: "urgent",
    owner: owners[3],
    createdAt: "2026-04-22T07:30:00Z",
    resolutionHintId: "hint-4",
    tags: ["auth", "mobile", "session"],
  },
  {
    id: "exc-7",
    title: "CSV export memory spike",
    description:
      "Large report exports exceed container memory limits. Root cause identified as unbounded row buffering — fixed in v2.4.1.",
    status: "resolved",
    owner: owners[0],
    createdAt: "2026-04-15T10:12:00Z",
    resolutionHintId: "hint-5",
    tags: ["exports", "memory", "reports"],
  },
  {
    id: "exc-8",
    title: "Geo-routing fallback failure",
    description:
      "CDN geo-routing fell back to the US-East origin for APAC traffic. Configuration corrected and verified across all edge nodes.",
    status: "resolved",
    owner: owners[1],
    createdAt: "2026-04-14T18:45:00Z",
    resolutionHintId: "hint-5",
    tags: ["cdn", "routing", "infrastructure"],
  },
];

const followUps: FollowUpItem[] = [
  {
    id: "fu-1",
    action: "Increase payment gateway timeout to 12 seconds",
    assignee: "Carlos Rivera",
    dueDate: "2026-04-25",
    relatedExceptionId: "exc-1",
  },
  {
    id: "fu-2",
    action: "Add schema validation layer to inventory sync",
    assignee: "Priya Mehta",
    dueDate: "2026-04-28",
    relatedExceptionId: "exc-2",
  },
  {
    id: "fu-3",
    action: "Negotiate higher rate limit with email provider",
    assignee: "Aisha Okonkwo",
    dueDate: "2026-04-30",
    relatedExceptionId: "exc-3",
  },
  {
    id: "fu-4",
    action: "Add reindex step to deploy pipeline",
    assignee: "Jordan Lee",
    dueDate: "2026-04-26",
    relatedExceptionId: "exc-4",
  },
  {
    id: "fu-5",
    action: "Implement idempotency keys for webhook delivery",
    assignee: "Sam Nakamura",
    dueDate: "2026-05-02",
    relatedExceptionId: "exc-5",
  },
];

/* ------------------------------------------------------------------ */
/*  View builder                                                       */
/* ------------------------------------------------------------------ */

function groupByStatus(items: ExceptionCase[]): ExceptionGroup[] {
  const statusConfig: { status: ExceptionStatus; label: string }[] = [
    { status: "urgent", label: "Urgent" },
    { status: "pending", label: "Pending" },
    { status: "resolved", label: "Resolved" },
  ];

  return statusConfig.map(({ status, label }) => ({
    status,
    label,
    cases: items.filter((c) => c.status === status),
  }));
}

export function getExceptionBoardView(): ExceptionBoardView {
  const groups = groupByStatus(cases);

  return {
    hero: {
      eyebrow: "Exception Board",
      title: "Grouped exceptions, clear next steps",
      description:
        "All open exception cases organized by type, with resolution hints and follow-up actions to keep the team moving.",
    },
    groups,
    resolutionHints,
    followUps,
    summaryCounts: groups.map((g) => ({
      label: g.label,
      value: g.cases.length,
      status: g.status,
    })),
  };
}
