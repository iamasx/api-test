export type CrewCoverageTone = "stable" | "watch" | "thin";
export type DutyRotationPriority = "Primary" | "Support" | "Reserve";

export interface CrewRosterSummary {
  eyebrow: string;
  title: string;
  description: string;
  handoffWindow: string;
}

export interface CrewRoleSlot {
  id: string;
  title: string;
  staffed: number;
  target: number;
  note: string;
}

export interface CrewTeam {
  id: string;
  name: string;
  callsign: string;
  lead: string;
  zone: string;
  objective: string;
  staffingNote: string;
  tags: string[];
  roleSlots: CrewRoleSlot[];
}

export interface ShiftGroup {
  id: string;
  name: string;
  window: string;
  coverage: string;
  handoffLead: string;
  summary: string;
  teams: CrewTeam[];
}

export interface StaffingTotals {
  staffed: number;
  target: number;
  gap: number;
  coveragePercent: number;
}

export interface StaffingSummary {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: CrewCoverageTone;
}

export interface DutyRotationEntry {
  id: string;
  window: string;
  assignment: string;
  crew: string;
  role: string;
  location: string;
  detail: string;
  priority: DutyRotationPriority;
}

export interface CrewRosterView {
  summary: CrewRosterSummary;
  shiftGroups: Array<
    ShiftGroup & {
      totals: StaffingTotals;
    }
  >;
  staffingSummaries: StaffingSummary[];
  dutyRotation: DutyRotationEntry[];
  totals: StaffingTotals & {
    teamCount: number;
    shiftCount: number;
  };
}

export const crewRosterSummary: CrewRosterSummary = {
  eyebrow: "Crew Roster",
  title: "Keep every shift staffed, visible, and ready for the next handoff.",
  description:
    "Track who is on shift, where coverage is thin, and which duty rotation takes the next command window without relying on any backend feed.",
  handoffWindow: "Next command handoff · 22:00 local",
};

