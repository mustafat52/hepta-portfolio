"use client";
import { REVIEWS, RATING } from "@/lib/reviews";

const D = "font-[family-name:var(--font-display)]";
type Review = (typeof REVIEWS)[number];

function Card({ r }: { r: Review }) {
  const initials = r.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <figure className="mr-5 w-[320px] shrink-0 rounded-2xl border border-[#d6b25e]/20 bg-[#17234d] p-6 md:w-[400px]">
      <div className="flex gap-0.5 text-lg text-[#d6b25e]" aria-label="5 out of 5 stars">{"\u2605\u2605\u2605\u2605\u2605"}</div>
      <blockquote className="mt-4 text-lg leading-snug text-[#f2ead8]">{r.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className={`${D} grid h-10 w-10 place-items-center rounded-full bg-[#d6b25e] text-sm font-bold text-[#0b1330]`}>{initials}</span>
        <span className={`${D} text-sm`}>
          <b className="block text-[#f2ead8]">{r.name}</b>
          <span className="text-[#f2ead8]/60">{r.project}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={`flex w-max py-2 [animation:hepta-marquee_80s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none] ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {[...items, ...items, ...items].map((r, i) => <Card key={i} r={r} />)}
      </div>
    </div>
  );
}

export function Reviews() {
  const half = Math.ceil(REVIEWS.length / 2);
  return (
    <section id="reviews" className="scroll-mt-16 bg-[#0e1838] py-24">
      <style>{"@keyframes hepta-marquee{to{transform:translateX(-33.3333%)}}"}</style>
      <div className="mx-auto mb-12 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5">
        <h2 className={`${D} text-4xl font-semibold tracking-tight md:text-6xl`}>What our clients say</h2>
        <div className={`${D} text-right`}>
          <div className="text-lg text-[#d6b25e]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
          <p className="text-3xl font-bold">{RATING.score} <span className="text-base font-medium text-[#f2ead8]/60">average</span></p>
          <p className="text-sm text-[#f2ead8]/60">from {RATING.count} completed projects</p>
        </div>
      </div>
      <div className="space-y-5">
        <Row items={REVIEWS.slice(0, half)} />
        <Row items={REVIEWS.slice(half)} reverse />
      </div>
    </section>
  );
}
