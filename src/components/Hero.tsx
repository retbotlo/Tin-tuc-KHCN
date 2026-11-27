export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden text-white"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2400&q=80"
          alt="Thiên hà và không gian sâu"
          className="animate-drift h-full w-full object-cover"
        />
      </div>
      <div className="hero-grid absolute inset-0 -z-10" />
      <div className="noise absolute inset-0 -z-10" />

      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p className="animate-rise font-brand text-5xl font-bold tracking-[0.12em] sm:text-7xl md:text-8xl">
          LUMEN
        </p>
        <h1 className="animate-rise-delay-1 mt-5 max-w-2xl font-display text-3xl leading-tight font-medium tracking-tight sm:text-5xl">
          Tin tức công nghệ và khoa học, chọn lọc mỗi ngày
        </h1>
        <p className="animate-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Tín hiệu mới từ phòng lab, quỹ đạo và phòng máy — ngắn gọn, rõ nguồn,
          dễ theo dõi.
        </p>
        <div className="animate-rise-delay-2 mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#tin-moi"
            className="rounded-md bg-[var(--signal)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--signal-deep)]"
          >
            Xem tin mới
          </a>
          <div className="h-px w-16 bg-white/50 animate-pulse-line sm:w-24" />
          <span className="text-xs tracking-[0.18em] text-white/60 uppercase">
            Công nghệ · Khoa học · AI · Vũ trụ
          </span>
        </div>
      </div>
    </section>
  );
}
