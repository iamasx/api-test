export type InventoryStatus =
  | "Operational"
  | "Low Stock"
  | "Reserved"
  | "Maintenance";

export type InventoryCategory = {
  id: string;
  name: string;
  description: string;
  accent: string;
};

export type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  status: InventoryStatus;
  availability: string;
  availableUnits: number;
  reorderPoint: number;
  location: string;
  owner: string;
  lastChecked: string;
  serviceWindow: string;
  description: string;
  notes: string;
  tags: string[];
};

export type InventoryCategoryOption = {
  id: string;
  name: string;
  description: string;
  count: number;
};

export type InventorySection = InventoryCategory & {
  items: InventoryItem[];
  totalUnits: number;
};

export const inventoryCategories: InventoryCategory[] = [
  {
    id: "sensors",
    name: "Sensors",
    description: "Telemetry beacons, readers, and monitoring units for yard ops.",
    accent: "from-sky-500/20 via-cyan-400/15 to-transparent",
  },
  {
    id: "safety",
    name: "Safety",
    description: "Protective systems and incident-response hardware staged for crews.",
    accent: "from-amber-500/20 via-orange-400/15 to-transparent",
  },
  {
    id: "mobility",
    name: "Mobility",
    description: "Lift rigs, movement assists, and field-ready transport hardware.",
    accent: "from-emerald-500/20 via-lime-400/15 to-transparent",
  },
  {
    id: "power",
    name: "Power",
    description: "Portable energy modules and rapid-response power recovery kits.",
    accent: "from-rose-500/20 via-fuchsia-400/15 to-transparent",
  },
];

