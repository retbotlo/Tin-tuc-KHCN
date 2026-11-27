import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { NewsSection } from "@/components/NewsSection";
import { getNews } from "@/lib/news";

export default async function Home() {
  const { articles, fromSample } = await getNews();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <NewsSection articles={articles} fromSample={fromSample} />
      </main>
      <footer className="border-t border-[var(--line)] bg-[var(--mist)] px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-brand text-lg font-bold tracking-[0.12em] text-[var(--ink)]">
            LUMEN
          </p>
          <p className="text-sm text-[var(--ink-soft)]">
            Tin tức công nghệ và khoa học · Nguồn công khai · Không phải tờ báo
            chính thống
          </p>
        </div>
      </footer>
    </>
  );
}
