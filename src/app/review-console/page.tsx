import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Console",
  description:
    "Review items with decision notes and a compact status summary strip.",
};

interface ReviewItem {
  id: string;
  title: string;
  category: "design" | "engineering" | "policy" | "operations";
  status: "pending" | "approved" | "rejected" | "deferred";
  submittedBy: string;
  submittedAt: string;
  priority: "high" | "medium" | "low";
  summary: string;
}

interface DecisionNote {
  id: string;
  reviewItemId: string;
  author: string;
  timestamp: string;
  verdict: "approve" | "reject" | "defer" | "comment";
  body: string;
}

const reviewItems: ReviewItem[] = [
  {
    id: "REV-101",
    title: "Migrate auth tokens to short-lived JWTs",
    category: "engineering",
    status: "approved",
    submittedBy: "Priya Menon",
    submittedAt: "2026-04-18",
    priority: "high",
    summary:
      "Replace long-lived API keys with short-lived JWTs and a refresh-token rotation flow to reduce exposure from leaked credentials.",
  },
  {
    id: "REV-102",
    title: "Revised data-retention schedule for EU regions",
    category: "policy",
    status: "pending",
    submittedBy: "Lars Eriksson",
    submittedAt: "2026-04-20",
    priority: "high",
    summary:
      "Align retention windows with updated GDPR guidance. Proposes 90-day hot storage, 1-year warm, then purge.",
  },
  {
    id: "REV-103",
    title: "Dashboard color-contrast overhaul",
    category: "design",
    status: "pending",
    submittedBy: "Amara Osei",
    submittedAt: "2026-04-21",
    priority: "medium",
    summary:
      "Update chart palettes and status indicators to meet WCAG 2.2 AA contrast ratios across all themes.",
  },
  {
    id: "REV-104",
    title: "Add canary deployment stage to CI pipeline",
    category: "operations",
    status: "deferred",
    submittedBy: "Jordan Reeves",
    submittedAt: "2026-04-15",
    priority: "medium",
    summary:
      "Insert a 5 % canary rollout step between staging and production with automated rollback on error-rate spike.",
  },
  {
    id: "REV-105",
    title: "Deprecate legacy webhook v1 endpoints",
    category: "engineering",
    status: "rejected",
    submittedBy: "Sofia Tanaka",
    submittedAt: "2026-04-12",
    priority: "low",
    summary:
      "Sunset /v1/webhooks in favor of the event-stream API. Rejected due to active third-party integrations still on v1.",
  },
  {
    id: "REV-106",
    title: "Runbook template for incident post-mortems",
    category: "operations",
    status: "approved",
    submittedBy: "Marcus Chen",
    submittedAt: "2026-04-19",
    priority: "medium",
    summary:
      "Standardize post-mortem documents with required sections: timeline, impact, root cause, and action items.",
  },
];

const decisionNotes: DecisionNote[] = [
  {
    id: "DN-001",
    reviewItemId: "REV-101",
    author: "Kai Patel",
    timestamp: "2026-04-19T10:30:00Z",
    verdict: "approve",
    body: "Token rotation looks solid. Ensure refresh tokens are bound to device fingerprints before shipping.",
  },
  {
    id: "DN-002",
    reviewItemId: "REV-101",
    author: "Elena Vasquez",
    timestamp: "2026-04-19T14:15:00Z",
    verdict: "comment",
    body: "Consider adding a grace period for existing long-lived keys so integrators have time to migrate.",
  },
  {
    id: "DN-003",
    reviewItemId: "REV-102",
    author: "Kai Patel",
    timestamp: "2026-04-21T09:00:00Z",
    verdict: "comment",
    body: "Legal is still reviewing the warm-storage clause. Hold off on final approval until they sign off.",
  },
  {
    id: "DN-004",
    reviewItemId: "REV-103",
    author: "Jordan Reeves",
    timestamp: "2026-04-22T11:45:00Z",
    verdict: "comment",
    body: "The proposed palette works well in light mode but needs testing in dark mode before we approve.",
  },
  {
    id: "DN-005",
    reviewItemId: "REV-104",
    author: "Priya Menon",
    timestamp: "2026-04-16T16:20:00Z",
    verdict: "defer",
    body: "Good idea but blocked by the current lack of per-service error-rate metrics. Revisit after observability sprint.",
  },
  {
    id: "DN-006",
    reviewItemId: "REV-105",
    author: "Marcus Chen",
    timestamp: "2026-04-13T08:50:00Z",
    verdict: "reject",
    body: "At least 14 partners still hit v1 daily. We need a migration path and a 6-month sunset window first.",
  },
  {
    id: "DN-007",
    reviewItemId: "REV-106",
    author: "Amara Osei",
    timestamp: "2026-04-20T13:10:00Z",
    verdict: "approve",
    body: "Template covers all the bases. Recommend adding an optional customer-communication section.",
  },
];

