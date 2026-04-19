import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { socialLinks, siteProfile } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/80" id="contact">
      <Container className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="rounded-[2rem] border border-line bg-surface/85 p-6 shadow-card sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand">Contact</p>
          <h2 className="mt-3 text-display font-semibold tracking-tight text-text">
            Open to ambitious teams, thoughtful products, and open-source collaborations.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
            {siteProfile.bio}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button external href={`mailto:${siteProfile.email}`}>
              {siteProfile.email}
            </Button>
            <Button href={siteProfile.links.github} variant="secondary">
              View GitHub
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[2rem] border border-line bg-surface/75 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand">Based in</p>
            <p className="mt-3 text-lg font-semibold text-text">{siteProfile.location}</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              Available for remote work and select in-person collaboration in the Bay Area.
            </p>
          </div>

          <div className="rounded-[2rem] border border-line bg-surface/75 p-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand">Socials</p>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label} className="flex items-center justify-between gap-3">
                  <a
                    className="text-sm font-medium text-text transition duration-200 hover:text-brand-strong"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                  <span className="font-mono text-xs text-muted">{link.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line/80 pt-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:col-span-2">
          <p>
            © {year} {siteProfile.name}. Crafted with Next.js, React, and Tailwind CSS.
          </p>
          <p>{siteProfile.title}</p>
        </div>
      </Container>
    </footer>
  );
}
