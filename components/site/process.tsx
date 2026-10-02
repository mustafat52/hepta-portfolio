"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROCESS } from "@/lib/process";

const D = "font-[family-name:var(--font-display)]";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className={`${D} text-xs font-semibold uppercase tracking-widest text-[#d6b25e]`}>{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-base leading-snug text-[#f2ead8]/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6b25e]" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Process() {
  const [i, setI] = useState(0);
  const s = PROCESS[i];
  return (
    <section id="process" className="mx-auto max-w-6xl scroll-mt-16 px-5 pb-28 pt-20">
      <h2 className={`${D} text-4xl font-semibold tracking-tight md:text-6xl`}>How a project runs</h2>
      <p className="mt-3 max-w-2xl text-[#f2ead8]/70">
        Six stages from first visit to handover. Click a stage to see what happens, what you receive and what we need from you.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-col md:overflow-visible md:px-0">
          {PROCESS.map((p, n) => (
            <button
              key={p.title}
              onClick={() => setI(n)}
              aria-current={n === i}
              className={`${D} shrink-0 rounded-xl border px-4 py-3 text-left transition md:shrink ${
                n === i ? "border-[#d6b25e] bg-[#d6b25e] text-[#0b1330]" : "border-[#f2ead8]/15 hover:border-[#d6b25e]"
              }`}
            >
              <span className={`text-xs font-semibold ${n === i ? "text-[#0b1330]" : "text-[#d6b25e]"}`}>
                0{n + 1} &middot; {p.time}
              </span>
              <span className="block text-lg font-semibold">{p.title}</span>
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-[#17234d] p-6 shadow-lg shadow-black/30 md:p-10">
          <div className="h-1 rounded-full bg-[#f2ead8]/10">
            <div className="h-1 rounded-full bg-[#d6b25e] transition-all duration-500" style={{ width: `${((i + 1) / PROCESS.length) * 100}%` }} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <span className={`${D} rounded-full bg-[#d6b25e]/10 px-3 py-1 text-sm font-semibold text-[#d6b25e]`}>{s.time}</span>
              <h3 className={`${D} mt-4 text-3xl font-semibold tracking-tight md:text-4xl`}>{s.title}</h3>
              <p className="mt-4 max-w-2xl">{s.summary}</p>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                <List title="What we do" items={s.doing} />
                <List title="What you get" items={s.getting} />
                <List title="What we need from you" items={s.needing} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
