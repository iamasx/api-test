export type ExperimentStatus = "active" | "watch" | "stabilizing" | "archived";
export type StatusFilter = ExperimentStatus | "all";
export type ObservationSection = "notes" | "flags" | "timeline";
export type BoardLaneId = "intake" | "compare" | "review";
export type RunState = "planned" | "running" | "review" | "complete";
export type RunMetricId = "signal" | "variance" | "cycle" | "watchFlags";
export type ComparisonView = "summary" | "detail";
export type ReviewDecisionId = "promote" | "rerun" | "hold";

export type NotebookStatus = {
  label: string;
  phase: string;
  syncLabel: string;
  lastEntrySummary: string;
};

export type StatusOption = { id: StatusFilter; label: string };
export type MilestoneTag = {
  id: string;
  label: string;
  tone: "sky" | "amber" | "emerald" | "rose";
};

export type BoardLane = {
  id: BoardLaneId;
  label: string;
  description: string;
  emphasis: string;
};

export type ExperimentTemplate = {
  id: string;
  name: string;
  category: string;
  summary: string;
  objective: string;
  cadence: string;
  defaultLead: string;
  defaultBoardLaneId: BoardLaneId;
  checkpointMilestoneIds: string[];
  compareHint: string;
  reviewPrompts: string[];
  boardNotes: string[];
};

export type Experiment = {
  id: string;
  title: string;
  lead: string;
  status: ExperimentStatus;
  templateId: string;
  summary: string;
  focus: string;
  window: string;
  progressValue: number;
  progressLabel: string;
  sampleCount: number;
  lastEntry: string;
  milestoneIds: string[];
  boardLaneId: BoardLaneId;
  comparisonRunIds: string[];
  recommendation: string;
  boardNote: string;
};

export type RunMetrics = Record<RunMetricId, number>;

export type ExperimentRun = {
  id: string;
  experimentId: string;
  label: string;
  state: RunState;
  startedAt: string;
  operator: string;
  setup: string;
  summary: string;
  focus: string;
  detail: string;
  decisionNote: string;
  highlights: string[];
  metrics: RunMetrics;
};

export type ObservationEntry = {
  id: string;
  experimentId: string;
  runId: string;
  section: ObservationSection;
  headline: string;
  snippet: string;
  detail: string;
  capturedAt: string;
  recorder: string;
  milestoneId?: string;
};

export type ReviewHelper = {
  id: string;
  label: string;
  description: string;
  defaultChecked: boolean;
};

export type OutcomeReview = {
  id: string;
  experimentId: string;
  templateId: string;
  headline: string;
  summary: string;
  recommendedDecision: ReviewDecisionId;
  owner: string;
  dueWindow: string;
  helperChecklist: ReviewHelper[];
  prompts: string[];
};

export type ReviewDecisionOption = {
  id: ReviewDecisionId;
  label: string;
  boardLaneId: BoardLaneId;
  status: ExperimentStatus;
  recommendation: string;
  summary: string;
};

export type ComparisonMetric = {
  id: RunMetricId;
  label: string;
  unit: string;
  better: "higher" | "lower";
};

export type ExperimentBundle = {
  experiment: Experiment;
  runs: ExperimentRun[];
  observationEntries: ObservationEntry[];
  outcomeReview: OutcomeReview;
};

export const notebookStatus: NotebookStatus = {
  label: "Notebook online",
  phase: "Bench 4 sync window",
  syncLabel: "Synced 18 minutes ago",
  lastEntrySummary: "Heat drift dropped after the solvent ratio moved from 28% to 24%.",
};

export const statusOptions: StatusOption[] = [
  { id: "all", label: "All cards" },
  { id: "active", label: "Active" },
  { id: "watch", label: "Watch" },
  { id: "stabilizing", label: "Stabilizing" },
  { id: "archived", label: "Archived" },
];

export const milestoneTags: MilestoneTag[] = [
  { id: "capture", label: "Signal capture", tone: "sky" },
  { id: "mix", label: "Ratio swap", tone: "amber" },
  { id: "stability", label: "Stability gate", tone: "emerald" },
  { id: "variance", label: "Variance watch", tone: "rose" },
];

