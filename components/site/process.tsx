"use client";
import { HoverTransition, type HoverTransitionProps } from "@/components/ui/hover-transition";
import { PROCESS } from "@/lib/process";

const D = "font-[family-name:var(--font-display)]";
type Stage = (typeof PROCESS)[number];

// A different reveal effect and direction for each stage card.
const FX: HoverTransitionProps["effect"][] = ["wipe", "curtain", "ripple", "diagonal", "strips", "morph"];
const DIR: HoverTransitionProps["direction"][] = ["right", "bottom", "center", "top-left", "left", "bottom-right"];

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5 first:mt-0">
      <h4 className={`${D} text-xs font-bold uppercase tracking-widest opacity-70`}>{title}</h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5 text-[15px] leading-snug">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Details({ s }: { s: Stage }) {
  return (
    <div className="p-6 sm:p-8">
      <h3 className={`${D} mb-5 text-2xl font-semibold tracking-tight`}>{s.title}</h3>
      <Block title="What we do" items={s.doing} />
      <Block title="What you get" items={s.getting} />
      <Block title="What we need from you" items={s.needing} />
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative z-10 mx-auto max-w-6xl scroll-mt-16 px-5 pb-28 pt-20">
      <h2 className={`${D} text-4xl font-semibold tracking-tight md:text-6xl`}>How a project runs</h2>
      <p className="mt-3 max-w-2xl text-[#f2ead8]/70">
        Six stages from first visit to handover. Hover over a stage, or tap it on a phone, to see what we do, what you get and what we need from you.
      </p>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {PROCESS.map((s, i) => (
          <HoverTransition
            key={s.title}
            effect={FX[i % FX.length]}
            direction={DIR[i % DIR.length]}
            label={s.title}
            className="rounded-2xl"
            defaultComponent={
              <div className="relative h-full bg-[#17234d] text-[#f2ead8]">
                {/* invisible copy of the details sizes the card, so nothing is ever cut off */}
                <div aria-hidden="true" className="invisible"><Details s={s} /></div>
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`${D} text-7xl font-extrabold leading-none text-[#d6b25e]`}>0{i + 1}</span>
                    <span className={`${D} rounded-full bg-[#d6b25e]/15 px-3 py-1 text-sm font-semibold text-[#e6c97a]`}>{s.time}</span>
                  </div>
                  <div>
                    <h3 className={`${D} text-3xl font-semibold tracking-tight`}>{s.title}</h3>
                    <p className="mt-3 text-[#f2ead8]/75">{s.summary}</p>
                    <p className={`${D} mt-5 text-sm font-semibold text-[#e6c97a]`}>
                      <span className="hidden md:inline">Hover</span><span className="md:hidden">Tap</span> to see the details &rarr;
                    </p>
                  </div>
                </div>
              </div>
            }
            hoverComponent={<div className="h-full bg-[#d6b25e] text-[#0b1330]"><Details s={s} /></div>}
          />
        ))}
      </div>
    </section>
  );
}
