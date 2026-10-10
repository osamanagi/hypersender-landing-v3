import { valueToEstree } from "estree-util-value-to-estree";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

// Runs at compilation, after rehype-slug, so TOC links always match rendered IDs.
export default function rehypeBlog() {
  return (tree) => {
    const toc = [];
    const words = [];
    visit(tree, "element", (node) => {
      if (/^h[23]$/.test(node.tagName) && node.properties.id) {
        toc.push({ id: node.properties.id, title: toString(node), depth: Number(node.tagName[1]) });
      }
    });
    visit(tree, "text", (node) => words.push(node.value));
    const readingTime = Math.max(1, Math.ceil(words.join(" ").trim().split(/\s+/u).length / 200));

    for (const [name, value] of Object.entries({ toc, readingTime })) {
      tree.children.push({
        type: "mdxjsEsm",
        value: "",
        data: {
          estree: {
            type: "Program",
            sourceType: "module",
            body: [{
              type: "ExportNamedDeclaration",
              specifiers: [],
              source: null,
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [{ type: "VariableDeclarator", id: { type: "Identifier", name }, init: valueToEstree(value) }],
              },
            }],
          },
        },
      });
    }
  };
}
