"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navigationItems, siteProfile } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          className="group flex min-w-0 items-center gap-3"
          href="#home"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-sm font-semibold tracking-[0.2em] text-white shadow-glow transition-transform duration-200 group-hover:-translate-y-0.5">
            AR
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-text">{siteProfile.name}</span>
            <span className="block truncate text-xs text-muted">{siteProfile.title}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:bg-brand-soft/70 hover:text-brand-strong"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            className="hidden md:inline-flex"
            external
            href={`mailto:${siteProfile.email}`}
            variant="secondary"
          >
            Say hello
          </Button>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/80 text-text transition duration-200 hover:border-brand/40 hover:bg-brand-soft/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <span className="sr-only">Menu</span>
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path
                d={isMenuOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.8"
              />
            </svg>
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "grid overflow-hidden border-t border-line/80 transition-all duration-300 md:hidden",
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-3 py-4">
            <nav className="flex flex-col gap-2" id="mobile-navigation">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-text transition duration-200 hover:border-brand/20 hover:bg-brand-soft/60"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Button external href={`mailto:${siteProfile.email}`} variant="secondary">
              Start a conversation
            </Button>
          </Container>
        </div>
      </div>
    </header>
  );
}
