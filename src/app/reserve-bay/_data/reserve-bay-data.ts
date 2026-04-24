export type ReservationStatus = "confirmed" | "pending" | "expired";
export type AvailabilityLevel = "high" | "moderate" | "low";
export type AllocationCategory = "inbound" | "outbound" | "overflow" | "maintenance";

export interface Reservation {
  id: string;
  bayCode: string;
  carrier: string;
  status: ReservationStatus;
  windowStart: string;
  windowEnd: string;
  trailerId: string;
  loadType: string;
  notes: string;
}

export interface AvailabilitySnapshot {
  id: string;
  zone: string;
  totalBays: number;
  occupiedBays: number;
  level: AvailabilityLevel;
  nextFreeAt: string;
  peakWindow: string;
}

export interface AllocationEntry {
  id: string;
  category: AllocationCategory;
  baysAllocated: number;
  baysUsed: number;
  utilization: number;
  label: string;
}

export const reserveBaySummary = {
  eyebrow: "Reserve Bay",
  title: "Manage dock reservations and bay allocation across facilities.",
  description:
    "Track reservation status, monitor real-time availability by zone, and review how bays are allocated across inbound, outbound, overflow, and maintenance categories.",
  stats: [
    {
      label: "Total bays",
      value: "48",
      tone: "high" as AvailabilityLevel,
    },
    {
      label: "Currently occupied",
      value: "31",
      tone: "moderate" as AvailabilityLevel,
    },
    {
      label: "Reservations today",
      value: "22",
      tone: "high" as AvailabilityLevel,
    },
    {
      label: "Avg turnaround",
      value: "38 min",
      tone: "moderate" as AvailabilityLevel,
    },
  ],
};

export const reserveBayReservations: Reservation[] = [
  {
    id: "res-001",
    bayCode: "B-12",
    carrier: "Northline Freight",
    status: "confirmed",
    windowStart: "06:00",
    windowEnd: "08:30",
    trailerId: "NLF-4821",
    loadType: "Dry goods",
    notes: "Priority unload — perishable buffer required on adjacent bay.",
  },
  {
    id: "res-002",
    bayCode: "B-07",
    carrier: "Summit Logistics",
    status: "confirmed",
    windowStart: "07:15",
    windowEnd: "09:00",
    trailerId: "SML-1193",
    loadType: "Palletized electronics",
    notes: "Requires forklift team Alpha on standby for high-value scan.",
  },
  {
    id: "res-003",
    bayCode: "B-22",
    carrier: "Coastway Express",
    status: "pending",
    windowStart: "09:30",
    windowEnd: "11:00",
    trailerId: "CWE-3347",
    loadType: "Refrigerated produce",
    notes: "Awaiting cold-chain dock confirmation from facilities.",
  },
  {
    id: "res-004",
    bayCode: "B-03",
    carrier: "Midland Carriers",
    status: "expired",
    windowStart: "04:00",
    windowEnd: "05:30",
    trailerId: "MLC-0782",
    loadType: "Bulk industrial",
    notes: "Carrier no-show — bay released back to overflow pool.",
  },
  {
    id: "res-005",
    bayCode: "B-18",
    carrier: "Tristate Hauling",
    status: "confirmed",
    windowStart: "10:00",
    windowEnd: "12:30",
    trailerId: "TSH-5590",
    loadType: "Mixed freight",
    notes: "Double-door access needed for tandem unload sequence.",
  },
];

export const reserveBayAvailability: AvailabilitySnapshot[] = [
  {
    id: "zone-a",
    zone: "Zone A — Inbound dock",
    totalBays: 12,
    occupiedBays: 9,
    level: "low",
    nextFreeAt: "08:45",
    peakWindow: "06:00–10:00",
  },
  {
    id: "zone-b",
    zone: "Zone B — Outbound staging",
    totalBays: 16,
    occupiedBays: 10,
    level: "moderate",
    nextFreeAt: "07:30",
    peakWindow: "14:00–18:00",
  },
  {
    id: "zone-c",
    zone: "Zone C — Overflow / flex",
    totalBays: 10,
    occupiedBays: 5,
    level: "high",
    nextFreeAt: "Available now",
    peakWindow: "11:00–15:00",
  },
  {
    id: "zone-d",
    zone: "Zone D — Maintenance reserve",
    totalBays: 10,
    occupiedBays: 7,
    level: "moderate",
    nextFreeAt: "09:15",
    peakWindow: "08:00–12:00",
  },
];

export const reserveBayAllocations: AllocationEntry[] = [
  {
    id: "alloc-inbound",
    category: "inbound",
    baysAllocated: 14,
    baysUsed: 11,
    utilization: 79,
    label: "Inbound receiving",
  },
  {
    id: "alloc-outbound",
    category: "outbound",
    baysAllocated: 16,
    baysUsed: 12,
    utilization: 75,
    label: "Outbound dispatch",
  },
  {
    id: "alloc-overflow",
    category: "overflow",
    baysAllocated: 10,
    baysUsed: 4,
    utilization: 40,
    label: "Overflow staging",
  },
  {
    id: "alloc-maintenance",
    category: "maintenance",
    baysAllocated: 8,
    baysUsed: 4,
    utilization: 50,
    label: "Maintenance hold",
  },
];
