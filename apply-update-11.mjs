// Run from the project root (the "web" folder): node apply-update-11.mjs
import fs from "fs";
import path from "path";
const files = {
 "app/projects/[slug]/page.tsx": "import Link from \"next/link\";\nimport { notFound } from \"next/navigation\";\nimport { KineticTextReveal } from \"@/components/ui/kinetic-text-reveal\";\nimport { C } from \"@/lib/content\";\n\nconst D = \"font-[family-name:var(--font-display)]\";\nconst H = `${D} text-sm font-semibold uppercase tracking-widest text-[#d6b25e]`;\n\nexport function generateStaticParams() {\n  return C.projects.map((p) => ({ slug: p.slug }));\n}\n\nexport default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {\n  const { slug } = await params;\n  const i = C.projects.findIndex((p) => p.slug === slug);\n  if (i < 0) notFound();\n  const p = C.projects[i];\n  const next = C.projects[(i + 1) % C.projects.length];\n  const facts = ([[\"Building\", p.eyebrow], [\"Location\", p.location], [\"Area\", p.area], [\"Year\", p.year], [\"Duration\", p.duration]] as [string, string | undefined][]).filter(([, v]) => v);\n  const texts = ([[\"Overview\", p.overview], [\"The challenge\", p.challenge], [\"Our approach\", p.approach]] as [string, string | undefined][]).filter(([, v]) => v);\n  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.location)}`;\n\n  return (\n    <main>\n      <section className=\"relative h-[75svh] min-h-[460px] overflow-hidden bg-[#0b1330]\">\n        <img src={p.image} alt={p.imageAlt} className=\"absolute inset-0 h-full w-full object-cover\" />\n        <div className=\"absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40\" />\n        <div className=\"relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-14 text-white\">\n          <Link href=\"/projects\" className={`${D} mb-6 text-sm font-medium text-[#e6c97a] hover:underline`}>&larr; All projects</Link>\n          <KineticTextReveal text={p.name} splitBy=\"words\" stagger={0.09} className={`${D} max-w-4xl text-4xl font-semibold leading-none tracking-tight sm:text-5xl md:text-7xl`} />\n        </div>\n      </section>\n\n      <section className=\"mx-auto max-w-6xl px-5 py-12\">\n        <dl className=\"flex flex-wrap gap-x-14 gap-y-6\">\n          {facts.map(([k, v]) => (\n            <div key={k} className=\"max-w-md border-t-2 border-[#d6b25e] pt-3\">\n              <dt className={`${D} text-xs uppercase tracking-widest text-[#f2ead8]/60`}>{k}</dt>\n              <dd className={`${D} mt-1 text-lg font-semibold`}>{v}</dd>\n            </div>\n          ))}\n        </dl>\n        <a href={map} target=\"_blank\" rel=\"noopener noreferrer\" className={`${D} mt-8 inline-block rounded-full border border-[#d6b25e] px-6 py-3 text-sm font-semibold text-[#e6c97a] transition hover:bg-[#d6b25e] hover:text-[#0b1330]`}>View on Google Maps &rarr;</a>\n      </section>\n\n      {texts.length > 0 && (\n        <section className=\"mx-auto grid max-w-6xl gap-12 px-5 pb-16 md:grid-cols-3\">\n          {texts.map(([t, v]) => (\n            <div key={t}><h2 className={H}>{t}</h2><p className=\"mt-3\">{v}</p></div>\n          ))}\n        </section>\n      )}\n\n      {p.gallery && p.gallery.length > 0 && (\n        <section className=\"mx-auto max-w-6xl px-5 pb-16\">\n          <div className=\"grid gap-4 md:grid-cols-3\">\n            {p.gallery.map((g, n) => (\n              <div key={g + n} className=\"overflow-hidden rounded-xl\">\n                <img src={g} alt={`${p.name} photo ${n + 1}`} className=\"aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105\" />\n              </div>\n            ))}\n          </div>\n        </section>\n      )}\n\n      {((p.scope && p.scope.length > 0) || (p.materials && p.materials.length > 0)) && (\n        <section className=\"mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-2\">\n          {p.scope && p.scope.length > 0 && (\n            <div>\n              <h2 className={`${D} text-3xl font-semibold tracking-tight`}>Scope of work</h2>\n              <ul className=\"mt-5 flex flex-wrap gap-2\">{p.scope.map((s) => <li key={s} className={`${D} rounded-full border border-[#f2ead8]/30 px-4 py-1.5 text-sm font-medium`}>{s}</li>)}</ul>\n            </div>\n          )}\n          {p.materials && p.materials.length > 0 && (\n            <div>\n              <h2 className={`${D} text-3xl font-semibold tracking-tight`}>Key materials</h2>\n              <ul className=\"mt-5 flex flex-wrap gap-2\">{p.materials.map((s) => <li key={s} className={`${D} rounded-full bg-[#17234d] px-4 py-1.5 text-sm font-medium text-[#f2ead8]`}>{s}</li>)}</ul>\n            </div>\n          )}\n        </section>\n      )}\n\n      {p.results && p.results.length > 0 && (\n        <section className=\"bg-[#d6b25e] py-16 text-[#0b1330]\">\n          <div className=\"mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3\">\n            {p.results.map(([n, l]) => (\n              <div key={l}><b className={`${D} block text-5xl font-extrabold`}>{n}</b><span>{l}</span></div>\n            ))}\n          </div>\n        </section>\n      )}\n\n      <section className=\"bg-[#111b3f] py-20 text-white\">\n        <div className=\"mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-8 px-5\">\n          <div>\n            <h2 className={`${D} text-4xl font-semibold tracking-tight md:text-5xl`}>Planning something similar?</h2>\n            <Link href=\"/contact\" className={`${D} mt-6 inline-block rounded-full bg-[#d6b25e] px-7 py-3 font-semibold text-[#0b1330] transition hover:bg-[#e6c97a]`}>Start a project</Link>\n          </div>\n          <Link href={next.href} className={`${D} text-right text-sm text-white/70 hover:text-white`}>\n            Next project<br /><span className=\"text-2xl font-semibold text-white\">{next.name} &rarr;</span>\n          </Link>\n        </div>\n      </section>\n    </main>\n  );\n}\n"
};

