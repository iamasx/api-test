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
  title: "Inventory Bay — Route Integration",
  description:
    "Mock inventory bay route with stock bands, category sections, a restock recommendation panel, and cross-linked delivery route segments.",
};

const routePlannerLinks = [
  { label: "Primary distribution route", segmentId: "seg-001", eta: "08:45" },
  { label: "Secondary restock loop", segmentId: "seg-003", eta: "11:20" },
  { label: "Express replenishment lane", segmentId: "seg-005", eta: "14:00" },
];

const bayStockSummary = [
  { label: "Total SKUs tracked", value: "1,146", change: "+24 this week" },
  { label: "Low-stock alerts", value: "70", change: "+12 since yesterday" },
  { label: "Restock orders pending", value: "8", change: "3 dispatched" },
  { label: "Avg restock lead time", value: "4.2 days", change: "-0.5 days" },
];

const recentRestockActivity = [
  { id: "RST-4401", bay: "Bay-North", items: 42, status: "dispatched", time: "07:30" },
  { id: "RST-4402", bay: "Bay-Central", items: 18, status: "pending", time: "09:15" },
  { id: "RST-4403", bay: "Bay-South", items: 67, status: "delivered", time: "06:00" },
  { id: "RST-4404", bay: "Bay-Central", items: 31, status: "dispatched", time: "08:45" },
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

      <section className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-16">
        <div className="rounded-[2rem] border border-slate-700/40 bg-slate-900/70 p-8 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
            Stock summary
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Bay-wide inventory metrics
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bayStockSummary.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-amber-300">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Recent restock activity
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {recentRestockActivity.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-white/8 bg-white/4 px-4 py-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{order.id}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        order.status === "delivered"
                          ? "bg-emerald-400/15 text-emerald-300"
                          : order.status === "dispatched"
                            ? "bg-cyan-400/15 text-cyan-300"
                            : "bg-amber-400/15 text-amber-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {order.bay} &middot; {order.items} items &middot; {order.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
