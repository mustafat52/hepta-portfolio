// Run from the project root (the "web" folder): node apply-update-9.mjs
import fs from "fs";

const names = [
  ["Interior Design", "interior-design"],
  ["Turnkey Interiors", "turnkey-interiors"],
  ["Construction", "construction"],
  ["Renovation", "renovation"],
  ["Custom Furniture", "custom-furniture"],
  ["Project Management", "project-management"],
];

// 1. Add an image path to each service in lib/content.ts
const cf = "lib/content.ts";
if (!fs.existsSync(cf)) console.log("MISSING      " + cf);
else {
  let s = fs.readFileSync(cf, "utf8");
  for (const [n, slug] of names) {
    const from = `{ name: "${n}", text:`;
    const to = `{ name: "${n}", image: "/services/${slug}.jpg", text:`;
    if (s.includes(`image: "/services/${slug}.jpg"`)) console.log("already done ", n);
    else if (s.includes(from)) { s = s.replace(from, () => to); console.log("patched      ", n); }
    else console.log("NOT FOUND    ", n);
  }
  fs.writeFileSync(cf, s);
}

// 2. Show the photo on the front of each service card
const sf = "components/site/sections.tsx";
if (!fs.existsSync(sf)) console.log("MISSING      " + sf);
else {
  let s = fs.readFileSync(sf, "utf8");
  const re = /defaultComponent=\{<div className="flex h-full flex-col justify-between[\s\S]*?<\/h3><\/div>\}/;
  const D = "${D}";
  const next =
    'defaultComponent={<div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#17234d] p-6 text-[#f2ead8]">' +
    '<img src={s.image} alt={s.name} className="absolute inset-0 h-full w-full object-cover" />' +
    '<div className="absolute inset-0 bg-gradient-to-t from-[#0b1330]/90 via-[#0b1330]/25 to-[#0b1330]/30" />' +
    "<span className={`" + D + " relative text-sm font-semibold text-[#e6c97a]`}>0{i + 1}</span>" +
    "<h3 className={`" + D + " relative text-3xl font-semibold tracking-tight`}>{s.name}</h3></div>}";
  if (s.includes("src={s.image}")) console.log("already done  service card photo");
  else if (re.test(s)) { s = s.replace(re, () => next); fs.writeFileSync(sf, s); console.log("patched       service card photo"); }
  else console.log("NOT FOUND     service card (send me the Services function from components/site/sections.tsx)");
}