export const boardLanes: BoardLane[] = [
  {
    id: "intake",
    label: "Template intake",
    description: "Draft boards, setup notes, and paired runs waiting for a first comparison pass.",
    emphasis: "Seeded from templates",
  },
  {
    id: "compare",
    label: "Active comparison",
    description: "Experiments with enough recorded runs to compare in summary and detail without leaving the notebook.",
    emphasis: "Multi-run analysis",
  },
  {
    id: "review",
    label: "Outcome review",
    description: "Boards prepared for verdicts, handoff notes, and the next board move after a comparison cycle.",
    emphasis: "Review helpers ready",
  },
];

export const comparisonMetrics: ComparisonMetric[] = [
  { id: "signal", label: "Signal score", unit: "pts", better: "higher" },
  { id: "variance", label: "Variance", unit: "%", better: "lower" },
  { id: "cycle", label: "Cycle time", unit: "min", better: "lower" },
  { id: "watchFlags", label: "Watch flags", unit: "", better: "lower" },
];

export const reviewDecisionOptions: ReviewDecisionOption[] = [
  {
    id: "promote",
    label: "Promote to review lane",
    boardLaneId: "review",
    status: "stabilizing",
    recommendation: "Promote the strongest run and package the comparison for handoff review.",
    summary: "Move the card into the review lane with the selected runs attached as the comparison set.",
  },
  {
    id: "rerun",
    label: "Schedule rerun",
    boardLaneId: "intake",
    status: "watch",
    recommendation: "Schedule another paired run before promoting this board beyond intake.",
    summary: "Return the card to intake with a fresh baseline and candidate run to gather better evidence.",
  },
  {
    id: "hold",
    label: "Hold on comparison lane",
    boardLaneId: "compare",
    status: "watch",
    recommendation: "Keep the card in active comparison until another clean pass closes the open watch items.",
    summary: "Stay in the comparison lane while the team logs more evidence from the selected template.",
  },
];

export const experimentTemplates: ExperimentTemplate[] = [
  {
    id: "assay-ratio",
    name: "Assay ratio sweep",
    category: "Catalyst assay",
    summary: "Designed for solvent-ratio experiments that need quick variance checks before the evening review window.",
    objective: "Compare ratio swaps side by side and capture which tray holds the cleanest signal.",
    cadence: "Pair every two pulls",
    defaultLead: "Dr. Lin Mora",
    defaultBoardLaneId: "compare",
    checkpointMilestoneIds: ["capture", "mix", "stability"],
    compareHint: "Compare post-swap runs against the baseline and keep the warm-up handoff visible.",
    reviewPrompts: [
      "Did the ratio change hold for at least two clean pulls?",
      "Can the strongest tray advance without a new late-cycle spike?",
      "Is there enough evidence to package the assay for the stability review lane?",
    ],
    boardNotes: [
      "Keep the final tray handoff under the watch threshold before promoting.",
      "Attach both the baseline and candidate runs to the review summary.",
    ],
  },
  {
    id: "thermal-recovery",
    name: "Thermal recovery ladder",
    category: "Cooldown loop",
    summary: "A template for pulse-based thermal experiments where the recovery curve must be compared after each shield adjustment.",
    objective: "Track whether cooldown timing improves across paired shield or dwell changes.",
    cadence: "Compare every pulse set",
    defaultLead: "Ira Sol",
    defaultBoardLaneId: "compare",
    checkpointMilestoneIds: ["capture", "variance"],
    compareHint: "Use the paired runs to compare the recovery delay, total cycle time, and watch flags before escalation.",
    reviewPrompts: [
      "Did the cooldown rise move later in the cycle across more than one run?",
      "Are manual-watch steps still required after the new shield setting?",
      "Should the next board move be another rerun or a promotion into outcome review?",
    ],
    boardNotes: [
      "Any run with a repeated pulse-three spike stays visible on the compare lane.",
      "Include a manual-watch owner before promoting the notebook card.",
    ],
  },
  {
    id: "reagent-ladder",
    name: "Reagent ladder validation",
    category: "Noise reduction",
    summary: "A template for ladder and rung validation work where teams need repeatable comparisons before closing a stability gate.",
    objective: "Confirm the updated ladder removes lower-band noise and earns a clean validation repeat.",
    cadence: "Compare validation passes",
    defaultLead: "M. Ortega",
    defaultBoardLaneId: "review",
    checkpointMilestoneIds: ["mix", "stability"],
    compareHint: "Compare the validation passes with the lower rung in focus and keep the review prompts attached to the board.",
    reviewPrompts: [
      "Did the lower rung hold across consecutive validation passes?",
      "Can the board move into outcome review without another ladder adjustment?",
      "Which notes must stay attached for the final handoff?",
    ],
    boardNotes: [
      "Review cards should carry the best pass and the prior repeat for context.",
      "If the lower rung slips, move the board back to intake with a new ladder setup.",
    ],
  },
];

