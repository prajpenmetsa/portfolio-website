"use client";
import { useStardust } from "./StardustContext";

const MILESTONE_LABELS = ["shooting star", "cosmic mode", "stardust mastery"];
const MILESTONE_COLORS = ["#fbbf24", "#818cf8", "#e879f9"];

export default function StardustCounter() {
  const { count, triggerHint, particles } = useStardust();
  const milestone = count >= 15 ? 2 : count >= 10 ? 1 : count >= 5 ? 0 : -1;
  const uncollected = particles.filter((p) => !p.collected).length;

  return (
    <div
      className="fixed z-50 flex flex-col items-center gap-1.5"
      style={{ bottom: 24, left: "50%", transform: "translateX(-50%)" }}
    >
      {milestone >= 0 && (
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 8,
            letterSpacing: "0.25em",
            color: MILESTONE_COLORS[milestone],
            filter: `drop-shadow(0 0 6px ${MILESTONE_COLORS[milestone]})`,
            animation: "stardust-pulse 2s ease-in-out infinite",
          }}
        >
          {MILESTONE_LABELS[milestone]} unlocked
        </span>
      )}

      <div className="flex flex-col items-center gap-1.5">

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{
              background: "rgba(17,17,17,0.75)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            {[0, 1, 2].map((group) => (
              <div key={group} className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => {
                  const idx = group * 5 + i;
                  const filled = idx < count;
                  const groupColor = MILESTONE_COLORS[group];
                  return (
                    <span
                      key={i}
                      style={{
                        fontSize: 12,
                        transition: "all 0.4s",
                        color: filled ? groupColor : "rgba(255,255,255,0.15)",
                        filter: filled ? `drop-shadow(0 0 5px ${groupColor})` : "none",
                        animation: filled && count >= (group + 1) * 5
                          ? "stardust-pulse 1.5s ease-in-out infinite"
                          : "none",
                        animationDelay: `${i * 0.12}s`,
                      }}
                    >
                      ✦
                    </span>
                  );
                })}
                {group < 2 && (
                  <span style={{ color: "rgba(255,255,255,0.1)", fontSize: 10, margin: "0 3px" }}>·</span>
                )}
              </div>
            ))}
            <span
              className="font-mono ml-2"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}
            >
              {count}/15
            </span>
          </div>

          {uncollected > 0 && uncollected <= 3 && (
            <button
              onClick={triggerHint}
              style={{
                background: "rgba(17,17,17,0.75)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                padding: "6px 10px",
                cursor: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color = "#fbbf24";
                (e.target as HTMLButtonElement).style.borderColor = "#fbbf24";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              hint ✦
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
