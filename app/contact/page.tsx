import type { Metadata } from "next";
import { Contact } from "@/components/site/sections";
import { Reveal } from "@/components/site/page-kit";
import { NEXT_STEPS } from "@/lib/pages";

export const metadata: Metadata = { title: "Contact | Hepta Constructions & Interiors" };
const D = "font-[family-name:var(--font-display)]";

export default function ContactPage() {
  return (
    <main>
      <Contact />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal><h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>What happens next</h2></Reveal>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {NEXT_STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}><div className="border-t-2 border-[#d6b25e] pt-4"><span className={`${D} text-sm font-semibold text-[#e6c97a]`}>0{i + 1}</span><h3 className={`${D} mt-1 text-xl font-semibold`}>{t}</h3><p className="mt-2 text-[#f2ead8]/75">{d}</p></div></Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
