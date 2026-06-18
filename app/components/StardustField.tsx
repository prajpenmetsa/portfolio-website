"use client";
import { useEffect, useRef, useState } from "react";
import { useStardust } from "./StardustContext";

export default function StardustField() {
  const { particles, collectParticle, showHint } = useStardust();
  const collectedRef = useRef(new Set<number>());
  const [popping, setPopping] = useState<Set<number>>(new Set());

  // Scroll to first uncollected particle when hint fires
  useEffect(() => {
    if (!showHint) return;
    const uncollected = particles.filter((p) => !p.collected);
    if (uncollected.length === 0) return;
    const target = uncollected[0];
    window.scrollTo({ top: target.y - window.innerHeight / 2, behavior: "smooth" });
  }, [showHint, particles]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY + window.scrollY;
      particles.forEach((p) => {
        if (collectedRef.current.has(p.id) || p.collected) return;
        const dist = Math.sqrt((cx - p.x) ** 2 + (cy - p.y) ** 2);
        if (dist < 30) {
          collectedRef.current.add(p.id);
          setPopping((prev) => new Set(prev).add(p.id));
          collectParticle(p.id);
          setTimeout(() => {
            setPopping((prev) => {
              const next = new Set(prev);
              next.delete(p.id);
              return next;
            });
          }, 500);
        }
      });
    };
    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, [particles, collectParticle]);

  return (
    <>
      <style>{`
        @keyframes stardust-pulse {
          0%, 100% { box-shadow: 0 0 0 0 currentColor; transform: translate(-50%, -50%) scale(1); }
          50% { box-shadow: 0 0 0 20px transparent; transform: translate(-50%, -50%) scale(1.8); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40 }}>
        {particles.map((p) => {
          if (p.collected && !popping.has(p.id)) return null;
          const isHinted = showHint && !p.collected;
          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)",
                animation: popping.has(p.id)
                  ? "stardust-collect 0.5s ease-out forwards"
                  : "stardust-twinkle 2.5s ease-in-out infinite",
                animationDelay: popping.has(p.id) ? "0s" : `${(p.id * 0.41) % 2}s`,
              }}
            >
              <span
                style={{
                  fontSize: isHinted ? p.size * 2 : p.size,
                  color: p.color,
                  filter: isHinted
                    ? `drop-shadow(0 0 16px ${p.color}) drop-shadow(0 0 32px ${p.color}) drop-shadow(0 0 48px ${p.color})`
                    : `drop-shadow(0 0 6px ${p.color}) drop-shadow(0 0 14px ${p.color})`,
                  display: "block",
                  transition: "font-size 0.3s ease, filter 0.3s ease",
                }}
              >
                {p.char}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
