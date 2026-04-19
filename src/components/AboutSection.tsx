import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { siteProfile, workingPrinciples } from "@/lib/site";

export function AboutSection() {
  return (
    <section className="scroll-mt-24 py-14 sm:py-20" id="about">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <SectionHeading
          description={siteProfile.bio}
          eyebrow="About"
          title="A pragmatic product engineer with equal respect for usability, performance, and long-term maintainability."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {workingPrinciples.map((principle, index) => (
            <article
              key={principle.title}
              className="rounded-[1.75rem] border border-line bg-surface/80 p-6 shadow-card sm:p-7"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">
                0{index + 1}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-text">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{principle.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
