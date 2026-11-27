export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#top"
          className="font-brand text-xl font-bold tracking-[0.08em] text-white sm:text-2xl"
        >
          LUMEN
        </a>
        <nav className="flex items-center gap-6 text-sm text-white/80">
          <a href="#tin-moi" className="transition hover:text-white">
            Tin mới
          </a>
          <a
            href="#tin-moi"
            className="hidden rounded-md bg-white/15 px-3.5 py-2 text-white backdrop-blur-sm transition hover:bg-white/25 sm:inline-block"
          >
            Đọc ngay
          </a>
        </nav>
      </div>
    </header>
  );
}
