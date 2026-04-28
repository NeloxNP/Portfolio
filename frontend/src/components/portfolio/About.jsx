import React, { useEffect, useRef } from "react";
import { about, profile } from "../../mock";
import Waves from "./Waves";

const About = () => {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".fade-in-up") || [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32">
      <Waves variant="top" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 fade-in-up">
          <p className="text-[#9F7CC4] uppercase tracking-[0.25em] text-xs font-medium">
            Section 01
          </p>
          <h2 className="mt-3 font-serif-display text-[#0F2A5E] text-4xl md:text-5xl leading-[1.05]">
            À propos<br />de moi
          </h2>
          <div className="mt-8 inline-block rounded-2xl bg-[#9F7CC4] text-white px-5 py-3 font-serif-display italic text-lg shadow-md">
            {about.greeting}
          </div>
        </div>
        <div className="lg:col-span-7 space-y-5 fade-in-up">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[#0F2A5E]/85 text-lg leading-relaxed font-sans-body"
            >
              {p}
            </p>
          ))}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {about.facts.map((f) => (
              <div
                key={f.label}
                className="bg-white/70 backdrop-blur border border-[#0F2A5E]/10 rounded-xl p-4 hover:bg-white transition-colors"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#0F2A5E]/55">
                  {f.label}
                </div>
                <div className="mt-1 font-serif-display text-[#0F2A5E] text-lg">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
