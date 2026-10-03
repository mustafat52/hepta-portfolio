// Run from the project root (the "web" folder): node apply-update-10.mjs
import fs from "fs";

const file = "components/ui/case-study-flip-stack.tsx";
if (!fs.existsSync(file)) {
  console.log("MISSING      " + file);
} else {
  let s = fs.readFileSync(file, "utf8");
  const sub = (label, from, to, done) => {
    if (s.includes(done)) return console.log("already done ", label);
    if (!s.includes(from)) return console.log("NOT FOUND    ", label);
    s = s.split(from).join(to);
    console.log("patched      ", label);
  };
  // Phone cards get a height based on the screen (and stay clear of the menu bar); desktop keeps its wide shape.
  sub("phone card height", "aspect-[3/4]", "h-[min(calc(100svh_-_8rem),620px)] sm:h-auto", "100svh_-_8rem");
  // Text keeps the space it needs; the photo takes whatever is left, instead of being clipped.
  sub("phone card layout", "sm:grid-cols-[1.15fr_0.85fr]", "grid-rows-[auto_minmax(0,1fr)] sm:grid-rows-none sm:grid-cols-[1.15fr_0.85fr]", "grid-rows-[auto_minmax(0,1fr)]");
  sub("phone photo size", "min-h-[180px]", "min-h-0 sm:min-h-[180px]", "min-h-0 sm:min-h-[180px]");
  fs.writeFileSync(file, s);
}
