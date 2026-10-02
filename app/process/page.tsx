import type { Metadata } from "next";
import { PageHero, Reveal, Timeline, Cta } from "@/components/site/page-kit";
import { Process } from "@/components/site/process";
import { EXPECT, PAYMENT } from "@/lib/pages";

export const metadata: Metadata = { title: "Process | Hepta Constructions & Interiors" };
const D = "font-[family-name:var(--font-display)]";

export default function ProcessPage() {
  return (
    <main>
      <PageHero eyebrow="Our process" title="Clear stages, no surprises" intro="Every project follows the same six stages. You sign off at each one before we move on." />
      <Process />
      <section className="bg-[#0e1838] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>A typical 17-week project</h2></Reveal>
          <p className="mb-10 mt-3 max-w-2xl text-[#f2ead8]/70">Timelines vary with size and scope. You get a week-by-week schedule with your quote.</p>
          <Timeline />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>What you can expect from us</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {EXPECT.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.1}><div className="h-full rounded-2xl border border-[#d6b25e]/20 bg-[#17234d] p-7"><h3 className={`${D} text-2xl font-semibold`}>{t}</h3><p className="mt-3 text-[#f2ead8]/75">{d}</p></div></Reveal>
          ))}
        </div>
      </section>
      <section className="bg-[#0e1838] py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>How payments work</h2></Reveal>
          <p className="mb-8 mt-3 text-[#f2ead8]/70">Payments are tied to progress, never paid all at once. The exact split is written into your contract.</p>
          <div className="divide-y divide-[#f2ead8]/15 border-y border-[#f2ead8]/15">
            {PAYMENT.map(([s, p], i) => (
              <Reveal key={s} delay={i * 0.06}><div className={`${D} flex items-center justify-between py-5 text-xl`}><span>{s}</span><b className="text-[#d6b25e]">{p}</b></div></Reveal>
            ))}
          </div>
        </div>
      </section>
      <Cta title="Ready for the first step?" label="Book a site visit" />
    </main>
  );
}
