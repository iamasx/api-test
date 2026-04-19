import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { BlogPost, BlogPostSummary, TableOfContentsItem } from "@/types/blog";

const BLOG_DIRECTORY = path.join(process.cwd(), "src/content/blog");
const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

interface RawFrontmatter {
  readonly title?: unknown;
  readonly excerpt?: unknown;
  readonly publishedAt?: unknown;
  readonly readingTime?: unknown;
  readonly tags?: unknown;
  readonly featured?: unknown;
}

interface BlogFrontmatter {
  readonly title: string;
  readonly excerpt: string;
  readonly publishedAt: string;
  readonly readingTime: string;
  readonly tags: readonly string[];
  readonly featured: boolean;
}

function parseFrontmatter(slug: string, data: RawFrontmatter): BlogFrontmatter {
  if (typeof data.title !== "string") {
    throw new Error(`Missing blog title for "${slug}".`);
  }

  if (typeof data.excerpt !== "string") {
    throw new Error(`Missing blog excerpt for "${slug}".`);
  }

  const publishedAt =
    typeof data.publishedAt === "string"
      ? data.publishedAt
      : data.publishedAt instanceof Date
        ? data.publishedAt.toISOString().slice(0, 10)
        : null;

  if (!publishedAt) {
    throw new Error(`Missing blog publishedAt for "${slug}".`);
  }

  if (typeof data.readingTime !== "string") {
    throw new Error(`Missing blog readingTime for "${slug}".`);
  }

  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`Invalid blog tags for "${slug}".`);
  }

  return {
    title: data.title,
    excerpt: data.excerpt,
    publishedAt,
    readingTime: data.readingTime,
    tags: data.tags,
    featured: data.featured === true,
  };
}

function createSummary(slug: string, frontmatter: BlogFrontmatter): BlogPostSummary {
  return {
    slug,
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    publishedAt: frontmatter.publishedAt,
    formattedDate: formatPublishedDate(frontmatter.publishedAt),
    readingTime: frontmatter.readingTime,
    tags: frontmatter.tags,
    featured: frontmatter.featured,
  };
}

function extractTableOfContents(markdown: string): readonly TableOfContentsItem[] {
  const headings: TableOfContentsItem[] = [];
  const slugger = new GithubSlugger();
  let inCodeBlock = false;

  for (const rawLine of markdown.split(/\r?\n/u)) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    const match = /^(##|###)\s+(.+)$/u.exec(line);
    if (!match) {
      continue;
    }

    const title = match[2]
      .replace(/\[(.*?)\]\(.*?\)/gu, "$1")
      .replace(/[*_`]/gu, "")
      .trim();

    headings.push({
      id: slugger.slug(title),
      title,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}

export function formatPublishedDate(value: string): string {
  return DATE_FORMATTER.format(new Date(value));
}

export const getAllPosts = cache((): readonly BlogPostSummary[] => {
  const files = fs
    .readdirSync(BLOG_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"));

  const posts = files.map((entry) => {
    const slug = entry.name.replace(/\.mdx$/u, "");
    const source = fs.readFileSync(path.join(BLOG_DIRECTORY, entry.name), "utf8");
    const { data } = matter(source);

    return createSummary(slug, parseFrontmatter(slug, data));
  });

  return posts.sort((left, right) => {
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
});

export const getPostBySlug = cache((slug: string): BlogPost | null => {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const summary = createSummary(slug, parseFrontmatter(slug, data));

  return {
    ...summary,
    tableOfContents: extractTableOfContents(content),
  };
});

export function getFeaturedPost(posts: readonly BlogPostSummary[] = getAllPosts()): BlogPostSummary {
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];

  if (!featuredPost) {
    throw new Error("No blog posts available.");
  }

  return featuredPost;
}

export function getRecentPosts(
  limit: number,
  posts: readonly BlogPostSummary[] = getAllPosts(),
): readonly BlogPostSummary[] {
  const featuredPost = getFeaturedPost(posts);
  return posts.filter((post) => post.slug !== featuredPost.slug).slice(0, limit);
}
