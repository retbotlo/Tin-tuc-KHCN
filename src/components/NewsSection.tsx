"use client";

import { useState } from "react";
import { ArticleList } from "@/components/ArticleList";
import {
  CATEGORIES,
  filterArticles,
  type Article,
  type Category,
} from "@/lib/types";

export function NewsSection({
  articles,
  fromSample,
}: {
  articles: Article[];
  fromSample: boolean;
}) {
  const [category, setCategory] = useState<Category>("tat-ca");
  const filtered = filterArticles(articles, category);

  return (
    <section
      id="tin-moi"
      className="relative scroll-mt-6 bg-[var(--paper)] px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-brand text-sm tracking-[0.2em] text-[var(--signal-deep)] uppercase">
              Bản tin
            </p>
            <h2 className="mt-2 font-display text-3xl font-medium text-[var(--ink)] sm:text-4xl">
              Tin mới nhất
            </h2>
            <p className="mt-2 max-w-md text-[var(--ink-soft)]">
              {fromSample
                ? "Đang hiển thị dữ liệu mẫu — nguồn RSS sẽ xuất hiện khi build lấy được feed."
                : "Tổng hợp từ NASA, BBC Technology và BBC Science."}
            </p>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Lọc chuyên mục"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === category;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(cat.id)}
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
        </div>

        <div className="mt-10">
          <ArticleList articles={filtered} category={category} />
        </div>
      </div>
    </section>
  );
}