export const experiments: Experiment[] = [
  {
    id: "vector-12",
    title: "Vector 12 catalyst assay",
    lead: "Dr. Lin Mora",
    status: "active",
    templateId: "assay-ratio",
    summary: "Comparing solvent ratios across four trays to tighten signal consistency before the next review window.",
    focus: "Tray C retained the strongest read without the late-cycle spike.",
    window: "Next readout in 42 min",
    progressValue: 72,
    progressLabel: "Run 6 of 8",
    sampleCount: 24,
    lastEntry: "Signal tightened after the second ratio swap and held across the last two pulls.",
    milestoneIds: ["capture", "mix", "stability"],
    boardLaneId: "compare",
    comparisonRunIds: ["v12-run-5", "v12-run-6"],
    recommendation: "Promote the strongest run and package the comparison for handoff review.",
    boardNote: "Assay ratio sweep template is attached to every active run on this board.",
  },
  {
    id: "amber-04",
    title: "Amber 04 thermal loop",
    lead: "Ira Sol",
    status: "watch",
    templateId: "thermal-recovery",
    summary: "Following an intermittent rise in coil temperature during the cooldown band after each third pulse.",
    focus: "Thermal recovery is stable until pulse three, then slips outside the preferred curve.",
    window: "Manual watch until 19:40",
    progressValue: 46,
    progressLabel: "Pulse set 3",
    sampleCount: 18,
    lastEntry: "Cooldown lag reappeared on the final pulse set with a shorter plateau than yesterday.",
    milestoneIds: ["variance", "capture"],
    boardLaneId: "compare",
    comparisonRunIds: ["a04-run-2", "a04-run-3"],
    recommendation: "Schedule another paired run before promoting this board beyond intake.",
    boardNote: "Thermal recovery ladder keeps the manual-watch owner and cooldown prompt visible in compare view.",
  },
  {
    id: "north-arc",
    title: "North Arc reagent ladder",
    lead: "M. Ortega",
    status: "stabilizing",
    templateId: "reagent-ladder",
    summary: "Verifying whether the updated reagent ladder reduces noise in the lower-band observations.",
    focus: "The middle rung is now steady, but the lower rung still needs one more clean repeat.",
    window: "Review checkpoint at 20:15",
    progressValue: 88,
    progressLabel: "Validation pass",
    sampleCount: 31,
    lastEntry: "The lower rung cleared one repeat without drift and now needs a second confirmation.",
    milestoneIds: ["mix", "stability"],
    boardLaneId: "review",
    comparisonRunIds: ["na-run-1", "na-run-2"],
    recommendation: "Promote the strongest run and package the comparison for handoff review.",
    boardNote: "Reagent ladder validation boards stay template-aware even inside the outcome review lane.",
  },
];

