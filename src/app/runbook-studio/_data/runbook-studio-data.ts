export type RunbookStatus = "active" | "approved" | "draft";
export type RevisionState = "published" | "approval" | "editing";
export type ExecutionPreviewState = "ready" | "active" | "watch";

export interface RunbookStudioStat {
  label: string;
  value: string;
  detail: string;
}

export interface RunbookRevision {
  version: string;
  state: RevisionState;
  updatedAt: string;
  editor: string;
  reviewer: string;
  summary: string;
  notes: string[];
}

export interface RunbookExecutionStep {
  id: string;
  label: string;
  owner: string;
  timing: string;
  detail: string;
}

export interface RunbookExecutionProfile {
  targetWindow: string;
  expectedDuration: string;
  operator: string;
  environment: string;
  verification: string;
  outputs: string[];
  steps: RunbookExecutionStep[];
}

export interface RunbookProcedure {
  id: string;
  code: string;
  title: string;
  status: RunbookStatus;
  priority: string;
  summary: string;
  objective: string;
  owner: string;
  tags: string[];
  dependencies: string[];
  revision: RunbookRevision;
  execution: RunbookExecutionProfile;
}

export interface RunbookGroup {
  id: string;
  label: string;
  title: string;
  description: string;
  handoff: string;
  procedures: RunbookProcedure[];
}

export interface ExecutionPreview {
  id: string;
  label: string;
  title: string;
  state: ExecutionPreviewState;
  window: string;
  operator: string;
  duration: string;
  summary: string;
  signals: string[];
  outputs: string[];
  steps: RunbookExecutionStep[];
}

export interface RevisionMetric {
  label: string;
  value: string;
  detail: string;
}

export interface RevisionSummary {
  label: string;
  title: string;
  description: string;
  metrics: RevisionMetric[];
  changedAreas: string[];
  nextReviews: string[];
  releaseNotes: string[];
}

export const runbookStudioOverview = {
  eyebrow: "Runbook Studio",
  title: "Review the runbook set, preview execution flow, and track revision drift before release.",
  description:
    "This route stages grouped procedures for operations, field recovery, and handoff control. Each runbook carries revision metadata, execution timing, and preview detail so release review stays attached to the exact workflow it changes.",
  stats: [
    {
      label: "Runbooks staged",
      value: "6",
      detail: "Three grouped procedure lanes with revision-aware execution detail",
    },
    {
      label: "Execution previews",
      value: "3",
      detail: "Representative dry runs for startup, recovery, and audit capture",
    },
    {
      label: "Latest release cut",
      value: "R7.4",
      detail: "Includes two active runbooks, two approved updates, and two drafts",
    },
  ] satisfies RunbookStudioStat[],
};

