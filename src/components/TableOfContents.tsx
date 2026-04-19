"use client";

import { useEffect, useState } from "react";
import type { TableOfContentsItem } from "@/types/blog";

interface TableOfContentsProps {
  readonly items: readonly TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading instanceof HTMLElement);

    if (headings.length === 0) {
      return;
    }

    const updateActiveId = () => {
      const scrollAnchor = window.scrollY + 180;
      let currentId = items[0]?.id ?? "";

      for (const heading of headings) {
        if (heading.offsetTop <= scrollAnchor) {
          currentId = heading.id;
        }
      }

      setActiveId(currentId);
    };

    updateActiveId();
    window.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId);

    return () => {
      window.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-28 hidden h-fit rounded-[1.5rem] border border-zinc-200/70 bg-white/80 p-5 backdrop-blur lg:block">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
        Table of contents
      </p>
      <nav className="mt-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                  activeId === item.id
                    ? "bg-amber-100 font-medium text-amber-900"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
                } ${item.level === 3 ? "ml-3" : ""}`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
