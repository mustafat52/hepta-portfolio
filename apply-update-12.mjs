// Run from the project root (the "web" folder): node apply-update-12.mjs
import fs from "fs";

const cf = "lib/content.ts";
if (!fs.existsSync(cf)) {
  console.log("MISSING      " + cf);
} else {
  let s = fs.readFileSync(cf, "utf8");
  const end = "  ] as Project[],";
  const entry = `    {
      slug: "alhasanath-colony-tolichowki", href: "/projects/alhasanath-colony-tolichowki",
      name: "Alhasanath Colony, Tolichowki", eyebrow: "Stilt + 3 floors", title: "Alhasanath Colony, Tolichowki",
      description: "A stilt + 3 floors building in Tolichowki.",
      image: "/work/p5.jpg", imageAlt: "Stilt + 3 floors building at Alhasanath Colony, Tolichowki",
      background: "#0f5c4d", foreground: light,
      location: "Alhasanath Colony, Tolichowki, Hyderabad 500008",
      overview: "A stilt + 3 floors building at Alhasanath Colony, Tolichowki, Hyderabad.",
    },
`;
  if (s.includes("alhasanath-colony-tolichowki")) console.log("already done  fifth project");
  else if (s.includes(end)) {
    s = s.replace(end, () => entry + end);
    fs.writeFileSync(cf, s);
    console.log("patched       fifth project added");
  } else console.log("NOT FOUND     projects list end (run apply-update-11.mjs first, or send me lib/content.ts)");
}
