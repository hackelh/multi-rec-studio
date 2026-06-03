"use client";

import { useLang } from "@/contexts/LanguageContext";

const CALENDAR_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const CALENDAR_SLOTS = [
  [true, true, false, true, true, false, false],
  [false, true, true, true, false, true, false],
  [true, false, true, false, true, true, false],
  [true, true, true, false, false, true, false],
];

function CalendlyPlaceholder({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm">{title}</p>
          <p className="text-slate-500 text-xs">{subtitle}</p>
        </div>
      </div>

      {/* Mini calendar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-slate-800">Juin 2026</span>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {CALENDAR_DAYS.map((d) => (
            <div key={d} className="text-xs font-semibold text-slate-400 py-1">{d}</div>
          ))}
        </div>
        <div className="space-y-1">
          {CALENDAR_SLOTS.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1 text-center">
              {week.map((available, di) => {
                const day = wi * 7 + di + 1;
                return (
                  <button
                    key={di}
                    className={`text-xs py-1.5 rounded-lg font-medium transition-all ${
                      available
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white cursor-pointer"
                        : "text-slate-300 cursor-not-allowed"
                    }`}
                    disabled={!available}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Réserver ce créneau
      </a>
    </div>
  );
}

export default function Pricing() {
  const { t } = useLang();

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {t.pricing.sectionBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-7 flex flex-col transition-all hover:scale-[1.02] ${
                plan.featured
                  ? "bg-gradient-to-br from-blue-800 to-blue-950 text-white shadow-2xl shadow-blue-900/40 ring-2 ring-blue-500"
                  : "bg-slate-50 border border-slate-200 text-slate-900 hover:shadow-xl"
              }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-black px-5 py-1.5 rounded-full shadow-lg">
                    ⭐ {t.pricing.popular}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-xl font-black ${plan.featured ? "text-white" : "text-slate-900"}`}>
                    {plan.name}
                  </h3>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      plan.featured
                        ? "bg-blue-700 text-blue-200"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                <p className={`text-sm ${plan.featured ? "text-blue-200" : "text-slate-500"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-4xl font-black ${plan.featured ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg font-bold ${plan.featured ? "text-blue-300" : "text-slate-400"}`}>
                    – {plan.priceMax}
                  </span>
                </div>
                <span className={`text-sm font-medium ${plan.featured ? "text-blue-300" : "text-slate-400"}`}>
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? "text-blue-300" : "text-blue-600"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.featured ? "text-blue-100" : "text-slate-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#about"
                className={`flex items-center justify-center gap-2 font-bold text-sm px-5 py-3.5 rounded-2xl transition-all hover:scale-105 active:scale-95 ${
                  plan.featured
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white shadow-xl shadow-orange-900/30"
                    : "bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-200"
                }`}
              >
                {plan.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Monthly package banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-7 sm:p-10 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-block bg-orange-500/20 text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {t.pricing.monthly.subtitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{t.pricing.monthly.title}</h3>
            <p className="text-slate-400 text-sm max-w-md">{t.pricing.monthly.desc}</p>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <div className="text-3xl font-black text-white mb-1">{t.pricing.monthly.price}</div>
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold px-6 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg text-sm"
            >
              {t.pricing.contactBtn}
            </a>
          </div>
        </div>

        {/* Calendly placeholder */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-slate-900 mb-2">{t.pricing.calendlyTitle}</h3>
          <p className="text-slate-500 mb-8">{t.pricing.calendlySubtitle}</p>
          <CalendlyPlaceholder title={t.pricing.calendlyTitle} subtitle={t.pricing.calendlySubtitle} />
        </div>

        {/* Note */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-3">{t.pricing.note}</p>
          <a
            href="#about"
            className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white font-bold px-6 py-3 rounded-full transition-all text-sm"
          >
            📧 {t.pricing.contactBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
