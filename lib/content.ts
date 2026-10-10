// Edit all site content here. Replace the sample text, photos and contact details.
const light = "#f2ead8";

export type Project = {
  slug: string; href: string; name: string; eyebrow: string; title: string; description: string;
  image: string; imageAlt: string; background: string; foreground?: string; location: string;
  area?: string; year?: string; duration?: string; overview?: string; challenge?: string; approach?: string;
  scope?: string[]; materials?: string[]; results?: string[][]; gallery?: string[];
};

export const C = {
  phone: "+91 98855 18959",
  whatsapp: "919885518959",
  email: "Heptaconstruction64@gmail.com",
  address: "Plot No. 57, Street No. 3, Alhasanath Colony, Tolichowki, Hyderabad",
  addresses: [
    { label: "Main branch", text: "Plot No. 57, Street No. 3, Alhasanath Colony, Tolichowki, Hyderabad" },
    { label: "Office", text: "5-167/1/A/1, Ganesh Nagar, Bachupally, opposite Sri Chaitanya IIT Academy, Hyderabad" },
  ],
  heroImages: ["/hero/h1.jpg", "/hero/h2.jpg", "/hero/h3.jpg"],
  services: [
    { name: "Interior Design", image: "/services/interior-design.jpg", text: "Space planning, 3D visuals and detailed drawings for every room." },
    { name: "Turnkey Interiors", image: "/services/turnkey-interiors.jpg", text: "Design, build, furnish and hand over. You get the keys, we do the rest." },
    { name: "Construction", image: "/services/construction.jpg", text: "New builds, extensions and structural work by our own site crew." },
    { name: "Renovation", image: "/services/renovation.jpg", text: "Kitchens, bathrooms or whole homes, planned to keep disruption low." },
    { name: "Custom Furniture", image: "/services/custom-furniture.jpg", text: "Wardrobes, kitchens and wall units made to your measurements." },
    { name: "Project Management", image: "/services/project-management.jpg", text: "Already have a design? We run the site, vendors and schedule." },
  ],
  process: [
    ["Consultation", "Site visit, measurements, needs and budget."],
    ["Concept", "Layouts, mood boards and first 3D views."],
    ["Design and quote", "Working drawings, materials and an itemised quote."],
    ["Build", "Our crew builds, with weekly updates and photos."],
    ["Styling", "Furniture, lighting and a snag-list walkthrough."],
    ["Handover", "Keys, warranties and all documents."],
  ],
  stats: [["30+", "Projects delivered"], ["9+", "Years of experience"], ["45", "In-house craftsmen"], ["98%", "On-time handover"]],
  // Real projects, in the same order as public/work/p1.jpg, p2.jpg ...
  // Optional extras for any project: area, year, duration, overview, challenge, approach,
  // scope (list), materials (list), results ([["16 wks", "Start to handover"]]), gallery (list of image paths).
  // Each section of the project page appears only when it is filled in.
  projects: [
    {
      slug: "gulshan-colony-shaikpet", href: "/projects/gulshan-colony-shaikpet",
      name: "Gulshan Colony, Shaikpet", eyebrow: "Stilt + 3 floors", title: "Gulshan Colony, Shaikpet",
      description: "A stilt + 3 floors building near 7 Tombs, Shaikpet.",
      image: "/work/p1.jpg", imageAlt: "Stilt + 3 floors building at Gulshan Colony, Shaikpet",
      background: "#1e3a8a", foreground: light,
      location: "Gulshan Colony, near 7 Tombs, Shaikpet, Hyderabad 500008",
      overview: "A stilt + 3 floors building at Gulshan Colony, near 7 Tombs, Shaikpet, Hyderabad.",
    },
    {
      slug: "chandulal-baradari-colony-bahadurpura", href: "/projects/chandulal-baradari-colony-bahadurpura",
      name: "Chandulal Baradari Colony, Bahadurpura", eyebrow: "Stilt + 5 floors", title: "Chandulal Baradari Colony, Bahadurpura",
      description: "A stilt + 5 floors building in Bahadurpura.",
      image: "/work/p2.jpg", imageAlt: "Stilt + 5 floors building at Chandulal Baradari Colony, Bahadurpura",
      background: "#5b1a2e", foreground: light,
      location: "Chandulal Baradari Colony, Bahadurpura, Hyderabad 500064",
      overview: "A stilt + 5 floors building at Chandulal Baradari Colony, Bahadurpura, Hyderabad.",
    },
    {
      slug: "bachupally-sri-chaitanya-iit-academy", href: "/projects/bachupally-sri-chaitanya-iit-academy",
      name: "Bachupally, opposite Sri Chaitanya IIT Academy", eyebrow: "Stilt + 3 floors", title: "Bachupally, opp. Sri Chaitanya IIT Academy",
      description: "A stilt + 3 floors building in Bachupally, Ameenpur.",
      image: "/work/p3.jpg", imageAlt: "Stilt + 3 floors building opposite Sri Chaitanya IIT Academy, Bachupally",
      background: "#14506b", foreground: light,
      location: "Bachupally, opposite Sri Chaitanya IIT Academy, Ameenpur, Hyderabad 500049",
      overview: "A stilt + 3 floors building in Bachupally, opposite Sri Chaitanya IIT Academy, Ameenpur, Hyderabad.",
    },
    {
      slug: "bachupally-empire-meadows", href: "/projects/bachupally-empire-meadows",
      name: "Bachupally, opposite Empire Meadows", eyebrow: "Stilt + 3 floors", title: "Bachupally, opp. Empire Meadows",
      description: "A stilt + 3 floors building in Bachupally, Ameenpur.",
      image: "/work/p4.jpg", imageAlt: "Stilt + 3 floors building opposite Empire Meadows, Bachupally",
      background: "#3b2a6e", foreground: light,
      location: "Bachupally, opposite Empire Meadows, Ameenpur, Hyderabad 500049",
      overview: "A stilt + 3 floors building in Bachupally, opposite Empire Meadows, Ameenpur, Hyderabad.",
    },
    {
      slug: "alhasanath-colony-tolichowki", href: "/projects/alhasanath-colony-tolichowki",
      name: "Alhasanath Colony, Tolichowki", eyebrow: "Stilt + 3 floors", title: "Alhasanath Colony, Tolichowki",
      description: "A stilt + 3 floors building in Tolichowki.",
      image: "/work/p5.jpg", imageAlt: "Stilt + 3 floors building at Alhasanath Colony, Tolichowki",
      background: "#0f5c4d", foreground: light,
      location: "Alhasanath Colony, Tolichowki, Hyderabad 500008",
      overview: "A stilt + 3 floors building at Alhasanath Colony, Tolichowki, Hyderabad.",
    },
  ] as Project[],
  testimonials: [
    { quote: "They finished a week early and kept the site clean every evening. The result looks exactly like the render.", name: "Client name", project: "Apartment interior (sample)" },
    { quote: "One team for design and construction meant no finger pointing. We always knew who to call.", name: "Client name", project: "Office fit-out (sample)" },
    { quote: "The quote was itemised and the final bill matched it. That alone made us trust them.", name: "Client name", project: "Villa construction (sample)" },
  ],
};
