// Run from the project root (the "web" folder): node apply-update-4.mjs
import fs from "fs";
import path from "path";
const files = {
 "components/site/reviews.tsx": "\"use client\";\nimport { REVIEWS, RATING } from \"@/lib/reviews\";\n\nconst D = \"font-[family-name:var(--font-display)]\";\ntype Review = (typeof REVIEWS)[number];\n\nfunction Card({ r }: { r: Review }) {\n  const initials = r.name.split(\" \").map((w) => w[0]).join(\"\").slice(0, 2);\n  return (\n    <figure className=\"mr-5 w-[320px] shrink-0 rounded-2xl border border-[#d6b25e]/20 bg-[#17234d] p-6 md:w-[400px]\">\n      <div className=\"flex gap-0.5 text-lg text-[#d6b25e]\" aria-label=\"5 out of 5 stars\">{\"\\u2605\\u2605\\u2605\\u2605\\u2605\"}</div>\n      <blockquote className=\"mt-4 text-lg leading-snug text-[#f2ead8]\">{r.quote}</blockquote>\n      <figcaption className=\"mt-6 flex items-center gap-3\">\n        <span className={`${D} grid h-10 w-10 place-items-center rounded-full bg-[#d6b25e] text-sm font-bold text-[#0b1330]`}>{initials}</span>\n        <span className={`${D} text-sm`}>\n          <b className=\"block text-[#f2ead8]\">{r.name}</b>\n          <span className=\"text-[#f2ead8]/60\">{r.project}</span>\n        </span>\n      </figcaption>\n    </figure>\n  );\n}\n\nfunction Row({ items, reverse = false }: { items: Review[]; reverse?: boolean }) {\n  return (\n    <div className=\"group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]\">\n      <div className={`flex w-max py-2 [animation:hepta-marquee_80s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none] ${reverse ? \"[animation-direction:reverse]\" : \"\"}`}>\n        {[...items, ...items, ...items].map((r, i) => <Card key={i} r={r} />)}\n      </div>\n    </div>\n  );\n}\n\nexport function Reviews() {\n  const half = Math.ceil(REVIEWS.length / 2);\n  return (\n    <section id=\"reviews\" className=\"scroll-mt-16 bg-[#0e1838] py-24\">\n      <style>{\"@keyframes hepta-marquee{to{transform:translateX(-33.3333%)}}\"}</style>\n      <div className=\"mx-auto mb-12 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5\">\n        <h2 className={`${D} text-4xl font-semibold tracking-tight md:text-6xl`}>What our clients say</h2>\n        <div className={`${D} text-right`}>\n          <div className=\"text-lg text-[#d6b25e]\">{\"\\u2605\\u2605\\u2605\\u2605\\u2605\"}</div>\n          <p className=\"text-3xl font-bold\">{RATING.score} <span className=\"text-base font-medium text-[#f2ead8]/60\">average</span></p>\n          <p className=\"text-sm text-[#f2ead8]/60\">from {RATING.count} completed projects</p>\n        </div>\n      </div>\n      <div className=\"space-y-5\">\n        <Row items={REVIEWS.slice(0, half)} />\n        <Row items={REVIEWS.slice(half)} reverse />\n      </div>\n    </section>\n  );\n}\n",
 "lib/reviews.ts": "// Sample reviews and rating. Replace with real client reviews and real numbers.\nexport const RATING = { score: \"4.9\", count: \"120+\" };\nexport const REVIEWS = [\n  { quote: \"They finished a week early and kept the site clean every evening. The result looks exactly like the render.\", name: \"Client A\", project: \"3BHK apartment interior\" },\n  { quote: \"One team for design and construction meant no finger pointing. We always knew who to call.\", name: \"Client B\", project: \"Office fit-out\" },\n  { quote: \"The quote was itemised and the final bill matched it. That alone made us trust them.\", name: \"Client C\", project: \"Villa construction\" },\n  { quote: \"Our kitchen was rebuilt in five weeks and we barely noticed the dust. The joinery quality is superb.\", name: \"Client D\", project: \"Kitchen renovation\" },\n  { quote: \"They suggested a layout we never thought of, and it made the whole flat feel twice as big.\", name: \"Client E\", project: \"2BHK apartment\" },\n  { quote: \"Weekly photo updates meant I could follow the site from abroad without a single worry.\", name: \"Client F\", project: \"Villa interior\" },\n  { quote: \"Delivered our boutique on the date they promised, and the lighting keeps customers in the store longer.\", name: \"Client G\", project: \"Retail store\" },\n  { quote: \"Honest about costs from day one. When a material changed, they showed us options before deciding.\", name: \"Client H\", project: \"Home renovation\" },\n  { quote: \"The workshop-made wardrobes fit perfectly. You can tell the carpenters take pride in their work.\", name: \"Client I\", project: \"Custom furniture\" },\n  { quote: \"Months after handover a door needed adjusting. They came the next day and charged nothing.\", name: \"Client J\", project: \"Apartment interior\" },\n];\n"
};
for (const [f, c] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c);
  console.log("wrote       ", f);
}

