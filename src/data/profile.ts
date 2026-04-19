import type { InterestItem, ProfileSummary, SkillItem, TimelineEntry } from "@/types/profile";

export const profileSummary = {
  name: "iamasx",
  role: "Senior Full Stack Developer",
  tagline:
    "I design calm, high-leverage product experiences and resilient backend systems for teams shipping real-time collaboration at scale.",
  availability: "Open to platform, product, and developer-experience collaborations.",
  email: "hello@iamasx.dev",
} as const satisfies ProfileSummary;

export const bioParagraphs = [
  "I am a full stack engineer who likes turning ambiguous ideas into software with clear edges: stable APIs, responsive interfaces, and systems that stay understandable as a team grows.",
  "My career started with REST services and React dashboards at StartupHub Inc., expanded into distributed systems while helping CloudScale Systems migrate a monolith into microservices, and now centers on architecting a real-time collaboration platform at NexGen Labs.",
  "I care as much about developer experience as end-user experience. The strongest product work usually comes from thoughtful architecture, honest tradeoffs, and the discipline to keep interfaces calm even when the underlying system is complex.",
] as const;

export const timelineEntries = [
  {
    id: "berkeley",
    kind: "Education",
    period: "2016-2020",
    startYear: 2016,
    title: "B.S. Computer Science",
    organization: "UC Berkeley",
    description:
      "Built a strong foundation in systems, algorithms, and product-minded engineering while pairing coursework with hands-on team projects.",
    highlights: [
      "Graduated with a systems-focused CS foundation",
      "Balanced theory with collaborative product builds",
    ],
  },
  {
    id: "startuphub",
    kind: "Career",
    period: "2020-2021",
    startYear: 2020,
    title: "Junior Developer",
    organization: "StartupHub Inc.",
    description:
      "Built REST APIs and React dashboards for internal tools, shipping fast while learning how product decisions affect architecture and operations.",
    highlights: [
      "Delivered REST endpoints for customer-facing workflows",
      "Built React dashboards for product and ops teams",
    ],
  },
  {
    id: "cloudscale",
    kind: "Career",
    period: "2021-2023",
    startYear: 2021,
    title: "Software Engineer",
    organization: "CloudScale Systems",
    description:
      "Led a key slice of a monolith-to-microservices migration, focusing on service boundaries, observability, and safer deployment practices.",
    highlights: [
      "Drove service extraction with clear API contracts",
      "Improved release confidence with stronger operational tooling",
    ],
  },
  {
    id: "nexgen",
    kind: "Career",
    period: "2023-Present",
    startYear: 2023,
    title: "Senior Full Stack Developer",
    organization: "NexGen Labs",
    description:
      "Architecting a real-time collaboration platform with an emphasis on reliability, latency, and thoughtful UX for complex workflows.",
    highlights: [
      "Own architecture for collaborative product surfaces",
      "Bridge frontend polish with backend scalability decisions",
    ],
  },
] as const satisfies readonly TimelineEntry[];

export const skillItems = [
  {
    category: "Frontend",
    description: "Polished interfaces, design systems, and fluid interaction architecture.",
    proficiency: 95,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "#0f766e",
    accentSoft: "rgba(15, 118, 110, 0.14)",
  },
  {
    category: "Backend",
    description: "APIs, data models, background jobs, and performance under real-world load.",
    proficiency: 90,
    technologies: ["Node.js", "Python", "Go", "PostgreSQL", "Redis"],
    accent: "#b45309",
    accentSoft: "rgba(180, 83, 9, 0.14)",
  },
  {
    category: "DevOps",
    description: "Deployment pipelines, infrastructure hygiene, and production confidence.",
    proficiency: 80,
    technologies: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    accent: "#4f46e5",
    accentSoft: "rgba(79, 70, 229, 0.14)",
  },
  {
    category: "Tools",
    description: "The workflow layer that keeps engineering communication and delivery clean.",
    proficiency: 85,
    technologies: ["Git", "VS Code", "Figma", "Jira", "Notion"],
    accent: "#be185d",
    accentSoft: "rgba(190, 24, 93, 0.14)",
  },
] as const satisfies readonly SkillItem[];

export const interests = [
  {
    title: "Open-source contribution",
    description:
      "I like contributing improvements that remove friction for other developers, especially around tooling and documentation.",
  },
  {
    title: "Rock climbing",
    description:
      "Climbing keeps me honest about patience, incremental progress, and trusting a plan when the route looks awkward.",
  },
  {
    title: "Photography",
    description:
      "I use photography as a way to study framing, contrast, and the small details that make a composition feel intentional.",
  },
  {
    title: "Electronic music production",
    description:
      "Sound design and arrangement scratch the same itch as software: layering complexity until it feels effortless to the listener.",
  },
] as const satisfies readonly InterestItem[];
