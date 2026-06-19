"use client";

const categories = [
  {
    label: "Languages",
    color: "#fbbf24",
    items: ["Python", "C", "C++", "Java", "JavaScript", "SQL", "Bash", "R", "HTML", "CSS"],
  },
  {
    label: "Applications",
    color: "#34d399",
    items: ["PyTorch", "Longformer", "Gemini", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Flask", "Next.js", "Streamlit", "Docker", "GitHub"],
  },
  {
    label: "Fields",
    color: "#818cf8",
    items: ["Machine Learning", "Natural Language Processing", "Reinforcement Learning", "Mechanistic Interpretability", "Graph Neural Networks", "LoRA Fine-Tuning", "RLHF / GRPO", "System Design", "API Design", "Modular Architecture", "Data Pipelines", "Socket Programming & Networking", "Linux / OS", "Mixed-Effects Modeling", "Rule-Based Systems", "Technical Writing", "Agile Workflows"],
  },
];

function OrbitDiagram() {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const orbitRadii = [60, 95, 130];
  const orbitDurations = [38, 56, 80];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-spin-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
      <svg width={size} height={size} className="absolute inset-0">
        {/* Orbit rings */}
        {orbitRadii.map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={categories[i].color}
            strokeOpacity={0.15}
            strokeWidth={1}
          />
        ))}
        {/* Core */}
        <circle cx={cx} cy={cy} r={6} fill="#111" />
        <circle cx={cx} cy={cy} r={10} fill="#111" opacity={0.15} />
      </svg>

      {categories.map((cat, ci) => (
        <div
          key={cat.label}
          className="absolute inset-0"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: `${ci % 2 === 0 ? "orbit-spin" : "orbit-spin-rev"} ${orbitDurations[ci]}s linear infinite`,
          }}
        >
          {cat.items.map((item, ii) => {
            const angle = (Math.PI * 2 * ii) / cat.items.length;
            const r = orbitRadii[ci];
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            return (
              <div
                key={item}
                title={item}
                className="absolute rounded-full"
                style={{
                  left: x,
                  top: y,
                  width: 6,
                  height: 6,
                  background: cat.color,
                  transform: "translate(-50%, -50%)",
                  boxShadow: `0 0 6px ${cat.color}`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        {categories.map((cat) => (
          <div key={cat.label} className="flex items-center gap-1.5">
            <span
              className="block rounded-full"
              style={{ width: 6, height: 6, background: cat.color, boxShadow: `0 0 4px ${cat.color}` }}
            />
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#888]">{cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 py-24 border-t border-[#E0DED9]">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#888] mb-4">// Capabilities</p>
      <h2 className="font-serif text-4xl md:text-6xl mb-16">Skills.</h2>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.label}>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#888] mb-3">{cat.label}</p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs tracking-widest uppercase border border-[#E0DED9] px-3 py-1.5 text-[#444] hover:border-[#111] hover:text-[#111] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center h-full pb-8">
          <OrbitDiagram />
        </div>
      </div>
    </section>
  );
}
