export type InventoryBayBandId = "healthy" | "watch" | "critical";

export type InventoryBayBand = {
  id: InventoryBayBandId;
  name: string;
  stateLabel: string;
  eyebrow: string;
  description: string;
  badgeClassName: string;
  surfaceClassName: string;
};

export type InventoryBayCategory = {
  id: string;
  name: string;
  zone: string;
  description: string;
  restockWindow: string;
};

export type InventoryBayItem = {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  bandId: InventoryBayBandId;
  unitsOnHand: number;
  reservedUnits: number;
  targetUnits: number;
  reorderPoint: number;
  daysOfCover: number;
  nextDelivery: string;
  owner: string;
  location: string;
};

export type InventoryBayLowStockLevel = "Critical" | "Watch";

export type InventoryBayLowStockAlert = {
  id: string;
  itemId: string;
  level: InventoryBayLowStockLevel;
  window: string;
  recommendedMove: string;
};

export type InventoryBayOverviewMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

export type InventoryBayBandSummary = InventoryBayBand & {
  skuCount: number;
  availableUnits: number;
  averageDaysOfCover: number;
  shareOfTrackedSkus: number;
};

export type InventoryBayCategorySummary = InventoryBayCategory & {
  skuCount: number;
  lowStockCount: number;
  criticalCount: number;
  availableUnits: number;
  fillRate: number;
  focusItem: InventoryBayItem;
};

export type InventoryBayLowStockView = InventoryBayLowStockAlert & {
  item: InventoryBayItem;
  category: InventoryBayCategory;
  band: InventoryBayBand;
  availableUnits: number;
};

export const inventoryBayBands: InventoryBayBand[] = [
  {
    id: "healthy",
    name: "Healthy",
    stateLabel: "Available",
    eyebrow: "Above target",
    description:
      "Stock is above the reorder line with enough cover to absorb the normal pull pattern.",
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-800",
    surfaceClassName:
      "border-emerald-200/80 bg-[linear-gradient(135deg,rgba(236,253,245,0.98),rgba(240,253,250,0.92))]",
  },
  {
    id: "watch",
    name: "Watch",
    stateLabel: "Low Stock",
    eyebrow: "Pressure rising",
    description:
      "Coverage is tightening and should be checked before the next replenishment window closes.",
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-800",
    surfaceClassName:
      "border-amber-200/80 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(255,247,237,0.92))]",
  },
  {
    id: "critical",
    name: "Critical",
    stateLabel: "Depleted",
    eyebrow: "Intervention required",
    description:
      "Current stock cannot safely cover the next demand wave without a transfer, expedite, or hold release.",
    badgeClassName: "border-rose-200 bg-rose-50 text-rose-800",
    surfaceClassName:
      "border-rose-200/80 bg-[linear-gradient(135deg,rgba(255,241,242,0.98),rgba(255,247,237,0.92))]",
  },
];

export const inventoryBayCategories: InventoryBayCategory[] = [
  {
    id: "cold-storage",
    name: "Cold Storage",
    zone: "Bay North / Freezer lane",
    description:
      "Temperature-sensitive consumables staged for outbound kits and clinic loads.",
    restockWindow: "14:30 freezer sweep",
  },
  {
    id: "fast-picks",
    name: "Fast Picks",
    zone: "Bay East / Pick wall",
    description:
      "High-turn handheld hardware and light-guided pick components that keep the wall moving.",
    restockWindow: "13:30 wave launch",
  },
  {
    id: "packing-supplies",
    name: "Packing Supplies",
    zone: "Bay South / Bench run",
    description:
      "Packout materials that protect the late shift from running short mid-wave.",
    restockWindow: "18:10 dock replenishment",
  },
  {
    id: "returns-bench",
    name: "Returns Bench",
    zone: "Bay West / QA return cage",
    description:
      "Recovery and QA inventory reserved for intake, inspection, and refurb loops.",
    restockWindow: "15:00 QA recovery check",
  },
];

