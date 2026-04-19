import dynamic from "next/dynamic";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageEnhancements } from "@/components/PageEnhancements";
import { RevealSection } from "@/components/RevealSection";
import { SectionSkeleton } from "@/components/SectionSkeleton";
import {
  siteCapabilities,
  siteConfig,
  siteHighlights,
  siteNavigation,
} from "@/lib/site";

const ProjectsSection = dynamic(
  () => import("@/components/ProjectsSection").then((module) => module.ProjectsSection),
  {
    loading: () => <SectionSkeleton eyebrow="Projects" title="Selected systems and interfaces" />,
  },
);

const TestimonialsCarousel = dynamic(
  () =>
    import("@/components/TestimonialsCarousel").then(
      (module) => module.TestimonialsCarousel,
    ),
  {
    loading: () =>
      (
        <SectionSkeleton
          eyebrow="Testimonials"
          title="Recommendations from engineering and design peers"
        />
      ),
  },
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      jobTitle: "Full-stack engineer",
      description: siteConfig.description,
      knowsAbout: [
        "Frontend engineering",
        "Design systems",
        "Accessibility",
        "Full-stack product development",
        "Performance optimization",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}#website`,
      url: siteConfig.url,
      name: "Alex Portfolio",
      description: siteConfig.description,
      about: {
        "@id": `${siteConfig.url}#person`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}#webpage`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      isPartOf: {
        "@id": `${siteConfig.url}#website`,
      },
      about: {
        "@id": `${siteConfig.url}#person`,
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageEnhancements />

      <div className="pb-16">
        <header className="sticky top-0 z-40">
          <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
            <div className="glass-panel flex items-center justify-between rounded-full border border-[var(--border)] px-4 py-3 shadow-[0_18px_50px_rgba(20,32,51,0.08)] sm:px-6">
              <Link href="/" className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--ink)]">
                Alex
              </Link>

              <nav className="hidden items-center gap-5 md:flex">
                {siteNavigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-[var(--muted)] hover:text-[var(--ink)]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-8 sm:px-6 lg:px-8">
          <RevealSection id="home">
            <div className="glass-panel soft-grid grid gap-8 overflow-hidden rounded-[2.25rem] border border-[var(--border)] px-6 py-8 shadow-[var(--shadow)] lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.9fr)] lg:px-10 lg:py-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
                  Full-stack engineer
                </p>
                <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--ink)] sm:text-5xl lg:text-[4.5rem] lg:leading-none">
                  Building interfaces that feel calm at speed.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  Alex partners with product teams that need accessible frontends, resilient
                  backend foundations, and a sharper bar for performance.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white"
                  >
                    Explore selected work
                  </a>
                  <a
                    href="#testimonials"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/80 px-5 py-3 text-sm font-medium text-[var(--ink)]"
                  >
                    Read recommendations
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {siteCapabilities.map((capability) => (
                    <span
                      key={capability}
                      className="rounded-full border border-[rgba(20,32,51,0.08)] bg-white/75 px-4 py-2 text-sm text-[var(--muted)]"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {siteHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-[1.5rem] border border-[rgba(20,32,51,0.08)] bg-white/82 p-5 shadow-[0_18px_45px_rgba(20,32,51,0.06)]"
                  >
                    <p className="text-sm font-semibold text-[var(--ink)]">{highlight.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {highlight.description}
                    </p>
                  </div>
                ))}

                <div className="rounded-[1.5rem] border border-[rgba(20,32,51,0.08)] bg-[linear-gradient(135deg,rgba(15,118,110,0.12),rgba(255,255,255,0.88))] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                    Quick links
                  </p>
                  <div className="mt-4 grid gap-2">
                    {siteNavigation.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 text-sm font-medium text-[var(--ink)]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection id="projects">
            <ProjectsSection />
          </RevealSection>

          <RevealSection id="testimonials">
            <TestimonialsCarousel />
          </RevealSection>

          <RevealSection id="contact">
            <ContactForm />
          </RevealSection>
        </main>

        <footer className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel flex flex-col gap-3 rounded-[1.75rem] border border-[var(--border)] px-6 py-5 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>Built with Next.js 16, React 19, and a stricter bar for accessible detail.</p>
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-[var(--ink)]">
              {siteConfig.email}
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
