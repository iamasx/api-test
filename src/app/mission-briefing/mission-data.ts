export type Severity = "low" | "medium" | "high";
export type MissionStatus = "ready" | "watch" | "blocked";
export type ReviewMode = "command" | "risk" | "support";

export type MissionRisk = {
  label: string;
  severity: Severity;
};

export type MissionPhase = {
  id: string;
  label: string;
  window: string;
  owner: string;
  objective: string;
  status: MissionStatus;
  blockers: MissionRisk[];
};

export type MissionTeam = {
  id: string;
  name: string;
  lead: string;
  readiness: MissionStatus;
  confidence: number;
  focus: string;
};

export type MissionDecision = {
  id: string;
  label: string;
  rationale: string;
  effect: string;
};

export type MissionScore = {
  readiness: number;
  tempo: number;
  cover: number;
  resilience: number;
};

export type MissionPlanAction = {
  id: string;
  phaseId: string;
  label: string;
  window: string;
  owner: string;
  effect: string;
};

export type MissionOutcome = {
  id: string;
  label: string;
  stance: "baseline" | "upside" | "stress";
  summary: string;
  trigger: string;
  commandNote: string;
  score: MissionScore;
  stressedPhaseIds: string[];
  watchpoints: string[];
};

export type MissionPlan = {
  id: string;
  label: string;
  posture: string;
  summary: string;
  commandIntent: string;
  tradeoff: string;
  assumptions: string[];
  actions: MissionPlanAction[];
  scorecard: MissionScore;
  readinessSummary: {
    headline: string;
    supportDemand: string;
    riskWindow: string;
    note: string;
  };
  reviewPrompts: Record<ReviewMode, string[]>;
  teamAdjustments: Record<
    string,
    {
      readiness?: MissionStatus;
      confidenceDelta: number;
      focus?: string;
      note: string;
    }
  >;
  outcomes: MissionOutcome[];
};

export type MissionScenario = {
  id: string;
  callsign: string;
  theater: string;
  horizon: string;
  summary: string;
  lead: string;
  status: MissionStatus;
  alert: string;
  blockers: MissionRisk[];
  timeline: MissionPhase[];
  readiness: MissionTeam[];
  decisions: MissionDecision[];
  plans: MissionPlan[];
};

export const statusLabels: Record<MissionStatus, string> = {
  ready: "Ready",
  watch: "Watch",
  blocked: "Blocked",
};

export const reviewModeLabels: Record<ReviewMode, string> = {
  command: "Command Review",
  risk: "Risk Review",
  support: "Support Review",
};

export const outcomeStanceLabels: Record<MissionOutcome["stance"], string> = {
  baseline: "Baseline",
  upside: "Upside",
  stress: "Stress",
};

export const scoreLabels: Record<keyof MissionScore, string> = {
  readiness: "Readiness",
  tempo: "Tempo",
  cover: "Cover",
  resilience: "Resilience",
};

