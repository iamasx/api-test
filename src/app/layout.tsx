import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
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
    default: "iamasx | Senior Full Stack Developer",
    template: "%s | iamasx",
  },
  description:
    "Portfolio for iamasx, a senior full stack developer focused on real-time collaboration, product systems, and developer experience.",
};

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
      <body className="min-h-full">
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          {children}
          <footer className="mt-auto border-t border-black/8 bg-white/55">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground)]">
                  iamasx
                </p>
                <p className="mt-2 max-w-xl leading-7">
                  Senior full stack developer building collaborative product systems with equal
                  attention to interaction quality and backend clarity.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/about"
                  className="rounded-full border border-black/10 px-4 py-2 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  About
                </Link>
                <Link
                  href="/#projects"
                  className="rounded-full border border-black/10 px-4 py-2 text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Work
                </Link>
                <a
                  href="mailto:hello@iamasx.dev"
                  className="rounded-full bg-[var(--foreground)] px-4 py-2 font-semibold text-white transition hover:bg-black"
                >
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
