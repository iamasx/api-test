export type AssetAvailabilityState = "Available" | "Reserved" | "Unavailable";

export type AssetCategory = {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  accent: string;
};

export type AssetAvailability = {
  summary: string;
  readyUnits: number;
  reserveFloor: number;
  releaseWindow: string;
  nextTransfer: string;
  stagingLocation: string;
  assignedLead: string;
  supplyLane: string;
  lastAudit: string;
  constraints: string;
};

export type CatalogAsset = {
  id: string;
  name: string;
  assetCode: string;
  categoryId: string;
  state: AssetAvailabilityState;
  description: string;
  missionFit: string;
  tags: string[];
  availability: AssetAvailability;
};

export type AssetCategoryOption = {
  id: string;
  name: string;
  description: string;
  count: number;
};

export type AssetCatalogSection = AssetCategory & {
  items: CatalogAsset[];
  totalReadyUnits: number;
  constrainedItems: number;
};

export const assetCatalogCategories: AssetCategory[] = [
  {
    id: "aerial",
    name: "Aerial Survey",
    shortLabel: "Aerial",
    description:
      "Rotary drones, beacon rigs, and mapping payloads staged for rapid overflight.",
    accent: "from-sky-500/20 via-cyan-400/12 to-transparent",
  },
  {
    id: "shelter",
    name: "Shelter Systems",
    shortLabel: "Shelter",
    description:
      "Portable shelter, climate control, and relief support assets assigned to base camps.",
    accent: "from-orange-500/20 via-amber-400/12 to-transparent",
  },
  {
    id: "power",
    name: "Power Reserve",
    shortLabel: "Power",
    description:
      "Mobile batteries, microgrid crates, and power recovery hardware held for field restores.",
    accent: "from-emerald-500/20 via-lime-400/12 to-transparent",
  },
  {
    id: "coastal",
    name: "Coastal Logistics",
    shortLabel: "Coastal",
    description:
      "Launch craft, dock tools, and lift support gear reserved for shoreline corridors.",
    accent: "from-fuchsia-500/20 via-rose-400/12 to-transparent",
  },
];

export const assetAvailabilityStateCopy: Record<
  AssetAvailabilityState,
  string
> = {
  Available:
    "Asset can be assigned immediately without dropping below the catalog reserve floor.",
  Reserved:
    "Asset is healthy, but the current allocation is tied to an active deployment window.",
  Unavailable:
    "Asset is intentionally withheld from scheduling until repair, weather clearance, or replenishment closes out.",
};

