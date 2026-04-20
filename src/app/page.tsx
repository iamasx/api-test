import Link from "next/link";

const launchChecks = [
  "Five mock archive snapshots with visible preservation metadata",
  "A route-driven detail panel keyed off the snapshot query string",
  "Render-state coverage for default, targeted, and fallback selections",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12 sm:px-10 lg:px-12">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_20px_90px_rgba(15,23,42,0.08)]">
        <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
              Issue 90 / Archive Route
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Browse sealed archive snapshots without leaving the app shell.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                The new archive browser route focuses on quick inspection:
                snapshot cards on the left, full metadata detail on the right,
                and server-rendered selection via the query string.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/archive-browser"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-amber-50 transition hover:bg-slate-800"
              >
                Open archive browser
              </Link>
              <a
                href="https://github.com/iamasx/api-test/issues/90"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
                target="_blank"
                rel="noreferrer"
              >
                Review issue scope
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200/80 bg-[var(--surface-strong)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Delivery checks
            </p>
            <ul className="mt-5 space-y-4">
              {launchChecks.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-white/75 px-4 py-4 text-sm leading-6 text-slate-600"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
