export type RequestUrgency = "low" | "normal" | "high" | "critical";
export type TriageOutcome = "accepted" | "deferred" | "escalated" | "rejected";
export type AssignmentStatus = "unassigned" | "in-progress" | "completed";

export interface IncomingRequest {
  id: string;
  title: string;
  requester: string;
  urgency: RequestUrgency;
  receivedAt: string;
  summary: string;
  category: string;
}

export interface TriageCard {
  id: string;
  requestId: string;
  reviewer: string;
  outcome: TriageOutcome;
  reviewedAt: string;
  notes: string;
}

export interface AssignmentEntry {
  id: string;
  requestTitle: string;
  assignee: string;
  status: AssignmentStatus;
  dueDate: string;
}

export interface IntakeDeskOverview {
  eyebrow: string;
  title: string;
  description: string;
  shiftWindow: string;
  queue: string;
}

export interface IntakeStat {
  label: string;
  value: string;
  detail: string;
}

export const intakeDeskOverview: IntakeDeskOverview = {
  eyebrow: "Intake Desk",
  title: "Triage incoming requests, review urgency, and track assignment progress.",
  description:
    "A centralized intake view for reviewing new requests, performing triage, and monitoring how work is distributed across the team.",
  shiftWindow: "2026-04-25 — Morning shift",
  queue: "Engineering support / Tier 2",
};

export const intakeStats: IntakeStat[] = [
  {
    label: "Pending requests",
    value: "6",
    detail: "Six incoming requests awaiting initial triage and assignment",
  },
  {
    label: "Triaged today",
    value: "4",
    detail: "Four requests reviewed and categorized during the current shift",
  },
  {
    label: "Active assignments",
    value: "5",
    detail: "Five work items currently assigned and in various stages of progress",
  },
];

export const incomingRequests: IncomingRequest[] = [
  {
    id: "req-001",
    title: "Database connection pool exhaustion",
    requester: "L. Nakamura",
    urgency: "critical",
    receivedAt: "2026-04-25 08:12 PDT",
    summary:
      "Production database connections are being exhausted during peak traffic. Connection pool size may need to be increased or leak investigation is required.",
    category: "Infrastructure",
  },
  {
    id: "req-002",
    title: "OAuth token refresh failing for SSO users",
    requester: "D. Okonkwo",
    urgency: "high",
    receivedAt: "2026-04-25 08:34 PDT",
    summary:
      "SSO users are being logged out every 15 minutes because token refresh is returning 401. Likely a misconfigured redirect URI after the last IdP rotation.",
    category: "Authentication",
  },
  {
    id: "req-003",
    title: "Add CSV export to analytics dashboard",
    requester: "M. Rivera",
    urgency: "normal",
    receivedAt: "2026-04-25 09:01 PDT",
    summary:
      "Product team needs the ability to export filtered analytics data as CSV for quarterly reviews. No current workaround available.",
    category: "Feature request",
  },
  {
    id: "req-004",
    title: "Staging environment SSL certificate expiring",
    requester: "K. Andersen",
    urgency: "high",
    receivedAt: "2026-04-25 09:15 PDT",
    summary:
      "The staging environment SSL certificate expires in 48 hours. Auto-renewal failed due to a DNS validation issue that needs manual intervention.",
    category: "Infrastructure",
  },
  {
    id: "req-005",
    title: "Onboarding docs link to deprecated API endpoints",
    requester: "T. Pham",
    urgency: "low",
    receivedAt: "2026-04-25 09:28 PDT",
    summary:
      "Several links in the developer onboarding guide point to v1 API endpoints that were retired last quarter. Needs a documentation sweep.",
    category: "Documentation",
  },
  {
    id: "req-006",
    title: "Webhook delivery retries not respecting backoff",
    requester: "R. Gupta",
    urgency: "normal",
    receivedAt: "2026-04-25 09:45 PDT",
    summary:
      "Webhook retries are firing at a fixed 1-second interval instead of using exponential backoff, causing downstream rate limiting for some integrators.",
    category: "Bug",
  },
];

export const triageCards: TriageCard[] = [
  {
    id: "triage-001",
    requestId: "req-001",
    reviewer: "S. Petrov",
    outcome: "escalated",
    reviewedAt: "2026-04-25 08:20 PDT",
    notes:
      "Connection pool exhaustion confirmed via metrics. Escalated to on-call SRE for immediate investigation. Temporary mitigation: restart affected pods.",
  },
  {
    id: "triage-002",
    requestId: "req-002",
    reviewer: "A. Reyes",
    outcome: "accepted",
    reviewedAt: "2026-04-25 08:50 PDT",
    notes:
      "Reproduced the token refresh failure in staging. Root cause is the redirect URI mismatch introduced in last week's IdP config update. Fix is straightforward.",
  },
  {
    id: "triage-003",
    requestId: "req-005",
    reviewer: "J. Okafor",
    outcome: "deferred",
    reviewedAt: "2026-04-25 09:40 PDT",
    notes:
      "Documentation updates are low urgency. Deferred to next sprint's documentation sweep. Added to the docs backlog tracker.",
  },
  {
    id: "triage-004",
    requestId: "req-003",
    reviewer: "S. Petrov",
    outcome: "accepted",
    reviewedAt: "2026-04-25 09:55 PDT",
    notes:
      "CSV export is a reasonable ask with clear business value. Scoped to filtered data only — full dataset export will need a separate background job.",
  },
];

export const assignmentEntries: AssignmentEntry[] = [
  {
    id: "assign-001",
    requestTitle: "Database connection pool exhaustion",
    assignee: "M. Chen",
    status: "in-progress",
    dueDate: "2026-04-25",
  },
  {
    id: "assign-002",
    requestTitle: "OAuth token refresh fix",
    assignee: "A. Reyes",
    status: "in-progress",
    dueDate: "2026-04-25",
  },
  {
    id: "assign-003",
    requestTitle: "CSV export — analytics dashboard",
    assignee: "T. Pham",
    status: "unassigned",
    dueDate: "2026-04-28",
  },
  {
    id: "assign-004",
    requestTitle: "Staging SSL certificate renewal",
    assignee: "K. Andersen",
    status: "completed",
    dueDate: "2026-04-25",
  },
  {
    id: "assign-005",
    requestTitle: "Webhook backoff implementation",
    assignee: "R. Gupta",
    status: "unassigned",
    dueDate: "2026-04-29",
  },
];
