"use client";

import { createContext, useContext, useState } from "react";
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as TranslationsFr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
