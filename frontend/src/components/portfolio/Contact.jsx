import React, { useEffect, useRef } from "react";
import { Mail, Linkedin, Youtube, ArrowUpRight } from "lucide-react";
import { profile } from "../../mock";
import Waves from "./Waves";

const Contact = () => {
  const ref = useRef(null);

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

  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      tone: "primary",
    },
    {
      label: "LinkedIn",
      value: "/in/gabriel-anderlucci",
      href: profile.linkedin,
      icon: Linkedin,
      tone: "soft",
    },
    {
      label: "CV Vidéo",
      value: "À voir sur YouTube",
      href: profile.cvVideo,
      icon: Youtube,
      tone: "soft",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[#E3DFF7]"
    >
      <Waves variant="top" palette="mauve" />
      <div className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#9F85DD]/20 blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-[340px] h-[340px] rounded-full bg-[#9F85DD]/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-center fade-in-up">
        <h2 className="font-serif-display text-[#452573] text-4xl md:text-6xl leading-[1.05]">
          On se parle&nbsp;?
        </h2>
        <p className="mt-6 text-[#452573]/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Contactez-moi pour mon stage de juin, pour me recruter, ou simplement
          pour échanger autour d'un projet. Je réponds à chaque message.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 mt-14 md:mt-20">
        <div className="grid sm:grid-cols-3 gap-5 md:gap-6 fade-in-up">
          {channels.map((c) => {
            const Icon = c.icon;
            const isPrimary = c.tone === "primary";
            const base =
              "group relative flex flex-col items-start gap-5 p-6 md:p-7 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-xl";
            const styles = isPrimary
              ? "bg-[#452573] text-white border-transparent hover:bg-[#5B3589]"
              : "bg-white/85 backdrop-blur text-[#452573] border-[#452573]/10 hover:bg-white";
            const iconWrap = isPrimary
              ? "bg-white/15 text-white"
              : "bg-[#452573] text-white";
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? "_self" : "_blank"}
                rel={
                  c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                className={`${base} ${styles}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`w-12 h-12 rounded-2xl grid place-items-center ${iconWrap}`}
                  >
                    <Icon size={20} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ${
                      isPrimary ? "text-white" : "text-[#452573]"
                    }`}
                  />
                </div>
                <div>
                  <div
                    className={`text-[10px] uppercase tracking-[0.25em] mb-2 ${
                      isPrimary ? "text-white/70" : "text-[#452573]/55"
                    }`}
                  >
                    {c.label}
                  </div>
                  <div
                    className={`font-serif-display leading-tight break-words ${
                      c.label === "Email"
                        ? "text-base md:text-lg lg:text-xl"
                        : "text-xl md:text-2xl"
                    } ${isPrimary ? "text-white" : "text-[#452573]"}`}
                  >
                    {c.value}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-14 text-center fade-in-up">
          <p className="text-[#452573]/65 text-sm font-serif-display italic">
            Je réponds en moins de 48 heures.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
