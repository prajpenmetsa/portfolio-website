"use client";
import { useMemo, useState } from "react";

type Star = {
  title: string;
  description: string;
  stack: string[];
  metric: string;
  metricLabel: string;
  link: string;
  x: number;
  y: number;
};

type Constellation = {
  name: string;
  color: string;
  labelPos: { x: number; y: number };
  stars: Star[];
  connections: [number, number][];
};

const CONSTELLATIONS: Constellation[] = [
  {
    name: "AI / ML Research",
    color: "#818cf8",
    labelPos: { x: 70, y: 37 },
    connections: [[0, 1], [1, 2], [2, 3]],
    stars: [
      {
        title: "SAM3 Color-Binding Failures",
        description:
          "Mechanistic interpretability study of attribute-binding hallucinations in Meta's SAM3 segmentation model. Probed presence-token logits and 256-dim hidden states across 675 color-confusion pairs, then used causal visual ablation and activation patching to trace the failure to cross-attention drift onto visual distractors.",
        stack: ["PyTorch", "SAM3", "Mechanistic Interpretability", "Causal Analysis"],
        metric: "75%",
        metricLabel: "hallucinations suppressed via ablation",
        link: "https://github.com/AKR-END/sam3_interp",
        x: 130, y: 81,
      },
      {
        title: "Deep RL Portfolio Optimizer",
        description:
          "PPO agent trained on 7 years of multi-sector equity data with Sortino-based reward and 1,620-dim feature space. Outperformed the S&P 500 benchmark with strong risk-adjusted returns.",
        stack: ["Python", "PyTorch", "Gymnasium", "Stable-Baselines3"],
        metric: "+4.05%",
        metricLabel: "alpha over S&P 500",
        link: "https://github.com/prajpenmetsa/portfolio-optimization-rl",
        x: 220, y: 125,
      },
      {
        title: "Clinical Disease Diagnosis",
        description:
          "End-to-end NLP pipeline predicting diseases from symptoms and generating treatment summaries. MiniBERT + LSTM with hybrid GloVe/BioBERT; abstractive summarization via BART + LoRA.",
        stack: ["BERT", "LSTM", "LoRA", "PyTorch", "BART"],
        metric: "82.3%",
        metricLabel: "accuracy",
        link: "https://github.com/prajpenmetsa/clinical-case-project",
        x: 165, y: 187,
      },
      {
        title: "Subtle Media Bias Detection",
        description:
          "Built a dual-view event graph (factual vs. interpretive) with GNNs and cross-view attention. Trained Longformer extractors on MAVEN-ERE and extracted graphs from BASIL, improving bias detection by 4% and matching state-of-the-art recall.",
        stack: ["GNNs", "Longformer", "Cross-View Attention", "Event Graphs"],
        metric: "0.752",
        metricLabel: "Macro F1 (SOTA recall)",
        link: "https://github.com/Ishaank1805/Media-Bias-Analysis",
        x: 195, y: 235,
      },
    ],
  },
  {
    name: "Linguistics",
    color: "#34d399",
    labelPos: { x: 660, y: 37 },
    connections: [[0, 1]],
    stars: [
      {
        title: "WordNet Expansion",
        description:
          "Expanded WordNet for Hindi and Telugu using multilingual transformers + machine translation. Inferred hypernyms, hyponyms, and meronyms across two low-resource languages.",
        stack: ["MuRIL", "XLM-RoBERTa", "mBERT", "MarianMT"],
        metric: "7.5K+",
        metricLabel: "relations (Hindi)",
        link: "https://github.com/prajpenmetsa/wordnet_expansion",
        x: 690, y: 81,
      },
      {
        title: "Lossy-Context Surprisal & Eye Movement",
        description:
          "Tested whether lossy-context surprisal, a model of word decay over distance, predicts human eye-tracking better than standard surprisal theory. Used GPT-2 over degraded contexts and mixed-effects regression across five eye-movement measures on the ZuCo-1 corpus.",
        stack: ["GPT-2", "Python", "glmmTMB", "EyeLink 1000"],
        metric: "5",
        metricLabel: "eye-movement measures modeled",
        link: "https://github.com/prajpenmetsa/lossy-context-surprisal-for-predicting-eye-movement",
        x: 800, y: 144,
      },
    ],
  },
  {
    name: "Systems",
    color: "#fbbf24",
    labelPos: { x: 70, y: 312 },
    connections: [[0, 1]],
    stars: [
      {
        title: "C Shell",
        description:
          "POSIX-compliant shell with job control, signal handling, and foreground/background execution, built from scratch in C.",
        stack: ["C", "POSIX", "OS"],
        metric: "POSIX",
        metricLabel: "compliant shell",
        link: "https://github.com/prajpenmetsa/c-shell",
        x: 130, y: 356,
      },
      {
        title: "Distributed Network File System",
        description:
          "Distributed file system supporting 6+ concurrent clients with fault-tolerant reads/writes over a custom networking layer.",
        stack: ["C", "Networking", "OS"],
        metric: "6+",
        metricLabel: "concurrent clients",
        link: "https://github.com/prajpenmetsa/distributed-network-file-system",
        x: 230, y: 412,
      },
    ],
  },
  {
    name: "Full Stack / Product",
    color: "#f472b6",
    labelPos: { x: 660, y: 312 },
    connections: [[0, 1], [1, 2], [2, 3]],
    stars: [
      {
        title: "Buy Sell Rent",
        description:
          "MERN stack marketplace for the IIIT Hyderabad community. Dual-role workflows, JWT + CAS auth, OTP-secured delivery pipeline, and a Gemini-Pro AI chatbot for real-time support.",
        stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini"],
        metric: "OTP",
        metricLabel: "secured order pipeline",
        link: "https://github.com/prajpenmetsa/buy-sell-rent",
        x: 690, y: 356,
      },
      {
        title: "Travel Itinerary Pitcher",
        description:
          "Cloud-native travel planner integrating Foursquare Places API + Gemini LLM for personalized day-by-day itineraries with AI-generated quality scores and conversational follow-up.",
        stack: ["Python", "Gemini", "Streamlit", "Foursquare API"],
        metric: "Cloud",
        metricLabel: "native architecture",
        link: "https://github.com/prajpenmetsa/travel-bot",
        x: 800, y: 419,
      },
      {
        title: "DriverPulse",
        description:
          "Built at the Uber She++ Hackathon. Fuses phone accelerometer and cabin audio signals through an Isolation Forest to score per-trip driver stress, surfaced as a composite 0–100 Pulse Score via a Flask API and Next.js dashboard.",
        stack: ["Python", "scikit-learn", "Flask", "Next.js"],
        metric: "Live",
        metricLabel: "deployed, Uber Hackathon",
        link: "https://github.com/prajpenmetsa/driver-pulse-group5",
        x: 745, y: 460,
      },
      {
        title: "PlatePulse",
        description:
          "AI-powered meal tracker for Indian cuisine. Snap a photo of a meal and the app recognizes the dish and extracts nutritional data, drawing from a curated database of 50+ Indian dishes, with daily and weekly visualizations against personalized nutrition goals.",
        stack: ["React", "Flask", "MongoDB", "Vite"],
        metric: "50+",
        metricLabel: "Indian dishes recognized",
        link: "https://github.com/joharatharv/PlatePulse",
        x: 660, y: 480,
      },
    ],
  },
  {
    name: "Civic Tech",
    color: "#60a5fa",
    labelPos: { x: 400, y: 219 },
    connections: [[0, 1]],
    stars: [
      {
        title: "Traffic Management Dashboard",
        description:
          "A single-screen operational dashboard for Madhapur Traffic Police Station, built after on-site fieldwork and officer interviews. Merges live Google Maps congestion data with officer deployment and violation logs, firing automated alerts when thresholds are crossed.",
        stack: ["Google Maps API", "JavaScript", "Real-time Dashboards"],
        metric: "6-8",
        metricLabel: "junctions piloted",
        link: "https://github.com/prajpenmetsa/traffic-management-dashboard",
        x: 460, y: 250,
      },
      {
        title: "Maternal Nutrition Planning Platform",
        description:
          "A platform connecting ASHA workers, mothers, and dieticians on a shared nutrition-planning workflow. Designed a modular pipeline ingesting maternal health profiles and regional diet data to generate structured meal plans, with a rule-based contextual engine encoding gestational stage, dietary constraints, and risk rules for auditable, explainable outputs.",
        stack: ["Python", "Rule-Based Engine", "Maternal Health Data"],
        metric: "Explainable",
        metricLabel: "auditable rule-based outputs",
        link: "https://github.com/BhavyaV05/mothers_nutrition",
        x: 555, y: 305,
      },
    ],
  },
];

