import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogsSection } from "@/components/blogs-section";
import { hasLocale } from "@/get-dictionary";
import { blogLabels, getPosts } from "@/lib/blog";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title: `${blogLabels[lang].title} | Hypersender`,
    description: blogLabels[lang].description,
    alternates: { canonical: `/${lang}/blog`, languages: { en: "/en/blog", ar: "/ar/blog" } },
  };
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <BlogsSection posts={await getPosts(lang)} locale={lang} />;
}
