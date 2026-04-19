"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import type { BlogPostSummary } from "@/types/blog";

interface BlogIndexProps {
  readonly posts: readonly BlogPostSummary[];
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((left, right) =>
      left.localeCompare(right),
    );
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) {
      return posts;
    }

    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  const featuredPost = useMemo(() => {
    return filteredPosts.find((post) => post.featured) ?? filteredPosts[0] ?? null;
  }, [filteredPosts]);

  const recentPosts = useMemo(() => {
    if (!featuredPost) {
      return [];
    }

    return filteredPosts.filter((post) => post.slug !== featuredPost.slug);
  }, [featuredPost, filteredPosts]);

  const toggleTag = (tag: string) => {
    setActiveTag((currentTag) => (currentTag === tag ? null : tag));
  };

  return (
    <section className="space-y-10">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTag === null
              ? "bg-zinc-950 text-white"
              : "bg-white text-zinc-600 hover:bg-zinc-100"
          }`}
        >
          All topics
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "bg-amber-200 text-amber-950"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {activeTag && (
        <p className="text-sm text-zinc-500">
          Filtering by <span className="font-semibold text-zinc-800">{activeTag}</span>.
        </p>
      )}

      {featuredPost ? (
        <div className="space-y-10">
          <BlogCard post={featuredPost} featured onTagClick={toggleTag} />

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                Recent posts
              </h2>
              <p className="text-sm text-zinc-500">
                {recentPosts.length} {recentPosts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            {recentPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {recentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} onTagClick={toggleTag} />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-white/70 p-6 text-sm text-zinc-500">
                No additional posts match the current tag filter.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-zinc-300 bg-white/70 p-6 text-sm text-zinc-500">
          No posts are available yet.
        </div>
      )}
    </section>
  );
}
