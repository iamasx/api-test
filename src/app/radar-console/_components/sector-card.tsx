import type {
  RadarContact,
  RadarSector,
  RadarSignalPriority,
  RadarSectorTone,
} from "../_data/radar-console-data";
import styles from "../radar-console.module.css";

type SectorCardProps = {
  sector: RadarSector;
  contacts: RadarContact[];
  signals: RadarSignalPriority[];
};

const sectorToneClasses: Record<RadarSectorTone, string> = {
  critical: "border-rose-400/35 bg-rose-400/10 text-rose-100",
  focused: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  watch: "border-sky-300/35 bg-sky-300/10 text-sky-100",
  steady: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
};

export function SectorCard({ sector, contacts, signals }: SectorCardProps) {
  const leadSignal = signals[0];

  return (
    <article
      className={`${styles.sectorCard} rounded-[1.7rem] border border-white/10 p-5 text-slate-50 shadow-[0_18px_45px_rgba(2,6,23,0.18)]`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-300">
              {sector.code}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${sectorToneClasses[sector.tone]}`}
            >
              {sector.posture}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {sector.name}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              {sector.summary}
            </p>
          </div>
        </div>

        <div className="grid min-w-[11rem] gap-3 text-sm">
          <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Signals
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {signals.length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Contacts
            </p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {contacts.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)]">
        <div className="space-y-4">
          <div className="rounded-[1.35rem] border border-white/8 bg-white/6 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Focus
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-200">{sector.focus}</p>
          </div>

          {leadSignal ? (
            <div className="rounded-[1.35rem] border border-white/8 bg-white/6 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Lead signal
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {leadSignal.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {leadSignal.summary}
              </p>
            </div>
          ) : null}
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-white/8 bg-white/6 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Sweep metadata
            </p>
            <dl className="mt-3 grid gap-3 text-sm text-slate-200">
              <div>
                <dt className="text-slate-400">Sweep window</dt>
                <dd className="mt-1">{sector.sweepWindow}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Orbit</dt>
                <dd className="mt-1">{sector.orbit}</dd>
              </div>
              <div>
                <dt className="text-slate-400">Terrain</dt>
                <dd className="mt-1">{sector.terrain}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[1.35rem] border border-white/8 bg-white/6 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Assigned contacts
            </p>
            <ul className="mt-3 space-y-3">
              {contacts.map((contact) => (
                <li key={contact.id} className="rounded-2xl bg-slate-900/70 px-3 py-3">
                  <p className="font-semibold text-white">{contact.name}</p>
                  <p className="mt-1 text-sm text-slate-300">
                    {contact.callSign} · {contact.channel}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