export const shiftGroups: ShiftGroup[] = [
  {
    id: "day-shift",
    name: "Day Shift",
    window: "06:00-14:00",
    coverage: "Launch deck, calibration lane, and outbound staging",
    handoffLead: "Captain Mara Chen",
    summary:
      "Front-loads launch prep and outbound readiness so field crews start with a clean handoff packet.",
    teams: [
      {
        id: "launch-deck",
        name: "Launch Deck",
        callsign: "Atlas One",
        lead: "Mara Chen",
        zone: "North launch apron",
        objective:
          "Run the first departure block, own deck safety, and keep runway prep synchronized with the signal desk.",
        staffingNote:
          "Short one dock liaison until the swing crew overlaps at 13:30.",
        tags: ["Departure prep", "Safety window", "Outbound sync"],
        roleSlots: [
          {
            id: "launch-lead",
            title: "Shift lead",
            staffed: 1,
            target: 1,
            note: "Owns the departure brief and clears the final push.",
          },
          {
            id: "mission-specialist",
            title: "Mission specialist",
            staffed: 3,
            target: 3,
            note: "Coordinates sortie timing and launch-lane sequencing.",
          },
          {
            id: "safety-runner",
            title: "Safety runner",
            staffed: 1,
            target: 1,
            note: "Covers pad checks and last-minute clearance calls.",
          },
          {
            id: "dock-liaison",
            title: "Dock liaison",
            staffed: 1,
            target: 2,
            note: "One opening remains on the outbound transfer handoff.",
          },
        ],
      },
      {
        id: "payload-prep",
        name: "Payload Prep",
        callsign: "Helix Two",
        lead: "Priya Natarajan",
        zone: "Calibration hangar",
        objective:
          "Clear the morning manifest, verify calibrations, and package exceptions before the noon cutoff.",
        staffingNote:
          "Fully staffed with one cross-trained verifier floating between calibration and quality checks.",
        tags: ["Calibration", "Manifest review", "QA handoff"],
        roleSlots: [
          {
            id: "calibration-tech",
            title: "Calibration tech",
            staffed: 2,
            target: 2,
            note: "Covers morning device prep and recovery sweeps.",
          },
          {
            id: "systems-verifier",
            title: "Systems verifier",
            staffed: 2,
            target: 2,
            note: "Signs off on payload integrity before release.",
          },
          {
            id: "prep-runner",
            title: "Prep runner",
            staffed: 1,
            target: 1,
            note: "Moves flagged kits between intake, QA, and outbound.",
          },
        ],
      },
    ],
  },
  {
    id: "swing-shift",
    name: "Swing Shift",
    window: "14:00-22:00",
    coverage: "Recovery control, relay watch, and evening escalation lanes",
    handoffLead: "Commander Ezra Kwambai",
    summary:
      "Bridges launch follow-through with recovery work, keeping signals clean while escalations move through the evening desk.",
    teams: [
      {
        id: "recovery-control",
        name: "Recovery Control",
        callsign: "Beacon Six",
        lead: "Ezra Kwambai",
        zone: "South recovery bay",
        objective:
          "Coordinate returns, stage recovery crews, and make sure repaired assets are routed to the right hold lane.",
        staffingNote:
          "Stable coverage with full lead and marshal staffing for the evening recovery window.",
        tags: ["Recovery", "Routing", "Bay control"],
        roleSlots: [
          {
            id: "recovery-lead",
            title: "Recovery lead",
            staffed: 1,
            target: 1,
            note: "Sets sequencing for inbound and post-flight checks.",
          },
          {
            id: "bay-marshal",
            title: "Bay marshal",
            staffed: 2,
            target: 2,
            note: "Owns traffic control inside the recovery lane.",
          },
          {
            id: "handoff-runner",
            title: "Handoff runner",
            staffed: 1,
            target: 1,
            note: "Moves repair tags and return packets to logistics.",
          },
        ],
      },
      {
        id: "signal-watch",
        name: "Signal Watch",
        callsign: "Relay Nine",
        lead: "Noor Al-Hassan",
        zone: "Comms mezzanine",
        objective:
          "Monitor relay health, protect the evening command window, and escalate any drift before the night shift takes over.",
        staffingNote:
          "Needs one more observer to cover simultaneous relay drift and incident paging during the overlap hour.",
        tags: ["Relay health", "Escalations", "Overlap coverage"],
        roleSlots: [
          {
            id: "watch-lead",
            title: "Watch lead",
            staffed: 1,
            target: 1,
            note: "Calls severity and owns the evening status brief.",
          },
          {
            id: "signal-observer",
            title: "Signal observer",
            staffed: 2,
            target: 3,
            note: "One seat is open for the overlap between 18:00 and 20:00.",
          },
          {
            id: "incident-pager",
            title: "Incident pager",
            staffed: 1,
            target: 1,
            note: "Handles outbound paging and records rotation notes.",
          },
        ],
      },
    ],
  },
  {
    id: "overnight-shift",
    name: "Overnight Shift",
    window: "22:00-06:00",
    coverage: "Incident watch, reserve logistics, and overnight support",
    handoffLead: "Lead Omar Rahman",
    summary:
      "Protects overnight stability, keeps reserve supply lanes warm, and hands day shift a clean picture of any incidents that stayed open.",
    teams: [
      {
        id: "incident-watch",
        name: "Incident Watch",
        callsign: "Nightglass",
        lead: "Omar Rahman",
        zone: "Command mezzanine",
        objective:
          "Track overnight incidents, keep the escalation chain warm, and turn loose signals into a precise morning handoff.",
        staffingNote:
          "Fully staffed with a dedicated recorder for any multi-hour incident or change watch.",
        tags: ["Night command", "Escalation", "Morning handoff"],
        roleSlots: [
          {
            id: "incident-lead",
            title: "Incident lead",
            staffed: 1,
            target: 1,
            note: "Runs command posture through the overnight watch.",
          },
          {
            id: "watch-analyst",
            title: "Watch analyst",
            staffed: 2,
            target: 2,
            note: "Keeps signal review and impact notes current.",
          },
          {
            id: "rotation-recorder",
            title: "Rotation recorder",
            staffed: 1,
            target: 1,
            note: "Captures timeline notes for the day-shift briefing.",
          },
        ],
      },
      {
        id: "logistics-reserve",
        name: "Logistics Reserve",
        callsign: "Harbor Three",
        lead: "Tessa Morgan",
        zone: "Reserve staging floor",
        objective:
          "Stage replacement kits, cover late-arrival swap requests, and keep reserve inventory ready for the dawn handoff.",
        staffingNote:
          "One reserve operator gap remains after a same-day reassignment to the day shift.",
        tags: ["Reserve inventory", "Swap requests", "Dawn prep"],
        roleSlots: [
          {
            id: "reserve-coordinator",
            title: "Reserve coordinator",
            staffed: 1,
            target: 1,
            note: "Owns reserve queue priority and release timing.",
          },
          {
            id: "reserve-operator",
            title: "Reserve operator",
            staffed: 2,
            target: 3,
            note: "Overnight reserve handling is short one operator.",
          },
          {
            id: "staging-runner",
            title: "Staging runner",
            staffed: 1,
            target: 1,
            note: "Moves urgent kits from reserve staging to the dock.",
          },
        ],
      },
    ],
  },
];

