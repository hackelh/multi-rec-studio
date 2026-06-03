"use client";

import { useLang } from "@/contexts/LanguageContext";

const DAYS_FR = ["L", "M", "M", "J", "V", "S", "D"];
const DAYS_EN = ["M", "T", "W", "T", "F", "S", "S"];

const CALENDAR: (boolean | "taken")[] = [
  false, false, true, true, "taken", false, false,
  true, "taken", true, false, true, true, false,
  false, true, false, true, true, false, false,
  true, true, false, "taken", false, true, false,
];

function CalendarWidget({ lang }: { lang: string }) {
  const days = lang === "fr" ? DAYS_FR : DAYS_EN;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-black text-slate-900 text-sm">{lang === "fr" ? "Juin 2026" : "June 2026"}</p>
          <p className="text-slate-400 text-xs mt-0.5">Multi Rec Studio · Laval</p>
        </div>
        <div className="flex gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-100 border border-blue-300" />
            {lang === "fr" ? "Disponible" : "Available"}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-100 border border-slate-200" />
            {lang === "fr" ? "Complet" : "Taken"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d, i) => (
          <div key={i} className="text-center text-xs font-bold text-slate-300 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {CALENDAR.map((slot, i) => {
          const day = i + 1;
          return (
            <button
              key={i}
              disabled={!slot || slot === "taken"}
              className={`
                aspect-square rounded-lg text-xs font-semibold transition-all
                ${slot === true ? "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white cursor-pointer" : ""}
                ${slot === "taken" ? "bg-slate-50 text-slate-200 cursor-not-allowed line-through" : ""}
                ${slot === false ? "text-slate-200 cursor-not-allowed" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <a
        href="#about"
        className="mt-5 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
      >
        {lang === "fr" ? "Réserver un créneau →" : "Book a slot →"}
      </a>
    </div>
  );
}

export default function Pricing() {
  const { t, lang } = useLang();

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            {t.pricing.sectionBadge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3">
            {t.pricing.title}
          </h2>
          <p className="text-slate-500 max-w-lg leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Plans + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mb-12">

          {/* Plans  3 cols */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.pricing.plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col transition-all ${
                  plan.featured
                    ? "bg-slate-900 text-white ring-2 ring-blue-600 shadow-2xl shadow-slate-900/30"
                    : "bg-white border border-slate-200 text-slate-900 hover:shadow-lg"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs font-black px-4 py-1 rounded-full shadow">
                      {t.pricing.popular}
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${plan.featured ? "text-blue-400" : "text-slate-400"}`}>
                    {plan.badge}
                  </p>
                  <h3 className={`text-xl font-black ${plan.featured ? "text-white" : "text-slate-900"}`}>
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-black ${plan.featured ? "text-white" : "text-slate-900"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.featured ? "text-slate-400" : "text-slate-400"}`}>
                      – {plan.priceMax}
                    </span>
                  </div>
                  <span className={`text-xs ${plan.featured ? "text-slate-400" : "text-slate-400"}`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed mb-5 ${plan.featured ? "text-slate-300" : "text-slate-500"}`}>
                  {plan.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${plan.featured ? "text-blue-400" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-xs ${plan.featured ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#about"
                  className={`flex items-center justify-center gap-1.5 font-bold text-xs py-3 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                    plan.featured
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {plan.cta} →
                </a>
              </div>
            ))}
          </div>

          {/* Calendar  2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-slate-900 rounded-2xl p-5 text-white">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">{t.pricing.monthly.subtitle}</p>
              <h4 className="text-xl font-black mb-1">{t.pricing.monthly.title}</h4>
              <p className="text-2xl font-black text-blue-400 mb-3">{t.pricing.monthly.price}</p>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">{t.pricing.monthly.desc}</p>
              <a href="#about" className="flex items-center justify-center gap-2 bg-white text-slate-900 font-bold text-xs py-2.5 rounded-xl hover:bg-blue-50 transition-colors">
                {t.pricing.contactBtn} →
              </a>
            </div>

            <CalendarWidget lang={lang} />
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-slate-400 text-xs">
          {t.pricing.note}
          {" "}
          <a href="#about" className="text-blue-600 hover:underline font-medium">{t.pricing.contactBtn}</a>
        </p>
      </div>
    </section>
  );
}
