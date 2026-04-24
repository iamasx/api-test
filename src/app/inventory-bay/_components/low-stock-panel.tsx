import type { InventoryBayLowStockView } from "../_data/inventory-bay-data";

type LowStockPanelProps = {
  alerts: InventoryBayLowStockView[];
};

export function LowStockPanel({ alerts }: LowStockPanelProps) {
  const criticalAlerts = alerts.filter((alert) => alert.level === "Critical");

  return (
    <aside
      aria-label="Low-stock panel"
      className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_24px_90px_rgba(15,23,42,0.22)] sm:p-6 xl:sticky xl:top-6 xl:self-start"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
            Low-stock panel
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Immediate warnings
          </h2>
        </div>
        <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
          {alerts.length} alerts
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/72">
        Keep the highest-risk items in view while the category tiles stay focused
        on overall bay health.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Critical items
          </p>
          <p className="mt-2 text-3xl font-semibold">{criticalAlerts.length}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Next check window
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-white">
            {alerts[0]?.window ?? "No active warnings"}
          </p>
        </div>
      </div>

      <ul aria-label="Low-stock warnings" className="mt-6 space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id}>
            <article className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-64">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        alert.level === "Critical"
                          ? "border-rose-200 bg-rose-50 text-rose-800"
                          : "border-amber-200 bg-amber-50 text-amber-800"
                      }`}
                    >
                      {alert.level}
                    </span>
                    <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                      {alert.category.name}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
                    {alert.item.name}
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    ATP
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white">
                    {alert.availableUnits}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm leading-7 text-white/76">
                {alert.item.location} · {alert.item.owner}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/76">
                {alert.recommendedMove}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Cover and band
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {alert.item.daysOfCover} days of cover
                  </p>
                  <p className="mt-1 text-sm text-white/66">
                    {alert.band.name} band
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    Review window
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {alert.window}
                  </p>
                  <p className="mt-1 text-sm text-white/66">
                    {alert.item.nextDelivery}
                  </p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </aside>
  );
}
