export type ParcelLaneHealth = "Stable" | "Watch" | "Exception";

export type ParcelShipmentStatus =
  | "Manifested"
  | "Queued"
  | "Delayed"
  | "Exception";

export type ParcelExceptionSeverity =
  | "Monitor"
  | "Action Required"
  | "Critical";

export type ParcelHubLane = {
  id: string;
  name: string;
  routeLabel: string;
  summary: string;
  coordinator: string;
  dock: string;
  departureWindow: string;
  serviceMix: string;
  health: ParcelLaneHealth;
  capacityPercent: number;
};

export type ParcelHubParcel = {
  id: string;
  laneId: string;
  trackingCode: string;
  recipient: string;
  destination: string;
  packageCount: number;
  weightKg: number;
  serviceLevel: string;
  status: ParcelShipmentStatus;
  owner: string;
  summary: string;
  checkpointLabel: string;
  promiseWindow: string;
  nextAction: string;
  exceptionValue: string;
  tags: string[];
  exceptionId?: string;
};

export type ParcelHubExceptionSummary = {
  id: string;
  laneId: string;
  severity: ParcelExceptionSeverity;
  code: string;
  title: string;
  summary: string;
  owner: string;
  updatedAt: string;
  valueAtRisk: string;
  customerImpact: string;
  recommendedAction: string;
  affectedParcelIds: string[];
  checkpointNotes: string[];
};

export type ParcelHubMetric = {
  id: string;
  label: string;
  value: string;
  detail: string;
};

export type ParcelHubLaneView = ParcelHubLane & {
  parcels: ParcelHubParcel[];
  packageCount: number;
  delayedParcelCount: number;
  exceptionCount: number;
};

export type ParcelHubExceptionView = ParcelHubExceptionSummary & {
  lane: ParcelHubLane;
  parcels: ParcelHubParcel[];
};

export type ParcelHubView = {
  lanes: ParcelHubLaneView[];
  metrics: ParcelHubMetric[];
  exceptions: ParcelHubExceptionView[];
  highlightedException: ParcelHubExceptionView;
  totalParcelCount: number;
  totalPackageCount: number;
};

export const parcelHubLanes: ParcelHubLane[] = [
  {
    id: "northeast-priority",
    name: "Northeast Priority",
    routeLabel: "Memphis -> Newark -> Boston",
    summary:
      "Medical kits and retail replenishment parcels are staged on the same late eastbound release.",
    coordinator: "Lena Ortiz",
    dock: "Door A3",
    departureWindow: "Departs 18:40 ET",
    serviceMix: "Overnight / 2-day",
    health: "Watch",
    capacityPercent: 78,
  },
  {
    id: "midwest-recovery",
    name: "Midwest Recovery",
    routeLabel: "Dallas -> Kansas City -> Chicago",
    summary:
      "Reload timing is compressed after severe weather pushed two linehaul handoffs into the same lane.",
    coordinator: "Theo Ramsey",
    dock: "Door B1",
    departureWindow: "Wheels up 19:05 CT",
    serviceMix: "Deferred / Ground rescue",
    health: "Exception",
    capacityPercent: 91,
  },
  {
    id: "sunbelt-sort",
    name: "Sunbelt Sort",
    routeLabel: "Phoenix -> Atlanta -> Miami",
    summary:
      "The southern parcel run is clearing on time with only small relabel work at the origin scan.",
    coordinator: "Ari Patel",
    dock: "Door C4",
    departureWindow: "Departs 17:55 MT",
    serviceMix: "Saver / Residential",
    health: "Stable",
    capacityPercent: 64,
  },
  {
    id: "returns-consolidation",
    name: "Returns Consolidation",
    routeLabel: "Seattle -> Reno -> Los Angeles",
    summary:
      "Reverse logistics parcels are grouped for late-night linehaul after QA and claims review.",
    coordinator: "Monica Reyes",
    dock: "Door D2",
    departureWindow: "Departs 20:15 PT",
    serviceMix: "Returns / Refurb",
    health: "Watch",
    capacityPercent: 72,
  },
];

