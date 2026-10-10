import "server-only";
import type { Locale } from "@/i18n-config";

// Register trusted local MDX explicitly; keep the same slug for translations.
const articles = {
  en: {
    "avoid-banned-whatsapp-number": () => import("@/content/blog/en/avoid-banned-whatsapp-number.mdx"),
    "how-to-send-whatsapp-messages-in-laravel": () => import("@/content/blog/en/how-to-send-whatsapp-messages-in-laravel.mdx"),
    "how-we-handle-whatsapp-message-capping": () => import("@/content/blog/en/how-we-handle-whatsapp-message-capping.mdx"),
    "how-we-handle-whatsapp-timelock-restrictions": () => import("@/content/blog/en/how-we-handle-whatsapp-timelock-restrictions.mdx"),
    "hypersender-whatsapp-api-vs-whatsapp-business-api-which-is-right-for-your-business": () =>
      import("@/content/blog/en/hypersender-whatsapp-api-vs-whatsapp-business-api-which-is-right-for-your-business.mdx"),
    "introducing-hypersender-laravel-sdk": () => import("@/content/blog/en/introducing-hypersender-laravel-sdk.mdx"),
    "introducing-webhook-logs": () => import("@/content/blog/en/introducing-webhook-logs.mdx"),
    "using-whatsapp-business-with-landline": () => import("@/content/blog/en/using-whatsapp-business-with-landline.mdx"),
  },
  ar: {
    "avoid-banned-whatsapp-number": () => import("@/content/blog/ar/avoid-banned-whatsapp-number.mdx"),
    "how-to-send-whatsapp-messages-in-laravel": () => import("@/content/blog/ar/how-to-send-whatsapp-messages-in-laravel.mdx"),
    "hypersender-whatsapp-api-vs-whatsapp-business-api-which-is-right-for-your-business": () =>
      import("@/content/blog/ar/hypersender-whatsapp-api-vs-whatsapp-business-api-which-is-right-for-your-business.mdx"),
    "introducing-webhook-logs": () => import("@/content/blog/ar/introducing-webhook-logs.mdx"),
    "using-whatsapp-business-with-landline": () => import("@/content/blog/ar/using-whatsapp-business-with-landline.mdx"),
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
