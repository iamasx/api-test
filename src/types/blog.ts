export interface TableOfContentsItem {
  readonly id: string;
  readonly title: string;
  readonly level: 2 | 3;
}

export interface BlogPostSummary {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly publishedAt: string;
  readonly formattedDate: string;
  readonly readingTime: string;
  readonly tags: readonly string[];
  readonly featured: boolean;
}

export interface BlogPost extends BlogPostSummary {
  readonly tableOfContents: readonly TableOfContentsItem[];
}
