"use client";

const posts = [
  {
    date: "Jun 2025",
    title: "How I built a semantic search engine from scratch",
    summary: "FAISS, sentence embeddings, and lessons from hitting 1M vectors in production.",
    readTime: "8 min",
    tag: "ML Engineering",
  },
  {
    date: "Apr 2025",
    title: "Understanding the Raft consensus algorithm",
    summary: "A bottom-up walkthrough of leader election, log replication, and why distributed systems are hard.",
    readTime: "12 min",
    tag: "Systems",
  },
  {
    date: "Feb 2025",
    title: "Backpropagation from first principles",
    summary: "Building an autograd engine teaches you more about deep learning than any tutorial.",
    readTime: "10 min",
    tag: "Research",
  },
];

export default function Writing() {
  return (
    <section id="writing" className="px-8 md:px-16 py-24 border-t border-[#E0DED9]">
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#888] mb-4">// Writing</p>
      <h2 className="font-serif text-4xl md:text-6xl mb-16">Thinking out loud.</h2>

      <div className="grid md:grid-cols-3 gap-px bg-[#E0DED9]">
        {posts.map((p, i) => (
          <a
            key={i}
            href="#"
            className="bg-[#F8F7F4] p-8 flex flex-col gap-4 group hover:bg-[#111] transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#888] group-hover:text-[#555]">{p.tag}</span>
              <span className="font-mono text-[10px] text-[#888] group-hover:text-[#555]">{p.readTime}</span>
            </div>
            <h3 className="font-serif text-xl leading-snug group-hover:text-[#F8F7F4]">{p.title}</h3>
            <p className="font-sans text-sm text-[#555] group-hover:text-[#bbb] leading-relaxed flex-1">{p.summary}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E0DED9] group-hover:border-[#333]">
              <span className="font-mono text-[10px] text-[#888] group-hover:text-[#666]">{p.date}</span>
              <span className="text-sm group-hover:text-[#F8F7F4] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
