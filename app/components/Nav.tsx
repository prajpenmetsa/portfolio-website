"use client";
import { useEffect, useState } from "react";

const links = ["Projects", "Skills", "Contact"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-300 ${
        scrolled ? "bg-[#F8F7F4]/90 backdrop-blur-sm border-b border-[#E0DED9]" : ""
      }`}
    >
      <a href="#" className="font-mono text-xs tracking-[0.2em] uppercase text-[#111]">
        Prajna Penmetsa
      </a>
      <ul className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="font-mono text-xs tracking-[0.15em] uppercase text-[#888] hover:text-[#111] transition-colors duration-200"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="https://github.com"
        className="font-mono text-xs tracking-[0.15em] uppercase border border-[#111] px-4 py-2 hover:bg-[#111] hover:text-[#F8F7F4] transition-all duration-200"
      >
        Github ↗
      </a>
    </nav>
  );
}
