export type ProcedurePriority = "Routine" | "Elevated" | "Critical";

export type FieldGuideCategory = {
  id: string;
  name: string;
  description: string;
  accent: string;
};

export type ProcedureStep = {
  id: string;
  title: string;
  detail: string;
  duration: string;
  owner: string;
};

export type ProcedureChecklistItem = {
  id: string;
  label: string;
  detail: string;
  type: "Required" | "Verify on site" | "Recommended";
};

export type ProcedureReference = {
  id: string;
  label: string;
  value: string;
};

export type FieldGuideProcedure = {
  id: string;
  title: string;
  code: string;
  categoryId: string;
  priority: ProcedurePriority;
  estimatedWindow: string;
  summary: string;
  objective: string;
  sceneType: string;
  crew: string;
  focusAreas: string[];
  lastReviewed: string;
  tags: string[];
  triggerSignals: string[];
  tools: string[];
  steps: ProcedureStep[];
  checklist: ProcedureChecklistItem[];
  references: ProcedureReference[];
};

export type FieldGuideCategoryOption = {
  id: string;
  name: string;
  description: string;
  count: number;
};

export type FieldGuidePriorityOption = {
  id: ProcedurePriority | "all";
  name: string;
  count: number;
};

export type FieldGuideFocusAreaOption = {
  id: string;
  name: string;
  count: number;
};

export const fieldGuideCategories: FieldGuideCategory[] = [
  {
    id: "power-recovery",
    name: "Power Recovery",
    description:
      "Power stabilization and backup activation procedures for field crews.",
    accent: "from-amber-500/25 via-orange-400/15 to-transparent",
  },
  {
    id: "perimeter-safety",
    name: "Perimeter Safety",
    description:
      "Crew isolation, hazard containment, and secure-area restoration guidance.",
    accent: "from-rose-500/25 via-pink-400/15 to-transparent",
  },
  {
    id: "signal-integrity",
    name: "Signal Integrity",
    description:
      "Communications checks for degraded telemetry, relay drift, and dropouts.",
    accent: "from-sky-500/25 via-cyan-400/15 to-transparent",
  },
  {
    id: "site-restart",
    name: "Site Restart",
    description:
      "Order-of-operations playbooks for bringing equipment lanes back online.",
    accent: "from-emerald-500/25 via-lime-400/15 to-transparent",
  },
];

