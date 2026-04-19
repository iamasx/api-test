"use client";

import { startTransition, useDeferredValue, useState } from "react";

import {
  commandLogEvents,
  commandLogGroups,
  commandLogSummary,
  commandLogTags,
} from "@/app/command-log/mock-data";
import { CommandLogHeader } from "./command-log-header";
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

  const visibleGroups = commandLogGroups
    .map((group) => ({
      ...group,
      events: group.events.filter(
        (event) =>
          deferredTagIds.length === 0 ||
          deferredTagIds.some((tagId) => event.tags.includes(tagId)),
      ),
    }))
    .filter((group) => group.events.length > 0);
  const visibleEvents = visibleGroups.flatMap((group) => group.events);
  const visibleTagCounts = visibleEvents.reduce<Record<string, number>>((counts, event) => {
    event.tags.forEach((tagId) => {
      counts[tagId] = (counts[tagId] ?? 0) + 1;
    });
    return counts;
  }, {});
  const selectedEvent =
    visibleEvents.find((event) => event.id === selectedEventId) ?? null;
  const pinnedEvent =
    commandLogEvents.find((event) => event.id === pinnedEventId) ?? null;
  const detailEvent = pinnedEvent ?? selectedEvent;
  const failedCount = commandLogEvents.filter((event) => event.outcome === "failed").length;
  const runningCount = commandLogEvents.filter((event) => event.outcome === "running").length;
  const isPinnedHidden = pinnedEvent ? !visibleEvents.some((event) => event.id === pinnedEvent.id) : false;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.16),_transparent_30%),linear-gradient(180deg,_#120d09_0%,_#19120e_48%,_#090807_100%)] px-4 py-6 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <CommandLogHeader
          activeTagCount={activeTagIds.length}
          captureVolume={commandLogSummary.captureVolume}
          eventCount={visibleEvents.length}
          failedCount={failedCount}
          freshness={commandLogSummary.freshness}
          runningCount={runningCount}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]">
          <div className="space-y-6">
            <TagFilterBar
              activeTagIds={activeTagIds}
              onReset={() => startTransition(() => setActiveTagIds([]))}
              onToggleTag={(tagId) =>
                startTransition(() => setActiveTagIds((items) => toggleId(items, tagId)))
              }
              tags={commandLogTags}
              totalCount={commandLogEvents.length}
              visibleCount={visibleEvents.length}
              visibleTagCounts={visibleTagCounts}
            />
            <EventStream
              activeEventId={selectedEvent?.id ?? null}
              groups={visibleGroups}
              hasFilters={activeTagIds.length > 0}
              onResetFilters={() => startTransition(() => setActiveTagIds([]))}
              onSelectEvent={(eventId) =>
                startTransition(() =>
                  setSelectedEventId((current) => (current === eventId ? null : eventId)),
                )
              }
              pinnedEventId={pinnedEventId}
            />
          </div>
          <EventDetailRail
            event={detailEvent}
            isPinned={detailEvent !== null && pinnedEventId === detailEvent.id}
            isPinnedHidden={isPinnedHidden}
            onClearSelection={() => startTransition(() => setSelectedEventId(null))}
            onTogglePin={() => {
              if (!detailEvent) return;
              startTransition(() =>
                setPinnedEventId((current) => (current === detailEvent.id ? null : detailEvent.id)),
              );
            }}
          />
        </div>
      </div>
    </main>
  );
}