function patch(file, edits) {
  if (!fs.existsSync(file)) return console.log("MISSING      " + file);
  let s = fs.readFileSync(file, "utf8");
  for (const [label, from, to, done] of edits) {
    if (s.includes(done)) console.log("already done ", label);
    else if (s.includes(from)) { s = s.replace(from, () => to); console.log("patched      ", label); }
    else console.log("NOT FOUND    ", label);
  }
  fs.writeFileSync(file, s);
}

// 1. Real projects in lib/content.ts
const cf = "lib/content.ts";
if (!fs.existsSync(cf)) console.log("MISSING      " + cf);
else {
  let s = fs.readFileSync(cf, "utf8");
  if (s.includes("gulshan-colony-shaikpet")) console.log("already done  real projects");
  else {
    const a = s.indexOf("  projects: [");
    const b = s.indexOf("  testimonials: [");
    if (a < 0 || b < 0 || b < a) console.log("NOT FOUND     projects block (send me lib/content.ts)");
    else {
      const type = `
export type Project = {
  slug: string; href: string; name: string; eyebrow: string; title: string; description: string;
  image: string; imageAlt: string; background: string; foreground?: string; location: string;
  area?: string; year?: string; duration?: string; overview?: string; challenge?: string; approach?: string;
  scope?: string[]; materials?: string[]; results?: string[][]; gallery?: string[];
};
`;
      const block = `  // Real projects, in the same order as public/work/p1.jpg, p2.jpg ...
  // Optional extras for any project: area, year, duration, overview, challenge, approach,
  // scope (list), materials (list), results ([["16 wks", "Start to handover"]]), gallery (list of image paths).
  // Each section of the project page appears only when it is filled in.
  projects: [
    {
      slug: "gulshan-colony-shaikpet", href: "/projects/gulshan-colony-shaikpet",
      name: "Gulshan Colony, Shaikpet", eyebrow: "Stilt + 3 floors", title: "Gulshan Colony, Shaikpet",
      description: "A stilt + 3 floors building near 7 Tombs, Shaikpet.",
      image: "/work/p1.jpg", imageAlt: "Stilt + 3 floors building at Gulshan Colony, Shaikpet",
      background: "#1e3a8a", foreground: light,
      location: "Gulshan Colony, near 7 Tombs, Shaikpet, Hyderabad 500008",
      overview: "A stilt + 3 floors building at Gulshan Colony, near 7 Tombs, Shaikpet, Hyderabad.",
    },
    {
      slug: "chandulal-baradari-colony-bahadurpura", href: "/projects/chandulal-baradari-colony-bahadurpura",
      name: "Chandulal Baradari Colony, Bahadurpura", eyebrow: "Stilt + 5 floors", title: "Chandulal Baradari Colony, Bahadurpura",
      description: "A stilt + 5 floors building in Bahadurpura.",
      image: "/work/p2.jpg", imageAlt: "Stilt + 5 floors building at Chandulal Baradari Colony, Bahadurpura",
      background: "#5b1a2e", foreground: light,
      location: "Chandulal Baradari Colony, Bahadurpura, Hyderabad 500064",
      overview: "A stilt + 5 floors building at Chandulal Baradari Colony, Bahadurpura, Hyderabad.",
    },
    {
      slug: "bachupally-sri-chaitanya-iit-academy", href: "/projects/bachupally-sri-chaitanya-iit-academy",
      name: "Bachupally, opposite Sri Chaitanya IIT Academy", eyebrow: "Stilt + 3 floors", title: "Bachupally, opp. Sri Chaitanya IIT Academy",
      description: "A stilt + 3 floors building in Bachupally, Ameenpur.",
      image: "/work/p3.jpg", imageAlt: "Stilt + 3 floors building opposite Sri Chaitanya IIT Academy, Bachupally",
      background: "#14506b", foreground: light,
      location: "Bachupally, opposite Sri Chaitanya IIT Academy, Ameenpur, Hyderabad 500049",
      overview: "A stilt + 3 floors building in Bachupally, opposite Sri Chaitanya IIT Academy, Ameenpur, Hyderabad.",
    },
    {
      slug: "bachupally-empire-meadows", href: "/projects/bachupally-empire-meadows",
      name: "Bachupally, opposite Empire Meadows", eyebrow: "Stilt + 3 floors", title: "Bachupally, opp. Empire Meadows",
      description: "A stilt + 3 floors building in Bachupally, Ameenpur.",
      image: "/work/p4.jpg", imageAlt: "Stilt + 3 floors building opposite Empire Meadows, Bachupally",
      background: "#3b2a6e", foreground: light,
      location: "Bachupally, opposite Empire Meadows, Ameenpur, Hyderabad 500049",
      overview: "A stilt + 3 floors building in Bachupally, opposite Empire Meadows, Ameenpur, Hyderabad.",
    },
  ] as Project[],
`;
      s = s.slice(0, a).replace(/  \/\/ All project text below[^\n]*\n/, "") + block + s.slice(b);
      s = s.replace(/(const light = "[^"]*";)/, (m) => m + "\n" + type);
      fs.writeFileSync(cf, s);
      console.log("patched       real projects in lib/content.ts");
    }
  }
}

// 2. Project page: shows only the details that exist, plus a map link
for (const [f, c] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c);
  console.log("wrote       ", f);
}

// 3. Cards and intro text that assumed area, year, scope and materials
patch("components/site/page-kit.tsx", [
  ["project cards without missing details", "{p.location} &middot; {p.area} &middot; {p.year}", '{[p.location, p.area, p.year].filter(Boolean).join(" \u00b7 ")}', "filter(Boolean).join"],
]);
patch("app/page.tsx", [
  ["home work intro", "Four recent projects. Click any card for the full story: scope, materials, timeline and results.", "Projects we have built across Hyderabad. Click any card for details and the location on the map.", "built across Hyderabad"],
]);
patch("app/projects/page.tsx", [
  ["projects page intro", "Homes, offices, shops and cafes. Open any project to see the scope, materials, timeline and results.", "Buildings we have built across Hyderabad. Open a project to see where it is and its details.", "built across Hyderabad"],
]);
