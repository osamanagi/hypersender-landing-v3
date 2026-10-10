import Image from "next/image";
import Link from "next/link";
import { FullWidthDivider } from "@/components/full-width-divider";
import { blogLabels, formatPostDate } from "@/lib/blog";
import type { PostMetadata } from "@/lib/blog-types";
import type { Locale } from "@/i18n-config";

type BlogSummary = PostMetadata & { slug: string; readingTime: number };

// Adapted from @efferd/blogs-3: immersive images, quiet typography, and a compact grid.
export function BlogsSection({ posts, locale }: { posts: BlogSummary[]; locale: Locale }) {
  const t = blogLabels[locale];
  return (
    <section className="mx-auto w-full max-w-7xl py-8 md:py-12">
      <div className="flex flex-col gap-3 px-4 pb-8 md:px-6 md:pb-12">
        <p className="text-sm font-medium text-muted-foreground">{t.eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.title}</h1>
        <p className="max-w-xl text-base text-muted-foreground">{t.description}</p>
      </div>
      <div className="relative"><FullWidthDivider contained /></div>
      <div className="grid gap-2 p-2 sm:p-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => <BlogCard key={post.slug} post={post} locale={locale} />)}
      </div>
    </section>
  );
}

export function BlogCard({ post, locale }: { post: BlogSummary; locale: Locale }) {
  const t = blogLabels[locale];
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group flex min-w-0 flex-col gap-5 rounded-md p-3 transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:bg-muted">
      <div className="relative aspect-video overflow-hidden rounded-md bg-muted shadow-md outline outline-offset-3 outline-border/50">
        <Image src={post.image} alt={post.imageAlt} fill sizes="(min-width: 1024px) 310px, (min-width: 768px) 46vw, 90vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
      </div>
      <div className="flex flex-col gap-3 px-1 pb-2">
        <p className="text-xs font-medium text-muted-foreground">{post.category}</p>
        <h2 className="text-xl font-semibold tracking-tight">{post.title}</h2>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} {t.readTime}</span>
        </div>
        <p className="text-xs text-muted-foreground">{t.by} {post.author}</p>
      </div>
    </Link>
  );
}
