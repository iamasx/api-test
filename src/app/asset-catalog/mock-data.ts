export type AssetAvailability = "available" | "reserved" | "hold" | "maintenance";
export type AssetCategoryId = "camera" | "audio" | "lighting" | "support";
export type ReservationIntentId = "interview" | "field" | "livestream" | "walkthrough";
export type PlanningWindowId =
  | "today-pm"
  | "tomorrow-am"
  | "tomorrow-pm"
  | "friday-dawn";
export type ForecastStatus = "clear" | "tight" | "conflict";
export type CrewProfileId = "solo" | "pair" | "crew";

export type AssetCategory = {
  id: AssetCategoryId;
  label: string;
  summary: string;
};

export type AvailabilityOption = {
  id: AssetAvailability;
  label: string;
  note: string;
};

export type ReservationIntent = {
  id: ReservationIntentId;
  label: string;
  summary: string;
  requiredCategories: AssetCategoryId[];
  preferredTags: string[];
  checklist: string[];
};

export type PlanningWindow = {
  id: PlanningWindowId;
  label: string;
  pickupLabel: string;
  returnLabel: string;
  pressureLabel: string;
  note: string;
};

export type CrewProfile = {
  id: CrewProfileId;
  label: string;
  summary: string;
};

export type AssetCatalogItem = {
  id: string;
  name: string;
  categoryId: AssetCategoryId;
  availability: AssetAvailability;
  sku: string;
  zone: string;
  summary: string;
  nextWindow: string;
  tags: string[];
  kit: string[];
  condition: string;
  recommendedFor: ReservationIntentId[];
  prepLead: string;
  crewFit: string;
};

export type ReservationPreview = {
  id: string;
  assetId: string;
  requester: string;
  project: string;
  pickupWindow: string;
  returnWindow: string;
  handoffZone: string;
  checklist: string[];
  note: string;
  linkedWindowId: PlanningWindowId;
  conflicts: string[];
};

export type AssetForecast = {
  assetId: string;
  windowId: PlanningWindowId;
  status: ForecastStatus;
  coverageLabel: string;
  note: string;
  alternativeAssetIds: string[];
};

export type BundleBlueprint = {
  id: string;
  intentId: ReservationIntentId;
  label: string;
  summary: string;
  heroAssetId: string;
  assetIds: string[];
  optionalAssetIds: string[];
  note: string;
};

export const assetCatalogSyncLabel = "Planner refresh 09:12 IST";

export const assetCategories: AssetCategory[] = [
  {
    id: "camera",
    label: "Camera",
    summary: "Bodies, handheld kits, and lens-ready capture gear.",
  },
  {
    id: "audio",
    label: "Audio",
    summary: "Wireless capture, field recorders, and lav sets.",
  },
  {
    id: "lighting",
    label: "Lighting",
    summary: "Portable panels, key lights, and modifier kits.",
  },
  {
    id: "support",
    label: "Support",
    summary: "Tripods, stabilizers, and grip accessories.",
  },
];

export const availabilityOptions: AvailabilityOption[] = [
  {
    id: "available",
    label: "Ready now",
    note: "Bench checked and clear for pickup.",
  },
  {
    id: "reserved",
    label: "Reserved",
    note: "Already staged for an upcoming handoff.",
  },
  {
    id: "hold",
    label: "On hold",
    note: "Temporarily blocked pending confirmation.",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    note: "In service or calibration review.",
  },
];

