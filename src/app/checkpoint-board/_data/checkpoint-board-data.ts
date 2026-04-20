export type CheckpointTone = "steady" | "watch" | "risk";

export type CheckpointStatus = "Complete" | "In Progress" | "Blocked";

export type CheckpointBoardSummary = {
  eyebrow: string;
  title: string;
  description: string;
  actions: Array<{
    href: string;
    label: string;
  }>;
};

export type CheckpointHeroMetric = {
  label: string;
  value: string;
  detail: string;
};

export type CheckpointMilestone = {
  id: string;
  title: string;
  owner: string;
  window: string;
  status: CheckpointStatus;
  tone: CheckpointTone;
  readiness: number;
  summary: string;
  deliverables: string[];
  blockers: string[];
  nextReview: string;
};

export type CheckpointGroup = {
  id: string;
  label: string;
  title: string;
  lead: string;
  reviewWindow: string;
  summary: string;
  focusAreas: string[];
  milestones: CheckpointMilestone[];
};

export type ReadinessSummary = {
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
  nextStep: string;
};

export type ReviewCadenceItem = {
  id: string;
  label: string;
  detail: string;
};

export const checkpointBoardSummary: CheckpointBoardSummary = {
  eyebrow: "Checkpoint Board",
  title: "Track grouped checkpoints, readiness posture, and review follow-through on one route.",
  description:
    "This board is staged as a standalone planning route with grouped milestones, explicit readiness rollups, and a recent review rail so the feature can ship independently from the rest of the app.",
  actions: [
    {
      href: "#checkpoint-readiness",
      label: "Review readiness",
    },
    {
      href: "#checkpoint-groups",
      label: "Browse groups",
    },
  ],
};

