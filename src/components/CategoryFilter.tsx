"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { CATEGORIES, type Category } from "@/lib/types";

export function CategoryFilter({ active }: { active: Category }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function select(id: Category) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "tat-ca") params.delete("c");
    else params.set("c", id);
    startTransition(() => {
      const q = params.toString();
      router.replace(q ? `?${q}#tin-moi` : "#tin-moi", { scroll: false });
    });
  }

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
            onClick={() => select(cat.id)}
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
