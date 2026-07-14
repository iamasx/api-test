export const forecastDeskOverview = {
  eyebrow: "Forecast Desk",
  title: "Read the next operating window through trend snapshots instead of a single blended forecast.",
  description:
    "This route stages short-horizon signals for inbound volume, dwell, exceptions, and reserve coverage. Snapshot cards show what is moving, short notes translate that movement into operating guidance, and the comparison band keeps the current shift anchored to the next two forecast windows.",
  primaryAction: "Review trend snapshots",
  secondaryAction: "Open forecast notes",
  stats: [
    {
      label: "Trend windows",
      value: "3",
      detail: "Signals tracked across the next handoff",
    },
    {
      label: "Forecast notes",
      value: "3",
      detail: "Short reads for desk and floor leads",
    },
    {
      label: "Comparison lenses",
      value: "3",
      detail: "Shared metrics across current, next 6h, and next day",
    },
  ],
} as const;

export const comparisonMetrics = [
  {
    label: "Inbound volume",
    current: "18.4k",
    nextWindow: "20.1k",
    nextDay: "17.6k",
    note: "The peak lands before midnight, then cools into the morning reset.",
  },
  {
    label: "Dock dwell",
    current: "42 min",
    nextWindow: "49 min",
    nextDay: "38 min",
    note: "Weather pressure widens the turn window tonight but clears by the next day.",
  },
  {
    label: "Crew reserve",
    current: "14 teams",
    nextWindow: "11 teams",
    nextDay: "16 teams",
    note: "Reserve capacity stays usable, but most of it is already committed to contingencies.",
  },
] as const;

export const trendSnapshots = [
  {
    id: "metro-east",
    title: "Metro east inbound lift",
    tone: "accelerating",
    metricValue: "20.1k parcels",
    change: "+9.4% vs. current",
    confidence: "High confidence",
    window: "18:00-23:00 local",
    summary:
      "Late pickups compress the first sort block above the usual evening baseline.",
    drivers: [
      "Retail release cutoffs moved 30 minutes later.",
      "Linehaul timing recovered after the noon disruption.",
    ],
    action: "Pre-stage overflow sort support before 19:30.",
  },
  {
    id: "coastal-dwell",
    title: "Coastal dwell pressure",
    tone: "watch",
    metricValue: "49 minutes",
    change: "+7 minutes",
    confidence: "Moderate confidence",
    window: "20:00-01:00 local",
    summary:
      "A narrow rain band slows trailer turns on the coastal lanes and raises congestion risk.",
    drivers: [
      "Southbound relay swaps stack inside one 90-minute window.",
      "Only one spare dock team is free before midnight rotation.",
    ],
    action: "Protect one flex dock team for the coastal handoff.",
  },
  {
    id: "returns-slack",
    title: "Returns slack stays available",
    tone: "steady",
    metricValue: "11.8%",
    change: "-1.6 pts",
    confidence: "High confidence",
    window: "Current through 06:00",
    summary:
      "The lighter returns mix leaves usable capacity that can absorb routine variance.",
    drivers: [
      "Weekend reversals cleared earlier than expected.",
      "Secondary inspection backlog is already under threshold.",
    ],
    action: "Use returns capacity before drawing down reserve teams.",
  },
] as const;

export const forecastNotes = [
  {
    id: "east-overflow",
    title: "Pre-stage east overflow support",
    state: "ready",
    owner: "Desk lead",
    window: "By 19:30",
    summary:
      "Move one overflow crew toward the east sort block before the compression wave arrives.",
    trigger: "Keep this move if inbound volume stays above 19.6k at 18:45.",
  },
  {
    id: "coastal-flex",
    title: "Hold a flex dock team for coastal turns",
    state: "watch",
    owner: "Floor coordinator",
    window: "20:00-23:30",
    summary:
      "Avoid spending the last spare dock team until the weather-linked dwell trend confirms.",
    trigger: "Release the team only if dwell remains under 45 minutes after 20:30.",
  },
  {
    id: "reserve-handoff",
    title: "Protect reserve coverage into handoff",
    state: "follow-up",
    owner: "Shift manager",
    window: "Review at 23:15",
    summary:
      "Tonight's reserve coverage is adequate, but the margin disappears if dwell and exceptions rise together.",
    trigger: "Escalate staffing review if exception share crosses 3.2% before handoff.",
  },
] as const;
