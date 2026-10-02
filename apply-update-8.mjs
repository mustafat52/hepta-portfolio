// Run from the project root (the "web" folder): node apply-update-8.mjs
import fs from "fs";

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

patch("components/site/sections.tsx", [
  ["hero text moved up to the middle", "flex-col justify-end px-5 pb-20 text-white", "flex-col justify-center px-5 pb-8 pt-16 text-white", "flex-col justify-center px-5 pb-8 pt-16"],
]);

patch("components/site/process.tsx", [
  ["process heading no longer cut off", '<section id="process" className="', '<section id="process" className="relative z-10 ', 'id="process" className="relative z-10'],
]);
