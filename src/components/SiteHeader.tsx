import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Work" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/8 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--foreground)]"
        >
          iamasx
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-2 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[var(--muted)] transition hover:bg-black/5 hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