export const fieldGuideProcedures: FieldGuideProcedure[] = [
  {
    id: "grid-sag-bridge",
    title: "Grid Sag Bridge Activation",
    code: "FG-201",
    categoryId: "power-recovery",
    priority: "Critical",
    estimatedWindow: "18-24 min",
    summary:
      "Stabilize voltage drift in the auxiliary span before rack cooling and scan lanes fall outside tolerance.",
    objective:
      "Restore temporary power continuity long enough to complete the capacitor handoff and keep cold loads protected.",
    sceneType: "Utility spine and backup transfer cabinet",
    crew: "Facilities lead, one electrical tech, and one safety runner",
    focusAreas: ["Power stability", "Crew safety", "Command handoff"],
    lastReviewed: "2026-04-08",
    tags: ["Voltage sag", "Backup transfer", "Cooling risk"],
    triggerSignals: [
      "Rack cooling lane drops below 92% service capacity",
      "Transfer cabinet reports repeated relay hesitation",
      "North span voltage drift persists for more than 90 seconds",
    ],
    tools: [
      "Bridge activation key",
      "Flux response kit",
      "Thermal inspection wand",
    ],
    steps: [
      {
        id: "bridge-confirm-span",
        title: "Confirm the affected span and isolate the drift source",
        detail:
          "Match the cabinet alert with the live meter trace and verify the sag is not coming from a downstream breaker fault.",
        duration: "4 min",
        owner: "Facilities lead",
      },
      {
        id: "bridge-stage-kit",
        title: "Stage the bridge kit and assign cabinet access",
        detail:
          "Move the flux response kit to the transfer cabinet, brief the runner, and keep the service corridor clear before opening the enclosure.",
        duration: "3 min",
        owner: "Safety runner",
      },
      {
        id: "bridge-transfer",
        title: "Engage the temporary bridge and watch for relay stability",
        detail:
          "Seat the bridge key, bring the alternate feed online in sequence, and monitor the relay chatter for two clean cycles.",
        duration: "7 min",
        owner: "Electrical tech",
      },
      {
        id: "bridge-verify-cooling",
        title: "Verify cooling and scan lanes recover before releasing the area",
        detail:
          "Check that cooling, scanning, and alarm suppression all return to expected thresholds before logging the temporary operating mode.",
        duration: "6 min",
        owner: "Facilities lead",
      },
    ],
    checklist: [
      {
        id: "bridge-ppe",
        label: "Arc-safe gloves and face shield are on before the cabinet is opened",
        detail: "Do not begin transfer work until the cabinet operator and spotter both confirm PPE.",
        type: "Required",
      },
      {
        id: "bridge-clearance",
        label: "The service corridor is clear of carts, pallets, and nonessential crew",
        detail: "Maintain a clean path between the cabinet, kit, and emergency stop.",
        type: "Verify on site",
      },
      {
        id: "bridge-log",
        label: "Temporary bridge mode is logged in the handoff note",
        detail: "Record when the bridge was engaged so the restoration crew can unwind it cleanly.",
        type: "Recommended",
      },
    ],
    references: [
      { id: "bridge-ref-threshold", label: "Release threshold", value: "Voltage recovery holds above 97% for two cycles" },
      { id: "bridge-ref-escalation", label: "Escalate if", value: "Relay hesitation continues after bridge activation" },
      { id: "bridge-ref-owner", label: "Follow-up owner", value: "Facilities engineering on-call" },
    ],
  },
  {
    id: "smoke-lane-lockout",
    title: "Smoke Lane Lockout Sweep",
    code: "FG-318",
    categoryId: "perimeter-safety",
    priority: "Elevated",
    estimatedWindow: "12-16 min",
    summary:
      "Secure a bay corridor when smoke drift or electrical odor is reported near sort or charging equipment.",
    objective:
      "Stop crew movement through the affected lane, isolate the hazard zone, and hand the area to the right responder without confusion.",
    sceneType: "Loading bay corridor and adjacent equipment cages",
    crew: "Shift lead, floor safety marshal, and one runner",
    focusAreas: ["Crew safety", "Perimeter control", "Command handoff"],
    lastReviewed: "2026-03-29",
    tags: ["Lockout", "Bay safety", "Crew movement"],
    triggerSignals: [
      "Visible smoke drift in a charging or conveyor lane",
      "Two or more odor reports tied to the same bay",
      "Heat alert triggered on a power-adjacent enclosure",
    ],
    tools: ["Barrier strap", "Portable horn", "Incident tag cards"],
    steps: [
      {
        id: "lockout-hold-movement",
        title: "Stop inbound movement before the lane backs up",
        detail:
          "Pause cart movement at both ends of the bay and direct incoming traffic to the alternate lane immediately.",
        duration: "2 min",
        owner: "Shift lead",
      },
      {
        id: "lockout-establish-zone",
        title: "Set the barrier line and visible hazard markers",
        detail:
          "Place barrier straps wide enough to keep staging space clear for responders and call out the lockout reason over the horn.",
        duration: "3 min",
        owner: "Safety marshal",
      },
      {
        id: "lockout-check-adjacent",
        title: "Check adjacent cages and shut down nearby power if needed",
        detail:
          "Inspect the neighboring charger and relay cage so hidden spread or secondary heat buildup does not get missed.",
        duration: "5 min",
        owner: "Safety marshal",
      },
      {
        id: "lockout-handoff",
        title: "Hand off the isolated lane to facilities or fire response",
        detail:
          "Share the first observed signal, current lockout perimeter, and any nearby crew concerns before you release the line.",
        duration: "4 min",
        owner: "Shift lead",
      },
    ],
    checklist: [
      {
        id: "lockout-alt-lane",
        label: "Alternate movement lane is active before carts are held",
        detail: "Avoid locking up both directions of the corridor during the first minute.",
        type: "Required",
      },
      {
        id: "lockout-accountability",
        label: "Nearby crew count is confirmed after the horn call",
        detail: "Make sure nobody remains inside the perimeter after the first sweep.",
        type: "Verify on site",
      },
      {
        id: "lockout-wind",
        label: "Airflow direction is noted for the handoff brief",
        detail: "This helps responders judge where smoke may travel next.",
        type: "Recommended",
      },
    ],
    references: [
      { id: "lockout-ref-perimeter", label: "Minimum perimeter", value: "One bay width beyond visible smoke drift" },
      { id: "lockout-ref-owner", label: "Primary responder", value: "Floor safety marshal until facilities arrives" },
      { id: "lockout-ref-reset", label: "Reset condition", value: "Responder clears the lane and removes the tag card" },
    ],
  },
  {
    id: "relay-drift-check",
    title: "Relay Drift Verification",
    code: "FG-427",
    categoryId: "signal-integrity",
    priority: "Routine",
    estimatedWindow: "10-14 min",
    summary:
      "Validate whether repeated mesh dropouts are coming from relay alignment, battery fade, or a crowded handoff zone.",
    objective:
      "Separate actual relay drift from local interference so the crew sends the right fix instead of swapping healthy hardware.",
    sceneType: "Telemetry mast and handoff corridor",
    crew: "Comms tech and floor observer",
    focusAreas: ["Signal recovery", "Field replay", "Command handoff"],
    lastReviewed: "2026-04-14",
    tags: ["Telemetry", "Relay", "Dropout check"],
    triggerSignals: [
      "Mesh gateway reports three dropout clusters in one shift",
      "Beacon replay shows signal loss at the same turn point",
      "Battery readings look normal but packet loss climbs",
    ],
    tools: ["Calibration wand", "Spare battery puck", "Signal map tablet"],
    steps: [
      {
        id: "relay-read-log",
        title: "Read the packet-loss pattern before touching the relay",
        detail:
          "Compare the live trace to the last stable window so you know whether the drift is directional or random.",
        duration: "3 min",
        owner: "Comms tech",
      },
      {
        id: "relay-walk-path",
        title: "Walk the dropout corridor with the observer",
        detail:
          "Replay the known-fail path and mark where the signal falls away or recovers under movement.",
        duration: "4 min",
        owner: "Floor observer",
      },
      {
        id: "relay-calibrate",
        title: "Apply a light calibration pass if the relay has shifted",
        detail:
          "Use the wand for one measured correction instead of repeated adjustments that make the baseline harder to trust.",
        duration: "3 min",
        owner: "Comms tech",
      },
      {
        id: "relay-confirm",
        title: "Confirm the path clears on a second replay",
        detail:
          "Run the corridor one more time and only mark the relay as fixed when the same turn point remains stable.",
        duration: "2 min",
        owner: "Comms tech",
      },
    ],
    checklist: [
      {
        id: "relay-battery",
        label: "Battery health is checked before any alignment change",
        detail: "Do not recalibrate a relay that is simply running below healthy battery range.",
        type: "Required",
      },
      {
        id: "relay-observer",
        label: "Observer notes the exact dropout turn point",
        detail: "A vague location note makes later comparison less reliable.",
        type: "Verify on site",
      },
      {
        id: "relay-photo",
        label: "A reference photo is captured if the mast angle changed",
        detail: "This makes the next verification pass materially faster.",
        type: "Recommended",
      },
    ],
    references: [
      { id: "relay-ref-limit", label: "Adjustment limit", value: "One light calibration pass before escalation" },
      { id: "relay-ref-baseline", label: "Healthy packet loss", value: "Under 0.8% on repeat corridor walks" },
      { id: "relay-ref-escalate", label: "Escalate if", value: "Dropouts persist after battery swap and calibration" },
    ],
  },
  {
    id: "cold-lane-restart",
    title: "Cold Lane Restart Sequence",
    code: "FG-512",
    categoryId: "site-restart",
    priority: "Critical",
    estimatedWindow: "20-26 min",
    summary:
      "Bring a temperature-controlled lane back online after an emergency stop without shocking the queue or missing safety holds.",
    objective:
      "Restore a controlled flow through the cold lane, verify sensors are healthy, and avoid product exposure during restart.",
    sceneType: "Cold storage transfer lane and staging buffer",
    crew: "Cold-chain lead, controls tech, and queue coordinator",
    focusAreas: ["Queue restart", "Temperature control", "Power stability"],
    lastReviewed: "2026-04-11",
    tags: ["Restart", "Cold chain", "Queue recovery"],
    triggerSignals: [
      "Emergency stop has cleared and the lane is approved for restart",
      "Buffer queue is backing up outside cold-safe timing",
      "Sensor heartbeat has resumed on both lane ends",
    ],
    tools: ["Restart key", "Queue timing board", "Seal inspection kit"],
    steps: [
      {
        id: "cold-verify-clear",
        title: "Verify the lane is clear before moving product",
        detail:
          "Walk both ends of the transfer lane and confirm the stop cause is fully removed, not just temporarily quiet.",
        duration: "4 min",
        owner: "Cold-chain lead",
      },
      {
        id: "cold-prime-controls",
        title: "Prime controls and confirm sensor heartbeat",
        detail:
          "Re-arm the controls stack, check both sensor clusters, and hold the queue until heartbeat and temperature readings settle.",
        duration: "6 min",
        owner: "Controls tech",
      },
      {
        id: "cold-release-batches",
        title: "Release the queue in short batches instead of a full surge",
        detail:
          "Send the first two batches through with spacing so the lane can absorb temperature load without a second stop.",
        duration: "7 min",
        owner: "Queue coordinator",
      },
      {
        id: "cold-log-window",
        title: "Log restart timing and watch the first throughput cycle",
        detail:
          "Capture start time, first batch clear, and any sensor wobble while the lane returns to normal rhythm.",
        duration: "5 min",
        owner: "Cold-chain lead",
      },
    ],
    checklist: [
      {
        id: "cold-seal-check",
        label: "Door and seal check is complete before the queue release",
        detail: "A missed seal issue creates avoidable temperature loss during the first batch.",
        type: "Required",
      },
      {
        id: "cold-buffer-clock",
        label: "Buffer queue time exposure is called out to the coordinator",
        detail: "Prioritize the oldest product if buffer time is uneven.",
        type: "Verify on site",
      },
      {
        id: "cold-watch",
        label: "A five-minute throughput watch is assigned after restart",
        detail: "Keep one owner on the lane until the first cycle fully clears.",
        type: "Recommended",
      },
    ],
    references: [
      { id: "cold-ref-batch", label: "Initial release size", value: "Two short batches before full throughput" },
      { id: "cold-ref-target", label: "Target temperature window", value: "Return to normal band within 6 minutes" },
      { id: "cold-ref-owner", label: "Escalation owner", value: "Cold-chain lead plus controls on-call" },
    ],
  },
  {
    id: "mast-failover-brief",
    title: "Mast Failover Brief",
    code: "FG-233",
    categoryId: "signal-integrity",
    priority: "Elevated",
    estimatedWindow: "8-12 min",
    summary:
      "Shift a field crew onto the backup mast while preserving radio discipline and avoiding duplicate commands.",
    objective:
      "Keep the crew communicating cleanly during a mast failover and make sure command ownership is obvious during the handoff.",
    sceneType: "Outdoor relay mast and command post",
    crew: "Comms lead, field supervisor, and safety observer",
    focusAreas: ["Signal recovery", "Crew safety", "Command handoff"],
    lastReviewed: "2026-04-16",
    tags: ["Failover", "Radio discipline", "Command handoff"],
    triggerSignals: [
      "Primary mast drops below stable transmit power",
      "Crew reports clipped acknowledgements across two channels",
      "Weather or lift work requires a temporary mast shutdown",
    ],
    tools: ["Failover card", "Backup channel sheet", "Signal test handset"],
    steps: [
      {
        id: "mast-assign-lead",
        title: "Assign one comms lead before channel changes begin",
        detail:
          "Name the person who owns the switch so duplicate channel directions do not get broadcast across the crew.",
        duration: "1 min",
        owner: "Field supervisor",
      },
      {
        id: "mast-brief-channel",
        title: "Brief the backup channel and acknowledgement format",
        detail:
          "Give the crew one short script for the failover so every confirmation follows the same pattern.",
        duration: "3 min",
        owner: "Comms lead",
      },
      {
        id: "mast-run-test",
        title: "Run a two-point signal test on the backup mast",
        detail:
          "Confirm command post and field edge both hear and respond cleanly before you declare the failover active.",
        duration: "4 min",
        owner: "Comms lead",
      },
      {
        id: "mast-post-status",
        title: "Post the active mast status at the command board",
        detail:
          "Update the board and radio note so late-arriving crew do not rejoin the wrong channel.",
        duration: "2 min",
        owner: "Safety observer",
      },
    ],
    checklist: [
      {
        id: "mast-owner",
        label: "One named owner is responsible for the failover call",
        detail: "Split ownership causes repeated commands and missed acknowledgements.",
        type: "Required",
      },
      {
        id: "mast-test",
        label: "The backup mast passes a field-edge test before full switchover",
        detail: "Do not move the whole crew on assumptions alone.",
        type: "Verify on site",
      },
      {
        id: "mast-board",
        label: "Command board status is updated after the handoff",
        detail: "The board prevents channel drift once the first shift change begins.",
        type: "Recommended",
      },
    ],
    references: [
      { id: "mast-ref-script", label: "Acknowledgement script", value: "Call sign, status, confirm channel, repeat once" },
      { id: "mast-ref-window", label: "Target failover time", value: "Under 12 minutes from first brief to active mast" },
      { id: "mast-ref-escalation", label: "Escalate if", value: "Backup mast fails the first two-point test" },
    ],
  },
  {
    id: "air-scrubber-handoff",
    title: "Air Scrubber Handoff Brief",
    code: "FG-341",
    categoryId: "perimeter-safety",
    priority: "Routine",
    estimatedWindow: "9-13 min",
    summary:
      "Move a lane from hazard watch to active air-scrubber support without losing perimeter accountability or ventilation notes.",
    objective:
      "Keep the perimeter stable while the ventilation crew takes over the affected zone and confirms airflow direction.",
    sceneType: "Ventilation corridor and temporary scrubber staging zone",
    crew: "Safety marshal, ventilation tech, and floor runner",
    focusAreas: ["Crew safety", "Perimeter control", "Command handoff"],
    lastReviewed: "2026-04-18",
    tags: ["Air scrubber", "Ventilation", "Handoff"],
    triggerSignals: [
      "Portable scrubber is requested after a contained smoke event",
      "Ventilation readings remain outside the recovery band after the first sweep",
      "The hazard perimeter must stay active during responder turnover",
    ],
    tools: ["Airflow card", "Portable scrubber tag", "Perimeter cone pack"],
    steps: [
      {
        id: "scrubber-freeze-lane",
        title: "Freeze the lane layout before the handoff begins",
        detail:
          "Keep the barrier footprint stable so the incoming ventilation tech inherits the same perimeter and access path.",
        duration: "2 min",
        owner: "Safety marshal",
      },
      {
        id: "scrubber-brief-airflow",
        title: "Brief the current airflow direction and responder notes",
        detail:
          "Share the latest drift direction, scrubber request reason, and any nearby crew concerns before equipment is moved.",
        duration: "3 min",
        owner: "Floor runner",
      },
      {
        id: "scrubber-stage-unit",
        title: "Stage the scrubber and confirm the cable path stays clear",
        detail:
          "Set the unit just outside the hazard edge and route power so responders are not forced through the active lane.",
        duration: "4 min",
        owner: "Ventilation tech",
      },
      {
        id: "scrubber-transfer-watch",
        title: "Transfer perimeter ownership and keep one watch in place",
        detail:
          "Name the new perimeter owner and leave a single watcher until the scrubber reaches a steady operating state.",
        duration: "3 min",
        owner: "Safety marshal",
      },
    ],
    checklist: [
      {
        id: "scrubber-owner",
        label: "One named perimeter owner remains in place through the turnover",
        detail:
          "Do not let the perimeter become ownerless while the scrubber team is staging gear.",
        type: "Required",
      },
      {
        id: "scrubber-cable",
        label: "The power cable path is clear of carts and foot traffic",
        detail:
          "A blocked cable path usually forces a second reposition once the unit is live.",
        type: "Verify on site",
      },
      {
        id: "scrubber-airflow",
        label: "Airflow direction is repeated back during the brief",
        detail:
          "The incoming team should confirm the drift direction before the old team steps away.",
        type: "Recommended",
      },
    ],
    references: [
      { id: "scrubber-ref-zone", label: "Perimeter carryover", value: "Keep the original barrier edge until the scrubber is steady" },
      { id: "scrubber-ref-owner", label: "New owner", value: "Ventilation tech once the cable path and airflow are confirmed" },
      { id: "scrubber-ref-reset", label: "Stand-down condition", value: "Responder clears the perimeter after two stable air readings" },
    ],
  },
  {
    id: "buffer-coil-warm-start",
    title: "Buffer Coil Warm Start",
    code: "FG-544",
    categoryId: "site-restart",
    priority: "Routine",
    estimatedWindow: "14-18 min",
    summary:
      "Recover a chilled buffer coil after a brief power interruption without overfeeding the lane or missing sensor drift.",
    objective:
      "Bring the coil back into the operating band, restart the queue in short bursts, and verify sensor readback before full load resumes.",
    sceneType: "Buffer coil bay and short-hold staging lane",
    crew: "Controls tech, queue coordinator, and refrigeration observer",
    focusAreas: ["Queue restart", "Temperature control", "Power stability"],
    lastReviewed: "2026-04-19",
    tags: ["Warm start", "Buffer lane", "Sensor readback"],
    triggerSignals: [
      "A brief outage drops the coil below steady operating output",
      "The staging lane queue is backing up inside the cold-safe window",
      "Sensor readback returns but still shows a shallow temperature wobble",
    ],
    tools: ["Warm-start card", "Queue spacing timer", "Coil surface probe"],
    steps: [
      {
        id: "warm-start-probe",
        title: "Probe the coil face before restarting product flow",
        detail:
          "Confirm the coil is climbing toward its target band instead of restarting the queue on optimistic readback alone.",
        duration: "3 min",
        owner: "Refrigeration observer",
      },
      {
        id: "warm-start-arm-controls",
        title: "Arm the restart path and set short queue spacing",
        detail:
          "Keep the first release constrained so the coil and lane sensors can settle under a measured load.",
        duration: "4 min",
        owner: "Controls tech",
      },
      {
        id: "warm-start-release",
        title: "Release the oldest buffer load in two short bursts",
        detail:
          "Move the oldest waiting product first, then pause long enough to validate the second sensor readback before increasing throughput.",
        duration: "6 min",
        owner: "Queue coordinator",
      },
      {
        id: "warm-start-log",
        title: "Log the warm-start window and watch one full cycle",
        detail:
          "Capture the start, release, and stabilization times so the next crew knows whether the coil recovered cleanly.",
        duration: "4 min",
        owner: "Controls tech",
      },
    ],
    checklist: [
      {
        id: "warm-start-probe-check",
        label: "A manual probe confirms the coil is warming back into band",
        detail:
          "Do not trust one recovering sensor if the coil face still reads cold and unstable.",
        type: "Required",
      },
      {
        id: "warm-start-spacing",
        label: "Queue spacing stays constrained for the first restart burst",
        detail:
          "The lane should prove it can absorb the first release before the second burst is sent.",
        type: "Verify on site",
      },
      {
        id: "warm-start-note",
        label: "The recovery window is logged for the next shift handoff",
        detail:
          "Warm starts that look clean still need a timing note for the next queue coordinator.",
        type: "Recommended",
      },
    ],
    references: [
      { id: "warm-ref-target", label: "Target restart band", value: "Coil returns to the normal band before full queue release" },
      { id: "warm-ref-burst", label: "Initial release pattern", value: "Two short bursts with a sensor readback pause between them" },
      { id: "warm-ref-escalate", label: "Escalate if", value: "Sensor wobble persists after the first controlled burst" },
    ],
  },
];

