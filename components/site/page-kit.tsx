"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { C } from "@/lib/content";
import { PROCESS } from "@/lib/process";
import { REVIEWS } from "@/lib/reviews";

const D = "font-[family-name:var(--font-display)]";
const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden bg-[#0b1330] pb-16 pt-36">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(47,75,184,0.4),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d6b25e]/60 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-5">
        <p className={`${D} mb-5 text-sm uppercase tracking-[0.3em] text-[#e6c97a]`}>{eyebrow}</p>
        <KineticTextReveal text={title} splitBy="words" stagger={0.08} className={`${D} max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl`} />
        <Reveal delay={0.4}><p className="mt-8 max-w-2xl text-xl text-[#f2ead8]/75">{intro}</p></Reveal>
      </div>
    </section>
  );
}

export function Count({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

export function Cta({ title, label = "Start a project", href = "/contact" }: { title: string; label?: string; href?: string }) {
  return (
    <section className="bg-[#111b3f] py-20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5">
        <Reveal><h2 className={`${D} max-w-xl text-4xl font-semibold tracking-tight md:text-5xl`}>{title}</h2></Reveal>
        <Reveal delay={0.15}><Link href={href} className={`${D} inline-block rounded-full bg-[#d6b25e] px-8 py-3.5 font-semibold text-[#0b1330] transition hover:bg-[#e6c97a]`}>{label}</Link></Reveal>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-[#f2ead8]/15 border-y border-[#f2ead8]/15">
      {items.map((f, i) => (
        <div key={f.q}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className={`${D} flex w-full items-center justify-between gap-4 py-5 text-left text-xl font-semibold`}>
            {f.q}<span className="text-2xl text-[#d6b25e]">{open === i ? "\u2212" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <p className="pb-6 text-[#f2ead8]/75">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function ProjectGrid() {
  const types = ["All", ...Array.from(new Set(C.projects.map((p) => p.eyebrow)))];
  const [t, setT] = useState("All");
  const list = C.projects.filter((p) => t === "All" || p.eyebrow === t);
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        {types.map((x) => (
          <button key={x} onClick={() => setT(x)} className={`${D} rounded-full border px-5 py-2 text-sm font-semibold transition ${x === t ? "border-[#d6b25e] bg-[#d6b25e] text-[#0b1330]" : "border-[#f2ead8]/25 hover:border-[#d6b25e]"}`}>{x}</button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div layout key={p.slug} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
              <Link href={p.href} className="group block overflow-hidden rounded-2xl bg-[#17234d]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className={`${D} absolute left-4 top-4 rounded-full bg-[#0b1330]/80 px-3 py-1 text-xs font-semibold text-[#e6c97a]`}>{p.eyebrow}</span>
                </div>
                <div className="p-6">
                  <h3 className={`${D} text-2xl font-semibold`}>{p.name}</h3>
                  <p className="mt-2 text-[#f2ead8]/70">{p.description}</p>
                  <p className={`${D} mt-4 text-sm text-[#e6c97a]`}>{[p.location, p.area, p.year].filter(Boolean).join(" · ")}</p>
                  <span className={`${D} mt-4 inline-block text-sm font-semibold underline underline-offset-4 transition group-hover:text-[#e6c97a]`}>View project &rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function Timeline() {
  const total = 17;
  const spans = [[1, 1], [2, 3], [4, 5], [6, 16], [15, 16], [17, 17]];
  return (
    <div className="space-y-3">
      {PROCESS.map((p, i) => {
        const [a, b] = spans[i];
        return (
          <div key={p.title} className="grid items-center gap-2 md:grid-cols-[250px_1fr] md:gap-4">
            <span className={`${D} text-sm font-semibold`}>0{i + 1} &middot; {p.title}</span>
            <div className="relative h-8 rounded-full bg-[#f2ead8]/10">
              <motion.div
                initial={{ width: 0 }} whileInView={{ width: `${((b - a + 1) / total) * 100}%` }} viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
                className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#d6b25e] to-[#e6c97a]" style={{ left: `${((a - 1) / total) * 100}%` }} />
            </div>
          </div>
        );
      })}
      <div className="grid md:grid-cols-[250px_1fr] md:gap-4"><span /><div className="flex justify-between text-xs text-[#f2ead8]/50"><span>Week 1</span><span>Week {total}</span></div></div>
    </div>
  );
}

export function Bars({ items }: { items: (string | number)[][] }) {
  return (
    <div className="space-y-3">
      {items.map(([label, pct], i) => (
        <div key={label} className="grid grid-cols-[70px_1fr_44px] items-center gap-3 text-sm">
          <span>{label}</span>
          <div className="h-2 rounded-full bg-[#f2ead8]/10">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }} className="h-2 rounded-full bg-[#d6b25e]" />
          </div>
          <span className="text-right text-[#f2ead8]/60">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

export function ReviewGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {REVIEWS.map((r, i) => (
        <Reveal key={r.name} delay={(i % 3) * 0.1}>
          <figure className="h-full rounded-2xl border border-[#d6b25e]/20 bg-[#17234d] p-6">
            <div className="text-lg text-[#d6b25e]" aria-label="5 out of 5 stars">{"\u2605\u2605\u2605\u2605\u2605"}</div>
            <blockquote className="mt-4 text-lg leading-snug">{r.quote}</blockquote>
            <figcaption className={`${D} mt-6 text-sm`}><b className="block">{r.name}</b><span className="text-[#f2ead8]/60">{r.project}</span></figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
