import Link from "next/link";

import type {
  InventoryBayBandSummary,
  InventoryBayMetrics,
  InventoryBayRecommendationView,
  InventoryBaySection,
} from "../_data/inventory-bay-data";
import { InventoryBayCategorySection } from "./inventory-bay-category-section";
import { RestockRecommendationPanel } from "./restock-recommendation-panel";
import { StockBandSummaryCard } from "./stock-band-summary-card";

type InventoryBayShellProps = {
  bandSummaries: InventoryBayBandSummary[];
  metrics: InventoryBayMetrics;
  recommendations: InventoryBayRecommendationView[];
  sections: InventoryBaySection[];
};

const metricCards = [
  {
    id: "trackedSkus",
    label: "Tracked SKUs",
  },
  {
    id: "atRiskSkus",
    label: "At-risk stock",
  },
  {
    id: "availableToPromise",
    label: "Available to promise",
  },
  {
    id: "recommendationCount",
    label: "Recommended moves",
  },
] as const;

export function InventoryBayShell({
  bandSummaries,
  metrics,
  recommendations,
  sections,
}: InventoryBayShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_28%),linear-gradient(180deg,#f6fafb_0%,#eef4f5_48%,#f8fafc_100%)] text-slate-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_110px_-42px_rgba(15,23,42,0.92)] sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Inventory Bay
            </p>
            <Link
              href="/"
              className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white/82 transition-colors hover:bg-white/8"
            >
              Back to overview
            </Link>
          </div>

          <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.95fr)]">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Scan stock bands, bay sections, and next restock moves from one route.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                The inventory bay route keeps stock pressure visible without a backend:
                band summaries show where attention is rising, category sections keep
                each bay readable, and the recommendation panel stays focused on the
                next move to protect throughput.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/74">
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Local mock stock, band, and recommendation data
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Sections grouped by bay category
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Available, low-stock, and depleted visual states
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                  Recommendation panel stays visible beside the stock grid
                </span>
              </div>
            </div>

            <div
              aria-label="Inventory bay metrics"
              className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1"
              role="list"
            >
              {metricCards.map((metricCard) => (
                <div
                  key={metricCard.id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5"
                  role="listitem"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {metricCard.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {metrics[metricCard.id]}
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
                Band-level stock pressure
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              Each band condenses the same mock inventory into a quick scan so the
              route immediately shows where bay pressure is stable, tightening, or
              already below the safe reorder line.
            </p>
          </div>

          <ul
            aria-label="Stock bands"
            className="grid gap-4 lg:grid-cols-3"
          >
            {bandSummaries.map((summary) => (
              <StockBandSummaryCard key={summary.id} summary={summary} />
            ))}
          </ul>
        </section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_380px]">
          <section aria-labelledby="inventory-sections-heading" className="space-y-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Category sections
                </p>
                <h2
                  id="inventory-sections-heading"
                  className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
                >
                  Bay categories and live stock cards
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Every section keeps the item cards tied to a real bay zone so the
                stock detail, location, owner, and delivery context stay visible in
                the same scan path.
              </p>
            </div>

            {sections.map((section) => (
              <InventoryBayCategorySection key={section.id} section={section} />
            ))}
          </section>

          <RestockRecommendationPanel recommendations={recommendations} />
        </div>
      </main>
    </div>
  );
}
