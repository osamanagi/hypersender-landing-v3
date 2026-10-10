import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { getPosts, getPostSlugs } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hypersender.com";
  const entries = await Promise.all(i18n.locales.map(async (locale) => {
    const pages: MetadataRoute.Sitemap = ["", "/blog", "/privacy-policy", "/terms-and-conditions"].map((path) => ({
      url: new URL(`/${locale}${path}`, origin).href,
      alternates: { languages: Object.fromEntries(i18n.locales.map((lang) => [lang, new URL(`/${lang}${path}`, origin).href])) },
    }));
    const posts = await getPosts(locale);
    return [...pages, ...posts.map((post) => ({
      url: new URL(`/${locale}/blog/${post.slug}`, origin).href,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      alternates: { languages: Object.fromEntries(i18n.locales.filter((lang) => getPostSlugs(lang).includes(post.slug)).map((lang) => [lang, new URL(`/${lang}/blog/${post.slug}`, origin).href])) },
    }))];
  }));
  return entries.flat();
}
