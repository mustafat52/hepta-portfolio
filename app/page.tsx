import { CaseStudyFlipStack } from "@/components/ui/case-study-flip-stack";
import { Hero, About, Services, Contact } from "@/components/site/sections";
import { Reviews } from "@/components/site/reviews";
import { Process } from "@/components/site/process";
import { C } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <div id="work" className="scroll-mt-16">
        <div className="mx-auto max-w-6xl px-5 pb-10">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-6xl">Our work</h2>
          <p className="mt-3 max-w-xl text-[#f2ead8]/70">Projects we have built across Hyderabad. Click any card for details and the location on the map.</p>
        </div>
        <CaseStudyFlipStack items={C.projects} className="bg-[#0b1330] text-[#f2ead8] -mb-[12vh]" />
      </div>
      <Process />
      <Reviews />
      <Contact />
    </>
  );
}
