import type { Metadata } from "next";
import { PageHero, Reveal, Faq, Cta } from "@/components/site/page-kit";
import { SERVICES, SPACES, FAQS } from "@/lib/pages";

export const metadata: Metadata = { title: "Services | Hepta Constructions & Interiors" };
const D = "font-[family-name:var(--font-display)]";

export default function Services() {
  return (
    <main>
      <PageHero eyebrow="Services" title="Everything from the first sketch to the keys" intro="Take one service or the whole job. Most clients choose turnkey, because one team means one schedule and one person to call." />
      <section className="mx-auto max-w-6xl px-5 py-16">
        {SERVICES.map((s, i) => (
          <Reveal key={s.name}>
            <div className="grid gap-6 border-t border-[#f2ead8]/20 py-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <div>
                <span className={`${D} text-sm font-semibold text-[#e6c97a]`}>0{i + 1}</span>
                <h2 className={`${D} mt-2 text-3xl font-semibold tracking-tight md:text-4xl`}>{s.name}</h2>
                <p className={`${D} mt-4 text-sm text-[#f2ead8]/60`}>Typical timeline: <b className="text-[#f2ead8]">{s.time}</b></p>
              </div>
              <div>
                <p className="text-xl leading-relaxed text-[#f2ead8]/85">{s.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.includes.map((x) => <li key={x} className={`${D} rounded-full border border-[#d6b25e]/40 px-4 py-1.5 text-sm font-medium`}>{x}</li>)}
                </ul>
                <p className="mt-5 text-[#f2ead8]/70"><b className="text-[#e6c97a]">Best for:</b> {s.bestFor}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
      <section className="bg-[#0e1838] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>Spaces we work on</h2></Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            {SPACES.map((s, i) => <Reveal key={s} delay={i * 0.04}><span className={`${D} inline-block rounded-full bg-[#17234d] px-6 py-3 text-lg font-semibold transition hover:bg-[#d6b25e] hover:text-[#0b1330]`}>{s}</span></Reveal>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-20">
        <Reveal><h2 className={`${D} mb-8 text-4xl font-semibold tracking-tight md:text-5xl`}>Common questions</h2></Reveal>
        <Faq items={FAQS} />
      </section>
      <Cta title="Not sure which service you need?" label="Talk to us" />
    </main>
  );
}
