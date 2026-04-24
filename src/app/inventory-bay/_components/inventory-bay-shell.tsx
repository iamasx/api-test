import type {
  InventoryBayBandSummary,
  InventoryBayCategorySummary,
  InventoryBayLowStockView,
  InventoryBayOverviewMetric,
} from "../_data/inventory-bay-data";
import { CategorySummaryTile } from "./category-summary-tile";
import { LowStockPanel } from "./low-stock-panel";
import { StockBandSummaryCard } from "./stock-band-summary-card";

type InventoryBayShellProps = {
  bandSummaries: InventoryBayBandSummary[];
  categorySummaries: InventoryBayCategorySummary[];
  lowStockAlerts: InventoryBayLowStockView[];
  overviewMetrics: InventoryBayOverviewMetric[];
};

export function InventoryBayShell({
  bandSummaries,
  categorySummaries,
  lowStockAlerts,
  overviewMetrics,
}: InventoryBayShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_28%),linear-gradient(180deg,#f6fafb_0%,#eef4f5_48%,#f8fafc_100%)] text-slate-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_110px_-42px_rgba(15,23,42,0.92)] sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Inventory Bay
            </p>
            <p className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/82">
              Standalone mock route
            </p>
          </div>

          <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)]">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                See stock bands, category pressure, and low-stock warnings in one bay scan.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                This standalone route keeps the inventory story compact: band cards
                show the overall stock mix, category tiles summarize each bay zone,
                and the low-stock panel surfaces the items that still need action
                before the next replenishment window.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/74">
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Local mock stock, band, category, and alert data
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Summary tiles grouped by bay category
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Healthy, watch, and critical stock states
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Compact warning panel stays visible beside the category grid
                </span>
              </div>
            </div>

            <div
              aria-label="Inventory bay overview"
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"
              role="list"
            >
              {overviewMetrics.map((metricCard) => (
                <div
                  key={metricCard.id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5"
                  role="listitem"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {metricCard.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {metricCard.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/66">
                    {metricCard.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="inventory-bands-heading" className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Stock bands
              </p>
              <h2
                id="inventory-bands-heading"
                className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
              >
                Stock bands at a glance
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Each stock band compresses the bay mix into a readable summary so it
              is obvious where supply is stable, slipping, or already below the
              safe reorder line.
            </p>
          </div>

          <ul aria-label="Stock bands" className="grid gap-4 lg:grid-cols-3">
            {bandSummaries.map((summary) => (
              <StockBandSummaryCard key={summary.id} summary={summary} />
            ))}
          </ul>
        </section>

        <div
          data-testid="inventory-bay-layout"
          className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_320px]"
        >
          <section aria-labelledby="inventory-sections-heading" className="space-y-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Category tiles
                </p>
                <h2
                  id="inventory-sections-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Category summaries by bay zone
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Every tile keeps the category-level signal compact while still
                surfacing the item that is most likely to need attention first.
              </p>
            </div>

            <ul
              aria-label="Category summaries"
              className="grid gap-4 sm:grid-cols-2"
            >
              {categorySummaries.map((summary) => (
                <CategorySummaryTile key={summary.id} summary={summary} />
              ))}
            </ul>
          </section>

          <LowStockPanel alerts={lowStockAlerts} />
        </div>
      </main>
    </div>
  );
}
