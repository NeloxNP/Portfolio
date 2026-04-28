import React from "react";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import Waves from "./Waves";
import { profile } from "../../mock";

const Hero = () => {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-32 md:pb-44 overflow-hidden">
      <Waves variant="block" />
      {/* soft blue blobs */}
      <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#5885C9]/20 blur-3xl pointer-events-none z-[1]" />
      <div className="absolute top-1/2 -left-24 w-[320px] h-[320px] rounded-full bg-[#9AC0EB]/30 blur-3xl pointer-events-none z-[1]" />

      {/* IUT building backdrop on the right — desaturated, semi-transparent, fading into the background on the left */}
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[62%] md:w-[55%] lg:w-[50%] pointer-events-none overflow-hidden z-[2]">
        <img
          src="https://customer-assets.emergentagent.com/job_my-portfolio-794/artifacts/b70vzpb9_IUT_2026-04-28_14_48_42.165196.webp"
          alt="IUT d'Arles - BUT MMI"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "saturate(0.35) brightness(1.05) contrast(0.95)",
            opacity: 0.62,
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 18%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 18%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,1) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center z-10">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur border border-[#0F2A5E]/10 text-[#0F2A5E]/80 text-xs tracking-wide">
            <Sparkles size={14} className="text-[#5885C9]" />
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

        <div className="hidden lg:block lg:col-span-5 relative h-[420px]">
          <div className="absolute top-6 right-2 px-3 py-1.5 rounded-full bg-[#5885C9] text-white text-xs shadow-md backdrop-blur">
            1ère année
          </div>
          <div className="absolute bottom-10 right-10 px-3 py-1.5 rounded-full bg-white/90 text-[#0F2A5E] text-xs shadow-md border border-[#0F2A5E]/10 backdrop-blur">
            MMI · Arles
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
