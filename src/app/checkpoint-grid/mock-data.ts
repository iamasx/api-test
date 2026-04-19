export type CheckpointStatus = "complete" | "active" | "watch" | "blocked";
export type MilestoneSummary = { title: string; cycle: string; dueWindow: string; reviewDate: string; summary: string };
export type ProgressBand = { id: string; label: string; completed: number; total: number; focus: string };
export type Checkpoint = {
  id: string; title: string; band: string; owner: string; status: CheckpointStatus; completion: number;
  dueLabel: string; summary: string; dependency: string; nextStep: string;
};
export type ReviewNote = { id: string; checkpointId: Checkpoint["id"]; author: string; timestamp: string; body: string };

const band = (id: string, label: string, completed: number, total: number, focus: string): ProgressBand => ({ id, label, completed, total, focus });
const checkpoint = (
  id: string,
  title: string,
  bandName: string,
  owner: string,
  status: CheckpointStatus,
  completion: number,
  dueLabel: string,
  summary: string,
  dependency: string,
  nextStep: string,
): Checkpoint => ({ id, title, band: bandName, owner, status, completion, dueLabel, summary, dependency, nextStep });
const note = (id: string, checkpointId: string, author: string, timestamp: string, body: string): ReviewNote => ({ id, checkpointId, author, timestamp, body });

export const milestoneSummary: MilestoneSummary = {
  title: "Milestone Checkpoint Grid",
  cycle: "Cycle 12B",
  dueWindow: "April 24 to April 28",
  reviewDate: "April 26 review desk",
  summary: "Feature-local dashboard for checkpoint review, owner triage, and note capture with no shared state.",
};

export const checkpointOwners = ["Ops North", "Platform", "QA Dock", "Release Desk"];
export const progressBands = [
  band("intake", "Intake", 1, 2, "Scope aligned and owner coverage assigned."),
  band("assembly", "Assembly", 0, 2, "Dependencies are still settling across the middle lane."),
  band("review", "Review", 1, 2, "Validation is healthy but one rollback brief is still active."),
  band("approval", "Approval", 1, 2, "Leadership sign-off is blocked on a final handoff stack."),
];

export const checkpoints = [
  checkpoint("intake-trim", "Intake trim locked", "Intake", "Platform", "complete", 100, "Locked April 19", "Scope trim and payload tags are stable for the next review pass.", "Tracker labels normalized", "Hand off the accepted brief to Ops North."),
  checkpoint("spec-freeze", "Spec freeze handoff", "Intake", "Ops North", "active", 84, "Due April 22", "Owner checklist is almost complete, but two briefs still need confirmation.", "Final owner sign-off", "Confirm the remaining reviewer pair before noon."),
  checkpoint("dependency-matrix", "Dependency matrix sweep", "Assembly", "QA Dock", "watch", 62, "Due April 23", "Coverage is broad enough to continue, but one lane is slipping behind expected pace.", "QA dock replay bundle", "Flag the unstable lane for a targeted replay."),
  checkpoint("sandbox-burn", "Sandbox burn rehearsal", "Assembly", "Release Desk", "active", 48, "Due April 24", "The rehearsal deck is wired, although two operator prompts still need cleanup.", "Prompt revision packet", "Rehearse the fallback path with the release lead."),
  checkpoint("rehearsal-pass", "Rehearsal pass signed", "Review", "QA Dock", "complete", 100, "Signed April 20", "The mock review completed with no carry-over issues for the next lane.", "Replay evidence archived", "Move the final note set into the approval queue."),
  checkpoint("rollback-map", "Rollback map review", "Review", "Platform", "active", 92, "Due April 24", "Fallback routing is drafted and only needs the last operator check.", "Operator acknowledgment", "Confirm the rollback owner on the daily review call."),
  checkpoint("signoff-stack", "Sign-off stack ready", "Approval", "Release Desk", "blocked", 36, "Blocked until April 25", "Leadership sign-off is waiting on an unresolved handoff between review and release.", "Approval packet from review", "Unblock the packet and re-open the sign-off lane."),
  checkpoint("closeout-pack", "Closeout pack published", "Approval", "Ops North", "complete", 100, "Published April 18", "Closeout notes, owner map, and archived references are in the final package.", "Archive bundle complete", "Hold for the next milestone rollover."),
];

export const reviewNotes = [
  note("note-01", "spec-freeze", "Review lead", "Apr 19, 09:15", "Owner matrix is clean; only the final reviewer pair needs a response."),
  note("note-02", "dependency-matrix", "QA Dock", "Apr 19, 10:05", "One dependency lane is re-running with reduced scope so the broader sweep can continue."),
  note("note-03", "sandbox-burn", "Release Desk", "Apr 19, 11:22", "Prompt cleanup is small, but it blocks the rehearsal script from being final."),
  note("note-04", "rollback-map", "Platform", "Apr 19, 12:10", "Rollback routing looks solid; operator confirmation is the only remaining gate."),
  note("note-05", "signoff-stack", "Approval desk", "Apr 19, 13:40", "Blocked until the review packet arrives with the corrected attachments."),
  note("note-06", "closeout-pack", "Ops North", "Apr 19, 14:05", "Archive links were checked and the closeout package is ready for rollover."),
];
