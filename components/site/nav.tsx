"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/site/chrome";

const D = "font-[family-name:var(--font-display)]";
const links = [["About", "/about"], ["Services", "/services"], ["Work", "/projects"], ["Process", "/process"], ["Reviews", "/reviews"]];

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  const on = (h: string) => path === h || path.startsWith(h + "/");
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#f2ead8]/10 bg-[#0b1330]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/"><Wordmark light /></Link>
        <nav className={`${D} hidden gap-8 text-sm font-medium md:flex`}>
          {links.map(([n, h]) => (
            <Link key={h} href={h} className={`relative py-1 transition ${on(h) ? "text-[#e6c97a]" : "text-[#f2ead8]/75 hover:text-[#e6c97a]"}`}>
              {n}
              {on(h) && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#d6b25e]" />}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className={`${D} hidden rounded-full bg-[#d6b25e] px-5 py-2 text-sm font-semibold text-[#0b1330] transition hover:bg-[#e6c97a] sm:inline-block`}>Start a project</Link>
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className={`${D} rounded-full border border-[#f2ead8]/25 px-5 py-2 text-sm font-semibold md:hidden`}>{open ? "Close" : "Menu"}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className={`${D} overflow-hidden border-t border-[#f2ead8]/10 bg-[#0b1330] md:hidden`}>
            <div className="flex flex-col px-5 py-3">
              {links.map(([n, h], i) => (
                <motion.div key={h} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <Link href={h} className={`block border-b border-[#f2ead8]/10 py-4 text-xl font-semibold ${on(h) ? "text-[#e6c97a]" : ""}`}>{n}</Link>
                </motion.div>
              ))}
              <Link href="/contact" className="mb-3 mt-5 rounded-full bg-[#d6b25e] py-3.5 text-center font-semibold text-[#0b1330]">Start a project</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
