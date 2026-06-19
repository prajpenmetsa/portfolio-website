"use client";
import { useState, useRef, useEffect } from "react";

const COMMANDS: Record<string, string> = {
  help: "Available: about, skills, projects, research, contact, clear",
  about: "Prajna Penmetsa — CS + CompLing @ IIIT Hyderabad. Researcher at iREL Lab (Prof. Vasudeva Varma). Grew up in Denmark, Singapore, and the USA.",
  skills: "Languages: Python, C, C++, Java, JavaScript, SQL, Bash, R, HTML, CSS\nApplications: PyTorch, Longformer, Gemini, React.js, Node.js, Express.js, MongoDB, PostgreSQL, Flask, Next.js, Streamlit, Docker, GitHub\nFields: Machine Learning, NLP, Reinforcement Learning, Mechanistic Interpretability, GNNs, LoRA Fine-Tuning, RLHF/GRPO, System Design, API Design, Modular Architecture, Data Pipelines, Socket Programming, Linux/OS, Mixed-Effects Modeling, Rule-Based Systems, Technical Writing, Agile Workflows",
  projects: "AI/ML Research: SAM3 Color-Binding Failures, Deep RL Portfolio Optimizer, Clinical Disease Diagnosis, Subtle Media Bias Detection\nLinguistics: WordNet Expansion, Lossy-Context Surprisal & Eye Movement\nSystems: C Shell, Distributed Network File System\nFull Stack / Product: Buy Sell Rent, Travel Itinerary Pitcher, DriverPulse, PlatePulse\nCivic Tech: Traffic Management Dashboard, Maternal Nutrition Planning Platform",
  research: "1. CurioChain — Socratic math tutor, under review EMNLP 2026\n2. LO-RM — GRPO reward model for pedagogical quality (ongoing)\n3. Subtle Media Bias Detection — dual-view event graphs + GNNs",
  contact: "Email: prajnapenmetsa@gmail.com | LinkedIn: /in/prajnapenmetsa | GitHub: prajpenmetsa",
  clear: "__clear__",
};

type Line = { type: "input" | "output"; text: string };

export default function TerminalWidget() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Available commands:" },
    { type: "output", text: "about · skills · projects · research · contact · clear" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    const result = COMMANDS[trimmed];
    if (result === "__clear__") {
      setLines([]);
    } else {
      const output = result ?? `not found: "${trimmed}". Try "help".`;
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
    <div
      className="bg-[#111] text-[#e0e0e0] font-mono text-xs w-full"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#2a2a2a]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[#555] tracking-widest">prajna@portfolio</span>
      </div>
      <div ref={outputRef} className="p-3 h-36 overflow-y-auto">
        {lines.map((l, i) => (
          <div key={i} className={`leading-5 ${l.type === "input" ? "text-[#7dd3fc]" : "text-[#a3e635]"}`}>
            {l.text}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-[#2a2a2a] px-3 py-2">
        <span className="text-[#7dd3fc] mr-2">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none text-[#e0e0e0] caret-[#7dd3fc] text-xs"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
        <span className="blink text-[#7dd3fc]">▋</span>
      </div>
    </div>
  );
}
