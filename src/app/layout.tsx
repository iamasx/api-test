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
    "An archive-focused Next.js app with snapshot cards, metadata badges, and an operations-center dashboard.",
};

const navLinks = [
  { href: "/archive-browser", label: "Archive" },
  { href: "/research-notebook", label: "Notebook" },
  { href: "/field-guide", label: "Field Guide" },
  { href: "/operations-center", label: "Ops Center" },
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
      <body className="flex min-h-full flex-col">
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
      </body>
    </html>
  );
}
