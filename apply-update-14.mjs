// Run from the project root (the "web" folder): node apply-update-14.mjs
import fs from "fs";

function edit(file, label, apply) {
  if (!fs.existsSync(file)) return console.log("MISSING      " + file);
  const r = apply(fs.readFileSync(file, "utf8"));
  if (r === "done") return console.log("already done ", label);
  if (r === null) return console.log("NOT FOUND    ", label);
  fs.writeFileSync(file, r);
  console.log("patched      ", label);
}

// 1. Real email
edit("lib/content.ts", "real email", (s) => {
  if (s.includes('email: "Heptaconstruction64@gmail.com"')) return "done";
  const re = /email: "[^"]*",/;
  return re.test(s) ? s.replace(re, () => 'email: "Heptaconstruction64@gmail.com",') : null;
});

// 2. Tap-to-call and tap-to-email links
const links = '<a href={`tel:+${C.whatsapp}`} className="hover:text-[#e6c97a]">{C.phone}</a><br /><a href={`mailto:${C.email}`} className="hover:text-[#e6c97a]">{C.email}</a>';
edit("components/site/sections.tsx", "tap to call and email in contact section", (s) => {
  if (s.includes("mailto:")) return "done";
  const from = "<p>{C.phone}<br />{C.email}</p>";
  return s.includes(from) ? s.replace(from, () => "<p>" + links + "</p>") : null;
});
edit("components/site/chrome.tsx", "tap to call and email in footer", (s) => {
  if (s.includes("mailto:")) return "done";
  const from = "<p>{C.phone} &middot; {C.email}</p>";
  const to = '<p><a href={`tel:+${C.whatsapp}`} className="hover:text-white">{C.phone}</a> &middot; <a href={`mailto:${C.email}`} className="hover:text-white">{C.email}</a></p>';
  return s.includes(from) ? s.replace(from, () => to) : null;
});
