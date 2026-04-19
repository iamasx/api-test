import type { InventoryItem, RestockSuggestion, StorageZone } from "@/app/inventory-bay/mock-data";

type RestockSuggestionsPanelProps = {
  suggestions: RestockSuggestion[];
  acknowledgedIds: string[];
  showAcknowledged: boolean;
  itemMap: Record<string, InventoryItem>;
  zoneMap: Record<string, StorageZone>;
  onToggleSuggestion: (suggestionId: string) => void;
  toggleAcknowledgedView: () => void;
};

export function RestockSuggestionsPanel({
  suggestions,
  acknowledgedIds,
  showAcknowledged,
  itemMap,
  zoneMap,
  onToggleSuggestion,
  toggleAcknowledgedView,
}: RestockSuggestionsPanelProps) {
  return (
    <aside className="rounded-[1.75rem] border border-stone-900/10 bg-stone-950 p-5 text-stone-50 shadow-[0_18px_54px_rgba(28,25,23,0.32)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">Restock Suggestions</p>
          <h2 className="mt-2 text-2xl font-semibold">Local queue</h2>
          <p className="mt-2 text-sm leading-6 text-stone-300">Acknowledge a suggestion to clear it from the default queue. The state resets with the session.</p>
        </div>
        <button className="rounded-full border border-stone-700 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:border-stone-500" onClick={toggleAcknowledgedView} type="button">
          {showAcknowledged ? "Hide acknowledged" : "Show acknowledged"}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {suggestions.length ? suggestions.map((suggestion) => {
          const item = itemMap[suggestion.itemId];
          const zone = zoneMap[suggestion.zoneId];
          const isAcknowledged = acknowledgedIds.includes(suggestion.id);

          return (
            <article className="rounded-[1.5rem] border border-stone-800 bg-stone-900/80 p-4" key={suggestion.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">{zone.label}</p>
                  <h3 className="mt-2 text-lg font-semibold text-stone-50">{item.name}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${suggestion.priority === "critical" ? "bg-rose-500/20 text-rose-200" : "bg-amber-500/20 text-amber-200"}`}>{suggestion.priority}</span>
              </div>
              <p className="mt-4 text-sm text-stone-300">+{suggestion.suggestedUnits} units · {suggestion.supplier} · {suggestion.etaWindow} · {item.sku}</p>
              <p className="mt-3 text-sm leading-6 text-stone-300">{suggestion.rationale}</p>
              <button className={`mt-4 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isAcknowledged ? "bg-stone-700 text-stone-100 hover:bg-stone-600" : "bg-amber-400 text-stone-950 hover:bg-amber-300"
              }`} onClick={() => onToggleSuggestion(suggestion.id)} type="button">
                {isAcknowledged ? "Reopen suggestion" : "Acknowledge suggestion"}
              </button>
            </article>
          );
        }) : (
          <div className="rounded-[1.5rem] border border-dashed border-stone-700 bg-stone-900/70 px-5 py-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-400">Queue empty</p>
            <h3 className="mt-3 text-xl font-semibold text-stone-50">No restock suggestions are visible for this view.</h3>
            <p className="mt-3 text-sm leading-6 text-stone-300">Adjust the bay filters or reveal acknowledged suggestions to inspect the full local queue again.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
