export type InventoryBayBandId = "healthy" | "watch" | "critical";

export type InventoryBayPriority = "Immediate" | "This Shift" | "Monitor";

export type InventoryBayBand = {
  id: InventoryBayBandId;
  name: string;
  stateLabel: string;
  eyebrow: string;
  description: string;
  badgeClassName: string;
  surfaceClassName: string;
  meterClassName: string;
};

export type InventoryBayCategory = {
  id: string;
  name: string;
  description: string;
  bay: string;
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
  statusDetail: string;
  actionLabel: string;
  tags: string[];
};

export type InventoryBayRecommendation = {
  id: string;
  itemId: string;
  priority: InventoryBayPriority;
  title: string;
  summary: string;
  action: string;
  owner: string;
  dueBy: string;
};

export type InventoryBayMetrics = {
  trackedSkus: number;
  atRiskSkus: number;
  availableToPromise: number;
  recommendationCount: number;
};

export type InventoryBayBandSummary = InventoryBayBand & {
  itemCount: number;
  unitsOnHand: number;
  availableToPromise: number;
};

export type InventoryBaySection = InventoryBayCategory & {
  items: InventoryBayItem[];
  bandCounts: Record<InventoryBayBandId, number>;
  availableToPromise: number;
};

export type InventoryBayRecommendationView = InventoryBayRecommendation & {
  item: InventoryBayItem;
  band: InventoryBayBand;
  category: InventoryBayCategory;
};

export const inventoryBayBands: InventoryBayBand[] = [
  {
    id: "healthy",
    name: "Healthy",
    stateLabel: "Available",
    eyebrow: "Above target",
    description: "Stock is above the reorder point with enough cover for normal demand.",
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-800",
    surfaceClassName:
      "border-emerald-200/80 bg-[linear-gradient(135deg,rgba(236,253,245,0.98),rgba(240,253,250,0.92))]",
    meterClassName: "bg-emerald-500",
  },
  {
    id: "watch",
    name: "Watch",
    stateLabel: "Low Stock",
    eyebrow: "Drifting low",
    description: "Coverage is tightening and needs a transfer or replenishment soon.",
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-800",
    surfaceClassName:
      "border-amber-200/80 bg-[linear-gradient(135deg,rgba(255,251,235,0.98),rgba(255,247,237,0.92))]",
    meterClassName: "bg-amber-500",
  },
  {
    id: "critical",
    name: "Critical",
    stateLabel: "Depleted",
    eyebrow: "Below reorder point",
    description: "Current stock cannot safely cover expected pulls without intervention.",
    badgeClassName: "border-rose-200 bg-rose-50 text-rose-800",
    surfaceClassName:
      "border-rose-200/80 bg-[linear-gradient(135deg,rgba(255,241,242,0.98),rgba(255,247,237,0.92))]",
    meterClassName: "bg-rose-500",
  },
];

