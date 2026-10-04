// Run from the project root (the "web" folder): node apply-update-16.mjs
import fs from "fs";

function patch(file, edits) {
  if (!fs.existsSync(file)) return console.log("MISSING      " + file);
  let s = fs.readFileSync(file, "utf8");
  for (const [label, from, to, done] of edits) {
    if (s.includes(done)) { console.log("already done ", label); continue; }
    const found = typeof from === "string" ? s.includes(from) : from.test(s);
    if (!found) { console.log("NOT FOUND    ", label); continue; }
    s = s.replace(from, () => to);
    console.log("patched      ", label);
  }
  fs.writeFileSync(file, s);
}

const BACK = (cls) => `<img src={SRC} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl" />`;

// 1. Work page cards: portrait frame, whole photo visible
patch("components/site/page-kit.tsx", [
  ["work cards: portrait frame", "relative aspect-[4/3] overflow-hidden", "relative aspect-[4/5] overflow-hidden", "relative aspect-[4/5] overflow-hidden"],
  ["work cards: whole photo", '<img src={p.image} alt={p.imageAlt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />',
    BACK().replace("SRC", "p.image") + '\n                  <img src={p.image} alt={p.imageAlt} className="relative h-full w-full object-contain transition duration-700 group-hover:scale-105" />', "blur-2xl"],
]);

// 2. Project page banner: whole photo visible
patch("app/projects/[slug]/page.tsx", [
  ["project banner: whole photo", '<img src={p.image} alt={p.imageAlt} className="absolute inset-0 h-full w-full object-cover" />',
    BACK().replace("SRC", "p.image") + '\n        <img src={p.image} alt={p.imageAlt} className="absolute inset-0 h-full w-full object-contain" />', "blur-2xl"],
]);

// 3. Home project stack cards: whole photo; on phones the photo fills the card with the text over it
patch("components/ui/case-study-flip-stack.tsx", [
  ["stack card: whole photo", /<img\s+src=\{item\.image\}\s+alt=\{item\.imageAlt\}\s+className="h-full w-full object-cover"/,
    BACK().replace("SRC", "item.image") + '\n          <img src={item.image} alt={item.imageAlt} className="relative h-full w-full object-contain"', "blur-2xl"],
  ["stack card: photo behind text on phones", /relative m-\[clamp\(10px,1\.2vw,18px\)\] (?:min-h-0 sm:min-h-\[180px\]|min-h-\[180px\]) overflow-hidden rounded-\[clamp\(12px,1\.4vw,22px\)\] sm:ml-0/,
    "absolute inset-0 z-0 overflow-hidden sm:relative sm:inset-auto sm:z-auto sm:m-[clamp(10px,1.2vw,18px)] sm:ml-0 sm:min-h-[180px] sm:rounded-[clamp(12px,1.4vw,22px)]", "sm:relative sm:inset-auto"],
  ["stack card: one row on phones", "grid-rows-[auto_minmax(0,1fr)] sm:grid-rows-none", "grid-rows-1 sm:grid-rows-none", "grid-rows-1 sm:grid-rows-none"],
  ["stack card: text at the bottom on phones", "flex min-w-0 flex-col p-[clamp(24px,3vw,48px)]", "relative z-10 flex min-w-0 flex-col self-end p-[clamp(24px,3vw,48px)] sm:self-auto", "self-end p-[clamp"],
  ["stack card: dark fade for the text", "bg-gradient-to-tr from-black/20 via-transparent to-white/10", "bg-gradient-to-t from-[#0b1330]/95 via-[#0b1330]/40 to-transparent sm:bg-gradient-to-tr sm:from-black/20 sm:via-transparent sm:to-white/10", "from-[#0b1330]/95"],
]);
