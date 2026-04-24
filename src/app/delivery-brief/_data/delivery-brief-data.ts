export type MilestoneStatus = "completed" | "in-progress" | "upcoming";
export type CheckpointSeverity = "normal" | "delayed" | "critical";

export interface DeliveryBriefOverview {
  eyebrow: string;
  title: string;
  description: string;
  shipmentId: string;
  origin: string;
  destination: string;
}

export interface DeliveryStat {
  label: string;
  value: string;
  detail: string;
}

export interface Milestone {
  id: string;
  label: string;
  status: MilestoneStatus;
  completedAt: string | null;
  summary: string;
}

export interface Checkpoint {
  id: string;
  location: string;
  timestamp: string;
  severity: CheckpointSeverity;
  carrier: string;
  detail: string;
}

export interface FollowUpNote {
  id: string;
  author: string;
  timestamp: string;
  body: string;
  priority: "info" | "action" | "warning";
}

export const deliveryBriefOverview: DeliveryBriefOverview = {
  eyebrow: "Delivery Brief",
  title:
    "Track milestones, review checkpoints, and manage follow-up notes for every shipment.",
  description:
    "A consolidated view of shipment milestones, transit checkpoints, and team follow-up notes that keeps delivery operations transparent from origin to destination.",
  shipmentId: "SHP-2026-04887",
  origin: "Portland, OR",
  destination: "Austin, TX",
};

export const deliveryStats: DeliveryStat[] = [
  {
    label: "Milestones reached",
    value: "3 / 5",
    detail:
      "Label created, picked up, and in-transit milestones complete. Customs and delivery pending.",
  },
  {
    label: "Checkpoints logged",
    value: "6",
    detail:
      "Six transit checkpoints recorded across three facilities and two carrier hand-offs.",
  },
  {
    label: "Follow-up notes",
    value: "4",
    detail:
      "Two action items, one warning about a delay, and one informational status update.",
  },
];

export const milestones: Milestone[] = [
  {
    id: "ms-label",
    label: "Label created",
    status: "completed",
    completedAt: "2026-04-20 08:15 PDT",
    summary:
      "Shipping label generated and tracking number assigned. Origin scan expected within 24 hours.",
  },
  {
    id: "ms-pickup",
    label: "Picked up",
    status: "completed",
    completedAt: "2026-04-20 14:30 PDT",
    summary:
      "Package collected from Portland distribution center by primary carrier. Weight and dimensions verified.",
  },
  {
    id: "ms-transit",
    label: "In transit",
    status: "in-progress",
    completedAt: null,
    summary:
      "Shipment is moving through the carrier network. Currently at the Denver sorting facility awaiting next-leg dispatch.",
  },
  {
    id: "ms-customs",
    label: "Customs clearance",
    status: "upcoming",
    completedAt: null,
    summary:
      "Domestic shipment — no customs clearance required. Milestone will auto-complete on arrival at destination hub.",
  },
  {
    id: "ms-delivered",
    label: "Delivered",
    status: "upcoming",
    completedAt: null,
    summary:
      "Final delivery to the Austin receiving dock. Estimated arrival within two business days.",
  },
];

export const checkpoints: Checkpoint[] = [
  {
    id: "cp-001",
    location: "Portland Distribution Center",
    timestamp: "2026-04-20 14:30 PDT",
    severity: "normal",
    carrier: "West Coast Freight",
    detail:
      "Origin scan completed. Package loaded onto outbound trailer WCF-4421 for eastbound route.",
  },
  {
    id: "cp-002",
    location: "Boise Relay Hub",
    timestamp: "2026-04-21 03:12 PDT",
    severity: "normal",
    carrier: "West Coast Freight",
    detail:
      "Arrival scan at Boise relay hub. Package transferred to cross-dock lane for next-day dispatch.",
  },
  {
    id: "cp-003",
    location: "Salt Lake City Sort Facility",
    timestamp: "2026-04-21 19:45 PDT",
    severity: "normal",
    carrier: "Mountain Line Logistics",
    detail:
      "Carrier hand-off completed. Package sorted into southbound container ML-8803.",
  },
  {
    id: "cp-004",
    location: "Denver Sorting Facility",
    timestamp: "2026-04-22 11:20 PDT",
    severity: "delayed",
    carrier: "Mountain Line Logistics",
    detail:
      "Package held at Denver facility due to trailer capacity constraints. Re-dispatched on next available load.",
  },
  {
    id: "cp-005",
    location: "Amarillo Transfer Station",
    timestamp: "2026-04-23 06:55 PDT",
    severity: "normal",
    carrier: "Southern Express",
    detail:
      "Second carrier hand-off to Southern Express. Package scanned onto trailer SE-2210 bound for Dallas.",
  },
  {
    id: "cp-006",
    location: "Dallas Regional Hub",
    timestamp: "2026-04-24 09:30 PDT",
    severity: "critical",
    carrier: "Southern Express",
    detail:
      "Package flagged for address verification at Dallas hub. Hold placed pending shipper confirmation. Expected resolution within 4 hours.",
  },
];

export const followUpNotes: FollowUpNote[] = [
  {
    id: "fn-001",
    author: "L. Nguyen",
    timestamp: "2026-04-24 10:15 PDT",
    body: "Dallas hub placed a hold on the package for address verification. I've confirmed the Austin delivery address with the customer — releasing the hold now.",
    priority: "action",
  },
  {
    id: "fn-002",
    author: "R. Kapoor",
    timestamp: "2026-04-23 14:20 PDT",
    body: "Denver delay added roughly 18 hours to the transit time. Updated the customer-facing ETA from April 24 to April 26.",
    priority: "warning",
  },
  {
    id: "fn-003",
    author: "T. Alvarez",
    timestamp: "2026-04-22 08:45 PDT",
    body: "Carrier hand-off from West Coast Freight to Mountain Line Logistics went smoothly. No issues flagged at the Salt Lake sort facility.",
    priority: "info",
  },
  {
    id: "fn-004",
    author: "M. Brooks",
    timestamp: "2026-04-21 16:30 PDT",
    body: "Escalate to logistics lead if the Denver hold extends beyond 24 hours. We have a backup route through Albuquerque that can shave a day off transit.",
    priority: "action",
  },
];
