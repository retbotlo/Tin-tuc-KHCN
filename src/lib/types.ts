export type Category = "tat-ca" | "cong-nghe" | "khoa-hoc" | "ai" | "vu-tru";

export type Article = {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: Exclude<Category, "tat-ca">;
  url: string;
  publishedAt: string;
  image?: string;
};

export type NewsPayload = {
  articles: Article[];
  fromSample: boolean;
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "cong-nghe", label: "Công nghệ" },
  { id: "khoa-hoc", label: "Khoa học" },
  { id: "ai", label: "AI" },
  { id: "vu-tru", label: "Vũ trụ" },
];

export function formatRelativeVi(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(1, mins)} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return date.toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function filterArticles(
  articles: Article[],
  category: Category,
): Article[] {
  if (category === "tat-ca") return articles;
  return articles.filter((a) => a.category === category);
}
