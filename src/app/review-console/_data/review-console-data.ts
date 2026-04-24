export type ReviewTone = "steady" | "watch" | "risk";

export type ReviewItem = {
  id: string;
  lane: string;
  title: string;
  reviewer: string;
  owner: string;
  updatedAt: string;
  dueWindow: string;
  status: "Approved" | "Needs Revision" | "Watching";
  tone: ReviewTone;
  summary: string;
  tags: string[];
  nextStep: string;
};

export type DecisionNote = {
  id: string;
  title: string;
  author: string;
  loggedAt: string;
  outcome: "Approved" | "Follow-up" | "Blocked";
  detail: string;
};

export type DecisionNoteSection = {
  id: string;
  label: string;
  title: string;
  notes: DecisionNote[];
};

export const reviewConsoleOverview = {
  eyebrow: "Review Console",
  title: "Stage decisions, reviewer notes, and a compact status strip in one route.",
  description:
    "Keep active review items, decision notes, and a compact summary strip together before the final merge pass.",
  actions: [{ href: "#review-items", label: "Browse review items" }],
};

export const reviewItems: ReviewItem[] = [
  {
    id: "item-routing-copy",
    lane: "Content Review",
    title: "Lock the route framing for the standalone review page",
    reviewer: "Mira Chen",
    owner: "Product Ops",
    updatedAt: "Apr 23, 09:10",
    dueWindow: "Due today",
    status: "Approved",
    tone: "steady",
    summary: "The route can ship as a focused review workspace without bundling shared navigation work.",
    tags: ["scope", "copy", "route shell"],
    nextStep: "Keep the page self-contained and move the approved framing into the final layout.",
  },
  {
    id: "item-summary-strip",
    lane: "Design Review",
    title: "Confirm the summary strip reads clearly before the card grid",
    reviewer: "Avery Holt",
    owner: "UI Systems",
    updatedAt: "Apr 23, 11:35",
    dueWindow: "Due in 1 day",
    status: "Watching",
    tone: "watch",
    summary: "The strip works as a scan pattern, but each metric still needs enough support to stay useful.",
    tags: ["summary", "responsive", "hierarchy"],
    nextStep: "Keep the strip compact and make each value explain the review queue change behind it.",
  },
  {
    id: "item-card-metadata",
    lane: "QA Review",
    title: "Expose reviewer metadata and next actions on every item",
    reviewer: "Nadia Ruiz",
    owner: "QA",
    updatedAt: "Apr 23, 14:20",
    dueWindow: "Due in 2 days",
    status: "Needs Revision",
    tone: "risk",
    summary: "Every card needs visible reviewer, owner, timing, and follow-up data so blocked work stands out.",
    tags: ["metadata", "cards", "follow-up"],
    nextStep: "Keep the metadata visible without turning the cards into dense document blocks.",
  },
];

export const decisionNoteSections: DecisionNoteSection[] = [
  {
    id: "settled-calls",
    label: "Settled calls",
    title: "Approved decisions ready to carry into implementation",
    notes: [
      {
        id: "note-route-scope",
        title: "Ship the route without bundling shared navigation work",
        author: "Mira Chen",
        loggedAt: "Apr 23, 09:25",
        outcome: "Approved",
        detail: "The route can land as a focused page as long as its data, tests, and styling remain route-local.",
      },
    ],
  },
  {
    id: "open-follow-up",
    label: "Open follow-up",
    title: "Notes that still affect the final review pass",
    notes: [
      {
        id: "note-card-density",
        title: "Trim dense copy inside cards before the build review",
        author: "Nadia Ruiz",
        loggedAt: "Apr 23, 14:45",
        outcome: "Follow-up",
        detail: "If several long paragraphs stack inside one card, the route stops reading like a console.",
      },
    ],
  },
];

export function getReviewConsoleView() {
  const approvedCount = reviewItems.filter((item) => item.status === "Approved").length;
  const followUpCount = reviewItems.filter((item) => item.status !== "Approved").length;
  const blockedCount = reviewItems.filter((item) => item.tone === "risk").length;
  const noteCount = decisionNoteSections.reduce(
    (count, section) => count + section.notes.length,
    0,
  );

  return {
    overview: reviewConsoleOverview,
    summaryStrip: [
      {
        id: "total-items",
        label: "Review items",
        value: String(reviewItems.length),
        detail: "Active cards across content, design, and QA review.",
        tone: "steady" as const,
      },
      {
        id: "approved-items",
        label: "Approved",
        value: String(approvedCount),
        detail: "Items already cleared for the final merge-ready pass.",
        tone: "steady" as const,
      },
      {
        id: "follow-up-items",
        label: "Follow-up",
        value: String(followUpCount),
        detail: "Cards still asking for revision or active monitoring.",
        tone: "watch" as const,
      },
      {
        id: "decision-notes",
        label: "Decision notes",
        value: String(noteCount),
        detail: `${blockedCount} blocked lane still needs visible resolution cues.`,
        tone: blockedCount > 0 ? ("risk" as const) : ("steady" as const),
      },
    ],
    reviewItems,
    decisionNoteSections,
  };
}
