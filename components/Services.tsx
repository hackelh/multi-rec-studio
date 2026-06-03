"use client";

import { useLang } from "@/contexts/LanguageContext";

const colorMap = {
  amber: {
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    icon: "bg-amber-100 text-amber-700",
    tag: "bg-amber-100 text-amber-700",
    btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-200",
    accent: "text-amber-600",
  },
  emerald: {
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    icon: "bg-emerald-100 text-emerald-700",
    tag: "bg-emerald-100 text-emerald-700",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    accent: "text-emerald-600",
  },
  blue: {
    bg: "from-blue-50 to-slate-50",
    border: "border-blue-200",
    icon: "bg-blue-100 text-blue-700",
    tag: "bg-blue-100 text-blue-700",
    btn: "bg-blue-700 hover:bg-blue-800 shadow-blue-200",
    accent: "text-blue-700",
  },
};

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {t.services.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Studio cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.services.studios.map((studio) => {
            const color = colorMap[studio.color as keyof typeof colorMap];
            return (
              <div
                key={studio.id}
                className={`group relative bg-gradient-to-br ${color.bg} border ${color.border} rounded-3xl p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                {/* Icon + mood */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 ${color.icon} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                    {studio.icon}
                  </div>
                  <span className={`text-xs font-semibold ${color.accent} bg-white/70 px-3 py-1.5 rounded-full border border-current/10`}>
                    {studio.mood}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-black text-slate-900 mb-3">{studio.name}</h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                  {studio.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {studio.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${color.tag} text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#about"
                  className={`flex items-center justify-center gap-2 ${color.btn} text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95`}
                >
                  {studio.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm">
          {[
            { icon: "📹", text: "Caméras Sony 4K" },
            { icon: "🎚️", text: "Mixage professionnel" },
            { icon: "🌐", text: "Streamable en direct" },
            { icon: "📦", text: "Fichiers livrés sur place" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span>{icon}</span>
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
