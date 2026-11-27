import { Suspense } from "react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ArticleList } from "@/components/ArticleList";
import { getNews } from "@/lib/news";
import { filterArticles, type Category } from "@/lib/types";

function isCategory(value: string | undefined): value is Category {
  return (
    value === "tat-ca" ||
    value === "cong-nghe" ||
    value === "khoa-hoc" ||
    value === "ai" ||
    value === "vu-tru"
  );
}

export async function NewsSection({
  categoryParam,
}: {
  categoryParam?: string;
}) {
  const category: Category = isCategory(categoryParam)
    ? categoryParam
    : "tat-ca";
  const { articles, fromSample } = await getNews();
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
                ? "Đang hiển thị dữ liệu mẫu — nguồn RSS sẽ xuất hiện khi kết nối được."
                : "Tổng hợp từ NASA, BBC Technology và BBC Science."}
            </p>
          </div>
          <Suspense
            fallback={
              <div className="h-10 w-64 animate-pulse rounded-md bg-[var(--mist)]" />
            }
          >
            <CategoryFilter active={category} />
          </Suspense>
        </div>

        <div className="mt-10">
          <ArticleList articles={filtered} category={category} />
        </div>
      </div>
    </section>
  );
}
