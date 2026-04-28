import React, { useEffect, useRef, useState } from "react";
import { projects } from "../../mock";
import { ArrowUpRight } from "lucide-react";
import Waves from "./Waves";
import ProjectModal from "./ProjectModal";

const accentMap = {
  rose: { bg: "bg-[#7BA7D9]", soft: "bg-[#7BA7D9]/15", text: "text-[#7BA7D9]" },
  blue: { bg: "bg-[#5885C9]", soft: "bg-[#5885C9]/15", text: "text-[#5885C9]" },
  blueDeep: { bg: "bg-[#0F2A5E]", soft: "bg-[#0F2A5E]/10", text: "text-[#0F2A5E]" },
};

const ProjectCard = ({ p, index, onOpen }) => {
  const a = accentMap[p.accent] || accentMap.blue;
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    if (p.media?.type === "external") {
      window.open(p.media.url, "_blank", "noopener,noreferrer");
      return;
    }
    onOpen(p);
  };

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className="group fade-in-up relative bg-white/80 backdrop-blur border border-[#0F2A5E]/10 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5885C9]/40"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      aria-label={`Découvrir le projet ${p.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`w-10 h-10 rounded-full grid place-items-center ${a.soft} ${a.text} font-serif-display text-base`}
          >
            0{index + 1}
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#0F2A5E]/55">
              {p.category}
            </p>
            <p className="text-[11px] text-[#0F2A5E]/45">{p.year}</p>
          </div>
        </div>
        <span
          className={`w-9 h-9 rounded-full grid place-items-center bg-[#0F2A5E] text-white transition-transform duration-300 ${
            hover ? "rotate-45" : ""
          }`}
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      <h3 className="mt-6 font-serif-display text-[#0F2A5E] text-2xl md:text-3xl leading-tight">
        {p.title}
      </h3>
      <p className={`mt-2 text-sm md:text-base font-medium ${a.text}`}>
        {p.subtitle}
      </p>
      <p className="mt-4 text-[#0F2A5E]/75 text-[15px] leading-relaxed">
        {p.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] tracking-wide px-2.5 py-1 rounded-full border border-[#0F2A5E]/15 text-[#0F2A5E]/75 bg-white/60"
          >
            {t}
          </span>
        ))}
      </div>

      {/* decorative wave footer */}
      <svg viewBox="0 0 400 30" className="mt-6 w-full text-[#0F2A5E]/10">
        <path
          d="M0,15 C50,5 100,25 150,15 C200,5 250,25 300,15 C350,5 400,20 400,15 L400,30 L0,30 Z"
          fill="currentColor"
        />
      </svg>
    </article>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".fade-in-up") || [];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleOpen = (p) => {
    setActive(p);
    setOpen(true);
  };

  return (
    <section id="projects" ref={ref} className="relative py-24 md:py-32 bg-[#DCE9F6]/40">
      <Waves variant="top" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 fade-in-up">
          <div>
            <h2 className="font-serif-display text-[#0F2A5E] text-4xl md:text-5xl">
              Mes projets
            </h2>
          </div>
          <p className="max-w-lg text-[#0F2A5E]/75 text-base leading-relaxed">
            Faire ce que l'on aime, ça pousse à se dépasser. Voici quelques travaux
            dont je suis particulièrement fier.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onOpen={handleOpen} />
          ))}
        </div>
      </div>
      <Waves variant="bottom" />

      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default Projects;
