// Run from the project root (the "web" folder): node apply-update-6.mjs
import fs from "fs";
import path from "path";
const files = {
 "components/site/stats.tsx": "\"use client\";\nimport { motion } from \"framer-motion\";\nimport { C } from \"@/lib/content\";\nimport { Count, Reveal } from \"@/components/site/page-kit\";\n\nconst D = \"font-[family-name:var(--font-display)]\";\n// Sample one-line notes under each number. Edit to match Hepta's real facts.\nconst NOTES = [\n  \"Homes, offices, shops and cafes\",\n  \"Designing and building since 2014\",\n  \"Carpenters, electricians and site engineers\",\n  \"Handed over on or before the agreed date\",\n];\n\nexport function Stats() {\n  return (\n    <div className=\"relative mt-14 overflow-hidden rounded-3xl border border-[#d6b25e]/25\">\n      <motion.div\n        className=\"absolute inset-x-0 top-0 z-10 h-px origin-left bg-gradient-to-r from-transparent via-[#e6c97a] to-transparent\"\n        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}\n      />\n      <div className=\"grid grid-cols-2 gap-px bg-[#d6b25e]/20 md:grid-cols-4\">\n        {C.stats.map(([n, l], i) => (\n          <Reveal key={l} delay={i * 0.1} className=\"bg-[#101a40] p-8 transition-colors hover:bg-[#162452] md:p-10\">\n            <b className={`${D} block bg-gradient-to-b from-[#f3dc9b] to-[#c9a24b] bg-clip-text text-6xl font-extrabold text-transparent md:text-7xl`}>\n              <Count to={parseInt(n)} suffix={n.replace(/[0-9]/g, \"\")} />\n            </b>\n            <p className={`${D} mt-4 text-lg font-semibold`}>{l}</p>\n            <p className=\"mt-1 text-sm text-[#f2ead8]/60\">{NOTES[i]}</p>\n          </Reveal>\n        ))}\n      </div>\n    </div>\n  );\n}\n"
};
for (const [f, c] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c);
  console.log("wrote       ", f);
}
const sf = "components/site/sections.tsx";
if (!fs.existsSync(sf)) console.log("MISSING       " + sf);
else {
  let s = fs.readFileSync(sf, "utf8");
  if (s.includes("<Stats />")) console.log("already done  stats on home page");
  else {
    const block = /<div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">[\s\S]*?\)\)\}\s*<\/div>/;
    const imp = 'import { C } from "@/lib/content";';
    if (block.test(s) && s.includes(imp)) {
      s = s.replace(block, "<Stats />").replace(imp, imp + '\nimport { Stats } from "@/components/site/stats";');
      fs.writeFileSync(sf, s);
      console.log("patched       stats on home page");
    } else console.log("NOT FOUND     stats block (send me the About function from components/site/sections.tsx)");
  }
}
