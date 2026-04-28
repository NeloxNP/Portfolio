import React, { useEffect, useState } from "react";
import { navLinks, profile } from "../../mock";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#EAF3FB]/85 backdrop-blur border-b border-[#0F2A5E]/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="w-9 h-9 rounded-full bg-[#0F2A5E] text-[#EAF3FB] grid place-items-center font-serif-display text-base shadow-sm">
            {profile.initials}
          </span>
          <span className="font-serif-display text-[#0F2A5E] text-lg md:text-xl group-hover:text-[#5885C9] transition-colors">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-[#0F2A5E]/80 hover:text-[#0F2A5E] text-sm tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex btn-shine items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F2A5E] text-[#EAF3FB] text-sm font-medium hover:bg-[#1A3B7C] transition-colors"
        >
          Travailler ensemble
        </a>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md text-[#0F2A5E]"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#EAF3FB] border-t border-[#0F2A5E]/10">
          <ul className="px-6 py-4 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-[#0F2A5E] py-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block px-5 py-2.5 rounded-full bg-[#0F2A5E] text-[#EAF3FB] text-sm"
              >
                Travailler ensemble
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
