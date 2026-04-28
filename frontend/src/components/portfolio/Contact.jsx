import React, { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { profile } from "../../mock";
import Waves from "./Waves";
import { useToast } from "../../hooks/use-toast";

const Contact = () => {
  const ref = useRef(null);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".fade-in-up") || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Champs manquants",
        description: "Merci de remplir nom, email et message.",
      });
      return;
    }
    setLoading(true);
    const stored = JSON.parse(localStorage.getItem("contact_messages") || "[]");
    stored.push({ ...form, at: new Date().toISOString() });
    localStorage.setItem("contact_messages", JSON.stringify(stored));
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast({
        title: "Message envoyé ✨",
        description: "Merci ! Je reviens vers vous très vite.",
      });
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 700);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[#E3DFF7]"
    >
      <Waves variant="top" palette="mauve" />
      <div className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#9F85DD]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 fade-in-up">
          <h2 className="font-serif-display text-[#452573] text-4xl md:text-5xl leading-[1.05]">
            On se parle&nbsp;?
          </h2>
          <p className="mt-5 text-[#452573]/80 text-base leading-relaxed max-w-md">
            Contactez-moi pour mon stage de juin, pour me recruter, ou simplement
            pour échanger autour d'un projet. Je réponds à chaque message.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white/75 backdrop-blur border border-[#452573]/10 hover:bg-white transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-[#452573] text-white grid place-items-center">
                <Mail size={18} />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#452573]/55">
                  Email
                </div>
                <div className="text-[#452573] font-medium group-hover:text-[#9F85DD] transition-colors">
                  {profile.email}
                </div>
              </div>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white/75 backdrop-blur border border-[#452573]/10 hover:bg-white transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-[#9F85DD] text-white grid place-items-center">
                <Linkedin size={18} />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#452573]/55">
                  LinkedIn
                </div>
                <div className="text-[#452573] font-medium group-hover:text-[#9F85DD] transition-colors">
                  /in/gabriel-anderlucci
                </div>
              </div>
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 bg-white/85 backdrop-blur border border-[#452573]/10 rounded-3xl p-6 md:p-10 shadow-sm fade-in-up"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#452573]/60 mb-2">
                Nom
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Votre nom"
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#452573]/15 text-[#452573] placeholder:text-[#452573]/35 focus:outline-none focus:border-[#9F85DD] focus:ring-2 focus:ring-[#9F85DD]/25 transition"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#452573]/60 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="vous@exemple.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-[#452573]/15 text-[#452573] placeholder:text-[#452573]/35 focus:outline-none focus:border-[#9F85DD] focus:ring-2 focus:ring-[#9F85DD]/25 transition"
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-xs uppercase tracking-[0.2em] text-[#452573]/60 mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows={6}
              value={form.message}
              onChange={onChange}
              placeholder="Parlez-moi de votre projet, de votre entreprise, ou simplement venez dire bonjour…"
              className="w-full px-4 py-3 rounded-xl bg-white border border-[#452573]/15 text-[#452573] placeholder:text-[#452573]/35 focus:outline-none focus:border-[#9F85DD] focus:ring-2 focus:ring-[#9F85DD]/25 transition resize-none"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[#452573]/55">
              Vos infos restent privées. Je vous réponds en moins de 48 h.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#452573] text-white text-sm font-medium hover:bg-[#5B3589] transition-colors disabled:opacity-60"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={16} />
                  Envoyé
                </>
              ) : (
                <>
                  {loading ? "Envoi…" : "Envoyer le message"}
                  <Send size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