export const experimentRuns: ExperimentRun[] = [
  {
    id: "v12-run-4",
    experimentId: "vector-12",
    label: "Run 4 baseline",
    state: "complete",
    startedAt: "17:08",
    operator: "L. Mora",
    setup: "28% solvent baseline, tray order A-D",
    summary: "The baseline closed with a broad spread and a warm handoff on the final tray.",
    focus: "Use this as the comparison floor for the ratio swap runs.",
    detail: "Run 4 showed the old baseline clearly: the spread widened after the fourth pull and Tray D warmed during the handoff.",
    decisionNote: "Keep as the baseline reference only; do not promote without the ratio swap pair.",
    highlights: [
      "Tray C held a cleaner mid-band than Tray D.",
      "Late-cycle spike returned on the final pull.",
    ],
    metrics: { signal: 82, variance: 6.1, cycle: 38, watchFlags: 2 },
  },
  {
    id: "v12-run-5",
    experimentId: "vector-12",
    label: "Run 5 ratio swap",
    state: "complete",
    startedAt: "17:46",
    operator: "A. Pike",
    setup: "24% solvent candidate, shortened transfer dwell",
    summary: "The ratio swap narrowed the spread and removed one of the late-cycle deviations.",
    focus: "Compare directly against Run 6 to confirm the gain holds across consecutive pulls.",
    detail: "Run 5 introduced the shorter dwell setting and a lower solvent percentage. The result was a tighter spread but one tray still heated during transfer.",
    decisionNote: "Strong candidate for comparison, but still needs a second clean pass to clear the watch note.",
    highlights: [
      "Variance dropped below five percent for the first time tonight.",
      "Transfer warm-up held under three minutes on all but the last tray.",
    ],
    metrics: { signal: 87, variance: 4.2, cycle: 35, watchFlags: 1 },
  },
  {
    id: "v12-run-6",
    experimentId: "vector-12",
    label: "Run 6 follow-up",
    state: "review",
    startedAt: "18:18",
    operator: "L. Mora",
    setup: "24% solvent candidate, repeated handoff",
    summary: "The follow-up confirmed the ratio swap and tightened the spread even further.",
    focus: "Best signal score so far; likely promotion candidate for the review lane.",
    detail: "Run 6 repeated the ratio swap and held the improved spread while trimming another minute from the cycle. Only one watch flag remained in the tray handoff.",
    decisionNote: "Promote with Run 5 as the comparison pair if the handoff note is documented.",
    highlights: [
      "Signal score improved again on the strongest tray.",
      "Second consecutive pull stayed within the local stability band.",
    ],
    metrics: { signal: 89, variance: 3.2, cycle: 34, watchFlags: 1 },
  },
  {
    id: "a04-run-1",
    experimentId: "amber-04",
    label: "Pulse set 1 baseline",
    state: "complete",
    startedAt: "16:44",
    operator: "I. Sol",
    setup: "Default shield, standard dwell",
    summary: "Baseline pulse set still spiked immediately after the third pulse.",
    focus: "Use this run to measure whether the shield adjustments actually delay the thermal rise.",
    detail: "The baseline run hit the upper bound almost immediately after the third pulse, with no delay from the previous shield pattern.",
    decisionNote: "Keep as the recovery floor; not stable enough for promotion.",
    highlights: [
      "Pulse three exceeded the watch curve by a wide margin.",
      "Cooldown recovery was noisy during the final minute.",
    ],
    metrics: { signal: 69, variance: 7.4, cycle: 52, watchFlags: 3 },
  },
  {
    id: "a04-run-2",
    experimentId: "amber-04",
    label: "Pulse set 2 shield swap",
    state: "running",
    startedAt: "17:22",
    operator: "R. Vale",
    setup: "Shield plate B, standard dwell",
    summary: "The spike moved later in the cycle but still crossed the watch threshold.",
    focus: "Compare against the next pulse set to see whether the delay is repeatable.",
    detail: "Shield plate B delayed the spike by about twenty seconds. The cooldown curve still crossed the threshold, but it did so later than the baseline.",
    decisionNote: "Keep in compare view until another run shows the same delay.",
    highlights: [
      "Delayed spike without removing the threshold breach.",
      "Cycle time fell slightly compared with the baseline.",
    ],
    metrics: { signal: 73, variance: 6.3, cycle: 49, watchFlags: 2 },
  },
  {
    id: "a04-run-3",
    experimentId: "amber-04",
    label: "Pulse set 3 short dwell",
    state: "review",
    startedAt: "18:03",
    operator: "I. Sol",
    setup: "Shield plate B, shortened dwell",
    summary: "The shorter dwell trimmed the cycle again, but the pulse-three spike persisted in a smaller window.",
    focus: "Best candidate so far, though the board still needs another rerun before review.",
    detail: "The shorter dwell helped the recovery timing and compressed the cooldown cycle, but the remaining spike means manual watch is still required.",
    decisionNote: "Use as the leading candidate, but schedule another paired run before promotion.",
    highlights: [
      "Cycle time improved without introducing a new anomaly.",
      "Manual-watch requirement remains because the spike is still present.",
    ],
    metrics: { signal: 76, variance: 5.7, cycle: 47, watchFlags: 2 },
  },
  {
    id: "na-run-1",
    experimentId: "north-arc",
    label: "Validation pass A",
    state: "complete",
    startedAt: "17:11",
    operator: "M. Ortega",
    setup: "Updated ladder, lower rung retuned",
    summary: "The first validation pass cleared the lower rung once without edge noise.",
    focus: "Compare this pass against the confirmation run before closing the stability gate.",
    detail: "Pass A removed the edge noise and gave the team the first clean lower-band repeat after the ladder update.",
    decisionNote: "Strong pass; needs a matching confirmation before closure.",
    highlights: [
      "Middle rung stayed quiet through the full cycle.",
      "Lower-band noise cleared on the first repeat.",
    ],
    metrics: { signal: 84, variance: 3.6, cycle: 31, watchFlags: 1 },
  },
  {
    id: "na-run-2",
    experimentId: "north-arc",
    label: "Validation pass B",
    state: "review",
    startedAt: "17:55",
    operator: "N. Hsu",
    setup: "Updated ladder, repeated lower rung confirmation",
    summary: "The confirmation pass matched the lower-band stability and is ready for outcome review.",
    focus: "Best confirmation set for a review-lane handoff.",
    detail: "Pass B matched the first clean validation run while lowering the remaining noise floor. This gives the board a credible outcome review package.",
    decisionNote: "Promote with Pass A attached as supporting context.",
    highlights: [
      "Lower rung stayed inside the preferred band across the full pass.",
      "Noise floor improved again on the repeated ladder setup.",
    ],
    metrics: { signal: 86, variance: 2.9, cycle: 30, watchFlags: 0 },
  },
];

