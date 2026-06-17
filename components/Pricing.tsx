"use client";

import { useLang } from "@/contexts/LanguageContext";

function CalendarWidget({ lang }: { lang: string }) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!calendlyUrl) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[320px]">
        <p className="font-black text-slate-900 text-sm mb-2">
          {lang === "fr" ? "Réservation en ligne — bientôt disponible" : "Online booking — coming soon"}
        </p>
        <p className="text-slate-400 text-xs mb-5 max-w-xs">
          {lang === "fr"
            ? "Pour réserver un créneau dès maintenant, écris-nous directement."
            : "To book a slot right now, write to us directly."}
        </p>
        <a
          href="#about"
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-sm transition-all hover:scale-[1.02]"
        >
          {lang === "fr" ? "Nous écrire →" : "Write to us →"}
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden min-h-[320px]">
      <iframe
        src={calendlyUrl}
        title="Calendly"
        className="w-full h-[500px] border-0"
      />
    </div>
  );
}

export default function Pricing() {
  const { t, lang } = useLang();

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14">
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

        {/* Pricing cards — full width, 3 equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-7 flex flex-col transition-all hover:scale-[1.01] ${
                plan.featured
                  ? "bg-slate-900 text-white ring-2 ring-blue-600 shadow-2xl shadow-slate-900/30"
                  : "bg-white border border-slate-200 text-slate-900 hover:shadow-lg"
              }`}
            >
              {/* Popular badge */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow">
                    {t.pricing.popular}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <p className={`text-xs font-bold tracking-widest uppercase mb-2 ${plan.featured ? "text-blue-400" : "text-slate-400"}`}>
                  {plan.badge}
                </p>
                <h3 className={`text-2xl font-black ${plan.featured ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className={`text-4xl font-black ${plan.featured ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg font-semibold ${plan.featured ? "text-slate-400" : "text-slate-400"}`}>
                    {plan.priceMax}
                  </span>
                </div>
                <span className={`text-sm ${plan.featured ? "text-slate-400" : "text-slate-400"}`}>
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? "text-slate-300" : "text-slate-500"}`}>
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? "text-blue-400" : "text-blue-600"}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.featured ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#about"
                className={`flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  plan.featured
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
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

        {/* Monthly + Calendar row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">

          {/* Monthly package */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
                {t.pricing.monthly.subtitle}
              </p>
              <h4 className="text-2xl font-black mb-1">{t.pricing.monthly.title}</h4>
              <p className="text-3xl font-black text-blue-400 mb-4">{t.pricing.monthly.price}</p>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                {t.pricing.monthly.desc}
              </p>
            </div>
            <a
              href="#about"
              className="mt-8 inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors w-fit"
            >
              {t.pricing.contactBtn} →
            </a>
          </div>

          {/* Calendar */}
          <CalendarWidget lang={lang} />
        </div>

        {/* Note */}
        <p className="text-center text-slate-400 text-sm">
          {t.pricing.note}{" "}
          <a href="#about" className="text-blue-600 hover:underline font-medium">
            {t.pricing.contactBtn}
          </a>
        </p>
      </div>
    </section>
  );
}