export const parcelHubParcels: ParcelHubParcel[] = [
  {
    id: "parcel-bio-204817",
    laneId: "northeast-priority",
    trackingCode: "PH-2048-17",
    recipient: "North Harbor Clinic",
    destination: "Boston, MA",
    packageCount: 8,
    weightKg: 16.4,
    serviceLevel: "Priority Medical",
    status: "Exception",
    owner: "Jules Harper",
    summary:
      "Cold-chain tote cleared manifesting but missed the final Newark sort confirmation.",
    checkpointLabel: "Awaiting Newark scan reconciliation",
    promiseWindow: "Deliver before Tue 09:30 local",
    nextAction: "Confirm tote seal and release the hand-carried fallback bag.",
    exceptionValue: "4 care kits at promise risk",
    tags: ["Cold chain", "Clinic restock", "Escalated"],
    exceptionId: "exception-newark-scan-gap",
  },
  {
    id: "parcel-luma-774221",
    laneId: "northeast-priority",
    trackingCode: "PH-7742-21",
    recipient: "Luma Retail Group",
    destination: "Providence, RI",
    packageCount: 12,
    weightKg: 38.2,
    serviceLevel: "2-Day Parcel",
    status: "Queued",
    owner: "Lena Ortiz",
    summary:
      "Floor-ready replenishment cartons are wrapped and waiting for the shared eastbound trailer.",
    checkpointLabel: "Docked and sealed at Door A3",
    promiseWindow: "Deliver by Wed 17:00 local",
    nextAction: "Hold until the medical priority pallets clear the departure gate.",
    exceptionValue: "No current exception value",
    tags: ["Retail", "Store launch", "Trailer share"],
  },
  {
    id: "parcel-halo-661093",
    laneId: "northeast-priority",
    trackingCode: "PH-6610-93",
    recipient: "Halo Diagnostics",
    destination: "Newark, NJ",
    packageCount: 5,
    weightKg: 11.7,
    serviceLevel: "Overnight",
    status: "Manifested",
    owner: "Jules Harper",
    summary:
      "Replacement analyzers were manifested early and remain within the protected lane cut-off.",
    checkpointLabel: "Manifest verified against airway bill",
    promiseWindow: "Deliver before Tue 08:00 local",
    nextAction: "Keep on the lead pallet and maintain direct unload handling.",
    exceptionValue: "No current exception value",
    tags: ["Diagnostic", "Overnight", "Protected"],
  },
  {
    id: "parcel-atlas-122340",
    laneId: "midwest-recovery",
    trackingCode: "PH-1223-40",
    recipient: "Atlas Home",
    destination: "Chicago, IL",
    packageCount: 16,
    weightKg: 52.3,
    serviceLevel: "Ground Rescue",
    status: "Delayed",
    owner: "Theo Ramsey",
    summary:
      "Replacement inventory missed the first transfer after a weather diversion shortened reload time.",
    checkpointLabel: "Staged for rescue linehaul at Door B1",
    promiseWindow: "Deliver by Tue 13:00 local",
    nextAction: "Swap to the dedicated rescue shuttle if the reload window closes again.",
    exceptionValue: "$8.2K margin exposure",
    tags: ["Weather recovery", "Retail", "Rescue shuttle"],
    exceptionId: "exception-chicago-reload-window",
  },
  {
    id: "parcel-summit-880144",
    laneId: "midwest-recovery",
    trackingCode: "PH-8801-44",
    recipient: "Summit Bio",
    destination: "Aurora, IL",
    packageCount: 9,
    weightKg: 19.8,
    serviceLevel: "Deferred Medical",
    status: "Exception",
    owner: "Theo Ramsey",
    summary:
      "Biotech samples are packaged and ready, but the late handoff can still slip beyond the safe reload window.",
    checkpointLabel: "Waiting on linehaul reassignment",
    promiseWindow: "Deliver before Tue 10:15 local",
    nextAction: "Escalate to the Chicago gate supervisor for the late acceptance override.",
    exceptionValue: "$10.2K promise exposure",
    tags: ["Biotech", "Critical timing", "Gate override"],
    exceptionId: "exception-chicago-reload-window",
  },
  {
    id: "parcel-verdant-553109",
    laneId: "sunbelt-sort",
    trackingCode: "PH-5531-09",
    recipient: "Verdant Market",
    destination: "Miami, FL",
    packageCount: 20,
    weightKg: 46.1,
    serviceLevel: "Residential Saver",
    status: "Manifested",
    owner: "Ari Patel",
    summary:
      "Promo bundles are manifested and tracking against the normal sort-to-linehaul window.",
    checkpointLabel: "Origin sort completed on schedule",
    promiseWindow: "Deliver by Thu 20:00 local",
    nextAction: "Release on the standard southbound residential wave.",
    exceptionValue: "No current exception value",
    tags: ["Promo", "Residential", "On pace"],
  },
  {
    id: "parcel-citrine-990883",
    laneId: "sunbelt-sort",
    trackingCode: "PH-9908-83",
    recipient: "Citrine Beauty",
    destination: "Atlanta, GA",
    packageCount: 7,
    weightKg: 14.5,
    serviceLevel: "2-Day Parcel",
    status: "Queued",
    owner: "Ari Patel",
    summary:
      "Cosmetics refill cartons were relabeled at origin and are queued for the next sort departure.",
    checkpointLabel: "Relabel complete, awaiting outbound cage release",
    promiseWindow: "Deliver by Wed 18:30 local",
    nextAction: "Verify the replacement labels on the last two cartons before cage close.",
    exceptionValue: "Minor relabel effort only",
    tags: ["Relabel", "Retail", "Queued"],
  },
  {
    id: "parcel-nova-088142",
    laneId: "returns-consolidation",
    trackingCode: "PH-0881-42",
    recipient: "Nova Devices Returns",
    destination: "Reno, NV",
    packageCount: 11,
    weightKg: 27.6,
    serviceLevel: "Returns Consolidation",
    status: "Delayed",
    owner: "Monica Reyes",
    summary:
      "Refurb units are repacked, but the claim code on one cage still needs manual verification.",
    checkpointLabel: "QA cleared; claim code verification pending",
    promiseWindow: "Linehaul close at Tue 21:10 local",
    nextAction: "Attach the corrected claim label before the consolidation cage is sealed.",
    exceptionValue: "11 units held off the refurb line",
    tags: ["Refurb", "Claims", "Manual verify"],
    exceptionId: "exception-claim-code-verification",
  },
  {
    id: "parcel-kite-440205",
    laneId: "returns-consolidation",
    trackingCode: "PH-4402-05",
    recipient: "Kite Audio Returns",
    destination: "Los Angeles, CA",
    packageCount: 6,
    weightKg: 13.9,
    serviceLevel: "Returns Consolidation",
    status: "Queued",
    owner: "Monica Reyes",
    summary:
      "Return authorizations and bench notes are attached; the cage is ready once the claim review finishes.",
    checkpointLabel: "Queued in return cage 4",
    promiseWindow: "Linehaul close at Tue 21:10 local",
    nextAction: "Keep paired with the Nova Devices pallet for the LA drop.",
    exceptionValue: "No direct exposure",
    tags: ["Returns", "Bench notes", "Queued"],
  },
];

