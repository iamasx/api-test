import type { ContactCard } from "@/app/radar-console/mock-data";

type ContactListProps = {
  alertsOnly: boolean;
  contacts: ContactCard[];
  focusedSector: string | null;
  onSelectContact: (contactId: string) => void;
  onToggleAlertsOnly: () => void;
  selectedContactId: string | null;
};

const toneClasses = {
  steady: "border-slate-700/80 bg-slate-900/80",
  watch: "border-amber-300/20 bg-amber-300/8",
  critical: "border-rose-400/20 bg-rose-400/8",
};

export function ContactList({
  alertsOnly,
  contacts,
  focusedSector,
  onSelectContact,
  onToggleAlertsOnly,
  selectedContactId,
}: ContactListProps) {
  const scopeLabel = focusedSector ?? "All sectors";

  return (
    <section className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/70 p-5 text-slate-100 backdrop-blur">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Contacts</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Tracks in scope</h2>
          <p className="mt-1 text-sm text-slate-400">{scopeLabel}. Tap a card again to clear the inspector.</p>
        </div>
        <button
          type="button"
          onClick={onToggleAlertsOnly}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${alertsOnly ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-200/30 hover:text-white"}`}
          aria-pressed={alertsOnly}
          aria-label={alertsOnly ? "Show all contacts" : "Show alert contacts only"}
        >
          {alertsOnly ? "Alert-only filter active" : "Show alert contacts only"}
        </button>
      </div>

      {contacts.length === 0 ? (
        <div className="mt-5 rounded-[1.6rem] border border-dashed border-white/15 bg-black/15 px-5 py-8 text-center">
          <p className="text-lg font-medium text-white">No alert-marked contacts remain in {scopeLabel}.</p>
          <p className="mt-2 text-sm text-slate-400">Drop the alert-only filter or release the sector focus to widen the sweep.</p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {contacts.map((contact) => {
            const isSelected = selectedContactId === contact.id;

            return (
              <button
                key={contact.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectContact(contact.id)}
                className={`w-full rounded-[1.5rem] border p-4 text-left transition hover:border-cyan-200/35 ${toneClasses[contact.tone]} ${isSelected ? "ring-1 ring-cyan-300/60" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{contact.sectorLabel}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{contact.callsign}</h3>
                    <p className="mt-1 text-sm text-slate-300">{contact.classification}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
                    {contact.isAlerted ? <span className="rounded-full bg-rose-400/15 px-2.5 py-1 text-rose-100">Alert</span> : null}
                    <span className="rounded-full bg-black/20 px-2.5 py-1 text-slate-200">{contact.lastSeen}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-300">{contact.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-slate-300">
                  <span className="rounded-full bg-black/20 px-2.5 py-1">{contact.altitude.toLocaleString()} ft</span>
                  <span className="rounded-full bg-black/20 px-2.5 py-1">{contact.speed} kt</span>
                  <span className="rounded-full bg-black/20 px-2.5 py-1">{contact.heading}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
