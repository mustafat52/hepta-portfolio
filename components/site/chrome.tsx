import Link from "next/link";
import { C } from "@/lib/content";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.35em] ${light ? "text-white" : "text-[#f2ead8]"}`}>
      HEPT<span className="text-[#d6b25e]">A</span>
    </span>
  );
}

const links = [["About", "/#about"], ["Services", "/#services"], ["Work", "/#work"], ["Process", "/#process"], ["Reviews", "/#reviews"]];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1330]/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/"><Wordmark light /></Link>
        <nav className="hidden gap-7 font-[family-name:var(--font-display)] text-sm font-medium text-white/80 md:flex">
          {links.map(([n, h]) => <Link key={h} href={h} className="transition hover:text-[#e6c97a]">{n}</Link>)}
        </nav>
        <Link href="/#contact" className="rounded-full bg-[#d6b25e] px-5 py-2 font-[family-name:var(--font-display)] text-sm font-semibold text-[#0b1330] transition hover:bg-[#e6c97a]">Start a project</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#070c20] px-5 py-10 text-sm text-white/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Wordmark light />
        <p>{C.phone} &middot; {C.email}</p>
        <p>&copy; 2026 Hepta Constructions &amp; Interiors</p>
      </div>
    </footer>
  );
}