export const inventoryBayItems: InventoryBayItem[] = [
  {
    id: "cryo-gel-packs",
    name: "Cryo Gel Packs",
    sku: "BAY-CLD-102",
    categoryId: "cold-storage",
    bandId: "watch",
    unitsOnHand: 22,
    reservedUnits: 12,
    targetUnits: 36,
    reorderPoint: 18,
    daysOfCover: 7,
    nextDelivery: "Transfer from Bay 2 at 14:30",
    owner: "Cold Chain Lead",
    location: "Freezer rack C2",
  },
  {
    id: "vaccine-tote-liners",
    name: "Vaccine Tote Liners",
    sku: "BAY-CLD-118",
    categoryId: "cold-storage",
    bandId: "healthy",
    unitsOnHand: 48,
    reservedUnits: 10,
    targetUnits: 40,
    reorderPoint: 20,
    daysOfCover: 18,
    nextDelivery: "Supplier top-up staged for the next inbound lane",
    owner: "Receiving Coordinator",
    location: "Freezer rack A1",
  },
  {
    id: "pick-scan-wands",
    name: "Pick Scan Wands",
    sku: "BAY-FPK-203",
    categoryId: "fast-picks",
    bandId: "healthy",
    unitsOnHand: 31,
    reservedUnits: 5,
    targetUnits: 28,
    reorderPoint: 12,
    daysOfCover: 15,
    nextDelivery: "Battery pack refill due tonight",
    owner: "Pick Cell Supervisor",
    location: "Pick wall east",
  },
  {
    id: "pick-to-light-pods",
    name: "Pick-to-Light Pods",
    sku: "BAY-FPK-244",
    categoryId: "fast-picks",
    bandId: "critical",
    unitsOnHand: 6,
    reservedUnits: 4,
    targetUnits: 18,
    reorderPoint: 10,
    daysOfCover: 2,
    nextDelivery: "Inbound replacement lot blocked on firmware hold",
    owner: "Automation Reliability",
    location: "Pick wall control cabinet",
  },
  {
    id: "shock-tape-cartridges",
    name: "Shock Tape Cartridges",
    sku: "BAY-PKG-311",
    categoryId: "packing-supplies",
    bandId: "watch",
    unitsOnHand: 17,
    reservedUnits: 8,
    targetUnits: 24,
    reorderPoint: 14,
    daysOfCover: 6,
    nextDelivery: "Dock 4 replenishment due at 18:10",
    owner: "Packout Lead",
    location: "Bench 6 consumables rail",
  },
  {
    id: "thermal-mailers",
    name: "Thermal Mailers",
    sku: "BAY-PKG-329",
    categoryId: "packing-supplies",
    bandId: "healthy",
    unitsOnHand: 64,
    reservedUnits: 14,
    targetUnits: 52,
    reorderPoint: 26,
    daysOfCover: 20,
    nextDelivery: "Blanket order clears every Friday morning",
    owner: "Packout Lead",
    location: "Pallet stack B7",
  },
  {
    id: "refurb-bin-seals",
    name: "Refurb Bin Seals",
    sku: "BAY-RET-411",
    categoryId: "returns-bench",
    bandId: "critical",
    unitsOnHand: 9,
    reservedUnits: 6,
    targetUnits: 22,
    reorderPoint: 12,
    daysOfCover: 3,
    nextDelivery: "Vendor expedite requested for the next QA dock slot",
    owner: "Returns Recovery",
    location: "Refurb bench cage 3",
  },
  {
    id: "qa-hold-cards",
    name: "QA Hold Cards",
    sku: "BAY-RET-438",
    categoryId: "returns-bench",
    bandId: "watch",
    unitsOnHand: 14,
    reservedUnits: 9,
    targetUnits: 20,
    reorderPoint: 10,
    daysOfCover: 5,
    nextDelivery: "Print room run scheduled at 16:45",
    owner: "Quality Desk",
    location: "Inspection counter drawer 1",
  },
];

export const inventoryBayLowStockAlerts: InventoryBayLowStockAlert[] = [
  {
    id: "pick-to-light-pods-alert",
    itemId: "pick-to-light-pods",
    level: "Critical",
    window: "Before 13:30 wave launch",
    recommendedMove:
      "Manual QA release the blocked lot and move two healthy pods from the training lane.",
  },
  {
    id: "refurb-bin-seals-alert",
    itemId: "refurb-bin-seals",
    level: "Critical",
    window: "Today by 15:00",
    recommendedMove:
      "Approve the emergency buy and reserve the next dock receipt for QA recovery only.",
  },
  {
    id: "cryo-gel-packs-alert",
    itemId: "cryo-gel-packs",
    level: "Watch",
    window: "During 14:30 freezer sweep",
    recommendedMove:
      "Transfer eight packs from Bay 2 before the next clinic block departs.",
  },
  {
    id: "shock-tape-cartridges-alert",
    itemId: "shock-tape-cartridges",
    level: "Watch",
    window: "Before 18:10 dock replenishment",
    recommendedMove:
      "Stage a top-off tote at Bench 6 ahead of the promo bundle wave.",
  },
];

const bandSortOrder: Record<InventoryBayBandId, number> = {
  critical: 0,
  watch: 1,
  healthy: 2,
};

const alertLevelSortOrder: Record<InventoryBayLowStockLevel, number> = {
  Critical: 0,
  Watch: 1,
};

export function getAvailableToPromise(item: InventoryBayItem) {
  return Math.max(item.unitsOnHand - item.reservedUnits, 0);
}

