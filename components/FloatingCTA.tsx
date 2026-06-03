"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";

export default function FloatingCTA() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href="#about"
        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-orange-900/40 hover:scale-105 active:scale-95 transition-all text-sm"
      >
        <span className="text-lg">🎙️</span>
        {t.nav.book}
      </a>
    </div>
  );
}