export const dutyRotation: DutyRotationEntry[] = [
  {
    id: "rotation-2200",
    window: "22:00-00:00",
    assignment: "Command desk",
    crew: "Omar Rahman",
    role: "Overnight incident lead",
    location: "Command mezzanine",
    detail:
      "Takes primary command during the overnight transition and owns any carryover escalations from swing shift.",
    priority: "Primary",
  },
  {
    id: "rotation-0000",
    window: "00:00-02:00",
    assignment: "Reserve lane",
    crew: "Tessa Morgan",
    role: "Reserve coordinator",
    location: "Reserve staging floor",
    detail:
      "Covers late swap requests and approves any overnight reserve releases tied to active incidents.",
    priority: "Support",
  },
  {
    id: "rotation-0200",
    window: "02:00-04:00",
    assignment: "Signal escalation desk",
    crew: "Noor Al-Hassan",
    role: "Relay escalation support",
    location: "Comms mezzanine",
    detail:
      "Holds remote escalation coverage for relay or paging drift that needs specialist review before dawn.",
    priority: "Reserve",
  },
  {
    id: "rotation-0400",
    window: "04:00-06:00",
    assignment: "Dawn handoff prep",
    crew: "Priya Natarajan",
    role: "Day-shift readiness lead",
    location: "Calibration hangar",
    detail:
      "Stages the day-shift brief so outbound crews inherit open issues, reserve posture, and staffing gaps in one pass.",
    priority: "Primary",
  },
];

function getCoverageTone(gap: number): CrewCoverageTone {
  if (gap <= 0) {
    return "stable";
  }

  if (gap === 1) {
    return "watch";
  }

  return "thin";
}

export function getTeamStaffingTotals(team: CrewTeam): StaffingTotals {
  const staffed = team.roleSlots.reduce((total, slot) => total + slot.staffed, 0);
  const target = team.roleSlots.reduce((total, slot) => total + slot.target, 0);
  const gap = Math.max(target - staffed, 0);

  return {
    staffed,
    target,
    gap,
    coveragePercent: Math.round((staffed / target) * 100),
  };
}

export function getShiftStaffingTotals(shiftGroup: ShiftGroup): StaffingTotals {
  const teamTotals = shiftGroup.teams.map(getTeamStaffingTotals);
  const staffed = teamTotals.reduce((total, team) => total + team.staffed, 0);
  const target = teamTotals.reduce((total, team) => total + team.target, 0);
  const gap = Math.max(target - staffed, 0);

  return {
    staffed,
    target,
    gap,
    coveragePercent: Math.round((staffed / target) * 100),
  };
}

export function getCrewRosterView(): CrewRosterView {
  const shiftGroupsWithTotals = shiftGroups.map((shiftGroup) => ({
    ...shiftGroup,
    totals: getShiftStaffingTotals(shiftGroup),
  }));

  const staffed = shiftGroupsWithTotals.reduce(
    (total, shiftGroup) => total + shiftGroup.totals.staffed,
    0,
  );
  const target = shiftGroupsWithTotals.reduce(
    (total, shiftGroup) => total + shiftGroup.totals.target,
    0,
  );
  const gap = Math.max(target - staffed, 0);

  return {
    summary: crewRosterSummary,
    shiftGroups: shiftGroupsWithTotals,
    staffingSummaries: [
      {
        id: "staffed-seats",
        label: "Staffed seats",
        value: `${staffed} / ${target}`,
        detail: `Coverage holds at ${Math.round((staffed / target) * 100)}% across ${shiftGroupsWithTotals.length} shifts.`,
        tone: getCoverageTone(gap),
      },
      {
        id: "open-roles",
        label: "Open roles",
        value: `${gap}`,
        detail: "Current gaps sit in dock liaison, signal observer, and reserve operator coverage.",
        tone: getCoverageTone(gap),
      },
      {
        id: "teams-on-roster",
        label: "Teams on roster",
        value: `${shiftGroupsWithTotals.reduce((total, shiftGroup) => total + shiftGroup.teams.length, 0)}`,
        detail: "Each shift group carries two active crews with route-specific role coverage.",
        tone: "stable",
      },
      {
        id: "next-rotation",
        label: "Next rotation",
        value: dutyRotation[0]?.window ?? "TBD",
        detail: `${dutyRotation[0]?.crew} takes ${dutyRotation[0]?.assignment.toLowerCase() ?? "duty coverage"} first.`,
        tone: "watch",
      },
    ],
    dutyRotation,
    totals: {
      staffed,
      target,
      gap,
      coveragePercent: Math.round((staffed / target) * 100),
      teamCount: shiftGroupsWithTotals.reduce(
        (total, shiftGroup) => total + shiftGroup.teams.length,
        0,
      ),
      shiftCount: shiftGroupsWithTotals.length,
    },
  };
}