export const parcelHubExceptions: ParcelHubExceptionSummary[] = [
  {
    id: "exception-chicago-reload-window",
    laneId: "midwest-recovery",
    severity: "Critical",
    code: "CHI-REL-17",
    title: "Chicago reload window is close to breach",
    summary:
      "Weather spillover has narrowed the recovery lane to a single late reload opportunity for two priority consignments.",
    owner: "Theo Ramsey",
    updatedAt: "Updated 16:10 CT",
    valueAtRisk: "$18.4K across two recovery consignments",
    customerImpact:
      "Atlas Home and Summit Bio will miss promised restock windows if the late gate override is denied.",
    recommendedAction:
      "Move both consignments to the rescue shuttle and secure the gate override before 18:25 CT.",
    affectedParcelIds: ["parcel-atlas-122340", "parcel-summit-880144"],
    checkpointNotes: [
      "Kansas City transfer arrived 42 minutes late after hail hold clearance.",
      "Rescue shuttle still has 24 cubic feet available for a hard swap.",
      "Chicago gate control requested final carton counts before approving the late unload.",
    ],
  },
  {
    id: "exception-newark-scan-gap",
    laneId: "northeast-priority",
    severity: "Action Required",
    code: "EWR-SCN-09",
    title: "Newark sort scan gap on cold-chain kits",
    summary:
      "The lane manifest is intact, but one clinic tote never posted the final protected-lane scan in Newark.",
    owner: "Jules Harper",
    updatedAt: "Updated 17:02 ET",
    valueAtRisk: "4 care kits without final protected-lane confirmation",
    customerImpact:
      "North Harbor Clinic needs the kits on-site before the first appointment block tomorrow morning.",
    recommendedAction:
      "Reconcile the scan history, confirm the tote seal, and release the fallback courier bag if no scan appears by 17:20 ET.",
    affectedParcelIds: ["parcel-bio-204817"],
    checkpointNotes: [
      "Seal verification photo was uploaded from the Memphis origin ramp.",
      "Newark cage camera shows the tote crossing the protected lane handoff.",
      "Fallback courier bag is staged at the Newark control desk.",
    ],
  },
  {
    id: "exception-claim-code-verification",
    laneId: "returns-consolidation",
    severity: "Monitor",
    code: "RNO-CLM-22",
    title: "Claim code verification is slowing the returns cage close",
    summary:
      "One refurb pallet cannot be sealed until the manual claim code matches the intake photos and return authorization.",
    owner: "Monica Reyes",
    updatedAt: "Updated 14:48 PT",
    valueAtRisk: "11 refurb units waiting on bench release",
    customerImpact:
      "The refurb line loses a half-shift of intake if the pallet rolls to the next departure window.",
    recommendedAction:
      "Finish the claim review, print the corrected label, and close the Reno pallet before 19:40 PT.",
    affectedParcelIds: ["parcel-nova-088142"],
    checkpointNotes: [
      "QA notes already confirm the device serials and cosmetic grade.",
      "The replacement claim label is queued at the returns printer.",
      "Reno intake can still absorb the pallet if it leaves on the current linehaul.",
    ],
  },
];

