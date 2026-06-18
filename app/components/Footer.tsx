"use client";

const socials = [
  { label: "GitHub", href: "https://github.com/prajpenmetsa" },
  { label: "LinkedIn", href: "https://linkedin.com/in/prajnapenmetsa" },
  { label: "Email", href: "mailto:prajnapenmetsa@gmail.com" },
];

export default function Footer() {
  return (
    <footer id="contact" className="px-8 md:px-16 py-16 border-t border-[#E0DED9]">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <h2 className="font-serif text-5xl md:text-7xl mb-4">Let's build<br />something.</h2>
          <a
            href="mailto:prajnapenmetsa@gmail.com"
            className="font-mono text-sm text-[#888] hover:text-[#111] transition-colors border-b border-[#888] hover:border-[#111] pb-0.5"
          >
            prajnapenmetsa@gmail.com
          </a>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-[0.15em] uppercase text-[#888] hover:text-[#111] transition-colors"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] tracking-widest uppercase text-[#ccc]">
            © 2026 Prajna Penmetsa
          </p>
        </div>
      </div>
    </footer>
  );
}
