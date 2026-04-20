import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Inventory",
  description: "Initial shell for the asset inventory catalog route.",
};

export default function AssetInventoryPage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-100 px-5 py-8 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6">
        <section className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.7)] sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Asset Inventory
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Inventory catalog route shell
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            This route is reserved for the inventory catalog experience. The
            next steps will populate it with category sections, item cards,
            stock indicators, and a selected-item detail panel.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_320px]">
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)]">
            <h2 className="text-2xl font-semibold">Catalog Placeholder</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Inventory sections and asset cards will render here once the mock
              data and reusable catalog components are wired in.
            </p>
          </div>
          <aside className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-6 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)]">
            <h2 className="text-2xl font-semibold">Detail Panel Placeholder</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A persistent panel for the selected inventory item will live here.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