export const checkpointGroups: CheckpointGroup[] = [
  {
    id: "foundation-lane",
    label: "Lane 01",
    title: "Foundation alignment",
    lead: "Mira Chen / Product Ops",
    reviewWindow: "Apr 20, 10:00",
    summary:
      "Lock the route boundary, data vocabulary, and review posture so the rest of the board can land without scope drift.",
    focusAreas: [
      "Keep the route self-contained with local mock data only.",
      "Make status and readiness language consistent across every checkpoint card.",
      "Preserve enough summary context so reviews do not need to cross-reference other routes.",
    ],
    milestones: [
      {
        id: "shell-baseline",
        title: "Approve the standalone route shell and navigation boundary",
        owner: "Leah Tran",
        window: "Apr 20, 09:30",
        status: "Complete",
        tone: "steady",
        readiness: 100,
        summary:
          "The route can ship independently from the rest of the dashboard, with no shared state or coupled navigation required for the first release.",
        deliverables: [
          "Reserve a dedicated page entry point under the app router.",
          "Keep the route metadata and shell copy specific to checkpoint planning.",
          "Avoid coupling the feature to any other issue-specific workflow.",
        ],
        blockers: [
          "No active blockers on the route boundary.",
          "Future home-page links remain optional to protect scope.",
        ],
        nextReview: "Keep the shell stable while the data and component work lands in later subtasks.",
      },
      {
        id: "dataset-shape",
        title: "Model grouped milestones with status and readiness values",
        owner: "Jon Park",
        window: "Apr 20, 11:15",
        status: "In Progress",
        tone: "watch",
        readiness: 82,
        summary:
          "The board dataset is being shaped around milestone groups so readiness and review summaries can be derived without reaching into shared utilities.",
        deliverables: [
          "Define grouped milestone records with owner, status, readiness, and next review fields.",
          "Capture focus areas per group so the board reads as a staged checkpoint plan.",
          "Leave enough structure to derive summary metrics directly from the route-local dataset.",
        ],
        blockers: [
          "Confirm the final balance between group-level context and milestone-level detail.",
          "Keep the data broad enough for design and QA review copy.",
        ],
        nextReview: "Validate that the dataset supports both the grouped board and the summary rail before wiring the page.",
      },
      {
        id: "review-language",
        title: "Normalize review-note outcomes and escalation language",
        owner: "Nadia Ruiz",
        window: "Apr 20, 13:00",
        status: "In Progress",
        tone: "watch",
        readiness: 74,
        summary:
          "Review-note metadata is converging on a small set of outcomes so the side rail can highlight what is approved, being watched, or still needs action.",
        deliverables: [
          "Limit outcomes to approved, watching, and follow-up states.",
          "Pair every note with a reviewer role and concrete next step.",
          "Keep timestamps short enough to scan quickly on smaller screens.",
        ],
        blockers: [
          "Resolve the final wording on unresolved QA asks.",
          "Avoid duplicating long milestone copy inside the review rail.",
        ],
        nextReview: "Run a final pass on review-note wording before the panel markup is finalized.",
      },
    ],
  },
  {
    id: "assembly-lane",
    label: "Lane 02",
    title: "Board assembly",
    lead: "Avery Holt / UI Systems",
    reviewWindow: "Apr 21, 09:45",
    summary:
      "Translate the mock dataset into grouped board sections, readiness cards, and a review-notes panel that still feels cohesive as a single route.",
    focusAreas: [
      "Group checkpoints so the board reads as a sequence instead of a flat grid.",
      "Expose readiness summaries that explain what the numbers mean.",
      "Keep note outcomes and blockers visible while preserving a readable mobile layout.",
    ],
    milestones: [
      {
        id: "component-scaffolds",
        title: "Build route-local components for groups, summaries, and notes",
        owner: "Eli Booker",
        window: "Apr 21, 10:30",
        status: "Blocked",
        tone: "risk",
        readiness: 48,
        summary:
          "The route-local component layer is waiting on the final data shape before the grouped layout can be assembled cleanly.",
        deliverables: [
          "Create isolated components under the checkpoint-board route folder.",
          "Keep milestone-group, readiness-summary, and review-note concerns separated.",
          "Leave room for responsive refinements without changing the data contract.",
        ],
        blockers: [
          "Complete the route-local dataset and view model first.",
          "Confirm the minimal shell stays intact while the route is composed incrementally.",
        ],
        nextReview: "Start component implementation immediately after the data commit lands.",
      },
      {
        id: "summary-rail",
        title: "Derive summary cards that show route readiness at a glance",
        owner: "Jon Park",
        window: "Apr 21, 11:45",
        status: "Blocked",
        tone: "risk",
        readiness: 41,
        summary:
          "The readiness rail still depends on the final grouped milestone counts and unresolved review-note totals before it can explain the board posture clearly.",
        deliverables: [
          "Roll up grouped milestone counts into summary values.",
          "Attach a support sentence to each summary card.",
          "Use the same tone system across cards, groups, and review notes.",
        ],
        blockers: [
          "Wait for component structure so copy can match the final layout.",
          "Avoid summary language that duplicates the hero metrics.",
        ],
        nextReview: "Revisit the summary ordering once the grouped board is visible in the page composition.",
      },
      {
        id: "notes-panel",
        title: "Stage a recent review-notes rail with clear follow-up actions",
        owner: "Nadia Ruiz",
        window: "Apr 21, 14:15",
        status: "In Progress",
        tone: "watch",
        readiness: 68,
        summary:
          "The review rail is ready to show recent notes, reviewer metadata, and next steps once the final panel structure is in place.",
        deliverables: [
          "Render note metadata and outcomes as a compact scan pattern.",
          "Keep follow-up actions visible without collapsing the summary copy.",
          "Make the rail useful for both design and QA review handoff.",
        ],
        blockers: [
          "Preserve enough spacing once long note titles wrap.",
          "Keep unresolved outcomes visually distinct from approvals.",
        ],
        nextReview: "Pair the review-note panel with the final responsive styling pass.",
      },
    ],
  },
  {
    id: "release-lane",
    label: "Lane 03",
    title: "Release readiness",
    lead: "Rina Solis / Engineering",
    reviewWindow: "Apr 22, 16:00",
    summary:
      "Close the route with responsive polish, route-level tests, and a clean handoff path so reviewers can approve from one PR thread.",
    focusAreas: [
      "Differentiate complete, in-progress, and blocked states clearly.",
      "Cover the main route content with tests before the PR is marked ready.",
      "Keep the final implementation broad enough to stand as a complete route delivery.",
    ],
    milestones: [
      {
        id: "responsive-pass",
        title: "Tune the board layout for narrow and wide screen checkpoints",
        owner: "Avery Holt",
        window: "Apr 22, 11:00",
        status: "Blocked",
        tone: "risk",
        readiness: 34,
        summary:
          "Responsive spacing and board rhythm are still pending the first full page composition, especially around group headers and the notes rail.",
        deliverables: [
          "Protect group readability when cards stack vertically.",
          "Keep the notes rail legible when it drops below the main board.",
          "Maintain clear state treatment across all checkpoint tones.",
        ],
        blockers: [
          "Need the final page structure before spacing decisions can stick.",
          "Watch for density issues once every milestone list is visible together.",
        ],
        nextReview: "Run a viewport pass after the composed page is wired to the live mock data.",
      },
      {
        id: "verification",
        title: "Cover route rendering, summaries, and notes with tests",
        owner: "Eli Booker",
        window: "Apr 22, 14:00",
        status: "Blocked",
        tone: "risk",
        readiness: 22,
        summary:
          "Tests are intentionally deferred until the final markup settles so assertions can target the real route structure instead of churn.",
        deliverables: [
          "Assert the route headings, grouped milestone content, and review notes.",
          "Exercise the derived readiness summaries from the board view model.",
          "Run the project test suite and production build before handoff.",
        ],
        blockers: [
          "Wait for the final route composition and styling pass.",
          "Keep the final assertions focused on meaningful content rather than incidental structure.",
        ],
        nextReview: "Start route-level verification as soon as the styled page is stable.",
      },
      {
        id: "review-handoff",
        title: "Package the PR with clear reviewer context and merge posture",
        owner: "Mira Chen",
        window: "Apr 22, 16:30",
        status: "In Progress",
        tone: "watch",
        readiness: 61,
        summary:
          "The PR is intentionally open early, but the final handoff still depends on tests, a clean build, and confirmation that the diff clears the requested scope.",
        deliverables: [
          "Push incremental commits after each subtask so the PR stays reviewable.",
          "Document what changed and why in the PR summary.",
          "Confirm the final diff comfortably exceeds the requested 300 changed lines.",
        ],
        blockers: [
          "Need all remaining subtasks to land before the PR can be marked ready for review.",
          "Wait for local verification before signaling merge readiness.",
        ],
        nextReview: "Refresh the PR body after the last verification push.",
      },
    ],
  },
];

