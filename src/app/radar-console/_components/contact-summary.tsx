import type {
  RadarContact,
  RadarSector,
  RadarSignalPriority,
} from "../_data/radar-console-data";

type ContactSummaryProps = {
  contact: RadarContact;
  sectors: RadarSector[];
  assignedSignals: RadarSignalPriority[];
};

export function ContactSummary({
  contact,
  sectors,
  assignedSignals,
}: ContactSummaryProps) {
  return (
    <article
      className="rounded-[1.5rem] border border-slate-900/10 bg-white/88 p-5 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {contact.callSign}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {contact.name}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{contact.role}</p>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
          {assignedSignals.length} live signals
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Channel
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {contact.channel}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Response window
            </p>
            <p className="mt-2 text-sm font-medium text-slate-900">
              {contact.responseWindow}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Current posture
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700">{contact.status}</p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {contact.location} · {contact.specialty}
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Covered sectors
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {sectors.map((sector) => (
                <li key={sector.id}>
                  {sector.code} · {sector.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Assigned priorities
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {assignedSignals.map((signal) => (
                <li key={signal.id}>
                  {signal.title} · {signal.priority.replace("-", " ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
