"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const COSMIC_COLORS = [
  "#c084fc", "#818cf8", "#38bdf8", "#34d399", "#fb7185",
  "#f472b6", "#a78bfa", "#60a5fa", "#fbbf24", "#f87171",
  "#4ade80", "#e879f9", "#22d3ee", "#fb923c", "#a3e635",
];
const CHARS = ["✦", "✧", "★", "✶", "⋆", "✸", "✹", "✺", "✵", "✴"];

export type Particle = {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  color: string;
  char: string;
  size: number;
};

type StardustCtx = {
  count: number;
  particles: Particle[];
  collectParticle: (id: number) => void;
  showShower: boolean;
  showHint: boolean;
  triggerHint: () => void;
};

const Ctx = createContext<StardustCtx>({
  count: 0,
  particles: [],
  collectParticle: () => {},
  showShower: false,
  showHint: false,
  triggerHint: () => {},
});

export function StardustProvider({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [count, setCount] = useState(0);
  const [showShower, setShowShower] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const place = () => {
      const docHeight = document.documentElement.scrollHeight;
      const docWidth = window.innerWidth;
      const total = 15;
      const navH = 120;
      const counterH = 80;
      const usableHeight = docHeight - navH - counterH;
      const zoneH = usableHeight / total;

      const shuffledColors = [...COSMIC_COLORS].sort(() => Math.random() - 0.5);
      const shuffledChars = [...CHARS, ...CHARS].sort(() => Math.random() - 0.5);

      const generated: Particle[] = Array.from({ length: total }, (_, i) => ({
        id: i,
        x: Math.random() * (docWidth * 0.8) + docWidth * 0.1,
        y: navH + i * zoneH + Math.random() * zoneH * 0.8 + zoneH * 0.1,
        collected: false,
        color: shuffledColors[i % shuffledColors.length],
        char: shuffledChars[i % shuffledChars.length],
        size: 22 + Math.random() * 14,
      }));
      setParticles(generated);
    };

    setTimeout(place, 600);
  }, []);

  useEffect(() => {
    if (count >= 15) {
      setShowShower(true);
      setTimeout(() => setShowShower(false), 6500);
    }
  }, [count]);

  const collectParticle = useCallback((id: number) => {
    setParticles((prev) => prev.map((p) => (p.id === id ? { ...p, collected: true } : p)));
    setCount((prev) => prev + 1);
  }, []);

  const triggerHint = useCallback(() => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  }, []);

  return (
    <Ctx.Provider value={{ count, particles, collectParticle, showShower, showHint, triggerHint }}>
      {children}
    </Ctx.Provider>
  );
}

export const useStardust = () => useContext(Ctx);
