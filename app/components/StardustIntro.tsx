"use client";
import { useEffect, useState } from "react";

export default function StardustIntro() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(show);
  }, []);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => setDismissed(true), 1000);
  };

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 99990,
        textAlign: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 1s ease",
      }}
    >
      <div
        style={{
          background: "rgba(17,17,17,0.88)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "28px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span style={{ fontSize: 28, filter: "drop-shadow(0 0 10px #c084fc)" }}>✦</span>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            margin: 0,
          }}
        >
          stardust is hidden across this page
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c084fc",
            margin: 0,
            filter: "drop-shadow(0 0 6px #c084fc)",
          }}
        >
          move your star cursor over them to collect
        </p>
        <button
          onClick={dismiss}
          style={{
            marginTop: 4,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#111",
            background: "#fff",
            border: "none",
            padding: "8px 24px",
            cursor: "pointer",
          }}
        >
          okay
        </button>
      </div>
    </div>
  );
}
