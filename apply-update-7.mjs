// Run from the project root (the "web" folder): node apply-update-7.mjs
import fs from "fs";
import path from "path";
const files = {
 "components/site/stats.tsx": "\"use client\";\nimport { motion } from \"framer-motion\";\nimport { C } from \"@/lib/content\";\nimport { Count, Reveal } from \"@/components/site/page-kit\";\n\nconst D = \"font-[family-name:var(--font-display)]\";\n// Sample one-line notes under each number. Edit to match Hepta's real facts.\nconst NOTES = [\n  \"Homes, offices, shops and cafes\",\n  \"Designing and building since 2014\",\n  \"Carpenters, electricians and site engineers\",\n  \"Handed over on or before the agreed date\",\n];\n\nexport function Stats() {\n  return (\n    <div className=\"relative mt-14 overflow-hidden rounded-3xl border border-[#d6b25e]/25\">\n      <motion.div\n        className=\"absolute inset-x-0 top-0 z-10 h-px origin-left bg-gradient-to-r from-transparent via-[#e6c97a] to-transparent\"\n        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}\n      />\n      <div className=\"grid grid-cols-2 gap-px bg-[#d6b25e]/20 md:grid-cols-4\">\n        {C.stats.map(([n, l], i) => (\n          <Reveal key={l} delay={i * 0.1} className=\"bg-[#101a40] p-5 transition-colors hover:bg-[#162452] sm:p-8 md:p-10\">\n            <b className={`${D} block bg-gradient-to-b from-[#f3dc9b] to-[#c9a24b] bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl md:text-7xl`}>\n              <Count to={parseInt(n)} suffix={n.replace(/[0-9]/g, \"\")} />\n            </b>\n            <p className={`${D} mt-3 text-base font-semibold sm:mt-4 sm:text-lg`}>{l}</p>\n            <p className=\"mt-1 text-sm text-[#f2ead8]/60\">{NOTES[i]}</p>\n          </Reveal>\n        ))}\n      </div>\n    </div>\n  );\n}\n",
 "components/site/nav.tsx": "\"use client\";\nimport Link from \"next/link\";\nimport { usePathname } from \"next/navigation\";\nimport { useEffect, useState } from \"react\";\nimport { AnimatePresence, motion } from \"framer-motion\";\nimport { Wordmark } from \"@/components/site/chrome\";\n\nconst D = \"font-[family-name:var(--font-display)]\";\nconst links = [[\"About\", \"/about\"], [\"Services\", \"/services\"], [\"Work\", \"/projects\"], [\"Process\", \"/process\"], [\"Reviews\", \"/reviews\"]];\n\nexport function Nav() {\n  const path = usePathname();\n  const [open, setOpen] = useState(false);\n  useEffect(() => { setOpen(false); }, [path]);\n  const on = (h: string) => path === h || path.startsWith(h + \"/\");\n  return (\n    <header className=\"fixed inset-x-0 top-0 z-50 border-b border-[#f2ead8]/10 bg-[#0b1330]/90 backdrop-blur-md\">\n      <div className=\"mx-auto flex h-16 max-w-6xl items-center justify-between px-5\">\n        <Link href=\"/\"><Wordmark light /></Link>\n        <nav className={`${D} hidden gap-8 text-sm font-medium md:flex`}>\n          {links.map(([n, h]) => (\n            <Link key={h} href={h} className={`relative py-1 transition ${on(h) ? \"text-[#e6c97a]\" : \"text-[#f2ead8]/75 hover:text-[#e6c97a]\"}`}>\n              {n}\n              {on(h) && <motion.span layoutId=\"nav-underline\" className=\"absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#d6b25e]\" />}\n            </Link>\n          ))}\n        </nav>\n        <div className=\"flex items-center gap-3\">\n          <Link href=\"/contact\" className={`${D} hidden rounded-full bg-[#d6b25e] px-5 py-2 text-sm font-semibold text-[#0b1330] transition hover:bg-[#e6c97a] sm:inline-block`}>Start a project</Link>\n          <button onClick={() => setOpen(!open)} aria-label=\"Menu\" aria-expanded={open} className={`${D} rounded-full border border-[#f2ead8]/25 px-5 py-2 text-sm font-semibold md:hidden`}>{open ? \"Close\" : \"Menu\"}</button>\n        </div>\n      </div>\n      <AnimatePresence>\n        {open && (\n          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: \"auto\", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className={`${D} overflow-hidden border-t border-[#f2ead8]/10 bg-[#0b1330] md:hidden`}>\n            <div className=\"flex flex-col px-5 py-3\">\n              {links.map(([n, h], i) => (\n                <motion.div key={h} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>\n                  <Link href={h} className={`block border-b border-[#f2ead8]/10 py-4 text-xl font-semibold ${on(h) ? \"text-[#e6c97a]\" : \"\"}`}>{n}</Link>\n                </motion.div>\n              ))}\n              <Link href=\"/contact\" className=\"mb-3 mt-5 rounded-full bg-[#d6b25e] py-3.5 text-center font-semibold text-[#0b1330]\">Start a project</Link>\n            </div>\n          </motion.nav>\n        )}\n      </AnimatePresence>\n    </header>\n  );\n}\n"
};
for (const [f, c] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c);
  console.log("wrote       ", f);
}
function patch(file, edits) {
  if (!fs.existsSync(file)) return console.log("MISSING      " + file);
  let s = fs.readFileSync(file, "utf8");
  for (const [label, from, to, done] of edits) {
    if (s.includes(done)) console.log("already done ", label);
    else if (s.includes(from)) { s = s.replace(from, to); console.log("patched      ", label); }
    else console.log("NOT FOUND    ", label);
  }
  fs.writeFileSync(file, s);
}
patch("app/layout.tsx", [
  ["no sideways scroll", "antialiased", "overflow-x-clip antialiased", "overflow-x-clip"],
  ["phone browser colour", "export const metadata: Metadata = {", 'export const viewport = { themeColor: "#0b1330" };\n\nexport const metadata: Metadata = {', "themeColor"],
]);
patch("components/ui/case-study-flip-stack.tsx", [
  ["project stack fits phone screens", "sticky top-0 flex h-screen", "sticky top-0 flex h-[100svh]", "h-[100svh]"],
]);
patch("components/ui/ripple-transition.tsx", [
  ["sharper hero on phones", "const density = 1;", "const density = window.innerWidth < 768 ? Math.min(2, window.devicePixelRatio || 1) : 1;", "window.innerWidth < 768"],
]);
patch("components/ui/closing-plasma.tsx", [
  ["lighter contact background on phones", "const dpr = 0.5;", "const dpr = window.innerWidth < 768 ? 0.35 : 0.5;", "0.35"],
]);
patch("components/site/sections.tsx", [
  ["tap hint on service cards", "What we do</h2>", 'What we do</h2>\n      <p className="-mt-6 mb-8 text-sm text-[#f2ead8]/60 md:hidden">Tap a card to see what it includes</p>', "Tap a card"],
]);