export const inventoryItems: InventoryItem[] = [
  {
    id: "aether-drone-beacon",
    name: "Aether Drone Beacon",
    sku: "SEN-1148",
    categoryId: "sensors",
    status: "Operational",
    availability: "24 units ready for dispatch",
    availableUnits: 24,
    reorderPoint: 10,
    location: "Dock A3 telemetry cage",
    owner: "Flight Operations",
    lastChecked: "2026-04-18",
    serviceWindow: "Quarterly calibration",
    description:
      "Long-range telemetry beacon used to trace drone movement across cargo lanes.",
    notes:
      "Paired with the yard mesh gateway. Latest calibration cycle cleared without drift.",
    tags: ["UWB", "IP67", "Mesh enabled"],
  },
  {
    id: "pulse-rack-reader",
    name: "Pulse Rack Reader",
    sku: "SEN-2011",
    categoryId: "sensors",
    status: "Low Stock",
    availability: "4 readers left before reorder",
    availableUnits: 4,
    reorderPoint: 6,
    location: "Control room secure shelf",
    owner: "Warehouse Automation",
    lastChecked: "2026-04-17",
    serviceWindow: "Battery refresh every 60 days",
    description:
      "Portable rack scanner for verifying tagged pallets during nightly put-away.",
    notes:
      "Demand increased after late-shift intake expansion. Reorder request is queued.",
    tags: ["RFID", "Handheld", "Dock sync"],
  },
  {
    id: "ember-suppression-canister",
    name: "Ember Suppression Canister",
    sku: "SAF-4023",
    categoryId: "safety",
    status: "Reserved",
    availability: "Allocated to loading bay retrofit",
    availableUnits: 6,
    reorderPoint: 4,
    location: "Hazmat cage row 2",
    owner: "Site Safety Team",
    lastChecked: "2026-04-16",
    serviceWindow: "Pressure test every 30 days",
    description:
      "Compact fire-suppression canister designed for high-heat electrical incidents.",
    notes:
      "Units are earmarked for Bay 7 retrofit and should remain staged through inspection.",
    tags: ["Fire safety", "Electrical", "Rapid deploy"],
  },
  {
    id: "sparrow-harness-rack",
    name: "Sparrow Harness Rack",
    sku: "SAF-5530",
    categoryId: "safety",
    status: "Operational",
    availability: "12 racks staged near assembly floor",
    availableUnits: 12,
    reorderPoint: 5,
    location: "Assembly mezzanine",
    owner: "Crew Enablement",
    lastChecked: "2026-04-19",
    serviceWindow: "Visual check every shift",
    description:
      "Modular rack system that keeps fall-protection harnesses serialized and deployment ready.",
    notes:
      "Crew leads requested a second rack bundle after overtime expansion last week.",
    tags: ["Harness", "Serialized", "Shift ready"],
  },
  {
    id: "atlas-lift-harness",
    name: "Atlas Lift Harness",
    sku: "MOB-3074",
    categoryId: "mobility",
    status: "Maintenance",
    availability: "Unavailable until 24 Apr service closeout",
    availableUnits: 0,
    reorderPoint: 2,
    location: "Repair bench 2",
    owner: "Heavy Lift Crew",
    lastChecked: "2026-04-20",
    serviceWindow: "Load test after every repair",
    description:
      "Assisted lift harness for oversize inventory moves in the west loading corridor.",
    notes:
      "Pulled from rotation after buckle fatigue alert. Waiting on replacement bracket install.",
    tags: ["Lift assist", "Repair hold", "Heavy cargo"],
  },
  {
    id: "rover-battery-sled",
    name: "Rover Battery Sled",
    sku: "MOB-3186",
    categoryId: "mobility",
    status: "Operational",
    availability: "7 sleds charged and ready",
    availableUnits: 7,
    reorderPoint: 3,
    location: "Autonomy garage",
    owner: "Ground Robotics",
    lastChecked: "2026-04-18",
    serviceWindow: "Motor tune every 90 days",
    description:
      "Swap-ready battery sled that keeps inspection rovers moving through long shifts.",
    notes:
      "Charge retention stabilized after firmware patch. No heat events in the last cycle.",
    tags: ["Robotics", "Battery swap", "Field ready"],
  },
  {
    id: "flux-response-kit",
    name: "Flux Response Kit",
    sku: "PWR-6502",
    categoryId: "power",
    status: "Low Stock",
    availability: "3 kits remain before replenishment",
    availableUnits: 3,
    reorderPoint: 5,
    location: "Emergency power locker",
    owner: "Grid Resilience Team",
    lastChecked: "2026-04-17",
    serviceWindow: "Seal inspection monthly",
    description:
      "Rapid-response kit for restoring temporary power during rack maintenance windows.",
    notes:
      "Two kits were consumed during overnight switchgear tests. Supplier ETA is two days.",
    tags: ["Backup power", "Portable", "Incident response"],
  },
  {
    id: "grid-capacitor-bank",
    name: "Grid Capacitor Bank",
    sku: "PWR-7190",
    categoryId: "power",
    status: "Operational",
    availability: "9 modules staged for surge balancing",
    availableUnits: 9,
    reorderPoint: 4,
    location: "South utility spine",
    owner: "Facilities Engineering",
    lastChecked: "2026-04-19",
    serviceWindow: "Balance check every 45 days",
    description:
      "Modular capacitor bank used to smooth temporary load spikes during maintenance events.",
    notes:
      "Recent load-balance report showed improved recovery time after installing the latest pair.",
    tags: ["Capacitor", "Load balancing", "Facilities"],
  },
];

export const inventoryStatusStyles: Record<
  InventoryStatus,
  { badge: string; dot: string }
> = {
  Operational: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  "Low Stock": {
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  Reserved: {
    badge: "border-sky-200 bg-sky-50 text-sky-700",
    dot: "bg-sky-500",
  },
  Maintenance: {
    badge: "border-rose-200 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
  },
};

export function getInventoryCategoryById(categoryId: string) {
  return inventoryCategories.find((category) => category.id === categoryId);
}

export function getInventoryCategoryOptions(
  items: InventoryItem[],
  categories: InventoryCategory[],
): InventoryCategoryOption[] {
  return [
    {
      id: "all",
      name: "All Inventory",
      description: "Every asset currently tracked by the catalog.",
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

export function getInventorySections(
  items: InventoryItem[],
  categories: InventoryCategory[],
  activeCategoryId: string,
): InventorySection[] {
  const visibleCategories =
    activeCategoryId === "all"
      ? categories
      : categories.filter((category) => category.id === activeCategoryId);

  return visibleCategories
    .map((category) => {
      const sectionItems = items.filter((item) => item.categoryId === category.id);

      return {
        ...category,
        items: sectionItems,
        totalUnits: sectionItems.reduce(
          (sum, item) => sum + item.availableUnits,
          0,
        ),
      };
    })
    .filter((section) => section.items.length > 0);
}
