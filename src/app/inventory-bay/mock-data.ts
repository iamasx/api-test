export type StockBandId = "steady" | "watch" | "critical";

export type StorageZone = {
  id: string;
  label: string;
  shelf: string;
  climate: string;
  note: string;
};

export type StockBand = {
  id: StockBandId;
  label: string;
  summary: string;
  guidance: string;
};

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  zoneId: StorageZone["id"];
  bandId: StockBandId;
  unitsOnHand: number;
  capacity: number;
  reorderPoint: number;
  dailyPickRate: number;
  leadTimeDays: number;
  palletFace: string;
  lastCountedAt: string;
};

export type RestockSuggestion = {
  id: string;
  itemId: InventoryItem["id"];
  zoneId: StorageZone["id"];
  priority: "routine" | "critical";
  suggestedUnits: number;
  supplier: string;
  etaWindow: string;
  rationale: string;
};

export const storageZones: StorageZone[] = [
  { id: "north-cold", label: "North Cold Bay", shelf: "A1-A4", climate: "4 C chilled", note: "Rapid-turn coolants and seals" },
  { id: "east-heavy", label: "East Heavy Rack", shelf: "B7-B11", climate: "Ambient", note: "Dense metal fittings and valve stock" },
  { id: "south-pick", label: "South Pick Line", shelf: "C2-C6", climate: "Ambient", note: "Daily order picks and scanner kits" },
  { id: "west-buffer", label: "West Buffer Deck", shelf: "D1-D3", climate: "Dry hold", note: "Overflow packs and backfill lanes" },
];

export const stockBands: StockBand[] = [
  { id: "steady", label: "Steady", summary: "Healthy stock coverage", guidance: "Carry on with normal cycle counts and supplier cadence." },
  { id: "watch", label: "Watch", summary: "Thresholds are narrowing", guidance: "Rebalance nearby zones or prepare the next replenishment batch." },
  { id: "critical", label: "Critical", summary: "Reorder action is due", guidance: "Protect picks, escalate the restock, and avoid new allocations." },
];

export const inventoryItems: InventoryItem[] = [
  { id: "coolant-capsules", sku: "CB-441", name: "Coolant Capsules", zoneId: "north-cold", bandId: "critical", unitsOnHand: 12, capacity: 64, reorderPoint: 16, dailyPickRate: 6, leadTimeDays: 3, palletFace: "Cold lane A2", lastCountedAt: "07:32" },
  { id: "gasket-kits", sku: "GK-210", name: "Composite Gasket Kits", zoneId: "north-cold", bandId: "watch", unitsOnHand: 24, capacity: 72, reorderPoint: 20, dailyPickRate: 4, leadTimeDays: 5, palletFace: "Cold lane A4", lastCountedAt: "06:48" },
  { id: "pressure-valves", sku: "PV-902", name: "Pressure Valve Assemblies", zoneId: "east-heavy", bandId: "steady", unitsOnHand: 68, capacity: 96, reorderPoint: 24, dailyPickRate: 3, leadTimeDays: 6, palletFace: "Rack B9", lastCountedAt: "08:11" },
  { id: "sensor-housings", sku: "SH-118", name: "Sensor Housings", zoneId: "south-pick", bandId: "watch", unitsOnHand: 18, capacity: 48, reorderPoint: 14, dailyPickRate: 5, leadTimeDays: 2, palletFace: "Pick face C3", lastCountedAt: "08:02" },
  { id: "cable-harnesses", sku: "CH-774", name: "Cable Harness Bundles", zoneId: "south-pick", bandId: "steady", unitsOnHand: 122, capacity: 150, reorderPoint: 40, dailyPickRate: 9, leadTimeDays: 4, palletFace: "Pick face C5", lastCountedAt: "07:54" },
  { id: "sealant-pucks", sku: "SP-063", name: "Sealant Pucks", zoneId: "west-buffer", bandId: "critical", unitsOnHand: 9, capacity: 40, reorderPoint: 12, dailyPickRate: 2, leadTimeDays: 7, palletFace: "Deck D1", lastCountedAt: "05:59" },
  { id: "filter-mesh", sku: "FM-337", name: "Filter Mesh Rolls", zoneId: "west-buffer", bandId: "watch", unitsOnHand: 34, capacity: 70, reorderPoint: 22, dailyPickRate: 3, leadTimeDays: 5, palletFace: "Deck D3", lastCountedAt: "07:06" },
  { id: "rotor-bolts", sku: "RB-556", name: "Rotor Bolt Trays", zoneId: "east-heavy", bandId: "steady", unitsOnHand: 240, capacity: 280, reorderPoint: 90, dailyPickRate: 11, leadTimeDays: 8, palletFace: "Rack B7", lastCountedAt: "06:27" },
];

export const restockSuggestions: RestockSuggestion[] = [
  { id: "restock-coolant", itemId: "coolant-capsules", zoneId: "north-cold", priority: "critical", suggestedUnits: 36, supplier: "CryoWorks", etaWindow: "ETA 18h", rationale: "Open orders exceed two pick windows and the cold lane has no swap stock." },
  { id: "restock-sealant", itemId: "sealant-pucks", zoneId: "west-buffer", priority: "critical", suggestedUnits: 24, supplier: "BufferChem", etaWindow: "ETA 30h", rationale: "The deck is below buffer minimum and the next truck is already partially filled." },
  { id: "restock-sensors", itemId: "sensor-housings", zoneId: "south-pick", priority: "routine", suggestedUnits: 20, supplier: "North Axis", etaWindow: "ETA 12h", rationale: "Morning scans show a tighter pick slope than forecast for the next shift." },
  { id: "restock-gaskets", itemId: "gasket-kits", zoneId: "north-cold", priority: "routine", suggestedUnits: 18, supplier: "Seal Forge", etaWindow: "ETA 2d", rationale: "A top-up keeps the cold bay above the watch band through the weekend run." },
  { id: "restock-filter-mesh", itemId: "filter-mesh", zoneId: "west-buffer", priority: "routine", suggestedUnits: 16, supplier: "Meshline", etaWindow: "ETA 36h", rationale: "One backfill lane is reserved for overflow, so replenishment needs a shorter lot." },
];