export const runbookGroups = [
  {
    id: "console-control",
    label: "Console control",
    title: "Prepare the desk before the first operator handoff",
    description:
      "These runbooks cover the opening desk motions that stabilize the console, sync telemetry, and expose the first execution risks before the shift commits the live window.",
    handoff:
      "Release this group first so the startup desk and telemetry lead are working from the same revision set.",
    procedures: [
      {
        id: "console-warm-start",
        code: "RB-104",
        title: "Console Warm-Start Sequence",
        status: "active",
        priority: "High",
        summary:
          "Bring the desk online, verify mirrored feeds, and anchor the first operator checklist before field calls begin.",
        objective:
          "Reduce startup ambiguity by forcing the console state, mirror sync, and handoff note capture into one controlled sequence.",
        owner: "Desk operations",
        tags: ["startup", "telemetry", "operator handoff"],
        dependencies: [
          "Primary relay mirror already synced",
          "Shift lead present for final sign-off",
          "Escalation board cleared of overnight holds",
        ],
        revision: {
          version: "v7.4",
          state: "published",
          updatedAt: "April 18, 2026",
          editor: "M. Keene",
          reviewer: "R. Salazar",
          summary:
            "Consolidated the mirror-verification and escalation-board checks into the opening minute of the sequence.",
          notes: [
            "Moved relay drift confirmation ahead of the first operator announcement.",
            "Added a fallback capture note when the overnight board still holds unresolved alerts.",
            "Clarified who owns the final warm-start sign-off when the shift lead is remote.",
          ],
        },
        execution: {
          targetWindow: "05:40-05:52 local",
          expectedDuration: "12 minutes",
          operator: "Startup desk lead",
          environment: "Control room / mirrored console pair",
          verification: "Warm-start is complete when both telemetry panes remain stable for 90 seconds.",
          outputs: [
            "Signed warm-start checkpoint in the shift log",
            "Fresh escalation board snapshot",
            "Confirmed relay mirror timestamp",
          ],
          steps: [
            {
              id: "console-boot",
              label: "Stage the paired consoles",
              owner: "Desk operations",
              timing: "Minute 0-3",
              detail:
                "Boot the primary and mirrored console pair and lock both to the startup desk profile.",
            },
            {
              id: "relay-verify",
              label: "Verify relay mirror sync",
              owner: "Telemetry lead",
              timing: "Minute 3-7",
              detail:
                "Cross-check the relay timestamp against the overnight handoff note and call out any drift beyond the recovery threshold.",
            },
            {
              id: "board-release",
              label: "Release the desk checklist",
              owner: "Shift lead",
              timing: "Minute 7-12",
              detail:
                "Review the opening checklist with the active operator and mark the warm-start complete in the log.",
            },
          ],
        },
      },
      {
        id: "sensor-mesh-sweep",
        code: "RB-112",
        title: "Sensor Mesh Health Sweep",
        status: "approved",
        priority: "Elevated",
        summary:
          "Confirm the inbound sensor mesh before the first field dispatch uses the live feed for movement decisions.",
        objective:
          "Surface unstable mesh nodes early enough that the startup desk can either isolate them or adjust the first assignment package.",
        owner: "Telemetry engineering",
        tags: ["sensor mesh", "health sweep", "validation"],
        dependencies: [
          "Mesh polling window opened by startup desk",
          "Diagnostics cache cleared from prior shift",
          "Field teams still on standby routing",
        ],
        revision: {
          version: "v7.3",
          state: "approval",
          updatedAt: "April 17, 2026",
          editor: "T. Bhandari",
          reviewer: "L. Moreno",
          summary:
            "Refined the validation threshold for the rooftop relay cluster and added output notes for the dispatch board.",
          notes: [
            "Raised the retry threshold for rooftop node jitter from 2 to 3 attempts.",
            "Added a dispatch-board update requirement when any cluster is isolated.",
            "Shortened the approval note so field leads can scan the change in one pass.",
          ],
        },
        execution: {
          targetWindow: "05:50-06:08 local",
          expectedDuration: "18 minutes",
          operator: "Telemetry engineer",
          environment: "Diagnostics rail / sensor health dashboard",
          verification: "Sweep passes when all critical lanes report green or have an explicit isolation note.",
          outputs: [
            "Mesh health snapshot attached to the dispatch board",
            "Isolation note for any degraded cluster",
            "Approval-ready sweep summary",
          ],
          steps: [
            {
              id: "cache-reset",
              label: "Reset stale diagnostics cache",
              owner: "Telemetry engineering",
              timing: "Minute 0-4",
              detail:
                "Clear the prior shift cache and reopen the critical cluster polling lane before any live checks begin.",
            },
            {
              id: "cluster-review",
              label: "Review critical cluster status",
              owner: "Telemetry engineering",
              timing: "Minute 4-12",
              detail:
                "Inspect the rooftop, corridor, and intake clusters and flag any node that fails the retry threshold.",
            },
            {
              id: "dispatch-note",
              label: "Publish the sweep result",
              owner: "Startup desk lead",
              timing: "Minute 12-18",
              detail:
                "Post the final sweep note to the dispatch board and document any isolated mesh zones.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "field-recovery",
    label: "Field recovery",
    title: "Protect restart paths when the active lane slips or stalls",
    description:
      "These procedures are staged for the moment a running operation needs a controlled restart, a transfer hold, or a field-safe fallback while the desk keeps ownership explicit.",
    handoff:
      "Do not release these until the recovery lead confirms the active field lane and fallback transport are both staffed.",
    procedures: [
      {
        id: "cold-lane-restart",
        code: "RB-218",
        title: "Cold-Lane Restart Window",
        status: "draft",
        priority: "Critical",
        summary:
          "Restart a paused field lane without losing the evidence trail or allowing operators to skip the safety gate.",
        objective:
          "Create a restart path that protects operator safety, command continuity, and timing visibility when the lane has gone cold.",
        owner: "Recovery coordination",
        tags: ["restart", "field lane", "safety gate"],
        dependencies: [
          "Recovery lead has named the restart lane",
          "Evidence capture pack remains attached to the case",
          "Transport reserve is still inside the service window",
        ],
        revision: {
          version: "v7.2-draft",
          state: "editing",
          updatedAt: "April 19, 2026",
          editor: "A. Fowler",
          reviewer: "Pending approval",
          summary:
            "Draft update adds a stricter safety gate and separates restart timing from transport release timing.",
          notes: [
            "Inserted an evidence lock check before restart authorization.",
            "Split the restart window into field-safe and transport-safe checkpoints.",
            "Marked the transport reserve note as mandatory while the lane is in draft.",
          ],
        },
        execution: {
          targetWindow: "Within 20 minutes of lane hold",
          expectedDuration: "22 minutes",
          operator: "Recovery lead",
          environment: "Field desk / secured restart lane",
          verification: "Restart is valid when safety gate, evidence lock, and transport reserve all record explicit clearance.",
          outputs: [
            "Restart authorization note",
            "Evidence lock confirmation",
            "Transport reserve release or hold note",
          ],
          steps: [
            {
              id: "safety-gate",
              label: "Confirm the safety gate",
              owner: "Recovery lead",
              timing: "Minute 0-6",
              detail:
                "Verify the lane is physically clear, the standby team is present, and the cold-lane warning remains posted.",
            },
            {
              id: "evidence-lock",
              label: "Lock the evidence trail",
              owner: "Case recorder",
              timing: "Minute 6-12",
              detail:
                "Attach the evidence capture pack and confirm that no pending note can be overwritten by the restart flow.",
            },
            {
              id: "restart-window",
              label: "Release the restart window",
              owner: "Field coordinator",
              timing: "Minute 12-22",
              detail:
                "Authorize the restart once the field-safe and transport-safe checkpoints both show clearance.",
            },
          ],
        },
      },
      {
        id: "fuel-bay-transfer",
        code: "RB-224",
        title: "Fuel Bay Hold Transfer",
        status: "approved",
        priority: "High",
        summary:
          "Move a live hold from the active lane into the fuel bay without losing operator context or timing ownership.",
        objective:
          "Keep the hold controlled while the field team transitions equipment, updates the desk, and avoids duplicate operator commands.",
        owner: "Field logistics",
        tags: ["hold transfer", "fuel bay", "operator sync"],
        dependencies: [
          "Fuel bay cleared by logistics",
          "Desk receives hold-transfer acknowledgement",
          "Active operator remains attached through the movement",
        ],
        revision: {
          version: "v7.1",
          state: "published",
          updatedAt: "April 15, 2026",
          editor: "J. Ortega",
          reviewer: "P. Lin",
          summary:
            "Approved update reduces duplicate callouts and adds a final movement confirmation before the desk clears the transfer.",
          notes: [
            "Collapsed two operator check-ins into a single hold-transfer acknowledgement.",
            "Added a logistics confirmation before the fuel bay gate opens.",
            "Clarified when the desk can clear the movement from active watch.",
          ],
        },
        execution: {
          targetWindow: "Within 15 minutes of hold confirmation",
          expectedDuration: "14 minutes",
          operator: "Field logistics lead",
          environment: "Field lane / fuel bay transfer path",
          verification: "Transfer completes when the desk and field lead both confirm the destination bay and operator ownership.",
          outputs: [
            "Fuel bay acknowledgement",
            "Movement completion note",
            "Updated active watch status",
          ],
          steps: [
            {
              id: "bay-clearance",
              label: "Clear the destination bay",
              owner: "Field logistics",
              timing: "Minute 0-4",
              detail:
                "Confirm the fuel bay is open, staffed, and free of cross-traffic before the hold starts moving.",
            },
            {
              id: "movement-ack",
              label: "Run the hold-transfer acknowledgement",
              owner: "Desk operations",
              timing: "Minute 4-8",
              detail:
                "Keep the active operator attached while the desk logs the transfer and repeats the target bay.",
            },
            {
              id: "bay-confirmation",
              label: "Close the transfer",
              owner: "Field logistics",
              timing: "Minute 8-14",
              detail:
                "Document the destination bay, confirm the field lead retains ownership, and clear the desk watch note.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "audit-handoff",
    label: "Audit handoff",
    title: "Bundle operator evidence and revision notes before the workflow closes",
    description:
      "These runbooks focus on the final handoff layer: closing operator notes, capturing rollback context, and preserving enough detail that later reviewers can see which revision drove the outcome.",
    handoff:
      "Release this group with the closeout lead present so every evidence artifact is mapped to the revision that produced it.",
    procedures: [
      {
        id: "operator-handoff",
        code: "RB-307",
        title: "Operator Handoff Digest",
        status: "active",
        priority: "High",
        summary:
          "Package the final operator state, decision notes, and unresolved watch items into one closeout digest.",
        objective:
          "Prevent follow-up teams from reconstructing context by hand when the active workflow changes owners or leaves the desk.",
        owner: "Closeout operations",
        tags: ["handoff", "digest", "closeout"],
        dependencies: [
          "Active operator signs the final note",
          "Decision board exported for the current window",
          "Unresolved watch items tagged with owners",
        ],
        revision: {
          version: "v7.4",
          state: "published",
          updatedAt: "April 18, 2026",
          editor: "C. Ibarra",
          reviewer: "N. Shah",
          summary:
            "The digest now requires unresolved watch items to carry owners and expected follow-up timing.",
          notes: [
            "Added owner assignment for unresolved watch items.",
            "Moved decision-board export ahead of the final sign-off.",
            "Shortened the digest summary block so reviewers can scan it faster.",
          ],
        },
        execution: {
          targetWindow: "Final 10 minutes of active workflow",
          expectedDuration: "10 minutes",
          operator: "Closeout lead",
          environment: "Closeout desk / decision export rail",
          verification: "Digest is complete when the operator note, decision export, and watch-item ownership all attach to the same closeout packet.",
          outputs: [
            "Signed operator digest",
            "Decision-board export",
            "Owned watch-item list",
          ],
          steps: [
            {
              id: "digest-note",
              label: "Capture the operator digest",
              owner: "Closeout operations",
              timing: "Minute 0-4",
              detail:
                "Record the operator summary, final lane state, and any handoff-sensitive notes before the session closes.",
            },
            {
              id: "decision-export",
              label: "Export the decision board",
              owner: "Desk operations",
              timing: "Minute 4-7",
              detail:
                "Attach the final decision board with timestamps so later reviewers can align decisions to the runbook version in use.",
            },
            {
              id: "watch-ownership",
              label: "Assign watch-item ownership",
              owner: "Closeout lead",
              timing: "Minute 7-10",
              detail:
                "Name the follow-up owner and target timing for every unresolved watch item before closeout.",
            },
          ],
        },
      },
      {
        id: "rollback-capture",
        code: "RB-311",
        title: "Rollback Capture Pack",
        status: "draft",
        priority: "Elevated",
        summary:
          "Capture the context for a rollback decision so reviewers can see what changed, what was reverted, and why the reversal happened.",
        objective:
          "Keep rollback evidence legible enough that the next review cycle can compare the failed revision against the restored baseline.",
        owner: "Audit and quality",
        tags: ["rollback", "evidence", "review cycle"],
        dependencies: [
          "Rollback event already stamped in the session log",
          "Previous approved baseline available for comparison",
          "Audit lead assigned to final review",
        ],
        revision: {
          version: "v7.0-draft",
          state: "editing",
          updatedAt: "April 19, 2026",
          editor: "S. Park",
          reviewer: "Pending approval",
          summary:
            "Initial draft for rollback capture adds side-by-side baseline notes and a stricter evidence checklist.",
          notes: [
            "Added baseline comparison note to every rollback packet.",
            "Inserted a reviewer sign-off placeholder for the failed revision.",
            "Marked the evidence checklist as incomplete until audit approves the draft.",
          ],
        },
        execution: {
          targetWindow: "Immediately after rollback decision",
          expectedDuration: "16 minutes",
          operator: "Audit lead",
          environment: "Audit desk / rollback review queue",
          verification: "Packet is complete when the failed revision, restored baseline, and reviewer notes all live in the same evidence bundle.",
          outputs: [
            "Rollback event packet",
            "Baseline comparison note",
            "Reviewer sign-off placeholder",
          ],
          steps: [
            {
              id: "event-stamp",
              label: "Anchor the rollback event",
              owner: "Audit and quality",
              timing: "Minute 0-5",
              detail:
                "Confirm the rollback decision is stamped in the session log and mapped to the failed revision identifier.",
            },
            {
              id: "baseline-compare",
              label: "Attach the prior baseline",
              owner: "Audit and quality",
              timing: "Minute 5-11",
              detail:
                "Compare the failed revision against the last approved baseline and capture the material deltas in one note.",
            },
            {
              id: "review-placeholder",
              label: "Stage the review packet",
              owner: "Audit lead",
              timing: "Minute 11-16",
              detail:
                "Bundle the evidence, baseline note, and reviewer placeholder so the next approval cycle can pick up the rollback cleanly.",
            },
          ],
        },
      },
    ],
  },
] satisfies RunbookGroup[];

export const executionPreviews = [
  {
    id: "preview-startup",
    label: "Preview A",
    title: "Startup desk preview",
    state: "active",
    window: "05:40 local",
    operator: "Startup desk lead",
    duration: "15-minute dry run",
    summary:
      "Walks the opening desk flow across console warm-start and mesh health verification to prove the first handoff can start without missing telemetry drift.",
    signals: [
      "Relay mirror stays inside 90-second tolerance",
      "Mesh sweep posts one dispatch-ready summary",
      "Startup checklist closes before the first field call window",
    ],
    outputs: [
      "Warm-start checkpoint signed",
      "Mesh health snapshot posted",
      "First operator handoff note published",
    ],
    steps: [
      {
        id: "preview-startup-1",
        label: "Boot paired consoles",
        owner: "Desk operations",
        timing: "Minute 0-4",
        detail: "Mirror both consoles and confirm startup desk ownership before the live handoff starts.",
      },
      {
        id: "preview-startup-2",
        label: "Run sensor mesh sweep",
        owner: "Telemetry engineering",
        timing: "Minute 4-10",
        detail: "Validate critical clusters and attach any isolation note to the dispatch board.",
      },
      {
        id: "preview-startup-3",
        label: "Close the startup handoff",
        owner: "Shift lead",
        timing: "Minute 10-15",
        detail: "Release the startup desk only after the mesh summary and warm-start note are visible together.",
      },
    ],
  },
  {
    id: "preview-recovery",
    label: "Preview B",
    title: "Recovery transfer preview",
    state: "ready",
    window: "On hold trigger",
    operator: "Recovery lead",
    duration: "22-minute dry run",
    summary:
      "Exercises the cold-lane restart and fuel-bay hold-transfer flow so the field team can see where the draft safety gate changes the timing.",
    signals: [
      "Evidence lock remains attached through the restart decision",
      "Fuel bay acknowledgement arrives before movement release",
      "Restart window and transfer note do not duplicate operator commands",
    ],
    outputs: [
      "Restart authorization note",
      "Fuel bay acknowledgement",
      "Updated active watch status",
    ],
    steps: [
      {
        id: "preview-recovery-1",
        label: "Secure the cold lane",
        owner: "Recovery lead",
        timing: "Minute 0-7",
        detail: "Lock the safety gate and confirm the standby team before restart timing begins.",
      },
      {
        id: "preview-recovery-2",
        label: "Move the hold to the fuel bay",
        owner: "Field logistics",
        timing: "Minute 7-15",
        detail: "Acknowledge the transfer on desk and field channels without changing operator ownership mid-move.",
      },
      {
        id: "preview-recovery-3",
        label: "Authorize the restart window",
        owner: "Field coordinator",
        timing: "Minute 15-22",
        detail: "Release the restart only after the safety gate, evidence lock, and transport reserve all show clearance.",
      },
    ],
  },
  {
    id: "preview-closeout",
    label: "Preview C",
    title: "Closeout audit preview",
    state: "watch",
    window: "Final 10 minutes of workflow",
    operator: "Closeout lead",
    duration: "12-minute dry run",
    summary:
      "Pairs the operator handoff digest with rollback capture to show exactly how revision metadata survives into the audit packet.",
    signals: [
      "Decision export and operator digest share the same closeout packet",
      "Rollback comparison note names the restored baseline",
      "Every unresolved watch item carries a follow-up owner",
    ],
    outputs: [
      "Signed operator digest",
      "Rollback event packet",
      "Owned watch-item list",
    ],
    steps: [
      {
        id: "preview-closeout-1",
        label: "Capture closeout digest",
        owner: "Closeout operations",
        timing: "Minute 0-4",
        detail: "Record the operator summary and active watch items before the desk changes owners.",
      },
      {
        id: "preview-closeout-2",
        label: "Attach rollback evidence",
        owner: "Audit and quality",
        timing: "Minute 4-8",
        detail: "Map the rollback event to the failed revision and the restored baseline in one evidence bundle.",
      },
      {
        id: "preview-closeout-3",
        label: "Name review owners",
        owner: "Closeout lead",
        timing: "Minute 8-12",
        detail: "Assign follow-up owners so the next review cycle can process the packet without rework.",
      },
    ],
  },
] satisfies ExecutionPreview[];

export const revisionSummary = {
  label: "Revision summary",
  title: "Release review stays anchored to the live runbook set",
  description:
    "The current revision pack combines published updates, approval-ready changes, and active drafts. Reviewers can quickly see which areas moved, which runbooks are still waiting on approval, and what the next review cycle must cover.",
  metrics: [
    {
      label: "Published revisions",
      value: "3",
      detail: "Console warm-start, fuel bay transfer, and operator handoff are ready for release.",
    },
    {
      label: "Approval queue",
      value: "1",
      detail: "Sensor mesh sweep is waiting on the final reviewer sign-off.",
    },
    {
      label: "Draft runbooks",
      value: "2",
      detail: "Cold-lane restart and rollback capture still need approval and visual review.",
    },
  ],
  changedAreas: [
    "Startup flow now checks relay mirror sync earlier in the opening sequence.",
    "Recovery restart timing is separated from transport release timing.",
    "Closeout packets now require named owners for unresolved watch items.",
    "Rollback capture adds a side-by-side baseline comparison note.",
  ],
  nextReviews: [
    "Review the cold-lane restart draft with safety operations at 14:00 local.",
    "Approve the sensor mesh threshold update after rooftop cluster validation reruns.",
    "Run a closeout audit preview once the rollback capture draft has reviewer placeholders.",
  ],
  releaseNotes: [
    "R7.4 bundles the active startup and closeout runbooks into the same release cut.",
    "Draft procedures stay visible in the studio so reviewers can compare them against published baselines.",
    "Execution previews highlight where approval state changes the operator flow before release.",
  ],
} satisfies RevisionSummary;
