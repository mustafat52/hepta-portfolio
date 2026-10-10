// Run from the project root (the "web" folder): node apply-update-18.mjs
import fs from "fs";

const file = "components/site/reviews.tsx";
if (!fs.existsSync(file)) {
  console.log("MISSING      " + file);
} else {
  let s = fs.readFileSync(file, "utf8");
  if (s.includes("<Row items={REVIEWS} />")) {
    console.log("already done  moving reviews restored");
  } else {
    const re = /\{REVIEWS\.length < 6 \? \([\s\S]*?\n      \)\}/;
    if (!re.test(s)) {
      console.log("NOT FOUND     reviews block (send me components/site/reviews.tsx)");
    } else {
      const next = `<div className="space-y-5">
          {REVIEWS.length < 6 ? (
            <Row items={REVIEWS} />
          ) : (
            <>
              <Row items={REVIEWS.slice(0, half)} />
              <Row items={REVIEWS.slice(half)} reverse />
            </>
          )}
        </div>`;
      s = s.replace(re, () => next);
      fs.writeFileSync(file, s);
      console.log("patched       moving reviews restored (always scrolls, any number of reviews)");
    }
  }
}
