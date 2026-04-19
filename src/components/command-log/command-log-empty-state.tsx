type CommandLogEmptyStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function CommandLogEmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: CommandLogEmptyStateProps) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-white/12 bg-stone-950/50 p-6 text-stone-300">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold text-stone-100">{title}</h3>
      <p className="mt-3 text-sm leading-6">{description}</p>
      {actionLabel && onAction ? (
        <button
          className="mt-5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-stone-100 transition hover:border-white/30 hover:bg-white/5"
          onClick={onAction}
          type="button"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
