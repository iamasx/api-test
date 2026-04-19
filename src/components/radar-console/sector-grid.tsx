import type { SectorSummary } from "@/app/radar-console/mock-data";

type SectorGridProps = {
  focusedSectorId: string | null;
  onToggleFocus: (sectorId: string) => void;
  sectors: SectorSummary[];
};

const sectorToneClasses = {
  clear: "border-emerald-300/15 bg-emerald-300/10 text-emerald-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  critical: "border-rose-400/20 bg-rose-400/10 text-rose-100",
};

export function SectorGrid({ focusedSectorId, onToggleFocus, sectors }: SectorGridProps) {
  return (
    <section className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/70 p-5 text-slate-100 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Sector grid</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Focus controls</h2>
        </div>
        <p className="max-w-xs text-right text-sm text-slate-400">Pin a sector to narrow the contact stack without leaving this route.</p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {sectors.map((sector) => {
          const isFocused = focusedSectorId === sector.id;

          return (
            <article
              key={sector.id}
              className={`rounded-[1.6rem] border p-4 transition ${sectorToneClasses[sector.tone]} ${isFocused ? "ring-1 ring-cyan-300/60" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-current/75">{sector.corridor}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{sector.label}</h3>
                </div>
                <span className="rounded-full bg-black/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.22em]">
                  {sector.readiness}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-current/85">
                <div className="rounded-2xl bg-black/20 px-3 py-2"><span className="block text-xs uppercase tracking-[0.18em] text-current/65">Contacts</span>{sector.contactCount}</div>
                <div className="rounded-2xl bg-black/20 px-3 py-2"><span className="block text-xs uppercase tracking-[0.18em] text-current/65">Alerts</span>{sector.alertCount}</div>
                <div className="rounded-2xl bg-black/20 px-3 py-2"><span className="block text-xs uppercase tracking-[0.18em] text-current/65">Coverage</span>{sector.sweepCoverage}%</div>
                <div className="rounded-2xl bg-black/20 px-3 py-2"><span className="block text-xs uppercase tracking-[0.18em] text-current/65">Drift</span>{sector.driftDelta} ms</div>
              </div>

              <button
                type="button"
                aria-pressed={isFocused}
                aria-label={isFocused ? `Release focus for ${sector.label}` : `Focus ${sector.label}`}
                onClick={() => onToggleFocus(sector.id)}
                className="mt-4 w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm font-medium text-white transition hover:border-cyan-200/40 hover:bg-black/30"
              >
                {isFocused ? "Release focus" : "Focus sector"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
