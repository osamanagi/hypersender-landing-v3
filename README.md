This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Blog

The blog follows the official [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx):
`@next/mdx` compiles local, trusted `.mdx` files into Server Components. Articles are
prerendered through `generateStaticParams` and share an Efferd `blogs-3` inspired layout.

- Index: `/en/blog` or `/ar/blog`.
- Article: `/en/blog/reliable-messaging` (with the same slug under `/ar`).
- Content: `content/blog/<locale>/<slug>.mdx`.
- Registry: `lib/blog.ts`.
- Markdown components: `mdx-components.tsx`.
- Article typography: `.blog-prose` in `app/globals.css`.

The included articles are **sample content**; replace or review them before publishing.
To add an article, create its MDX file and register an explicit import in `lib/blog.ts`.
Use the same slug for translations. Each article exports its metadata:

```mdx
export const post = {
  title: "Your article title",
  description: "A short summary for the grid and search engines.",
  date: "2026-10-10",
  author: "Your name",
  category: "Engineering",
  image: "/Images/blog/your-cover.png",
  imageAlt: "Describe the cover image",
};

## Your first section

Write **Markdown**, include JSX components, and add fenced code blocks.
```

Standard Markdown plus GitHub Flavored Markdown is supported: tables, task lists,
strikethrough, autolinks, and footnotes. Use `##` and `###` for automatically generated
TOC entries. IDs and reading time are calculated during compilation by
`lib/rehype-blog.mjs`; no heading list needs to be maintained manually.

Code fences accept a language, `title="file.ts"`, and highlighted line ranges such as
`{2,4-6}`. Highlighting is generated with Shiki; copy buttons copy the original text.
Code remains left-to-right in Arabic articles.

Markdown images use `next/image`. Keep images under `public/Images/` and reference
that exact capitalization (important on Linux). For other aspect ratios, use
`<img src="/Images/example.png" alt="Description" width={1200} height={800} />` in MDX.
Remote images require a matching `images.remotePatterns` entry in `next.config.ts`.

Set `NEXT_PUBLIC_SITE_URL` to the production origin if it differs from
`https://hypersender.com`. It controls canonical URLs, social metadata, and the sitemap.
Adding or editing local content requires a new build/deploy. Only compile trusted
repository content: MDX supports executable JavaScript.

Verify with `bun run lint` and `bun run build`.