export const assetCatalogAssets: CatalogAsset[] = [
  {
    id: "meridian-survey-drone",
    name: "Meridian Survey Drone",
    assetCode: "AIR-204",
    categoryId: "aerial",
    state: "Available",
    description:
      "Long-endurance quadcopter used for corridor scans, thermal sweeps, and low-altitude mapping.",
    missionFit:
      "Best for early daylight passes where one crew needs both thermal and visual coverage.",
    tags: ["Thermal", "LiDAR", "8K relay"],
    availability: {
      summary: "6 drones ready across the north apron and can launch in under 12 minutes.",
      readyUnits: 6,
      reserveFloor: 2,
      releaseWindow: "Immediate release through 22 Apr, 18:00 local",
      nextTransfer: "One unit rotates to the canyon relay mission tonight at 21:15.",
      stagingLocation: "North apron hangar 2",
      assignedLead: "Overflight Team Delta",
      supplyLane: "Rotor parts arrive from the mesa depot every morning at 06:30.",
      lastAudit: "2026-04-19",
      constraints: "Thermal payload four is waiting on a lens swap after the next return cycle.",
    },
  },
  {
    id: "halo-beacon-mast",
    name: "Halo Beacon Mast",
    assetCode: "AIR-319",
    categoryId: "aerial",
    state: "Reserved",
    description:
      "Collapsible relay mast that extends signal coverage for drone operations beyond ridge interference.",
    missionFit:
      "Usually paired with long-route drone launches when terrain blocks the southern repeater line.",
    tags: ["Relay", "Portable mast", "Signal extension"],
    availability: {
      summary: "2 mast kits remain on hand while 1 is locked to the ridgewatch survey package.",
      readyUnits: 2,
      reserveFloor: 1,
      releaseWindow: "Next free assignment opens after ridgewatch teardown on 23 Apr.",
      nextTransfer: "Current reserved mast is due back after the 07:40 uplink test tomorrow.",
      stagingLocation: "Antenna cage B",
      assignedLead: "Comms Support Crew",
      supplyLane: "Replacement guy-wire bundles are staged at relay warehouse west.",
      lastAudit: "2026-04-18",
      constraints: "Spare mounting feet are below target and should be replenished this week.",
    },
  },
  {
    id: "drift-shelter-pod",
    name: "Drift Shelter Pod",
    assetCode: "SHL-112",
    categoryId: "shelter",
    state: "Available",
    description:
      "Rapid-deploy shelter pod with climate control, cot storage, and integrated lighting.",
    missionFit:
      "Used when a temporary overnight footprint is needed before a full camp transfer can land.",
    tags: ["Shelter", "HVAC", "Rapid setup"],
    availability: {
      summary: "4 pods are staged in the east yard with climate packs already loaded.",
      readyUnits: 4,
      reserveFloor: 2,
      releaseWindow: "Open for assignment through the weekend weather cycle.",
      nextTransfer: "No transfers planned before the Friday field briefing.",
      stagingLocation: "East yard shelter row",
      assignedLead: "Camp Operations",
      supplyLane: "Canvas patch kits replenish from central stores on Tuesday and Friday.",
      lastAudit: "2026-04-20",
      constraints: "Pod 3 carries a cosmetic panel dent but remains certified for service.",
    },
  },
  {
    id: "ember-water-hub",
    name: "Ember Water Hub",
    assetCode: "SHL-241",
    categoryId: "shelter",
    state: "Reserved",
    description:
      "Filtered water and wash station module bundled with camp sanitation and refill hardware.",
    missionFit:
      "Best for mid-duration staging zones that need potable water service without a full utility trailer.",
    tags: ["Water", "Sanitation", "Camp support"],
    availability: {
      summary: "1 hub is committed to shoreline camp Bravo while 1 standby unit remains sealed.",
      readyUnits: 1,
      reserveFloor: 1,
      releaseWindow: "Standby unit can move now, reserved unit clears on 24 Apr after inspection.",
      nextTransfer: "Bravo handoff returns to the depot after the coastal medical drill closes.",
      stagingLocation: "Camp support lane 4",
      assignedLead: "Relief Logistics",
      supplyLane: "Filter packs flow through municipal supply every 48 hours.",
      lastAudit: "2026-04-17",
      constraints: "Any second deployment requires extra refill bladders from the warehouse annex.",
    },
  },
  {
    id: "atlas-cell-cart",
    name: "Atlas Cell Cart",
    assetCode: "PWR-508",
    categoryId: "power",
    state: "Unavailable",
    description:
      "Towable high-capacity battery cart for supporting clinic tents and mobile command posts.",
    missionFit:
      "Preferred when short deployment windows need quiet power without spinning up generators.",
    tags: ["Battery", "Mobile power", "Clinic support"],
    availability: {
      summary: "0 carts ready while the primary inverter stack is under bench repair.",
      readyUnits: 0,
      reserveFloor: 1,
      releaseWindow: "Repair target is 25 Apr pending inverter validation.",
      nextTransfer: "Once repaired, the cart is tentatively booked for command post standby.",
      stagingLocation: "Power bench south",
      assignedLead: "Grid Recovery Unit",
      supplyLane: "Refurbished inverter modules are due from the harbor lab tomorrow evening.",
      lastAudit: "2026-04-20",
      constraints: "Dispatch remains blocked until both the inverter swap and load soak complete.",
    },
  },
  {
    id: "pulse-microgrid-crate",
    name: "Pulse Microgrid Crate",
    assetCode: "PWR-612",
    categoryId: "power",
    state: "Available",
    description:
      "Containerized microgrid bundle with breakers, storage packs, and rapid tie-in hardware.",
    missionFit:
      "Used when a field site needs more than emergency backup but less than a full utility trailer.",
    tags: ["Microgrid", "Breakers", "Field restore"],
    availability: {
      summary: "3 crates are charged, balanced, and ready for transport before nightfall.",
      readyUnits: 3,
      reserveFloor: 1,
      releaseWindow: "Immediate release, with one crate held for overnight storm contingency.",
      nextTransfer: "A single crate is tentatively assigned to the canyon clinic on 21 Apr.",
      stagingLocation: "South utility spine",
      assignedLead: "Power Staging Crew",
      supplyLane: "Breaker cartridges and cooling loops replenish from the metro depot daily.",
      lastAudit: "2026-04-19",
      constraints: "Route planning must account for the low bridge on the old service road.",
    },
  },
  {
    id: "tidebridge-dock-skiff",
    name: "Tidebridge Dock Skiff",
    assetCode: "SEA-087",
    categoryId: "coastal",
    state: "Reserved",
    description:
      "Shallow-draft skiff used for dock-to-shore shuttle runs when the fixed pier is congested.",
    missionFit:
      "Best for fast personnel and crate transfers along tidal inlets where larger craft cannot berth.",
    tags: ["Marine", "Shuttle", "Low draft"],
    availability: {
      summary: "1 skiff is on active harbor rotation and the backup hull remains fueled at berth.",
      readyUnits: 1,
      reserveFloor: 1,
      releaseWindow: "Backup skiff can be reassigned after the 14:30 tide update.",
      nextTransfer: "Active rotation closes after the evening med-supply shuttle.",
      stagingLocation: "Berth C south finger",
      assignedLead: "Harbor Transit Team",
      supplyLane: "Fuel and spare prop kits replenish through dock services each morning.",
      lastAudit: "2026-04-18",
      constraints: "Crosswind restrictions apply once sustained gusts move above 28 knots.",
    },
  },
  {
    id: "breakwater-lift-sled",
    name: "Breakwater Lift Sled",
    assetCode: "SEA-143",
    categoryId: "coastal",
    state: "Available",
    description:
      "Low-profile lift sled for moving palletized cargo over unstable dock plates and ramps.",
    missionFit:
      "Usually paired with the skiff route when relief pallets need to bypass the crane queue.",
    tags: ["Lift assist", "Dock cargo", "Pallet transfer"],
    availability: {
      summary: "5 sleds are staged near the east marina gate with two crews already certified.",
      readyUnits: 5,
      reserveFloor: 2,
      releaseWindow: "Open all day, with no conflicting reservations on the board.",
      nextTransfer: "No scheduled moves until the late cargo sweep at 19:10.",
      stagingLocation: "East marina gate",
      assignedLead: "Shoreline Handling Team",
      supplyLane: "Replacement rollers and straps restock from dock workshop stock.",
      lastAudit: "2026-04-20",
      constraints: "Two sleds are rated only for medium-load pallets until bearing upgrades land.",
    },
  },
];