export const inventoryBayCategories: InventoryBayCategory[] = [
  {
    id: "cold-storage",
    name: "Cold Storage",
    description: "Temperature-sensitive consumables staged for outbound kits and clinic loads.",
    bay: "Bay North / Freezer lane",
  },
  {
    id: "fast-picks",
    name: "Fast Picks",
    description: "High-turn handheld hardware and smart lane components used by the pick wall.",
    bay: "Bay East / Pick wall",
  },
  {
    id: "packing-supplies",
    name: "Packing Supplies",
    description: "Packout materials that keep parcel prep flowing through the late shift.",
    bay: "Bay South / Bench run",
  },
  {
    id: "returns-bench",
    name: "Returns Bench",
    description: "Recovery and QA inventory reserved for intake, inspection, and refurb loops.",
    bay: "Bay West / QA return cage",
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
    statusDetail: "Two outbound vaccine kits leave on the next freezer sweep.",
    actionLabel: "Cross-bay transfer queued",
    tags: ["Cold chain", "Reusable", "Below target"],
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
    nextDelivery: "Supplier top-up due Wed 22 Apr",
    owner: "Receiving Coordinator",
    location: "Freezer rack A1",
    statusDetail: "Buffer recovered after last week's donor clinic surge.",
    actionLabel: "Stable buffer",
    tags: ["Insulated", "Clinic support", "Shelf-ready"],
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
    statusDetail: "Every handheld cleared the morning diagnostics sweep.",
    actionLabel: "No action required",
    tags: ["RF scan", "Lane-ready", "High-turn"],
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
    nextDelivery: "Firmware hold blocks inbound replacement lot",
    owner: "Automation Reliability",
    location: "Pick wall control cabinet",
    statusDetail:
      "Two pods failed after the lane remap and only partial replacement stock remains.",
    actionLabel: "Supplier escalation required",
    tags: ["Automation", "Firmware hold", "Lane recovery"],
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
    statusDetail: "Promo bundles are burning through tape faster than forecast.",
    actionLabel: "Top off before night wave",
    tags: ["Consumable", "Promo load", "Bench stock"],
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
    nextDelivery: "Supplier blanket order clears every Friday",
    owner: "Packout Lead",
    location: "Pallet stack B7",
    statusDetail: "Still above presentation target after the weekend pull.",
    actionLabel: "Healthy lane",
    tags: ["Parcel prep", "Insulated", "Stable"],
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
    nextDelivery: "Vendor expedite requested for Tue 21 Apr",
    owner: "Returns Recovery",
    location: "Refurb bench cage 3",
    statusDetail: "RMA intake spike consumed the emergency roll over the weekend.",
    actionLabel: "Emergency buy in flight",
    tags: ["Returns", "QA hold", "Expedite"],
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
    statusDetail: "Night shift requested a larger hold buffer for suspect batches.",
    actionLabel: "Replenish before handoff",
    tags: ["Inspection", "Printed stock", "Shift handoff"],
  },
];

export const inventoryBayRecommendations: InventoryBayRecommendation[] = [
  {
    id: "escalate-pick-to-light-pods",
    itemId: "pick-to-light-pods",
    priority: "Immediate",
    title: "Escalate Pick-to-Light Pods firmware batch",
    summary: "Only two pods remain unreserved and the inbound lot is blocked by a firmware hold.",
    action: "Convert the pending lot to a manual QA release and shift two healthy pods from the training lane.",
    owner: "Automation Reliability",
    dueBy: "Before 13:30 wave launch",
  },
  {
    id: "convert-refurb-bin-seals-buy",
    itemId: "refurb-bin-seals",
    priority: "Immediate",
    title: "Convert Refurb Bin Seals to emergency buy",
    summary: "Returns intake is running hotter than forecast and seals drop below minimum cover tonight.",
    action: "Approve the expedite request and reserve the next dock receipt for QA recovery only.",
    owner: "Returns Recovery",
    dueBy: "Today by 15:00",
  },
  {
    id: "pull-cryo-gel-transfer",
    itemId: "cryo-gel-packs",
    priority: "This Shift",
    title: "Pull a cross-bay transfer for Cryo Gel Packs",
    summary: "Seven days of cover is workable, but the next clinic block will consume most of the loose stock.",
    action: "Move eight packs from Bay 2 before the afternoon freezer sweep starts.",
    owner: "Cold Chain Lead",
    dueBy: "During 14:30 freezer sweep",
  },
  {
    id: "rebuild-qa-hold-buffer",
    itemId: "qa-hold-cards",
    priority: "Monitor",
    title: "Rebuild QA Hold Cards buffer before night shift",
    summary: "The print run is already scheduled, so the risk is limited to a missed handoff window.",
    action: "Stage the next 20-card pack directly at the inspection counter after print checks finish.",
    owner: "Quality Desk",
    dueBy: "At 16:45 print release",
  },
];

export const inventoryBayPriorityStyles: Record<
  InventoryBayPriority,
  string
