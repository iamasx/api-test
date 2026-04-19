"use client";
import { startTransition, useDeferredValue, useState } from "react";
import { commandLogEvents, commandLogGroups, commandLogSummary, commandLogTags } from "@/app/command-log/mock-data";
import { EventDetailRail } from "./event-detail-rail";
import { EventStream } from "./event-stream";
import { TagFilterBar } from "./tag-filter-bar";
function toggleId(items: string[], id: string) {
  return items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
}
export function CommandLogWorkspace() {
  const [activeTagIds, setActiveTagIds] = useState<string[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(commandLogEvents[0]?.id ?? null);
  const [pinnedEventId, setPinnedEventId] = useState<string | null>(null);
  const deferredTagIds = useDeferredValue(activeTagIds);
  const visibleGroups = commandLogGroups.map((group) => ({
    ...group,
    events: group.events.filter(
      (event) => deferredTagIds.length === 0 || deferredTagIds.some((tagId) => event.tags.includes(tagId)),
    ),
  })).filter((group) => group.events.length > 0);
  const visibleEvents = visibleGroups.flatMap((group) => group.events);
  const visibleTagCounts = visibleEvents.reduce<Record<string, number>>((counts, event) => {
    event.tags.forEach((tagId) => { counts[tagId] = (counts[tagId] ?? 0) + 1; });
    return counts;
  }, {});
  const selectedEvent = visibleEvents.find((event) => event.id === selectedEventId) ?? null;
  const pinnedEvent = commandLogEvents.find((event) => event.id === pinnedEventId) ?? null;
  const detailEvent = pinnedEvent ?? selectedEvent;
  const failedCount = commandLogEvents.filter((event) => event.outcome === "failed").length;
  const runningCount = commandLogEvents.filter((event) => event.outcome === "running").length;
  const isPinnedHidden = pinnedEvent ? !visibleEvents.some((event) => event.id === pinnedEvent.id) : false;
  const resetTags = () => startTransition(() => setActiveTagIds([]));
  const selectEvent = (eventId: string) =>
    startTransition(() => setSelectedEventId((current) => (current === eventId ? null : eventId)));
  const toggleTag = (tagId: string) =>
    startTransition(() => setActiveTagIds((items) => toggleId(items, tagId)));
  const clearSelection = () => startTransition(() => setSelectedEventId(null));
  const togglePin = () => {
    if (!detailEvent) return;
    startTransition(() => setPinnedEventId((current) => (current === detailEvent.id ? null : detailEvent.id)));
  };
  const metricCards = [
    { label: "Captured", value: commandLogSummary.captureVolume, tone: "text-stone-100" },
    { label: "Escalations", value: failedCount, tone: "text-rose-100" },
    {
      label: "In Flight",
      value: runningCount,
      tone: "text-cyan-100",
      note: activeTagIds.length > 0 ? `${activeTagIds.length} tags active` : "all tags",
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_30%),linear-gradient(180deg,_#120d09_0%,_#19120e_48%,_#090807_100%)] px-4 py-6 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] border border-white/10 bg-stone-950/80 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-stone-300">
                <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-cyan-100">
                  isolated route
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-100">
                  {visibleEvents.length} stream events visible
                </span>
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Command Log</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-300 sm:text-base">
                Synthetic command history grouped into event windows with local tag filters and a pin-ready detail rail.
              </p>
            </div>
            <div className="space-y-3 lg:text-right">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                Freshness {commandLogSummary.freshness}
              </span>
              <div className="grid gap-3 sm:grid-cols-3">
                {metricCards.map((metric) => (
                  <div key={metric.label} className="rounded-[1.5rem] border border-white/8 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{metric.label}</p>
                    <p className={`mt-2 text-2xl font-semibold ${metric.tone}`}>
                      {metric.value}
                      {metric.note ? <span className="ml-2 text-sm font-normal text-stone-400">{metric.note}</span> : null}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <TagFilterBar
              activeTagIds={activeTagIds}
              onReset={resetTags}
              onToggleTag={toggleTag}
              tags={commandLogTags}
              totalCount={commandLogEvents.length}
              visibleCount={visibleEvents.length}
              visibleTagCounts={visibleTagCounts}
            />
            <EventStream
              activeEventId={selectedEvent?.id ?? null}
              groups={visibleGroups}
              hasFilters={activeTagIds.length > 0}
              onResetFilters={resetTags}
              onSelectEvent={selectEvent}
              pinnedEventId={pinnedEventId}
            />
          </div>
          <EventDetailRail
            event={detailEvent}
            isPinned={detailEvent !== null && pinnedEventId === detailEvent.id}
            isPinnedHidden={isPinnedHidden}
            onClearSelection={clearSelection}
            onTogglePin={togglePin}
          />
        </div>
      </div>
    </main>
  );
}
