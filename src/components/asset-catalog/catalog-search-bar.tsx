import type { ChangeEvent } from "react";

type CatalogSearchBarProps = {
  searchValue: string;
  resultCount: number;
  totalCount: number;
  onSearchChange: (value: string) => void;
};

export function CatalogSearchBar({
  searchValue,
  resultCount,
  totalCount,
  onSearchChange,
}: CatalogSearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Search
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Find assets by code, crew, staging lane, or availability notes
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Search spans asset names, category context, lead assignments,
            supply paths, and operational constraints.
          </p>
        </div>
        <p className="text-sm font-medium text-slate-600">
          {resultCount} visible of {totalCount} tracked assets
        </p>
      </div>

      <label className="mt-5 block">
        <span className="sr-only">Search assets</span>
        <input
          type="search"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search Meridian, dock workshop, backup hull, LiDAR..."
          className="w-full rounded-[1.5rem] border border-slate-300 bg-slate-50 px-5 py-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:bg-white"
        />
      </label>
    </section>
  );
}
