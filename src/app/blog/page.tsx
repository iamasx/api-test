import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering writing on real-time systems, architecture migrations, and maintainable TypeScript.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="space-y-10 py-10">
      <section className="rounded-[2rem] border border-zinc-200/70 bg-white/75 p-8 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.85)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">Blog</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Long-form notes on delivery, architecture, and shipping real-time interfaces.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
              A small library of essays focused on the engineering decisions that shape product
              quality: transport layers, migration tradeoffs, and keeping TypeScript codebases
              legible as they grow.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-zinc-950 p-5 text-white">
            <p className="text-sm text-zinc-400">Posts published</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight">{posts.length}</p>
          </div>
        </div>
      </section>

      <BlogIndex posts={posts} />
    </main>
  );
}