const statusStyle: Record<ReviewItem["status"], string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-red-200 bg-red-50 text-red-700",
  deferred: "border-slate-200 bg-slate-100 text-slate-600",
};

const statusLabel: Record<ReviewItem["status"], string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  deferred: "Deferred",
};

const categoryColor: Record<ReviewItem["category"], string> = {
  design: "text-violet-700 bg-violet-50 border-violet-200",
  engineering: "text-cyan-700 bg-cyan-50 border-cyan-200",
  policy: "text-amber-700 bg-amber-50 border-amber-200",
  operations: "text-emerald-700 bg-emerald-50 border-emerald-200",
};

const priorityDot: Record<ReviewItem["priority"], string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-slate-400",
};

const verdictIcon: Record<DecisionNote["verdict"], string> = {
  approve: "text-emerald-600",
  reject: "text-red-600",
  defer: "text-slate-500",
  comment: "text-blue-600",
};

const verdictLabel: Record<DecisionNote["verdict"], string> = {
  approve: "Approved",
  reject: "Rejected",
  defer: "Deferred",
  comment: "Comment",
};

export default function ReviewConsolePage() {
  const counts = {
    total: reviewItems.length,
    pending: reviewItems.filter((r) => r.status === "pending").length,
    approved: reviewItems.filter((r) => r.status === "approved").length,
    rejected: reviewItems.filter((r) => r.status === "rejected").length,
    deferred: reviewItems.filter((r) => r.status === "deferred").length,
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
      <header className="space-y-3">
        <p className="section-label text-[var(--accent-violet-text)]">
          Review Console
        </p>
        <h1 className="heading-tight max-w-3xl text-4xl text-slate-950 sm:text-5xl">
          Review items, decisions, and status at a glance.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Track proposals through review, capture decision rationale, and
          monitor overall progress from one place.
        </p>
      </header>

      {/* ── Status summary strip ── */}
      <div
        aria-label="Review status summary"
        className="grid gap-4 sm:grid-cols-5"
        role="region"
      >
        {(
          [
            { label: "Total", value: counts.total, cls: "text-slate-900" },
            { label: "Pending", value: counts.pending, cls: "text-amber-700" },
            {
              label: "Approved",
              value: counts.approved,
              cls: "text-emerald-700",
            },
            { label: "Rejected", value: counts.rejected, cls: "text-red-700" },
            {
              label: "Deferred",
              value: counts.deferred,
              cls: "text-slate-600",
            },
          ] as const
        ).map((stat) => (
          <div
            key={stat.label}
            className="status-summary-card rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface)] px-5 py-4"
          >
            <p className="section-label text-slate-500">{stat.label}</p>
            <p className={`mt-1 text-2xl font-semibold ${stat.cls}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Review items ── */}
      <section className="section-card border border-[var(--line)] bg-[var(--surface)]">
        <p className="section-label text-slate-500">Review Items</p>
        <ul aria-label="Review items" className="mt-5 space-y-3">
          {reviewItems.map((item) => {
            const notes = decisionNotes.filter(
              (n) => n.reviewItemId === item.id,
            );
            return (
              <li
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white/75 px-5 py-5"
              >
                {/* Item header */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">
                    {item.id}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide ${statusStyle[item.status]}`}
                  >
                    {statusLabel[item.status]}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide ${categoryColor[item.category]}`}
                  >
                    {item.category}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-400">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${priorityDot[item.priority]}`}
                    />
                    {item.priority} priority
                  </span>
                </div>

                {/* Title & summary */}
                <h2 className="mt-2 text-sm font-semibold leading-snug text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {item.summary}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Submitted by {item.submittedBy} on {item.submittedAt}
                </p>

                {/* Decision notes for this item */}
                {notes.length > 0 && (
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Decision Notes
                    </p>
                    <ul aria-label={`Notes for ${item.id}`} className="mt-2 space-y-2">
                      {notes.map((note) => (
                        <li
                          key={note.id}
                          className="rounded-xl bg-slate-50/80 px-4 py-3"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold ${verdictIcon[note.verdict]}`}
                            >
                              {verdictLabel[note.verdict]}
                            </span>
                            <span className="text-xs text-slate-400">
                              {note.author} &middot;{" "}
                              {note.timestamp.slice(0, 10)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-slate-700">
                            {note.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
