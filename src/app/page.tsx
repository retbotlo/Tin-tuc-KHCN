import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";
import { NewsSection } from "@/components/NewsSection";

async function NewsFromParams({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const params = await searchParams;
  return <NewsSection categoryParam={params.c} />;
}

function NewsFallback() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-10 w-48 animate-pulse rounded bg-[var(--mist)]" />
        <div className="aspect-[16/9] animate-pulse rounded bg-[var(--mist)]" />
        <div className="h-24 animate-pulse rounded bg-[var(--mist)]" />
      </div>
    </section>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<NewsFallback />}>
          <NewsFromParams searchParams={searchParams} />
        </Suspense>
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