export const reviewNotes: ReviewNote[] = [
  {
    id: "review-1",
    title: "Keep milestone groups explicit instead of flattening every checkpoint",
    reviewer: "Mira Chen",
    role: "Product Ops",
    loggedAt: "Apr 20, 09:15",
    outcome: "Approved",
    tone: "steady",
    summary:
      "The route should read like a staged board, not a generic list of cards. Group headers and focus areas are required for review context.",
    nextStep:
      "Preserve at least three distinct milestone groups when the full page is composed.",
  },
  {
    id: "review-2",
    title: "Make readiness summaries explain the planning signal behind each value",
    reviewer: "Jon Park",
    role: "Delivery",
    loggedAt: "Apr 20, 11:05",
    outcome: "Follow-up",
    tone: "watch",
    summary:
      "Counts alone will not be enough. Each readiness card should explain why the value matters to implementation or review sequencing.",
    nextStep:
      "Attach one supporting line to every readiness summary card before the route is finalized.",
  },
  {
    id: "review-3",
    title: "Keep blocked checkpoints visibly different from active work",
    reviewer: "Avery Holt",
    role: "UI Systems",
    loggedAt: "Apr 21, 10:40",
    outcome: "Watching",
    tone: "watch",
    summary:
      "The visual treatment needs stronger differentiation for blocked states so the board does not feel optimistic when critical work is still waiting.",
    nextStep:
      "Reserve a clear risk treatment for blocked groups and milestone cards during the styling pass.",
  },
  {
    id: "review-4",
    title: "Use the review rail for action, not just commentary",
    reviewer: "Nadia Ruiz",
    role: "QA",
    loggedAt: "Apr 21, 15:20",
    outcome: "Follow-up",
    tone: "risk",
    summary:
      "The notes panel should make outstanding actions obvious enough that QA and design can pick up the next step without re-reading the whole route.",
    nextStep:
      "Expose a concise next-step line under each note and keep unresolved outcomes visually prominent.",
  },
];

