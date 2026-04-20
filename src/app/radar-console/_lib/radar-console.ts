import {
  radarConsoleOverview,
  radarContacts,
  radarInspectorMetadata,
  radarSectors,
  radarSignalPriorities,
  type RadarContact,
  type RadarInspectorMetadata,
  type RadarSector,
  type RadarSignalPriority,
} from "../_data/radar-console-data";

export type RadarSummaryCard = {
  label: string;
  value: string;
  detail: string;
};

export type RadarSectorCardView = {
  sector: RadarSector;
  contacts: RadarContact[];
  signals: RadarSignalPriority[];
};

export type RadarContactSummaryView = {
  contact: RadarContact;
  sectors: RadarSector[];
  assignedSignals: RadarSignalPriority[];
};

export type InspectorQueueItem = {
  href: string;
  isSelected: boolean;
  signal: RadarSignalPriority;
  sector: RadarSector;
};

export type RadarInspectorView = {
  metadata: RadarInspectorMetadata;
  selectedSignal: RadarSignalPriority;
  selectedSector: RadarSector;
  owners: RadarContact[];
  queue: InspectorQueueItem[];
  fallbackMessage?: string;
};

export type RadarConsoleView = {
  overview: typeof radarConsoleOverview;
  summaryCards: RadarSummaryCard[];
  sectorCards: RadarSectorCardView[];
  contactSummaries: RadarContactSummaryView[];
  inspector: RadarInspectorView;
};

const priorityOrder: Record<RadarSignalPriority["priority"], number> = {
  "priority-1": 0,
  "priority-2": 1,
  "priority-3": 2,
};

function compareSignals(left: RadarSignalPriority, right: RadarSignalPriority) {
  return priorityOrder[left.priority] - priorityOrder[right.priority];
}

function getSectorById(id: string) {
  return radarSectors.find((sector) => sector.id === id);
}

function getContactById(id: string) {
  return radarContacts.find((contact) => contact.id === id);
}

export function readRequestedSignalId(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function resolveRadarConsoleView(
  requestedSignalId?: string,
): RadarConsoleView {
  const selectedSignal =
    radarSignalPriorities.find((signal) => signal.id === requestedSignalId) ??
    radarSignalPriorities.find(
      (signal) => signal.id === radarInspectorMetadata.defaultSignalId,
    ) ??
    radarSignalPriorities[0];

  const selectedSector = getSectorById(selectedSignal.sectorId) ?? radarSectors[0];
  const owners = selectedSignal.ownerContactIds.flatMap((contactId) => {
    const contact = getContactById(contactId);

    return contact ? [contact] : [];
  });

  const fallbackMessage =
    requestedSignalId && requestedSignalId !== selectedSignal.id
      ? `${requestedSignalId} was not found. Showing ${selectedSignal.title} instead.`
      : undefined;

  const sectorCards = radarSectors.map((sector) => ({
    sector,
    contacts: sector.contactIds.flatMap((contactId) => {
      const contact = getContactById(contactId);

      return contact ? [contact] : [];
    }),
    signals: radarSignalPriorities
      .filter((signal) => signal.sectorId === sector.id)
      .sort(compareSignals),
  }));

  const contactSummaries = radarContacts
    .map((contact) => ({
      contact,
      sectors: contact.sectorIds.flatMap((sectorId) => {
        const sector = getSectorById(sectorId);

        return sector ? [sector] : [];
      }),
      assignedSignals: radarSignalPriorities
        .filter((signal) => signal.ownerContactIds.includes(contact.id))
        .sort(compareSignals),
    }))
    .sort((left, right) => right.assignedSignals.length - left.assignedSignals.length);

  const summaryCards: RadarSummaryCard[] = [
    {
      label: "Tracked sectors",
      value: String(radarSectors.length),
      detail: "Multiple sectors stay visible at once so handoffs are easier to compare.",
    },
    {
      label: "Priority 1 signals",
      value: String(
        radarSignalPriorities.filter((signal) => signal.priority === "priority-1")
          .length,
      ),
      detail: "Immediate escalation items stay separated from the broader queue.",
    },
    {
      label: "Contacts online",
      value: String(radarContacts.length),
      detail: "Contact summaries surface owner, channel, and response timing metadata.",
    },
    {
      label: "Signals tracked",
      value: String(radarSignalPriorities.length),
      detail: "The inspector queue can pivot across every synthetic signal on the route.",
    },
  ];

  const queue: InspectorQueueItem[] = radarSignalPriorities
    .slice()
    .sort(compareSignals)
    .map((signal) => ({
      href: `/radar-console?signal=${signal.id}`,
      isSelected: signal.id === selectedSignal.id,
      signal,
      sector: getSectorById(signal.sectorId) ?? selectedSector,
    }));

  return {
    overview: radarConsoleOverview,
    summaryCards,
    sectorCards,
    contactSummaries,
    inspector: {
      metadata: radarInspectorMetadata,
      selectedSignal,
      selectedSector,
      owners,
      queue,
      fallbackMessage,
    },
  };
}
