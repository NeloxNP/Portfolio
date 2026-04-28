import React, { useEffect, useRef } from "react";
import { skills } from "../../mock";
import Waves from "./Waves";

const Skills = () => {
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
    <section id="skills" ref={ref} className="relative py-24 md:py-32 bg-[#DCE9F6]/50">
      <Waves variant="top" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl fade-in-up">
          <p className="text-[#9F7CC4] uppercase tracking-[0.25em] text-xs font-medium">
            Section 04
          </p>
          <h2 className="mt-3 font-serif-display text-[#0F2A5E] text-4xl md:text-5xl">
            Mes compétences
          </h2>
          <p className="mt-5 text-[#0F2A5E]/75 text-base leading-relaxed">
            Un éventail polyvalent au croisement du design, du code et de l'audiovisuel.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((s, idx) => (
            <div
              key={s.group}
              className="fade-in-up bg-white/80 backdrop-blur border border-[#0F2A5E]/10 rounded-2xl p-6 hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0F2A5E] text-white grid place-items-center font-serif-display text-sm">
                  {idx + 1}
                </span>
                <h3 className="font-serif-display text-[#0F2A5E] text-xl">{s.group}</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-2.5 text-[#0F2A5E]/80 text-[15px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9F7CC4]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