export const reviewCadence: ReviewCadenceItem[] = [
  {
    id: "cadence-1",
    label: "Next board review",
    detail: "Apr 22, 09:30 with Product Ops and UI Systems to confirm group structure and summary ordering.",
  },
  {
    id: "cadence-2",
    label: "Open decision",
    detail: "Settle the final blocked-state emphasis before the responsive styling pass is closed out.",
  },
  {
    id: "cadence-3",
    label: "Merge gate",
    detail: "Route tests, a production build, and a diff above 300 changed lines must all be confirmed before review handoff.",
  },
];

function getAverageReadiness(groups: CheckpointGroup[]) {
  const milestones = groups.flatMap((group) => group.milestones);
  const total = milestones.reduce((runningTotal, milestone) => {
    return runningTotal + milestone.readiness;
  }, 0);

  return Math.round(total / milestones.length);
}

export function getCheckpointBoardView() {
  const milestones = checkpointGroups.flatMap((group) => group.milestones);
  const completeMilestones = milestones.filter(
    (milestone) => milestone.status === "Complete",
  ).length;
  const activeMilestones = milestones.filter(
    (milestone) => milestone.status === "In Progress",
  ).length;
  const blockedMilestones = milestones.filter(
    (milestone) => milestone.status === "Blocked",
  ).length;
  const openReviewNotes = reviewNotes.filter(
    (note) => note.outcome !== "Approved",
  ).length;
  const averageReadiness = getAverageReadiness(checkpointGroups);

  const heroMetrics: CheckpointHeroMetric[] = [
    {
      label: "Average readiness",
      value: `${averageReadiness}%`,
      detail: "Calculated across every checkpoint milestone in the board.",
    },
    {
      label: "In progress",
      value: `${activeMilestones}`,
      detail: "Milestones actively moving through data, composition, or review work.",
    },
    {
      label: "Blocked",
      value: `${blockedMilestones}`,
      detail: "Checkpoints still waiting on prior subtasks or the final layout pass.",
    },
  ];

  const readinessSummaries: ReadinessSummary[] = [
    {
      id: "coverage",
      label: "Checkpoint coverage",
      value: `${milestones.length} milestones`,
      detail:
        "The board maps foundation, assembly, and release readiness without borrowing data from other routes.",
      support: `${completeMilestones} complete, ${activeMilestones} in progress, ${blockedMilestones} blocked.`,
      tone: "steady",
    },
    {
      id: "group-readiness",
      label: "Readiness posture",
      value: `${averageReadiness}%`,
      detail:
        "Readiness averages milestone posture so the board can show one honest summary instead of a single optimistic status.",
      support: "Most pressure remains in the assembly and release lanes while the route grows beyond the shell.",
      tone: averageReadiness >= 70 ? "watch" : "risk",
    },
    {
      id: "review-followups",
      label: "Review follow-ups",
      value: `${openReviewNotes}`,
      detail:
        "Open review notes still need follow-through before the route is ready for final reviewer intake.",
      support: "Metric clarity, blocked-state contrast, and actionable QA copy remain the main follow-up areas.",
      tone: openReviewNotes > 2 ? "risk" : "watch",
    },
    {
      id: "handoff",
      label: "Merge posture",
      value: "PR open early",
      detail:
        "The branch is already in review shape, but the route still needs composition, styling, tests, and final verification before it is ready.",
      support: "Incremental commits after each subtask keep the open PR readable while the board fills in.",
      tone: "watch",
    },
  ];

  return {
    summary: checkpointBoardSummary,
    heroMetrics,
    readinessSummaries,
    checkpointGroups,
    reviewNotes,
    reviewCadence,
  };
}
