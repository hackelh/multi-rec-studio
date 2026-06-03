"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

interface FormState {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export default function About() {
  const { t } = useLang();
  const c = t.about.contact;

  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setForm(initialForm);
  };

  const inputClass =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: About */}
          <div>
            <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
              {t.about.sectionBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
              {t.about.title}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              {t.about.story}
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              {t.about.vision}
            </p>

            {/* Location */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-200 mb-8 shadow-sm">
              <span className="text-2xl mt-0.5">📍</span>
              <div>
                <p className="font-bold text-slate-900 text-sm mb-0.5">Localisation</p>
                <p className="text-slate-500 text-sm">{t.about.location}</p>
              </div>
            </div>

            {/* Clients */}
            <div>
              <p className="font-black text-slate-900 text-lg mb-4">{t.about.clients.title}</p>
              <div className="grid grid-cols-2 gap-3">
                {t.about.clients.list.map((client) => (
                  <div
                    key={client.label}
                    className="flex items-center gap-3 bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-xl">{client.icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{client.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { icon: "⚡", label: "Plug & Play" },
                { icon: "🏆", label: "Qualité Pro" },
                { icon: "❤️", label: "Sur mesure" },
              ].map(({ icon, label }) => (
                <div key={label} className="text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-2xl block mb-1">{icon}</span>
                  <span className="text-xs font-bold text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-7 sm:p-9">
              <div className="mb-7">
                <h3 className="text-2xl font-black text-slate-900 mb-1">{c.title}</h3>
                <p className="text-slate-500 text-sm">{c.subtitle}</p>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4">
                    🎉
                  </div>
                  <p className="text-green-700 font-bold text-lg mb-2">{c.success}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-blue-600 text-sm hover:underline mt-4"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">{c.name}</label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder={c.namePlaceholder}
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">{c.phone}</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={c.phonePlaceholder}
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">{c.email}</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder={c.emailPlaceholder}
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">{c.company}</label>
                      <input
                        name="company"
                        type="text"
                        placeholder={c.companyPlaceholder}
                        value={form.company}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">{c.subject}</label>
                    <input
                      name="subject"
                      type="text"
                      required
                      placeholder={c.subjectPlaceholder}
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">{c.message}</label>
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
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-200 text-sm"
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
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        {c.send}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-400 mt-2">
                    🔒 Vos données sont protégées et ne seront jamais partagées.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
