import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Archive Signals",
    template: "%s | Archive Signals",
  },
  description:
    "Operational dashboards, experiment registries, and field guides for archive-driven teams.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team-directory", label: "Team Directory" },
  { href: "/archive-browser", label: "Archive" },
  { href: "/research-notebook", label: "Notebook" },
  { href: "/field-guide", label: "Field Guide" },
  { href: "/operations-center", label: "Ops Center" },
  { href: "/experiment-registry", label: "Experiments" },
  { href: "/queue-monitor", label: "Queue Monitor" },
  { href: "/parcel-hub", label: "Parcel Hub" },
  { href: "/status-board", label: "Status Board" },
  { href: "/handoff-journal", label: "Handoff Journal" },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50/40">
        <nav className="app-nav" aria-label="Primary">
          <Link href="/" className="app-nav__brand">
            Archive Signals
          </Link>
          <ul className="app-nav__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="app-nav__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {children}
        <footer className="mt-auto border-t border-[var(--line)] py-6 text-center">
          <p className="section-label text-slate-500">
            Archive Signals &middot; Team Directory &middot; Status Board &middot; Built for conflict testing
          </p>
        </footer>
      </body>
    </html>
  );
}
