import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/site/chrome";
import { Nav } from "@/components/site/nav";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif" });

export const viewport = { themeColor: "#0b1330" };

export const metadata: Metadata = {
  title: "Hepta Constructions & Interiors",
  description: "Interior design, construction and turnkey fit-outs under one roof.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${serif.variable} bg-[#0b1330] font-[family-name:var(--font-serif)] text-lg text-[#f2ead8] overflow-x-clip antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
