"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

const CALENDLY_URLS: Record<string, string | undefined> = {
  antique: process.env.NEXT_PUBLIC_CALENDLY_URL_ANTIQUE,
  detente: process.env.NEXT_PUBLIC_CALENDLY_URL_DETENTE,
  pro: process.env.NEXT_PUBLIC_CALENDLY_URL_PRO,
};

function buildCalendlyUrl(base: string, lang: string) {
  const url = new URL(base);
  url.searchParams.set("locale", lang === "fr" ? "fr" : "en");
  url.searchParams.set("embed_type", "Inline");
  return url.toString();
}

export default function Reservation() {
  const { t, lang } = useLang();
  const r = t.reservation;
  const studios = t.services.studios;
  const [selected, setSelected] = useState<string | null>(null);

  const selectedStudio = studios.find((s) => s.id === selected);
  const rawCalendlyUrl = selected
    ? CALENDLY_URLS[selected] || process.env.NEXT_PUBLIC_CALENDLY_URL
    : undefined;
  const calendlyUrl = rawCalendlyUrl ? buildCalendlyUrl(rawCalendlyUrl, lang) : undefined;

  return (
    <section className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-block text-slate-400 hover:text-slate-700 text-sm mb-8 transition-colors">
          {r.back}
        </Link>

        <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
          {r.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3">{r.title}</h1>
        <p className="text-slate-500 max-w-xl leading-relaxed mb-10">{r.subtitle}</p>

        {/* Step 1: studio selector */}
        <p className="font-black text-slate-900 text-sm mb-4">{r.chooseStudio}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {studios.map((studio) => (
            <button
              key={studio.id}
              onClick={() => setSelected(studio.id)}
              className={`relative rounded-2xl overflow-hidden h-32 text-left transition-all ${
                selected === studio.id ? "ring-2 ring-blue-600 scale-[1.02]" : "hover:scale-[1.01]"
              }`}
            >
              <Image src={`/${studio.image}`} alt={studio.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-black text-sm">{studio.name}</p>
                <p className="text-white/70 text-xs">{studio.mood}</p>
              </div>
              {selected === studio.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Step 2: calendar */}
        {!selected ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center text-center text-slate-400 text-sm">
            {r.pickFirst}
          </div>
        ) : !calendlyUrl ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 flex flex-col items-center text-center">
            <p className="font-black text-slate-900 text-lg mb-2">{r.comingSoon}</p>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">{r.comingSoonDesc}</p>
            <Link
              href="/#contact"
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all hover:scale-[1.02]"
            >
              {r.writeUs}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="font-black text-slate-900 text-sm">{r.step2} — {selectedStudio?.name}</p>
              <button
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-700 text-xs underline underline-offset-4"
              >
                {r.changeStudio}
              </button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <iframe src={calendlyUrl} title="Calendly" className="w-full h-[700px] border-0" />
            </div>
          </>
        )}

        <p className="text-center text-slate-400 text-sm mt-8">
          {r.note}{" "}
          <Link href="/#contact" className="text-blue-600 hover:underline font-medium">
            {r.contactBtn}
          </Link>
        </p>
      </div>
    </section>
  );
}
