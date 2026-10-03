import type { Metadata } from "next";
import { PageHero, ProjectGrid, Cta } from "@/components/site/page-kit";

export const metadata: Metadata = { title: "Projects | Hepta Constructions & Interiors" };

export default function Projects() {
  return (
    <main>
      <PageHero eyebrow="Our work" title="Projects we have designed and built" intro="Buildings we have built across Hyderabad. Open a project to see where it is and its details." />
      <section className="mx-auto max-w-6xl px-5 py-16"><ProjectGrid /></section>
      <Cta title="Want yours to be next?" />
    </main>
  );
}
