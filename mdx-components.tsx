import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { CodeBlock } from "@/components/blog/code-block";

const components: MDXComponents = {
  pre: CodeBlock,
  img: ({ src, alt, width, height, ...props }) => (
    <Image {...props} src={typeof src === "string" ? src : ""} alt={alt ?? ""} width={Number(width) || 1600} height={Number(height) || 900} sizes="(min-width: 1024px) 720px, 90vw" style={{ width: "100%", height: "auto" }} />
  ),
  table: (props) => <div className="markdown-table"><table {...props} /></div>,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
