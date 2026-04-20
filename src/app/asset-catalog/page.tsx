import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Catalog",
  description:
    "Initial shell for the asset catalog route with space for searchable sections and availability detail.",
};

const placeholderCategories = [
  "Flight Systems",
  "Field Support",
  "Power Reserves",
];

const placeholderChecks = [
  "Searchable sections will land in the next subtask.",
  "Availability detail stays pinned as the focused panel.",
  "Mock asset and category data will drive the final layout.",
];

export default function AssetCatalogPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf0_0%,#f6f1e7_52%,#f8fafc_100%)] px-6 py-8 text-slate-950 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_100px_-40px_rgba(15,23,42,0.85)] sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
            Asset Catalog
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Minimal route shell for searchable asset sections and availability
            detail.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            This first pass establishes the dedicated route requested in issue
            128. Search, category tabs, asset cards, and the focused detail
            panel will be layered in through the remaining subtasks.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_320px]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
            <div className="flex flex-wrap gap-3">
              {placeholderCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Catalog Workspace
              </p>
              <p className="mt-4 text-lg font-semibold text-slate-950">
                Search field, grouped asset cards, and responsive states will be
                implemented in the next subtasks.
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#162033_0%,#0f172a_100%)] p-6 text-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.85)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Focus Panel
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              Availability detail panel placeholder
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {placeholderChecks.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </div>
    </main>
  );
}
