import type { Metadata } from "next";
import { PageHero, ProjectGrid, Cta } from "@/components/site/page-kit";

export const metadata: Metadata = { title: "Projects | Hepta Constructions & Interiors" };

export default function Projects() {
  return (
    <main>
      <PageHero eyebrow="Our work" title="Projects we have designed and built" intro="Homes, offices, shops and cafes. Open any project to see the scope, materials, timeline and results." />
      <section className="mx-auto max-w-6xl px-5 py-16"><ProjectGrid /></section>
      <Cta title="Want yours to be next?" />
    </main>
  );
}
