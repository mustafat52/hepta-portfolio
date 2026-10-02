// Save into the project's scripts folder, then run: node scripts/patch-performance.mjs
import fs from "fs";

function patch(file, edits) {
  if (!fs.existsSync(file)) return console.log("MISSING     ", file);
  let s = fs.readFileSync(file, "utf8");
  for (const e of edits) {
    if (s.includes(e.done)) console.log("already done", e.label);
    else if (s.includes(e.find)) {
      s = s.replace(e.find, e.replace);
      console.log("patched     ", e.label);
    } else console.log("NOT FOUND   ", e.label);
  }
  fs.writeFileSync(file, s);
}

patch("components/ui/closing-plasma.tsx", [
  {
    label: "plasma: quarter resolution",
    find: "const dpr = Math.min(window.devicePixelRatio || 1, 1.75);",
    replace: "const dpr = 0.5;",
    done: "const dpr = 0.5;",
  },
  {
    label: "plasma: watch visibility",
    find: "const start = performance.now();",
    replace:
      "const start = performance.now();\n    let visible = true;\n    const io = new IntersectionObserver(([entry]) => {\n      visible = entry.isIntersecting;\n    });\n    io.observe(container);",
    done: "let visible = true;",
  },
  {
    label: "plasma: pause when off screen",
    find: "const elapsed = (now - start) / 1000;",
    replace:
      "if (!visible) {\n        rafId = requestAnimationFrame(render);\n        return;\n      }\n      const elapsed = (now - start) / 1000;",
    done: "if (!visible)",
  },
  {
    label: "plasma: cleanup",
    find: "cancelAnimationFrame(rafId);",
    replace: "cancelAnimationFrame(rafId);\n      io.disconnect();",
    done: "io.disconnect();",
  },
]);

patch("components/ui/ripple-transition.tsx", [
  {
    label: "ripple: 1x resolution",
    find: "Math.min(2, window.devicePixelRatio || 1)",
    replace: "1",
    done: "const density = 1;",
  },
]);

patch("components/site/sections.tsx", [
  {
    label: "hero: slower autoplay",
    find: "autoPlayInterval={4500}",
    replace: "autoPlayInterval={9000}",
    done: "autoPlayInterval={9000}",
  },
]);
