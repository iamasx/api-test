export type CommandLogOutcome = "success" | "warning" | "failed" | "running";
export type CommandLogTone = "ops" | "cache" | "alert" | "replay" | "audit";
export type CommandLogTag = { id: string; label: string; hint: string; tone: CommandLogTone };
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
const event = (
  id: string,
  title: string,
  stream: string,
  command: string,
  agent: string,
  timestamp: string,
  duration: string,
  outcome: CommandLogOutcome,
  tags: string[],
  summary: string,
  detailSummary: string,
  details: string[],
): CommandLogEvent => ({ id, title, stream, command, agent, timestamp, duration, outcome, tags, summary, detailSummary, details });
const group = (id: string, label: string, windowLabel: string, lane: string, events: CommandLogEvent[]): CommandLogGroup => ({
  id,
  label,
  windowLabel,
  lane,
  events,
});
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
  { id: "cache", label: "Cache", hint: "Warmup and invalidations", tone: "cache" },
  { id: "alert", label: "Alert", hint: "Escalations and guardrails", tone: "alert" },
  { id: "replay", label: "Replay", hint: "Backfill and replay work", tone: "replay" },
  { id: "audit", label: "Audit", hint: "Pinned trails and handoffs", tone: "audit" },
];
export const commandLogTagIndex = Object.fromEntries(commandLogTags.map((tag) => [tag.id, tag])) as Record<
  string,
  CommandLogTag
>;
export const commandLogSummary = { captureVolume: 312, freshness: "2m behind ingress" };
export const commandLogGroups: CommandLogGroup[] = [
  group("grp-live", "Live Ingress Burst", "14:22-14:29 UTC", "Priority queue", [
    event(
      "cmd-1048", "Rebuild search snapshot", "planner/ingress", "ao run rebuild-search-snapshot --window 15m",
      "atlas-12", "14:28:19", "03m 14s", "warning", ["ops", "cache", "alert"],
      "Snapshot rebuilt after stale shard checksums crossed the warm-cache limit.",
      "One shard hold is still pinned for manual verification before a full promote.",
      [
        "Duplicate emitters were suppressed before the rebuilt snapshot was promoted.",
        "A verify task was queued against the stale checksum partition.",
        "Warm cache now reads within 4% of the expected replay envelope.",
      ],
    ),
    event(
      "cmd-1051", "Fan out cache warmers", "scheduler/cache", "ao run warm-cache --targets edge,query,preview",
      "rivet-03", "14:26:02", "01m 41s", "running", ["cache", "ops"],
      "Edge and query pools are primed while preview assets continue a slower replay path.",
      "The rail can stay pinned here while the stream keeps moving underneath it.",
      [
        "Edge coverage reached 96% before the preview pass started.",
        "Preview stayed on the slower path to avoid evicting active report caches.",
        "No services outside the isolated command-log route were touched.",
      ],
    ),
  ]),
  group("grp-recover", "Recovery Sweep", "14:12-14:21 UTC", "Repair window", [
    event(
      "cmd-1037", "Replay billing rollup", "repair/billing", "ao run replay-billing-rollup --from offset-8812",
      "ember-07", "14:18:44", "05m 09s", "failed", ["replay", "alert", "audit"],
      "Rollup replay halted after one partner feed returned a schema drift marker.",
      "Audit notes keep the bad payload and replay cursor ready for re-entry.",
      [
        "Cursor parked at offset-8826 after a drifted tax-code field was detected.",
        "Failure stayed isolated to one partner feed; retry budget is untouched.",
        "Review notes suggest re-running after the partner contract is patched.",
      ],
    ),
    event(
      "cmd-1033", "Verify retry budget", "repair/guardrails", "ao run inspect-retry-budget --scope payment-hooks",
      "atlas-12", "14:14:08", "00m 52s", "success", ["ops", "audit"],
      "Retry saturation dropped below policy after the dead-letter drain completed.",
      "Guardrails cleared, but the event stays pin-ready for audit handoff.",
      [
        "Dead-letter volume shrank from 18 to 4 envelopes before the sweep closed.",
        "No manual overrides remained, so the retry window returned to automatic mode.",
        "Budget metrics were attached to the record for reviewer pickup.",
      ],
    ),
  ]),
  group("grp-archive", "Archive Replay", "14:03-14:11 UTC", "Backfill lane", [
    event(
      "cmd-1028", "Rehydrate webhook archive", "archive/webhooks", "ao run replay-webhook-archive --batch 24h",
      "quill-21", "14:09:51", "07m 12s", "success", ["replay", "cache"],
      "Archived webhook envelopes were replayed into a sealed local batch without drift.",
      "Archive output repopulated dependent preview caches after a clean backfill.",
      [
        "The sealed batch mapped 248 envelopes with zero duplicate delivery markers.",
        "Replay kept original ordering while skipping already-acked side effects.",
        "Preview caches were rehydrated from replay output instead of the live bus.",
      ],
    ),
    event(
      "cmd-1022", "Stage audit digest", "archive/audit", "ao run stage-audit-digest --review-window overnight",
      "rivet-03", "14:05:17", "02m 06s", "warning", ["audit", "alert"],
      "Digest staged with one reviewer note because two commands still need sign-off.",
      "The warning is informational only; the digest is staged and waiting on approval.",
      [
        "Reviewer handoff references the failed billing replay and warm-cache hold.",
        "Digest copy includes exact command IDs so the rail can pin without lookup work.",
        "No mutations remain pending inside the mock route.",
      ],
    ),
  ]),
];
export const commandLogEvents = commandLogGroups.flatMap((groupItem) => groupItem.events);
