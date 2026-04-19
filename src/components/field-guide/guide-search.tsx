type GuideSearchProps = {
  query: string;
  resultCount: number;
  totalCount: number;
  onQueryChange: (value: string) => void;
};

export default function GuideSearch({
  query,
  resultCount,
  totalCount,
  onQueryChange,
}: GuideSearchProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-5 shadow-lg shadow-slate-200/50">
      <label
        className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500"
        htmlFor="field-guide-search"
      >
        Search procedures
      </label>
      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
        <input
          id="field-guide-search"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Try uplink, downtime, dock, or telemetry"
          type="search"
          value={query}
        />
        <p className="text-sm text-slate-600 lg:min-w-max">
          Showing {resultCount} of {totalCount} mock procedures
        </p>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Search checks titles and summaries only, while team, difficulty, and
        status filters stay entirely client-side.
      </p>
    </section>
  );
}
