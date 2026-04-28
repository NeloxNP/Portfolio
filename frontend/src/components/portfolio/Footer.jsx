import React from "react";
import { Mail, Linkedin, ArrowUp } from "lucide-react";
import { profile } from "../../mock";

const Footer = () => {
  return (
    <footer className="relative bg-[#0F2A5E] text-[#EAF3FB] mt-0">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute -top-1 left-0 w-full h-[80px] md:h-[120px] text-[#0F2A5E]"
      >
        <path
          d="M0,60 C240,10 480,110 720,60 C960,10 1200,100 1440,50 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-10">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="font-serif-display text-3xl md:text-4xl leading-tight">
              Merci&nbsp;!
            </div>
            <p className="mt-3 text-[#EAF3FB]/70 text-sm max-w-xs">
              D'avoir pris le temps de parcourir mon univers. À très vite,
              j'espère&nbsp;!
            </p>
            <div className="mt-6 font-serif-display italic text-2xl text-[#9AC0EB]">
              — {profile.firstName} {profile.lastName}
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#EAF3FB]/55">
              Navigation
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#about" className="link-underline">À propos</a></li>
              <li><a href="#projects" className="link-underline">Projets</a></li>
              <li><a href="#interests" className="link-underline">Intérêts</a></li>
              <li><a href="#skills" className="link-underline">Compétences</a></li>
              <li><a href="#contact" className="link-underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#EAF3FB]/55">
              Me contacter
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2.5 hover:text-[#9AC0EB] transition-colors"
              >
                <Mail size={16} /> {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#9AC0EB] transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
            <a
              href="#top"
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#EAF3FB]/20 text-sm hover:bg-white/5 transition-colors"
            >
              <ArrowUp size={14} /> Retour en haut
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[#EAF3FB]/55">
          <p>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}.
            Tous droits réservés.
          </p>
          <p className="font-serif-display italic">
            Conçu avec passion à Arles.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
