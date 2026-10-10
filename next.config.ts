import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({
  options: {
    // Turbopack requires plugin names and serializable options.
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      path.resolve("lib/rehype-blog.mjs"),
      ["rehype-pretty-code", {
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }],
    ],
  },
});

export default withMDX(nextConfig);
