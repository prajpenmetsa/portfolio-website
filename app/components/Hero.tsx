"use client";
import { useEffect, useState } from "react";
import TerminalWidget from "./TerminalWidget";

const roles = ["SWE.", "AI/ML Eng.", "Builder.", "Researcher."];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section className="min-h-screen px-8 md:px-16 pt-24 pb-10 relative overflow-hidden flex flex-col">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex-1 grid md:grid-cols-2 gap-10 items-stretch">

        {/* LEFT */}
        <div className="flex flex-col justify-center gap-6">
          <h1 className="font-serif text-[clamp(5rem,11vw,10rem)] leading-[0.88] text-[#111]">
            Prajna<br />Penmetsa
          </h1>
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] text-[#111]">
              {displayed}
              <span className="blink">|</span>
            </span>
          </div>
          <p className="font-sans text-lg text-[#555] max-w-lg leading-relaxed">
            Endlessly curious about why language models work the way they do,
            and always chasing the next hard problem. CS + Computational
            Linguistics at IIIT Hyderabad, undergraduate researcher at iREL Lab.
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex flex-col gap-4">
          {/* Photo */}
          <div className="relative">
            <img
              src="/photo3.png"
              alt="Prajna Penmetsa"
              className="w-3/4 mx-auto block object-cover"
            />
          </div>

          {/* Terminal */}
          <div className="mt-4">
            <TerminalWidget />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-6 self-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#888] uppercase">Scroll</p>
        <div className="w-px h-10 bg-gradient-to-b from-[#888] to-transparent" />
      </div>
    </section>
  );
}