// 1. Use the new reviews section on the home page
const pf = "app/page.tsx";
if (fs.existsSync(pf)) {
  let s = fs.readFileSync(pf, "utf8");
  if (s.includes("@/components/site/reviews")) console.log("already done  reviews on page");
  else {
    const a = "Services, Testimonials, Contact } from \"@/components/site/sections\";";
    const b = "Services, Contact } from \"@/components/site/sections\";\nimport { Reviews } from \"@/components/site/reviews\";";
    if (s.includes(a) && s.includes("<Testimonials />")) {
      s = s.replace(a, b).replace("<Testimonials />", "<Reviews />");
      fs.writeFileSync(pf, s);
      console.log("patched       reviews on page");
    } else console.log("NOT FOUND     reviews on page (send me app/page.tsx)");
  }
} else console.log("MISSING       " + pf);

// 2. Royal theme: midnight navy, ivory text, gold accents
const NAVY = "#0b1330", CARD = "#17234d", IVORY = "#f2ead8", GOLD = "#d6b25e", GOLD2 = "#e6c97a";
const pairs = [
  ["flex h-full flex-col justify-between bg-[#2a2a2a] p-6 text-white", `flex h-full flex-col justify-between bg-[${CARD}] p-6 text-[${IVORY}]`],
  ["flex h-full flex-col justify-end bg-[#0b8fd6] p-6 text-white", `flex h-full flex-col justify-end bg-[${GOLD}] p-6 text-[${NAVY}]`],
  ["rounded-full bg-[#0b8fd6] px-5 py-2 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition hover:bg-[#0a7bb9]", `rounded-full bg-[${GOLD}] px-5 py-2 font-[family-name:var(--font-display)] text-sm font-semibold text-[${NAVY}] transition hover:bg-[${GOLD2}]`],
  ["bg-white px-6 py-3 font-semibold text-[#2a2a2a] transition hover:bg-[#6cc4f5]", `bg-[${GOLD}] px-6 py-3 font-semibold text-[${NAVY}] transition hover:bg-[${GOLD2}]`],
  ["border-[#2a2a2a] bg-[#2a2a2a] text-white", `border-[${GOLD}] bg-[${GOLD}] text-[${NAVY}]`],
  ['n === i ? "text-[#6cc4f5]" : "text-[#0b8fd6]"', `n === i ? "text-[${NAVY}]" : "text-[${GOLD}]"`],
  ["rounded-2xl bg-white p-6 shadow-sm md:p-10", `rounded-2xl bg-[${CARD}] p-6 shadow-lg shadow-black/30 md:p-10`],
  ["bg-[#2a2a2a] px-4 py-1.5 text-sm font-medium text-white", `bg-[${CARD}] px-4 py-1.5 text-sm font-medium text-[${IVORY}]`],
  ['<footer className="bg-[#2a2a2a]', '<footer className="bg-[#070c20]'],
  ["bg-[#0b8fd6] py-16 text-white", `bg-[${GOLD}] py-16 text-[${NAVY}]`],
  ["bg-[#2a2a2a] py-20 text-white", "bg-[#111b3f] py-20 text-white"],
  ["bg-[#0b8fd6] px-7 py-3 font-semibold transition hover:bg-[#0a7bb9]", `bg-[${GOLD}] px-7 py-3 font-semibold text-[${NAVY}] transition hover:bg-[${GOLD2}]`],
  ['darkColorA="#070b10" darkColorB="#0e2f47" darkColorC="#0b8fd6"', 'darkColorA="#050a1f" darkColorB="#13235c" darkColorC="#2f4bb8"'],
  ['background="#2a2a2a"', `background="${NAVY}"`],
  ['background: "#1f3a4d"', 'background: "#1e3a8a"'],
  ['background: "#2a2a2a"', 'background: "#5b1a2e"'],
  ['background: "#0b6fa8"', 'background: "#14506b"'],
  ['background: "#3b3a36"', 'background: "#3b2a6e"'],
  ['const light = "#f6f6f4"', `const light = "${IVORY}"`],
  ["border-[#2a2a2a]/", `border-[${IVORY}]/`],
  ["bg-[#2a2a2a]/10", `bg-[${IVORY}]/10`],
  ["bg-[#2a2a2a]/", `bg-[${NAVY}]/`],
  ["text-[#2a2a2a]", `text-[${IVORY}]`],
  ["border-[#2a2a2a]", `border-[${GOLD}]`],
  ["bg-[#2a2a2a]", `bg-[${NAVY}]`],
  ["bg-[#f6f6f4]", `bg-[${NAVY}]`],
  ["#0a7bb9", GOLD2],
  ["#0b8fd6", GOLD],
  ["#6cc4f5", GOLD2],
];
const targets = ["app/layout.tsx", "app/page.tsx", "app/projects/[slug]/page.tsx", "components/site/chrome.tsx", "components/site/sections.tsx", "components/site/process.tsx", "lib/content.ts"];
for (const f of targets) {
  if (!fs.existsSync(f)) { console.log("MISSING       " + f); continue; }
  let s = fs.readFileSync(f, "utf8"), n = 0;
  for (const [a, b] of pairs) { const parts = s.split(a); if (parts.length > 1) { n += parts.length - 1; s = parts.join(b); } }
  fs.writeFileSync(f, s);
  console.log(n ? "themed        " + f + " (" + n + " changes)" : "already themed " + f);
}
