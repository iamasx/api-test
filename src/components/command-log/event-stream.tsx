import {
  commandLogOutcomeClasses,
  commandLogTagIndex,
  commandLogToneClasses,
  type CommandLogGroup,
} from "@/app/command-log/mock-data";
type EventStreamProps = {
  groups: CommandLogGroup[];
  activeEventId: string | null;
  pinnedEventId: string | null;
  hasFilters: boolean;
  onSelectEvent: (eventId: string) => void;
  onResetFilters: () => void;
};
export function EventStream({
  groups,
  activeEventId,
  pinnedEventId,
  hasFilters,
  onSelectEvent,
  onResetFilters,
}: EventStreamProps) {
  if (groups.length === 0) {
    return (
      <section className="rounded-[1.75rem] border border-dashed border-white/12 bg-stone-950/50 p-6 text-stone-300">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Stream empty</p>
        <h2 className="mt-3 text-xl font-semibold text-stone-100">This window has gone quiet.</h2>
        <p className="mt-3 text-sm leading-6">No command events match the active tag set. Clear filters to repopulate the stream.</p>
        {hasFilters ? (
          <button
            className="mt-5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-white/30 hover:bg-white/5"
            onClick={onResetFilters} type="button">
            Reset tag filters
          </button>
        ) : null}
      </section>
    );
  }
  return (
    <section className="space-y-4">
      {groups.map((group) => (
        <article key={group.id} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-stone-950/75 backdrop-blur">
          <header className="flex flex-col gap-3 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{group.lane}</p>
              <h2 className="mt-2 text-xl font-semibold text-stone-100">{group.label}</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-stone-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                {group.windowLabel}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                {group.events.length} events
              </span>
            </div>
          </header>
          <div className="divide-y divide-white/8">
            {group.events.map((event) => {
              const isActive = activeEventId === event.id;
              const isPinned = pinnedEventId === event.id;

              return (
                <button
                  key={event.id} aria-pressed={isActive}
                  className={`block w-full px-5 py-4 text-left transition ${
                    isActive ? "bg-white/7" : "hover:bg-white/4"
                  }`}
                  onClick={() => onSelectEvent(event.id)} type="button">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${commandLogOutcomeClasses[event.outcome]}`} />
                        <span className="text-sm font-semibold text-stone-100">{event.title}</span>
                        {isPinned ? (
                          <span className="rounded-full border border-violet-400/25 bg-violet-400/12 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-violet-100">
                            pinned
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 font-mono text-xs text-stone-400">{event.command}</p>
                      <p className="mt-3 text-sm leading-6 text-stone-300">{event.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.tags.map((tagId) => {
                          const tag = commandLogTagIndex[tagId];
                          return (
                            <span key={tagId} className={`rounded-full border px-2.5 py-1 text-xs ${commandLogToneClasses[tag.tone]}`}>
                              {tag.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-4 text-sm text-stone-400 lg:block lg:text-right">
                      <p>{event.timestamp}</p>
                      <p className="mt-1">{event.duration}</p>
                      <p className="mt-1">{event.agent}</p>
                      <p className="mt-1 uppercase tracking-[0.18em] text-stone-500">{event.stream}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}
