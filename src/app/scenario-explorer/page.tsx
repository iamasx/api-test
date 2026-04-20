export default function ScenarioExplorerPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-16">
      <section className="w-full rounded-[32px] border border-black/10 bg-white/80 p-10 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Route Shell
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Scenario Explorer
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          This route is scaffolded and ready for scenario summaries,
          comparisons, and recommendation guidance.
        </p>
      </section>
    </main>
  );
}
