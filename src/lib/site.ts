const FALLBACK_SITE_URL = "https://example.com";

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return FALLBACK_SITE_URL;
  }

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteConfig = {
  name: "Alex",
  title: "Alex | Full-stack engineer building calm, high-performance products",
  description:
    "Portfolio for Alex, a full-stack engineer focused on accessible interfaces, resilient systems, and product-minded execution.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: "hello@example.com",
  location: "Remote, worldwide",
  ogAlt: "Portfolio social card for Alex",
  keywords: [
    "Alex portfolio",
    "full-stack engineer",
    "frontend engineer",
    "Next.js portfolio",
    "accessible web development",
    "product engineering",
  ],
} as const;

export const siteNavigation = [
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
] as const;

export const siteCapabilities = [
  "Accessible UI systems",
  "Performance budgets",
  "Product-minded architecture",
  "Cross-functional delivery",
] as const;

export const siteHighlights = [
  {
    title: "Design-aware engineering",
    description:
      "Alex translates ambitious product ideas into interfaces that feel precise, fast, and easy to trust.",
  },
  {
    title: "Performance discipline",
    description:
      "Lazy-loaded interactions, metadata that ships correctly, and client bundles that stay intentionally small.",
  },
  {
    title: "Clear collaboration",
    description:
      "Strong specs, thoughtful pull requests, and a reliable feedback loop with design, product, and platform teams.",
  },
] as const;

export const socialImageUrl = `${siteConfig.url}/opengraph-image`;
