export interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly description: string;
  readonly fullDescription: string;
  readonly features: readonly string[];
  readonly techStack: readonly string[];
  readonly challenges: string;
  readonly githubUrl: string;
  readonly liveUrl?: string;
  readonly imageAlt: string;
  readonly stats: string;
}

export type ProjectCategory = "Frontend" | "Backend" | "Full Stack" | "DevOps";

export type FilterCategory = "All" | ProjectCategory;
