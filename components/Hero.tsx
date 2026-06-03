"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-end overflow-hidden">

      {/* Background photo */}
      <Image
        src="/1.png"
        alt="Multi Rec Studio  vue du studio"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay  opaque at bottom, translucent at top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,10,25,0.55) 0%, rgba(5,10,25,0.45) 40%, rgba(5,10,25,0.88) 80%, rgba(5,10,25,0.98) 100%)",
        }}
      />

      {/* Recording indicator top-right */}
      <div className="absolute top-24 right-6 sm:right-10 flex items-center gap-2 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
        <span className="text-red-400 text-xs font-mono font-bold tracking-widest">REC</span>
      </div>

      {/* Content  anchored to bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-40 w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t.hero.badge}
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.05] mb-6 tracking-tight max-w-4xl">
          {t.hero.title1}
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #60a5fa 0%, #f97316 100%)",
            }}
          >
            {t.hero.title2}
          </span>
        </h1>

        {/* Subtitle + CTA  side by side on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mt-6">
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="#services"
              className="group flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-full text-sm transition-all hover:bg-blue-50 hover:scale-105 active:scale-95 shadow-2xl"
            >
              {t.hero.cta}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#pricing"
              className="flex items-center justify-center gap-2 border border-white/30 hover:border-white/70 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all hover:bg-white/5"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
