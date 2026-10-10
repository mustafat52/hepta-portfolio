"use client";
import { REVIEWS, RATING, type Review } from "@/lib/reviews";
import { Reveal } from "@/components/site/page-kit";

const D = "font-[family-name:var(--font-display)]";

function Card({ r, className = "" }: { r: Review; className?: string }) {
  const initials = r.name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <figure className={`${className} flex flex-col justify-between rounded-2xl border border-[#d6b25e]/20 bg-[#17234d] p-6`}>
      <blockquote className="text-lg leading-snug text-[#f2ead8]">{r.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-[#f2ead8]/10 pt-5">
        <span className={`${D} grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#d6b25e] text-sm font-bold text-[#0b1330]`}>{initials}</span>
        <span className={D}>
          <b className="block text-base text-[#f2ead8]">{r.name}</b>
          <span className="text-sm text-[#f2ead8]/60">{r.project}</span>
        </span>
      </figcaption>
    </figure>
  );
}

// Used on the Reviews page: all reviews in a grid.
export function ReviewCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {REVIEWS.map((r, i) => (
        <Reveal key={r.name + i} delay={(i % 3) * 0.1} className="h-full"><Card r={r} className="h-full" /></Reveal>
      ))}
    </div>
  );
}

function Row({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  const copies = Math.max(3, Math.ceil(8 / items.length));
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <style>{`@keyframes hepta-marquee{to{transform:translateX(-${(100 / copies).toFixed(4)}%)}}`}</style>
      <div className={`flex w-max py-2 [animation:hepta-marquee_80s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none] ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {Array.from({ length: copies }).flatMap((_, c) => items.map((r, i) => <Card key={`${c}-${i}`} r={r} className="mr-5 w-[320px] shrink-0 md:w-[400px]" />))}
      </div>
    </div>
  );
}

// Used on the home page: a few reviews as a grid, many reviews as a scrolling marquee.
export function Reviews() {
  const half = Math.ceil(REVIEWS.length / 2);
  return (
    <section id="reviews" className="scroll-mt-16 bg-[#0e1838] py-24">
      <div className="mx-auto mb-12 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5">
        <h2 className={`${D} text-4xl font-semibold tracking-tight md:text-6xl`}>What our clients say</h2>
        {RATING && (
          <div className={`${D} text-right`}>
            <p className="text-3xl font-bold">{RATING.score} <span className="text-base font-medium text-[#f2ead8]/60">average</span></p>
            <p className="text-sm text-[#f2ead8]/60">from {RATING.count} completed projects</p>
          </div>
        )}
      </div>
      {REVIEWS.length < 6 ? (
        <div className="mx-auto max-w-6xl px-5"><ReviewCards /></div>
      ) : (
        <div className="space-y-5">
          <Row items={REVIEWS.slice(0, half)} />
          <Row items={REVIEWS.slice(half)} reverse />
        </div>
      )}
    </section>
  );
}
