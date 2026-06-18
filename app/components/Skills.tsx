"use client";

const categories = [
  {
    label: "Languages",
    items: ["Python", "C", "C++", "Java", "JavaScript", "SQL", "Bash", "R", "HTML", "CSS"],
  },
  {
    label: "ML / AI",
    items: ["PyTorch", "Transformers", "LoRA", "BERT", "BART", "Longformer", "scikit-learn", "Stable-Baselines3", "Gemini", "LLMs", "Reinforcement Learning (PPO)", "GNNs", "RLHF / GRPO", "Prompt Engineering", "Mechanistic Interpretability", "Causal Analysis", "Event Graphs"],
  },
  {
    label: "Full Stack & Infra",
    items: ["React.js", "Node.js", "Express.js", "MERN", "MongoDB", "PostgreSQL", "Flask", "Next.js", "Streamlit", "Docker", "JWT", "Linux", "Socket Programming"],
  },
  {
    label: "Engineering Practices",
    items: ["API Design", "System Design", "Modular Architecture", "Data Pipelines", "Graph-Based Modeling", "Evaluation", "Benchmarking", "Statistical Methods", "Mixed-Effects Modeling", "Rule-Based Systems", "Technical Writing", "Agile Workflows"],
  },
];

const radarData = [
  { label: "NLP / LLMs", value: 95 },
  { label: "ML Engineering", value: 88 },
  { label: "Systems / OS", value: 80 },
  { label: "Full Stack", value: 82 },
  { label: "Research", value: 93 },
  { label: "Multilingual AI", value: 90 },
];

function RadarChart() {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;
  const n = radarData.length;

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, radius: number) => ({
    x: cx + radius * Math.cos(angle(i)),
    y: cy + radius * Math.sin(angle(i)),
  });

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPath =
    radarData
      .map((d, i) => {
        const { x, y } = pt(i, (d.value / 100) * r);
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ") + "Z";

  return (
    <svg width={size} height={size} className="overflow-visible">
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={radarData
            .map((_, i) => {
              const { x, y } = pt(i, level * r);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
          stroke="#E0DED9"
          strokeWidth="1"
        />
      ))}
      {radarData.map((_, i) => {
        const { x, y } = pt(i, r);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E0DED9" strokeWidth="1" />;
      })}
      <path d={dataPath} fill="#111" fillOpacity="0.08" stroke="#111" strokeWidth="1.5" />
      {radarData.map((d, i) => {
        const { x, y } = pt(i, (d.value / 100) * r);
        return <circle key={i} cx={x} cy={y} r="3" fill="#111" />;
      })}
      {radarData.map((d, i) => {
        const { x, y } = pt(i, r + 24);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fill="#888"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
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

        <div className="flex flex-col items-center">
          <RadarChart />
        </div>
      </div>
    </section>
  );
}