export const observationEntries: ObservationEntry[] = [
  {
    id: "v12-note-1",
    experimentId: "vector-12",
    runId: "v12-run-5",
    section: "notes",
    headline: "Ratio swap narrowed the spread",
    snippet: "Run 5 closed to a 4.2% variance after the solvent ratio moved down four points.",
    detail: "Tray C and Tray D converged within the same tolerance band after the swap, which did not happen in the baseline run.",
    capturedAt: "17:58",
    recorder: "L. Mora",
    milestoneId: "mix",
  },
  {
    id: "v12-note-2",
    experimentId: "vector-12",
    runId: "v12-run-6",
    section: "notes",
    headline: "Follow-up pull held the gain",
    snippet: "Run 6 repeated the ratio swap and kept the variance just above three percent.",
    detail: "The follow-up pull held the new ratio and kept the tray spread inside the local stability band for a second straight cycle.",
    capturedAt: "18:27",
    recorder: "A. Pike",
    milestoneId: "stability",
  },
  {
    id: "v12-flag-1",
    experimentId: "vector-12",
    runId: "v12-run-6",
    section: "flags",
    headline: "Watch the final tray handoff",
    snippet: "The last tray still warms faster than the others during the transfer interval.",
    detail: "If the handoff warm-up exceeds three minutes again, pause the next pull and repeat the transfer with the shorter dwell setting.",
    capturedAt: "18:31",
    recorder: "A. Pike",
    milestoneId: "variance",
  },
  {
    id: "v12-time-1",
    experimentId: "vector-12",
    runId: "v12-run-5",
    section: "timeline",
    headline: "Baseline pair attached",
    snippet: "Run 5 is now attached as the baseline candidate for the comparison workflow.",
    detail: "That gives the notebook a clean baseline-to-candidate pair for the summary view and the detailed review cards.",
    capturedAt: "18:03",
    recorder: "L. Mora",
    milestoneId: "capture",
  },
  {
    id: "v12-time-2",
    experimentId: "vector-12",
    runId: "v12-run-6",
    section: "timeline",
    headline: "Stability gate queued",
    snippet: "Run 6 cleared the local gate and queued the outcome review helper set.",
    detail: "With two runs in context, the board can move into the review lane as soon as the transfer note is confirmed.",
    capturedAt: "18:34",
    recorder: "L. Mora",
    milestoneId: "stability",
  },
  {
    id: "a04-note-1",
    experimentId: "amber-04",
    runId: "a04-run-2",
    section: "notes",
    headline: "Thermal rise stayed late",
    snippet: "Pulse set 2 still drifted high, but the rise started twenty seconds later than the earlier run.",
    detail: "That delay suggests the shield is helping, though not enough to remove the deviation completely.",
    capturedAt: "17:41",
    recorder: "I. Sol",
    milestoneId: "capture",
  },
  {
    id: "a04-note-2",
    experimentId: "amber-04",
    runId: "a04-run-3",
    section: "notes",
    headline: "Short dwell improved the cycle",
    snippet: "Pulse set 3 cut another two minutes without adding a new anomaly.",
    detail: "The shorter dwell tightened the cycle and preserved the delayed spike, but the loop still needs a cleaner pass before promotion.",
    capturedAt: "18:09",
    recorder: "R. Vale",
  },
  {
    id: "a04-flag-1",
    experimentId: "amber-04",
    runId: "a04-run-3",
    section: "flags",
    headline: "Hold for manual watch",
    snippet: "Leave this loop under operator watch until another cooldown cycle clears without a spike.",
    detail: "The board should stay visible on the compare lane until the recovery curve stays under the upper bound for two consecutive pulse sets.",
    capturedAt: "18:12",
    recorder: "R. Vale",
    milestoneId: "variance",
  },
  {
    id: "a04-time-1",
    experimentId: "amber-04",
    runId: "a04-run-2",
    section: "timeline",
    headline: "Manual-watch owner attached",
    snippet: "The template board now carries the watch owner and escalation note in comparison view.",
    detail: "That keeps the run context visible during review so the next decision can send the board to intake or keep it in compare.",
    capturedAt: "17:48",
    recorder: "I. Sol",
  },
  {
    id: "na-note-1",
    experimentId: "north-arc",
    runId: "na-run-1",
    section: "notes",
    headline: "Lower rung nearly steady",
    snippet: "The lower rung held cleanly through one repeat with no edge noise in the final band.",
    detail: "A matching repeat would let the team close this ladder as stable and move the notebook card out of active handling.",
    capturedAt: "17:33",
    recorder: "M. Ortega",
    milestoneId: "stability",
  },
  {
    id: "na-note-2",
    experimentId: "north-arc",
    runId: "na-run-2",
    section: "notes",
    headline: "Confirmation pass matched the first result",
    snippet: "Validation pass B stayed inside the target band and lowered the residual noise floor.",
    detail: "The confirmation run backed up the first clean pass and gave the board enough evidence for the outcome review helpers.",
    capturedAt: "18:02",
    recorder: "N. Hsu",
    milestoneId: "mix",
  },
  {
    id: "na-flag-1",
    experimentId: "north-arc",
    runId: "na-run-2",
    section: "flags",
    headline: "Carry forward the lower-band note",
    snippet: "Keep the lower-rung noise note attached during the final handoff even though the latest pass cleared it.",
    detail: "That note explains why both validation passes are attached to the review lane and why the ladder setup should remain visible after promotion.",
    capturedAt: "18:06",
    recorder: "M. Ortega",
    milestoneId: "variance",
  },
  {
    id: "na-time-1",
    experimentId: "north-arc",
    runId: "na-run-2",
    section: "timeline",
    headline: "Validation pass queued for review",
    snippet: "The second confirmation run is staged for the 20:15 checkpoint with the updated ladder package.",
    detail: "If the board keeps both passes attached, the notebook can promote the lane and complete the review without another ladder change.",
    capturedAt: "18:08",
    recorder: "N. Hsu",
    milestoneId: "stability",
  },
];