export function getAssetCategoryById(categoryId: string) {
  return assetCatalogCategories.find((category) => category.id === categoryId);
}

export function getAssetById(assetId: string) {
  return assetCatalogAssets.find((asset) => asset.id === assetId);
}

export function getAssetCategoryOptions(
  items: CatalogAsset[],
  categories: AssetCategory[],
): AssetCategoryOption[] {
  return [
    {
      id: "all",
      name: "All Assets",
      description: "Every staged asset and availability track in the catalog.",
      count: items.length,
    },
    ...categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      count: items.filter((item) => item.categoryId === category.id).length,
    })),
  ];
}

function matchesCatalogSearch(asset: CatalogAsset, normalizedQuery: string) {
  if (!normalizedQuery) {
    return true;
  }

  const haystack = [
    asset.name,
    asset.assetCode,
    asset.description,
    asset.missionFit,
    asset.state,
    asset.availability.summary,
    asset.availability.releaseWindow,
    asset.availability.stagingLocation,
    asset.availability.assignedLead,
    asset.availability.supplyLane,
    asset.availability.constraints,
    asset.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedQuery);
}

export function getAssetCatalogSections(
  items: CatalogAsset[],
  categories: AssetCategory[],
  activeCategoryId: string,
  searchQuery: string,
): AssetCatalogSection[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = items.filter((item) =>
    matchesCatalogSearch(item, normalizedQuery),
  );
  const visibleCategories =
    activeCategoryId === "all"
      ? categories
      : categories.filter((category) => category.id === activeCategoryId);

  return visibleCategories
    .map((category) => {
      const sectionItems = filteredItems.filter(
        (item) => item.categoryId === category.id,
      );

      return {
        ...category,
        items: sectionItems,
        totalReadyUnits: sectionItems.reduce(
          (sum, item) => sum + item.availability.readyUnits,
          0,
        ),
        constrainedItems: sectionItems.filter(
          (item) => item.state !== "Available",
        ).length,
      };
    })
    .filter((section) => section.items.length > 0);
}
