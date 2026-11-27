import {
  formatRelativeVi,
  type Article,
  type Category,
  CATEGORIES,
} from "@/lib/types";

function categoryLabel(id: Article["category"]): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function ArticleList({
  articles,
  category,
}: {
  articles: Article[];
  category: Category;
}) {
  if (articles.length === 0) {
    return (
      <p className="py-16 text-[var(--ink-soft)]">
        Chưa có bài trong chuyên mục này. Thử chọn chuyên mục khác.
      </p>
    );
  }

  const [featured, ...rest] = articles;

  return (
    <div className="space-y-12">
      <a
        href={featured.url === "#" ? undefined : featured.url}
        target={featured.url === "#" ? undefined : "_blank"}
        rel={featured.url === "#" ? undefined : "noopener noreferrer"}
        className="group grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--mist)]">
          {featured.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featured.image}
              alt=""
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--mist)] to-[var(--signal)]/30 font-brand text-4xl tracking-[0.2em] text-[var(--ink)]/30">
              LUMEN
            </div>
          )}
        </div>
        <div className="pb-1">
          <p className="text-xs tracking-[0.16em] text-[var(--signal-deep)] uppercase">
            {categoryLabel(featured.category)} · {featured.source}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight font-medium text-[var(--ink)] transition group-hover:text-[var(--signal-deep)] sm:text-4xl">
            {featured.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            {featured.summary}
          </p>
          <p className="mt-4 text-sm text-[var(--ink-soft)]/80">
            {formatRelativeVi(featured.publishedAt)}
          </p>
        </div>
      </a>

      <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {rest.map((article, index) => (
          <li key={article.id}>
            <a
              href={article.url === "#" ? undefined : article.url}
              target={article.url === "#" ? undefined : "_blank"}
              rel={article.url === "#" ? undefined : "noopener noreferrer"}
              className="group grid gap-4 py-6 sm:grid-cols-[7rem_1fr] sm:gap-8"
              style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
            >
              <div className="text-sm text-[var(--ink-soft)]">
                <p className="tracking-[0.12em] text-[var(--signal-deep)] uppercase">
                  {categoryLabel(article.category)}
                </p>
                <p className="mt-1">{formatRelativeVi(article.publishedAt)}</p>
              </div>
              <div>
                <h4 className="font-display text-xl leading-snug font-medium text-[var(--ink)] transition group-hover:text-[var(--signal-deep)] sm:text-2xl">
                  {article.title}
                </h4>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                  {article.summary}
                </p>
                <p className="mt-2 text-xs text-[var(--ink-soft)]/70">
                  {article.source}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {category !== "tat-ca" ? null : (
        <p className="text-center text-sm text-[var(--ink-soft)]">
          Đang xem toàn bộ chuyên mục · cập nhật định kỳ từ nguồn tin công khai
        </p>
      )}
    </div>
  );
}
