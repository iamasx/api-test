export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.55)] backdrop-blur">
        <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
          API Test
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Shared routes stay intentionally minimal in this branch.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
          Dedicated issue work lives in isolated App Router segments. This
          placeholder keeps the repository&apos;s required root entrypoint intact
          without introducing navigation or shared UI for feature routes.
        </p>
      </div>
    </main>
  );
}
