"use client";
import { useEffect, useState } from "react";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { RippleTransition } from "@/components/ui/ripple-transition";
import { HoverTransition } from "@/components/ui/hover-transition";
import { ClosingPlasma } from "@/components/ui/closing-plasma";
import { C } from "@/lib/content";
import { Stats } from "@/components/site/stats";

const D = "font-[family-name:var(--font-display)]";

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#0b1330]">
      <RippleTransition images={C.heroImages} borderRadius={0} autoPlay autoPlayInterval={9000} background="#0b1330" label="Hepta project photos" className="absolute inset-0 min-h-0" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5 pb-8 pt-16 text-white">
        <p className={`${D} mb-5 text-sm uppercase tracking-[0.3em] text-[#e6c97a]`}>Constructions &amp; Interiors</p>
        <KineticTextReveal text="We build and design the spaces you live and work in." splitBy="words" stagger={0.09} delay={0.3} className={`${D} max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl`} />
        <p className="mt-8 text-sm text-white/60">Tap the image to change the view</p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28">
      <KineticTextReveal text="One team for design and construction, so what you approve is what gets built." splitBy="words" className={`${D} max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl`} />
      <Stats />
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 pb-28">
      <h2 className={`${D} mb-10 text-4xl font-semibold tracking-tight md:text-6xl`}>What we do</h2>
      <p className="-mt-6 mb-8 text-sm text-[#f2ead8]/60 md:hidden">Tap a card to see what it includes</p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {C.services.map((s, i) => (
          <HoverTransition key={s.name} effect="wipe" direction={i % 2 ? "left" : "right"} label={s.name} className="h-72 rounded-xl"
            defaultComponent={<div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#17234d] p-6 text-[#f2ead8]"><img src={s.image} alt={s.name} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b1330]/90 via-[#0b1330]/25 to-[#0b1330]/30" /><span className={`${D} relative text-sm font-semibold text-[#e6c97a]`}>0{i + 1}</span><h3 className={`${D} relative text-3xl font-semibold tracking-tight`}>{s.name}</h3></div>}
            hoverComponent={<div className="flex h-full flex-col justify-end bg-[#d6b25e] p-6 text-[#0b1330]"><h3 className={`${D} mb-3 text-2xl font-semibold`}>{s.name}</h3><p>{s.text}</p></div>} />
        ))}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 pb-28 pt-10">
      <h2 className={`${D} mb-10 text-4xl font-semibold tracking-tight md:text-6xl`}>How a project runs</h2>
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
        {C.process.map(([t, d], i) => (
          <div key={t} className="border-t border-[#f2ead8]/30 pt-4">
            <span className={`${D} text-sm font-semibold text-[#d6b25e]`}>0{i + 1}</span>
            <h3 className={`${D} mt-1 text-xl font-semibold`}>{t}</h3>
            <p className="mt-1 text-[#f2ead8]/70">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % C.testimonials.length), 7000);
    return () => clearInterval(t);
  }, [i]);
  const q = C.testimonials[i];
  return (
    <section id="reviews" className="bg-[#0b1330] py-28 text-white">
      <div className="mx-auto max-w-5xl px-5">
        <div className="min-h-[17rem]">
          <KineticTextReveal key={i} text={q.quote} splitBy="words" stagger={0.05} className="text-3xl leading-tight md:text-5xl" />
          <p className={`${D} mt-8 text-[#e6c97a]`}>{q.name}, {q.project}</p>
        </div>
        <div className="flex gap-2">
          {C.testimonials.map((_, n) => (
            <button key={n} aria-label={`Review ${n + 1}`} onClick={() => setI(n)} className={`h-2 rounded-full transition-all ${n === i ? "w-10 bg-[#d6b25e]" : "w-2 bg-white/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const t = `Hi Hepta, I'm ${f.get("name")}. Project: ${f.get("type")}. ${f.get("msg")}`;
    window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t)}`, "_blank");
  }
  const field = "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:border-[#e6c97a]";
  return (
    <section id="contact">
      <ClosingPlasma className="min-h-[90svh]" darkColorA="#050a1f" darkColorB="#13235c" darkColorC="#2f4bb8">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-28 text-white md:grid-cols-2">
          <div>
            <h2 className={`${D} text-5xl font-semibold leading-none tracking-tight md:text-7xl`}>Let&apos;s plan your space</h2>
            <p className="mt-6 max-w-md text-white/80">Tell us about the project. We reply within one working day.</p>
            <div className="mt-8 space-y-5">
              <p><a href={`tel:+${C.whatsapp}`} className="hover:text-[#e6c97a]">{C.phone}</a><br /><a href={`mailto:${C.email}`} className="hover:text-[#e6c97a]">{C.email}</a></p>
              {C.addresses.map((a) => (
                <div key={a.label}>
                  <b className={`${D} text-sm uppercase tracking-widest text-[#e6c97a]`}>{a.label}</b>
                  <p>{a.text}</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.text)}`} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-[#e6c97a]">View on map</a>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={send} className={`${D} grid gap-4 self-center`}>
            <input name="name" required placeholder="Your name" className={field} />
            <select name="type" className={field}>{["Home interior", "Office or commercial", "Retail or hospitality", "Construction or renovation"].map((o) => <option key={o} className="text-black">{o}</option>)}</select>
            <textarea name="msg" rows={4} placeholder="Tell us about the space" className={field} />
            <button className="rounded-full bg-[#d6b25e] px-6 py-3 font-semibold text-[#0b1330] transition hover:bg-[#e6c97a]">Send on WhatsApp</button>
          </form>
        </div>
      </ClosingPlasma>
    </section>
  );
}
