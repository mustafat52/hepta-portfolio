// Run once after installing the components: node scripts/patch-flip-stack.mjs
import fs from "fs";
const f = "components/ui/case-study-flip-stack.tsx";
let s = fs.readFileSync(f, "utf8");
if (!s.trimStart().startsWith('"use client"')) s = '"use client";\n\n' + s;
s = s.replace("<main", "<section").replace("</main>", "</section>").replaceAll("#a94808", "#0b8fd6");
fs.writeFileSync(f, s);
console.log("Flip stack patched.");
