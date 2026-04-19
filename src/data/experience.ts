import type { ExperienceRole, ExperienceStat } from "@/types/experience";

export const experienceStats = [
  {
    label: "Active users",
    value: 50,
    suffix: "K+",
    description: "daily active users on a real-time collaboration platform",
  },
  {
    label: "Faster deploys",
    value: 70,
    suffix: "%",
    description: "deployment-time reduction after overhauling delivery pipelines",
  },
  {
    label: "Latency shaved",
    value: 680,
    suffix: "ms",
    description: "p99 latency removed from a high-throughput event workflow",
  },
  {
    label: "Migration uptime",
    value: 99.99,
    suffix: "%",
    decimals: 2,
    description: "availability held during a zero-downtime platform migration",
  },
] as const satisfies readonly ExperienceStat[];

export const experiences = [
  {
    id: "nexgen-labs",
    role: "Senior Full Stack Developer",
    company: "NexGen Labs",
    period: "2023 - Present",
    summary:
      "Architecting a real-time collaboration platform serving 50K+ daily active users.",
    highlights: [
      "Led a five-engineer squad through roadmap delivery, incident response, and architectural reviews.",
      "Introduced an event-driven backbone with Apache Kafka to decouple live edits, notifications, and audit streams.",
      "Reduced deployment time by 70% through parallelized CI/CD jobs and environment-specific release automation.",
    ],
    keyAchievement: "Reduced p99 latency from 800ms to 120ms.",
    metrics: ["50K+ DAU", "5 engineers led", "70% faster deployments"],
  },
  {
    id: "cloudscale-systems",
    role: "Software Engineer",
    company: "CloudScale Systems",
    period: "2021 - 2023",
    summary:
      "Led a staged migration from a legacy monolith to 12 production microservices.",
    highlights: [
      "Defined service boundaries around billing, identity, reporting, and asynchronous job processing.",
      "Built a CI/CD pipeline that collapsed the release cycle from two weeks to roughly two hours.",
      "Mentored three junior developers on system design, observability, and code review discipline.",
    ],
    keyAchievement: "Delivered a zero-downtime migration while maintaining 99.99% uptime.",
    metrics: ["12 microservices", "2-hour release cycle", "3 engineers mentored"],
  },
  {
    id: "startuphub-inc",
    role: "Junior Developer",
    company: "StartupHub Inc.",
    period: "2020 - 2021",
    summary:
      "Built backend APIs and internal dashboards for a fast-moving startup operations team.",
    highlights: [
      "Delivered REST APIs handling more than 100K requests per day with solid monitoring and alerting.",
      "Implemented React dashboards for internal analytics, freeing business teams from spreadsheet-heavy workflows.",
      "Automated reporting jobs and data exports to remove repetitive manual weekly tasks.",
    ],
    keyAchievement: "Shipped an automated reporting system that saved 20 hours every week.",
    metrics: ["100K+ requests/day", "React analytics dashboards", "20 hours saved weekly"],
  },
] as const satisfies readonly ExperienceRole[];
