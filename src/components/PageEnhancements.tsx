"use client";

import { useEffect, useState } from "react";

const SPLASH_STORAGE_KEY = "alex-portfolio-splash";

export function PageEnhancements() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const updateScrollButton = () => {
      setShowScrollTop(window.scrollY > 720);
    };

    updateScrollButton();
    window.addEventListener("scroll", updateScrollButton, { passive: true });

    let splashTimer: number | undefined;

    try {
      if (!window.sessionStorage.getItem(SPLASH_STORAGE_KEY)) {
        window.requestAnimationFrame(() => setShowSplash(true));
        splashTimer = window.setTimeout(
          () => {
            setShowSplash(false);
            window.sessionStorage.setItem(SPLASH_STORAGE_KEY, "seen");
          },
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 820,
        );
      }
    } catch {}

    return () => {
      window.removeEventListener("scroll", updateScrollButton);

      if (splashTimer) {
        window.clearTimeout(splashTimer);
      }
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className={`splash-screen ${showSplash ? "is-visible" : "is-hidden"}`}
      >
        <div className="glass-panel rounded-[1.75rem] border border-[var(--border)] px-6 py-5 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            Alex
          </p>
          <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
            Building interfaces that feel calm at speed.
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[rgba(20,32,51,0.08)]">
            <div className="splash-bar h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]" />
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll back to top"
        className={`scroll-top-button ${showScrollTop ? "is-visible" : ""}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
          });
        }}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
          <path
            d="M12 18V6m0 0-5 5m5-5 5 5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </button>
    </>
  );
}
