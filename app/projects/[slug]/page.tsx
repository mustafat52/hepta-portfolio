import Link from "next/link";
import { notFound } from "next/navigation";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { C } from "@/lib/content";

const D = "font-[family-name:var(--font-display)]";

export function generateStaticParams() {
  return C.projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = C.projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = C.projects[i];
  const next = C.projects[(i + 1) % C.projects.length];
  const facts = [["Type", p.eyebrow], ["Location", p.location], ["Area", p.area], ["Year", p.year], ["Duration", p.duration]];

  return (
    <main>
      <section className="relative h-[75svh] min-h-[460px] overflow-hidden bg-[#0b1330]">
        <img src={p.image} alt={p.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-14 text-white">
          <Link href="/#work" className={`${D} mb-6 text-sm font-medium text-[#e6c97a] hover:underline`}>&larr; All work</Link>
          <KineticTextReveal text={p.name} splitBy="words" stagger={0.09} className={`${D} text-5xl font-semibold leading-none tracking-tight md:text-7xl`} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {facts.map(([k, v]) => (
            <div key={k} className="border-t-2 border-[#d6b25e] pt-3">
              <dt className={`${D} text-xs uppercase tracking-widest text-[#f2ead8]/60`}>{k}</dt>
              <dd className={`${D} mt-1 text-lg font-semibold`}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 md:grid-cols-3">
        <div>
          <h2 className={`${D} text-sm font-semibold uppercase tracking-widest text-[#d6b25e]`}>Overview</h2>
          <p className="mt-3">{p.overview}</p>
        </div>
        <div>
          <h2 className={`${D} text-sm font-semibold uppercase tracking-widest text-[#d6b25e]`}>The challenge</h2>
          <p className="mt-3">{p.challenge}</p>
        </div>
        <div>
          <h2 className={`${D} text-sm font-semibold uppercase tracking-widest text-[#d6b25e]`}>Our approach</h2>
          <p className="mt-3">{p.approach}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {p.gallery.map((g, n) => (
            <div key={g + n} className="overflow-hidden rounded-xl">
              <img src={g} alt={`${p.name} photo ${n + 1}`} className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-2">
        <div>
          <h2 className={`${D} text-3xl font-semibold tracking-tight`}>Scope of work</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.scope.map((s) => <li key={s} className={`${D} rounded-full border border-[#f2ead8]/30 px-4 py-1.5 text-sm font-medium`}>{s}</li>)}
          </ul>
        </div>
        <div>
          <h2 className={`${D} text-3xl font-semibold tracking-tight`}>Key materials</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {p.materials.map((s) => <li key={s} className={`${D} rounded-full bg-[#17234d] px-4 py-1.5 text-sm font-medium text-[#f2ead8]`}>{s}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-[#d6b25e] py-16 text-[#0b1330]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
          {p.results.map(([n, l]) => (
            <div key={l}>
              <b className={`${D} block text-5xl font-extrabold`}>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#111b3f] py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-5">
          <div>
            <h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>Planning something similar?</h2>
            <Link href="/#contact" className={`${D} mt-6 inline-block rounded-full bg-[#d6b25e] px-7 py-3 font-semibold text-[#0b1330] transition hover:bg-[#e6c97a]`}>Start a project</Link>
          </div>
          <Link href={next.href} className={`${D} text-right text-sm text-white/70 hover:text-white`}>
            Next project<br /><span className="text-2xl font-semibold text-white">{next.name} &rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
