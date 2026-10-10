"use client";
import { motion } from "framer-motion";
import { C } from "@/lib/content";
import { Count, Reveal } from "@/components/site/page-kit";

const D = "font-[family-name:var(--font-display)]";
// Sample one-line notes under each number. Edit to match Hepta's real facts.
const NOTES = [
  "Homes, offices, shops and cafes",
  "Designing and building since 2017",
  "Carpenters, electricians and site engineers",
  "Handed over on or before the agreed date",
];

export function Stats() {
  return (
    <div className="relative mt-14 overflow-hidden rounded-3xl border border-[#d6b25e]/25">
      <motion.div
        className="absolute inset-x-0 top-0 z-10 h-px origin-left bg-gradient-to-r from-transparent via-[#e6c97a] to-transparent"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
      />
      <div className="grid grid-cols-2 gap-px bg-[#d6b25e]/20 md:grid-cols-4">
        {C.stats.map(([n, l], i) => (
          <Reveal key={l} delay={i * 0.1} className="bg-[#101a40] p-5 transition-colors hover:bg-[#162452] sm:p-8 md:p-10">
            <b className={`${D} block bg-gradient-to-b from-[#f3dc9b] to-[#c9a24b] bg-clip-text text-4xl font-extrabold text-transparent sm:text-6xl md:text-7xl`}>
              <Count to={parseInt(n)} suffix={n.replace(/[0-9]/g, "")} />
            </b>
            <p className={`${D} mt-3 text-base font-semibold sm:mt-4 sm:text-lg`}>{l}</p>
            <p className="mt-1 text-sm text-[#f2ead8]/60">{NOTES[i]}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
