import type { ParcelHubExceptionView } from "../_data/parcel-hub-data";
import styles from "../parcel-hub.module.css";

type ExceptionDetailPanelProps = {
  exception: ParcelHubExceptionView;
};

const severityToneMap: Record<ParcelHubExceptionView["severity"], string> = {
  Monitor: "border-sky-200 bg-sky-50 text-sky-800",
  "Action Required": "border-amber-200 bg-amber-50 text-amber-800",
  Critical: "border-rose-200 bg-rose-50 text-rose-800",
};

export function ExceptionDetailPanel({
  exception,
}: ExceptionDetailPanelProps) {
  const titleId = `${exception.id}-title`;

  return (
    <aside
      aria-labelledby={titleId}
      className={`rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_90px_rgba(15,23,42,0.22)] ${styles.exceptionPanel}`}
      data-severity={exception.severity}
      role="region"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
            Exception detail
          </p>
          <h2
            id={titleId}
            className="mt-3 text-3xl font-semibold tracking-tight"
          >
            {exception.title}
          </h2>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${severityToneMap[exception.severity]}`}
        >
          {exception.severity}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/76">{exception.summary}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div
          className={`rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 ${styles.detailSection}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Lane and code
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {exception.lane.name}
          </p>
          <p className="mt-1 text-sm text-white/66">{exception.code}</p>
        </div>
        <div
          className={`rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 ${styles.detailSection}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Owner and update
          </p>
          <p className="mt-2 text-sm font-semibold text-white">
            {exception.owner}
          </p>
          <p className="mt-1 text-sm text-white/66">{exception.updatedAt}</p>
        </div>
      </div>

      <div
        className={`mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 ${styles.detailSection}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Customer impact
        </p>
        <p className="mt-2 text-sm leading-7 text-white/76">
          {exception.customerImpact}
        </p>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Value at risk
        </p>
        <p className="mt-2 text-sm font-semibold text-white">
          {exception.valueAtRisk}
        </p>
      </div>

      <div
        className={`mt-6 rounded-[1.5rem] border border-cyan-400/25 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.7))] px-4 py-4 ${styles.detailCallout}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
          Recommended action
        </p>
        <p className="mt-2 text-sm leading-7 text-white/84">
          {exception.recommendedAction}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Affected parcels
        </p>
        <ul aria-label="Affected parcels" className="mt-4 space-y-3">
          {exception.parcels.map((parcel) => (
            <li key={parcel.id}>
              <article
                className={`rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4 ${styles.affectedParcelCard}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {parcel.recipient}
                    </h3>
                    <p className="mt-1 text-sm text-white/66">
                      {parcel.destination}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {parcel.trackingCode}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-white/76">
                  {parcel.checkpointLabel}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Checkpoint notes
        </p>
        <ul className="mt-4 space-y-3">
          {exception.checkpointNotes.map((note) => (
            <li
              key={note}
              className={`rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white/76 ${styles.noteCard}`}
            >
              {note}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
