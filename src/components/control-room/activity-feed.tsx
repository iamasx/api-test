"use client";

import { useState } from "react";
import {
  activityFilters,
  type ActivityFilter,
  type FeedItem,
} from "@/app/control-room/mock-data";

const categoryClasses = {
  deployments: "bg-cyan-300/12 text-cyan-100 border-cyan-300/20",
  incidents: "bg-rose-500/12 text-rose-100 border-rose-400/25",
  traffic: "bg-violet-400/12 text-violet-100 border-violet-300/25",
  automation: "bg-emerald-400/12 text-emerald-100 border-emerald-300/20",
};

type ActivityFeedProps = {
  items: FeedItem[];
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id ?? null);

  const visibleItems = items.filter(
    (item) => activeFilter === "all" || item.category === activeFilter,
  );

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
            Activity Feed
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Operator timeline
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {activityFilters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  isActive
                    ? "border-cyan-200 bg-cyan-200 text-slate-950"
                    : "border-white/12 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:text-white"
                }`}
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      <ol className="mt-6 space-y-3">
        {visibleItems.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <li
              className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-white/[0.04]"
              key={item.id}
            >
              <button
                aria-expanded={isExpanded}
                className="w-full px-5 py-4 text-left"
                onClick={() =>
                  setExpandedId(isExpanded ? null : item.id)
                }
                type="button"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs uppercase tracking-[0.22em] ${categoryClasses[item.category]}`}
                    >
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-lg font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.summary}
                    </p>
                  </div>
                  <div className="text-sm text-slate-400 sm:text-right">
                    <p>{item.ageLabel}</p>
                    <p className="mt-1">{item.system}</p>
                    <p className="mt-1 text-slate-500">{item.actor}</p>
                  </div>
                </div>
              </button>
              {isExpanded ? (
                <div className="grid gap-3 border-t border-white/8 px-5 py-4 text-sm sm:grid-cols-3">
                  {item.details.map((detail) => (
                    <div
                      className="rounded-2xl border border-white/8 bg-slate-950/55 p-3"
                      key={`${item.id}-${detail.label}`}
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {detail.label}
                      </p>
                      <p className="mt-2 text-slate-200">{detail.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