const severityRank: Record<ParcelExceptionSeverity, number> = {
  Critical: 0,
  "Action Required": 1,
  Monitor: 2,
};

export function getParcelHubView(): ParcelHubView {
  const laneMap = new Map(parcelHubLanes.map((lane) => [lane.id, lane]));

  const lanes = parcelHubLanes.map((lane) => {
    const parcels = parcelHubParcels.filter((parcel) => parcel.laneId === lane.id);
    const exceptionCount = parcelHubExceptions.filter(
      (exception) => exception.laneId === lane.id,
    ).length;
    const packageCount = parcels.reduce(
      (sum, parcel) => sum + parcel.packageCount,
      0,
    );
    const delayedParcelCount = parcels.filter(
      (parcel) => parcel.status === "Delayed" || parcel.status === "Exception",
    ).length;

    return {
      ...lane,
      parcels,
      packageCount,
      delayedParcelCount,
      exceptionCount,
    };
  });

  const exceptions = parcelHubExceptions.map((exception) => {
    const lane = laneMap.get(exception.laneId);

    if (!lane) {
      throw new Error(`Missing parcel hub lane for exception ${exception.id}`);
    }

    return {
      ...exception,
      lane,
      parcels: parcelHubParcels.filter((parcel) =>
        exception.affectedParcelIds.includes(parcel.id),
      ),
    };
  });

  const highlightedException = [...exceptions].sort((left, right) => {
    const rankDifference =
      severityRank[left.severity] - severityRank[right.severity];

    if (rankDifference !== 0) {
      return rankDifference;
    }

    return right.affectedParcelIds.length - left.affectedParcelIds.length;
  })[0];

  if (!highlightedException) {
    throw new Error("Parcel hub view requires at least one exception summary");
  }

  const totalParcelCount = parcelHubParcels.length;
  const totalPackageCount = parcelHubParcels.reduce(
    (sum, parcel) => sum + parcel.packageCount,
    0,
  );
  const watchCount = parcelHubParcels.filter(
    (parcel) => parcel.status === "Delayed" || parcel.status === "Exception",
  ).length;
  const exceptionParcelCount = parcelHubParcels.filter(
    (parcel) => parcel.exceptionId,
  ).length;

  const metrics: ParcelHubMetric[] = [
    {
      id: "active-lanes",
      label: "Active lanes",
      value: String(parcelHubLanes.length),
      detail: "Four independently staged shipment lanes are visible on this route.",
    },
    {
      id: "tracked-parcels",
      label: "Tracked parcels",
      value: String(totalParcelCount),
      detail: `${totalPackageCount} packages are represented across the mock parcel summaries.`,
    },
    {
      id: "watch-parcels",
      label: "Watch or exception",
      value: String(watchCount),
      detail: "Parcels marked delayed or exception stay visible before lane release.",
    },
    {
      id: "exception-summaries",
      label: "Open exceptions",
      value: String(parcelHubExceptions.length),
      detail: `${exceptionParcelCount} parcels currently map to a tracked exception summary.`,
    },
  ];

  return {
    lanes,
    metrics,
    exceptions,
    highlightedException,
    totalParcelCount,
    totalPackageCount,
  };
}
