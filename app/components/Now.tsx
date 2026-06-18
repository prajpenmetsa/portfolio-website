"use client";

export default function Now() {
  return (
    <section className="px-8 md:px-16 py-16 bg-[#111] text-[#F8F7F4]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#666] mb-1">Currently researching</p>
            <p className="font-serif text-2xl">
              Teaching machines to teach. Exploring Socratic tutoring agents and pedagogical AI in the ed-tech space at iREL Lab.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <p className="font-mono text-[10px] tracking-widest uppercase text-[#666]">Last updated</p>
          <p className="font-mono text-sm text-[#aaa]">June 2026</p>
        </div>
      </div>
    </section>
  );
}
