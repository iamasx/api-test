import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/TableOfContents";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: PostContent } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <main className="space-y-8 py-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
      >
        <span aria-hidden="true">←</span>
        Back to the blog
      </Link>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-white/80 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.85)] backdrop-blur">
          <div className="border-b border-zinc-200/80 bg-[linear-gradient(135deg,#f4c96b_0%,#f7f1df_45%,#d8e2f9_100%)] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-700">
              {post.formattedDate} · {post.readingTime}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-700">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="blog-prose">
              <PostContent />
            </div>
          </div>
        </article>

        <TableOfContents items={post.tableOfContents} />
      </div>
    </main>
  );
}
