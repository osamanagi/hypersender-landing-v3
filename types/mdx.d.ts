declare module "*.mdx" {
  export const post: import("@/lib/blog-types").PostMetadata;
  export const toc: import("@/lib/blog-types").TocEntry[];
  export const readingTime: number;
  const MDXContent: import("mdx/types").MDXContent;
  export default MDXContent;
}