export const reservationIntents: ReservationIntent[] = [
  {
    id: "interview",
    label: "Interview",
    summary: "Sit-down coverage with clean dialog, flattering light, and a stable hero angle.",
    requiredCategories: ["camera", "audio", "lighting", "support"],
    preferredTags: ["interview", "studio", "fast-turn"],
    checklist: [
      "Confirm who signs for the hero camera handoff.",
      "Stage primary and backup audio before pickup.",
      "Reserve one soft key light and one stable support option.",
    ],
  },
  {
    id: "field",
    label: "Field Run",
    summary: "Fast-moving location work where mobility and battery discipline matter most.",
    requiredCategories: ["camera", "audio", "support"],
    preferredTags: ["travel", "wireless-monitor", "4k"],
    checklist: [
      "Check mobile power, media, and rain cover notes.",
      "Confirm the stabilization plan for walking shots.",
      "Pack the most portable audio option that still clears talent count.",
    ],
  },
  {
    id: "livestream",
    label: "Livestream",
    summary: "Multi-signal capture that prioritizes reliable audio, clean power, and quick troubleshooting.",
    requiredCategories: ["camera", "audio", "lighting"],
    preferredTags: ["livestream", "studio", "battery-heavy"],
    checklist: [
      "Confirm stream ingest format and monitor routing.",
      "Reserve a redundant audio path for the host feed.",
      "Add at least one controllable key light for exposure swings.",
    ],
  },
  {
    id: "walkthrough",
    label: "Walkthrough",
    summary: "Mobile movement with stabilized framing, light dialogue, and a compact crew footprint.",
    requiredCategories: ["camera", "audio", "support"],
    preferredTags: ["travel", "interview", "wireless-monitor"],
    checklist: [
      "Balance the gimbal before battery swaps.",
      "Confirm wireless audio range for moving talent.",
      "Plan one fallback support option if the path gets crowded.",
    ],
  },
];

export const planningWindows: PlanningWindow[] = [
  {
    id: "today-pm",
    label: "Today PM",
    pickupLabel: "Today, 15:00-17:30",
    returnLabel: "Tomorrow, 11:00",
    pressureLabel: "Same-day rush",
    note: "Expect tighter handoff staffing and limited repack time.",
  },
  {
    id: "tomorrow-am",
    label: "Tomorrow AM",
    pickupLabel: "Tomorrow, 08:30-10:30",
    returnLabel: "Tomorrow, 19:00",
    pressureLabel: "Prime slot",
    note: "This is the busiest pickup window for interview and launch shoots.",
  },
  {
    id: "tomorrow-pm",
    label: "Tomorrow PM",
    pickupLabel: "Tomorrow, 13:00-16:30",
    returnLabel: "Friday, 10:00",
    pressureLabel: "Mixed load-out",
    note: "Most returns are in flight, so substitutes get easier after 14:00.",
  },
  {
    id: "friday-dawn",
    label: "Friday Dawn",
    pickupLabel: "Friday, 06:30-08:00",
    returnLabel: "Monday, 09:00",
    pressureLabel: "Crew advance",
    note: "Good window for field crews that can stage the night before.",
  },
];

export const crewProfiles: CrewProfile[] = [
  {
    id: "solo",
    label: "Solo op",
    summary: "Keep the kit minimal and easy to reset between shots.",
  },
  {
    id: "pair",
    label: "2-person crew",
    summary: "Balanced coverage with room for one backup accessory.",
  },
  {
    id: "crew",
    label: "Small crew",
    summary: "Add support gear and leave time for handoff coordination.",
  },
];

export const assetTags = [
  "4k",
  "wireless-monitor",
  "livestream",
  "battery-heavy",
  "travel",
  "studio",
  "interview",
  "fast-turn",
  "cinema",
  "motion",
];

