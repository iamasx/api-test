import {
  commandLogToneClasses,
  type CommandLogTag,
} from "@/app/command-log/mock-data";

type TagFilterBarProps = {
  tags: CommandLogTag[];
  activeTagIds: string[];
  visibleCount: number;
  totalCount: number;
  visibleTagCounts: Record<string, number>;
  onToggleTag: (tagId: string) => void;
  onReset: () => void;
};

export function TagFilterBar({
  tags,
  activeTagIds,
  visibleCount,
  totalCount,
  visibleTagCounts,
  onToggleTag,
  onReset,
}: TagFilterBarProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-stone-950/70 p-5 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Tag filters</p>
          <p className="mt-2 text-sm text-stone-300">
            Matching any active tag keeps an event in view. Showing {visibleCount} of{" "}
            {totalCount} events.
          </p>
        </div>
        <button
          className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-white/30 hover:bg-white/5"
          onClick={onReset}
          type="button"
        >
          Clear filters
        </button>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {tags.map((tag) => {
          const isActive = activeTagIds.includes(tag.id);
          const count = visibleTagCounts[tag.id] ?? 0;

          return (
            <button
              key={tag.id}
              className={`rounded-full border px-4 py-2 text-left transition ${
                isActive
                  ? `${commandLogToneClasses[tag.tone]} shadow-[0_0_0_1px_rgba(255,255,255,0.06)]`
                  : "border-white/10 bg-white/5 text-stone-300 hover:border-white/20 hover:bg-white/8"
              }`}
              onClick={() => onToggleTag(tag.id)}
              type="button"
            >
              <span className="block text-sm font-semibold">{tag.label}</span>
              <span className="mt-1 block text-xs opacity-80">
                {count} visible · {tag.hint}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
