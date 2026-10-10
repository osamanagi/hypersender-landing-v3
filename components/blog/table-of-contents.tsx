"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

export function TableOfContents({ entries, label }: { entries: TocEntry[]; label: string }) {
  const [active, setActive] = useState(entries[0]?.id ?? "");

  useEffect(() => {
    const headings = entries.map(({ id }) => document.getElementById(id)).filter((element) => element !== null);
    const update = () => {
      const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= 160);
      setActive((passed.at(-1) ?? headings[0])?.id ?? "");
    };
    const observer = new IntersectionObserver(update, { rootMargin: "-80px 0px -60% 0px", threshold: [0, 1] });
    headings.forEach((heading) => observer.observe(heading));
    update();
    return () => observer.disconnect();
  }, [entries]);

  if (!entries.length) return null;
  const links = (
    <ol className="flex flex-col gap-3 border-s ps-4 text-sm">
      {entries.map((entry) => (
        <li key={entry.id} className={cn(entry.depth === 3 && "ps-3")}>
          <a href={`#${entry.id}`} aria-current={active === entry.id ? "location" : undefined} className={cn("block leading-relaxed transition-colors hover:text-foreground", active === entry.id ? "font-medium text-foreground" : "text-muted-foreground")}>
            {entry.title}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="rounded-md border p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium">{label}</summary>
        <nav aria-label={label} className="pt-4">{links}</nav>
      </details>
      <nav aria-label={label} className="hidden lg:flex lg:flex-col lg:gap-5">
        <p className="text-sm font-semibold">{label}</p>
        {links}
      </nav>
    </>
  );
}
