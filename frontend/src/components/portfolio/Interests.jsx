import React, { useEffect, useRef } from "react";
import { interests } from "../../mock";
import { Film, Gamepad2, Globe2, Trophy, Camera, Plane } from "lucide-react";

const iconMap = { Film, Gamepad2, Globe2, Trophy, Camera, Plane };

const Interests = () => {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".fade-in-up") || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="interests" ref={ref} className="relative py-24 md:py-32 bg-[#E8CEDC]/55">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 fade-in-up">
          <div>
            <h2 className="font-serif-display text-[#0F2A5E] text-4xl md:text-5xl">
              Mes intérêts
            </h2>
          </div>
          <p className="max-w-lg text-[#0F2A5E]/75 text-base leading-relaxed">
            Ce qui me nourrit, m'inspire et me fait sortir des sentiers battus.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {interests.map((it, i) => {
            const Icon = iconMap[it.icon] || Film;
            const accent = i % 3 === 0 ? "#C88AA0" : i % 3 === 1 ? "#5885C9" : "#0F2A5E";
            return (
              <div
                key={it.title}
                className="fade-in-up group relative overflow-hidden rounded-2xl border border-[#0F2A5E]/10 bg-white/75 backdrop-blur p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              >
                <div
                  className="absolute -right-10 -top-10 w-36 h-36 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundColor: accent }}
                />
                <div
                  className="relative w-12 h-12 rounded-xl grid place-items-center text-white"
                  style={{ backgroundColor: accent }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="relative mt-5 font-serif-display text-[#0F2A5E] text-xl">
                  {it.title}
                </h3>
                <p className="relative mt-2 text-[#0F2A5E]/75 text-[15px] leading-relaxed">
                  {it.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Interests;
