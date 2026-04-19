export type CommandLogOutcome = "success" | "warning" | "failed" | "running";
export type CommandLogTone = "ops" | "cache" | "alert" | "replay" | "audit";

export type CommandLogTag = {
  id: string;
  label: string;
  hint: string;
  tone: CommandLogTone;
};

export type CommandLogEvent = {
  id: string;
  title: string;
  stream: string;
  command: string;
  agent: string;
  timestamp: string;
  duration: string;
  outcome: CommandLogOutcome;
  tags: string[];
  summary: string;
  detailSummary: string;
  details: string[];
};

export type CommandLogGroup = {
  id: string;
  label: string;
  windowLabel: string;
  lane: string;
  events: CommandLogEvent[];
};

export const commandLogToneClasses: Record<CommandLogTone, string> = {
  ops: "border-cyan-400/30 bg-cyan-400/12 text-cyan-100",
  cache: "border-emerald-400/30 bg-emerald-400/12 text-emerald-100",
  alert: "border-rose-400/30 bg-rose-400/12 text-rose-100",
  replay: "border-amber-400/30 bg-amber-400/12 text-amber-100",
  audit: "border-violet-400/30 bg-violet-400/12 text-violet-100",
};

export const commandLogOutcomeClasses: Record<CommandLogOutcome, string> = {
  success: "bg-emerald-300",
  warning: "bg-amber-300",
  failed: "bg-rose-300",
  running: "bg-cyan-300",
};

export const commandLogTags: CommandLogTag[] = [
  { id: "ops", label: "Ops", hint: "Operator-issued commands", tone: "ops" },
  { id: "cache", label: "Cache", hint: "Warmup and invalidation bursts", tone: "cache" },
  { id: "alert", label: "Alert", hint: "Escalations and guardrails", tone: "alert" },
  { id: "replay", label: "Replay", hint: "Backfill or event replay work", tone: "replay" },
  { id: "audit", label: "Audit", hint: "Pinned trails and verification notes", tone: "audit" },
];

export const commandLogTagIndex: Record<string, CommandLogTag> = Object.fromEntries(
  commandLogTags.map((tag) => [tag.id, tag]),
) as Record<string, CommandLogTag>;

export const commandLogSummary = {
  captureVolume: 312,
  freshness: "2m behind ingress",
};

export const commandLogGroups: CommandLogGroup[] = [
  {
    id: "grp-live",
    label: "Live Ingress Burst",
    windowLabel: "14:22 to 14:29 UTC",
    lane: "Priority queue",
    events: [
      {
        id: "cmd-1048",
        title: "Rebuild search snapshot",
        stream: "planner/ingress",
        command: "ao run rebuild-search-snapshot --window 15m",
        agent: "atlas-12",
        timestamp: "14:28:19",
        duration: "03m 14s",
        outcome: "warning",
        tags: ["ops", "cache", "alert"],
        summary: "Snapshot rebuilt after stale shard checksums breached the warm-cache threshold.",
        detailSummary: "Shards promoted with one manual hold still active on the edge checksum lane.",
        details: [
          "Suppressed two duplicate emitters before promoting the rebuilt snapshot.",
          "Queued a follow-up verify task against the stale checksum partition.",
          "Warm cache now reads within 4% of the expected replay envelope.",
        ],
      },
      {
        id: "cmd-1051",
        title: "Fan out cache warmers",
        stream: "scheduler/cache",
        command: "ao run warm-cache --targets edge,query,preview",
        agent: "rivet-03",
        timestamp: "14:26:02",
        duration: "01m 41s",
        outcome: "running",
        tags: ["cache", "ops"],
        summary: "Edge and query pools are primed; preview pool is still replaying delayed assets.",
        detailSummary: "Pinned warmers keep the rail useful while the stream keeps moving underneath.",
        details: [
          "Edge pool hit 96% warm coverage before the preview pass started.",
          "Preview pool stayed on the slower path to avoid evicting active report caches.",
          "No shared services were touched outside the command-log simulation lane.",
        ],
      },
    ],
  },
  {
    id: "grp-recover",
    label: "Recovery Sweep",
    windowLabel: "14:12 to 14:21 UTC",
    lane: "Repair window",
    events: [
      {
        id: "cmd-1037",
        title: "Replay billing rollup",
        stream: "repair/billing",
        command: "ao run replay-billing-rollup --from offset-8812",
        agent: "ember-07",
        timestamp: "14:18:44",
        duration: "05m 09s",
        outcome: "failed",
        tags: ["replay", "alert", "audit"],
        summary: "Rollup replay halted when one partner feed returned a schema drift marker.",
        detailSummary: "Audit trail captured the offending payload and the replay cursor for re-entry.",
        details: [
          "Cursor parked at offset-8826 after a drifted tax-code field was detected.",
          "Failure stayed isolated to one partner feed; local retry budget remains untouched.",
          "Review note suggests re-running after the partner payload contract is patched.",
        ],
      },
      {
        id: "cmd-1033",
        title: "Verify retry budget",
        stream: "repair/guardrails",
        command: "ao run inspect-retry-budget --scope payment-hooks",
        agent: "atlas-12",
        timestamp: "14:14:08",
        duration: "00m 52s",
        outcome: "success",
        tags: ["ops", "audit"],
        summary: "Retry saturation dropped below policy after the last dead-letter drain completed.",
        detailSummary: "Guardrail checks cleared, but the event was kept pin-ready for audit handoff.",
        details: [
          "Dead-letter queue shrank from 18 to 4 envelopes before the sweep closed.",
          "Manual overrides were absent, so the retry window returned to automatic mode.",
          "Budget metrics were attached to the command record for later reviewer pickup.",
        ],
      },
    ],
  },
  {
    id: "grp-archive",
    label: "Archive Replay",
    windowLabel: "14:03 to 14:11 UTC",
    lane: "Backfill lane",
    events: [
      {
        id: "cmd-1028",
        title: "Rehydrate webhook archive",
        stream: "archive/webhooks",
        command: "ao run replay-webhook-archive --batch 24h",
        agent: "quill-21",
        timestamp: "14:09:51",
        duration: "07m 12s",
        outcome: "success",
        tags: ["replay", "cache"],
        summary: "Archived webhook envelopes were replayed into a sealed local batch without drift.",
        detailSummary: "Archive batch completed cleanly and repopulated dependent preview caches.",
        details: [
          "Sealed batch mapped 248 envelopes with zero duplicate delivery markers.",
          "Replay kept original event ordering while skipping already-acked side effects.",
          "Preview caches were rehydrated from the replay output instead of the live bus.",
        ],
      },
      {
        id: "cmd-1022",
        title: "Stage audit digest",
        stream: "archive/audit",
        command: "ao run stage-audit-digest --review-window overnight",
        agent: "rivet-03",
        timestamp: "14:05:17",
        duration: "02m 06s",
        outcome: "warning",
        tags: ["audit", "alert"],
        summary: "Digest staged with one reviewer note because two commands still need human sign-off.",
        detailSummary: "Warnings are informational here; the digest is staged and waiting on approval only.",
        details: [
          "Reviewer handoff references the failed billing replay and the warm-cache hold.",
          "Digest body includes exact command IDs so the rail can pin them without lookup work.",
          "No mutations remain pending inside the isolated mock route.",
        ],
      },
    ],
  },
];

export const commandLogEvents = commandLogGroups.flatMap((group) => group.events);
