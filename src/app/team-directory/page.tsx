export default function TeamDirectoryPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-6 py-16 sm:px-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/85 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur sm:p-12">
        <p className="text-xs font-semibold tracking-[0.24em] uppercase text-slate-500">
          Directory route scaffold
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Team Directory
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
          This route will expand into grouped team profiles, role-based highlights, and featured team coverage.
        </p>
      </div>
    </main>
  );
}
