import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blogs-section";
import { FullWidthDivider } from "@/components/full-width-divider";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { CodeBlock } from "@/components/blog/code-block";
import { hasLocale } from "@/get-dictionary";
import { blogLabels, formatPostDate, getPost, getPosts, getPostSlugs } from "@/lib/blog";

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) return [];
  return getPostSlugs(params.lang).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = await getPost(lang, slug);
  if (!post) notFound();
  const path = `/${lang}/blog/${slug}`;
  return {
    title: `${post.title} | Hypersender`, description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: path,
      languages: Object.fromEntries((["en", "ar"] as const).filter((locale) => getPostSlugs(locale).includes(slug)).map((locale) => [locale, `/${locale}/blog/${slug}`])),
    },
    openGraph: { type: "article", title: post.title, description: post.description, url: path, publishedTime: post.date, authors: [post.author], images: [{ url: post.image, width: 1600, height: 900, alt: post.imageAlt }], locale: lang === "ar" ? "ar_EG" : "en_US" },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.image] },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = await getPost(lang, slug);
  if (!post) notFound();
  const t = blogLabels[lang];
  const related = (await getPosts(lang)).filter((article) => article.slug !== slug).slice(0, 2);
  const { Content } = post;

  return (
    <div className="mx-auto w-full max-w-7xl py-8 md:py-12">
      <article>
        <header className="flex flex-col gap-5 px-4 pb-8 md:px-6 md:pb-10">
          <Link href={`/${lang}/blog`} className="mb-3 flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeftIcon aria-hidden="true" className="size-4 rtl:rotate-180" />{t.back}
          </Link>
          <p className="text-sm font-medium text-muted-foreground">{post.category}</p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl md:leading-tight">{post.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{post.description}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span><span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time><span aria-hidden="true">·</span>
            <span>{post.readingTime} {t.readTime}</span>
          </div>
        </header>
        <div className="px-4 md:px-6">
          <div className="relative aspect-video overflow-hidden rounded-md bg-muted shadow-md outline outline-offset-3 outline-border/50">
            <Image src={post.image} alt={post.imageAlt} fill loading="eager" sizes="(min-width: 1024px) 980px, 92vw" className="object-cover" />
          </div>
        </div>
        <div className="grid items-start gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12">
          <aside className="lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
            <TableOfContents entries={post.toc} label={t.toc} />
          </aside>
          <div className="blog-prose min-w-0 lg:col-start-1 lg:row-start-1"><Content components={{ pre: (props) => <CodeBlock {...props} locale={lang} /> }} /></div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="relative pt-8" aria-labelledby="related-posts">
          <FullWidthDivider position="top" contained />
          <h2 id="related-posts" className="px-4 text-2xl font-semibold tracking-tight md:px-6">{t.related}</h2>
          <div className="grid gap-2 p-2 sm:p-4 md:grid-cols-2">{related.map((article) => <BlogCard key={article.slug} post={article} locale={lang} />)}</div>
        </section>
      )}
    </div>
  );
}
