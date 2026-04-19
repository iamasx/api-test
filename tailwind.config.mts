import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "mesh-glow":
          "radial-gradient(circle at top left, color-mix(in oklab, var(--color-brand) 18%, transparent) 0, transparent 32rem), radial-gradient(circle at top right, color-mix(in oklab, var(--color-accent) 18%, transparent) 0, transparent 26rem)",
        "soft-grid":
          "linear-gradient(to right, color-mix(in oklab, var(--color-line) 65%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-line) 65%, transparent) 1px, transparent 1px)",
      },
      boxShadow: {
        card: "0 18px 60px color-mix(in oklab, var(--color-shadow) 12%, transparent)",
        glow: "0 16px 44px color-mix(in oklab, var(--color-brand) 26%, transparent)",
      },
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        shadow: "var(--color-shadow)",
        brand: {
          DEFAULT: "var(--color-brand)",
          soft: "var(--color-brand-soft)",
          strong: "var(--color-brand-strong)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2rem, 1.35rem + 2vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.05em" },
        ],
        hero: [
          "clamp(2.9rem, 2rem + 4vw, 5.75rem)",
          { lineHeight: "0.95", letterSpacing: "-0.065em" },
        ],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        drift: "drift 12s ease-in-out infinite",
        "fade-up": "fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 12s linear infinite",
      },
    },
  },
} satisfies Config;

export default config;
