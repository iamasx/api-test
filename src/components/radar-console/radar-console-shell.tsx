"use client";

import { startTransition, useEffect, useEffectEvent, useState } from "react";

import {
  alertMarkers,
  contacts,
  inspectorDetails,
  radarHeartbeatSeed,
  sectors,
} from "@/app/radar-console/mock-data";
import { ContactInspector } from "./contact-inspector";
import { ContactList } from "./contact-list";
import { RadarConsoleHeader } from "./radar-console-header";
import { SectorGrid } from "./sector-grid";

const heartbeatFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
  timeZone: "UTC",
});
const heartbeatStepMs = 4000;

function toggleId(items: string[], id: string) {
  return items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
}

function buildScopedId(contactId: string, itemId: string) {
  return `${contactId}:${itemId}`;
}

function filterContacts(focusedSectorId: string | null, alertsOnly: boolean) {
  return contacts.filter((contact) => {
    if (focusedSectorId && contact.sectorId !== focusedSectorId) return false;
    return !alertsOnly || contact.isAlerted;
  });
}

export function RadarConsoleShell() {
  const [focusedSectorId, setFocusedSectorId] = useState<string | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(contacts[0]?.id ?? null);
  const [alertsOnly, setAlertsOnly] = useState(false);
  const [activeAlertKeys, setActiveAlertKeys] = useState<string[]>([]);
  const [activeNoteKeys, setActiveNoteKeys] = useState<string[]>([]);
  const [heartbeatTick, setHeartbeatTick] = useState(0);

  const tickHeartbeat = useEffectEvent(() => {
    setHeartbeatTick((value) => value + 1);
  });

  useEffect(() => {
    const timerId = window.setInterval(() => tickHeartbeat(), heartbeatStepMs);
    return () => window.clearInterval(timerId);
  }, []);

  const focusedSector = sectors.find((sector) => sector.id === focusedSectorId) ?? null;
  const visibleContacts = filterContacts(focusedSectorId, alertsOnly);
  const selectedContact = visibleContacts.find((contact) => contact.id === selectedContactId) ?? null;
  const selectedDetail = inspectorDetails.find((detail) => detail.contactId === selectedContact?.id) ?? null;
  const activeAlertIds = selectedContact
    ? activeAlertKeys
        .filter((id) => id.startsWith(`${selectedContact.id}:`))
        .map((id) => id.split(":")[1] ?? id)
    : [];
  const activeNoteIds = selectedContact
    ? activeNoteKeys
        .filter((id) => id.startsWith(`${selectedContact.id}:`))
        .map((id) => id.split(":")[1] ?? id)
    : [];
  const watchCount = visibleContacts.filter((contact) => contact.tone !== "steady").length;
  const heartbeat = heartbeatFormatter.format(
    new Date(new Date(radarHeartbeatSeed).getTime() + heartbeatTick * heartbeatStepMs),
  );
  const sweepStatus = focusedSector
    ? `${focusedSector.label} focus`
    : alertsOnly
      ? "Alert-only pass"
      : sectors.some((sector) => sector.tone === "critical")
        ? "Priority sweep"
        : "Nominal sweep";

  const syncSelection = (nextSectorId: string | null, nextAlertsOnly: boolean) => {
    const nextVisibleContacts = filterContacts(nextSectorId, nextAlertsOnly);
    setSelectedContactId((current) =>
      nextVisibleContacts.some((contact) => contact.id === current)
        ? current
        : nextVisibleContacts[0]?.id ?? null,
    );
  };

  const handleToggleSectorFocus = (sectorId: string) => {
    startTransition(() => {
      const nextSectorId = focusedSectorId === sectorId ? null : sectorId;
      setFocusedSectorId(nextSectorId);
      syncSelection(nextSectorId, alertsOnly);
    });
  };

  const handleToggleAlertsOnly = () => {
    startTransition(() => {
      const nextAlertsOnly = !alertsOnly;
      setAlertsOnly(nextAlertsOnly);
      syncSelection(focusedSectorId, nextAlertsOnly);
    });
  };

  const handleSelectContact = (contactId: string) => {
    startTransition(() => {
      setSelectedContactId((current) => (current === contactId ? null : contactId));
    });
  };

  const handleToggleAlert = (alertId: string) => {
    if (!selectedContact) return;
    setActiveAlertKeys((items) => toggleId(items, buildScopedId(selectedContact.id, alertId)));
  };

  const handleToggleNote = (noteId: string) => {
    if (!selectedContact) return;
    setActiveNoteKeys((items) => toggleId(items, buildScopedId(selectedContact.id, noteId)));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.14),_transparent_26%),linear-gradient(160deg,_#020617_0%,_#06121f_45%,_#0f172a_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <RadarConsoleHeader
          focusedSector={focusedSector?.label ?? null}
          heartbeat={heartbeat}
          markers={alertMarkers}
          scopeCount={visibleContacts.length}
          sweepStatus={sweepStatus}
          watchCount={watchCount}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
          <div className="space-y-6">
            <SectorGrid focusedSectorId={focusedSectorId} onToggleFocus={handleToggleSectorFocus} sectors={sectors} />
            <ContactList
              alertsOnly={alertsOnly}
              contacts={visibleContacts}
              focusedSector={focusedSector?.label ?? null}
              onSelectContact={handleSelectContact}
              onToggleAlertsOnly={handleToggleAlertsOnly}
              selectedContactId={selectedContactId}
            />
          </div>

          <ContactInspector
            activeAlertIds={activeAlertIds}
            activeNoteIds={activeNoteIds}
            contact={selectedContact}
            detail={selectedDetail}
            onClearSelection={() => setSelectedContactId(null)}
            onToggleAlert={handleToggleAlert}
            onToggleNote={handleToggleNote}
          />
        </div>
      </div>
    </main>
  );
}
