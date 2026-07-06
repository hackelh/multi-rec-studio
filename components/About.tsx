"use client";

import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

interface FormState {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const emptyForm: FormState = { name: "", phone: "", email: "", company: "", subject: "", message: "" };

export default function About() {
  const { t, lang } = useLang();
  const c = t.about.contact;

  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all";

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top: About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">

          {/* Left: Photo */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden h-80 lg:h-full min-h-64 shadow-2xl">
              <Image
                src="/4.png"
                alt="Studio Pro Multi Rec Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/Logo-white.png"
                    alt="Multi Rec Studio"
                    width={90}
                    height={36}
                    className="object-contain w-[90px] h-[36px]"
                  />
                </div>
                <p className="text-white/70 text-xs mt-1">Laval, Québec</p>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="flex flex-col justify-center">
            <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase w-fit">
              {t.about.sectionBadge}
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
              {t.about.title}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-5 text-base">
              {t.about.story}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8 text-base">
              {t.about.vision}
            </p>

            {/* Location */}
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
              <span className="text-lg">📍</span>
              {t.about.location}
            </div>

            {/* Who for */}
            <p className="font-black text-slate-900 text-base mb-4">{t.about.clients.title}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {t.about.clients.list.map((client) => (
                <div
                  key={client.label}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 hover:border-slate-200 transition-colors"
                >
                  <span className="text-xl">{client.icon}</span>
                  <span className="text-sm font-semibold text-slate-700">{client.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Contact */}
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start scroll-mt-24">

          {/* Left: Why contact */}
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-3">{c.title}</h3>
            <p className="text-slate-500 mb-8 text-sm">{c.subtitle}</p>

            {/* Two gear images side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <Image src="/5.png" alt="Caméra 4K RODE" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <Image src="/2.png" alt="Console de mixage" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            </div>

            <p className="text-slate-400 text-xs mt-4 leading-relaxed">
              {lang === "fr"
                ? "On répond vite. Généralement le jour même ou le lendemain. Pour une demande urgente, indique-le dans le message."
                : "We respond quickly. Usually same day or next. For urgent requests, mention it in your message."}
            </p>
          </div>

          {/* Right: Form */}
          <div className="bg-slate-50 rounded-3xl border border-slate-100 p-7 sm:p-9">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-900 font-black text-lg mb-2">{c.success}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-slate-400 text-sm hover:text-slate-700 transition-colors mt-4 underline underline-offset-4"
                >
                  {lang === "fr" ? "Envoyer un autre message" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <p className="text-red-600 text-sm font-semibold bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    {c.error}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">{c.name}</label>
                    <input name="name" type="text" required placeholder={c.namePlaceholder} value={form.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">{c.phone}</label>
                    <input name="phone" type="tel" placeholder={c.phonePlaceholder} value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">{c.email}</label>
                    <input name="email" type="email" required placeholder={c.emailPlaceholder} value={form.email} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">{c.company}</label>
                    <input name="company" type="text" placeholder={c.companyPlaceholder} value={form.company} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">{c.subject}</label>
                  <input name="subject" type="text" required placeholder={c.subjectPlaceholder} value={form.subject} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">{c.message}</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={c.messagePlaceholder}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {c.sending}
                    </>
                  ) : (
                    c.send
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
