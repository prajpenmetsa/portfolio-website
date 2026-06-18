"use client";

const events = [
  {
    year: "2025",
    title: "HackMIT",
    role: "Winner — Best AI Hack",
    org: "MIT",
    type: "Hackathon",
  },
  {
    year: "2025",
    title: "Google I/O Extended",
    role: "Speaker",
    org: "Google",
    type: "Conference",
  },
  {
    year: "2024",
    title: "NeurIPS",
    role: "Attendee + Poster",
    org: "NeurIPS Foundation",
    type: "Research",
  },
  {
    year: "2024",
    title: "TreeHacks",
    role: "Finalist",
    org: "Stanford",
    type: "Hackathon",
  },
  {
    year: "2024",
    title: "AWS re:Invent",
    role: "Attendee",
    org: "Amazon",
    type: "Conference",
  },
];

export default function Events() {
  return (
    <section id="events" className="px-8 md:px-16 py-24 border-t border-[#E0DED9]">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#888] mb-4">// Timeline</p>
      <h2 className="font-serif text-4xl md:text-6xl mb-16">Events.</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-[#E0DED9]" />

        <div className="space-y-0">
          {events.map((e, i) => (
            <div key={i} className="flex gap-8 items-start group">
              {/* Year */}
              <span className="font-mono text-xs text-[#888] w-14 pt-5 shrink-0">{e.year}</span>

              {/* Dot */}
              <div className="relative pt-5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#E0DED9] group-hover:bg-[#111] transition-colors mt-0.5 relative z-10" />
              </div>

              {/* Content */}
              <div className="flex-1 border-b border-[#E0DED9] py-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl">{e.title}</h3>
                  <p className="font-mono text-xs text-[#888] mt-1">{e.role} · {e.org}</p>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase border border-[#E0DED9] px-3 py-1 text-[#888] self-start md:self-auto">
                  {e.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
