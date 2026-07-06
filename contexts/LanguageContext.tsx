"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Lang } from "@/lib/translations";

type TranslationsFr = (typeof translations)["fr"];

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationsFr;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
});

const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as TranslationsFr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