export const missionScenarios: MissionScenario[] = [
  {
    id: "northern-line",
    callsign: "Northern Line",
    theater: "Arctic relay corridor",
    horizon: "18h window",
    summary: "Escort corridor with a weather shelf after phase two.",
    lead: "S. Flores",
    status: "ready",
    alert:
      "Route holds if the offset refuel plan is approved before convoy merge.",
    blockers: [
      { label: "Fuel variance", severity: "medium" },
      { label: "Dock queue", severity: "low" },
    ],
    timeline: [
      {
        id: "nl-1",
        label: "Recon sweep",
        window: "18:00",
        owner: "Signals",
        objective: "Validate relay health before corridor entry.",
        status: "ready",
        blockers: [{ label: "Cloud drift", severity: "low" }],
      },
      {
        id: "nl-2",
        label: "Convoy merge",
        window: "18:40",
        owner: "Ops",
        objective: "Merge escorts before the shelf compresses.",
        status: "watch",
        blockers: [{ label: "Refuel pacing", severity: "medium" }],
      },
      {
        id: "nl-3",
        label: "Harbor handoff",
        window: "20:10",
        owner: "Harbor",
        objective: "Transfer cargo without blocking berth seven.",
        status: "ready",
        blockers: [],
      },
    ],
    readiness: [
      {
        id: "nl-r1",
        name: "Flight wing",
        lead: "R. Singh",
        readiness: "ready",
        confidence: 87,
        focus: "Hold escort spacing through the shelf.",
      },
      {
        id: "nl-r2",
        name: "Signals desk",
        lead: "M. Hart",
        readiness: "ready",
        confidence: 81,
        focus: "Preserve relay quality in the north band.",
      },
      {
        id: "nl-r3",
        name: "Fuel control",
        lead: "I. Moreno",
        readiness: "watch",
        confidence: 68,
        focus: "Trim reserve mismatch before merge.",
      },
    ],
    decisions: [
      {
        id: "nl-d1",
        label: "Approve offset tanking",
        rationale: "Adds reserve margin if weather closes early.",
        effect: "Improves merge tolerance but commits deck crews earlier.",
      },
      {
        id: "nl-d2",
        label: "Hold reserve escort",
        rationale: "Keeps an extraction option for the final leg.",
        effect: "Protects the handoff if the shelf collapses over berth seven.",
      },
      {
        id: "nl-d3",
        label: "Shift harbor handoff by one cycle",
        rationale: "Creates room if the merge burns hot.",
        effect: "Trades headline tempo for a cleaner berth transfer.",
      },
    ],
    plans: [
      {
        id: "nl-plan-offset",
        label: "Offset Topping",
        posture: "Balanced reserve",
        summary:
          "Top off before merge, keep the escort cadence intact, and preserve a clean final handoff.",
        commandIntent:
          "Protect the route margin without sacrificing the original delivery tempo.",
        tradeoff:
          "Consumes deck attention during the approach but keeps the harbor move familiar.",
        assumptions: [
          "Auxiliary tanking crew can clear in nine minutes.",
          "Weather shelf stays outside corridor alpha through merge.",
          "Berth seven remains available for the handoff lane.",
        ],
        actions: [
          {
            id: "nl-offset-action-1",
            phaseId: "nl-1",
            label: "Pre-stage tankers on the north apron",
            window: "17:45",
            owner: "Fuel control",
            effect: "Eliminates the deck shuffle during recon release.",
          },
          {
            id: "nl-offset-action-2",
            phaseId: "nl-2",
            label: "Execute rolling top-off on escort two",
            window: "18:38",
            owner: "Flight wing",
            effect: "Adds reserve depth before the shelf narrows.",
          },
          {
            id: "nl-offset-action-3",
            phaseId: "nl-3",
            label: "Freeze berth seven tug queue",
            window: "20:00",
            owner: "Harbor",
            effect: "Locks the transfer window for the final cargo handoff.",
          },
        ],
        scorecard: {
          readiness: 84,
          tempo: 78,
          cover: 82,
          resilience: 80,
        },
        readinessSummary: {
          headline: "Reserve posture stays stable while the corridor remains intact.",
          supportDemand: "Medium deck support",
          riskWindow: "Merge compression after 18:40",
          note: "Fuel control becomes the pacing function but the escort stack remains manageable.",
        },
        reviewPrompts: {
          command: [
            "Approve offset tanking before recon clears the shelf line.",
            "Keep the reserve escort warm until harbor handoff is locked.",
            "Use the original berth transfer unless deck timing slips twice.",
          ],
          risk: [
            "Watch the merge burn rate; any overrun eats the shelf margin immediately.",
            "Cloud drift only matters if signals cannot re-route the north band quickly.",
            "If berth seven softens, shift the handoff before the queue hardens.",
          ],
          support: [
            "Deck crews need a short surge only during the rolling top-off window.",
            "Harbor tug support stays moderate if the queue freeze lands on time.",
            "Signals support is mostly steady-state unless the shelf pulls south early.",
          ],
        },
        teamAdjustments: {
          "nl-r1": {
            confidenceDelta: 3,
            note: "Escort spacing stays routine once reserve fuel lands.",
          },
          "nl-r2": {
            confidenceDelta: 2,
            note: "Relay quality stays stable through the corridor entry.",
          },
          "nl-r3": {
            readiness: "ready",
            confidenceDelta: 9,
            focus: "Run the top-off as a rolling handoff before merge.",
            note: "Fuel mismatch closes if staging holds at the apron.",
          },
        },
        outcomes: [
          {
            id: "nl-offset-baseline",
            label: "Merge holds with trim burn",
            stance: "baseline",
            summary:
              "The offset top-off clears on schedule and the convoy reaches harbor with a modest reserve buffer.",
            trigger: "Deck crews clear the apron before weather drift crosses the corridor.",
            commandNote:
              "Proceed on the baseline handoff unless berth seven slips behind the tug queue.",
            score: {
              readiness: 84,
              tempo: 78,
              cover: 82,
              resilience: 80,
            },
            stressedPhaseIds: ["nl-2"],
            watchpoints: [
              "Monitor refuel pacing through the merge lane.",
              "Keep berth seven frozen until the transfer lead confirms approach.",
            ],
          },
          {
            id: "nl-offset-upside",
            label: "Shelf stays open",
            stance: "upside",
            summary:
              "Weather holds north and the convoy reaches harbor early enough to release the reserve escort.",
            trigger: "Shelf drift remains outside corridor alpha for the full merge sequence.",
            commandNote:
              "Release the reserve escort only after harbor confirms berth access remains uncontested.",
            score: {
              readiness: 89,
              tempo: 84,
              cover: 84,
              resilience: 83,
            },
            stressedPhaseIds: ["nl-2"],
            watchpoints: [
              "Use the recovered buffer to decompress the harbor tug queue.",
              "Do not accelerate the handoff faster than the berth team can absorb.",
            ],
          },
          {
            id: "nl-offset-stress",
            label: "Shelf closes early",
            stance: "stress",
            summary:
              "Weather drifts south ahead of plan and the merge burns more reserve than expected.",
            trigger: "Cloud drift crosses the corridor while escort two is still topping off.",
            commandNote:
              "Protect the route first, then decide whether the harbor handoff can still remain on berth seven.",
            score: {
              readiness: 67,
              tempo: 62,
              cover: 74,
              resilience: 60,
            },
            stressedPhaseIds: ["nl-1", "nl-2"],
            watchpoints: [
              "Cloud drift becomes critical during recon exit, not at harbor.",
              "Reserve escort should remain committed until the cargo transfer is physically underway.",
            ],
          },
        ],
      },
      {
        id: "nl-plan-sprint",
        label: "Ice Shelf Sprint",
        posture: "Tempo forward",
        summary:
          "Push the merge earlier, skip the offset top-off, and beat the weather shelf through raw pace.",
        commandIntent:
          "Trade reserve cushion for schedule certainty while the corridor is still open.",
        tradeoff:
          "Raises fuel anxiety and narrows the recovery path if the shelf accelerates.",
        assumptions: [
          "Escort two can carry the route without the extra top-off.",
          "Harbor tug queue can absorb an earlier-than-planned arrival.",
          "Signals desk can keep relay quality stable while flight tempo rises.",
        ],
        actions: [
          {
            id: "nl-sprint-action-1",
            phaseId: "nl-1",
            label: "Advance recon release by ten minutes",
            window: "17:50",
            owner: "Signals",
            effect: "Creates a wider lane before the shelf shifts south.",
          },
          {
            id: "nl-sprint-action-2",
            phaseId: "nl-2",
            label: "Merge all escorts in a single sprint lane",
            window: "18:28",
            owner: "Ops",
            effect: "Compresses exposure but removes the fuel recovery pause.",
          },
          {
            id: "nl-sprint-action-3",
            phaseId: "nl-3",
            label: "Request early berth handoff",
            window: "19:50",
            owner: "Harbor",
            effect: "Pulls the cargo transfer ahead of the normal queue cycle.",
          },
        ],
        scorecard: {
          readiness: 75,
          tempo: 90,
          cover: 70,
          resilience: 66,
        },
        readinessSummary: {
          headline: "Speed improves sharply, but the plan leans on exact timing more than reserve depth.",
          supportDemand: "High escort coordination",
          riskWindow: "Route entry through convoy merge",
          note: "Fuel control becomes a weak point if escort pacing drifts even slightly.",
        },
        reviewPrompts: {
          command: [
            "Only sprint if harbor can guarantee the earlier berth handoff.",
            "Keep the reserve escort within one call even if it does not join the lane.",
            "Abort the sprint if recon loses corridor clarity before release.",
          ],
          risk: [
            "The sprint saves the shelf margin but amplifies every pacing error.",
            "Fuel control has no recovery pocket once the merge begins.",
            "An early harbor queue forces the convoy to loiter at the worst possible moment.",
          ],
          support: [
            "Signals and ops carry most of the support load during the entry sprint.",
            "Harbor support demand spikes if the arrival outruns berth prep.",
            "Deck crews stay lighter only because the top-off is skipped entirely.",
          ],
        },
        teamAdjustments: {
          "nl-r1": {
            confidenceDelta: 4,
            focus: "Keep the escort lane compressed through shelf entry.",
            note: "Flight wing likes the tempo but has less margin to correct later.",
          },
          "nl-r2": {
            readiness: "watch",
            confidenceDelta: -5,
            focus: "Protect relay quality while the lane accelerates.",
            note: "Signals absorbs more fragility when timing tightens this aggressively.",
          },
          "nl-r3": {
            readiness: "watch",
            confidenceDelta: -7,
            note: "Fuel mismatch stays open because the planned top-off never lands.",
          },
        },
        outcomes: [
          {
            id: "nl-sprint-baseline",
            label: "Convoy outruns the shelf",
            stance: "baseline",
            summary:
              "The sprint works, the corridor stays open just long enough, and the harbor team absorbs the early arrival.",
            trigger: "Recon release advances cleanly and berth prep starts before the lane compresses.",
            commandNote:
              "Hold the reserve escort close until harbor confirms the convoy is physically inbound.",
            score: {
              readiness: 75,
              tempo: 90,
              cover: 70,
              resilience: 66,
            },
            stressedPhaseIds: ["nl-1", "nl-2"],
            watchpoints: [
              "Signals cannot afford another drift event during the sprint lane.",
              "Harbor prep must be visible before the convoy commits to the faster approach.",
            ],
          },
          {
            id: "nl-sprint-upside",
            label: "Early harbor capture",
            stance: "upside",
            summary:
              "The sprint buys enough time to clear the queue entirely and cargo transfer finishes ahead of the shelf.",
            trigger: "Berth prep lands before recon exits corridor alpha.",
            commandNote:
              "Convert the recovered time into berth stability instead of pushing a second acceleration.",
            score: {
              readiness: 80,
              tempo: 94,
              cover: 75,
              resilience: 72,
            },
            stressedPhaseIds: ["nl-2"],
            watchpoints: [
              "Do not overrun harbor crews just because the lane opens wider than expected.",
              "Release tug support only after the transfer crew confirms berth lock.",
            ],
          },
          {
            id: "nl-sprint-stress",
            label: "Harbor queue hardens",
            stance: "stress",
            summary:
              "The sprint reaches harbor early, but the berth queue is not ready and the convoy loiters exposed.",
            trigger: "The early request lands before tug allocation actually clears berth seven.",
            commandNote:
              "If harbor cannot absorb the convoy immediately, revert to the reserve escort hold before loitering expands.",
            score: {
              readiness: 59,
              tempo: 68,
              cover: 54,
              resilience: 52,
            },
            stressedPhaseIds: ["nl-2", "nl-3"],
            watchpoints: [
              "Loiter at harbor is more dangerous than a slower merge on the corridor.",
              "Fuel control becomes critical again once the convoy loses its pace advantage.",
            ],
          },
        ],
      },
      {
        id: "nl-plan-reserve",
        label: "Reserve Escort Hold",
        posture: "Protection bias",
        summary:
          "Slow the merge slightly, keep the reserve escort attached through handoff, and prioritize stability over tempo.",
        commandIntent:
          "Guarantee the cargo transfer even if the corridor or berth timing degrades late.",
        tradeoff:
          "Adds drag to the schedule, but it keeps the last-mile recovery path intact.",
        assumptions: [
          "Reserve escort can remain committed through the harbor transfer.",
          "Berth teams value stability more than raw arrival pace.",
          "Signals desk can preserve a lower-tempo corridor picture for longer.",
        ],
        actions: [
          {
            id: "nl-reserve-action-1",
            phaseId: "nl-1",
            label: "Keep reserve escort paired from route entry",
            window: "18:00",
            owner: "Ops",
            effect: "Creates a standing extraction option before weather tightens.",
          },
          {
            id: "nl-reserve-action-2",
            phaseId: "nl-2",
            label: "Throttle merge pace by one escort interval",
            window: "18:42",
            owner: "Flight wing",
            effect: "Protects fuel discipline and keeps the reserve lane orderly.",
          },
          {
            id: "nl-reserve-action-3",
            phaseId: "nl-3",
            label: "Run the handoff under reserve overwatch",
            window: "20:12",
            owner: "Harbor",
            effect: "Covers the berth transfer if the tug queue reopens.",
          },
        ],
        scorecard: {
          readiness: 83,
          tempo: 71,
          cover: 90,
          resilience: 87,
        },
        readinessSummary: {
          headline: "This is the safest route through the handoff, with deliberate tempo and deeper redundancy.",
          supportDemand: "Moderate sustained escort support",
          riskWindow: "Late corridor drift into harbor transfer",
          note: "The reserve escort smooths the worst-case path, but the route never feels fast.",
        },
        reviewPrompts: {
          command: [
            "Use this when the mission value is the cargo transfer itself, not route speed.",
            "Protect berth lock before releasing the reserve escort under any condition.",
            "Accept the tempo tax early rather than improvising later.",
          ],
          risk: [
            "This plan narrows downside exposure but does not eliminate weather drift.",
            "If the berth queue stays soft, the reserve escort mainly buys confidence, not schedule.",
            "A slow merge only pays off if the handoff truly needs the extra cover.",
          ],
          support: [
            "Ops shoulders a longer escort burden, but the work is predictable.",
            "Harbor support load is smoother because the reserve lane buffers late surprises.",
            "Signals desk can operate at a steadier cadence with fewer scramble events.",
          ],
        },
        teamAdjustments: {
          "nl-r1": {
            confidenceDelta: 1,
            note: "The escort load lasts longer but stays more controlled.",
          },
          "nl-r2": {
            confidenceDelta: 4,
            note: "Signals benefits from the slower and more stable cadence.",
          },
          "nl-r3": {
            readiness: "ready",
            confidenceDelta: 5,
            focus: "Stretch reserves across a slower merge with less variance.",
            note: "Fuel posture improves because the route stops chasing the clock.",
          },
        },
        outcomes: [
          {
            id: "nl-reserve-baseline",
            label: "Protected handoff",
            stance: "baseline",
            summary:
              "The route arrives a little late, but cargo transfer completes cleanly under reserve cover.",
            trigger: "Berth teams accept the slower arrival and hold the queue freeze.",
            commandNote:
              "Keep the reserve escort until the transfer supervisor calls the berth clear.",
            score: {
              readiness: 83,
              tempo: 71,
              cover: 90,
              resilience: 87,
            },
            stressedPhaseIds: ["nl-3"],
            watchpoints: [
              "Do not let the reserve lane peel away before the final pallet transfer clears.",
              "The corridor remains acceptable as long as the harbor queue stays disciplined.",
            ],
          },
          {
            id: "nl-reserve-upside",
            label: "Stable corridor and clean berth",
            stance: "upside",
            summary:
              "The slower merge never gets punished, and the reserve escort leaves without being used.",
            trigger: "Weather drift stays mild while berth seven remains locked end-to-end.",
            commandNote:
              "Use the extra cover to simplify the handoff instead of adding new tasks.",
            score: {
              readiness: 87,
              tempo: 75,
              cover: 92,
              resilience: 90,
            },
            stressedPhaseIds: ["nl-3"],
            watchpoints: [
              "Stay disciplined; the win condition is a boring transfer, not a late sprint.",
              "Release harbor support only after reserve escort separation is complete.",
            ],
          },
          {
            id: "nl-reserve-stress",
            label: "Shelf presses through the slower merge",
            stance: "stress",
            summary:
              "The protected posture helps, but the slower route still absorbs weather pressure on the way in.",
            trigger: "Shelf drift arrives before the reserve lane can hand the convoy into harbor.",
            commandNote:
              "Use the reserve escort to secure the handoff, then decide whether the cargo pace can recover at all.",
            score: {
              readiness: 70,
              tempo: 58,
              cover: 84,
              resilience: 78,
            },
            stressedPhaseIds: ["nl-2", "nl-3"],
            watchpoints: [
              "Weather pressure now follows the convoy deeper toward harbor.",
              "The reserve escort protects the transfer, but it will not restore lost time.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "harbor-echo",
    callsign: "Harbor Echo",
    theater: "Littoral staging arc",
    horizon: "9h window",
    summary: "Coastal logistics rehearsal with contested pier access.",
    lead: "A. Rhee",
    status: "watch",
    alert:
      "Cargo timing is healthy, but pier access stays fragile until the patrol overlap clears.",
    blockers: [
      { label: "Pier access", severity: "high" },
      { label: "Drone overlap", severity: "medium" },
    ],
    timeline: [
      {
        id: "he-1",
        label: "Harbor scan",
        window: "13:10",
        owner: "Recon",
        objective: "Map congestion around delta approach.",
        status: "watch",
        blockers: [{ label: "Blind spot", severity: "medium" }],
      },
      {
        id: "he-2",
        label: "Cargo staging",
        window: "13:40",
        owner: "Logistics",
        objective: "Stage priority pallets by reload order.",
        status: "ready",
        blockers: [],
      },
      {
        id: "he-3",
        label: "Pier insertion",
        window: "14:20",
        owner: "Harbor",
        objective: "Thread the convoy into pier delta.",
        status: "blocked",
        blockers: [{ label: "Patrol overlap", severity: "high" }],
      },
    ],
    readiness: [
      {
        id: "he-r1",
        name: "Harbor cell",
        lead: "L. Zhou",
        readiness: "blocked",
        confidence: 41,
        focus: "Protect the insertion window at pier delta.",
      },
      {
        id: "he-r2",
        name: "Cargo staging",
        lead: "F. Clarke",
        readiness: "ready",
        confidence: 84,
        focus: "Keep pallets aligned with the reroute model.",
      },
      {
        id: "he-r3",
        name: "Counter-drone desk",
        lead: "N. Kim",
        readiness: "watch",
        confidence: 63,
        focus: "Track low-altitude interruptions above delta.",
      },
    ],
    decisions: [
      {
        id: "he-d1",
        label: "Trigger berth gamma fallback",
        rationale: "Prevents the drill from slipping into the evening cycle.",
        effect: "Improves access odds but increases the manifest swap workload.",
      },
      {
        id: "he-d2",
        label: "Delay pier insertion",
        rationale: "Trades schedule for a cleaner safety margin.",
        effect: "Protects crews from the overlap but risks missing the preferred tide.",
      },
      {
        id: "he-d3",
        label: "Run a drone decoy corridor",
        rationale: "Attempts to pull patrol attention off the delta approach.",
        effect: "May reopen tempo quickly, but the exposure is difficult to bound.",
      },
    ],
    plans: [
      {
        id: "he-plan-gamma",
        label: "Berth Gamma Fallback",
        posture: "Fallback pier swing",
        summary:
          "Shift the drill to berth gamma, reshuffle the manifest, and use the cleaner lane to preserve the window.",
        commandIntent:
          "Keep the rehearsal moving by using a second-best pier that is operationally quieter.",
        tradeoff:
          "Manifest handling becomes heavier, but the plan stops waiting on delta.",
        assumptions: [
          "Berth gamma can accept the priority pallets without fresh engineering review.",
          "Harbor tugs can pivot to gamma before the patrol overlap broadens.",
          "Cargo staging can absorb one more manifest sequence without losing order.",
        ],
        actions: [
          {
            id: "he-gamma-action-1",
            phaseId: "he-1",
            label: "Scan gamma lane alongside delta",
            window: "13:05",
            owner: "Recon",
            effect: "Confirms the fallback route before the first pier call.",
          },
          {
            id: "he-gamma-action-2",
            phaseId: "he-2",
            label: "Split pallets into gamma-first order",
            window: "13:32",
            owner: "Logistics",
            effect: "Cuts down manifest churn during the pier switch.",
          },
          {
            id: "he-gamma-action-3",
            phaseId: "he-3",
            label: "Redirect the convoy to berth gamma",
            window: "14:08",
            owner: "Harbor",
            effect: "Avoids the worst of the patrol overlap near delta.",
          },
        ],
        scorecard: {
          readiness: 76,
          tempo: 79,
          cover: 74,
          resilience: 72,
        },
        readinessSummary: {
          headline: "The route becomes more manageable once the team commits to gamma early enough.",
          supportDemand: "Manifest-heavy support",
          riskWindow: "Final pier call into gamma",
          note: "This plan works when logistics can stay ahead of the manifest rewrite.",
        },
        reviewPrompts: {
          command: [
            "Commit to gamma before delta becomes emotionally sticky for the harbor cell.",
            "Treat manifest order as the pacing item, not the tug route.",
            "Keep delta as a fallback only if gamma loses access unexpectedly.",
          ],
          risk: [
            "Gamma is safer than delta, but only if the convoy turns before patrol overlap widens.",
            "Manifest churn is the hidden failure mode; late swaps create silent delay.",
            "Counter-drone coverage still matters because the route remains visible on approach.",
          ],
          support: [
            "Logistics carries the support burden through the manifest rewrite.",
            "Harbor tug demand shifts earlier, but it becomes more predictable.",
            "Counter-drone support stays moderate because the convoy avoids the noisiest lane.",
          ],
        },
        teamAdjustments: {
          "he-r1": {
            readiness: "watch",
            confidenceDelta: 17,
            focus: "Rebuild pier confidence around gamma instead of delta.",
            note: "Harbor cell recovers once the fallback pier becomes explicit.",
          },
          "he-r2": {
            confidenceDelta: -4,
            focus: "Hold manifest order through the gamma-first sequence.",
            note: "Cargo staging absorbs more pressure during the pivot.",
          },
          "he-r3": {
            confidenceDelta: 5,
            note: "Counter-drone coverage benefits from the cleaner gamma approach.",
          },
        },
        outcomes: [
          {
            id: "he-gamma-baseline",
            label: "Gamma lane opens",
            stance: "baseline",
            summary:
              "The convoy shifts to berth gamma, manifest swaps hold, and the drill preserves most of the original tempo.",
            trigger: "Recon confirms gamma access before cargo staging starts the final load order.",
            commandNote:
              "Protect manifest discipline first; a messy pivot is worse than a slightly slower pier call.",
            score: {
              readiness: 76,
              tempo: 79,
              cover: 74,
              resilience: 72,
            },
            stressedPhaseIds: ["he-2", "he-3"],
            watchpoints: [
              "Manifest order is the pacing item once gamma becomes active.",
              "Harbor cell should not revisit delta unless gamma access collapses outright.",
            ],
          },
          {
            id: "he-gamma-upside",
            label: "Fallback lane opens early",
            stance: "upside",
            summary:
              "Gamma clears fast enough that the convoy recovers schedule and the harbor team finishes before the overlap intensifies.",
            trigger: "Tug reallocation lands before patrol traffic shifts toward delta.",
            commandNote:
              "Use the recovered schedule to clean up staging, not to force extra throughput.",
            score: {
              readiness: 82,
              tempo: 84,
              cover: 79,
              resilience: 78,
            },
            stressedPhaseIds: ["he-3"],
            watchpoints: [
              "The biggest gain comes from early harbor commitment, not faster cargo handling.",
              "Counter-drone desk still needs eyes on the delta edge in case traffic spills.",
            ],
          },
          {
            id: "he-gamma-stress",
            label: "Gamma crowds unexpectedly",
            stance: "stress",
            summary:
              "The convoy reaches gamma only to find another queue building and the manifest pivot starts to unravel.",
            trigger: "Gamma access looks clear during scan but seals up before the final pier call.",
            commandNote:
              "If gamma crowds, freeze the manifest and decide whether the drill should delay instead of improvising a second pier move.",
            score: {
              readiness: 58,
              tempo: 55,
              cover: 63,
              resilience: 57,
            },
            stressedPhaseIds: ["he-2", "he-3"],
            watchpoints: [
              "A second pier move creates more chaos than accepting a deliberate delay.",
              "Cargo staging loses its advantage as soon as manifest order gets rewritten twice.",
            ],
          },
        ],
      },
      {
        id: "he-plan-delay",
        label: "Delay For Clean Window",
        posture: "Safety first",
        summary:
          "Hold the convoy back until the patrol overlap clears, then run the original delta insertion with cleaner visibility.",
        commandIntent:
          "Protect crews and simplify execution by waiting for the lane the team already understands.",
        tradeoff:
          "Gives up tempo and adds exposure to evening congestion if the window slips.",
        assumptions: [
          "The patrol overlap genuinely clears within the expected delay band.",
          "Cargo staging can hold priority pallets without degrading load order.",
          "Harbor teams prefer certainty over keeping the drill on its original timestamp.",
        ],
        actions: [
          {
            id: "he-delay-action-1",
            phaseId: "he-1",
            label: "Track overlap until the lane reopens",
            window: "13:10",
            owner: "Recon",
            effect: "Turns the harbor scan into a rolling delay trigger.",
          },
          {
            id: "he-delay-action-2",
            phaseId: "he-2",
            label: "Hold pallets in ready stacks",
            window: "13:45",
            owner: "Logistics",
            effect: "Preserves the original insertion order while the convoy waits.",
          },
          {
            id: "he-delay-action-3",
            phaseId: "he-3",
            label: "Run delta insertion only after the lane clears",
            window: "14:42",
            owner: "Harbor",
            effect: "Uses the familiar pier route with a cleaner safety picture.",
          },
        ],
        scorecard: {
          readiness: 83,
          tempo: 62,
          cover: 86,
          resilience: 79,
        },
        readinessSummary: {
          headline: "Readiness improves because the team can work the original route without improvising under pressure.",
          supportDemand: "Low surge, longer hold",
          riskWindow: "Delay extension into evening queue",
          note: "The plan is calm if the patrols move on time and the harbor lane does not refill.",
        },
        reviewPrompts: {
          command: [
            "Use this when crew safety and execution clarity matter more than the clock.",
            "Set a hard delay threshold before evening congestion becomes the new problem.",
            "Keep the convoy staged and quiet rather than letting side tasks creep in.",
          ],
          risk: [
            "The clean-window plan only works if the overlap genuinely clears in time.",
            "Evening queue risk grows every minute the patrol lane stays contested.",
            "A calm hold can still fail if the harbor team mistakes patience for certainty.",
          ],
          support: [
            "Cargo staging needs endurance, not intensity, during the delay.",
            "Harbor support demand stays light until the final insertion call.",
            "Counter-drone coverage remains steady because the convoy avoids the noisy pivot.",
          ],
        },
        teamAdjustments: {
          "he-r1": {
            readiness: "watch",
            confidenceDelta: 22,
            focus: "Use the original delta route once the window is actually clean.",
            note: "Harbor cell becomes viable again when the lane is no longer contested.",
          },
          "he-r2": {
            confidenceDelta: 1,
            note: "Cargo staging is comfortable holding the original order a bit longer.",
          },
          "he-r3": {
            readiness: "ready",
            confidenceDelta: 10,
            focus: "Monitor the overlap boundary without forcing a diversion.",
            note: "Counter-drone desk gains clarity because the route remains predictable.",
          },
        },
        outcomes: [
          {
            id: "he-delay-baseline",
            label: "Patrol window clears",
            stance: "baseline",
            summary:
              "The convoy waits, the overlap clears on time, and the original delta insertion runs with a far cleaner safety profile.",
            trigger: "Patrol traffic peels away before the harbor team loses the preferred tide.",
            commandNote:
              "Commit to the original delta run once the window opens; do not start improvising because there is recovered slack.",
            score: {
              readiness: 83,
              tempo: 62,
              cover: 86,
              resilience: 79,
            },
            stressedPhaseIds: ["he-1", "he-3"],
            watchpoints: [
              "Even with a clean lane, the delay threshold should stay explicit.",
              "Cargo staging should keep the ready stacks frozen until harbor calls the go.",
            ],
          },
          {
            id: "he-delay-upside",
            label: "Window clears faster than expected",
            stance: "upside",
            summary:
              "The patrols peel away early, the convoy still uses delta, and the drill finishes with both safety and tempo mostly intact.",
            trigger: "Recon sees the overlap collapse before staging reaches its long-hold threshold.",
            commandNote:
              "Preserve the calmer route and avoid turning an early win into a rushed insertion.",
            score: {
              readiness: 86,
              tempo: 72,
              cover: 88,
              resilience: 83,
            },
            stressedPhaseIds: ["he-3"],
            watchpoints: [
              "The opportunity is real only if harbor teams are already staged for delta.",
              "Counter-drone desk should stay active until the convoy is fully inside the pier.",
            ],
          },
          {
            id: "he-delay-stress",
            label: "Evening backlog forms",
            stance: "stress",
            summary:
              "The overlap lingers just long enough for the harbor queue to refill, and the delayed clean-window plan loses its advantage.",
            trigger: "Patrol traffic clears after the preferred tide and the lane repopulates with commercial traffic.",
            commandNote:
              "Once the queue starts to refill, choose whether to remain delayed or pivot to gamma rather than pretending the original plan still exists.",
            score: {
              readiness: 64,
              tempo: 43,
              cover: 72,
              resilience: 61,
            },
            stressedPhaseIds: ["he-1", "he-3"],
            watchpoints: [
              "Evening congestion is the real cliff edge for the delay plan.",
              "Harbor cell should not absorb indefinite waiting without a fresh pier decision.",
            ],
          },
        ],
      },
      {
        id: "he-plan-decoy",
        label: "Drone Corridor Decoy",
        posture: "Distraction push",
        summary:
          "Use a decoy drone lane to pull patrol attention off delta and push the convoy through the original insertion window.",
        commandIntent:
          "Recover tempo without waiting for the overlap to clear on its own.",
        tradeoff:
          "Restores speed, but the exposure is higher and counter-drone demands spike immediately.",
        assumptions: [
          "The decoy corridor will actually peel patrol focus away from delta.",
          "Counter-drone desk can hold the deception long enough for the convoy to commit.",
          "Harbor cell is willing to re-enter delta under a more aggressive posture.",
        ],
        actions: [
          {
            id: "he-decoy-action-1",
            phaseId: "he-1",
            label: "Launch the decoy corridor east of delta",
            window: "13:12",
            owner: "Counter-drone",
            effect: "Pulls patrol attention off the intended convoy lane.",
          },
          {
            id: "he-decoy-action-2",
            phaseId: "he-2",
            label: "Stage pallets for a no-stop delta insertion",
            window: "13:38",
            owner: "Logistics",
            effect: "Preserves the original timetable once the lane blinks open.",
          },
          {
            id: "he-decoy-action-3",
            phaseId: "he-3",
            label: "Commit to delta under decoy cover",
            window: "14:16",
            owner: "Harbor",
            effect: "Attempts to punch through before patrols collapse back in.",
          },
        ],
        scorecard: {
          readiness: 68,
          tempo: 85,
          cover: 64,
          resilience: 58,
        },
        readinessSummary: {
          headline: "The tempo story improves, but the route becomes far more sensitive to a single counter-drone miss.",
          supportDemand: "High counter-drone support",
          riskWindow: "Decoy launch through delta insertion",
          note: "This plan can win quickly or unravel all at once if the patrols do not buy the corridor shift.",
        },
        reviewPrompts: {
          command: [
            "Use the decoy only if preserving tempo matters more than staying conservative.",
            "Pre-brief the abort call before launch; the team will not invent it cleanly mid-run.",
            "If the corridor does not peel quickly, fall back before harbor commits to delta.",
          ],
          risk: [
            "The decoy concentrates risk into one short and fragile window.",
            "Counter-drone desk becomes the single point of failure for the entire insertion.",
            "Harbor cell confidence can drop fast if the deception looks ambiguous on approach.",
          ],
          support: [
            "Counter-drone desk carries a heavy but short support surge.",
            "Cargo staging stays efficient because the original manifest order survives.",
            "Harbor teams need tight communication rather than a long support tail.",
          ],
        },
        teamAdjustments: {
          "he-r1": {
            readiness: "watch",
            confidenceDelta: 9,
            note: "Harbor cell likes keeping delta, but the exposure never feels fully clean.",
          },
          "he-r2": {
            confidenceDelta: 3,
            note: "Cargo staging keeps the original order and gains tempo confidence.",
          },
          "he-r3": {
            readiness: "ready",
            confidenceDelta: 15,
            focus: "Launch and sustain the decoy corridor long enough for the convoy to commit.",
            note: "Counter-drone desk becomes decisive instead of merely advisory.",
          },
        },
        outcomes: [
          {
            id: "he-decoy-baseline",
            label: "Decoy buys a short lane",
            stance: "baseline",
            summary:
              "The decoy opens delta just long enough for the convoy to commit, but the window remains tight the entire way in.",
            trigger: "Patrol attention shifts east for one cycle without fully abandoning the corridor.",
            commandNote:
              "Treat any hesitation as failure; the plan only works when the convoy moves decisively through the short opening.",
            score: {
              readiness: 68,
              tempo: 85,
              cover: 64,
              resilience: 58,
            },
            stressedPhaseIds: ["he-1", "he-3"],
            watchpoints: [
              "Counter-drone telemetry is the leading indicator, not harbor confidence.",
              "A partial lane opening is still enough if the convoy is already staged to move.",
            ],
          },
          {
            id: "he-decoy-upside",
            label: "Patrols fully chase the decoy",
            stance: "upside",
            summary:
              "The deception works better than expected, delta opens wide, and the drill recovers nearly all of its original timing.",
            trigger: "Patrol coverage shifts cleanly away from the delta approach for the full insertion cycle.",
            commandNote:
              "Stay disciplined and use the clean lane to reduce exposure, not to add extra cargo moves.",
            score: {
              readiness: 74,
              tempo: 91,
              cover: 70,
              resilience: 65,
            },
            stressedPhaseIds: ["he-3"],
            watchpoints: [
              "The cleanest version of this plan is still brief; do not linger at delta.",
              "Counter-drone desk should maintain the corridor until the convoy is fully inside the pier.",
            ],
          },
          {
            id: "he-decoy-stress",
            label: "Patrol chase snaps back",
            stance: "stress",
            summary:
              "The decoy works only partially, patrols pivot back, and the convoy gets caught between tempo and protection.",
            trigger: "The decoy lane peels coverage for less than a full insertion cycle.",
            commandNote:
              "Abort before the harbor team commits halfway; partial success is the failure mode here.",
            score: {
              readiness: 51,
              tempo: 59,
              cover: 47,
              resilience: 43,
            },
            stressedPhaseIds: ["he-1", "he-2", "he-3"],
            watchpoints: [
              "Half-open delta is worse than a deliberate delay because the team commits under false confidence.",
              "Counter-drone desk must own the abort signal if telemetry softens.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "polar-relay",
    callsign: "Polar Relay",
    theater: "Sub-orbital comms chain",
    horizon: "27h window",
    summary: "Relay recovery with a degraded node and a crew rotation gap.",
    lead: "T. Osei",
    status: "blocked",
    alert:
      "Restoration is paused until node six stabilizes or the crew gap is closed.",
    blockers: [
      { label: "Node six drift", severity: "high" },
      { label: "Crew gap", severity: "high" },
    ],
    timeline: [
      {
        id: "pr-1",
        label: "Node isolation",
        window: "07:00",
        owner: "Systems",
        objective: "Strip node six from the mesh and contain loss.",
        status: "blocked",
        blockers: [{ label: "Handshake failures", severity: "high" }],
      },
      {
        id: "pr-2",
        label: "Cold restart",
        window: "07:35",
        owner: "Power",
        objective: "Attempt a staged restart on drifted hardware.",
        status: "watch",
        blockers: [{ label: "Power sag", severity: "medium" }],
      },
      {
        id: "pr-3",
        label: "Network restore",
        window: "08:40",
        owner: "Command net",
        objective: "Reintroduce node six only after drift falls.",
        status: "watch",
        blockers: [{ label: "Tolerance mismatch", severity: "medium" }],
      },
    ],
    readiness: [
      {
        id: "pr-r1",
        name: "Systems recovery",
        lead: "J. Patel",
        readiness: "blocked",
        confidence: 34,
        focus: "Keep drift contained while restart is validated.",
      },
      {
        id: "pr-r2",
        name: "Power desk",
        lead: "C. Nwosu",
        readiness: "watch",
        confidence: 55,
        focus: "Prevent another sag during the restart cycle.",
      },
      {
        id: "pr-r3",
        name: "Crew rotations",
        lead: "D. Mercer",
        readiness: "blocked",
        confidence: 29,
        focus: "Backfill the vacant operator seat quickly.",
      },
    ],
    decisions: [
      {
        id: "pr-d1",
        label: "Keep node six isolated",
        rationale: "Avoids a broader mesh regression.",
        effect: "Stabilizes the rest of the chain but extends the outage window.",
      },
      {
        id: "pr-d2",
        label: "Activate reserve controller",
        rationale: "Closes the rotation gap before the next checkpoint.",
        effect: "Adds recovery capacity, but it forces a fresh handoff onto a strained desk.",
      },
      {
        id: "pr-d3",
        label: "Bypass node six temporarily",
        rationale: "Restores partial throughput while restart work continues.",
        effect: "Buys tempo, though resilience falls if another node slips.",
      },
    ],
    plans: [
      {
        id: "pr-plan-isolate",
        label: "Cold Swap Isolation",
        posture: "Containment bias",
        summary:
          "Keep node six isolated, stabilize the drift signature, and only then begin the restart sequence.",
        commandIntent:
          "Protect the wider mesh by refusing to rush the bad node back into service.",
        tradeoff:
          "This is the safest technical path, but it concedes throughput for longer.",
        assumptions: [
          "Systems recovery can maintain clean isolation without widening the outage.",
          "Power desk can support a slower, more controlled restart cadence.",
          "The crew gap can be managed with existing rotations through the containment window.",
        ],
        actions: [
          {
            id: "pr-isolate-action-1",
            phaseId: "pr-1",
            label: "Lock node six into hard isolation",
            window: "07:00",
            owner: "Systems",
            effect: "Prevents the drift from contaminating the broader mesh.",
          },
          {
            id: "pr-isolate-action-2",
            phaseId: "pr-2",
            label: "Run a cold diagnostic before power cycling",
            window: "07:28",
            owner: "Power",
            effect: "Reduces the chance of repeating the earlier sag.",
          },
          {
            id: "pr-isolate-action-3",
            phaseId: "pr-3",
            label: "Restore only after drift holds flat",
            window: "08:52",
            owner: "Command net",
            effect: "Keeps the final reinsertion conservative and observable.",
          },
        ],
        scorecard: {
          readiness: 60,
          tempo: 53,
          cover: 74,
          resilience: 66,
        },
        readinessSummary: {
          headline: "This plan stabilizes the mesh, but it accepts a slower climb back to service.",
          supportDemand: "High systems attention",
          riskWindow: "Isolation through cold diagnostic",
          note: "Containment lowers network risk while keeping the human workload high.",
        },
        reviewPrompts: {
          command: [
            "Choose this when protecting the wider mesh matters more than restoring node six quickly.",
            "Do not reintegrate until systems recovery can prove drift has flattened.",
            "Treat the crew gap as a pacing constraint, not background noise.",
          ],
          risk: [
            "The plan is technically conservative but humanly fragile because the shift is already thin.",
            "A slow restart only works if power sag remains contained after the cold diagnostic.",
            "If the outage cost spikes, pressure will build to shortcut the reintegration gate.",
          ],
          support: [
            "Systems recovery needs uninterrupted attention for the full isolation window.",
            "Power desk load stays steady rather than spiky, which helps avoid another sag.",
            "Crew rotations remain the limiting support factor until the reserve operator arrives.",
          ],
        },
        teamAdjustments: {
          "pr-r1": {
            readiness: "watch",
            confidenceDelta: 16,
            focus: "Hold a clean isolation boundary while diagnostics run.",
            note: "Systems recovery improves once the plan stops chasing early reintegration.",
          },
          "pr-r2": {
            confidenceDelta: 6,
            note: "Power desk benefits from the slower and better-instrumented restart path.",
          },
          "pr-r3": {
            confidenceDelta: 4,
            note: "Crew strain remains real, but the calmer cadence is easier to schedule around.",
          },
        },
        outcomes: [
          {
            id: "pr-isolate-baseline",
            label: "Isolation holds and restart waits",
            stance: "baseline",
            summary:
              "Node six stays isolated, drift remains contained, and the wider mesh avoids a second regression while recovery proceeds slowly.",
            trigger: "Diagnostics confirm the drift signature is no longer expanding after isolation.",
            commandNote:
              "Keep the reintegration gate firm; the value here is not speed, it is avoiding another cascade.",
            score: {
              readiness: 60,
              tempo: 53,
              cover: 74,
              resilience: 66,
            },
            stressedPhaseIds: ["pr-1", "pr-2"],
            watchpoints: [
              "Crew rotations remain the most likely hidden failure point during the extended hold.",
              "Containment only pays off if command net resists pressure to shortcut the restart gate.",
            ],
          },
          {
            id: "pr-isolate-upside",
            label: "Diagnostics clear faster than expected",
            stance: "upside",
            summary:
              "Isolation works cleanly, diagnostics finish early, and the restart begins with less risk than forecast.",
            trigger: "Drift signature flattens during the first diagnostic pass.",
            commandNote:
              "Use the early technical win to reduce operator strain before you accelerate the restore.",
            score: {
              readiness: 67,
              tempo: 61,
              cover: 77,
              resilience: 72,
            },
            stressedPhaseIds: ["pr-2"],
            watchpoints: [
              "An early clear signal should first buy crew breathing room, not immediate reintegration.",
              "Power desk still needs a disciplined staged restart even when diagnostics look better.",
            ],
          },
          {
            id: "pr-isolate-stress",
            label: "Isolation drags through shift change",
            stance: "stress",
            summary:
              "Containment holds, but the work extends into the thin rotation window and the human strain starts to dominate the plan.",
            trigger: "Diagnostics remain inconclusive as the vacant operator seat comes due again.",
            commandNote:
              "If the work reaches shift change without clarity, solve the crew gap before asking systems to continue carrying the load.",
            score: {
              readiness: 52,
              tempo: 43,
              cover: 69,
              resilience: 56,
            },
            stressedPhaseIds: ["pr-1", "pr-2", "pr-3"],
            watchpoints: [
              "Crew fatigue becomes a larger threat than the node itself once the shift rolls.",
              "A technically sound plan can still fail if the human handoff stays incomplete.",
            ],
          },
        ],
      },
      {
        id: "pr-plan-controller",
        label: "Reserve Controller Activation",
        posture: "Staff the gap first",
        summary:
          "Bring the reserve controller online before the restart, close the crew gap, and then run the recovery with better human coverage.",
        commandIntent:
          "Fix the thin operator posture so the technical recovery can proceed with fewer blind spots.",
        tradeoff:
          "Takes time up front, but it reduces the chance of a botched restart under fatigue.",
        assumptions: [
          "Reserve controller can join fast enough to matter for this recovery window.",
          "Systems recovery can hold containment without losing technical ground during the handoff.",
          "Command net prefers a slightly later but better-staffed restore path.",
        ],
        actions: [
          {
            id: "pr-controller-action-1",
            phaseId: "pr-1",
            label: "Pause reintegration until reserve controller is live",
            window: "07:02",
            owner: "Command net",
            effect: "Shifts the first priority from hardware back to operator coverage.",
          },
          {
            id: "pr-controller-action-2",
            phaseId: "pr-2",
            label: "Hand off restart sequencing to the expanded desk",
            window: "07:42",
            owner: "Power",
            effect: "Distributes the restart workload across a fuller crew.",
          },
          {
            id: "pr-controller-action-3",
            phaseId: "pr-3",
            label: "Restore node six with a staffed command net",
            window: "08:48",
            owner: "Systems",
            effect: "Reduces the odds of another blind reintegration.",
          },
        ],
        scorecard: {
          readiness: 74,
          tempo: 68,
          cover: 77,
          resilience: 76,
        },
        readinessSummary: {
          headline: "Human readiness improves enough to make the restart feel genuinely manageable again.",
          supportDemand: "Higher coordination, better coverage",
          riskWindow: "Reserve-controller handoff into cold restart",
          note: "This plan is strongest when the extra operator really arrives on time.",
        },
        reviewPrompts: {
          command: [
            "Use this when the crew gap is the true blocker, not the node itself.",
            "Do not shortcut the reserve-controller handoff just to start the restart sooner.",
            "Once staffing is restored, run the reintegration by the book instead of improvising for speed.",
          ],
          risk: [
            "This plan assumes the reserve controller arrives cleanly and can absorb the console immediately.",
            "A late handoff can turn the staff-first idea into pure delay with no payoff.",
            "If node drift worsens during the wait, the plan loses most of its advantage.",
          ],
          support: [
            "Command net support rises during the handoff but falls once the second operator settles in.",
            "Systems recovery benefits from having another set of eyes before reintegration.",
            "Power desk gets better coverage during the cold restart sequence.",
          ],
        },
        teamAdjustments: {
          "pr-r1": {
            readiness: "watch",
            confidenceDelta: 12,
            note: "Systems recovery trusts the restore path more once staffing improves.",
          },
          "pr-r2": {
            readiness: "ready",
            confidenceDelta: 11,
            focus: "Run the staged restart with a fully staffed desk.",
            note: "Power desk becomes much steadier with better console coverage.",
          },
          "pr-r3": {
            readiness: "watch",
            confidenceDelta: 24,
            focus: "Seat the reserve controller before the next checkpoint closes.",
            note: "Crew rotations stop being the main source of instability once the reserve arrives.",
          },
        },
        outcomes: [
          {
            id: "pr-controller-baseline",
            label: "Reserve seat closes the gap",
            stance: "baseline",
            summary:
              "The reserve controller arrives in time, the desk stabilizes, and the restart proceeds with far fewer operator blind spots.",
            trigger: "The incoming operator reaches the console before the cold restart sequence begins.",
            commandNote:
              "Once the gap is closed, keep the recovery disciplined instead of racing the clock to justify the delay.",
            score: {
              readiness: 74,
              tempo: 68,
              cover: 77,
              resilience: 76,
            },
            stressedPhaseIds: ["pr-2"],
            watchpoints: [
              "The handoff moment is the real pivot, not the restart button itself.",
              "Systems recovery should stay contained until the second operator is actually in place.",
            ],
          },
          {
            id: "pr-controller-upside",
            label: "Fresh controller accelerates restore",
            stance: "upside",
            summary:
              "The reserve controller lands early, the crew gap closes cleanly, and the recovery team can restore node six faster than expected.",
            trigger: "Reserve operator is on console before diagnostics finish.",
            commandNote:
              "Use the staffing gain to reduce error risk first, then convert it into tempo.",
            score: {
              readiness: 79,
              tempo: 74,
              cover: 80,
              resilience: 81,
            },
            stressedPhaseIds: ["pr-2", "pr-3"],
            watchpoints: [
              "A better-staffed desk should still keep staged checkpoints in place.",
              "Command net now has the option to protect both speed and resilience if the restore remains disciplined.",
            ],
          },
          {
            id: "pr-controller-stress",
            label: "Reserve operator slips the window",
            stance: "stress",
            summary:
              "The team waits for the reserve controller, but the handoff misses the ideal window and the recovery loses time without gaining enough stability.",
            trigger: "Reserve arrival lands after restart sequencing should already have begun.",
            commandNote:
              "If the staffing fix slips, decide whether containment or bypass now offers the better recovery path instead of lingering in between.",
            score: {
              readiness: 61,
              tempo: 49,
              cover: 70,
              resilience: 63,
            },
            stressedPhaseIds: ["pr-1", "pr-2", "pr-3"],
            watchpoints: [
              "A late staffing fix is expensive because it delays the restart and still leaves the desk strained.",
              "Command net should not pretend the staff-first plan remains dominant once the window moves.",
            ],
          },
        ],
      },
      {
        id: "pr-plan-bypass",
        label: "Staged Mesh Bypass",
        posture: "Partial restore push",
        summary:
          "Bypass node six temporarily, restore partial throughput, and continue repair work in parallel with a thinner safety cushion.",
        commandIntent:
          "Recover service quickly by routing around the bad node instead of waiting for a full repair.",
        tradeoff:
          "Tempo comes back fastest here, but the mesh becomes less resilient if another fault appears.",
        assumptions: [
          "The remaining chain can absorb a temporary bypass without compounding drift elsewhere.",
          "Command net is willing to trade resilience for partial throughput.",
          "Systems recovery can continue working node six safely while traffic routes around it.",
        ],
        actions: [
          {
            id: "pr-bypass-action-1",
            phaseId: "pr-1",
            label: "Cut node six out of the live path",
            window: "07:04",
            owner: "Systems",
            effect: "Creates the temporary path around the degraded hardware.",
          },
          {
            id: "pr-bypass-action-2",
            phaseId: "pr-2",
            label: "Rebalance traffic onto the bypassed chain",
            window: "07:36",
            owner: "Command net",
            effect: "Recovers throughput before node six is actually repaired.",
          },
          {
            id: "pr-bypass-action-3",
            phaseId: "pr-3",
            label: "Repair node six off-path",
            window: "08:44",
            owner: "Systems",
            effect: "Keeps repair work going while traffic flows around the fault.",
          },
        ],
        scorecard: {
          readiness: 69,
          tempo: 82,
          cover: 63,
          resilience: 64,
        },
        readinessSummary: {
          headline: "Partial service comes back quickly, but the chain is operating with less spare structure.",
          supportDemand: "High command-net coordination",
          riskWindow: "Traffic rebalance during bypass cutover",
          note: "The plan is attractive when throughput pressure is intense, but it narrows the next fallback path.",
        },
        reviewPrompts: {
          command: [
            "Choose bypass only when recovering traffic now matters more than restoring full mesh confidence.",
            "Keep repair ownership clear so node six work does not get buried under the traffic recovery.",
            "Pre-plan the rollback if another node starts to wobble after cutover.",
          ],
          risk: [
            "Bypass is fast because it spends resilience.",
            "A second fault during the rebalance window would hurt far more than it would under containment.",
            "The crew gap still matters because command net coordination spikes immediately.",
          ],
          support: [
            "Command net carries the heaviest support load during the cutover.",
            "Systems recovery splits attention between keeping the bypass stable and repairing node six.",
            "Power desk improves only modestly because the core hardware issue still exists.",
          ],
        },
        teamAdjustments: {
          "pr-r1": {
            readiness: "watch",
            confidenceDelta: 8,
            note: "Systems recovery regains momentum, but repair work now shares attention with live traffic.",
          },
          "pr-r2": {
            confidenceDelta: 5,
            note: "Power desk benefits somewhat because restart urgency falls after throughput recovers.",
          },
          "pr-r3": {
            readiness: "watch",
            confidenceDelta: 13,
            focus: "Cover the command-net rebalance while the bypass goes live.",
            note: "Crew rotations improve versus the outage posture, but the desk is still thin for a live cutover.",
          },
        },
        outcomes: [
          {
            id: "pr-bypass-baseline",
            label: "Partial chain recovers",
            stance: "baseline",
            summary:
              "Traffic reroutes around node six, partial service returns, and repair work continues without reopening the full outage.",
            trigger: "The remaining nodes absorb the rerouted load without showing fresh drift.",
            commandNote:
              "Treat the recovered throughput as temporary and protect the chain from taking on extra risk immediately.",
            score: {
              readiness: 69,
              tempo: 82,
              cover: 63,
              resilience: 64,
            },
            stressedPhaseIds: ["pr-2", "pr-3"],
            watchpoints: [
              "Cutover success should not tempt the team to defer node six repair indefinitely.",
              "Command net remains the pacing function until traffic stabilizes on the bypass.",
            ],
          },
          {
            id: "pr-bypass-upside",
            label: "Cutover stabilizes cleanly",
            stance: "upside",
            summary:
              "The bypass absorbs traffic cleanly, service recovers fast, and repair proceeds in parallel without stressing the rest of the mesh.",
            trigger: "Rebalanced load stays within tolerance on the first cutover pass.",
            commandNote:
              "Preserve the win by holding traffic steady until repair confidence catches up.",
            score: {
              readiness: 74,
              tempo: 86,
              cover: 68,
              resilience: 70,
            },
            stressedPhaseIds: ["pr-2"],
            watchpoints: [
              "The bypass is healthiest when the team resists piling on extra traffic immediately.",
              "Repair progress should still decide when node six returns, not the recovered tempo alone.",
            ],
          },
          {
            id: "pr-bypass-stress",
            label: "Second node starts to wobble",
            stance: "stress",
            summary:
              "The bypass brings traffic back, but the extra load starts to strain another node and the mesh loses its safety margin.",
            trigger: "Rerouted traffic drives a neighboring node toward the same tolerance edge.",
            commandNote:
              "If another node starts drifting, abandon the bypass advantage before a broader regression takes hold.",
            score: {
              readiness: 54,
              tempo: 61,
              cover: 47,
              resilience: 45,
            },
            stressedPhaseIds: ["pr-2", "pr-3"],
            watchpoints: [
              "A second wobbling node is the hard stop for this plan.",
              "Command net must be prepared to reverse the cutover quickly instead of defending the faster story.",
            ],
          },
        ],
      },
    ],
  },
];