function getFillRate(items: InventoryBayItem[]) {
  const totalUnits = items.reduce((sum, item) => sum + item.unitsOnHand, 0);
  const totalTarget = items.reduce((sum, item) => sum + item.targetUnits, 0);

  if (totalTarget === 0) {
    return 0;
  }

  return Math.min(100, Math.round((totalUnits / totalTarget) * 100));
}

function compareItemsByRisk(left: InventoryBayItem, right: InventoryBayItem) {
  const bandDifference = bandSortOrder[left.bandId] - bandSortOrder[right.bandId];

  if (bandDifference !== 0) {
    return bandDifference;
  }

  const coverDifference = left.daysOfCover - right.daysOfCover;

  if (coverDifference !== 0) {
    return coverDifference;
  }

  return getAvailableToPromise(left) - getAvailableToPromise(right);
}

export function getInventoryBayOverviewMetrics(
  items: InventoryBayItem[],
  categories: InventoryBayCategory[],
  alerts: InventoryBayLowStockAlert[],
): InventoryBayOverviewMetric[] {
  const totalAvailableUnits = items.reduce(
    (sum, item) => sum + getAvailableToPromise(item),
    0,
  );
  const criticalItems = items.filter((item) => item.bandId === "critical").length;

  return [
    {
      id: "tracked-skus",
      label: "Tracked SKUs",
      value: items.length.toString(),
      detail: `Across ${categories.length} live bay zones`,
    },
    {
      id: "available-units",
      label: "Available units",
      value: totalAvailableUnits.toString(),
      detail: "Units ready to promise or transfer",
    },
    {
      id: "low-stock-alerts",
      label: "Low-stock alerts",
      value: alerts.length.toString(),
      detail: "Items with an active warning window",
    },
    {
      id: "critical-items",
      label: "Critical items",
      value: criticalItems.toString(),
      detail: "Items already below safe reorder cover",
    },
  ];
}

export function getInventoryBayBandSummaries(
  items: InventoryBayItem[],
  bands: InventoryBayBand[],
): InventoryBayBandSummary[] {
  return bands.map((band) => {
    const bandItems = items.filter((item) => item.bandId === band.id);
    const availableUnits = bandItems.reduce(
      (sum, item) => sum + getAvailableToPromise(item),
      0,
    );
    const totalDaysOfCover = bandItems.reduce(
      (sum, item) => sum + item.daysOfCover,
      0,
    );

    return {
      ...band,
      skuCount: bandItems.length,
      availableUnits,
      averageDaysOfCover:
        bandItems.length > 0 ? Math.round(totalDaysOfCover / bandItems.length) : 0,
      shareOfTrackedSkus:
        items.length > 0 ? Math.round((bandItems.length / items.length) * 100) : 0,
    };
  });
}

export function getInventoryBayCategorySummaries(
  items: InventoryBayItem[],
  categories: InventoryBayCategory[],
): InventoryBayCategorySummary[] {
  return categories
    .map((category) => {
      const categoryItems = items
        .filter((item) => item.categoryId === category.id)
        .sort(compareItemsByRisk);
      const focusItem = categoryItems[0];

      if (!focusItem) {
        return null;
      }

      return {
        ...category,
        skuCount: categoryItems.length,
        lowStockCount: categoryItems.filter((item) => item.bandId !== "healthy")
          .length,
        criticalCount: categoryItems.filter((item) => item.bandId === "critical")
          .length,
        availableUnits: categoryItems.reduce(
          (sum, item) => sum + getAvailableToPromise(item),
          0,
        ),
        fillRate: getFillRate(categoryItems),
        focusItem,
      };
    })
    .filter((summary): summary is InventoryBayCategorySummary => Boolean(summary));
}

export function getInventoryBayLowStockViews(
  items: InventoryBayItem[],
  categories: InventoryBayCategory[],
  bands: InventoryBayBand[],
  alerts: InventoryBayLowStockAlert[],
): InventoryBayLowStockView[] {
  return alerts
    .map((alert) => {
      const item = items.find((entry) => entry.id === alert.itemId);

      if (!item) {
        return null;
      }

      const category = categories.find((entry) => entry.id === item.categoryId);
      const band = bands.find((entry) => entry.id === item.bandId);

      if (!category || !band) {
        return null;
      }

      return {
        ...alert,
        item,
        category,
        band,
        availableUnits: getAvailableToPromise(item),
      };
    })
    .filter((alert): alert is InventoryBayLowStockView => Boolean(alert))
    .sort((left, right) => {
      const levelDifference =
        alertLevelSortOrder[left.level] - alertLevelSortOrder[right.level];

      if (levelDifference !== 0) {
        return levelDifference;
      }

      return compareItemsByRisk(left.item, right.item);
    });
}
