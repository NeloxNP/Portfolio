import React from "react";

// Decorative organic waves inspired by the print charter.
// Variants: 'top' | 'bottom' | 'block'
const Waves = ({ variant = "block", className = "" }) => {
  if (variant === "top") {
    return (
      <div className={`pointer-events-none absolute inset-x-0 top-0 -z-0 ${className}`}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[180px] md:h-[220px]">
          <path className="wave-anim" d="M0,120 C240,40 480,200 720,120 C960,40 1200,180 1440,100 L1440,0 L0,0 Z" fill="#C9DEF6" opacity="0.7" />
          <path className="wave-anim-2" d="M0,150 C240,80 480,220 720,150 C960,80 1200,200 1440,140 L1440,0 L0,0 Z" fill="#9AC0EB" opacity="0.55" />
          <path className="wave-anim-3" d="M0,180 C240,120 480,240 720,180 C960,120 1200,220 1440,170 L1440,0 L0,0 Z" fill="#5885C9" opacity="0.18" />
        </svg>
      </div>
    );
  }
  if (variant === "bottom") {
    return (
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 -z-0 ${className}`}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="w-full h-[180px] md:h-[220px]">
          <path className="wave-anim" d="M0,100 C240,180 480,40 720,100 C960,160 1200,60 1440,120 L1440,220 L0,220 Z" fill="#9AC0EB" opacity="0.55" />
          <path className="wave-anim-2" d="M0,140 C240,200 480,80 720,140 C960,200 1200,100 1440,160 L1440,220 L0,220 Z" fill="#C9DEF6" opacity="0.7" />
          <path className="wave-anim-3" d="M0,170 C240,210 480,120 720,170 C960,220 1200,140 1440,190 L1440,220 L0,220 Z" fill="#5885C9" opacity="0.15" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`pointer-events-none absolute inset-0 -z-0 ${className}`}>
      <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="w-full h-full">
        <path className="wave-anim" d="M0,200 C300,120 600,300 900,220 C1200,140 1320,260 1440,200 L1440,0 L0,0 Z" fill="#C9DEF6" opacity="0.55" />
        <path className="wave-anim-2" d="M0,420 C300,500 600,360 900,440 C1200,520 1320,400 1440,460 L1440,600 L0,600 Z" fill="#9AC0EB" opacity="0.45" />
      </svg>
    </div>
  );
};

export default Waves;
