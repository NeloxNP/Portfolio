import React from "react";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import Waves from "./Waves";
import { profile } from "../../mock";

const Hero = () => {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-32 md:pb-44 overflow-hidden">
      <Waves variant="block" />
      {/* soft pink blob */}
      <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#C88AA0]/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-[320px] h-[320px] rounded-full bg-[#5885C9]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur border border-[#0F2A5E]/10 text-[#0F2A5E]/80 text-xs tracking-wide">
            <Sparkles size={14} className="text-[#C88AA0]" />
            {profile.available}
          </div>

          <h1 className="mt-6 font-serif-display text-[#0F2A5E] leading-[1.02] text-5xl sm:text-6xl md:text-7xl lg:text-[88px]">
            Portfolio
            <span className="block font-sans-body font-medium text-[#5885C9] text-2xl md:text-3xl lg:text-4xl tracking-wide mt-3">
              {profile.firstName} {profile.lastName}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-[#0F2A5E]/80 text-lg leading-relaxed">
            {profile.tagline} {profile.title}, je raconte des histoires à
            travers l'image, le son et le code.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F2A5E] text-[#EAF3FB] text-sm font-medium hover:bg-[#1A3B7C] transition-colors"
            >
              Voir mes projets
              <ArrowDown size={16} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0F2A5E]/25 text-[#0F2A5E] text-sm font-medium hover:bg-white/60 transition-colors"
            >
              En savoir plus sur moi
            </a>
          </div>

          <div className="mt-10 flex items-center gap-2 text-[#0F2A5E]/70 text-sm">
            <MapPin size={16} />
            <span>{profile.location}</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C9DEF6] to-[#9AC0EB] blur-2xl opacity-70" />
            <div className="relative w-full h-full rounded-full bg-white/70 backdrop-blur border border-white/80 shadow-xl grid place-items-center float-slow">
              <span className="font-serif-display text-[#0F2A5E] text-[110px] md:text-[150px] leading-none">
                {profile.initials}
              </span>
            </div>
            {/* small accents */}
            <div className="absolute -top-4 -right-2 px-3 py-1.5 rounded-full bg-[#C88AA0] text-white text-xs shadow-md">
              1ère année
            </div>
            <div className="absolute -bottom-2 -left-4 px-3 py-1.5 rounded-full bg-white text-[#0F2A5E] text-xs shadow-md border border-[#0F2A5E]/10">
              MMI · Arles
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-0 grid place-items-center text-[#0F2A5E]/60 scroll-indicator z-10">
        <ArrowDown size={18} />
      </div>
    </section>
  );
};

export default Hero;
