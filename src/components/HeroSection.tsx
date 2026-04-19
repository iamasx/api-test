import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { quickFacts, siteProfile, socialLinks } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="scroll-mt-24 pt-8 sm:pt-12" id="home">
      <Container className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,26rem)] lg:items-end">
        <div className="relative">
          <div className="absolute -left-8 top-0 hidden h-40 w-40 rounded-full bg-brand/15 blur-3xl lg:block" />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/80 px-4 py-2 text-sm text-muted shadow-card">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              Based in {siteProfile.location}
            </div>

            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
                Full-stack portfolio
              </p>
              <h1 className="max-w-4xl text-hero font-semibold tracking-tight text-balance text-text">
                Building reliable interfaces and backend systems that feel calm under pressure.
              </h1>
              <p className="max-w-3xl text-lg leading-9 text-pretty text-muted">
                I&apos;m {siteProfile.name}, a {siteProfile.title.toLowerCase()} focused on elegant
                product experiences, scalable architecture, and open-source friendly engineering.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#projects">Explore selected work</Button>
              <Button external href={`mailto:${siteProfile.email}`} variant="secondary">
                Reach out
              </Button>
            </div>

            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/75 px-4 py-2 text-sm font-medium text-text transition duration-200 hover:border-brand/30 hover:bg-brand-soft/65 hover:text-brand-strong"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-muted">{link.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/90 p-6 shadow-card sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-accent to-brand" />
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand">
                Snapshot
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-text">
                Shipping thoughtful software across the stack.
              </p>
            </div>

            <div className="space-y-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="rounded-3xl border border-line/80 bg-canvas/70 p-4">
                  <div className="flex items-end justify-between gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                      {fact.label}
                    </span>
                    <span className="text-lg font-semibold text-text">{fact.value}</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted">{fact.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}
