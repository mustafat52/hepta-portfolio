import type { Metadata } from "next";
import { PageHero, Reveal, Count, Cta } from "@/components/site/page-kit";
import { ReviewCards } from "@/components/site/reviews";
import { RATING } from "@/lib/reviews";

export const metadata: Metadata = { title: "Reviews | Hepta Constructions & Interiors" };
const D = "font-[family-name:var(--font-display)]";

export default function Reviews() {
  return (
    <main>
      <PageHero eyebrow="Reviews" title="What our clients say about working with us" intro="Feedback from the clients we have built and designed for." />
      {RATING && (
        <section className="mx-auto max-w-6xl px-5 pt-16">
          <Reveal>
            <b className={`${D} block text-7xl font-extrabold`}><Count to={parseFloat(RATING.score)} decimals={1} /></b>
            <p className="mt-2 text-[#f2ead8]/70">Average rating from {RATING.count} completed projects</p>
          </Reveal>
        </section>
      )}
      <section className="mx-auto max-w-6xl px-5 py-16"><ReviewCards /></section>
      <Cta title="Join our happy clients" />
    </main>
  );
}
