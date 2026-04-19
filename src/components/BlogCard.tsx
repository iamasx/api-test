"use client";

import Link from "next/link";
import type { BlogPostSummary } from "@/types/blog";

interface BlogCardProps {
  readonly post: BlogPostSummary;
  readonly featured?: boolean;
  readonly onTagClick?: (tag: string) => void;
}

export function BlogCard({ post, featured = false, onTagClick }: BlogCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-[1.75rem] border border-zinc-200/70 bg-white/85 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.85)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${
        featured ? "grid gap-0 lg:grid-cols-[0.95fr_1.05fr]" : "flex flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[linear-gradient(135deg,#f4c96b_0%,#f7f1df_45%,#d8e2f9_100%)] ${
          featured ? "min-h-[18rem]" : "min-h-[12rem]"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_45%),linear-gradient(180deg,transparent,rgba(15,23,42,0.12))]" />
        <div className="relative flex h-full flex-col justify-between p-6">
          <span className="w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700">
            {post.tags[0]}
          </span>
          <div className="max-w-xs">
            <p className="text-sm text-zinc-600">Cover placeholder</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              {post.publishedAt.slice(0, 4)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
          <time dateTime={post.publishedAt}>{post.formattedDate}</time>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
          <span>{post.readingTime}</span>
          {post.featured && (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
              <span className="font-medium text-zinc-700">Featured</span>
            </>
          )}
        </div>

        <div className="mt-4 space-y-3">
          <h3
            className={`font-semibold tracking-tight text-zinc-950 ${
              featured ? "text-3xl" : "text-2xl"
            }`}
          >
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-amber-700">
              {post.title}
            </Link>
          </h3>
          <p className="text-base leading-7 text-zinc-600">{post.excerpt}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) =>
            onTagClick ? (
              <button
                key={tag}
                type="button"
                onClick={() => onTagClick(tag)}
                className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 transition-colors hover:bg-amber-200"
              >
                {tag}
              </button>
            ) : (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
              >
                {tag}
              </span>
            ),
          )}
        </div>

        <div className="mt-auto pt-8">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 transition-transform group-hover:translate-x-1"
          >
            Read article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
