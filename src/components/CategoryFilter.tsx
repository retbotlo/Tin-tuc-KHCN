"use client";

import { CATEGORIES, type Category } from "@/lib/types";

/** Kept for compatibility; filtering now lives in NewsSection. */
export function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange?: (id: Category) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Lọc chuyên mục"
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(cat.id)}
            className={
              isActive
                ? "rounded-md bg-[var(--ink)] px-3.5 py-2 text-sm font-medium text-white transition"
                : "rounded-md px-3.5 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:bg-[var(--mist)]"
            }
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