export const assetCatalogItems: AssetCatalogItem[] = [
  {
    id: "cam-fx3",
    name: "Sony FX3 Field Kit",
    categoryId: "camera",
    availability: "available",
    sku: "CAM-014",
    zone: "Studio cage A",
    summary: "Full-frame body paired with a handheld rig for same-day field pickup.",
    nextWindow: "Ready for same-day pickup",
    tags: ["4k", "wireless-monitor", "travel"],
    kit: ["FX3 body", "24-70mm lens", "2x CFexpress cards"],
    condition: "Bench checked 25 minutes ago",
    recommendedFor: ["field", "walkthrough", "livestream"],
    prepLead: "20 minutes",
    crewFit: "Solo or paired operator",
  },
  {
    id: "cam-c70",
    name: "Canon C70 Interview Pack",
    categoryId: "camera",
    availability: "reserved",
    sku: "CAM-029",
    zone: "Reservation shelf 2",
    summary: "Interview-ready cinema body with ND filters and a compact audio breakout.",
    nextWindow: "Pickup window opens at 11:30",
    tags: ["interview", "studio", "fast-turn", "cinema"],
    kit: ["C70 body", "RF 24-105mm lens", "Top-handle XLR module"],
    condition: "Staged with printed checkout sheet",
    recommendedFor: ["interview", "livestream"],
    prepLead: "30 minutes",
    crewFit: "2-person crew or producer assist",
  },
  {
    id: "cam-a7s3",
    name: "Sony A7S III Creator Set",
    categoryId: "camera",
    availability: "available",
    sku: "CAM-041",
    zone: "Mirrorless locker 3",
    summary: "Compact low-light body packaged for creators who need fast lens swaps and light travel.",
    nextWindow: "Open after quick lens wipe",
    tags: ["travel", "livestream", "interview"],
    kit: ["A7S III body", "24mm prime", "HDMI cage"],
    condition: "HDMI port retested during morning prep",
    recommendedFor: ["field", "livestream", "walkthrough"],
    prepLead: "15 minutes",
    crewFit: "Solo operator",
  },
  {
    id: "aud-mixpre",
    name: "MixPre-6 Podcast Rig",
    categoryId: "audio",
    availability: "hold",
    sku: "AUD-011",
    zone: "Pending bin 4",
    summary: "Six-input field recorder bundled for short-form interviews and live capture.",
    nextWindow: "Awaiting producer confirmation",
    tags: ["interview", "livestream", "fast-turn"],
    kit: ["MixPre-6 II", "2x shotgun mics", "Headphone split"],
    condition: "Battery pack topped off overnight",
    recommendedFor: ["interview", "livestream"],
    prepLead: "25 minutes",
    crewFit: "Pair or small crew",
  },
  {
    id: "aud-lav",
    name: "Dual Lav Wireless Set",
    categoryId: "audio",
    availability: "available",
    sku: "AUD-024",
    zone: "Audio locker 1",
    summary: "Portable two-talent wireless set with spare transmitters and slate notes.",
    nextWindow: "Ready for walk-up checkout",
    tags: ["travel", "interview", "battery-heavy"],
    kit: ["2x transmitters", "2x lav mics", "Receiver dock"],
    condition: "RF scan passed on channel bank B",
    recommendedFor: ["interview", "field", "walkthrough"],
    prepLead: "10 minutes",
    crewFit: "Solo through small crew",
  },
  {
    id: "aud-boom",
    name: "Boom + Shotgun Dialogue Kit",
    categoryId: "audio",
    availability: "available",
    sku: "AUD-032",
    zone: "Boom rack",
    summary: "Dialogue-first kit with shock mount, wind protection, and a fast-deploy boom pole.",
    nextWindow: "Open for assisted checkout",
    tags: ["interview", "studio", "cinema"],
    kit: ["Shotgun mic", "Carbon boom pole", "Indoor and outdoor wind kit"],
    condition: "Shock mount collar replaced on Monday",
    recommendedFor: ["interview", "field"],
    prepLead: "15 minutes",
    crewFit: "Pair or dedicated audio assist",
  },
  {
    id: "lit-aputure",
    name: "Aputure 300D Key Light",
    categoryId: "lighting",
    availability: "reserved",
    sku: "LGT-008",
    zone: "Lighting cart 3",
    summary: "High-output key light prepped with a softbox and ballast tie-downs.",
    nextWindow: "Truck load-out at 13:15",
    tags: ["studio", "fast-turn", "battery-heavy"],
    kit: ["300D head", "Light Dome II", "C-stand adapter"],
    condition: "Packed with sandbag tags",
    recommendedFor: ["interview", "livestream"],
    prepLead: "35 minutes",
    crewFit: "Pair or small crew",
  },
  {
    id: "lit-tubes",
    name: "RGB Tube Pair",
    categoryId: "lighting",
    availability: "maintenance",
    sku: "LGT-026",
    zone: "Repair bench",
    summary: "Portable accent lights currently blocked for battery latch service.",
    nextWindow: "Expected back after calibration",
    tags: ["livestream", "travel", "studio"],
    kit: ["2x RGB tubes", "Floor mounts", "Charging brick"],
    condition: "Latch replacement in progress",
    recommendedFor: ["livestream", "field"],
    prepLead: "Unavailable",
    crewFit: "Any crew once repaired",
  },
  {
    id: "lit-nanlite",
    name: "Nanlite Forza Travel Light",
    categoryId: "lighting",
    availability: "available",
    sku: "LGT-033",
    zone: "Portable light shelf",
    summary: "Compact daylight light with foldable softbox for remote interviews and pop-up sets.",
    nextWindow: "Ready after accessory check",
    tags: ["travel", "interview", "fast-turn"],
    kit: ["Forza head", "Collapsible softbox", "Battery plate"],
    condition: "Softbox rods tagged and matched",
    recommendedFor: ["interview", "field", "walkthrough"],
    prepLead: "15 minutes",
    crewFit: "Solo or pair",
  },
  {
    id: "sup-sachtler",
    name: "Sachtler Tripod System",
    categoryId: "support",
    availability: "available",
    sku: "SUP-006",
    zone: "Grip wall",
    summary: "Fluid-head tripod tuned for documentary crews and quick interview swaps.",
    nextWindow: "Available for immediate reserve",
    tags: ["travel", "studio", "4k"],
    kit: ["Flowtech legs", "Fluid head", "Mid spreader"],
    condition: "Counterbalance verified this morning",
    recommendedFor: ["interview", "field", "livestream"],
    prepLead: "10 minutes",
    crewFit: "Any crew size",
  },
  {
    id: "sup-rs4",
    name: "RS 4 Gimbal Bundle",
    categoryId: "support",
    availability: "hold",
    sku: "SUP-017",
    zone: "Ready rack B",
    summary: "Stabilizer bundle held while lens compatibility is confirmed with the camera team.",
    nextWindow: "Hold expires at 10:45",
    tags: ["travel", "wireless-monitor", "4k", "motion"],
    kit: ["RS 4 combo", "Focus motor", "Briefcase handle"],
    condition: "Balance plate marked for FX3 payload",
    recommendedFor: ["field", "walkthrough"],
    prepLead: "20 minutes",
    crewFit: "Solo or pair",
  },
  {
    id: "sup-slider",
    name: "Slider + Monopod Motion Pack",
    categoryId: "support",
    availability: "available",
    sku: "SUP-022",
    zone: "Motion drawer",
    summary: "Portable motion support for b-roll pickups and compact set coverage.",
    nextWindow: "Ready after quick plate check",
    tags: ["motion", "studio", "livestream"],
    kit: ["Carbon slider", "Monopod", "Flat-mount plate"],
    condition: "Plate screws retorqued before staging",
    recommendedFor: ["livestream", "field"],
    prepLead: "15 minutes",
    crewFit: "Pair preferred",
  },
];

