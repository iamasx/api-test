export type ExperimentStatus = "active" | "watch" | "stabilizing" | "archived";
export type StatusFilter = ExperimentStatus | "all";
export type ObservationSection = "notes" | "flags" | "timeline";

export type NotebookStatus = { label: string; phase: string; syncLabel: string; lastEntrySummary: string };
export type StatusOption = { id: StatusFilter; label: string };
export type MilestoneTag = { id: string; label: string; tone: "sky" | "amber" | "emerald" | "rose" };
export type Experiment = {
  id: string; title: string; lead: string; status: ExperimentStatus; summary: string; focus: string;
  window: string; progressValue: number; progressLabel: string; sampleCount: number; lastEntry: string; milestoneIds: string[];
};
export type ObservationEntry = {
  id: string; experimentId: string; section: ObservationSection; headline: string; snippet: string;
  detail: string; capturedAt: string; recorder: string; milestoneId?: string;
};

export const notebookStatus: NotebookStatus = {
  label: "Notebook online",
  phase: "Bench 4 sync window",
  syncLabel: "Synced 18 minutes ago",
  lastEntrySummary: "Heat drift dropped after the solvent ratio moved from 28% to 24%.",
};

export const statusOptions: StatusOption[] = [
  { id: "all", label: "All cards" }, { id: "active", label: "Active" }, { id: "watch", label: "Watch" },
  { id: "stabilizing", label: "Stabilizing" }, { id: "archived", label: "Archived" },
];

export const milestoneTags: MilestoneTag[] = [
  { id: "capture", label: "Signal capture", tone: "sky" }, { id: "mix", label: "Ratio swap", tone: "amber" },
  { id: "stability", label: "Stability gate", tone: "emerald" }, { id: "variance", label: "Variance watch", tone: "rose" },
];

export const experiments: Experiment[] = [
  {
    id: "vector-12", title: "Vector 12 catalyst assay", lead: "Dr. Lin Mora", status: "active",
    summary: "Comparing solvent ratios across four trays to tighten signal consistency before the next review window.",
    focus: "Tray C retained the strongest read without the late-cycle spike.", window: "Next readout in 42 min",
    progressValue: 72, progressLabel: "Run 6 of 8", sampleCount: 24,
    lastEntry: "Signal tightened after the second ratio swap and held across the last two pulls.", milestoneIds: ["capture", "mix", "stability"],
  },
  {
    id: "amber-04", title: "Amber 04 thermal loop", lead: "Ira Sol", status: "watch",
    summary: "Following an intermittent rise in coil temperature during the cooldown band after each third pulse.",
    focus: "Thermal recovery is stable until pulse three, then slips outside the preferred curve.", window: "Manual watch until 19:40",
    progressValue: 46, progressLabel: "Pulse set 3", sampleCount: 18,
    lastEntry: "Cooldown lag reappeared on the final pulse set with a shorter plateau than yesterday.", milestoneIds: ["variance", "capture"],
  },
  {
    id: "north-arc", title: "North Arc reagent ladder", lead: "M. Ortega", status: "stabilizing",
    summary: "Verifying whether the updated reagent ladder reduces noise in the lower-band observations.",
    focus: "The middle rung is now steady, but the lower rung still needs one more clean repeat.", window: "Review checkpoint at 20:15",
    progressValue: 88, progressLabel: "Validation pass", sampleCount: 31,
    lastEntry: "The lower rung cleared one repeat without drift and now needs a second confirmation.", milestoneIds: ["mix", "stability"],
  },
];

export const observationEntries: ObservationEntry[] = [
  {
    id: "v12-note-1", experimentId: "vector-12", section: "notes", headline: "Ratio swap narrowed the spread",
    snippet: "Cycle six closed to a 3.2% variance after the solvent ratio moved down four points.",
    detail: "Tray C and Tray D converged within the same tolerance band after the swap, which did not happen in the previous two runs.",
    capturedAt: "18:12", recorder: "L. Mora", milestoneId: "mix",
  },
  {
    id: "v12-flag-1", experimentId: "vector-12", section: "flags", headline: "Watch the final tray handoff",
    snippet: "The last tray still warms faster than the others during the transfer interval.",
    detail: "If the handoff warm-up exceeds three minutes again, pause the next pull and repeat the transfer with the shorter dwell setting.",
    capturedAt: "18:25", recorder: "A. Pike", milestoneId: "variance",
  },
  {
    id: "v12-time-1", experimentId: "vector-12", section: "timeline", headline: "Stability gate cleared",
    snippet: "Two consecutive pulls stayed within the notebook target band after the ratio change.",
    detail: "That clears the local stability gate and keeps the assay on track for the final review window tonight.",
    capturedAt: "18:31", recorder: "L. Mora", milestoneId: "stability",
  },
  {
    id: "a04-note-1", experimentId: "amber-04", section: "notes", headline: "Thermal rise stayed late",
    snippet: "Pulse three still drifted high, but the rise started twenty seconds later than the earlier run.",
    detail: "That delay suggests the shield is helping, though not enough to remove the deviation completely.",
    capturedAt: "17:58", recorder: "I. Sol", milestoneId: "capture",
  },
  {
    id: "a04-flag-1", experimentId: "amber-04", section: "flags", headline: "Hold for manual watch",
    snippet: "Leave this loop under operator watch until another cooldown cycle clears without a spike.",
    detail: "The notebook should stay on the watch filter until the recovery curve stays under the upper bound for two consecutive pulse sets.",
    capturedAt: "18:05", recorder: "R. Vale", milestoneId: "variance",
  },
  {
    id: "na-note-1", experimentId: "north-arc", section: "notes", headline: "Lower rung nearly steady",
    snippet: "The lower rung held cleanly through one repeat with no edge noise in the final band.",
    detail: "A matching repeat would let the team close this ladder as stable and move the notebook card out of active handling.",
    capturedAt: "17:42", recorder: "M. Ortega", milestoneId: "stability",
  },
  {
    id: "na-time-1", experimentId: "north-arc", section: "timeline", headline: "Validation pass queued",
    snippet: "The second confirmation run is staged for the 20:15 checkpoint with the revised reagent ladder.",
    detail: "If the lower rung holds again, the notebook can promote the card from stabilizing to complete in the next review cycle.",
    capturedAt: "17:49", recorder: "N. Hsu", milestoneId: "mix",
  },
];
