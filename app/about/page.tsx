import type { Metadata } from "next";
import { PageHero, Reveal, Count, Cta } from "@/components/site/page-kit";
import { ABOUT } from "@/lib/pages";
import { C } from "@/lib/content";

export const metadata: Metadata = { title: "About | Hepta Constructions & Interiors" };
const D = "font-[family-name:var(--font-display)]";

export default function About() {
  return (
    <main>
      <PageHero eyebrow="About us" title="Designers and builders under one roof" intro="We are an interior design and construction company. Our design team and our site crew work as one, so what you approve is what gets built." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
        {ABOUT.story.map((p, i) => <Reveal key={i} delay={i * 0.12}><p className="text-xl leading-relaxed text-[#f2ead8]/85">{p}</p></Reveal>)}
      </section>
      <section className="bg-[#0e1838] py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 md:grid-cols-4">
          {C.stats.map(([n, l]) => (
            <Reveal key={l}>
              <b className={`${D} block text-5xl font-extrabold text-[#d6b25e] md:text-6xl`}><Count to={parseInt(n)} suffix={n.replace(/[0-9]/g, "")} /></b>
              <span className="text-[#f2ead8]/70">{l}</span>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>What we hold ourselves to</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ABOUT.values.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.1}>
              <div className="h-full rounded-2xl border border-[#d6b25e]/20 bg-[#17234d] p-7 transition hover:-translate-y-1 hover:border-[#d6b25e]/60">
                <span className={`${D} text-sm font-semibold text-[#e6c97a]`}>0{i + 1}</span>
                <h3 className={`${D} mt-2 text-2xl font-semibold`}>{t}</h3>
                <p className="mt-3 text-[#f2ead8]/75">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-[#0e1838] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>Our journey</h2></Reveal>
          <div className="relative mt-10 border-l border-[#d6b25e]/40 pl-8">
            {ABOUT.milestones.map(([y, t], i) => (
              <Reveal key={y} delay={i * 0.05} className="relative pb-8">
                <span className="absolute -left-[39px] top-2 h-3 w-3 rounded-full bg-[#d6b25e]" />
                <b className={`${D} text-2xl text-[#e6c97a]`}>{y}</b>
                <p className="mt-1 text-lg text-[#f2ead8]/80">{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>The people behind the work</h2></Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.team.map(([i, n, r, d], k) => (
            <Reveal key={n + k} delay={k * 0.08}>
              <div className="h-full rounded-2xl bg-[#17234d] p-6">
                <span className={`${D} grid h-14 w-14 place-items-center rounded-full bg-[#d6b25e] text-lg font-bold text-[#0b1330]`}>{i}</span>
                <h3 className={`${D} mt-4 text-xl font-semibold`}>{n}</h3>
                <p className={`${D} text-sm text-[#e6c97a]`}>{r}</p>
                <p className="mt-3 text-base text-[#f2ead8]/70">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-[#0e1838] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>Why one team matters</h2></Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {ABOUT.why.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.1}><div className="border-t-2 border-[#d6b25e] pt-4"><h3 className={`${D} text-xl font-semibold`}>{t}</h3><p className="mt-2 text-[#f2ead8]/75">{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>
      <Cta title="Let's talk about your space" />
    </main>
  );
}