> = {
  Immediate: "border-rose-200 bg-rose-50 text-rose-800",
  "This Shift": "border-amber-200 bg-amber-50 text-amber-800",
  Monitor: "border-slate-200 bg-slate-100 text-slate-700",
};

const bandSortOrder: Record<InventoryBayBandId, number> = {
  critical: 0,
  watch: 1,
  healthy: 2,
};

const prioritySortOrder: Record<InventoryBayPriority, number> = {
  Immediate: 0,
  "This Shift": 1,
  Monitor: 2,
};

export function getAvailableToPromise(item: InventoryBayItem) {
  return Math.max(item.unitsOnHand - item.reservedUnits, 0);
}

export function getStockFillPercentage(item: InventoryBayItem) {
  return Math.min(100, Math.round((item.unitsOnHand / item.targetUnits) * 100));
}

export function getInventoryBayMetrics(
  items: InventoryBayItem[],
  recommendations: InventoryBayRecommendation[],
): InventoryBayMetrics {
  return {
    trackedSkus: items.length,
    atRiskSkus: items.filter((item) => item.bandId !== "healthy").length,
    availableToPromise: items.reduce(
      (sum, item) => sum + getAvailableToPromise(item),
      0,
    ),
    recommendationCount: recommendations.length,
  };
}

export function getInventoryBayBandSummaries(
  items: InventoryBayItem[],
  bands: InventoryBayBand[],
): InventoryBayBandSummary[] {
  return bands.map((band) => {
    const bandItems = items.filter((item) => item.bandId === band.id);

    return {
      ...band,
      itemCount: bandItems.length,
      unitsOnHand: bandItems.reduce((sum, item) => sum + item.unitsOnHand, 0),
      availableToPromise: bandItems.reduce(
        (sum, item) => sum + getAvailableToPromise(item),
        0,
      ),
    };
  });
}

export function getInventoryBaySections(
  items: InventoryBayItem[],
  categories: InventoryBayCategory[],
): InventoryBaySection[] {
  return categories
    .map((category) => {
      const categoryItems = items
        .filter((item) => item.categoryId === category.id)
        .sort((left, right) => {
          const bandDifference =
            bandSortOrder[left.bandId] - bandSortOrder[right.bandId];

          if (bandDifference !== 0) {
            return bandDifference;
          }

          return left.daysOfCover - right.daysOfCover;
        });

      return {
        ...category,
        items: categoryItems,
        bandCounts: {
          healthy: categoryItems.filter((item) => item.bandId === "healthy").length,
          watch: categoryItems.filter((item) => item.bandId === "watch").length,
          critical: categoryItems.filter((item) => item.bandId === "critical").length,
        },
        availableToPromise: categoryItems.reduce(
          (sum, item) => sum + getAvailableToPromise(item),
          0,
        ),
      };
    })
    .filter((section) => section.items.length > 0);
}

export function getInventoryBayRecommendationViews(
  items: InventoryBayItem[],
  categories: InventoryBayCategory[],
  bands: InventoryBayBand[],
  recommendations: InventoryBayRecommendation[],
): InventoryBayRecommendationView[] {
  return recommendations
    .map((recommendation) => {
      const item = items.find((entry) => entry.id === recommendation.itemId);

      if (!item) {
        return null;
      }

      const category = categories.find((entry) => entry.id === item.categoryId);
      const band = bands.find((entry) => entry.id === item.bandId);

      if (!category || !band) {
        return null;
      }

      return {
        ...recommendation,
        item,
        category,
        band,
      };
    })
    .filter((recommendation): recommendation is InventoryBayRecommendationView =>
      Boolean(recommendation),
    )
    .sort((left, right) => {
      const priorityDifference =
        prioritySortOrder[left.priority] - prioritySortOrder[right.priority];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return bandSortOrder[left.band.id] - bandSortOrder[right.band.id];
    });
}
