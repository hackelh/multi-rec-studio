"use client";

import { useLang } from "@/contexts/LanguageContext";

const stats = [
  { icon: "📹", value: "4K", label: "Multicaméra" },
  { icon: "🎧", value: "HD", label: "Audio Pro" },
  { icon: "⚡", value: "24h", label: "Livraison" },
  { icon: "🎨", value: "3", label: "Décors" },
];

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020818 0%, #0c1a3a 40%, #0f2057 70%, #0a0f1e 100%)",
      }}
    >
      {/* Decorative glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #3b82f6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #f97316 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #ef4444 0%, transparent 70%)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Recording dot */}
        <div className="absolute top-8 right-8 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-xs font-mono font-bold tracking-widest">REC</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-8 hover:bg-white/15 transition-colors cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t.hero.badge}
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight text-white mb-6">
            {t.hero.title1}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #f97316 100%)",
              }}
            >
              {t.hero.title2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
            {t.hero.subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a
              href="#services"
              className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold px-8 py-4 rounded-full text-base transition-all shadow-2xl shadow-blue-900/50 hover:scale-105 active:scale-95"
            >
              {t.hero.cta}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#pricing"
              className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-white/5"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-5 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-xs text-white/60 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