export const outcomeReviews: OutcomeReview[] = [
  {
    id: "review-vector-12",
    experimentId: "vector-12",
    templateId: "assay-ratio",
    headline: "Package the ratio sweep for tonight's stability review.",
    summary: "Run 5 and Run 6 form a clean comparison pair, but the transfer handoff note still needs explicit confirmation.",
    recommendedDecision: "promote",
    owner: "L. Mora",
    dueWindow: "Outcome desk at 19:10",
    helperChecklist: [
      {
        id: "vector-helper-1",
        label: "Attach two comparison runs",
        description: "Keep both the baseline candidate and the follow-up run attached to the board.",
        defaultChecked: true,
      },
      {
        id: "vector-helper-2",
        label: "Review the tray handoff note",
        description: "Confirm the final tray transfer stayed under the local watch threshold.",
        defaultChecked: false,
      },
      {
        id: "vector-helper-3",
        label: "Draft the review summary",
        description: "Prepare the stability gate summary for the wider team.",
        defaultChecked: true,
      },
    ],
    prompts: [
      "Which run becomes the lead example in the review handoff?",
      "Does the handoff note require one more operator comment before promotion?",
    ],
  },
  {
    id: "review-amber-04",
    experimentId: "amber-04",
    templateId: "thermal-recovery",
    headline: "Decide whether the thermal loop needs another rerun or can stay in comparison.",
    summary: "The latest pulse set is better, but the board still carries a manual-watch flag and does not yet have a clean cooldown repeat.",
    recommendedDecision: "rerun",
    owner: "R. Vale",
    dueWindow: "Manual watch check-in at 19:40",
    helperChecklist: [
      {
        id: "amber-helper-1",
        label: "Compare at least two pulse sets",
        description: "Keep the shield swap and short-dwell runs visible in the comparison set.",
        defaultChecked: true,
      },
      {
        id: "amber-helper-2",
        label: "Assign a watch owner",
        description: "Carry the operator watch owner into the board summary.",
        defaultChecked: true,
      },
      {
        id: "amber-helper-3",
        label: "Clear one cooldown cycle",
        description: "Wait for a full pulse set that clears without the pulse-three spike.",
        defaultChecked: false,
      },
    ],
    prompts: [
      "Does the delayed spike justify another rerun with the same shield setting?",
      "Would a hold decision keep the right level of operator attention on the board?",
    ],
  },
  {
    id: "review-north-arc",
    experimentId: "north-arc",
    templateId: "reagent-ladder",
    headline: "Close the ladder validation with both confirmation passes attached.",
    summary: "The pair of validation runs is strong enough for the outcome review lane, provided the lower-band note stays attached.",
    recommendedDecision: "promote",
    owner: "M. Ortega",
    dueWindow: "Review checkpoint at 20:15",
    helperChecklist: [
      {
        id: "north-helper-1",
        label: "Keep both validation passes attached",
        description: "Attach the original clean pass and the confirmation pass together.",
        defaultChecked: true,
      },
      {
        id: "north-helper-2",
        label: "Preserve the lower-band note",
        description: "Carry forward why the validation pair matters in the final handoff.",
        defaultChecked: true,
      },
      {
        id: "north-helper-3",
        label: "Confirm the final gate owner",
        description: "Make sure the closing reviewer is assigned before the board leaves the notebook.",
        defaultChecked: false,
      },
    ],
    prompts: [
      "Is any additional ladder evidence required, or is the pair enough for closure?",
      "What context must remain visible after the board leaves the notebook route?",
    ],
  },
];

