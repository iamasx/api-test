import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[color:var(--surface)]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-zinc-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-[0.7rem] text-white">
            AS
          </span>
          <span className="hidden sm:inline">ADIL SHAIKH</span>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-2 py-1 text-sm text-zinc-600 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition-colors hover:bg-zinc-950 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
