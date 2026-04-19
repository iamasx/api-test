export interface Testimonial {
  readonly name: string;
  readonly title: string;
  readonly company: string;
  readonly quote: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    name: "Sarah Chen",
    title: "Engineering Manager",
    company: "TechCorp",
    quote:
      "Alex is one of the most versatile engineers I've worked with. Their ability to architect complex systems while maintaining clean, readable code is remarkable. They elevated our entire team's standards.",
  },
  {
    name: "Marcus Johnson",
    title: "CTO",
    company: "StartupHub Inc.",
    quote:
      "I hired Alex as a junior developer and watched them grow into one of our strongest engineers within a year. Their curiosity and drive to learn is unmatched. Any team would be lucky to have them.",
  },
  {
    name: "Priya Patel",
    title: "Senior Designer",
    company: "NexGen Labs",
    quote:
      "Working with Alex on the collaboration platform was a dream. They have an incredible eye for translating designs into pixel-perfect, accessible implementations. They truly care about the user experience.",
  },
  {
    name: "David Kim",
    title: "Open Source Maintainer",
    company: "Independent",
    quote:
      "Alex's contributions to our project were outstanding. Not just the code quality, but the thoughtful PR descriptions, thorough testing, and willingness to mentor newcomers. A model open-source citizen.",
  },
] as const;
