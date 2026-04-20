import {
  type PlaybookStatus,
  type PlaybookStep,
  type PlaybookStepPhase,
  type Procedure,
  type ProcedureStep,
  procedures,
  savedPlaybooks,
  type SavedPlaybook,
} from "@/components/field-guide/field-guide-data";

const PHASES: PlaybookStepPhase[] = ["Brief", "Execute", "Verify"];
const TODAY = "April 20, 2026";
const NOW = "April 20, 2026 09:00 UTC";

function getStepPhase(index: number, total: number): PlaybookStepPhase {
  if (index === 0) {
    return "Brief";
  }

  if (index === total - 1) {
    return "Verify";
  }

  return "Execute";
}

function buildSeedStep(step: ProcedureStep, index: number, total: number): PlaybookStep {
  const phase = getStepPhase(index, total);

  return {
    id: `draft-step-${index + 1}`,
    label: step.label,
    detail: step.detail,
    phase,
    owner:
      phase === "Brief"
        ? "Scenario lead"
        : phase === "Verify"
          ? "Reviewer"
          : "Operator",
    duration: phase === "Execute" ? "6 min" : "4 min",
    expectedSignal:
      phase === "Brief"
        ? "Owners and conditions confirmed"
        : phase === "Verify"
          ? "Evidence accepted and next action named"
          : "Scenario team can advance without rework",
    rehearsalTip:
      phase === "Execute"
        ? "Interrupt the step once to confirm the owner can restate the intent."
        : "Ask the room who would block progress if this step was unclear.",
  };
}

export function getProcedureById(procedureId: string) {
  return procedures.find((procedure) => procedure.id === procedureId) ?? null;
}

export function getSourceProcedure(playbook: SavedPlaybook) {
  return getProcedureById(playbook.sourceProcedureId);
}

export function buildDraftPlaybook(procedure: Procedure): SavedPlaybook {
  return {
    id: `draft-${procedure.id}`,
    sourceProcedureId: procedure.id,
    title: `${procedure.title} Playbook`,
    summary: `Draft a rehearsal-ready version of ${procedure.title.toLowerCase()} with explicit owners and review checkpoints.`,
    team: procedure.team,
    difficulty: procedure.difficulty,
    status: "Draft",
    rehearsalStatus: "Needs Revision",
    authoringMode: "Remix",
    objective: `Turn ${procedure.title.toLowerCase()} into a reusable playbook for team walkthroughs and reviews.`,
    audience: `${procedure.team} operators and reviewers`,
    rehearsalFocus: "Owner clarity, timing, and the final verification handoff.",
    duration: procedure.duration,
    cadence: procedure.cadence,
    location: procedure.location,
    lastUpdated: TODAY,
    lastRehearsed: "Not yet rehearsed",
    notes: procedure.notes,
    tags: [...procedure.tags],
    tools: [...procedure.tools],
    checkpoints: procedure.checklist.map(
      (step) => `Call out completion criteria for ${step.label.toLowerCase()}.`,
    ),
    metadata: {
      version: "v0.1",
      owner: `${procedure.team} lead`,
      reviewers: ["Safety reviewer"],
      changeSummary: "Initial authoring draft created from the procedure template.",
      reviewWindow: "Pending draft review",
      publishWindow: "Not scheduled",
      rehearsalWindow: "Schedule after reviewer sign-off",
      lastSaved: NOW,
    },
    steps: procedure.checklist.map((step, index, allSteps) =>
      buildSeedStep(step, index, allSteps.length),
    ),
  };
}

export function clonePlaybook(playbook: SavedPlaybook): SavedPlaybook {
  return {
    ...playbook,
    tags: [...playbook.tags],
    tools: [...playbook.tools],
    checkpoints: [...playbook.checkpoints],
    metadata: {
      ...playbook.metadata,
      reviewers: [...playbook.metadata.reviewers],
    },
    steps: playbook.steps.map((step) => ({ ...step })),
  };
}

export function createEmptyStep(nextIndex: number): PlaybookStep {
  const phase = PHASES[Math.min(nextIndex, PHASES.length - 1)] ?? "Execute";

  return {
    id: `draft-step-${nextIndex + 1}`,
    label: "New rehearsal step",
    detail: "Describe what the team should do and how the moderator should frame the move.",
    phase,
    owner: phase === "Verify" ? "Reviewer" : "Operator",
    duration: phase === "Brief" ? "4 min" : "6 min",
    expectedSignal: "The team can explain the next move without prompting.",
    rehearsalTip: "Ask the room what evidence proves this step is complete.",
  };
}

export function parseCommaSeparatedList(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function parseLineSeparatedList(value: string) {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function createPlaybookId(
  title: string,
  existingIds: string[],
  currentId?: string,
) {
  const base =
    title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "custom-playbook";

  const rootId = `playbook-${base}`;

  if (!existingIds.includes(rootId) || currentId === rootId) {
    return rootId;
  }

  let suffix = 2;
  let candidate = `${rootId}-${suffix}`;

  while (existingIds.includes(candidate) && currentId !== candidate) {
    suffix += 1;
    candidate = `${rootId}-${suffix}`;
  }

  return candidate;
}

export function advanceVersion(version: string, nextStatus: PlaybookStatus) {
  const match = version.match(/v?(\d+)\.(\d+)/);
  const major = match ? Number(match[1]) : 0;
  const minor = match ? Number(match[2]) : 0;

  if (nextStatus === "Published") {
    return major === 0 ? "v1.0" : `v${major + 1}.0`;
  }

  return `v${major}.${minor + 1}`;
}

export function getDefaultDraftPlaybook() {
  return clonePlaybook(savedPlaybooks[2] ?? buildDraftPlaybook(procedures[0]));
}
