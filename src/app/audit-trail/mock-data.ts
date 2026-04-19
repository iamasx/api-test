export type ReviewState =
  | "pending"
  | "approved"
  | "watch"
  | "changes-requested";

export type CategoryTag = {
  id: string;
  label: string;
};

export type ReviewFlag = {
  id: string;
  label: string;
  description: string;
  tone: "amber" | "rose" | "sky" | "emerald";
};

export type Reviewer = {
  id: string;
  name: string;
  initials: string;
};

export type ChangeRecord = {
  id: string;
  title: string;
  service: string;
  categoryId: string;
  reviewState: ReviewState;
  actor: string;
  changedAt: string;
  diffLabel: string;
  summary: string;
  reviewerIds: string[];
  suggestedFlagIds: string[];
};

export const categoryTags: CategoryTag[] = [
  { id: "access", label: "Access" }, { id: "schema", label: "Schema" }, { id: "policy", label: "Policy" },
  { id: "integrity", label: "Integrity" }, { id: "workflow", label: "Workflow" },
];

export const reviewFlags: ReviewFlag[] = [
  { id: "signoff", label: "Missing sign-off", description: "Split ownership or incomplete reviewer confirmation.", tone: "rose" },
  { id: "timing", label: "Timing window", description: "Expiry dates and rollout windows deserve a second pass.", tone: "amber" },
  { id: "blast-radius", label: "Blast radius", description: "Downstream consumers will feel the change immediately.", tone: "sky" },
  { id: "manual", label: "Manual follow-up", description: "Backfills or operator notes still need local tracking.", tone: "emerald" },
];

export const reviewers: Reviewer[] = [
  { id: "lara", name: "Lara Moon", initials: "LM" }, { id: "jon", name: "Jon Park", initials: "JP" },
  { id: "mira", name: "Mira Sol", initials: "MS" }, { id: "ezra", name: "Ezra Lane", initials: "EL" },
  { id: "talia", name: "Talia Reed", initials: "TR" },
];

export const changeRecords: ChangeRecord[] = [
  {
    id: "access-window", title: "Rotate partner upload tokens with reviewer note capture", service: "Gateway",
    categoryId: "access", reviewState: "pending", actor: "A. Patel", changedAt: "Apr 18, 22:10 UTC",
    diffLabel: "5 files • 61 lines", summary: "Partner upload grants now expire sooner and record a reviewer note whenever a shared token is refreshed.",
    reviewerIds: ["lara", "jon", "mira"], suggestedFlagIds: ["signoff", "timing"],
  }, {
    id: "webhook-retry-ledger", title: "Record webhook retry reason in settlement audit feed", service: "Events",
    categoryId: "integrity", reviewState: "approved", actor: "D. Alvarez", changedAt: "Apr 18, 19:40 UTC",
    diffLabel: "4 files • 38 lines", summary: "Settlement retries now carry a reason code so ledger operators can trace a replay without reopening raw payload history.",
    reviewerIds: ["ezra", "talia"], suggestedFlagIds: ["blast-radius"],
  }, {
    id: "payout-export-schema", title: "Tighten dispute export schema for payout reversals", service: "Payouts",
    categoryId: "schema", reviewState: "changes-requested", actor: "N. Brooks", changedAt: "Apr 18, 17:05 UTC",
    diffLabel: "6 files • 74 lines", summary: "The export draft removes nullable reversal fields, but review notes still call out one downstream CSV mapper that expects the older shape.",
    reviewerIds: ["talia", "mira", "ezra"], suggestedFlagIds: ["blast-radius", "manual"],
  }, {
    id: "manual-credit-backfill", title: "Backfill actor trace for manual credit adjustments", service: "Ledger",
    categoryId: "integrity", reviewState: "approved", actor: "K. Imani", changedAt: "Apr 18, 14:20 UTC",
    diffLabel: "3 files • 29 lines", summary: "Manual credit adjustments now stamp the acting reviewer into the change ledger before a backfill is released to support tooling.",
    reviewerIds: ["ezra", "jon"], suggestedFlagIds: ["manual"],
  }, {
    id: "sandbox-waiver", title: "Gate sandbox replay endpoint behind waiver review", service: "Sandbox",
    categoryId: "policy", reviewState: "pending", actor: "R. Chen", changedAt: "Apr 18, 12:55 UTC",
    diffLabel: "5 files • 47 lines", summary: "Replay access now requires a waiver reference before operators can reopen a sandbox stream from the audit console.",
    reviewerIds: ["mira", "lara"], suggestedFlagIds: ["signoff", "manual"],
  }, {
    id: "reviewer-dedupe", title: "Collapse duplicate reviewer assignments in the queue handoff", service: "Review Queue",
    categoryId: "workflow", reviewState: "watch", actor: "S. Wells", changedAt: "Apr 18, 10:30 UTC",
    diffLabel: "4 files • 33 lines", summary: "Queue handoff rules now collapse repeated reviewer assignments so the same owner is not re-added during intake and escalation.",
    reviewerIds: ["jon", "talia"], suggestedFlagIds: ["timing"],
  },
];
