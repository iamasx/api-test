import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectsSection } from "@/components/ProjectsSection";
import { getFeaturedPost, getRecentPosts } from "@/lib/blog";

export default function Home() {
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(2);

  return (
    <main className="space-y-24 py-10">
      <section className="overflow-hidden rounded-[2.5rem] border border-zinc-200/70 bg-white/80 shadow-[0_30px_100px_-60px_rgba(15,23,42,0.9)] backdrop-blur">
        <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:p-12">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Full stack engineer
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                Shipping real-time products, migration work, and TypeScript systems that stay
                readable as they scale.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
                I build product surfaces and the delivery pipelines behind them, with a bias for
                fast feedback loops, reliable operations, and architecture that can survive growth
                without turning into ceremony.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Read the blog
              </Link>
              <a
                href="#experience"
                className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                View experience
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.75rem] bg-zinc-950 p-6 text-white">
              <p className="text-sm text-zinc-400">Operating focus</p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">
                Real-time collaboration, backend architecture, and release systems.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-zinc-200 bg-[linear-gradient(135deg,#f7f1df_0%,#ffffff_55%,#d8e2f9_100%)] p-6">
              <p className="text-sm font-medium text-zinc-500">Current writing cadence</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">3 essays</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Notes on Next.js realtime delivery, service decomposition, and clean TypeScript.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <ExperienceTimeline />
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Writing
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Essays on the engineering decisions that change product quality.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-zinc-600">
              I write about system design tradeoffs, delivery mechanics, and frontend patterns that
              age well once a codebase moves past the demo stage.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-sm font-semibold text-zinc-950 transition-colors hover:text-amber-700"
          >
            Browse all posts
          </Link>
        </div>

        <div className="space-y-6">
          <BlogCard post={featuredPost} featured />
          <div className="grid gap-6 md:grid-cols-2">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <ProjectsSection />
      </section>
    </main>
  );
}
