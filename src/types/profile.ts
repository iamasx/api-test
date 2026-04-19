export type TimelineKind = "Education" | "Career";

export interface ProfileSummary {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly availability: string;
  readonly email: string;
}

export interface TimelineEntry {
  readonly id: string;
  readonly kind: TimelineKind;
  readonly period: string;
  readonly startYear: number;
  readonly title: string;
  readonly organization: string;
  readonly description: string;
  readonly highlights: readonly string[];
}

export type SkillCategory = "Frontend" | "Backend" | "DevOps" | "Tools";

export interface SkillItem {
  readonly category: SkillCategory;
  readonly description: string;
  readonly proficiency: number;
  readonly technologies: readonly string[];
  readonly accent: string;
  readonly accentSoft: string;
}

export interface InterestItem {
  readonly title: string;
  readonly description: string;
}
