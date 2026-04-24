export type PolicyStatus = "active" | "under-review" | "deprecated";
export type ComplianceLevel = "compliant" | "partial" | "non-compliant";
export type NotePriority = "info" | "action" | "warning";

export interface Policy {
  id: string;
  name: string;
  status: PolicyStatus;
  category: string;
  effectiveDate: string;
  owner: string;
  summary: string;
}

export interface ComplianceNote {
  id: string;
  author: string;
  timestamp: string;
  body: string;
  priority: NotePriority;
}

export interface ReviewSummary {
  label: string;
  value: string;
  detail: string;
}

export interface PolicyBoardOverview {
  eyebrow: string;
  title: string;
  description: string;
  reviewCycle: string;
  scope: string;
}

export const policyBoardOverview: PolicyBoardOverview = {
  eyebrow: "Policy Board",
  title: "Track active policies, compliance status, and review summaries in one place.",
  description:
    "A centralized view of organizational policies, compliance notes from auditors and stakeholders, and a compact summary of the latest review cycle.",
  reviewCycle: "Q2 2026 — Review 3",
  scope: "Engineering & Data divisions",
};

export const reviewSummaries: ReviewSummary[] = [
  {
    label: "Active policies",
    value: "5",
    detail: "Covering data retention, access control, incident response, change management, and vendor risk",
  },
  {
    label: "Compliance notes",
    value: "4",
    detail: "Two action items, one warning, and one informational note from the latest audit cycle",
  },
  {
    label: "Next review deadline",
    value: "May 12",
    detail: "All policy owners must submit updated compliance evidence before the review window closes",
  },
];

export const policies: Policy[] = [
  {
    id: "pol-data-retention",
    name: "Data Retention Policy",
    status: "active",
    category: "Data governance",
    effectiveDate: "2025-01-15",
    owner: "Data Platform team",
    summary:
      "Defines retention periods for all data classes. Production logs are retained for 90 days, analytics data for 2 years, and PII is purged within 30 days of account closure.",
  },
  {
    id: "pol-access-control",
    name: "Access Control Policy",
    status: "active",
    category: "Security",
    effectiveDate: "2024-11-01",
    owner: "Security engineering",
    summary:
      "Enforces least-privilege access across all internal systems. Role-based access is reviewed quarterly, and elevated permissions require manager approval with a 72-hour expiry.",
  },
  {
    id: "pol-incident-response",
    name: "Incident Response Policy",
    status: "under-review",
    category: "Operations",
    effectiveDate: "2025-03-10",
    owner: "SRE team",
    summary:
      "Outlines escalation paths, severity classifications, and post-incident review timelines. Currently under review to add requirements for customer notification within 4 hours of SEV-1 incidents.",
  },
  {
    id: "pol-change-mgmt",
    name: "Change Management Policy",
    status: "active",
    category: "Operations",
    effectiveDate: "2025-06-01",
    owner: "Release engineering",
    summary:
      "Requires all production changes to pass through a staged rollout with automated canary analysis. Emergency hotfixes must be retroactively documented within 24 hours.",
  },
  {
    id: "pol-vendor-risk",
    name: "Vendor Risk Assessment Policy",
    status: "deprecated",
    category: "Compliance",
    effectiveDate: "2023-08-20",
    owner: "Legal & compliance",
    summary:
      "Legacy vendor evaluation framework. Replaced by the updated third-party risk management policy. Retained for reference on contracts signed before 2025.",
  },
];

export const complianceNotes: ComplianceNote[] = [
  {
    id: "cn-001",
    author: "R. Nakamura",
    timestamp: "2026-04-25 10:30 PDT",
    body: "Data retention evidence for Q1 has been uploaded. Two edge cases around ephemeral processing logs still need clarification from the data platform team.",
    priority: "action",
  },
  {
    id: "cn-002",
    author: "L. Fernandez",
    timestamp: "2026-04-25 09:15 PDT",
    body: "Access control audit flagged three service accounts with elevated permissions that haven't been rotated in over 90 days. Escalating to security engineering.",
    priority: "warning",
  },
  {
    id: "cn-003",
    author: "D. Kim",
    timestamp: "2026-04-24 16:45 PDT",
    body: "Incident response policy revision is on track. Draft includes the new customer notification SLA. Expecting final sign-off by May 5.",
    priority: "info",
  },
  {
    id: "cn-004",
    author: "T. Okonkwo",
    timestamp: "2026-04-24 14:20 PDT",
    body: "Change management compliance check for April deployments is complete. All 23 production changes followed the staged rollout process with no exceptions.",
    priority: "action",
  },
];
