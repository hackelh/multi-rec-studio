"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            {t.services.sectionBadge}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight max-w-sm">
              {t.services.title}
            </h2>
            <p className="text-slate-500 max-w-sm leading-relaxed text-sm sm:text-base text-right">
              {t.services.subtitle}
            </p>
          </div>
        </div>

        {/* Studio cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 rounded-3xl overflow-hidden shadow-xl">
          {t.services.studios.map((studio, i) => (
            <div
              key={studio.id}
              className="group bg-white flex flex-col hover:bg-slate-50 transition-colors duration-300"
            >
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={`/${studio.image}`}
                  alt={studio.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gradient fade to white */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />

                {/* Studio number */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-xs font-black text-slate-900">0{i + 1}</span>
                </div>

                {/* Mood badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {studio.mood}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-slate-900 mb-3">{studio.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
                  {studio.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {studio.tags.map((tag) => (
                    <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="flex items-center justify-between w-full text-slate-900 font-bold text-sm border-t border-slate-100 pt-4 group/link hover:text-blue-700 transition-colors"
                >
                  {studio.cta}
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Gear section */}
        <div className="mt-24">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t.services.gearTitle}</h3>
            <p className="text-slate-500 text-sm">{t.services.gearSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.services.gear.map((item) => (
              <div key={item.label} className="group relative rounded-2xl overflow-hidden bg-slate-900">
                <div className="relative h-48">
                  <Image
                    src={`/${item.image}`}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-bold text-sm leading-tight">{item.label}</p>
                  <p className="text-white/60 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
