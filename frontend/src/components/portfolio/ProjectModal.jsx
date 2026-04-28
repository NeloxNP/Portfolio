import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { ExternalLink, Image as ImageIcon, Play, ArrowLeft } from "lucide-react";

const ProjectModal = ({ project, open, onOpenChange }) => {
  const [view, setView] = useState("root"); // 'root' | 'image'

  useEffect(() => {
    if (open) setView("root");
  }, [open, project?.id]);

  if (!project) return null;
  const m = project.media;

  // ---------------- CHOICE (project 01) ----------------
  if (m?.type === "choice") {
    const opt = view !== "root" ? m.options.find((o) => o.label === view) : null;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl bg-white border-[#0F2A5E]/10 rounded-3xl p-0 overflow-hidden">
          {!opt ? (
            <div className="p-8 md:p-10">
              <DialogHeader>
                <DialogTitle className="font-serif-display text-[#0F2A5E] text-2xl md:text-3xl">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-[#0F2A5E]/70 mt-1">
                  Que souhaitez-vous découvrir&nbsp;?
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 grid sm:grid-cols-2 gap-5">
                {m.options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => {
                      if (o.kind === "video") {
                        window.open(o.url, "_blank", "noopener,noreferrer");
                        onOpenChange(false);
                      } else {
                        setView(o.label);
                      }
                    }}
                    className="group text-left rounded-2xl overflow-hidden border border-[#0F2A5E]/10 bg-[#F4F8FC] hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#EAF3FB]">
                      <img
                        src={o.thumbnail}
                        alt={o.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A5E]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#0F2A5E] text-xs font-medium">
                        {o.kind === "video" ? <Play size={12} /> : <ImageIcon size={12} />}
                        {o.kind === "video" ? "Vidéo" : "Image"}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-serif-display text-[#0F2A5E] text-lg">
                          {o.label}
                        </span>
                        {o.kind === "video" && (
                          <ExternalLink size={14} className="text-[#5885C9]" />
                        )}
                      </div>
                      <p className="text-[#0F2A5E]/60 text-sm mt-0.5">{o.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#0F2A5E]">
              <button
                onClick={() => setView("root")}
                className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0F2A5E] text-xs font-medium transition-colors"
              >
                <ArrowLeft size={14} /> Retour
              </button>
              <img
                src={opt.full}
                alt={opt.label}
                className="w-full max-h-[85vh] object-contain bg-[#0F2A5E]"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // ---------------- GALLERY / GALLERY-LINK ----------------
  if (m?.type === "gallery" || m?.type === "gallery-link") {
    const isLink = m.type === "gallery-link";
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl bg-white border-[#0F2A5E]/10 rounded-3xl p-0 overflow-hidden">
          <div className="p-6 md:p-8 pb-3">
            <DialogHeader>
              <DialogTitle className="font-serif-display text-[#0F2A5E] text-2xl md:text-3xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-[#0F2A5E]/70 mt-1">
                {project.subtitle}
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className={`px-6 md:px-8 pb-6 grid gap-4 ${m.images.length > 1 ? "md:grid-cols-2" : ""}`}>
            {m.images.map((src, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-[#EAF3FB] border border-[#0F2A5E]/10 max-h-[70vh]"
              >
                <img
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
          {isLink && m.cta && (
            <div className="px-6 md:px-8 pb-8 pt-2 flex justify-end border-t border-[#0F2A5E]/5 bg-[#F4F8FC]">
              <a
                href={m.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F2A5E] text-white text-sm font-medium hover:bg-[#1A3B7C] transition-colors"
              >
                {m.cta.label}
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return null;
};

export default ProjectModal;
