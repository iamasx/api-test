export type CheckpointTone = "steady" | "watch" | "risk";

export type CheckpointHeroMetric = {
  label: string;
  value: string;
  detail: string;
};

export type CheckpointMilestone = {
  id: string;
  phase: string;
  title: string;
  owner: string;
  window: string;
  status: "Complete" | "In Progress" | "Blocked";
  tone: CheckpointTone;
  completion: number;
  summary: string;
  deliverables: string[];
  dependencies: string[];
  nextReview: string;
};

export type CheckpointProgressSummary = {
  id: string;
  label: string;
  value: string;
  detail: string;
  support: string;
  tone: CheckpointTone;
};

export type ReviewNote = {
  id: string;
  title: string;
  reviewer: string;
  role: string;
  loggedAt: string;
  outcome: "Approved" | "Follow-up" | "Watching";
  tone: CheckpointTone;
  summary: string;
  action: string;
};

export type CheckpointCadenceItem = {
  id: string;
  label: string;
  detail: string;
};

export const checkpointGridSummary = {
  eyebrow: "Checkpoint Grid",
  title: "Track milestone tiles, progress posture, and review notes without leaving one route.",
  description:
    "This planning view stages a dedicated checkpoint board with mock milestones, progress summaries, and a recent review log so the feature can ship independently from the rest of the app.",
  actions: [
    {
      href: "#checkpoint-milestones",
      label: "Browse milestones",
    },
    {
      href: "#recent-review-notes",
      label: "Open review notes",
    },
  ],
};

export const checkpointMilestones: CheckpointMilestone[] = [
  {
    id: "scope-baseline",
    phase: "Checkpoint 01",
    title: "Lock the planning scope and standalone route baseline",
    owner: "Mira Chen / Product Ops",
    window: "Apr 16-17",
    status: "Complete",
    tone: "steady",
    completion: 100,
    summary:
      "Issue boundaries, mock-data assumptions, and the dedicated route shell are approved so implementation can move without borrowing from other workstreams.",
    deliverables: [
      "Confirmed the route can ship independently from the home page and adjacent issues.",
      "Reserved milestone, progress, and review-note sections in the page shell.",
      "Documented the mock-data-only plan for early handoff and test coverage.",
    ],
    dependencies: [
      "No unresolved blockers on the route boundary.",
      "Keep any future navigation updates optional to avoid expanding scope.",
    ],
    nextReview: "Archive the kickoff notes and keep the route boundary unchanged during implementation.",
  },
  {
    id: "tile-system",
    phase: "Checkpoint 02",
    title: "Build the milestone tile system with status-aware detail bands",
    owner: "Avery Holt / UI Systems",
    window: "Apr 17-18",
    status: "In Progress",
    tone: "watch",
    completion: 78,
    summary:
      "Milestone cards are in active assembly, with phase labels, completion signals, and planning detail grouped into consistent tiles.",
    deliverables: [
      "Expose owner, review window, and completion percentage in the tile header.",
      "Show deliverables and dependency notes directly on every card.",
      "Keep the copy length readable on both wide and narrow layouts.",
    ],
    dependencies: [
      "Confirm the vertical rhythm once all tile copy is in place.",
      "Keep the accent system clear enough to separate steady, watch, and risk checkpoints.",
    ],
    nextReview: "Run a visual pass on mobile wrapping before the tile set is marked complete.",
  },
  {
    id: "summary-rail",
    phase: "Checkpoint 03",
    title: "Stage progress summaries that explain route posture at a glance",
    owner: "Jon Park / Delivery",
    window: "Apr 18-19",
    status: "In Progress",
    tone: "watch",
    completion: 64,
    summary:
      "Summary cards are mapping the overall board posture so reviewers can scan coverage, completion, open decisions, and test intent before reading the full grid.",
    deliverables: [
      "Derive summary values from the local milestone and review-note dataset.",
      "Show one supporting sentence per card so the numbers are actionable.",
      "Keep the metrics broad enough for design and QA review conversations.",
    ],
    dependencies: [
      "Finalize the phrasing on summary support text.",
      "Avoid duplicating the same status language already shown in the milestone tiles.",
    ],
    nextReview: "Validate that the summary rail still reads clearly when cards wrap to two rows.",
  },
  {
    id: "review-panel",
    phase: "Checkpoint 04",
    title: "Add a recent review-notes panel with explicit follow-up actions",
    owner: "Nadia Ruiz / QA",
    window: "Apr 19-20",
    status: "Blocked",
    tone: "risk",
    completion: 46,
    summary:
      "The review stream is currently blocked behind the tile and summary layout, but the data model is ready to expose note outcomes, timestamps, and next actions.",
    deliverables: [
      "Group note title, reviewer, and outcome into a quick scan pattern.",
      "Keep the panel broad enough for design, content, and QA feedback in one place.",
      "Surface follow-up actions so the side rail is more than a static log.",
    ],
    dependencies: [
      "Preserve enough contrast for the outcome badges in the darker rail treatment.",
      "Keep note copy concise so four recent items remain readable without collapsing content.",
    ],
    nextReview: "Confirm the review rail remains legible when note summaries span multiple lines.",
  },
  {
    id: "verification-handoff",
    phase: "Checkpoint 05",
    title: "Finish route coverage and handoff notes for merge readiness",
    owner: "Eli Booker / Engineering",
    window: "Apr 20",
    status: "Blocked",
    tone: "steady",
    completion: 32,
    summary:
      "Verification is blocked until the route content settles, then it closes the loop with route tests, a build pass, and focused handoff notes for reviewers.",
    deliverables: [
      "Cover hero, milestone, summary, and review-note content in route tests.",
      "Run the production build so the route compiles inside the current app shell.",
      "Package the branch, commit, push, and PR notes for reviewer intake.",
    ],
    dependencies: [
      "Wait for the final content shape before snapshotting test expectations.",
      "Keep the PR focused on the new route and route-local data.",
    ],
    nextReview: "Complete verification immediately after the route markup settles.",
  },
];