export const reservationPreviews: ReservationPreview[] = [
  {
    id: "res-c70",
    assetId: "cam-c70",
    requester: "Mina Torres",
    project: "Customer Story Sprint",
    pickupWindow: "Tomorrow, 09:00-09:30",
    returnWindow: "Tomorrow by 17:30",
    handoffZone: "Front desk handoff",
    checklist: [
      "Lens cap and ND pack",
      "Fresh media cards",
      "Signed interview kit receipt",
    ],
    note: "Keep the top handle attached for the lav receiver bracket.",
    linkedWindowId: "tomorrow-am",
    conflicts: [
      "The hero camera overlaps the most requested interview slot.",
      "A swap to the FX3 keeps the pickup window alive if the customer story runs late.",
    ],
  },
  {
    id: "res-mixpre",
    assetId: "aud-mixpre",
    requester: "Jon Park",
    project: "Founder Fireside",
    pickupWindow: "Needs approval before 12:15",
    returnWindow: "Same day by 19:00",
    handoffZone: "Audio locker release",
    checklist: [
      "Confirm guest count",
      "Attach backup SD card",
      "Add spare NP-F battery",
    ],
    note: "Reservation is blocked until the guest lineup is final.",
    linkedWindowId: "today-pm",
    conflicts: [
      "Approval has not landed yet, so the recorder cannot auto-stage.",
    ],
  },
  {
    id: "res-300d",
    assetId: "lit-aputure",
    requester: "Rhea Malik",
    project: "Warehouse Hero Shoot",
    pickupWindow: "Tomorrow, 13:15 dock load-out",
    returnWindow: "Two days after wrap",
    handoffZone: "Lighting cart dispatch",
    checklist: [
      "Softbox rods taped",
      "Ballast tie-down added",
      "Truck manifest signed",
    ],
    note: "Pair with the C-stand already assigned to lane 4.",
    linkedWindowId: "tomorrow-pm",
    conflicts: [
      "The ballast is already committed to a truck load-out in the same window.",
    ],
  },
  {
    id: "res-rs4",
    assetId: "sup-rs4",
    requester: "Dev Gupta",
    project: "Campus Walkthrough",
    pickupWindow: "Hold until 10:45",
    returnWindow: "Tomorrow by 10:00",
    handoffZone: "Grip wall release",
    checklist: [
      "Confirm lens weight",
      "Rebalance after battery swap",
      "Include focus motor cable",
    ],
    note: "If the lens swap is denied, release the hold back to ready inventory.",
    linkedWindowId: "today-pm",
    conflicts: [
      "Compatibility sign-off is still pending from the camera team.",
    ],
  },
  {
    id: "res-a7s3",
    assetId: "cam-a7s3",
    requester: "Ari Chen",
    project: "Pop-up Livestream Desk",
    pickupWindow: "Friday, 06:45 pickup",
    returnWindow: "Friday by 22:00",
    handoffZone: "Streaming prep bench",
    checklist: [
      "Pack full-size HDMI backup",
      "Label ingest LUT slot",
      "Add cage cold shoe for monitor",
    ],
    note: "This booking can slide earlier if Thursday returns land on time.",
    linkedWindowId: "friday-dawn",
    conflicts: [],
  },
];

