"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function FloatingCTA() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <Link
        href="/reservation"
        className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm border border-white/10"
      >
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        {t.nav.book}
      </Link>
    </div>
  );
}
