// Run from the project root (the "web" folder): node apply-update-13.mjs
import fs from "fs";

function edit(file, label, test, apply) {
  if (!fs.existsSync(file)) return console.log("MISSING      " + file);
  const s = fs.readFileSync(file, "utf8");
  const r = apply(s);
  if (r === "done") return console.log("already done ", label);
  if (r === null) return console.log("NOT FOUND    ", label);
  fs.writeFileSync(file, r);
  console.log("patched      ", label);
}

// 1. The two real addresses
edit("lib/content.ts", "addresses in content", null, (s) => {
  if (s.includes("addresses:")) return "done";
  const re = /address: "[^"]*",/;
  if (!re.test(s)) return null;
  const block = `address: "Plot No. 57, Street No. 3, Alhasanath Colony, Tolichowki, Hyderabad",
  addresses: [
    { label: "Main branch", text: "Plot No. 57, Street No. 3, Alhasanath Colony, Tolichowki, Hyderabad" },
    { label: "Office", text: "5-167/1/A/1, Ganesh Nagar, Bachupally, opposite Sri Chaitanya IIT Academy, Hyderabad" },
  ],`;
  return s.replace(re, () => block);
});

// 2. Contact section: both addresses with map links
edit("components/site/sections.tsx", "addresses on contact section", null, (s) => {
  if (s.includes("C.addresses.map")) return "done";
  const re = /<p className="mt-8">\{C\.phone\}<br \/>\{C\.email\}<br \/>\{C\.address\}<\/p>/;
  if (!re.test(s)) return null;
  const jsx = `<div className="mt-8 space-y-5">
              <p>{C.phone}<br />{C.email}</p>
              {C.addresses.map((a) => (
                <div key={a.label}>
                  <b className={\`\${D} text-sm uppercase tracking-widest text-[#e6c97a]\`}>{a.label}</b>
                  <p>{a.text}</p>
                  <a href={\`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(a.text)}\`} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 hover:text-[#e6c97a]">View on map</a>
                </div>
              ))}
            </div>`;
  return s.replace(re, () => jsx);
});

// 3. Footer: both addresses
edit("components/site/chrome.tsx", "addresses in footer", null, (s) => {
  if (s.includes("C.addresses.map")) return "done";
  const from = "<p>{C.phone} &middot; {C.email}</p>";
  if (!s.includes(from)) return null;
  const jsx = `<div className="space-y-1">
          <p>{C.phone} &middot; {C.email}</p>
          {C.addresses.map((a) => <p key={a.label}><b className="text-white/90">{a.label}:</b> {a.text}</p>)}
        </div>`;
  return s.replace(from, () => jsx);
});
