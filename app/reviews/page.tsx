import type { Metadata } from "next";
import { PageHero, Reveal, Count, Bars, ReviewGrid, Cta } from "@/components/site/page-kit";
import { RATING } from "@/lib/reviews";
import { RATING_BARS } from "@/lib/pages";

export const metadata: Metadata = { title: "Reviews | Hepta Constructions & Interiors" };
const D = "font-[family-name:var(--font-display)]";

export default function Reviews() {
  return (
    <main>
      <PageHero eyebrow="Reviews" title="What our clients say about working with us" intro="Real feedback from homes, offices and shops we have delivered." />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="text-2xl text-[#d6b25e]">{"\u2605\u2605\u2605\u2605\u2605"}</div>
          <b className={`${D} block text-7xl font-extrabold`}><Count to={parseFloat(RATING.score)} decimals={1} /></b>
          <p className="mt-2 text-[#f2ead8]/70">Average rating from {RATING.count} completed projects</p>
        </Reveal>
        <Reveal delay={0.1}><Bars items={RATING_BARS} /></Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-20"><ReviewGrid /></section>
      <Cta title="Join our happy clients" />
    </main>
  );
}