export const fieldGuidePriorityStyles: Record<
  ProcedurePriority,
  { badge: string; dot: string }
> = {
  Routine: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  Elevated: {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  Critical: {
    badge: "border-rose-200 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
  },
};

export const fieldGuideChecklistTypeStyles: Record<
  ProcedureChecklistItem["type"],
  string
> = {
  Required: "border-rose-200 bg-rose-50 text-rose-700",
  "Verify on site": "border-amber-200 bg-amber-50 text-amber-700",
  Recommended: "border-sky-200 bg-sky-50 text-sky-700",
};

export function getFieldGuideCategoryById(categoryId: string) {
  return fieldGuideCategories.find((category) => category.id === categoryId);
}

export function getFieldGuideCategoryOptions(
  procedures: FieldGuideProcedure[],
  categories: FieldGuideCategory[],
): FieldGuideCategoryOption[] {
  return [
    {
      id: "all",
      name: "All Procedures",
      description: "Every field response currently staged in the guide.",
      count: procedures.length,
    },
    ...categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      count: procedures.filter(
        (procedure) => procedure.categoryId === category.id,
      ).length,
    })),
  ];
}

export function getFieldGuidePriorityOptions(
  procedures: FieldGuideProcedure[],
): FieldGuidePriorityOption[] {
  return [
    {
      id: "all",
      name: "All priorities",
      count: procedures.length,
    },
    {
      id: "Critical",
      name: "Critical",
      count: procedures.filter((procedure) => procedure.priority === "Critical")
        .length,
    },
    {
      id: "Elevated",
      name: "Elevated",
      count: procedures.filter((procedure) => procedure.priority === "Elevated")
        .length,
    },
    {
      id: "Routine",
      name: "Routine",
      count: procedures.filter((procedure) => procedure.priority === "Routine")
        .length,
    },
  ];
}

export function getFieldGuideFocusAreaOptions(
  procedures: FieldGuideProcedure[],
): FieldGuideFocusAreaOption[] {
  const focusAreaCounts = procedures.reduce<Map<string, number>>(
    (counts, procedure) => {
      procedure.focusAreas.forEach((focusArea) => {
        counts.set(focusArea, (counts.get(focusArea) ?? 0) + 1);
      });

      return counts;
    },
    new Map<string, number>(),
  );

  return [
    {
      id: "all",
      name: "All focus areas",
      count: procedures.length,
    },
    ...Array.from(focusAreaCounts.entries())
      .sort((left, right) => {
        if (right[1] !== left[1]) {
          return right[1] - left[1];
        }

        return left[0].localeCompare(right[0]);
      })
      .map(([focusArea, count]) => ({
        id: focusArea,
        name: focusArea,
        count,
      })),
  ];
}

export function getDefaultFieldGuideProcedure(
  procedures: FieldGuideProcedure[],
) {
  return procedures[0];
}
