export type AssetAvailability = "available" | "reserved" | "hold" | "maintenance";
export type AssetCategoryId = "camera" | "audio" | "lighting" | "support";

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
};

export const assetCatalogSyncLabel = "Inventory refresh 09:12 IST";

export const assetCategories: AssetCategory[] = [
  { id: "camera", label: "Camera", summary: "Bodies, handheld kits, and lens-ready capture gear." },
  { id: "audio", label: "Audio", summary: "Wireless capture, field recorders, and lav sets." },
  { id: "lighting", label: "Lighting", summary: "Portable panels, key lights, and modifier kits." },
  { id: "support", label: "Support", summary: "Tripods, stabilizers, and grip accessories." },
];

export const availabilityOptions: AvailabilityOption[] = [
  { id: "available", label: "Ready now", note: "Bench checked and clear for pickup." },
  { id: "reserved", label: "Reserved", note: "Already staged for an upcoming handoff." },
  { id: "hold", label: "On hold", note: "Temporarily blocked pending confirmation." },
  { id: "maintenance", label: "Maintenance", note: "In service or calibration review." },
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
    tags: ["interview", "studio", "fast-turn"],
    kit: ["C70 body", "RF 24-105mm lens", "Top-handle XLR module"],
    condition: "Staged with printed checkout sheet",
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
    tags: ["travel", "wireless-monitor", "4k"],
    kit: ["RS 4 combo", "Focus motor", "Briefcase handle"],
    condition: "Balance plate marked for FX3 payload",
  },
];

export const reservationPreviews: ReservationPreview[] = [
  {
    id: "res-c70",
    assetId: "cam-c70",
    requester: "Mina Torres",
    project: "Customer Story Sprint",
    pickupWindow: "11:30-12:00",
    returnWindow: "Tomorrow by 17:30",
    handoffZone: "Front desk handoff",
    checklist: ["Lens cap and ND pack", "Fresh media cards", "Signed interview kit receipt"],
    note: "Keep the top handle attached for the lav receiver bracket.",
  },
  {
    id: "res-mixpre",
    assetId: "aud-mixpre",
    requester: "Jon Park",
    project: "Founder Fireside",
    pickupWindow: "Needs approval before 12:15",
    returnWindow: "Same day by 19:00",
    handoffZone: "Audio locker release",
    checklist: ["Confirm guest count", "Attach backup SD card", "Add spare NP-F battery"],
    note: "Reservation is blocked until the guest lineup is final.",
  },
  {
    id: "res-300d",
    assetId: "lit-aputure",
    requester: "Rhea Malik",
    project: "Warehouse Hero Shoot",
    pickupWindow: "13:15 dock load-out",
    returnWindow: "Two days after wrap",
    handoffZone: "Lighting cart dispatch",
    checklist: ["Softbox rods taped", "Ballast tie-down added", "Truck manifest signed"],
    note: "Pair with the C-stand already assigned to lane 4.",
  },
  {
    id: "res-rs4",
    assetId: "sup-rs4",
    requester: "Dev Gupta",
    project: "Campus Walkthrough",
    pickupWindow: "Hold until 10:45",
    returnWindow: "Tomorrow by 10:00",
    handoffZone: "Grip wall release",
    checklist: ["Confirm lens weight", "Rebalance after battery swap", "Include focus motor cable"],
    note: "If the lens swap is denied, release the hold back to ready inventory.",
  },
];
