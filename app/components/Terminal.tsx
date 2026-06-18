"use client";
import { useState, useRef, useEffect } from "react";

const COMMANDS: Record<string, string> = {
  help: "Available: about, skills, projects, contact, clear",
  about: "Prajna Penmetsa — SWE & AI/ML Engineer. CS student building at the intersection of systems and intelligence.",
  skills: "Python · PyTorch · TypeScript · Rust · Go · AWS · GCP · Kubernetes · LangChain · HuggingFace · SQL · Redis",
  projects: "1. NeuralSearch — semantic search engine w/ FAISS\n2. AutoGrad — custom autodiff engine in Python\n3. DistributedKV — Raft-based key-value store in Go",
  contact: "Email: prajna@example.com | LinkedIn: /in/prajna | GitHub: /prajna",
  clear: "__clear__",
};

type Line = { type: "input" | "output"; text: string };

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    const result = COMMANDS[trimmed];

    if (result === "__clear__") {
      setLines([]);
    } else {
      const output = result ?? `Command not found: ${trimmed}. Type "help".`;
      setLines((l) => [
        ...l,
        { type: "input", text: `$ ${cmd}` },
        ...output.split("\n").map((t) => ({ type: "output" as const, text: t })),
      ]);
    }
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); return; }
    if (e.key === "ArrowUp") {
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return (
    <section id="terminal" className="px-8 md:px-16 py-24 border-t border-[#E0DED9]">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#888] mb-4">// Interactive</p>
      <h2 className="font-serif text-4xl md:text-5xl mb-10">Talk to my portfolio.</h2>

      <div
        className="bg-[#111] text-[#e0e0e0] font-mono text-sm rounded-none max-w-2xl"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#333]">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-4 text-[#666] text-xs tracking-widest">prajna@portfolio ~ </span>
        </div>

        {/* Output */}
        <div className="p-4 min-h-48 max-h-72 overflow-y-auto">
          {lines.map((l, i) => (
            <div key={i} className={`leading-6 ${l.type === "input" ? "text-[#7dd3fc]" : "text-[#a3e635]"}`}>
              {l.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center border-t border-[#333] px-4 py-3">
          <span className="text-[#7dd3fc] mr-2">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none text-[#e0e0e0] caret-[#7dd3fc]"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
          <span className="blink text-[#7dd3fc]">▋</span>
        </div>
      </div>
    </section>
  );
}