const draftMetricSeeds: Record<string, { signal: number; variance: number; cycle: number }> = {
  "assay-ratio": { signal: 84, variance: 4.9, cycle: 36 },
  "thermal-recovery": { signal: 74, variance: 5.9, cycle: 48 },
  "reagent-ladder": { signal: 82, variance: 3.8, cycle: 32 },
};

export function createExperimentBundleFromTemplate(
  template: ExperimentTemplate,
  sequence: number,
): ExperimentBundle {
  const experimentId = `${template.id}-draft-${sequence}`;
  const baselineRunId = `${experimentId}-baseline`;
  const candidateRunId = `${experimentId}-candidate`;
  const seed = draftMetricSeeds[template.id] ?? { signal: 80, variance: 5.1, cycle: 38 };

  const experiment: Experiment = {
    id: experimentId,
    title: `${template.name} draft ${sequence}`,
    lead: template.defaultLead,
    status: "active",
    templateId: template.id,
    summary: `Local draft seeded from the ${template.name.toLowerCase()} template so the team can start a paired comparison without leaving the notebook.`,
    focus: `Draft board is tracking ${template.objective.toLowerCase()}.`,
    window: "Template kickoff queued for the next bench opening",
    progressValue: 18,
    progressLabel: "Draft setup",
    sampleCount: 12,
    lastEntry: "Template draft opened with baseline and candidate runs ready for a local comparison pass.",
    milestoneIds: template.checkpointMilestoneIds,
    boardLaneId: "intake",
    comparisonRunIds: [baselineRunId, candidateRunId],
    recommendation: "Keep the draft on intake until the paired runs are compared and documented.",
    boardNote: `${template.name} board notes stay attached from the moment the draft is created.`,
  };

  const runs: ExperimentRun[] = [
    {
      id: baselineRunId,
      experimentId,
      label: "Baseline run",
      state: "planned",
      startedAt: "Queued",
      operator: template.defaultLead,
      setup: "Baseline setup copied from the selected template",
      summary: "The draft baseline run is parked and waiting for the first capture window.",
      focus: "Use this run as the floor for the candidate comparison.",
      detail: `This baseline run inherits the ${template.name.toLowerCase()} template defaults so the team can capture a first reference point quickly.`,
      decisionNote: "Keep in intake until the candidate run lands beside it.",
      highlights: [
        "Baseline run is already attached to the notebook card.",
        "Template checkpoints remain visible in the intake lane.",
      ],
      metrics: {
        signal: seed.signal,
        variance: seed.variance,
        cycle: seed.cycle,
        watchFlags: 2,
      },
    },
    {
      id: candidateRunId,
      experimentId,
      label: "Candidate run",
      state: "planned",
      startedAt: "Queued",
      operator: template.defaultLead,
      setup: "Candidate setup copied from the selected template",
      summary: "The draft candidate run is staged to pair against the baseline once the bench opens.",
      focus: "Use this run to prove the first improvement before the board leaves intake.",
      detail: `This candidate run mirrors the ${template.name.toLowerCase()} board notes so the team can compare two runs immediately after creation.`,
      decisionNote: "Promote to compare only after both intake runs are recorded.",
      highlights: [
        "Candidate run is attached to the same template-aware board.",
        "Outcome prompts are prepared before the first observation is captured.",
      ],
      metrics: {
        signal: seed.signal + 3,
        variance: Number((seed.variance - 0.8).toFixed(1)),
        cycle: Math.max(seed.cycle - 2, 24),
        watchFlags: 1,
      },
    },
  ];

  const observationEntries: ObservationEntry[] = [
    {
      id: `${experimentId}-note-1`,
      experimentId,
      runId: baselineRunId,
      section: "notes",
      headline: "Draft notebook board created",
      snippet: `The ${template.name.toLowerCase()} template seeded a fresh intake board with paired runs attached.`,
      detail: "The notebook now carries template notes, paired comparison runs, and the first outcome prompts without touching shared state.",
      capturedAt: "Queued",
      recorder: template.defaultLead,
      milestoneId: template.checkpointMilestoneIds[0],
    },
    {
      id: `${experimentId}-flag-1`,
      experimentId,
      runId: candidateRunId,
      section: "flags",
      headline: "Candidate run still needs a first capture",
      snippet: "Keep the card in intake until the candidate run records its first pass.",
      detail: "The board should not leave the intake lane until both runs have data and the team can compare them side by side.",
      capturedAt: "Queued",
      recorder: template.defaultLead,
      milestoneId: template.checkpointMilestoneIds.at(-1),
    },
    {
      id: `${experimentId}-time-1`,
      experimentId,
      runId: candidateRunId,
      section: "timeline",
      headline: "Outcome prompts loaded",
      snippet: "The review helpers and next-board actions are staged as soon as the draft is created.",
      detail: "That keeps the notebook aligned with the template before any runs move into comparison or review.",
      capturedAt: "Queued",
      recorder: template.defaultLead,
    },
  ];

  const outcomeReview: OutcomeReview = {
    id: `${experimentId}-review`,
    experimentId,
    templateId: template.id,
    headline: `Guide the first board move for ${template.name.toLowerCase()}.`,
    summary: "Draft outcome helpers are available immediately so the team can decide whether the next move is compare, rerun, or promotion.",
    recommendedDecision: "hold",
    owner: template.defaultLead,
    dueWindow: "After the first paired run capture",
    helperChecklist: [
      {
        id: `${experimentId}-helper-1`,
        label: "Keep both draft runs attached",
        description: "The comparison workflow only unlocks once both runs remain attached to the board.",
        defaultChecked: true,
      },
      {
        id: `${experimentId}-helper-2`,
        label: "Capture the first template note",
        description: "Add the opening notebook note before moving the board beyond intake.",
        defaultChecked: false,
      },
      {
        id: `${experimentId}-helper-3`,
        label: "Carry forward template prompts",
        description: "Keep the template review prompts visible when the board starts comparing runs.",
        defaultChecked: true,
      },
    ],
    prompts: template.reviewPrompts,
  };

  return {
    experiment,
    runs,
    observationEntries,
    outcomeReview,
  };
}
