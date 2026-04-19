export interface ExperienceStat {
  readonly label: string;
  readonly value: number;
  readonly description: string;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly decimals?: number;
}

export interface ExperienceRole {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly keyAchievement: string;
  readonly metrics: readonly string[];
}
