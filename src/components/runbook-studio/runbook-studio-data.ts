export const runbookSections = ["Intake", "Contain", "Recover", "Report"] as const;

export const executionStages = [{ id: "capture", label: "Capture" }, { id: "checks", label: "Checks" }, { id: "execute", label: "Execute" }, { id: "handoff", label: "Handoff" }] as const;

export type RunbookSection = (typeof runbookSections)[number];
export type SectionFilter = RunbookSection | "all";
export type StageId = (typeof executionStages)[number]["id"];
export type ValidationTone = "ready" | "watch" | "blocked";

export type Procedure = {
  id: string;
  title: string;
  section: RunbookSection;
  owner: string;
  duration: string;
  summary: string;
  validation: { label: string; tone: ValidationTone; note: string };
  markers: readonly string[];
  preview: { summary: string; outputs: readonly string[] };
  stages: readonly { id: StageId; title: string; status: ValidationTone; detail: string }[];
  steps: readonly { id: string; stageId: StageId; label: string; note: string }[];
};

export const procedures: readonly Procedure[] = [
  {
    id: "intake-triage-lane",
    title: "Intake Triage Lane",
    section: "Intake",
    owner: "Operations Desk",
    duration: "14 min",
    summary: "Route new incidents into the right path before live operator work begins.",
    validation: { label: "Verified", tone: "ready", note: "Decision gates were rehearsed this week." },
    markers: ["Dependency map", "Draft notes", "Observer ready"],
    preview: { summary: "Intake front-loads ownership and prerequisites before execution.", outputs: ["Owner assigned", "Severity tagged", "Rollback noted"] },
    stages: [
      { id: "capture", title: "Collect context", status: "ready", detail: "Pull alerts, notes, and prior handoffs into one draft." },
      { id: "checks", title: "Gate entry", status: "ready", detail: "Confirm the trigger matches this runbook." },
      { id: "execute", title: "Open lane", status: "watch", detail: "Notify the primary owner before work starts." },
      { id: "handoff", title: "Assign follow-through", status: "ready", detail: "Attach the intake summary for downstream teams." },
    ],
    steps: [
      { id: "intake-capture", stageId: "capture", label: "Capture alert source and scope", note: "Keep the first symptom visible." },
      { id: "intake-checks", stageId: "checks", label: "Verify the incident belongs here", note: "Reject duplicates before they fork extra work." },
      { id: "intake-execute", stageId: "execute", label: "Open the draft lane and assign a responder", note: "Record the handoff target inside the card." },
      { id: "intake-handoff", stageId: "handoff", label: "Publish intake notes to the next stage", note: "Downstream cards should not rebuild the story." },
    ],
  },
  {
    id: "contain-edge-fence",
    title: "Contain Edge Fence",
    section: "Contain",
    owner: "Platform Control",
    duration: "19 min",
    summary: "Fence the affected surface, keep safe traffic moving, and protect rollback.",
    validation: { label: "Needs review", tone: "watch", note: "One observer sign-off is still missing." },
    markers: ["Traffic split", "Fallback path", "Pending sign-off"],
    preview: { summary: "Containment keeps the blast radius narrow while preserving rollback switches.", outputs: ["Fence applied", "Fallback retained", "Stakeholders updated"] },
    stages: [
      { id: "capture", title: "Map exposure", status: "ready", detail: "List the surfaces that need isolation and the ones that stay online." },
      { id: "checks", title: "Validate guardrails", status: "watch", detail: "Confirm rollback controls before traffic changes." },
      { id: "execute", title: "Fence traffic", status: "watch", detail: "Apply the narrowest change first and watch the safe lane." },
      { id: "handoff", title: "Share active constraints", status: "ready", detail: "Document what remains fenced for the next owner." },
    ],
    steps: [
      { id: "contain-capture", stageId: "capture", label: "Identify the exposed edge and safe bypass", note: "Treat unaffected segments as capacity you keep." },
      { id: "contain-checks", stageId: "checks", label: "Confirm rollback controls are live", note: "Do not fence traffic without an unwind path." },
      { id: "contain-execute", stageId: "execute", label: "Apply the narrow containment rule", note: "Pause after the first cut and inspect drift." },
      { id: "contain-handoff", stageId: "handoff", label: "Publish the active constraints list", note: "The recovery owner needs the same fence map." },
    ],
  },
  {
    id: "recover-traffic-swap",
    title: "Recover Traffic Swap",
    section: "Recover",
    owner: "Service Reliability",
    duration: "23 min",
    summary: "Move the path back onto the preferred service shape and retire fallback cleanly.",
    validation: { label: "Verified", tone: "ready", note: "Checklist and preview notes match the latest drill." },
    markers: ["Recovery gate", "Rollback timer", "Success snapshot"],
    preview: { summary: "Recovery keeps the rollback timer visible so the team can stop cleanly.", outputs: ["Preferred path restored", "Fallback retired", "Success note captured"] },
    stages: [
      { id: "capture", title: "Read the current lane", status: "ready", detail: "Snapshot current traffic and rollback timer before the swap." },
      { id: "checks", title: "Confirm readiness", status: "ready", detail: "Verify the target path can absorb production load again." },
      { id: "execute", title: "Promote preferred path", status: "ready", detail: "Shift traffic and watch the fallback for stragglers." },
      { id: "handoff", title: "Close the loop", status: "watch", detail: "Record the success signal and note unresolved follow-up." },
    ],
    steps: [
      { id: "recover-capture", stageId: "capture", label: "Snapshot current routing and timer state", note: "Use the same timer reference in closeout." },
      { id: "recover-checks", stageId: "checks", label: "Verify the preferred path is stable", note: "The target lane should already be clean." },
      { id: "recover-execute", stageId: "execute", label: "Shift traffic and watch the fallback lane", note: "Look for stragglers before removing the route." },
      { id: "recover-handoff", stageId: "handoff", label: "Capture the success note and unresolved items", note: "A short follow-up list keeps the card usable." },
    ],
  },
  {
    id: "report-closeout-brief",
    title: "Report Closeout Brief",
    section: "Report",
    owner: "Program Ops",
    duration: "11 min",
    summary: "Turn working notes into a clean closeout with the next owner and follow-up.",
    validation: { label: "Missing evidence", tone: "blocked", note: "The closeout template still needs updated screenshots." },
    markers: ["Evidence gap", "Owner roster", "Retro prompt"],
    preview: { summary: "This card stays incomplete so the route shows a blocked validation state with local-only data.", outputs: ["Audience list ready", "Follow-up owner named", "Retro prompt drafted"] },
    stages: [
      { id: "capture", title: "Collect the final notes", status: "watch", detail: "Pull the observations that justify the final status." },
      { id: "checks", title: "Check evidence quality", status: "blocked", detail: "Screenshots and linkbacks are not complete enough to publish." },
      { id: "execute", title: "Draft the brief", status: "watch", detail: "Write the brief in publish order so the next reviewer can scan it." },
      { id: "handoff", title: "Assign the next review", status: "ready", detail: "Name the follow-up owner before the draft leaves the studio." },
    ],
    steps: [
      { id: "report-capture", stageId: "capture", label: "Collect final observations and owner notes", note: "Avoid summary language until evidence is attached." },
      { id: "report-checks", stageId: "checks", label: "Verify screenshots and supporting links", note: "This card stays blocked until the evidence gap closes." },
      { id: "report-execute", stageId: "execute", label: "Draft the closeout brief in publish order", note: "Readers should not need side tabs to follow the outcome." },
      { id: "report-handoff", stageId: "handoff", label: "Assign a reviewer and next update time", note: "The draft should leave with a clear owner." },
    ],
  },
];
