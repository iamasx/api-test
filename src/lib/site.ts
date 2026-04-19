export type Theme = "light" | "dark";

export interface NavigationItem {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly value: string;
}

export const themeStorageKey = "alex-rivera-theme";

export const siteProfile = {
  name: "Alex Rivera",
  title: "Full Stack Developer & Open Source Enthusiast",
  location: "San Francisco, CA",
  email: "alex.rivera@devmail.io",
  bio: "Passionate full-stack developer with 6+ years of experience building scalable web applications. Core contributor to several open-source projects. Love turning complex problems into elegant, user-friendly solutions.",
  links: {
    github: "https://github.com/alexrivera-dev",
    linkedin: "https://linkedin.com/in/alexrivera",
    twitter: "https://x.com/alexrivera_dev",
  },
  twitterHandle: "@alexrivera_dev",
} as const;

export const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

export const socialLinks = [
  { label: "GitHub", href: siteProfile.links.github, value: "alexrivera-dev" },
  { label: "LinkedIn", href: siteProfile.links.linkedin, value: "alexrivera" },
  { label: "Twitter / X", href: siteProfile.links.twitter, value: siteProfile.twitterHandle },
] as const satisfies readonly SocialLink[];

export const quickFacts = [
  {
    label: "Experience",
    value: "6+ years",
    detail: "Building production-grade applications across frontend, backend, and platform layers.",
  },
  {
    label: "Open source",
    value: "Core contributor",
    detail: "Contributor to community tooling with a bias toward maintainable DX and clear APIs.",
  },
  {
    label: "Location",
    value: siteProfile.location,
    detail: "Available for remote collaboration and select in-person work with Bay Area teams.",
  },
] as const;

export const workingPrinciples = [
  {
    title: "Systems that scale",
    description:
      "From API boundaries to UI states, I design for real product load instead of happy-path demos.",
  },
  {
    title: "Open-source mindset",
    description:
      "Clear documentation, strong defaults, and maintainable code are part of the product, not afterthoughts.",
  },
  {
    title: "Fast, calm execution",
    description:
      "I like reducing complexity, tightening feedback loops, and turning ambiguous requirements into shippable interfaces.",
  },
] as const;

export function getThemeScript() {
  return `
    try {
      const storageKey = ${JSON.stringify(themeStorageKey)};
      const storedTheme = window.localStorage.getItem(storageKey);
      const preferredTheme =
        storedTheme === "light" || storedTheme === "dark"
          ? storedTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";

      const root = document.documentElement;
      root.dataset.theme = preferredTheme;
      root.style.colorScheme = preferredTheme;
      root.classList.toggle("dark", preferredTheme === "dark");
    } catch (error) {
      document.documentElement.dataset.theme = "light";
    }
  `;
}
