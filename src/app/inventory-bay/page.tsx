import type { Metadata } from "next";
import Link from "next/link";

import { InventoryBayShell } from "./_components/inventory-bay-shell";
import {
  getInventoryBayBandSummaries,
  getInventoryBayMetrics,
  getInventoryBayRecommendationViews,
  getInventoryBaySections,
  inventoryBayBands,
  inventoryBayCategories,
  inventoryBayItems,
  inventoryBayRecommendations,
} from "./_data/inventory-bay-data";

export const metadata: Metadata = {
  title: "Inventory Bay",
  description:
    "Mock inventory bay route with stock bands, category sections, and a restock recommendation panel.",
};

const routePlannerLinks = [
  { label: "Primary distribution route", segmentId: "seg-001", eta: "08:45" },
  { label: "Secondary restock loop", segmentId: "seg-003", eta: "11:20" },
  { label: "Express replenishment lane", segmentId: "seg-005", eta: "14:00" },
];

export default function InventoryBayPage() {
  const metrics = getInventoryBayMetrics(
    inventoryBayItems,
    inventoryBayRecommendations,
  );
  const bandSummaries = getInventoryBayBandSummaries(
    inventoryBayItems,
    inventoryBayBands,
  );
  const sections = getInventoryBaySections(
    inventoryBayItems,
    inventoryBayCategories,
  );
  const recommendations = getInventoryBayRecommendationViews(
    inventoryBayItems,
    inventoryBayCategories,
    inventoryBayBands,
    inventoryBayRecommendations,
  );

  return (
    <div className="flex flex-col gap-8">
      <InventoryBayShell
        bandSummaries={bandSummaries}
        metrics={metrics}
        recommendations={recommendations}
        sections={sections}
      />

      <section className="integration-panel mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10 lg:px-16">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-950/60 p-8 backdrop-blur">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">
                Route integration
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Linked delivery routes
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Active route segments that supply this inventory bay. Select a
                route to view timing and constraint details in the planner.
              </p>
            </div>
            <Link
              href="/route-planner"
              className="hidden items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-900/40 px-5 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300/60 hover:bg-emerald-800/50 sm:inline-flex"
            >
              Open route planner
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {routePlannerLinks.map((route) => (
              <li key={route.segmentId}>
                <Link
                  href={`/route-planner#${route.segmentId}`}
                  className="integration-card block rounded-2xl border border-white/10 bg-white/5 px-5 py-5 transition hover:border-emerald-400/40 hover:bg-emerald-900/30"
                >
                  <p className="text-sm font-semibold text-white">
                    {route.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Segment {route.segmentId}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-emerald-300">
                    ETA {route.eta}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
