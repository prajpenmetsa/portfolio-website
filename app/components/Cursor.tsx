"use client";
import { useEffect, useRef, useState } from "react";
import { useStardust } from "./StardustContext";

const COSMIC = ["#c084fc", "#818cf8", "#38bdf8", "#34d399", "#fb7185", "#f472b6", "#fbbf24", "#60a5fa", "#4ade80", "#e879f9"];
const CHARS = ["✦", "✧", "★", "✶", "⋆", "✸"];

type TrailPoint = { x: number; y: number; id: number; ts: number };

type ShowerStar = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  char: string;
};

function StarShower() {
  const [stars] = useState<ShowerStar[]>(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 3 + Math.random() * 3,
      size: 14 + Math.random() * 18,
      color: COSMIC[i % COSMIC.length],
      char: CHARS[i % CHARS.length],
    }))
  );

  return (
    <>
      <style>{`
        @keyframes sf-fall {
          0%   { transform: translateY(-60px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.3; }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9990,
        }}
      >
        {stars.map((s) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: 0,
              fontSize: s.size,
              color: s.color,
              filter: `drop-shadow(0 0 8px ${s.color}) drop-shadow(0 0 16px ${s.color})`,
              animation: `sf-fall ${s.duration}s ${s.delay}s infinite ease-in`,
            }}
          >
            {s.char}
          </div>
        ))}
      </div>
    </>
  );
}

export default function Cursor() {
  const starRef = useRef<HTMLDivElement>(null);
  const { count, showShower } = useStardust();
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (starRef.current) {
        starRef.current.style.left = e.clientX - 24 + "px";
        starRef.current.style.top = e.clientY - 24 + "px";
      }
      if (count >= 5) {
        const id = idRef.current++;
        setTrail((prev) => [...prev.slice(-24), { x: e.clientX, y: e.clientY, id, ts: Date.now() }]);
      }
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => {
        const cutoff = Date.now() - 120;
        return prev.filter((pt) => pt.ts > cutoff);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count < 5) setTrail([]);
  }, [count]);

  return (
    <>
      <div
        ref={starRef}
        style={{
          position: "fixed",
          width: 48,
          height: 48,
          pointerEvents: "none",
          zIndex: 99999,
          backgroundImage: "url('/cursor.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />

      {count >= 5 &&
        trail.map((pt, i) => {
          const progress = i / trail.length;
          const color = count >= 10 ? COSMIC[i % COSMIC.length] : "#fbbf24";
          const size = 5 + progress * 9;
          return (
            <div
              key={pt.id}
              style={{
                position: "fixed",
                left: pt.x,
                top: pt.y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: color,
                opacity: 0.3 + progress * 0.7,
                pointerEvents: "none",
                zIndex: 99998,
                transform: "translate(-50%, -50%)",
                filter: `drop-shadow(0 0 ${4 + progress * 6}px ${color})`,
              }}
            />
          );
        })}

      {showShower && <StarShower />}
    </>
  );
}
