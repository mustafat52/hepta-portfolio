// Run from the project root (the "web" folder): node apply-update-2.mjs
import fs from "fs";

function patch(file, edits) {
  if (!fs.existsSync(file)) return console.log("MISSING      " + file);
  let s = fs.readFileSync(file, "utf8");
  for (const [label, from, to, done] of edits) {
    if (s.includes(done)) console.log("already done ", label);
    else if (s.includes(from)) {
      s = s.replace(from, to);
      console.log("patched      ", label);
    } else console.log("NOT FOUND    ", label);
  }
  fs.writeFileSync(file, s);
}

patch("components/ui/case-study-flip-stack.tsx", [
  ["no blank tail: spread flips over n-1 cards", "const segment = 1 / Math.max(total, 1);", "const segment = 1 / Math.max(total - 1, 1);", "total - 1, 1)"],
  ["last card stays: slide", "reduceMotion ? [0, 0] : [0, -118],", "reduceMotion || index === total - 1 ? [0, 0] : [0, -118],", "index === total - 1 ? [0, 0] : [0, -118]"],
  ["last card stays: offset", "reduceMotion ? [0, 0] : [0, stackedOffset],", "reduceMotion || index === total - 1 ? [0, 0] : [0, stackedOffset],", "index === total - 1 ? [0, 0] : [0, stackedOffset]"],
  ["last card stays: tilt", "reduceMotion ? [0, 0] : [0, 22],", "reduceMotion || index === total - 1 ? [0, 0] : [0, 22],", "index === total - 1 ? [0, 0] : [0, 22]"],
  ["last card stays: fade", "reduceMotion ? [1, 0] : [1, 1],", "reduceMotion && index !== total - 1 ? [1, 0] : [1, 1],", "index !== total - 1 ? [1, 0]"],
]);

patch("app/page.tsx", [
  ["pull next section up", 'className="bg-[#f6f6f4] text-[#2a2a2a]"', 'className="bg-[#f6f6f4] text-[#2a2a2a] -mb-[12vh]"', "-mb-[12vh]"],
]);

patch("components/site/sections.tsx", [
  ["process top spacing", 'id="process" className="mx-auto max-w-6xl px-5 pb-28"', 'id="process" className="mx-auto max-w-6xl px-5 pb-28 pt-10"', "px-5 pb-28 pt-10"],
]);
