"use client";

import type { Theme } from "@/lib/site";
import { themeStorageKey } from "@/lib/site";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  readonly className?: string;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  root.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(themeStorageKey, theme);
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  return (
    <button
      aria-label="Toggle color theme"
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/80 text-text transition duration-200 hover:border-brand/40 hover:bg-brand-soft/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
      onClick={() => {
        const resolvedTheme =
          document.documentElement.dataset.theme === "dark" ? "light" : "dark";

        applyTheme(resolvedTheme);
      }}
      type="button"
    >
      <span className="sr-only">Theme</span>
      <svg
        aria-hidden="true"
        className="h-5 w-5 dark:hidden"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.75"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="hidden h-5 w-5 dark:block"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M20.07 14.68A8 8 0 1 1 9.32 3.93 6.75 6.75 0 0 0 20.07 14.68Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      </svg>
    </button>
  );
}
