import "server-only";
import type { Locale } from "@/i18n-config";

// Register trusted local MDX explicitly; keep the same slug for translations.
const articles = {
  en: {
    "reliable-messaging": () => import("@/content/blog/en/reliable-messaging.mdx"),
    "messaging-dashboard": () => import("@/content/blog/en/messaging-dashboard.mdx"),
    "reusable-workflows": () => import("@/content/blog/en/reusable-workflows.mdx"),
  },
  ar: {
    "reliable-messaging": () => import("@/content/blog/ar/reliable-messaging.mdx"),
    "messaging-dashboard": () => import("@/content/blog/ar/messaging-dashboard.mdx"),
    "reusable-workflows": () => import("@/content/blog/ar/reusable-workflows.mdx"),
  },
} as const;

export function getPostSlugs(locale: Locale) {
  return Object.keys(articles[locale]);
}

export async function getPost(locale: Locale, slug: string) {
  const posts = articles[locale];
  if (!Object.hasOwn(posts, slug)) return null;
  const load = posts[slug as keyof typeof posts];
  const { default: Content, post, toc, readingTime } = await load();
  return { ...post, slug, Content, toc, readingTime };
}

export async function getPosts(locale: Locale) {
  const posts = await Promise.all(getPostSlugs(locale).map((slug) => getPost(locale, slug)));
  return posts.filter((post) => post !== null).sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export const blogLabels = {
  en: {
    title: "The Hypersender journal",
    description: "Ideas, practical guides, and a closer look at better messaging.",
    eyebrow: "Notes for builders", back: "All articles", toc: "On this page",
    readTime: "min read", related: "Keep reading", by: "By",
  },
  ar: {
    title: "مدونة هايبرسندر", description: "أفكار وأدلة عملية لبناء تجربة مراسلة أفضل.",
    eyebrow: "ملاحظات للمطورين", back: "جميع المقالات", toc: "في هذه الصفحة",
    readTime: "دقائق للقراءة", related: "تابع القراءة", by: "بقلم",
  },
};
