import {
  commandLogTagIndex,
  commandLogToneClasses,
  type CommandLogEvent,
} from "@/app/command-log/mock-data";
type EventDetailRailProps = {
  event: CommandLogEvent | null;
  isPinned: boolean;
  isPinnedHidden: boolean;
  onTogglePin: () => void;
  onClearSelection: () => void;
};
export function EventDetailRail({
  event,
  isPinned,
  isPinnedHidden,
  onTogglePin,
  onClearSelection,
}: EventDetailRailProps) {
  if (!event) {
    return (
      <aside className="rounded-[1.75rem] border border-dashed border-white/12 bg-stone-950/50 p-6 text-stone-300">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Detail rail</p>
        <h2 className="mt-3 text-xl font-semibold text-stone-100">No event selected.</h2>
        <p className="mt-3 text-sm leading-6">
          Choose an event from the stream, or pin one so the rail stays anchored while filters move around it.
        </p>
      </aside>
    );
  }
  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-stone-950/80 p-5 backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{event.id}</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-100">{event.title}</h2>
          <p className="mt-3 text-sm leading-6 text-stone-300">{event.detailSummary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-full border border-violet-400/25 bg-violet-400/12 px-4 py-2 text-sm font-medium text-violet-100 transition hover:bg-violet-400/18"
            onClick={onTogglePin} type="button">
            {isPinned ? "Unpin rail" : "Pin rail"}
          </button>
          <button
            className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-white/30 hover:bg-white/5"
            onClick={onClearSelection} type="button">
            Clear selection
          </button>
        </div>
      </div>
      {isPinnedHidden ? (
        <p className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          This pinned event is currently hidden by tag filters, but the rail stays locked to it.
        </p>
      ) : null}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Command</p>
          <p className="mt-2 font-mono text-xs leading-6 text-stone-200">{event.command}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-4 text-sm text-stone-300">
          <p>{event.stream}</p>
          <p className="mt-2">{event.timestamp}</p>
          <p className="mt-2">{event.duration}</p>
          <p className="mt-2">{event.agent}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {event.tags.map((tagId) => {
          const tag = commandLogTagIndex[tagId];
          return (
            <span key={tagId} className={`rounded-full border px-3 py-1.5 text-sm ${commandLogToneClasses[tag.tone]}`}>
              {tag.label}
            </span>
          );
        })}
      </div>
      <ol className="mt-5 space-y-3">
        {event.details.map((detail) => (
          <li key={detail} className="rounded-[1.35rem] border border-white/8 bg-white/4 px-4 py-3 text-sm leading-6 text-stone-300">
            {detail}
          </li>
        ))}
      </ol>
    </aside>
  );
}