export const reviewNotes: ReviewNote[] = [
  {
    id: "rn-01",
    title: "Preserve the standalone route boundary",
    reviewer: "Mira Chen",
    role: "Product Ops",
    loggedAt: "Apr 18, 09:20",
    outcome: "Approved",
    tone: "steady",
    summary:
      "The route can stay isolated as long as the milestone, summary, and review-note content is fully powered by local mock planning data.",
    action:
      "Keep all feature data under the checkpoint-grid route folder and avoid shared-store dependencies.",
  },
  {
    id: "rn-02",
    title: "Tighten the mobile spacing around long milestone summaries",
    reviewer: "Avery Holt",
    role: "UI Systems",
    loggedAt: "Apr 18, 13:45",
    outcome: "Follow-up",
    tone: "watch",
    summary:
      "The desktop composition reads well, but narrow screens need stronger spacing control once the longest milestone descriptions and lists render together.",
    action:
      "Review the tile grid wrap and trim non-essential copy before the final visual sign-off.",
  },
  {
    id: "rn-03",
    title: "Make summary cards explain why the metric matters",
    reviewer: "Jon Park",
    role: "Delivery",
    loggedAt: "Apr 19, 08:10",
    outcome: "Watching",
    tone: "watch",
    summary:
      "The route should not stop at showing counts. Each progress card needs one supporting line that turns the number into a planning signal.",
    action:
      "Attach supporting detail to every summary metric and keep the phrasing anchored to review or delivery decisions.",
  },
  {
    id: "rn-04",
    title: "Keep the review-note panel actionable for QA handoff",
    reviewer: "Nadia Ruiz",
    role: "QA",
    loggedAt: "Apr 19, 16:05",
    outcome: "Follow-up",
    tone: "risk",
    summary:
      "A plain log is not enough for test handoff. The panel should make outstanding actions obvious so reviewers know what still needs verification.",
    action:
      "Expose the next step under each note and keep unresolved outcomes visually distinct from approved ones.",
  },
];

export const checkpointCadence: CheckpointCadenceItem[] = [
  {
    id: "cadence-1",
    label: "Next async review",
    detail: "Apr 20, 10:30 with UI Systems and QA for final spacing and contrast checks.",
  },
  {
    id: "cadence-2",
    label: "Open decisions",
    detail: "Settle the last two copy trims and the final order of summary cards before handoff.",
  },
  {
    id: "cadence-3",
    label: "Merge readiness",
    detail: "Route tests and a production build must stay green before the PR is marked ready.",
  },
];

function getAverageCompletion(milestones: CheckpointMilestone[]) {
  const totalCompletion = milestones.reduce(
    (runningTotal, milestone) => runningTotal + milestone.completion,
    0,
  );

  return Math.round(totalCompletion / milestones.length);
}

export function getCheckpointGridView() {
  const completedMilestones = checkpointMilestones.filter(
    (milestone) => milestone.status === "Complete",
  ).length;
  const activeMilestones = checkpointMilestones.filter(
    (milestone) => milestone.status === "In Progress",
  ).length;
  const blockedMilestones = checkpointMilestones.filter(
    (milestone) => milestone.status === "Blocked",
  ).length;
  const unresolvedReviewNotes = reviewNotes.filter(
    (note) => note.outcome !== "Approved",
  ).length;
  const averageCompletion = getAverageCompletion(checkpointMilestones);

  const heroMetrics: CheckpointHeroMetric[] = [
    {
      label: "Average completion",
      value: `${averageCompletion}%`,
      detail: "Across all five checkpoint tiles in the planning sequence.",
    },
    {
      label: "Milestones in flight",
      value: `${activeMilestones}`,
      detail: "Tiles still moving through layout, summary, or content review work.",
    },
    {
      label: "Blocked checkpoints",
      value: `${blockedMilestones}`,
      detail: "Review notes and verification still depend on the final route polish.",
    },
  ];

  const progressSummaries: CheckpointProgressSummary[] = [
    {
      id: "coverage",
      label: "Milestones mapped",
      value: `${checkpointMilestones.length} tiles`,
      detail:
        "The board spans kickoff, tile assembly, summary framing, review notes, and final verification.",
      support: `${completedMilestones} complete, ${activeMilestones} in progress, ${blockedMilestones} blocked.`,
      tone: "steady",
    },
    {
      id: "progress",
      label: "Completion posture",
      value: `${averageCompletion}%`,
      detail:
        "Completion reflects the average progress across all checkpoint tiles rather than a single optimistic status.",
      support: "Active work is concentrated in the tile system and progress summary sections.",
      tone: "watch",
    },
    {
      id: "reviews",
      label: "Open review actions",
      value: `${unresolvedReviewNotes}`,
      detail:
        "Unapproved notes still need follow-through before the route is clean for review handoff.",
      support: "Spacing, metric clarity, and actionable QA notes remain the current follow-up areas.",
      tone: unresolvedReviewNotes > 2 ? "risk" : "watch",
    },
    {
      id: "verification",
      label: "Verification intent",
      value: "Route tests ready",
      detail:
        "The final checkpoint is reserved for route-level assertions and a build pass once content settles.",
      support: "Coverage targets the hero, summary cards, milestone tiles, and recent review-note content.",
      tone: "steady",
    },
  ];

  return {
    summary: checkpointGridSummary,
    heroMetrics,
    progressSummaries,
    milestones: checkpointMilestones,
    reviewNotes,
    cadence: checkpointCadence,
  };
}