export const assetForecasts: AssetForecast[] = [
  { assetId: "cam-fx3", windowId: "today-pm", status: "clear", coverageLabel: "Open bench", note: "Battery set is already conditioned for a same-day release.", alternativeAssetIds: ["cam-a7s3"] },
  { assetId: "cam-fx3", windowId: "tomorrow-am", status: "tight", coverageLabel: "High demand", note: "Three field teams are targeting this body for the morning window.", alternativeAssetIds: ["cam-a7s3", "cam-c70"] },
  { assetId: "cam-fx3", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Flexible", note: "The afternoon load loosens once the dock pickup clears.", alternativeAssetIds: ["cam-a7s3"] },
  { assetId: "cam-fx3", windowId: "friday-dawn", status: "clear", coverageLabel: "Crew advance", note: "Best slot if the gimbal team can stage the night before.", alternativeAssetIds: ["cam-a7s3"] },
  { assetId: "cam-c70", windowId: "today-pm", status: "tight", coverageLabel: "Booked prep", note: "The interview package is staged for another producer later today.", alternativeAssetIds: ["cam-fx3", "cam-a7s3"] },
  { assetId: "cam-c70", windowId: "tomorrow-am", status: "conflict", coverageLabel: "Collision risk", note: "Existing reservation overlaps the prime interview slot.", alternativeAssetIds: ["cam-fx3", "cam-a7s3"] },
  { assetId: "cam-c70", windowId: "tomorrow-pm", status: "tight", coverageLabel: "Possible release", note: "The hero package may reopen if the customer story wraps before lunch.", alternativeAssetIds: ["cam-fx3"] },
  { assetId: "cam-c70", windowId: "friday-dawn", status: "clear", coverageLabel: "Open after reset", note: "Friday dawn is the cleanest window for the cinema body this week.", alternativeAssetIds: ["cam-a7s3"] },
  { assetId: "cam-a7s3", windowId: "today-pm", status: "clear", coverageLabel: "Standby ready", note: "The mirrorless kit is caged and waiting for assignment.", alternativeAssetIds: ["cam-fx3"] },
  { assetId: "cam-a7s3", windowId: "tomorrow-am", status: "clear", coverageLabel: "Good fallback", note: "Use this body when the C70 or FX3 windows get crowded.", alternativeAssetIds: ["cam-fx3"] },
  { assetId: "cam-a7s3", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Open block", note: "Little pressure in the afternoon because the stream desk uses a different lens set.", alternativeAssetIds: ["cam-fx3"] },
  { assetId: "cam-a7s3", windowId: "friday-dawn", status: "tight", coverageLabel: "Pre-staged stream", note: "Friday dawn is tentatively marked for a pop-up livestream desk.", alternativeAssetIds: ["cam-fx3"] },
  { assetId: "aud-mixpre", windowId: "today-pm", status: "conflict", coverageLabel: "Approval hold", note: "The current hold blocks automated release until the guest list is final.", alternativeAssetIds: ["aud-lav", "aud-boom"] },
  { assetId: "aud-mixpre", windowId: "tomorrow-am", status: "tight", coverageLabel: "Recorder demand", note: "Podcast and fireside requests both want the same recorder window.", alternativeAssetIds: ["aud-lav"] },
  { assetId: "aud-mixpre", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Late release", note: "Afternoon staging works if the earlier hold expires on time.", alternativeAssetIds: ["aud-lav", "aud-boom"] },
  { assetId: "aud-mixpre", windowId: "friday-dawn", status: "clear", coverageLabel: "Open audio bench", note: "Most Friday crews only need wireless packs before sunrise.", alternativeAssetIds: ["aud-lav"] },
  { assetId: "aud-lav", windowId: "today-pm", status: "clear", coverageLabel: "Fast release", note: "Wireless set is already charged and frequency scanned.", alternativeAssetIds: ["aud-boom"] },
  { assetId: "aud-lav", windowId: "tomorrow-am", status: "tight", coverageLabel: "High attach rate", note: "Nearly every interview plan wants this lav set for the morning slot.", alternativeAssetIds: ["aud-boom", "aud-mixpre"] },
  { assetId: "aud-lav", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Balanced", note: "The afternoon release queue usually has spare wireless coverage.", alternativeAssetIds: ["aud-boom"] },
  { assetId: "aud-lav", windowId: "friday-dawn", status: "clear", coverageLabel: "Good travel fit", note: "Friday dawn crews prefer this smaller wireless package.", alternativeAssetIds: ["aud-boom"] },
  { assetId: "aud-boom", windowId: "today-pm", status: "clear", coverageLabel: "Low queue", note: "Dialogue kit can be staged quickly if an audio assist is confirmed.", alternativeAssetIds: ["aud-lav"] },
  { assetId: "aud-boom", windowId: "tomorrow-am", status: "clear", coverageLabel: "Open support", note: "Useful relief valve when lav inventory tightens.", alternativeAssetIds: ["aud-lav"] },
  { assetId: "aud-boom", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Steady", note: "No active conflicts in the afternoon window.", alternativeAssetIds: ["aud-lav"] },
  { assetId: "aud-boom", windowId: "friday-dawn", status: "tight", coverageLabel: "Early assist", note: "Needs an extra audio hand if it leaves before the support desk opens fully.", alternativeAssetIds: ["aud-lav"] },
  { assetId: "lit-aputure", windowId: "today-pm", status: "tight", coverageLabel: "Truck prep", note: "The ballast is staged for a dock departure later today.", alternativeAssetIds: ["lit-nanlite"] },
  { assetId: "lit-aputure", windowId: "tomorrow-am", status: "tight", coverageLabel: "Booked reset", note: "Morning prep is committed unless the warehouse shoot slips.", alternativeAssetIds: ["lit-nanlite"] },
  { assetId: "lit-aputure", windowId: "tomorrow-pm", status: "conflict", coverageLabel: "Load-out conflict", note: "The current reservation owns the afternoon load-out slot.", alternativeAssetIds: ["lit-nanlite"] },
  { assetId: "lit-aputure", windowId: "friday-dawn", status: "clear", coverageLabel: "Open after return", note: "By Friday dawn the key light should be fully reset and relabeled.", alternativeAssetIds: ["lit-nanlite"] },
  { assetId: "lit-tubes", windowId: "today-pm", status: "conflict", coverageLabel: "Repair bench", note: "Tube batteries are still in service and cannot be released.", alternativeAssetIds: ["lit-nanlite", "lit-aputure"] },
  { assetId: "lit-tubes", windowId: "tomorrow-am", status: "conflict", coverageLabel: "Repair bench", note: "The latch replacement is still blocking this pickup window.", alternativeAssetIds: ["lit-nanlite"] },
  { assetId: "lit-tubes", windowId: "tomorrow-pm", status: "tight", coverageLabel: "Possible return", note: "The service bench may clear the pair in time for an afternoon pickup.", alternativeAssetIds: ["lit-nanlite"] },
  { assetId: "lit-tubes", windowId: "friday-dawn", status: "clear", coverageLabel: "Likely restored", note: "The pair is expected back in the catalog before Friday dawn.", alternativeAssetIds: ["lit-nanlite"] },
  { assetId: "lit-nanlite", windowId: "today-pm", status: "clear", coverageLabel: "Portable standby", note: "Travel light can fill either interview or walk-and-talk plans today.", alternativeAssetIds: ["lit-aputure"] },
  { assetId: "lit-nanlite", windowId: "tomorrow-am", status: "clear", coverageLabel: "Best substitute", note: "This is the cleanest lighting option for the crowded morning window.", alternativeAssetIds: ["lit-aputure"] },
  { assetId: "lit-nanlite", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Reliable", note: "No truck dependencies and no ballast bottleneck in the afternoon.", alternativeAssetIds: ["lit-aputure"] },
  { assetId: "lit-nanlite", windowId: "friday-dawn", status: "clear", coverageLabel: "Travel ready", note: "Battery plate is already staged for the dawn crew call.", alternativeAssetIds: ["lit-aputure"] },
  { assetId: "sup-sachtler", windowId: "today-pm", status: "clear", coverageLabel: "Open support", note: "Tripod can leave immediately with no balancing work.", alternativeAssetIds: ["sup-slider"] },
  { assetId: "sup-sachtler", windowId: "tomorrow-am", status: "tight", coverageLabel: "Interview demand", note: "Two interview requests are likely to grab the same tripod class in the morning.", alternativeAssetIds: ["sup-slider", "sup-rs4"] },
  { assetId: "sup-sachtler", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Low friction", note: "Tripod inventory loosens after lunch once the studio returns land.", alternativeAssetIds: ["sup-slider"] },
  { assetId: "sup-sachtler", windowId: "friday-dawn", status: "clear", coverageLabel: "Advance-ready", note: "A strong option for crews staging overnight.", alternativeAssetIds: ["sup-slider"] },
  { assetId: "sup-rs4", windowId: "today-pm", status: "conflict", coverageLabel: "Compatibility hold", note: "The gimbal cannot release until the lens package is approved.", alternativeAssetIds: ["sup-sachtler", "sup-slider"] },
  { assetId: "sup-rs4", windowId: "tomorrow-am", status: "tight", coverageLabel: "Likely release", note: "This hold should clear by morning if the camera team approves the payload.", alternativeAssetIds: ["sup-sachtler"] },
  { assetId: "sup-rs4", windowId: "tomorrow-pm", status: "clear", coverageLabel: "Motion friendly", note: "The afternoon slot is the safest time to book the gimbal.", alternativeAssetIds: ["sup-sachtler"] },
  { assetId: "sup-rs4", windowId: "friday-dawn", status: "clear", coverageLabel: "Open runway", note: "Friday dawn is a clean motion window once the hold expires.", alternativeAssetIds: ["sup-sachtler"] },
  { assetId: "sup-slider", windowId: "today-pm", status: "clear", coverageLabel: "Accessory open", note: "Motion pack is easy to stage with almost no prep queue.", alternativeAssetIds: ["sup-sachtler"] },
  { assetId: "sup-slider", windowId: "tomorrow-am", status: "clear", coverageLabel: "Backup support", note: "Useful when the tripod line starts backing up.", alternativeAssetIds: ["sup-sachtler"] },
  { assetId: "sup-slider", windowId: "tomorrow-pm", status: "tight", coverageLabel: "B-roll rush", note: "Afternoon creative teams often grab the motion pack for hero inserts.", alternativeAssetIds: ["sup-sachtler"] },
  { assetId: "sup-slider", windowId: "friday-dawn", status: "clear", coverageLabel: "Low queue", note: "Few dawn crews request slider coverage before they load out.", alternativeAssetIds: ["sup-sachtler"] },
];

export const bundleBlueprints: BundleBlueprint[] = [
  {
    id: "interview-sprint",
    intentId: "interview",
    label: "Interview Sprint",
    summary: "Stable hero camera, clean wireless audio, one key light, and a tripod for fast sit-down coverage.",
    heroAssetId: "cam-c70",
    assetIds: ["cam-c70", "aud-lav", "lit-nanlite", "sup-sachtler"],
    optionalAssetIds: ["aud-mixpre", "aud-boom"],
    note: "Swap the hero camera to the FX3 if the prime morning slot stays blocked.",
  },
  {
    id: "field-runner",
    intentId: "field",
    label: "Field Runner",
    summary: "Lean field package centered on mobility, battery discipline, and one moving support option.",
    heroAssetId: "cam-fx3",
    assetIds: ["cam-fx3", "aud-lav", "sup-rs4", "lit-nanlite"],
    optionalAssetIds: ["sup-slider", "aud-boom"],
    note: "Best for teams who can accept a gimbal compatibility review before pickup.",
  },
  {
    id: "livestream-desk",
    intentId: "livestream",
    label: "Livestream Desk",
    summary: "Compact stream package with reliable camera output, recorder coverage, and controllable key light.",
    heroAssetId: "cam-a7s3",
    assetIds: ["cam-a7s3", "aud-mixpre", "lit-aputure", "sup-sachtler"],
    optionalAssetIds: ["sup-slider", "aud-lav"],
    note: "If the 300D remains booked, move the bundle to the Forza and keep the rest of the desk intact.",
  },
  {
    id: "campus-walkthrough",
    intentId: "walkthrough",
    label: "Campus Walkthrough",
    summary: "Walking coverage with a compact camera body, wireless talent audio, and stabilized support.",
    heroAssetId: "cam-fx3",
    assetIds: ["cam-fx3", "aud-lav", "sup-rs4"],
    optionalAssetIds: ["lit-nanlite", "cam-a7s3"],
    note: "Add the travel light only if the route has indoor stops that need a fast key.",
  },
];