type FlatStar = Star & { color: string; constellation: string };

export default function Projects() {
  const flatStars: FlatStar[] = useMemo(
    () =>
      CONSTELLATIONS.flatMap((c) =>
        c.stars.map((s) => ({ ...s, color: c.color, constellation: c.name }))
      ),
    []
  );
  const [selected, setSelected] = useState<FlatStar | null>(null);

  const bgStars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 900,
        y: Math.random() * 500,
        size: 1 + Math.random() * 1.5,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <section id="projects" className="px-8 md:px-16 py-20 relative" style={{ background: "#0a0a14" }}>
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#888] mb-4">// Work</p>
        <h2 className="font-serif text-4xl md:text-6xl text-[#F8F7F4]">A Map of My Work.</h2>
        <p className="font-mono text-xs text-[#666] mt-4 tracking-wide">
          click a star to explore
        </p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto" style={{ aspectRatio: "900/500" }}>
        <svg viewBox="0 0 900 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <style>{`
            @keyframes bgtwinkle {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.9; }
            }
          `}</style>

          {bgStars.map((s) => (
            <circle
              key={s.id}
              cx={s.x}
              cy={s.y}
              r={s.size}
              fill="#ffffff"
              style={{ animation: `bgtwinkle ${2.5 + s.delay}s ease-in-out ${s.delay}s infinite` }}
            />
          ))}

          {CONSTELLATIONS.map((c) =>
            c.connections.map(([a, b], i) => (
              <line
                key={`${c.name}-line-${i}`}
                x1={c.stars[a].x}
                y1={c.stars[a].y}
                x2={c.stars[b].x}
                y2={c.stars[b].y}
                stroke={c.color}
                strokeWidth={1}
                strokeOpacity={0.35}
              />
            ))
          )}

          {CONSTELLATIONS.map((c) => (
            <text
              key={c.name}
              x={c.labelPos.x}
              y={c.labelPos.y}
              fill={c.color}
              fontSize={12}
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              {c.name}
            </text>
          ))}

          {flatStars.map((s, i) => {
            const isActive = selected?.title === s.title;
            return (
              <g key={i} onClick={() => setSelected(s)} style={{ cursor: "pointer" }}>
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={isActive ? 8 : 5.5}
                  fill={s.color}
                  style={{
                    filter: `drop-shadow(0 0 ${isActive ? 14 : 8}px ${s.color})`,
                    transition: "r 0.2s ease",
                  }}
                />
                <circle cx={s.x} cy={s.y} r={16} fill="transparent" />
                <text
                  x={s.x}
                  y={s.y + 18}
                  textAnchor="middle"
                  fill={isActive ? "#F8F7F4" : "#888"}
                  fontSize={9}
                  style={{
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.05em",
                    pointerEvents: "none",
                    transition: "fill 0.2s ease",
                  }}
                >
                  {s.title.length > 26 ? s.title.slice(0, 24) + "…" : s.title}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Popup overlay — appears instantly over the map, no scroll required */}
      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center px-6"
          style={{ zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl p-7"
            style={{
              background: "#111118",
              border: "1px solid rgba(255,255,255,0.1)",
              animation: "popup-in 0.18s ease-out",
            }}
          >
            <style>{`
              @keyframes popup-in {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 font-mono text-xs text-[#666] hover:text-[#F8F7F4] transition-colors"
              style={{ cursor: "pointer" }}
            >
              close ✕
            </button>

            <p
              className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2"
              style={{ color: selected.color }}
            >
              {selected.constellation}
            </p>
            <h3 className="font-serif text-2xl text-[#F8F7F4] mb-3">{selected.title}</h3>
            <p className="font-sans text-sm text-[#aaa] leading-relaxed mb-4">{selected.description}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {selected.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[9px] tracking-widest uppercase border px-2 py-1"
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "#aaa" }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-end justify-between">
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-[0.15em] uppercase border px-4 py-2 transition-colors"
                style={{ borderColor: selected.color, color: selected.color }}
              >
                View on GitHub ↗
              </a>
              <div className="text-right shrink-0">
                <p className="font-mono text-2xl font-bold" style={{ color: selected.color }}>
                  {selected.metric}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#777]">
                  {selected.metricLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
